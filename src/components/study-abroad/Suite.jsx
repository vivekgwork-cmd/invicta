import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const features = [
  {
    short: 'Strategy',
    icon: 'target',
    title: 'Ivy League & Oxbridge admissions strategy',
    body: 'We match you with the right universities and shape your story, essays and application so admissions officers remember you.',
  },
  {
    short: 'Portfolio',
    icon: 'layers',
    title: 'Portfolio & extracurricular focus',
    body: 'We help you build real depth in one area instead of a long list of generic activities, so your application carries weight.',
  },
  {
    short: 'Scholarships',
    icon: 'award',
    title: 'Scholarship applications',
    body: 'A plan built around merit grants and full funding: university awards, national foundations and scholarship essays that win.',
  },
  {
    short: 'Applications',
    icon: 'file',
    title: 'Profile building to final application',
    body: 'From your starting point to submitting on Common App, UCAS and direct portals, a dedicated mentor works with you on every deadline.',
  },
  {
    short: 'Visa',
    icon: 'plane',
    title: 'Visa guidance & consulate interviews',
    body: 'We handle the immigration documents, I-20 and CAS checks, and run mock consulate interviews, so nothing slows you down once your offer arrives.',
  },
]

const ICONS = {
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />,
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" />
    </>
  ),
  file: <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4" />,
  plane: <path d="M21 15.5l-8-5V5a1.5 1.5 0 00-3 0v5.5l-8 5V17l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-4.5l8 2.5z" />,
}

function Icon({ name, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

// Orbit geometry in a 400 × 400 box: the student at the centre, the five services around them.
const C = 200
const R = 150
const nodes = features.map((_, i) => {
  const a = ((i * 360) / features.length - 90) * (Math.PI / 180)
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
})

const CYCLE_MS = 4000

// "One team": the student sits at the centre of a slowly turning orbit of services. The active
// service's link lights up and sends a pulse to the centre while its details show in the panel.
// Services open on hover, focus or tap, and cycle on their own until the visitor takes over.
export default function Suite() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (touched || reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % features.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [touched, reduce])

  const pick = (i) => {
    setActive(i)
    setTouched(true)
  }

  const f = features[active]
  const spin = 'animate-[spin_90s_linear_infinite] motion-reduce:animate-none group-hover/orbit:[animation-play-state:paused]'
  const counterSpin =
    'animate-[spin_90s_linear_infinite_reverse] motion-reduce:animate-none group-hover/orbit:[animation-play-state:paused]'

  return (
    <section className="relative w-full py-16 lg:py-12 lg:min-h-[calc(100svh-5rem)] lg:flex lg:items-center px-5 sm:px-6 lg:px-12 overflow-hidden">
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-cobalt-500/10 via-champagne-400/10 to-transparent blur-[100px] pointer-events-none" />

      <Rise className="max-w-7xl w-full mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <Heading
              align="left"
              title="One team. Every step of your admissions journey."
              body="We take the guesswork out of global admissions with personal mentorship, a clear application story and steady follow-through."
              className="mb-8"
            />

            {/* Details of the active service. */}
            <div className="relative rounded-3xl bg-white border border-slate-200 shadow-card-tech p-6 sm:p-8 overflow-hidden min-h-[250px] flex flex-col">
              <motion.span
                key={`bar-${active}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: touched || reduce ? 0.5 : CYCLE_MS / 1000, ease: touched || reduce ? EASE : 'linear' }}
                className="absolute top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-cobalt-600 to-champagne-500"
              />
              <div className="flex-1" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex gap-5"
                  >
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-obsidian-950 text-champagne-400 shrink-0">
                      <Icon name={f.icon} className="w-6 h-6" />
                    </span>
                    <div>
                      <p className="font-grotesk text-xs font-semibold uppercase tracking-wider text-cobalt-600 mb-1.5">
                        0{active + 1} / 0{features.length}
                      </p>
                      <h3 className="font-outfit text-xl sm:text-2xl font-bold text-obsidian-950 mb-2 leading-snug">{f.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-slate-500">One dedicated mentor coordinates all five.</p>
                <a href="#evaluation-form" className={`${btn.gold} ${size.sm} shrink-0`}>
                  Check Eligibility
                  <Arrow />
                </a>
              </div>
            </div>
          </div>

          {/* The orbit. */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="group/orbit relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[min(480px,calc(100svh-12rem))] aspect-square">
              <div className={`absolute inset-0 ${spin}`}>
                <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
                  <circle cx={C} cy={C} r={R} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 8" />
                  <circle cx={C} cy={C} r={R + 34} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx={C} cy={C} r={78} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  {nodes.map((n, i) => (
                    <line
                      key={i}
                      x1={C}
                      y1={C}
                      x2={n.x}
                      y2={n.y}
                      stroke={i === active ? '#f59e0b' : '#e2e8f0'}
                      strokeWidth={i === active ? 2.5 : 1.5}
                      style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                    />
                  ))}
                  {!reduce && (
                    <motion.circle
                      key={active}
                      r="4.5"
                      fill="#f59e0b"
                      initial={{ cx: nodes[active].x, cy: nodes[active].y, opacity: 0 }}
                      animate={{ cx: C, cy: C, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </svg>

                {nodes.map((n, i) => {
                  const isActive = i === active
                  return (
                    <div
                      key={features[i].short}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 400) * 100}%` }}
                    >
                      <div className={counterSpin}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          aria-label={features[i].title}
                          onClick={() => pick(i)}
                          onMouseEnter={() => pick(i)}
                          onFocus={() => pick(i)}
                          className="relative flex flex-col items-center focus-visible:outline-none group/node"
                        >
                          <span
                            className={`grid place-items-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border transition-all duration-300 group-focus-visible/node:ring-2 group-focus-visible/node:ring-cobalt-500 ${
                              isActive
                                ? 'bg-obsidian-950 border-obsidian-950 text-champagne-400 shadow-xl scale-110'
                                : 'bg-white border-slate-200 text-slate-500 shadow-card-tech hover:text-obsidian-950 hover:border-slate-300'
                            }`}
                          >
                            <Icon name={features[i].icon} className="w-5 h-5 sm:w-7 sm:h-7" />
                          </span>
                          <span
                            className={`absolute top-full mt-2 whitespace-nowrap font-outfit text-xs sm:text-sm font-semibold transition-colors ${
                              isActive ? 'text-obsidian-950' : 'text-slate-500'
                            }`}
                          >
                            {features[i].short}
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* The student, fixed at the centre. */}
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="relative grid place-items-center">
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-champagne-400/40"
                    />
                  )}
                  <div className="relative grid place-items-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-champagne-400 to-amber-600 shadow-[0_12px_40px_-8px_rgba(245,158,11,0.6)] text-center">
                    <div>
                      <p className="font-outfit font-extrabold text-xl sm:text-2xl text-obsidian-950 leading-none">You</p>
                      <p className="font-grotesk text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-obsidian-950/70 mt-1">
                        + one team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rise>
    </section>
  )
}
