import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ROUTES } from '../site/links.js'
import { Aurora, Blur, Btn, Lead, Pill, SPRING, glass, sec } from './ui.jsx'

/* ------------------------------------------------ Test options: segmented morph */

const options = [
  {
    short: 'On computer',
    title: 'IELTS on computer at a test centre',
    body: ['Complete Listening, Reading and Writing on a computer at an official centre. The Speaking component is conducted with an examiner.', 'Results are generally available within 1–5 days.'],
    parts: [['Listening', '💻'], ['Reading', '💻'], ['Writing', '💻'], ['Speaking', '🧑‍🏫']],
    badge: 'Results in 1–5 days',
  },
  {
    short: 'Writing on Paper',
    title: 'Writing on Paper, where available',
    body: [
      'IELTS is transitioning away from fully paper-based testing, with timelines varying by market.',
      'In selected locations, a Writing on Paper option allows you to complete Listening and Reading on computer and handwrite the Writing responses. Check availability before booking.',
    ],
    parts: [['Listening', '💻'], ['Reading', '💻'], ['Writing', '✍️'], ['Speaking', '🧑‍🏫']],
    badge: 'Selected locations',
  },
  {
    short: 'IELTS Online',
    title: 'IELTS Online, where available',
    body: ['IELTS Online allows eligible candidates to take Academic IELTS remotely, with Speaking conducted by video call.', 'Confirm that your university accepts it before booking. IELTS Online is not accepted for immigration purposes.'],
    parts: [['Listening', '🏠'], ['Reading', '🏠'], ['Writing', '🏠'], ['Speaking', '📹']],
    badge: 'Not accepted for immigration',
    warn: true,
  },
]

