import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Btn, Lead, SPRING, glass, sec } from './ui.jsx'

/* ------------------------------------------------ Band checker */

// IELTS rounds the mean of the four bands to the nearest half band; .25 rounds up to .5 and .75 up
// to the next whole band.
function overallBand(bands) {
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length
  const whole = Math.floor(avg)
  const frac = avg - whole
  if (frac < 0.25) return whole
  if (frac < 0.75) return whole + 0.5
  return whole + 1
}

const SKILLS = ['Listening', 'Reading', 'Writing', 'Speaking']
const fmt = (n) => n.toFixed(1)

function Stepper({ label, value, set }) {
  return (
    <div className={`rounded-2xl ${glass} px-4 py-3 flex items-center justify-between gap-3`}>
      <span className="text-sm font-semibold text-violet-950/80">{label}</span>
      <span className="flex items-center gap-1.5">
        <button onClick={() => set(Math.max(4, value - 0.5))} aria-label={`Lower ${label}`} className="w-8 h-8 rounded-full bg-violet-100 text-violet-800 hover:bg-violet-200">−</button>
        <motion.span key={value} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-10 text-center font-outfit font-extrabold text-lg text-violet-950 tabular-nums">
          {fmt(value)}
        </motion.span>
        <button onClick={() => set(Math.min(9, value + 0.5))} aria-label={`Raise ${label}`} className="w-8 h-8 rounded-full bg-violet-100 text-violet-800 hover:bg-violet-200">+</button>
      </span>
    </div>
  )
}

