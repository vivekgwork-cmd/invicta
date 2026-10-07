import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { img } from '../site/links.js'
import { Chevron, EASE, Magnetic, Title, sec } from './ui.jsx'

/* ------------------------------------------------ Approach: cards that stack as you scroll */

const pillars = [
  { title: 'Personalised guidance', body: 'Focus on your strengths, weaker topics and target score. Get direction on what to prioritise rather than treating every topic the same way.', tag: 'You, mapped', bg: 'from-cobalt-600 to-cobalt-900', image: 'indian-college-students.jpg' },
  { title: 'Flexible learning', body: 'Choose online, offline or hybrid classes, with individual and group options to suit your schedule and learning preferences.', tag: 'Online · Offline · Hybrid', bg: 'from-slate-800 to-obsidian-900', image: 'study-abroad-hero.jpg' },
  { title: 'Comprehensive resources', body: 'Work through study material and practice questions that develop the skills tested in the digital SAT.', tag: 'Material + questions', bg: 'from-indigo-700 to-obsidian-900', image: 'get-started-section.jpg' },
  { title: 'Realistic digital practice', body: 'Build familiarity with the exam experience through timed practice and mock tests, then use your results to guide the next stage of preparation.', tag: 'Timed · Mock tests', bg: 'from-champagne-600 to-amber-900', image: 'test-prep-hero.jpg' },
]