export function Options() {
  const [sel, setSel] = useState(0)
  const o = options[sel]
  return (
    <section id="options" className={sec}>
      <div className="max-w-5xl mx-auto text-center">
        <Lead center pill="Test formats" title="Choose the right way *to take IELTS.*" />
        <div className={`mt-10 inline-flex rounded-full ${glass} p-1.5`} role="tablist">
          {options.map((x, i) => (
            <button key={x.short} role="tab" aria-selected={sel === i} onClick={() => setSel(i)} className={`relative rounded-full px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-colors ${sel === i ? 'text-white' : 'text-violet-900/70'}`}>
              {sel === i && <motion.span layoutId="opt-pill" transition={SPRING} className="absolute inset-0 rounded-full bg-violet-600" />}
              <span className="relative">{x.short}</span>
            </button>
          ))}
        </div>

        <motion.div layout transition={SPRING} className={`mt-8 rounded-[36px] ${glass} p-7 sm:p-10 text-left`}>
          <AnimatePresence mode="popLayout">
            <motion.div key={sel} initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.35 }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-outfit font-bold text-2xl sm:text-3xl text-violet-950">{o.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${o.warn ? 'bg-rose-100 text-rose-700' : 'bg-violet-100 text-violet-700'}`}>{o.badge}</span>
              </div>
              <div className="mt-4 space-y-3 text-violet-950/70 leading-relaxed">
                {o.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {o.parts.map(([p, icon], i) => (
                  <motion.div key={p + icon} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...SPRING, delay: i * 0.06 }} className="rounded-3xl bg-white/80 p-5 text-center">
                    <span className="text-3xl" aria-hidden="true">{icon}</span>
                    <p className="mt-2 text-sm font-semibold text-violet-950">{p}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="mt-8">
          <Btn href="https://ielts.idp.com/india" target="_blank" rel="noopener noreferrer" variant="glass">
            Check Test Options ↗
          </Btn>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Academic vs General: drag-to-compare */

export function Compare() {
  const [pos, setPos] = useState(50)
  return (
    <section id="compare" className={sec}>
      <div className="max-w-6xl mx-auto">
        <Lead center pill="Which version?" title="IELTS Academic or *General Training?*" body="Drag the handle to compare the two versions." />

        <div className="mt-12 relative h-[440px] sm:h-[380px] rounded-[36px] overflow-hidden select-none shadow-[0_30px_80px_-30px_rgba(91,33,182,0.5)]">
          {/* General Training (base layer, right side) */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 flex justify-end">
            <div className="w-1/2 p-6 sm:p-10 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">IELTS General Training</p>
              <ul className="mt-4 space-y-4 text-sm sm:text-base text-amber-950/80 leading-relaxed">
                <li>Commonly used for migration, work-related needs and study below degree level</li>
                <li>Reading and Writing reflect general and everyday contexts</li>
              </ul>
            </div>
          </div>
          {/* Academic (top layer, clipped) */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="w-1/2 p-6 sm:p-10 h-full flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-200">IELTS Academic</p>
              <ul className="mt-4 space-y-4 text-sm sm:text-base text-white/90 leading-relaxed">
                <li>Intended for higher education and certain professional registration purposes</li>
                <li>Reading and Writing reflect academic settings</li>
              </ul>
            </div>
          </div>
          {/* handle */}
          <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)] pointer-events-none" style={{ left: `calc(${pos}% - 2px)` }}>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl grid place-items-center text-violet-700 font-bold">⟷</span>
          </div>
          <input
            type="range"
            min={5}
            max={95}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare IELTS Academic and General Training"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPRING} className={`mt-6 rounded-full ${glass} px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center`}>
          <span className="rounded-full bg-violet-600 text-white px-3 py-1 text-xs font-bold">Same in both</span>
          <span className="text-sm text-violet-950/80">Listening and Speaking are the same in both versions. Reading and Writing differ.</span>
        </motion.div>
        <p className="mt-6 text-center text-violet-950/65 max-w-3xl mx-auto">
          For university applications, IELTS Academic is commonly requested. Always follow the exact requirement given by your institution and any relevant visa authority.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Route: step wizard */

const steps = [
  { title: 'Confirm your requirement', body: 'Check your university shortlist for the required test type, overall band and section minimums.', icon: '📋' },
  { title: 'Understand your current level', body: 'Review your performance across all four skills and identify the gaps between your starting point and target.', icon: '📍' },
  { title: 'Build the skills', body: 'Strengthen vocabulary, grammar, comprehension and expression alongside exam-specific strategies.', icon: '🧱' },
  { title: 'Practise under timed conditions', body: 'Get familiar with the tasks, time limits and interface of your chosen test format.', icon: '⏱️' },
  { title: 'Review and book thoughtfully', body: 'Use your progress to choose a suitable date, leaving room for results and a possible retake before application deadlines.', icon: '✅' },
]

export function Wizard() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (n) => {
    if (n < 0 || n >= steps.length) return
    setDir(n > i ? 1 : -1)
    setI(n)
  }
  const s = steps[i]

  return (
    <section id="route" className={`${sec} overflow-hidden`}>
      <Aurora className="opacity-70" />
      <div className="relative max-w-4xl mx-auto text-center">
        <Lead center pill="Your route" title="From your starting point *to test day*" />

        <div className="mt-10 flex justify-center items-center gap-2" role="tablist" aria-label="Steps">
          {steps.map((x, n) => (
            <button key={x.title} role="tab" aria-selected={n === i} aria-label={`Step ${n + 1}: ${x.title}`} onClick={() => go(n)} className="relative h-3 rounded-full overflow-hidden transition-all duration-500" style={{ width: n === i ? 48 : 12 }}>
              <span className={`absolute inset-0 ${n <= i ? 'bg-violet-600' : 'bg-violet-200'}`} />
            </button>
          ))}
        </div>

        <div className="relative mt-8 h-[300px] sm:h-[260px]">
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.article
              key={i}
              custom={dir}
              variants={{
                enter: (d) => ({ x: d * 120, opacity: 0, scale: 0.9, rotate: d * 4 }),
                center: { x: 0, opacity: 1, scale: 1, rotate: 0 },
                exit: (d) => ({ x: d * -120, opacity: 0, scale: 0.9, rotate: d * -4 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={SPRING}
              drag="x"
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(i + 1)
                else if (info.offset.x > 80) go(i - 1)
              }}
              className={`absolute inset-0 rounded-[36px] ${glass} p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-left cursor-grab active:cursor-grabbing`}
            >
              <span className="shrink-0 w-24 h-24 rounded-[28px] bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-4xl shadow-lg">{s.icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Step {i + 1} of {steps.length}
                </p>
                <h3 className="mt-2 font-outfit font-bold text-2xl sm:text-3xl text-violet-950">{s.title}</h3>
                <p className="mt-3 text-violet-950/70 leading-relaxed">{s.body}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center items-center gap-3">
          <button onClick={() => go(i - 1)} disabled={i === 0} className={`w-12 h-12 rounded-full ${glass} text-violet-900 disabled:opacity-40`} aria-label="Previous step">
            ←
          </button>
          {i < steps.length - 1 ? (
            <button onClick={() => go(i + 1)} className="rounded-full bg-violet-600 text-white px-6 py-3.5 text-sm font-bold hover:bg-violet-700">
              Next step →
            </button>
          ) : (
            <Btn href="#talk-to-expert">Build My IELTS Prep Plan</Btn>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ FAQ: chat */

export function ChatFAQ({ items }) {
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi! Pick a question below or type to search. I’ll answer straight away.' }])
  const [asked, setAsked] = useState([])
  const [typing, setTyping] = useState(false)
  const [q, setQ] = useState('')
  const box = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const el = box.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])
  useEffect(() => () => clearTimeout(timer.current), [])

  const suggestions = items.filter((f) => !asked.includes(f.q) && f.q.toLowerCase().includes(q.trim().toLowerCase()))

  const ask = (f) => {
    if (typing) return
    setAsked((a) => [...a, f.q])
    setMsgs((m) => [...m, { from: 'me', text: f.q }])
    setQ('')
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { from: 'bot', text: f.a }])
    }, 750)
  }

  return (
    <section id="faq" className={sec}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <Lead pill="Questions" title="Frequently asked *questions*" body={`${items.length} answers, one conversation. Ask as many as you like.`} />
        </div>
        <div className={`lg:col-span-8 rounded-[36px] ${glass} overflow-hidden flex flex-col h-[600px]`}>
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/80 bg-white/40">
            <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white font-bold">
              i<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
            </span>
            <div>
              <p className="font-semibold text-violet-950 text-sm">Invicta IELTS desk</p>
              <p className="text-[11px] text-violet-950/50">Answers from our FAQ</p>
            </div>
          </div>

          <div ref={box} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-3" aria-live="polite">
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={SPRING} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[85%] rounded-3xl px-5 py-3 text-sm leading-relaxed ${m.from === 'me' ? 'bg-violet-600 text-white rounded-br-md' : 'bg-white text-violet-950/85 rounded-bl-md shadow-sm'}`}>{m.text}</p>
              </motion.div>
            ))}
            {typing && (
              <div className="flex">
                <span className="rounded-3xl rounded-bl-md bg-white px-5 py-4 flex gap-1.5 shadow-sm" aria-label="Typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }} className="w-2 h-2 rounded-full bg-violet-400" />
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-white/80 bg-white/40 p-4">
            <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {suggestions.map((f) => (
                <button key={f.q} onClick={() => ask(f)} className="shrink-0 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-800 hover:bg-violet-50">
                  {f.q}
                </button>
              ))}
              {suggestions.length === 0 && (
                <span className="text-xs text-violet-950/50 py-2">
                  {asked.length === items.length ? 'That’s every question.' : 'No matching question.'}{' '}
                  <a href="#talk-to-expert" className="font-semibold text-violet-700 underline">Ask an expert →</a>
                </span>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (suggestions[0]) ask(suggestions[0])
              }}
              className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 border border-violet-100"
            >
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to find a question…" aria-label="Search questions" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-violet-950" />
              <button type="submit" aria-label="Ask" className="w-9 h-9 rounded-full bg-violet-600 text-white grid place-items-center">
                ↑
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ CTA: glass form */

const bands = ['6.0', '6.5', '7.0', '7.5', '8.0+', 'Not sure']
const when = ['Within 3 months', '3–6 months', '6–12 months', 'Later']
const places = ['U.S.', 'UK', 'Canada', 'Australia', 'New Zealand', 'Europe']

function Choice({ label, options, multi = false }) {
  const [v, setV] = useState(multi ? [] : null)
  const has = (o) => (multi ? v.includes(o) : v === o)
  const toggle = (o) => setV(multi ? (has(o) ? v.filter((x) => x !== o) : [...v, o]) : o)
  return (
    <fieldset>
      <legend className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <motion.button type="button" whileTap={{ scale: 0.92 }} key={o} onClick={() => toggle(o)} aria-pressed={has(o)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${has(o) ? 'bg-violet-600 text-white' : 'bg-white/80 text-violet-900 hover:bg-white'}`}>
            {o}
          </motion.button>
        ))}
      </div>
    </fieldset>
  )
}

function Float({ id, label, type = 'text', ...rest }) {
  return (
    <div className="relative">
      <input id={id} type={type} placeholder=" " className="peer w-full rounded-2xl bg-white/80 border border-white px-4 pt-6 pb-2 text-violet-950 outline-none focus:ring-2 focus:ring-violet-400" {...rest} />
      <label htmlFor={id} className="absolute left-4 top-4 text-sm text-violet-950/50 transition-all peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-violet-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </label>
    </div>
  )
}

export function CTA() {
  const [done, setDone] = useState(false)
  return (
    <section id="talk-to-expert" className={`${sec} pb-40 overflow-hidden`}>
      <Aurora />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Pill>Next step</Pill>
          <Blur text="Your next academic chapter starts with a *clear plan.*" className="mt-6 font-outfit font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.04] text-violet-950" />
          <p className="mt-6 text-lg text-violet-950/65 leading-relaxed">
            Tell us where you hope to study, the band you need and when you plan to apply. We’ll help you identify the next step in your IELTS preparation.
          </p>
          <Link to={ROUTES.studyAbroad} className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-700 hover:text-violet-900">
            Explore Study Abroad Guidance →
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={SPRING} className={`lg:col-span-7 rounded-[40px] ${glass} p-7 sm:p-10 relative`}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative py-20 text-center">
                {[...Array(14)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: Math.cos((i / 14) * Math.PI * 2) * 160, y: Math.sin((i / 14) * Math.PI * 2) * 120, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className={`absolute left-1/2 top-1/3 w-3 h-3 rounded-full ${['bg-violet-500', 'bg-fuchsia-400', 'bg-amber-400', 'bg-sky-400'][i % 4]}`}
                  />
                ))}
                <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING} className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white text-4xl">
                  ✓
                </motion.p>
                <p className="mt-6 font-outfit font-bold text-2xl text-violet-950">You’re on our list</p>
                <p className="mt-2 text-violet-950/60">An IELTS expert will contact you to plan your next step.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                onSubmit={(e) => {
                  e.preventDefault()
                  setDone(true)
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Float id="i-name" label="Full name" required autoComplete="name" />
                  <Float id="i-phone" label="Phone" type="tel" required autoComplete="tel" />
                </div>
                <Float id="i-email" label="Email" type="email" required autoComplete="email" />
                <Choice label="Where you hope to study" options={places} multi />
                <Choice label="Band you need" options={bands} />
                <Choice label="When you plan to apply" options={when} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 py-4 text-white font-bold shadow-[0_15px_40px_-10px_rgba(124,58,237,0.7)]">
                  Talk to an IELTS Expert
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
