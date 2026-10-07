import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { img, ROUTES } from '../site/links.js'
import { Chevron, EASE, Magnetic, Tag, Title, sec } from './ui.jsx'

/* ------------------------------------------------ Route: commit log */

const steps = [
  { title: 'Understand your starting point', body: 'Review your current skills, target score and application timeline. Identify the areas that need the most attention.', hash: 'a1f3c9e' },
  { title: 'Build the foundation', body: 'Strengthen concepts before relying on speed. Work on reading accuracy, grammar, mathematical understanding and problem-solving methods.', hash: 'b7d204a' },
  { title: 'Practise with a purpose', body: 'Move from topic practice to timed modules and full-length mocks. Use digital tools regularly so the interface feels familiar.', hash: 'c90e1f2' },
  { title: 'Review, refine and prepare', body: 'Analyse errors, revisit weak topics and adjust your strategy. Keep registration, device setup and test-day requirements on your checklist.', hash: 'd44ab87' },
]

export function Route() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const h = useTransform(useSpring(scrollYProgress, { stiffness: 120, damping: 30 }), (v) => `${v * 100}%`)

  return (
    <section id="route" className={sec}>
      <div className="max-w-5xl mx-auto">
        <Title index="07" tag="git log --route" title="A clear route from preparation to test day" className="mb-14" />
        <div ref={ref} className="relative font-grotesk">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
          <motion.div style={{ height: h }} className="absolute left-[11px] top-2 w-0.5 bg-gradient-to-b from-cobalt-400 to-champagne-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          <ol className="space-y-12">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative pl-12"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-cobalt-400 bg-obsidian-950 grid place-items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-cobalt-400" />
                </motion.span>
                <p className="text-xs text-slate-500">
                  <span className="text-champagne-400">commit {s.hash}</span> · step {i + 1} of {steps.length}
                  {i === steps.length - 1 && <span className="ml-2 rounded border border-emerald-400/50 px-1.5 py-0.5 text-emerald-300">HEAD → test-day</span>}
                </p>
                <h3 className="mt-2 font-outfit font-bold text-2xl text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-2xl font-jakarta">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Dates: draggable boarding passes */

const dates = [
  ['2026-11-07', '2026-10-23', '2026-10-27'],
  ['2026-12-05', '2026-11-20', '2026-11-24'],
  ['2027-03-06', '2027-02-19', '2027-02-23'],
  ['2027-05-01', '2027-04-16', '2027-04-20'],
  ['2027-06-05', '2027-05-21', '2027-05-25'],
]
const day = (s) => new Date(`${s}T23:59:00`)
const fmt = (s, o) => day(s).toLocaleDateString('en-US', o)
const until = (s) => Math.ceil((day(s) - Date.now()) / 86400000)

function status([test, reg, late]) {
  if (until(reg) >= 0) return ['Registration open', 'text-emerald-600 border-emerald-500', `${until(reg)} days to regular deadline`]
  if (until(late) >= 0) return ['Late registration', 'text-amber-600 border-amber-500', `${until(late)} days to late deadline`]
  if (until(test) >= 0) return ['Registration closed', 'text-slate-500 border-slate-400', `${until(test)} days to test day`]
  return ['Completed', 'text-slate-400 border-slate-300', 'This date has passed']
}

function Pass({ d, i, next }) {
  const [label, tone, note] = status(d)
  const [test, reg, late] = d
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
      whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
      className="relative shrink-0 w-[300px] sm:w-[360px] rounded-2xl bg-white text-obsidian-950 overflow-hidden select-none"
    >
      <div className="flex">
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between font-grotesk text-[10px] uppercase tracking-widest text-slate-500">
            <span>Digital SAT · Test day</span>
            {next && <span className="rounded bg-cobalt-600 text-white px-1.5 py-0.5">Next up</span>}
          </div>
          <p className="mt-3 font-outfit font-black text-4xl tracking-tight">{fmt(test, { month: 'short', day: 'numeric' })}</p>
          <p className="font-grotesk text-xs text-slate-500">{fmt(test, { weekday: 'long', year: 'numeric' })}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 font-grotesk">
            <div>
              <dt className="text-[9px] uppercase tracking-widest text-slate-400">Regular deadline</dt>
              <dd className="text-xs font-bold">{fmt(reg, { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-widest text-slate-400">Late & changes</dt>
              <dd className="text-xs font-bold">{fmt(late, { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
            </div>
          </dl>
        </div>
        <div className="relative w-24 border-l-2 border-dashed border-slate-300 p-3 flex flex-col items-center justify-between">
          <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-obsidian-950" />
          <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-obsidian-950" />
          <span className={`rotate-[-12deg] mt-3 rounded border-2 px-1.5 py-1 text-[9px] font-black uppercase tracking-wider text-center leading-tight ${tone}`}>{label}</span>
          <div className="flex gap-[2px] h-10 items-end" aria-hidden="true">
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2].map((w, j) => <span key={j} className="bg-obsidian-950 h-full" style={{ width: w }} />)}
          </div>
        </div>
      </div>
      <p className="px-5 py-2.5 bg-slate-100 font-grotesk text-[11px] text-slate-600">{note}</p>
    </motion.article>
  )
}

export function Dates() {
  const track = useRef(null)
  const [limit, setLimit] = useState(0)
  const next = dates.findIndex((d) => until(d[2]) >= 0)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setLimit(Math.max(0, el.scrollWidth - el.parentElement.offsetWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section id="dates" className={`${sec} overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <Title
            index="08"
            tag="Boarding · Nov 2026 – Jun 2027"
            title="Choose a test date that fits your application plan"
            body="Leave enough time to prepare, receive your results and consider a retake if needed. Work backwards from your university deadlines."
          />
          <a href="https://satsuite.collegeboard.org/sat/dates-deadlines" target="_blank" rel="noopener noreferrer" className="shrink-0 font-grotesk text-xs uppercase tracking-widest text-cobalt-300 hover:text-white border-b border-cobalt-400/50 pb-1">
            View Official SAT Dates ↗
          </a>
        </div>
        <p className="font-grotesk text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-5">← Drag to browse →</p>
        <div className="cursor-grab active:cursor-grabbing">
          <motion.div ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} dragElastic={0.08} className="flex gap-5 w-max">
            {dates.map((d, i) => (
              <Pass key={d[0]} d={d} i={i} next={i === next} />
            ))}
          </motion.div>
        </div>
        <p className="mt-8 text-xs text-slate-500 leading-relaxed max-w-3xl font-grotesk">
          Deadlines expire at 11:59 p.m. U.S. Eastern Time. Late registration carries an additional fee. If you need to borrow a College
          Board device, register and request it at least 30 days before test day.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Admissions: cursor-follow image list */

const services = [
  { title: 'Profile evaluation and building', lead: 'Understand where your application stands and where you can improve. We review your academics, test scores, interests, activities and leadership experience.', body: 'Build a personalised roadmap for classes 9–12, with relevant opportunities such as projects, internships, research, summer programmes, competitions and volunteering.', image: 'indian-college-students.jpg' },
  { title: 'University shortlisting', lead: 'Find universities that fit your intended major, academic profile, preferred location and budget.', body: 'We help you compare course quality, scholarship opportunities, honours programmes and campus experience, with a balanced list of options.', image: 'college-pic.jpg' },
  { title: 'Recommendation guidance', lead: 'Choose recommenders who know your work and can speak meaningfully about your potential.', body: 'We help you organise relevant achievements and talking points so your teachers or mentors have useful context. Recommendations should remain authentic and reflect the recommender’s own assessment.', image: 'professional-lady.jpg' },
  { title: 'Essay brainstorming and editing', lead: 'Find the experiences and ideas that make your application personal.', body: 'Get guidance on Common App essays, university supplements and scholarship essays, with feedback on structure, clarity, grammar and voice. Your experiences and authorship stay at the centre.', image: 'study-abroad-hero.jpg' },
  { title: 'Resume review', lead: 'Present your activities and achievements clearly.', body: 'We help organise projects, internships, awards, research, competitions and volunteering, highlighting what you contributed and learned.', image: 'get-started-section.jpg' },
  { title: 'Visa and pre-departure guidance', lead: 'Prepare for the steps after admission with document guidance, interview practice and a practical departure checklist.', body: 'For students heading to the U.S., support may include reviewing I-20 documents, understanding DS-160 and SEVIS steps, and preparing to discuss study plans and finances. We also cover practical questions around travel, insurance and housing.', image: 'hero-section-3.jpg' },
]

export function Admissions() {
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 25 })
  const sy = useSpring(y, { stiffness: 200, damping: 25 })

  return (
    <section
      id="admissions"
      className={sec}
      onMouseMove={(e) => {
        x.set(e.clientX + 24)
        y.set(e.clientY - 110)
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Title
          index="09"
          tag="Beyond the score"
          title="Your SAT score is one part of a stronger application."
          body="Invicta connects test preparation with undergraduate admissions guidance, helping you plan your profile, shortlist and applications alongside your exam."
          className="mb-14"
        />

        <ul className="border-t border-white/10" onMouseLeave={() => setHover(null)}>
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className="border-b border-white/10" onMouseEnter={() => setHover(i)}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="group w-full flex items-center gap-4 sm:gap-8 py-6 sm:py-8 text-left">
                  <span className="font-grotesk text-xs text-slate-500 w-8">0{i + 1}</span>
                  <span className={`flex-1 font-outfit font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300 ${hover === i || isOpen ? 'text-white translate-x-2' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="w-10 h-10 rounded-full border border-white/20 grid place-items-center text-white text-xl shrink-0 group-hover:bg-cobalt-500 group-hover:border-cobalt-500 transition-colors">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <div className="pb-8 pl-12 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6">
                        <img src={img(s.image)} alt="" className="md:hidden w-full aspect-video object-cover rounded-xl" />
                        <p className="md:col-span-5 text-white font-semibold leading-relaxed">{s.lead}</p>
                        <p className="md:col-span-7 text-slate-400 leading-relaxed">{s.body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className="mt-12">
          <Magnetic href="#talk-to-expert" variant="ghost">
            Explore Undergraduate Admissions Support <Chevron />
          </Magnetic>
        </div>
      </div>

      {/* floating preview that trails the cursor (desktop) */}
      <motion.div style={{ x: sx, y: sy }} className="hidden lg:block fixed top-0 left-0 z-30 pointer-events-none">
        <AnimatePresence>
          {hover !== null && open !== hover && (
            <motion.img
              key={hover}
              src={img(services[hover].image)}
              alt=""
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute w-64 h-44 object-cover rounded-xl shadow-2xl border border-white/20"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------ Additional support: twin marquee */

const extras = ['Scholarship identification and application guidance', 'SAT and AP registration assistance', 'Common App and Coalition application navigation', 'Pre-departure sessions for students and parents', 'Individual strategy sessions']

function Belt({ reverse }) {
  const reduce = useReducedMotion()
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div className="flex w-max gap-4" animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: 40, ease: 'linear', repeat: Infinity }}>
        {[...extras, ...extras].map((e, i) => (
          <span key={i} aria-hidden={i >= extras.length} className={`shrink-0 rounded-full px-6 py-3 font-grotesk text-sm ${reverse ? 'border border-white/15 text-slate-300' : 'bg-cobalt-500/15 text-cobalt-200 border border-cobalt-400/30'}`}>
            + {e}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Support() {
  return (
    <section className="relative py-20 space-y-4 border-y border-white/10 bg-obsidian-900/40">
      <div className="text-center px-5 mb-10">
        <Tag className="justify-center">Additional support when you need it</Tag>
        <p className="mt-3 text-slate-400">Build on your preparation with:</p>
      </div>
      <Belt />
      <Belt reverse />
      <div className="pt-8 flex justify-center">
        <Magnetic href="#talk-to-expert" variant="gold">
          Discuss My Requirements <Chevron />
        </Magnetic>
      </div>
    </section>
  )
}

/* ------------------------------------------------ FAQ: master–detail with typed answers */

function Typed({ text }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) return
    setN(0)
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 3)), 12)
    return () => clearInterval(id)
  }, [text, reduce])
  return (
    <p className="text-lg sm:text-xl text-white leading-relaxed">
      {text.slice(0, n)}
      {n < text.length && <span className="inline-block w-2 h-5 bg-cobalt-400 align-middle ml-0.5 animate-pulse" />}
    </p>
  )
}

export function FAQ({ items }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const shown = items.map((f, i) => ({ ...f, i })).filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()))
  const current = items[sel]

  return (
    <section id="faq" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Title index="10" tag="FAQ" title="Frequently asked questions" className="mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <label className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 font-grotesk text-sm focus-within:border-cobalt-400">
              <span className="text-emerald-400">&gt;</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search_" aria-label="Search questions" className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500" />
            </label>
            <ul className="mt-3 space-y-1">
              {shown.map((f) => {
                const on = sel === f.i
                return (
                  <li key={f.q}>
                    <button onClick={() => setSel(f.i)} aria-pressed={on} className={`relative w-full text-left rounded-xl px-4 py-3.5 text-sm transition-colors ${on ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                      {on && <motion.span layoutId="faq-sel" className="absolute inset-0 rounded-xl bg-cobalt-500/15 border border-cobalt-400/40" />}
                      <span className="relative flex gap-3">
                        <span className="font-grotesk text-xs text-cobalt-400 pt-0.5">{String(f.i + 1).padStart(2, '0')}</span>
                        {f.q}
                      </span>
                    </button>
                    <AnimatePresence>
                      {on && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden px-4 text-sm text-slate-300 leading-relaxed">
                          <span className="block py-3">{f.a}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
              {shown.length === 0 && <li className="px-4 py-6 text-sm text-slate-500 font-grotesk">0 results. <a href="#talk-to-expert" className="text-cobalt-300 underline">Ask the team →</a></li>}
            </ul>
          </div>
          <div className="hidden lg:block lg:col-span-7">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-gradient-to-br from-obsidian-900 to-cobalt-950/60 p-10 min-h-[320px]">
              <p className="font-grotesk text-xs text-slate-500 mb-4">Q{String(sel + 1).padStart(2, '0')} · {current.q}</p>
              <Typed text={current.a} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ CTA: conversational step form */

const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Gap year']
const targets = ['Below 1200', '1200–1350', '1350–1450', '1450+', 'Not sure yet']

export function CTA() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const pick = (k, v) => {
    setAnswers((a) => ({ ...a, [k]: v }))
    setStep((s) => s + 1)
  }
  const field = 'w-full bg-transparent border-b border-white/20 focus:border-cobalt-400 outline-none py-3 text-lg text-white placeholder:text-slate-600'

  const screens = [
    <div key="0">
      <p className="font-grotesk text-xs text-cobalt-300">1 / 3</p>
      <h3 className="mt-3 font-outfit font-bold text-2xl sm:text-3xl text-white">Which class are you in?</h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {classes.map((c) => (
          <button key={c} onClick={() => pick('class', c)} className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-cobalt-500 hover:border-cobalt-500 transition-colors">
            {c}
          </button>
        ))}
      </div>
    </div>,
    <div key="1">
      <p className="font-grotesk text-xs text-cobalt-300">2 / 3</p>
      <h3 className="mt-3 font-outfit font-bold text-2xl sm:text-3xl text-white">What score are you aiming for?</h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {targets.map((c) => (
          <button key={c} onClick={() => pick('target', c)} className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-cobalt-500 hover:border-cobalt-500 transition-colors">
            {c}
          </button>
        ))}
      </div>
    </div>,
    <form
      key="2"
      onSubmit={(e) => {
        e.preventDefault()
        setStep(3)
      }}
    >
      <p className="font-grotesk text-xs text-cobalt-300">3 / 3</p>
      <h3 className="mt-3 font-outfit font-bold text-2xl sm:text-3xl text-white">Where can we reach you?</h3>
      <div className="mt-4 space-y-2">
        <input className={field} required placeholder="Your name" autoComplete="name" aria-label="Your name" />
        <input className={field} required type="tel" placeholder="Phone" autoComplete="tel" aria-label="Phone" />
        <input className={field} required type="email" placeholder="Email" autoComplete="email" aria-label="Email" />
        <input className={field} placeholder="University plans (optional)" aria-label="University plans" />
      </div>
      <button type="submit" className="mt-8 w-full rounded-full bg-cobalt-500 hover:bg-cobalt-400 py-4 font-grotesk text-sm font-bold uppercase tracking-widest text-white transition-colors">
        Talk to a SAT Expert &gt;
      </button>
    </form>,
    <div key="3" className="text-center py-8">
      <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }} className="mx-auto w-16 h-16 rounded-full bg-emerald-500 grid place-items-center text-3xl text-white">
        ✓
      </motion.p>
      <h3 className="mt-5 font-outfit font-bold text-2xl text-white">Request received</h3>
      <p className="mt-2 text-slate-400 text-sm">
        {answers.class} · target {answers.target}. A SAT expert will call you to talk through where to begin.
      </p>
    </div>,
  ]

  return (
    <section id="talk-to-expert" className={`${sec} overflow-hidden`}>
      <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-cobalt-700/30 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <Tag index="11">Next step</Tag>
          <h2 className="mt-6 font-outfit font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-white">
            Your next step starts with a <span className="text-cobalt-400">conversation.</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg">
            Tell us your current class, target score and university plans. We’ll help you understand where to begin and what to focus on next.
          </p>
          <Link to={ROUTES.studyAbroad} className="group mt-8 inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-widest text-slate-300 hover:text-white">
            Explore Undergraduate Guidance <Chevron />
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-obsidian-900/90 backdrop-blur p-7 sm:p-10 min-h-[400px] flex flex-col shadow-[0_40px_100px_-30px_rgba(37,99,235,0.6)]">
          <div className="flex gap-1.5 mb-8">
            {[0, 1, 2].map((s) => (
              <span key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step > s ? 'bg-cobalt-400' : step === s ? 'bg-white/40' : 'bg-white/10'}`} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: EASE }} className="flex-1">
              {screens[step]}
            </motion.div>
          </AnimatePresence>
          {step > 0 && step < 3 && (
            <button onClick={() => setStep((s) => s - 1)} className="mt-6 self-start font-grotesk text-xs text-slate-500 hover:text-white">
              &lt; Back
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