function StackCard({ p, i, total, progress }) {
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04])
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - i) * 0.12])
  return (
    <div className="sticky h-[70vh] min-h-[440px]" style={{ top: `calc(7rem + ${i * 28}px)` }}>
      <motion.article style={{ scale }} className={`origin-top relative h-full rounded-[28px] overflow-hidden bg-gradient-to-br ${p.bg} border border-white/10 shadow-2xl`}>
        <div className="absolute inset-0 site-grid-lines opacity-50" />
        <div className="relative h-full grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col">
            <div className="flex items-center justify-between font-grotesk text-xs text-white/60">
              <span>0{i + 1}</span>
              <span className="rounded-full border border-white/20 px-3 py-1">{p.tag}</span>
            </div>
            <h3 className="mt-auto font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">{p.title}</h3>
            <p className="mt-4 text-white/75 leading-relaxed max-w-md">{p.body}</p>
          </div>
          <div className="hidden md:block relative m-4 rounded-2xl overflow-hidden">
            <img src={img(p.image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black pointer-events-none" />
      </motion.article>
    </div>
  )
}

export function Approach() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="approach" className={sec}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <Title
            index="04"
            tag="The Invicta approach"
            title="SAT preparation built around you"
            body="Your starting point, target universities and school schedule all matter. Invicta brings them into one preparation plan, combining concept learning, test-taking strategy and practice."
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 leading-relaxed lg:pb-2 border-l-2 border-cobalt-500 pl-5"
          >
            Whether you are preparing for your first attempt or aiming to improve a previous score, the goal is to understand your gaps
            and make your study time count.
          </motion.p>
        </div>
        <div ref={ref} className="relative">
          {pillars.map((p, i) => (
            <StackCard key={p.title} p={p} i={i} total={pillars.length} progress={scrollYProgress} />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Magnetic href="#talk-to-expert">
            Find My SAT Prep Plan <Chevron />
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Test structure: terminal console */

const timeline = [
  { id: 'rw1', label: 'Reading and Writing - Module 1', short: 'RW·M1', min: 32, q: 27, c: 'bg-cobalt-500' },
  { id: 'rw2', label: 'Reading and Writing - Module 2', short: 'RW·M2', min: 32, q: 27, c: 'bg-cobalt-400' },
  { id: 'brk', label: 'Break', short: 'BRK', min: 10, q: null, c: 'bg-slate-600' },
  { id: 'm1', label: 'Math - Module 1', short: 'MATH·M1', min: 35, q: 22, c: 'bg-champagne-500' },
  { id: 'm2', label: 'Math - Module 2', short: 'MATH·M2', min: 35, q: 22, c: 'bg-champagne-400' },
]

const files = {
  'reading-writing.txt': {
    intro: 'Short passages or passage pairs are followed by a multiple-choice question. Preparation covers four areas:',
    rows: [
      ['Information and Ideas', 'Understand meaning, interpret evidence and draw conclusions.'],
      ['Craft and Structure', 'Analyse vocabulary, purpose and relationships between ideas.'],
      ['Expression of Ideas', 'Improve clarity, organisation and effective communication.'],
      ['Standard English Conventions', 'Apply grammar, punctuation and sentence structure.'],
    ],
  },
  'math.txt': {
    intro: 'Prepare across Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry. Questions include multiple-choice and answers you enter yourself. Practice should develop both conceptual understanding and the ability to choose an efficient solution under time pressure.',
    rows: [['Algebra'], ['Advanced Math'], ['Problem-Solving and Data Analysis'], ['Geometry and Trigonometry']],
  },
}

function Slider({ label, value, set, fill }) {
  return (
    <label className="block">
      <span className="flex justify-between text-xs text-slate-400 mb-2">
        <span>{label}</span>
        <span className="text-white font-bold tabular-nums">{value}</span>
      </span>
      <input type="range" min={200} max={800} step={10} value={value} onChange={(e) => set(Number(e.target.value))} className="exam-range w-full" style={{ '--fill': fill, '--pct': `${((value - 200) / 600) * 100}%` }} />
    </label>
  )
}

export function Structure() {
  const [seg, setSeg] = useState('rw1')
  const [file, setFile] = useState('reading-writing.txt')
  const [rw, setRw] = useState(600)
  const [math, setMath] = useState(640)
  const cur = timeline.find((t) => t.id === seg)

  return (
    <section id="structure" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Title index="05" tag="Test structure" title="Know the test before you take it" className="mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-2xl border border-white/10 bg-[#050811] font-grotesk overflow-hidden shadow-[0_40px_100px_-40px_rgba(37,99,235,0.6)]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3">invicta@sat: ~/structure</span>
          </div>

          <div className="p-5 sm:p-8 space-y-10">
            {/* timeline */}
            <div>
              <p className="text-sm text-slate-500"><span className="text-emerald-400">$</span> sat --timeline <span className="text-slate-600"># click a block</span></p>
              <div className="mt-4 flex gap-1 h-16">
                {timeline.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSeg(t.id)}
                    style={{ flexGrow: t.min }}
                    aria-pressed={seg === t.id}
                    className={`basis-0 relative rounded-md ${t.c} text-left px-2 py-1.5 transition-all ${seg === t.id ? 'opacity-100 -translate-y-1 shadow-[0_0_24px_rgba(96,165,250,0.6)]' : 'opacity-40 hover:opacity-80'}`}
                  >
                    <span className={`block text-[10px] sm:text-xs font-bold ${t.id.startsWith('m') ? 'text-obsidian-950' : 'text-white'}`}>{t.short}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={seg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed"
                >
                  {`> component   ${cur.label}
> time        ${cur.min} minutes
> questions   ${cur.q ?? '—'}${cur.id === 'brk' ? '\n> note        A 10-minute break separates Reading and Writing from Math.' : ''}`}
                </motion.pre>
              </AnimatePresence>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  ['Reading and Writing total', '64 minutes', '54'],
                  ['Math total', '70 minutes', '44'],
                  ['Total testing time', '134 minutes', '98'],
                ].map(([l, t, q], i) => (
                  <div key={l} className={`rounded-lg px-3 py-2.5 border ${i === 2 ? 'border-cobalt-400/60 text-white' : 'border-white/10 text-slate-400'}`}>
                    {l}: <b className="text-white">{t}</b> · <b className="text-white">{q} q</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* files */}
              <div className="lg:col-span-7">
                <div className="flex gap-1 text-xs">
                  {Object.keys(files).map((f) => (
                    <button key={f} onClick={() => setFile(f)} className={`px-3 py-2 rounded-t-md border-x border-t ${file === f ? 'border-white/15 bg-white/5 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                      {f}
                    </button>
                  ))}
                </div>
                <div className="border border-white/15 rounded-b-md rounded-tr-md bg-white/[0.03] p-5 min-h-[260px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={file} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                      <p className="text-sm text-slate-400 leading-relaxed">{files[file].intro}</p>
                      <ol className="mt-4 space-y-2">
                        {files[file].rows.map(([t, b], i) => (
                          <motion.li key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.08 }} className="text-sm">
                            <span className="text-cobalt-400">{String(i + 1).padStart(2, '0')}</span> <span className="text-white font-bold">{t}</span>
                            {b && <span className="block pl-7 text-slate-500 text-xs mt-0.5">{b}</span>}
                          </motion.li>
                        ))}
                      </ol>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* score calculator */}
              <div className="lg:col-span-5 rounded-xl border border-white/10 p-5">
                <p className="text-sm text-slate-500"><span className="text-emerald-400">$</span> score --calc</p>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">Reading and Writing and Math each receive a score from 200 to 800, giving a total between 400 and 1600.</p>
                <div className="mt-6 space-y-5">
                  <Slider label="Reading and Writing" value={rw} set={setRw} fill="#3b82f6" />
                  <Slider label="Math" value={math} set={setMath} fill="#f59e0b" />
                </div>
                <div className="mt-6 pt-5 border-t border-dashed border-white/15 flex items-end justify-between">
                  <span className="text-xs text-slate-500">TOTAL</span>
                  <motion.span key={rw + math} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white tabular-nums">
                    {rw + math}
                  </motion.span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div animate={{ width: `${((rw + math - 400) / 1200) * 100}%` }} className="h-full bg-gradient-to-r from-cobalt-500 to-champagne-400" />
                </div>
                <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">Your target should reflect your university shortlist, current level and preparation timeline.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Portal: command palette + tilting dashboard */

const portal = [
  { key: 'bank', title: '5,000+ practice questions', body: 'Build familiarity across topics and question types with an extensive question bank.', kbd: 'Q' },
  { key: 'adaptive', title: 'Adaptive learning', body: 'Work through questions whose difficulty responds to your performance, helping direct practice towards your needs.', kbd: 'A' },
  { key: 'ai', title: '24/7 AI tutoring', body: 'Use on-demand explanations and doubt support while you practise between classes.', kbd: 'T' },
  { key: 'game', title: 'Gamified topic practice', body: 'Keep practice engaging with interactive modules organised around specific topics.', kbd: 'G' },
  { key: 'mocks', title: '15 full-length mock tests', body: 'Practise pacing and build familiarity with the digital exam experience.', kbd: 'M' },
  { key: 'diag', title: 'Diagnostic assessments', body: 'Understand your starting point and use the results to shape a focused preparation plan.', kbd: 'D' },
  { key: 'analytics', title: 'Progress analytics', body: 'Review topic performance, patterns and areas that need further work.', kbd: 'P' },
]

function W({ k, active, className = '', children }) {
  const on = active === k
  return (
    <motion.div
      animate={{ opacity: on ? 1 : 0.4, scale: on ? 1.04 : 1, z: on ? 40 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`rounded-xl border p-3.5 ${on ? 'border-cobalt-400 bg-cobalt-500/15 shadow-[0_0_30px_-5px_rgba(96,165,250,0.6)]' : 'border-white/10 bg-white/[0.03]'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Portal() {
  const [active, setActive] = useState('analytics')
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })
  const cur = portal.find((p) => p.key === active)

  return (
    <section id="portal" className={`${sec} bg-gradient-to-b from-transparent via-cobalt-950/30 to-transparent`}>
      <div className="max-w-7xl mx-auto">
        <Title index="06" tag="SAT practice portal" title="Your practice. Your progress. In one place." body="The SAT practice portal brings resources, guided practice and progress tracking together so you can see what needs attention." className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* command palette */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-obsidian-900/80 overflow-hidden font-grotesk">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 text-sm text-slate-500">
              <span aria-hidden="true">⌘K</span>
              <span>Search the portal…</span>
            </div>
            <ul className="p-2" role="listbox" aria-label="Portal features">
              {portal.map((p) => {
                const on = active === p.key
                return (
                  <li key={p.key}>
                    <button
                      role="option"
                      aria-selected={on}
                      onMouseEnter={() => setActive(p.key)}
                      onFocus={() => setActive(p.key)}
                      onClick={() => setActive(p.key)}
                      className={`relative w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors ${on ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {on && <motion.span layoutId="palette-hl" transition={{ type: 'spring', stiffness: 500, damping: 40 }} className="absolute inset-0 rounded-lg bg-cobalt-500/20 border border-cobalt-400/40" />}
                      <span className="relative flex-1 font-semibold">{p.title}</span>
                      <kbd className="relative rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-slate-400">{p.kbd}</kbd>
                    </button>
                  </li>
                )
              })}
            </ul>
            <AnimatePresence mode="wait">
              <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-5 py-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed min-h-[72px]">
                {cur.body}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* dashboard */}
          <div
            className="lg:col-span-7 [perspective:1200px]"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              mx.set((e.clientX - r.left) / r.width - 0.5)
              my.set((e.clientY - r.top) / r.height - 0.5)
            }}
            onMouseLeave={() => {
              mx.set(0)
              my.set(0)
            }}
          >
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="rounded-2xl border border-white/10 bg-obsidian-950 p-4 sm:p-5 font-grotesk text-white">
              <div className="grid grid-cols-6 gap-3 [transform-style:preserve-3d]">
                <W k="bank" active={active} className="col-span-3 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Question bank</p>
                  <p className="text-2xl font-bold mt-1">5,000+</p>
                </W>
                <W k="diag" active={active} className="col-span-3 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Diagnostic</p>
                  <p className="text-xs mt-2">Starting point mapped</p>
                  <div className="mt-2 h-1 rounded bg-emerald-400" />
                </W>
                <W k="adaptive" active={active} className="col-span-6 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Difficulty</p>
                  <div className="flex items-end gap-1 h-10 mt-2">
                    {[25, 40, 35, 55, 70, 85].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-cobalt-500" style={{ height: `${h}%` }} />)}
                  </div>
                </W>
                <W k="analytics" active={active} className="col-span-6 sm:col-span-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">Topic performance</p>
                  <div className="flex items-end gap-2 h-24">
                    {[72, 48, 85, 60, 38, 90].map((h, i) => (
                      <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }} className={`flex-1 rounded-t ${h < 50 ? 'bg-champagne-400' : 'bg-cobalt-500'}`} />
                    ))}
                  </div>
                </W>
                <W k="mocks" active={active} className="col-span-6 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Mock tests · 15</p>
                  <div className="grid grid-cols-5 gap-1">
                    {[...Array(15)].map((_, i) => <span key={i} className={`aspect-square rounded-sm ${i < 4 ? 'bg-cobalt-500' : 'bg-white/10'}`} />)}
                  </div>
                </W>
                <W k="ai" active={active} className="col-span-6 sm:col-span-3">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">AI tutor · 24/7</p>
                  <p className="text-[11px] rounded-lg bg-white/10 px-2.5 py-1.5 w-fit">Why is C wrong?</p>
                  <p className="text-[11px] rounded-lg bg-cobalt-600 px-2.5 py-1.5 w-fit ml-auto mt-1.5">Check what line 2 claims…</p>
                </W>
                <W k="game" active={active} className="col-span-6 sm:col-span-3">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Topic challenge</p>
                  <p className="text-xs">Linear equations · Level 3</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-champagne-400" /></div>
                </W>
              </div>
            </motion.div>
            <p className="mt-3 text-[11px] text-slate-500 font-grotesk">Illustrative view · pick a feature to light it up</p>
          </div>
        </div>

        <div className="mt-12">
          <Magnetic href="#talk-to-expert" variant="gold">
            Ask About the SAT Portal <Chevron />
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
