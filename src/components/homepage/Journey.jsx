import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise, useDrawProgress } from '../site/motion.jsx'
import { btn } from '../site/ui.js'
import { CALENDLY_URL, ROUTES } from '../site/links.js'

const steps = [
  {
    title: '1:1 Profile Evaluation',
    short: 'Profile Evaluation',
    body: 'A detailed assessment of your academics, goals, test scores and preferred destinations with an expert counsellor.',
  },
  {
    title: 'University & Program Selection',
    short: 'University Selection',
    body: 'A shortlist of programs that fit your profile, career goals and budget, so every choice is a real option.',
  },
  {
    title: 'Application Preparation',
    short: 'Applications',
    body: 'SOPs, essays, LORs and résumé support to build an application that shows your strengths and your story.',
  },
  {
    title: 'Interview & Visa Guidance',
    short: 'Interview & Visa',
    body: 'Mock interviews and step-by-step visa support. Our students see exceptionally high visa approval rates.',
  },
  {
    title: 'Pre-Departure Support',
    short: 'Pre-Departure',
    body: 'Housing, insurance, culture and the essentials, so you arrive ready and confident.',
  },
]

const HEADING = {
  title: 'Your journey to success.',
  body: 'Complete support through every stage of studying abroad, from your first consultation to your first day on campus.',
}

// Flight path stations in a 700 × 440 viewBox, with where each label sits relative to its station.
const VIEW = { w: 700, h: 440 }
const stations = [
  { x: 50, y: 360, label: 'below' },
  { x: 200, y: 215, label: 'above' },
  { x: 350, y: 300, label: 'below' },
  { x: 500, y: 150, label: 'above' },
  { x: 650, y: 70, label: 'below' },
]

// Smooth curve through the stations (Catmull-Rom converted to cubic Béziers), one segment per leg
// so each station's distance along the path can be measured.
const segments = stations.slice(0, -1).map((p1, i) => {
  const p0 = stations[i - 1] ?? p1
  const p2 = stations[i + 1]
  const p3 = stations[i + 2] ?? p2
  const c1 = [p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6]
  const c2 = [p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6]
  return `M${p1.x},${p1.y} C${c1} ${c2} ${p2.x},${p2.y}`
})
const fullPath = segments.map((s, i) => (i === 0 ? s : s.replace(/^M[^C]+/, ''))).join(' ')

// Scroll progress (0–1) → position along the stops (0 to steps − 1), with a short dwell at each end.
const toStop = (p) => Math.min(Math.max(p * 1.1 - 0.05, 0), 1) * (steps.length - 1)
const fromStop = (s) => (s / (steps.length - 1) + 0.05) / 1.1

