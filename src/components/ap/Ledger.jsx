import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ROUTES } from '../site/links.js'
import { Chapter, EASE, Headline, Ink, Lede, Underline, sec } from './ui.jsx'

/* ------------------------------------------------ Scores: needle gauge */

const scores = [
  [1, 'No recommendation'],
  [2, 'Possibly qualified'],
  [3, 'Qualified'],
  [4, 'Well qualified'],
  [5, 'Extremely well qualified'],
]

export function Scores() {
  const [s, setS] = useState(5)
  const angle = ((s - 1) / 4) * 180 - 90
  const desc = scores[s - 1][1]
  const pt = (score, r) => {
    const a = (((score - 1) / 4) * 180 - 180) * (Math.PI / 180)
    return [150 + r * Math.cos(a), 160 + r * Math.sin(a)]
  }

  return (
    <section id="scores" className={sec}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <Chapter n={6}>Scoring</Chapter>
          <Headline className="mt-6" text="Understand *your AP score*" />
          <Lede className="mt-6">
            Many U.S. universities offer credit or placement for qualifying scores, sometimes starting at 3. Others require higher scores or
            apply different rules by subject.
          </Lede>
          <Lede className="mt-4">Check the policy for your university and degree before assuming that a score will let you skip a course or reduce tuition.</Lede>
          <div className="mt-8">
            <Underline href="https://apstudents.collegeboard.org/getting-credit-placement/search-policies" external>
              Check University Credit Policies
            </Underline>
          </div>
        </div>

        <div className="bg-[#fbf8f1] border border-obsidian-950/15 p-6 sm:p-10 shadow-[8px_8px_0_0_rgba(11,15,25,0.08)]">
          <svg viewBox="0 0 300 180" className="w-full" role="img" aria-label={`Score ${s}: ${desc}`}>
            <path d="M20 160 A130 130 0 0 1 280 160" fill="none" stroke="#0b0f19" strokeOpacity="0.12" strokeWidth="22" />
            <motion.path d="M20 160 A130 130 0 0 1 280 160" fill="none" stroke="#065f46" strokeWidth="22" initial={false} animate={{ pathLength: (s - 1) / 4 + 0.001 }} transition={{ type: 'spring', stiffness: 90, damping: 16 }} />
            {scores.map(([n]) => {
              const [x, y] = pt(n, 100)
              return (
                <g key={n} onClick={() => setS(n)} className="cursor-pointer">
                  <circle cx={x} cy={y} r="15" fill={s === n ? '#0b0f19' : '#fbf8f1'} stroke="#0b0f19" strokeWidth="1.5" />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontFamily="Source Serif 4, serif" fill={s === n ? '#fbf8f1' : '#0b0f19'}>
                    {n}
                  </text>
                </g>
              )
            })}
            <motion.g animate={{ rotate: angle }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} style={{ originX: 0.5, originY: 1 }}>
              <line x1="150" y1="160" x2="150" y2="90" stroke="#0b0f19" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
            <circle cx="150" cy="160" r="8" fill="#0b0f19" />
          </svg>
          <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose a score">
            {scores.map(([n]) => (
              <button key={n} onClick={() => setS(n)} aria-pressed={s === n} className={`w-10 h-10 rounded-full border font-display text-lg transition-colors ${s === n ? 'bg-obsidian-950 text-[#fbf8f1] border-obsidian-950' : 'border-obsidian-950/30 hover:border-obsidian-950'}`}>
                {n}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-obsidian-950/50">College Board description</p>
              <p className="mt-2 font-display italic text-3xl text-obsidian-950">{desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Delivery: pen or screen */

const modes = {
  digital: {
    label: 'Fully digital exams',
    body: 'For AP Computer Science A and AP English Language and Composition, students complete both sections in Bluebook.',
    subjects: ['Computer Science A', 'English Language and Composition'],
    fr: 'screen',
  },
  hybrid: {
    label: 'Hybrid digital exams',
    body: 'For the Calculus, Physics C and Economics exams listed here, students complete multiple-choice questions and view free-response prompts in Bluebook, then write their free-response answers in paper booklets.',
    subjects: ['Calculus AB', 'Calculus BC', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'Microeconomics', 'Macroeconomics'],
    fr: 'paper',
  },
}

function Screen() {
  return (
    <svg viewBox="0 0 80 60" className="w-20 h-16" aria-hidden="true">
      <rect x="6" y="6" width="68" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M0 52h80" stroke="currentColor" strokeWidth="3" />
      <path d="M16 18h30M16 26h44M16 34h22" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function Paper() {
  return (
    <svg viewBox="0 0 80 60" className="w-20 h-16" aria-hidden="true">
      <rect x="14" y="4" width="44" height="52" fill="none" stroke="currentColor" strokeWidth="3" />
      <motion.path d="M22 18 q6 -4 12 0 t12 0 M22 28 q6 -4 12 0 t12 0 M22 38 q6 -4 12 0" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
      <path d="M62 10 l10 10 -22 26 -10 2 2 -10z" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

export function Delivery() {
  const [mode, setMode] = useState('hybrid')
  const m = modes[mode]
  return (
    <section id="delivery" className={`${sec} bg-obsidian-950 text-[#fbf8f1]`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="font-display italic text-lg text-amber-300">Ch. VII</span>
          <span className="h-px w-24 bg-[#fbf8f1]/40" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/70 font-semibold">On the day</span>
        </div>
        <h2 className="mt-6 font-display font-medium text-4xl sm:text-6xl tracking-tight leading-[1.04]">
          Know how your exam <em className="text-amber-300">will be delivered</em>
        </h2>

        <div className="mt-12 inline-flex border-b border-[#fbf8f1]/20" role="tablist">
          {Object.entries(modes).map(([k, v]) => (
            <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`relative px-1 mr-8 pb-3 font-display text-xl sm:text-2xl transition-colors ${mode === k ? 'text-[#fbf8f1]' : 'text-[#fbf8f1]/40 hover:text-[#fbf8f1]/70'}`}>
              {v.label}
              {mode === k && <motion.span layoutId="delivery-ink" className="absolute left-0 right-0 -bottom-px h-0.5 bg-amber-300" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: EASE }} className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-lg text-[#fbf8f1]/75 leading-relaxed">{m.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {m.subjects.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }} className="rounded-full border border-[#fbf8f1]/25 px-3.5 py-1.5 text-sm font-display italic">
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Multiple choice', 'screen'],
                ['Free response', m.fr],
              ].map(([t, kind]) => (
                <div key={t} className="border border-[#fbf8f1]/20 p-6 text-center">
                  <div className="flex justify-center text-amber-300">{kind === 'screen' ? <Screen /> : <Paper />}</div>
                  <p className="mt-4 font-display text-xl">{t}</p>
                  <p className="text-sm text-[#fbf8f1]/60 italic">{kind === 'screen' ? 'In Bluebook' : 'Handwritten in a paper booklet'}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-10 text-sm text-[#fbf8f1]/60 max-w-3xl">Your school or test centre will explain device requirements and exam-day arrangements. Practise in the relevant format before your exam.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Calendar: a planner page */

const schedule = [
  { subject: 'Physics C: Mechanics', day: 3 },
  { subject: 'Microeconomics', day: 4 },
  { subject: 'Physics C: Electricity and Magnetism', day: 5 },
  { subject: 'Macroeconomics', day: 7 },
  { subject: 'Calculus AB and Calculus BC', day: 10 },
  { subject: 'English Language and Composition', day: 12 },
  { subject: 'Computer Science A', day: 12 },
]
const windowDays = [3, 4, 5, 6, 7, 10, 11, 12, 13, 14]
const FIRST = new Date(2027, 4, 1).getDay()

export function Calendar() {
  const [sel, setSel] = useState(3)
  const days = Math.max(0, Math.ceil((new Date(2027, 4, 3) - Date.now()) / 86400000))
  const cells = [...Array(FIRST).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)]
  const onDay = schedule.filter((x) => x.day === sel)

  return (
    <section id="calendar" className={sec}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Chapter n={8}>Exam calendar</Chapter>
            <Headline className="mt-6" text="Plan for the *May 2027* exam window" />
            <Lede className="mt-5">The main AP exam window runs from May 3–7 and May 10–14, 2027.</Lede>
          </div>
          <p className="lg:col-span-5 lg:text-right font-display italic text-2xl text-obsidian-950">
            <span className="text-6xl not-italic text-emerald-800 tabular-nums">{days}</span> days to go
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* planner */}
          <div className="lg:col-span-7 relative bg-[#fbf8f1] border border-obsidian-950/15 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] pt-10 px-4 sm:px-8 pb-8">
            <div className="absolute top-3 inset-x-8 flex justify-between" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-[#ece3d2] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />
              ))}
            </div>
            <p className="font-display text-3xl text-obsidian-950">
              May <span className="italic text-obsidian-950/50">2027</span>
            </p>
            <div className="mt-6 grid grid-cols-7 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} className="pb-3 text-[10px] uppercase tracking-[0.3em] text-obsidian-950/50">{d}</span>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`e${i}`} className="border-t border-obsidian-950/10" />
                const inWin = windowDays.includes(d)
                const exams = schedule.filter((x) => x.day === d).length
                const on = sel === d
                return (
                  <button
                    key={d}
                    onClick={() => inWin && setSel(d)}
                    disabled={!inWin}
                    aria-pressed={on}
                    aria-label={`May ${d}${exams ? `, ${exams} exam${exams > 1 ? 's' : ''}` : ''}`}
                    className={`relative aspect-square border-t border-obsidian-950/10 font-display text-lg sm:text-xl ${inWin ? 'text-obsidian-950 cursor-pointer' : 'text-obsidian-950/30 cursor-default'}`}
                  >
                    {inWin && <span className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-6 bg-amber-300/40 -skew-x-6 rounded-sm" />}
                    <span className="relative">{d}</span>
                    {exams > 0 && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-display italic text-[10px] text-emerald-800">{exams > 1 ? '×2' : '•'}</span>}
                    {on && (
                      <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full text-emerald-800" aria-hidden="true">
                        <motion.path d="M30 6 C 52 4, 56 26, 52 40 C 46 56, 14 56, 8 38 C 3 22, 14 6, 34 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-obsidian-950/60 italic font-display">Highlighted: the exam window. Tap a date to see what’s on.</p>
          </div>

          {/* notes */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-emerald-900 text-[#fbf8f1] p-7 min-h-[160px]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#fbf8f1]/60">
                {new Date(2027, 4, sel).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <AnimatePresence mode="wait">
                <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 space-y-1">
                  {onDay.length ? onDay.map((x) => <p key={x.subject} className="font-display text-2xl">{x.subject}</p>) : <p className="font-display italic text-[#fbf8f1]/70">No exam from this page is scheduled on this day.</p>}
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className="border-t-2 border-obsidian-950">
              {schedule.map((x) => (
                <li key={x.subject} className="border-b border-obsidian-950/15">
                  <button onClick={() => setSel(x.day)} className={`w-full flex items-baseline gap-4 py-3 text-left ${sel === x.day ? 'text-emerald-800' : 'text-obsidian-950'}`}>
                    <span className="font-display italic w-14 shrink-0">May {x.day}</span>
                    <span className="text-sm">{x.subject}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <p className="lg:col-span-7 text-obsidian-950/70 leading-relaxed">
            Confirm your exact start time and registration deadline with your AP coordinator or test centre. Local registration deadlines can arrive well before May.
          </p>
          <aside className="lg:col-span-5 border-l-4 border-amber-500 bg-amber-100/60 px-5 py-4 font-display italic text-obsidian-950">
            Calculus AB and BC are scheduled together, so plan to take one of them in the same year.
          </aside>
        </div>
        <div className="mt-6">
          <Underline href="https://apstudents.collegeboard.org/exam-dates" external>
            View the Official AP Schedule
          </Underline>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Route: a winding path */

const steps = [
  { title: 'Choose with your future in mind', body: 'Discuss your academic interests, possible major and university plans. Select subjects that add value to your pathway.' },
  { title: 'Map your preparation', body: 'Review the syllabus, your current knowledge and the time available alongside school work.' },
  { title: 'Build understanding', body: 'Strengthen concepts before moving into exam-style questions. Practise applying knowledge to unfamiliar problems.' },
  { title: 'Practise and review', body: 'Work through timed tasks, study your errors and refine your answers. For written responses, learn how to show the reasoning the question asks for.' },
  { title: 'Prepare for the actual format', body: 'Become comfortable with Bluebook, permitted materials and any handwritten response requirements.' },
]

export function Route() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const n = steps.length
  const d = steps.map((_, i) => `C ${i % 2 ? 15 : 85} ${i * 100 + 25}, ${i % 2 ? 15 : 85} ${i * 100 + 75}, 50 ${i * 100 + 100}`).join(' ')

  return (
    <section id="route" className={`${sec} bg-[#ece3d2]`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <Chapter n={9} className="justify-center">Your route</Chapter>
          <Headline className="mt-6" text="From subject selection *to exam day*" />
        </div>

        <div ref={ref} className="relative mt-16" style={{ height: `${n * 220}px` }}>
          <svg viewBox={`0 0 100 ${n * 100}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path d={`M50 0 ${d}`} fill="none" stroke="#0b0f19" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            <motion.path d={`M50 0 ${d}`} fill="none" stroke="#065f46" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE }}
              className={`absolute w-[46%] ${i % 2 ? 'left-0 text-right pr-4' : 'right-0 pl-4'}`}
              style={{ top: `${((i * 100 + 30) / (n * 100)) * 100}%` }}
            >
              <p className="font-display italic text-emerald-800 text-lg">Step {i + 1}</p>
              <h3 className="font-display text-xl sm:text-2xl text-obsidian-950 leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-obsidian-950/70 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Ink href="#talk-to-expert">Build My AP Preparation Plan</Ink>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ FAQ: newspaper Q&A columns */

export function FAQ({ items }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState([0])
  const shown = items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()))
  const toggle = (k) => setOpen((o) => (o.includes(k) ? o.filter((x) => x !== k) : [...o, k]))

  return (
    <section id="faq" className={sec}>
      <div className="max-w-7xl mx-auto">
        <div className="border-y-2 border-obsidian-950 py-3 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-obsidian-950">Ch. X · Letters & answers</p>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the index…"
            aria-label="Search questions"
            className="bg-transparent border-b border-obsidian-950/40 focus:border-emerald-800 outline-none font-display italic text-lg py-1 w-full sm:w-72 placeholder:text-obsidian-950/40"
          />
        </div>
        <Headline className="mt-10" text="Frequently asked *questions*" />
        <div className="mt-10 md:columns-2 gap-12 [column-rule:1px_solid_rgba(11,15,25,0.15)]">
          {shown.map((f) => {
            const k = items.indexOf(f)
            const on = open.includes(k)
            return (
              <article key={f.q} className="break-inside-avoid mb-6 pb-6 border-b border-obsidian-950/10">
                <button onClick={() => toggle(k)} aria-expanded={on} className="w-full text-left flex gap-3 group">
                  <span className="font-display italic text-2xl text-emerald-800 leading-none">Q.</span>
                  <span className="font-display text-xl text-obsidian-950 leading-snug group-hover:underline decoration-emerald-800/40 underline-offset-4">{f.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                      <p className="pt-3 flex gap-3 text-obsidian-950/75 leading-relaxed">
                        <span className="font-display italic text-2xl text-obsidian-950/30 leading-none">A.</span>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
        {shown.length === 0 && <p className="mt-6 font-display italic text-obsidian-950/60">Nothing in the index for “{q}”. Write to us below.</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------ CTA: a letter you fill in */

const subjectsList = ['Calculus AB', 'Calculus BC', 'Physics C: Mechanics', 'Physics C: E&M', 'Microeconomics', 'Macroeconomics', 'Computer Science A', 'English Language']

export function Letter() {
  const [sent, setSent] = useState(false)
  const [picked, setPicked] = useState([])
  const blank = 'bg-transparent border-b-2 border-dotted border-obsidian-950/40 focus:border-emerald-800 outline-none px-1 font-display italic text-emerald-900 placeholder:text-obsidian-950/30'

  return (
    <section id="talk-to-expert" className={`${sec} pb-32`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <Chapter n={11}>Correspondence</Chapter>
          <Headline className="mt-6" text="Ready to take your learning *further?*" />
          <Lede className="mt-6">Tell us which subjects interest you and where you hope to study. We’ll help you connect your AP preparation to a clearer academic plan.</Lede>
          <Link to={ROUTES.studyAbroad} className="mt-8 inline-block font-display italic text-lg underline decoration-obsidian-950/30 underline-offset-4 hover:decoration-emerald-800">
            Explore Undergraduate Admissions Support →
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="lg:col-span-8 relative bg-[#fffdf8] border border-obsidian-950/15 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] p-7 sm:p-12"
        >
          <div className="absolute top-6 right-6 w-20 h-24 border-2 border-dashed border-emerald-800/50 p-1.5 rotate-3" aria-hidden="true">
            <div className="w-full h-full bg-emerald-800 text-[#fbf8f1] grid place-items-center font-display italic text-2xl">AP</div>
          </div>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                <motion.div initial={{ scale: 2, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: -12, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="inline-block border-4 border-emerald-800 text-emerald-800 px-6 py-3 font-display text-3xl uppercase tracking-widest">
                  Sent
                </motion.div>
                <p className="mt-8 font-display italic text-2xl text-obsidian-950">Thank you. An AP expert will be in touch shortly.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="font-display text-xl sm:text-2xl text-obsidian-950 leading-[2.4]"
              >
                <p className="italic text-obsidian-950/60 text-lg">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="mt-4">Dear Invicta,</p>
                <p>
                  I’m in{' '}
                  <select required defaultValue="" aria-label="Current class" className={`${blank} appearance-none cursor-pointer`}>
                    <option value="" disabled>
                      class …
                    </option>
                    {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>{' '}
                  and I’m interested in these subjects:
                </p>
                <div className="flex flex-wrap gap-2 my-2 leading-normal">
                  {subjectsList.map((s) => {
                    const on = picked.includes(s)
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setPicked((p) => (on ? p.filter((x) => x !== s) : [...p, s]))}
                        aria-pressed={on}
                        className={`text-base rounded-full px-3 py-1 border transition-colors ${on ? 'bg-emerald-800 border-emerald-800 text-[#fbf8f1]' : 'border-obsidian-950/25 hover:border-obsidian-950'}`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
                <p>
                  I hope to study in <input aria-label="Where you hope to study" placeholder="country or university" className={`${blank} w-56`} />.
                </p>
                <p>
                  You can reach me on <input required type="tel" aria-label="Phone" placeholder="phone" autoComplete="tel" className={`${blank} w-44`} /> or at{' '}
                  <input required type="email" aria-label="Email" placeholder="email" autoComplete="email" className={`${blank} w-60`} />.
                </p>
                <p className="mt-4">Yours sincerely,</p>
                <input required aria-label="Your name" placeholder="your name" autoComplete="name" className={`${blank} text-3xl w-72`} />
                <div className="mt-10 leading-normal">
                  <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-obsidian-950 text-[#fbf8f1] pl-6 pr-1.5 py-1.5 text-sm font-jakarta font-semibold hover:bg-emerald-900 transition-colors">
                    Talk to an AP Expert
                    <span className="w-9 h-9 rounded-full grid place-items-center bg-[#fbf8f1] text-obsidian-950">
                      <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
                    </span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
