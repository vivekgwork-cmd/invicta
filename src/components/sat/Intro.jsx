import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import useMediaQuery from '../../lib/useMediaQuery.js'
import { EASE, Tag, Title, sec } from './ui.jsx'

/* ------------------------------------------------ At a glance: split-flap board */

const FLAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$*'

function FlapChar({ ch, start, index }) {
  const reduce = useReducedMotion()
  const [state, setState] = useState({ c: ch === ' ' ? ' ' : '·', n: 0 })
  const setShown = (c) => setState((s) => ({ c, n: s.n + 1 }))
  const shown = state.c
  useEffect(() => {
    if (!start) return
    if (reduce || ch === ' ') return setShown(ch)
    let n = 0
    const flips = 6 + index * 2
    const id = setInterval(() => {
      n += 1
      if (n >= flips) {
        setShown(ch)
        clearInterval(id)
      } else setShown(FLAP[Math.floor(Math.random() * FLAP.length)])
    }, 55)
    return () => clearInterval(id)
  }, [start]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="relative inline-grid place-items-center w-[0.78em] h-[1.25em] mx-[0.04em] rounded-[0.12em] bg-obsidian-800 border border-white/5 overflow-hidden [perspective:200px]">
      <span className="absolute inset-x-0 top-1/2 h-px bg-black/60 z-10" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state.n}
          initial={{ rotateX: -90, opacity: 0.4 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.05 }}
          className="block"
        >
          {shown}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Flap({ text, start, size = 'text-3xl sm:text-4xl' }) {
  return (
    <span aria-label={text} className={`inline-flex flex-wrap font-grotesk font-bold text-white ${size}`}>
      {text.split('').map((c, i) => (
        <FlapChar key={i} ch={c.toUpperCase()} start={start} index={i} />
      ))}
    </span>
  )
}

const board = [
  { k: 'Exam fee · international', v: 'US$111*', flap: 'US$111*' },
  { k: 'Maximum score', v: '1600', flap: '1600' },
  { k: 'Testing time', v: '2 hours 14 minutes', flap: '2H 14M' },
  { k: 'Format', v: 'Digital', flap: 'DIGITAL' },
]

export function Glance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <section id="glance" ref={ref} className="relative px-5 sm:px-6 lg:px-12 py-16 border-y border-white/10 bg-obsidian-900/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Tag index="01">The SAT at a glance</Tag>
          <span className="font-grotesk text-[10px] uppercase tracking-[0.25em] text-slate-500">Departures board · live</span>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {board.map((b) => (
            <div key={b.k} className="bg-obsidian-950 p-6 sm:p-7 hover:bg-obsidian-900 transition-colors">
              <dt className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4">{b.k}</dt>
              <dd>
                <Flap text={b.flap} start={inView} />
                <span className="sr-only">{b.v}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 font-grotesk text-[11px] text-slate-500">*Additional charges may apply. This is the exam fee, not the coaching fee.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Overview: words light up with scroll */

function LitWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const color = useTransform(progress, range, ['#64748b', '#ffffff'])
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  )
}

const statement =
  'The SAT assesses Reading and Writing and Math skills used in university study. It can form part of an undergraduate application, depending on the university’s current admissions policy.'

export function Overview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')

  return (
    <section id="overview" className={sec}>
      <div className="max-w-6xl mx-auto">
        <Tag index="02">What is the digital SAT?</Tag>
        <p ref={ref} className="mt-8 font-outfit font-semibold text-2xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-tight">
          {words.map((w, i) => (
            <LitWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="md:col-span-5 text-slate-400 leading-relaxed"
          >
            The digital format combines shorter reading passages, timed modules and built-in tools. Preparing well means learning
            the content, practising the interface and knowing how to use your time.
          </motion.p>
          <div className="md:col-span-7 grid grid-cols-3 gap-3">
            {['Learn the content', 'Practise the interface', 'Use your time'].map((x, i) => (
              <motion.div
                key={x}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="rounded-xl border border-white/10 p-4 font-grotesk"
              >
                <p className="text-cobalt-400 text-xs">0{i + 1}</p>
                <p className="mt-6 text-white text-sm font-bold leading-snug">{x}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Format: horizontal pinned scroll */

function AdaptiveVisual() {
  const [strong, setStrong] = useState(true)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 font-grotesk text-[11px] uppercase tracking-wider">
        {[
          [true, 'Module 1 went well'],
          [false, 'Module 1 was tough'],
        ].map(([v, l]) => (
          <button
            key={l}
            onClick={() => setStrong(v)}
            className={`px-3 py-2 rounded-lg border transition-colors ${strong === v ? 'border-cobalt-400 bg-cobalt-500/20 text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-xl border border-cobalt-400/50 bg-cobalt-500/10 p-5 text-center font-grotesk">
          <p className="text-[10px] text-cobalt-300 uppercase tracking-widest">Module 1</p>
          <p className="text-white font-bold mt-1">Mixed</p>
        </div>
        <svg viewBox="0 0 60 120" className="w-12 h-28" aria-hidden="true">
          <motion.path d="M0 60 C 30 60, 30 18, 60 18" fill="none" strokeWidth="2" animate={{ stroke: strong ? '#60a5fa' : '#1e293b' }} />
          <motion.path d="M0 60 C 30 60, 30 102, 60 102" fill="none" strokeWidth="2" animate={{ stroke: strong ? '#1e293b' : '#60a5fa' }} />
          <motion.circle r="4" fill="#fbbf24" animate={{ cx: [0, 60], cy: strong ? [60, 18] : [60, 102] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
        </svg>
        <div className="space-y-2 font-grotesk">
          {[
            [true, 'Harder module 2'],
            [false, 'Easier module 2'],
          ].map(([v, l]) => (
            <motion.div key={l} animate={{ opacity: strong === v ? 1 : 0.3 }} className={`rounded-xl border p-4 text-center text-sm font-bold ${strong === v ? 'border-champagne-400/60 text-white' : 'border-white/10 text-slate-500'}`}>
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TimeVisual() {
  const segs = [
    ['R&W', 64, 'bg-cobalt-500'],
    ['Break', 10, 'bg-slate-700'],
    ['Math', 70, 'bg-champagne-400'],
  ]
  return (
    <div className="font-grotesk">
      <p className="text-6xl sm:text-7xl font-bold text-white tabular-nums">2:14</p>
      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">hours, excluding the break</p>
      <div className="mt-8 flex h-12 gap-1">
        {segs.map(([l, m, c], i) => (
          <motion.div
            key={l}
            initial={{ flexGrow: 0.001 }}
            whileInView={{ flexGrow: m }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.2, ease: EASE }}
            className={`basis-0 rounded-md ${c} flex items-end p-2 text-[10px] font-bold ${i === 2 ? 'text-obsidian-950' : 'text-white'}`}
          >
            {l} · {m}m
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CalcVisual() {
  const [k, setK] = useState(1)
  return (
    <div>
      <div className="rounded-xl bg-white p-3">
        <svg viewBox="0 0 200 120" className="w-full" aria-hidden="true">
          {[...Array(9)].map((_, i) => <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="120" stroke="#e2e8f0" />)}
          {[...Array(5)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 30} x2="200" y2={i * 30} stroke="#e2e8f0" />)}
          <line x1="100" y1="0" x2="100" y2="120" stroke="#94a3b8" />
          <line x1="0" y1="90" x2="200" y2="90" stroke="#94a3b8" />
          <motion.path animate={{ d: `M10 ${90 - k * 80} Q 100 ${90 + k * 100} 190 ${90 - k * 80}` }} transition={{ type: 'spring', stiffness: 120, damping: 14 }} fill="none" stroke="#2563eb" strokeWidth="3" />
        </svg>
      </div>
      <label className="mt-4 flex items-center gap-4 font-grotesk text-xs text-slate-400">
        <span>y = {k.toFixed(1)}x²</span>
        <input type="range" min={0.2} max={1} step={0.1} value={k} onChange={(e) => setK(Number(e.target.value))} className="exam-range flex-1" style={{ '--fill': '#3b82f6', '--pct': `${((k - 0.2) / 0.8) * 100}%` }} />
      </label>
      <p className="mt-2 text-[11px] text-slate-500 font-grotesk">Drag to reshape the graph, like the built-in graphing calculator.</p>
    </div>
  )
}

function DeviceVisual() {
  const [flagged, setFlagged] = useState([3])
  return (
    <div className="rounded-xl bg-white overflow-hidden text-obsidian-950">
      <div className="flex justify-between px-4 py-2 border-b border-slate-200 text-[11px] font-grotesk">
        <span className="font-bold">Bluebook™</span>
        <span>Question 4 of 27</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="h-2 rounded bg-slate-200" />
        <div className="h-2 rounded bg-slate-200 w-5/6" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          {['A', 'B', 'C', 'D'].map((o) => (
            <span key={o} className="rounded border border-slate-200 px-2 py-1.5 text-xs"><b>{o}</b></span>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-200 flex flex-wrap gap-1.5">
        {[...Array(10)].map((_, i) => {
          const f = flagged.includes(i)
          return (
            <button
              key={i}
              onClick={() => setFlagged((p) => (f ? p.filter((x) => x !== i) : [...p, i]))}
              aria-pressed={f}
              aria-label={`Flag question ${i + 1}`}
              className={`w-7 h-7 rounded text-[11px] font-bold border ${f ? 'bg-champagne-400 border-champagne-500' : 'border-slate-300 text-slate-500'}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <p className="px-4 pb-3 text-[10px] text-slate-500">Tap a number to flag it for review.</p>
    </div>
  )
}

const formats = [
  { title: 'Adaptive modules', body: 'Each section has two modules. Your performance in the first helps determine the difficulty of the second. Build accuracy from the start and learn to approach different question types confidently.', Visual: AdaptiveVisual },
  { title: 'Shorter testing time', body: 'The SAT takes 2 hours and 14 minutes, excluding the break. Short passages and focused questions make careful reading and steady pacing important.', Visual: TimeVisual },
  { title: 'Calculator access throughout Math', body: 'Use the built-in graphing calculator or a permitted personal calculator across the Math section. Learn when a calculator saves time and when a direct solution works better.', Visual: CalcVisual },
  { title: 'A fully digital experience', body: 'Take the exam through the College Board’s Bluebook™ app on an approved device. Practising in a digital environment helps you become familiar with the tools before test day.', Visual: DeviceVisual },
]

function FormatPanel({ f, i }) {
  const { Visual } = f
  return (
    <div className="w-full lg:w-screen shrink-0 lg:h-full flex items-center px-5 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <p className="font-grotesk text-cobalt-400 text-sm">0{i + 1} / 0{formats.length}</p>
          <h3 className="mt-4 font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">{f.title}</h3>
          <p className="mt-5 text-slate-400 leading-relaxed max-w-lg">{f.body}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-obsidian-900/80 p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.5)]">
          <Visual />
        </div>
      </div>
    </div>
  )
}

export function Format() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(formats.length - 1) * 100}vw`])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!wide) {
    return (
      <section id="format" className={sec}>
        <Title index="03" tag="What's different" title="A different test. A smarter preparation strategy." className="mb-14" />
        <div className="space-y-16">
          {formats.map((f, i) => (
            <FormatPanel key={f.title} f={f} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="format" ref={ref} className="relative scroll-mt-20" style={{ height: `${formats.length * 100}vh` }}>
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
        <div className="px-12 pt-10 max-w-7xl mx-auto w-full flex items-end justify-between gap-6">
          <Title index="03" tag="What's different" title="A different test. A smarter preparation strategy." />
          <p className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-slate-500 shrink-0">Keep scrolling →</p>
        </div>
        <motion.div style={{ x }} className="flex flex-1 items-center">
          {formats.map((f, i) => (
            <FormatPanel key={f.title} f={f} i={i} />
          ))}
        </motion.div>
        <div className="mx-12 mb-8 h-px bg-white/10 relative">
          <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-cobalt-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
        </div>
      </div>
    </section>
  )
}