export function BandChecker() {
  const [req, setReq] = useState(6.5)
  const [min, setMin] = useState(6)
  const [bands, setBands] = useState([7, 6.5, 5.5, 7])
  const overall = overallBand(bands)
  const below = SKILLS.filter((_, i) => bands[i] < min)
  const overallOk = overall >= req
  const ok = overallOk && below.length === 0
  const C = 2 * Math.PI * 70

  return (
    <section id="target" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Lead
          center
          pill="Your target"
          title="Start with the band *your university needs.*"
          body="There is no single IELTS target for every student. One programme may require a specific overall band; another may also set minimum scores for each section."
        />

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={SPRING} className={`mt-14 rounded-[36px] ${glass} p-6 sm:p-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-700">The programme asks for</p>
              <Stepper label="Overall band" value={req} set={setReq} />
              <Stepper label="Minimum per section" value={min} set={setMin} />
              <p className="pt-4 text-xs font-bold uppercase tracking-wider text-violet-700">Your current or practice bands</p>
              {SKILLS.map((s, i) => (
                <label key={s} className="block">
                  <span className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold text-violet-950/80">{s}</span>
                    <span className={`font-bold tabular-nums ${bands[i] < min ? 'text-rose-600' : 'text-violet-950'}`}>{fmt(bands[i])}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={9}
                    step={0.5}
                    value={bands[i]}
                    onChange={(e) => setBands((b) => b.map((x, j) => (j === i ? Number(e.target.value) : x)))}
                    className="exam-range w-full"
                    style={{ '--fill': bands[i] < min ? '#e11d48' : '#7c3aed', '--pct': `${(bands[i] / 9) * 100}%` }}
                  />
                </label>
              ))}
            </div>

            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#ede9fe" strokeWidth="14" />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={ok ? '#10b981' : '#7c3aed'}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    animate={{ strokeDashoffset: C - (overall / 9) * C }}
                    transition={SPRING}
                  />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#0b0f19" strokeWidth="14" strokeDasharray={`2 ${C}`} strokeDashoffset={-(req / 9) * C} />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="text-xs font-semibold text-violet-700">Overall band</p>
                    <motion.p key={overall} initial={{ scale: 0.6, filter: 'blur(6px)' }} animate={{ scale: 1, filter: 'blur(0px)' }} transition={SPRING} className="font-outfit font-black text-6xl text-violet-950 tabular-nums">
                      {fmt(overall)}
                    </motion.p>
                    <p className="text-[11px] text-violet-950/50">tick = required {fmt(req)}</p>
                  </div>
                </div>
              </div>
              <motion.p key={String(ok)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 rounded-full px-5 py-2 text-sm font-bold ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-800'}`}>
                {ok ? '✓ Meets this requirement' : 'Not there yet'}
              </motion.p>
            </div>

            <div className="lg:col-span-4 space-y-2">
              <div className={`rounded-2xl px-4 py-3 text-sm font-semibold flex items-center gap-2 ${overallOk ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {overallOk ? '✓' : '✕'} Overall {fmt(overall)} vs required {fmt(req)}
              </div>
              {SKILLS.map((s, i) => {
                const pass = bands[i] >= min
                return (
                  <motion.div layout key={s} className={`rounded-2xl px-4 py-3 text-sm flex items-center justify-between ${pass ? 'bg-white/60 text-violet-950/80' : 'bg-rose-50 text-rose-700 font-semibold'}`}>
                    <span>{s}</span>
                    <span>{pass ? '✓' : `✕ below ${fmt(min)}`}</span>
                  </motion.div>
                )
              })}
              <AnimatePresence>
                {overallOk && below.length > 0 && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-amber-800 bg-amber-50 rounded-2xl px-4 py-3 leading-relaxed">
                    A strong overall band may not meet a university’s requirement if one section is below its minimum.
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="pt-2 text-[11px] text-violet-950/50">Illustrative only. Always check your programme’s published requirements.</p>
            </div>
          </div>
        </motion.div>
        <p className="mt-8 text-center text-violet-950/65 max-w-3xl mx-auto leading-relaxed">
          Invicta helps you connect your preparation to your intended course and application timeline. Start with the requirements, understand your current level and focus
          on the skills that need attention.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Skill wheel */

const skills = [
  {
    name: 'Listening',
    color: '#7c3aed',
    time: 'Approximately 30 minutes',
    structure: 'Four parts, 40 questions',
    assesses: 'Understanding spoken information',
    headline: 'Hear the detail. Follow the meaning.',
    paras: [
      'The Listening test includes four recordings featuring conversations and monologues. You hear each recording once and answer questions as you listen.',
      'Preparation develops your ability to identify the main idea, follow specific details, recognise opinions and understand the speaker’s purpose.',
    ],
    work: ['Following a conversation when speakers correct or change information.', 'Identifying names, dates, numbers and other key details.', 'Recognising paraphrases instead of waiting for an exact word match.', 'Following answer instructions and checking spelling.'],
    focus: 'Practise listening for meaning while recording answers accurately. Review missed questions to understand whether the problem was vocabulary, attention or interpretation.',
  },
  {
    name: 'Reading',
    label: 'Academic Reading',
    color: '#d946ef',
    time: '60 minutes',
    structure: 'Three sections, 40 questions',
    assesses: 'Understanding academic texts',
    headline: 'Read with purpose. Answer with evidence.',
    paras: [
      'The Reading test uses three sections of academic texts, with 40 questions in total.',
      'You may encounter unfamiliar topics, but the answers come from the text. Preparation should help you locate information, interpret meaning and distinguish what is stated from what you assume.',
    ],
    work: ['Skimming to understand the overall argument.', 'Scanning for relevant details.', 'Identifying opinions, claims and supporting evidence.', 'Recognising how information is paraphrased.', 'Managing time across passages and question types.'],
    focus: 'Build accuracy before increasing speed. Learn why an answer is supported by the passage rather than relying on a familiar keyword.',
  },
  {
    name: 'Writing',
    label: 'Academic Writing',
    color: '#f59e0b',
    time: '60 minutes',
    structure: 'Two tasks',
    assesses: 'Describing information and developing an argument',
    headline: 'Organise your ideas. Make every sentence count.',
    paras: ['The Writing test has two tasks.'],
    tasks: [
      ['Task 1', 'Describe information presented in a graph, chart, table, diagram or similar visual.'],
      ['Task 2', 'Write an essay responding to a point of view, argument or problem.'],
    ],
    work: ['Answering the actual task.', 'Selecting and explaining important information.', 'Organising paragraphs in a logical order.', 'Developing ideas with relevant support.', 'Using vocabulary and grammar accurately.'],
    focus: 'Learn to plan before writing and review your work afterwards. A clear, relevant response is more useful than a memorised essay that does not fit the question.',
  },
  {
    name: 'Speaking',
    color: '#0ea5e9',
    time: '11–14 minutes',
    structure: 'Three-part interview',
    assesses: 'Communicating ideas clearly and naturally',
    headline: 'Express yourself clearly, even when the question surprises you.',
    paras: [
      'The Speaking test is an interview with an examiner. It begins with familiar questions, moves to an individual talk and ends with a broader discussion.',
      'The aim is to communicate your ideas fluently and coherently, using suitable language and understandable pronunciation.',
    ],
    work: ['Giving complete answers without sounding rehearsed.', 'Explaining reasons and adding examples.', 'Organising a longer response.', 'Handling unfamiliar topics.', 'Speaking at a comfortable, natural pace.'],
    focus: 'Practise speaking aloud regularly. Work on expressing your own ideas rather than memorising scripts.',
  },
]

const polar = (a, r) => [100 + r * Math.cos((a * Math.PI) / 180), 100 + r * Math.sin((a * Math.PI) / 180)]
function arc(k) {
  const a0 = k * 90 - 90 + 2
  const a1 = a0 + 86
  const [x0, y0] = polar(a0, 96)
  const [x1, y1] = polar(a1, 96)
  const [x2, y2] = polar(a1, 54)
  const [x3, y3] = polar(a0, 54)
  return `M${x0} ${y0} A96 96 0 0 1 ${x1} ${y1} L${x2} ${y2} A54 54 0 0 0 ${x3} ${y3} Z`
}

export function SkillWheel() {
  const [sel, setSel] = useState(0)
  const [done, setDone] = useState({})
  const s = skills[sel]
  const ticked = s.work.filter((w) => done[w]).length

  return (
    <section id="skills" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Lead pill="The four skills" title="Four skills. One complete *preparation plan.*" body="Turn the wheel: pick a skill to see how it’s tested and what to work on." />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <svg viewBox="0 0 200 200" className="w-full max-w-md mx-auto drop-shadow-[0_20px_40px_rgba(91,33,182,0.25)]" role="tablist" aria-label="IELTS skills">
              {skills.map((k, i) => {
                const on = sel === i
                const [lx, ly] = polar(i * 90 - 45, 75)
                return (
                  <g key={k.name} role="tab" aria-selected={on} tabIndex={0} onClick={() => setSel(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(i)} className="cursor-pointer outline-none">
                    <motion.path d={arc(i)} animate={{ fill: on ? k.color : "#ffffff", opacity: on ? 1 : 0.8 }} transition={SPRING} stroke={on ? "#ffffff" : "#ede9fe"} strokeWidth={on ? 3 : 1} />
                    <text x={lx} y={ly + 3} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Outfit, sans-serif" fill={on ? '#ffffff' : '#4c1d95'} className="pointer-events-none">
                      {k.name}
                    </text>
                  </g>
                )
              })}
              <circle cx="100" cy="100" r="48" fill="#ffffff" />
              <text x="100" y="96" textAnchor="middle" fontSize="8" fill="#7c3aed" fontWeight="700" fontFamily="Outfit, sans-serif">
                {s.time.replace('Approximately ', '≈ ')}
              </text>
              <text x="100" y="110" textAnchor="middle" fontSize="7" fill="#4c1d95" fontFamily="Plus Jakarta Sans, sans-serif">
                {s.structure}
              </text>
            </svg>
            <p className="mt-4 text-center text-sm text-violet-950/60">{s.assesses}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.45 }} className="lg:col-span-7 space-y-5">
              <div className={`rounded-[32px] ${glass} p-7 sm:p-9`}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>
                  {s.label ?? s.name}
                </p>
                <h3 className="mt-3 font-outfit font-bold text-3xl sm:text-4xl text-violet-950 tracking-tight leading-tight">{s.headline}</h3>
                <div className="mt-4 space-y-3 text-violet-950/70 leading-relaxed">
                  {s.paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.tasks && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.tasks.map(([t, b]) => (
                      <div key={t} className="rounded-2xl bg-amber-50 p-4">
                        <p className="font-outfit font-bold text-amber-700">{t}</p>
                        <p className="text-sm text-violet-950/70 mt-1">{b}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`rounded-[32px] ${glass} p-7`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-outfit font-bold text-lg text-violet-950">What to work on</h4>
                  <span className="text-xs font-semibold text-violet-700">
                    {ticked}/{s.work.length} confident
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {s.work.map((w) => {
                    const on = !!done[w]
                    return (
                      <li key={w}>
                        <button onClick={() => setDone((d) => ({ ...d, [w]: !on }))} aria-pressed={on} className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-colors ${on ? 'bg-violet-600 text-white' : 'bg-white/70 text-violet-950/80 hover:bg-white'}`}>
                          <motion.span animate={{ scale: on ? [1, 1.4, 1] : 1 }} className={`w-5 h-5 rounded-full grid place-items-center text-[10px] shrink-0 ${on ? 'bg-white text-violet-700' : 'border-2 border-violet-300'}`}>
                            {on && '✓'}
                          </motion.span>
                          {w}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="rounded-[32px] p-7 text-white" style={{ background: `linear-gradient(135deg, ${s.color}, #4c1d95)` }}>
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">Preparation focus</p>
                <p className="mt-2 leading-relaxed">{s.focus}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-10 text-center text-sm text-violet-950/55">Your Speaking appointment may be scheduled separately. Follow the arrangements confirmed by your test provider.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ IELTS with Invicta: flip cards */

const invicta = [
  { title: 'A target that fits your plans', body: 'Understand the overall and section bands required by the programmes you are considering.', icon: '🎯' },
  { title: 'Attention to your weaker skills', body: 'Identify where you need the most work, whether that is reading speed, writing structure, listening accuracy or speaking confidence.', icon: '🔍' },
  { title: 'Practice across all four sections', body: 'Keep your preparation balanced. A strong overall band may not meet a university’s requirement if one section is below its minimum.', icon: '⚖️' },
  { title: 'Clear feedback and review', body: 'Use practice results to guide what you study next. Understand the reason behind an error before repeating the same task.', icon: '📝' },
  { title: 'Preparation that fits your timeline', body: 'Plan around your academic schedule, intended intake and application deadlines.', icon: '🗓️' },
  { title: 'Support for the bigger journey', body: 'Connect IELTS preparation with course selection, university applications and your wider study abroad plan.', icon: '✈️' },
]

export function FlipCards() {
  const [flipped, setFlipped] = useState([])
  const toggle = (i, v) => setFlipped((f) => (v ?? !f.includes(i) ? [...f.filter((x) => x !== i), i] : f.filter((x) => x !== i)))

  return (
    <section id="approach" className={`${sec} bg-gradient-to-b from-violet-950 to-[#2e1065] text-white overflow-hidden`}>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-4 py-2 text-xs font-semibold text-violet-200">The Invicta way</span>
            <h2 className="mt-5 font-outfit font-bold text-3xl sm:text-5xl tracking-tight">IELTS preparation with Invicta</h2>
            <p className="mt-3 text-violet-200/70">Hover or tap a card to turn it over.</p>
          </div>
          <Btn href="#talk-to-expert" className="shrink-0 bg-white! text-violet-900!">
            Discuss My Target Band
          </Btn>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {invicta.map((c, i) => {
            const on = flipped.includes(i)
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: (i % 3) * 0.08 }}
                className="h-60 [perspective:1200px]"
                onMouseEnter={() => toggle(i, true)}
                onMouseLeave={() => toggle(i, false)}
              >
                <motion.button
                  onClick={() => toggle(i)}
                  aria-pressed={on}
                  aria-label={`${c.title}. ${c.body}`}
                  animate={{ rotateY: on ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full text-left"
                >
                  <span className="absolute inset-0 rounded-[28px] bg-white/10 border border-white/15 backdrop-blur p-7 flex flex-col [backface-visibility:hidden]">
                    <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                    <span className="mt-auto font-outfit font-bold text-xl">{c.title}</span>
                    <span className="mt-2 text-xs text-violet-200/60">0{i + 1} · turn over ↻</span>
                  </span>
                  <span className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-violet-500 to-fuchsia-500 p-7 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="font-outfit font-bold text-lg">{c.title}</span>
                    <span className="mt-3 text-sm text-white/90 leading-relaxed">{c.body}</span>
                  </span>
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Scores: equalizer bands */

const bandScale = [
  [9, 'Expert user'],
  [8, 'Very good user'],
  [7, 'Good user'],
  [6, 'Competent user'],
  [5, 'Modest user'],
]
const checks = ['The required overall band.', 'Any minimum for individual sections.', 'The accepted IELTS test type and format.', 'The deadline by which your institution needs the result.']

export function Scores() {
  const [sel, setSel] = useState(7)
  const [on, setOn] = useState([])
  const label = bandScale.find(([b]) => b === sel)[1]

  return (
    <section id="scores" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Lead
          pill="Scoring"
          title="Understand your *IELTS score*"
          body="Each skill receives a band from 0 to 9. Your overall band is the average of the four section scores, rounded according to IELTS scoring rules."
        />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-7 rounded-[32px] ${glass} p-6 sm:p-9`}>
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-64">
              {[...bandScale].reverse().map(([b], i) => {
                const active = sel === b
                return (
                  <button key={b} onMouseEnter={() => setSel(b)} onClick={() => setSel(b)} aria-pressed={active} aria-label={`Band ${b}`} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                    <motion.span
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(b / 9) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ ...SPRING, delay: i * 0.08 }}
                      className="w-full rounded-2xl relative overflow-hidden"
                    >
                      <motion.span
                        animate={{ opacity: active ? 1 : 0.35 }}
                        className="absolute inset-0 bg-gradient-to-t from-violet-600 via-fuchsia-500 to-amber-400"
                      />
                      {active && <motion.span animate={{ y: ['0%', '-8%', '0%'] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-x-0 top-2 text-center text-white text-xs font-bold">●</motion.span>}
                    </motion.span>
                    <span className={`font-outfit font-black text-2xl ${active ? 'text-violet-700' : 'text-violet-950/40'}`}>{b}</span>
                  </button>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={sel} initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} className="mt-6 text-center font-outfit text-2xl font-bold text-violet-950">
                Band {sel} · <span className="text-violet-600">{label}</span>
              </motion.p>
            </AnimatePresence>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
              <span className="rounded-full bg-violet-100 px-3 py-1.5 text-violet-800">Scores may also be reported in half bands.</span>
              <span className="rounded-full bg-white/70 px-3 py-1.5 text-violet-950/70">No universal pass or fail. Your receiving institution determines the score you need.</span>
            </div>
          </div>

          <div className={`lg:col-span-5 rounded-[32px] ${glass} p-7 flex flex-col`}>
            <h3 className="font-outfit font-bold text-xl text-violet-950">Check more than the overall score</h3>
            <p className="text-sm text-violet-950/60 mt-1">Before choosing a test date, record:</p>
            <ul className="mt-5 space-y-3">
              {checks.map((c) => {
                const v = on.includes(c)
                return (
                  <li key={c} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-violet-950/80">{c}</span>
                    <button
                      role="switch"
                      aria-checked={v}
                      aria-label={c}
                      onClick={() => setOn((o) => (v ? o.filter((x) => x !== c) : [...o, c]))}
                      className={`relative w-12 h-7 rounded-full shrink-0 transition-colors ${v ? 'bg-violet-600' : 'bg-violet-200'}`}
                    >
                      <motion.span layout transition={SPRING} className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow ${v ? 'right-1' : 'left-1'}`} />
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 h-2 rounded-full bg-violet-100 overflow-hidden">
              <motion.div animate={{ width: `${(on.length / checks.length) * 100}%` }} transition={SPRING} className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            </div>
            <p className="mt-2 text-xs text-violet-950/50">{on.length === checks.length ? 'All recorded. You’re ready to pick a date.' : `${on.length} of ${checks.length} recorded`}</p>
            <div className="mt-auto pt-8">
              <Btn href="https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail" target="_blank" rel="noopener noreferrer" variant="glass">
                Explore Official IELTS Scoring ↗
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