function useIsDesktop() {
  const query = '(min-width: 1024px)'
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setDesktop(m.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return desktop
}

// Desktop: the section pins while a paper plane flies the route. Scrolling moves it from station
// to station, the detail card follows the current stage, and labels or the arrows jump to a stage.
function FlightJourney() {
  const trackRef = useRef(null)
  const routeRef = useRef(null)
  const trailRef = useRef(null)
  const planeRef = useRef(null)
  const segmentRefs = useRef([])
  const stopLengths = useRef([0])
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.0005 })

  const draw = (p) => {
    const route = routeRef.current
    const lens = stopLengths.current
    if (!route || lens.length < steps.length) return
    const total = route.getTotalLength()
    const s = toStop(p)
    const i = Math.min(Math.floor(s), steps.length - 2)
    const len = lens[i] + (s - i) * (lens[i + 1] - lens[i])
    const at = route.getPointAtLength(len)
    const ahead = route.getPointAtLength(Math.min(len + 1, total))
    const behind = route.getPointAtLength(Math.max(len - 1, 0))
    const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI
    planeRef.current?.setAttribute('transform', `translate(${at.x} ${at.y}) rotate(${angle})`)
    if (trailRef.current) {
      trailRef.current.style.strokeDasharray = `${total}`
      trailRef.current.style.strokeDashoffset = `${total - len}`
    }
    setActive(Math.round(s))
  }

  useLayoutEffect(() => {
    let sum = 0
    stopLengths.current = [0, ...segmentRefs.current.map((el) => (sum += el.getTotalLength()))]
    draw(progress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMotionValueEvent(progress, 'change', draw)

  const goTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const range = track.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + fromStop(i) * range, behavior: 'smooth' })
  }

  const step = steps[active]

  return (
    <div ref={trackRef} className="relative h-[360vh]">
      <div className="sticky top-20 h-[calc(100svh-5rem)] flex flex-col justify-center py-8">
        <Heading align="left" title={HEADING.title} body={HEADING.body} className="mb-8 xl:mb-10" />

        <div className="grid grid-cols-12 gap-10 items-center">
          {/* Detail card for the current stage. */}
          <div className="col-span-5 relative overflow-hidden rounded-3xl bg-obsidian-950 text-white p-8 xl:p-10 shadow-2xl min-h-[320px] flex flex-col">
            <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
            <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-cobalt-600/35 blur-[90px] pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.span
                key={`n${active}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-hidden="true"
                className="absolute -top-4 right-6 font-outfit font-extrabold text-[9rem] leading-none text-white/[0.06] select-none"
              >
                0{active + 1}
              </motion.span>
            </AnimatePresence>

            <p className="relative font-grotesk text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-6">
              Stage 0{active + 1} / 0{steps.length}
            </p>
            <div className="relative flex-1" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="font-outfit font-bold text-3xl xl:text-4xl tracking-tight mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-8 flex items-center gap-4">
              <div className="flex-1 flex gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-champagne-500' : 'bg-obsidian-700'}`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Previous stage"
                disabled={active === 0}
                onClick={() => goTo(active - 1)}
                className="grid place-items-center w-10 h-10 rounded-full border border-obsidian-700 text-white hover:border-champagne-500 hover:text-champagne-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next stage"
                disabled={active === steps.length - 1}
                onClick={() => goTo(active + 1)}
                className="grid place-items-center w-10 h-10 rounded-full border border-obsidian-700 text-white hover:border-champagne-500 hover:text-champagne-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <Arrow />
              </button>
            </div>
          </div>

          {/* Flight path. */}
          {/* Width is capped (rather than height) so the box keeps the viewBox ratio and the HTML
              labels stay aligned with their stations on short screens. */}
          <div className="col-span-7 relative w-full aspect-[700/440] mx-auto" style={{ maxWidth: 'calc(56svh * 700 / 440)' }}>
            <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="journey-trail" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              {segments.map((d, i) => (
                <path key={d} ref={(el) => (segmentRefs.current[i] = el)} d={d} fill="none" stroke="none" />
              ))}
              <path ref={routeRef} d={fullPath} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
              <path ref={trailRef} d={fullPath} fill="none" stroke="url(#journey-trail)" strokeWidth="3.5" strokeLinecap="round" />

              {stations.map((st, i) => (
                <g key={i}>
                  {i === active && (
                    <motion.circle
                      cx={st.x}
                      cy={st.y}
                      r="12"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      style={{ transformOrigin: `${st.x}px ${st.y}px` }}
                    />
                  )}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={i === active ? 11 : 8}
                    fill={i <= active ? (i === active ? '#f59e0b' : '#2563eb') : '#ffffff'}
                    stroke={i <= active ? 'transparent' : '#cbd5e1'}
                    strokeWidth="2"
                    style={{ transition: 'r 0.3s, fill 0.3s' }}
                  />
                </g>
              ))}

              <g ref={planeRef}>
                <g className="drop-shadow-md">
                  <path d="M-14,-11 L16,0 L-14,11 L-7,0 Z" fill="#0b1120" />
                  <path d="M-7,0 L16,0 L-14,11 Z" fill="#334155" />
                </g>
              </g>
            </svg>

            {stations.map((st, i) => {
              const align = i === 0 ? '0%' : i === stations.length - 1 ? '-100%' : '-50%'
              const shift = st.label === 'above' ? 'calc(-100% - 22px)' : '22px'
              return (
                <button
                  key={steps[i].title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? 'step' : undefined}
                  style={{ left: `${(st.x / VIEW.w) * 100}%`, top: `${(st.y / VIEW.h) * 100}%`, transform: `translate(${align}, ${shift})` }}
                  className={`absolute whitespace-nowrap rounded-full px-3.5 py-1.5 font-outfit text-sm font-semibold border transition-all duration-300 ${
                    i === active
                      ? 'bg-obsidian-950 border-obsidian-950 text-white shadow-lg'
                      : i < active
                        ? 'bg-white border-cobalt-200 text-cobalt-700 hover:border-cobalt-500'
                        : 'bg-white/80 border-slate-200 text-slate-500 hover:text-obsidian-950 hover:border-slate-300'
                  }`}
                >
                  <span className="font-grotesk text-[10px] mr-1.5 opacity-60">0{i + 1}</span>
                  {steps[i].short}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile, tablet and reduced motion: a vertical route that fills as you scroll, one stop per stage.
function RouteList() {
  const [lineRef, progress] = useDrawProgress(['start 0.8', 'end 0.6'])

  return (
    <>
      <Heading align="left" title={HEADING.title} body={HEADING.body} className="mb-12" />
      <div ref={lineRef} className="relative">
        <div className="absolute left-[19px] top-3 bottom-3 border-l-2 border-dashed border-slate-300" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-[18px] top-3 bottom-3 w-1 rounded-full origin-top bg-gradient-to-b from-cobalt-600 to-champagne-500"
        />
        <ol className="flex flex-col gap-5">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative flex gap-5"
            >
              <span className="relative z-10 grid place-items-center w-10 h-10 rounded-full bg-obsidian-950 text-white font-grotesk text-xs font-bold shrink-0 ring-4 ring-slate-100">
                0{i + 1}
              </span>
              <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-card-tech">
                <h3 className="font-outfit font-bold text-lg text-obsidian-950 mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default function Journey() {
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()

  return (
    <section id="journey" className="pt-24 lg:pt-8 pb-24 lg:pb-32 px-5 sm:px-6 lg:px-12 bg-slate-100/70 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {desktop && !reduce ? <FlightJourney /> : <RouteList />}

        <Rise className="mt-16 lg:mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border border-obsidian-800 rounded-3xl p-8 sm:p-10 lg:p-14 text-center text-white relative overflow-hidden shadow-2xl"
          >
            <motion.div
              aria-hidden="true"
              animate={{ x: ['-20%', '20%', '-20%'] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 left-1/4 w-[600px] h-[250px] bg-cobalt-600/25 rounded-full blur-[90px] pointer-events-none"
            />
            <div className="max-w-2xl mx-auto relative z-10">
              <h3 className="font-outfit font-bold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
                Ready to study at your dream university?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-8">A free 30-minute consultation with a senior admissions advisor.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={ROUTES.counselling} className={`${btn.gold} font-outfit text-base sm:text-lg px-7 sm:px-9 py-4 w-full sm:w-auto`}>
                  Start your Study Abroad Journey
                  <Arrow />
                </Link>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn.light} font-outfit text-base sm:text-lg px-7 sm:px-9 py-4 w-full sm:w-auto`}
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </motion.div>
        </Rise>
      </div>
    </section>
  )
}
