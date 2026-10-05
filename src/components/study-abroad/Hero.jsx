import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Words, fadeUp, useScrollOut } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const trust = [
  { value: '$43M+', label: 'Scholarships secured' },
  { value: '10,000+', label: 'Students placed' },
  { value: '100%', label: 'Visa support' },
]

// The three documents the hero walks through, from profile to offer letter. The badge floats
// beside the stack and names what Invicta adds at that stage.
const stages = [
  { id: 'profile', label: 'Your profile', badge: '1:1 counsellor assigned' },
  { id: 'apply', label: 'Applications', badge: 'SOPs reviewed by experts' },
  { id: 'offer', label: 'Offer letter', badge: 'Visa support included' },
]

const CYCLE_SECONDS = 4.5

// Hero for the Study Abroad page. The headline promises "profile to offer letter" and the stack of
// documents on the right acts it out: it tilts toward the cursor, cycles through the three stages on
// its own, and the stage buttons below it switch stages directly.
export default function Hero() {
  const [ref, contentStyle] = useScrollOut()
  const reduce = useReducedMotion()
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)

  // Cursor spotlight across the hero background.
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(37, 99, 235, 0.10), transparent 70%)`

  // Tilt of the document stack, from the cursor position over it (-0.5 to 0.5 on each axis).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 })

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-14 pb-24 lg:pt-20 lg:pb-28 px-5 sm:px-6 lg:px-12 border-b border-slate-200/80"
    >
      <div aria-hidden="true" className="absolute inset-0 site-grid-dots opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      <motion.div aria-hidden="true" style={{ backgroundImage: spotlight }} className="absolute inset-0 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[700px] h-[500px] bg-gradient-to-bl from-champagne-400/15 via-cobalt-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">
        <motion.div
          style={contentStyle}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl text-obsidian-950 tracking-tight leading-[1.08] mb-7 text-balance">
            <Words text="From your profile to your" />{' '}
            <span className="relative inline-block">
              <Words text="offer letter." className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700" />
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-2 w-full h-3 text-champagne-500"
              >
                <motion.path
                  d="M3 11 C 80 3, 200 3, 297 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                />
              </motion.svg>
            </span>{' '}
            <Words text="We guide every step." />
          </h1>

          <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            University application support for students aiming at the Ivy League, Oxbridge and other top universities,
            with a clear plan for scholarships and a smooth visa process.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <a href="#evaluation-form" className={`${btn.gold} ${size.lg}`}>
              Book a Free Profile Evaluation
              <Arrow />
            </a>
            <a href="#mentor-consult" className={`${btn.dark} ${size.lg}`}>
              Talk to a Mentor
            </a>
          </motion.div>

          <motion.dl variants={fadeUp} className="grid grid-cols-3 gap-6 w-full max-w-lg pt-8 border-t border-slate-200">
            {trust.map((t) => (
              <div key={t.label}>
                <dt className="sr-only">{t.label}</dt>
                <dd className="font-outfit font-extrabold text-2xl sm:text-3xl text-obsidian-950 tracking-tight">{t.value}</dd>
                <dd className="font-grotesk text-[11px] uppercase tracking-wider text-slate-500 mt-1">{t.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false)
            px.set(0)
            py.set(0)
          }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            px.set((e.clientX - r.left) / r.width - 0.5)
            py.set((e.clientY - r.top) / r.height - 0.5)
          }}
          className="lg:col-span-6 relative flex flex-col items-center [perspective:1400px]"
        >
          <motion.div
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-[440px] h-[440px] sm:h-[460px]"
          >
            {/* Two sheets behind the front document give the stack its depth. */}
            <div className="absolute inset-0 translate-x-6 translate-y-6 rotate-[4deg] rounded-3xl bg-white/60 border border-slate-200 shadow-card-tech" />
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-3xl bg-white/80 border border-slate-200 shadow-card-tech" />

            <div className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <span className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Step 0{stage + 1} / 03
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="p-6 sm:p-7"
                >
                  {stage === 0 && <ProfileDoc />}
                  {stage === 1 && <ApplicationsDoc />}
                  {stage === 2 && <OfferDoc />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating badge, lifted toward the viewer in 3D. */}
            <div className="absolute -left-4 sm:-left-10 bottom-10" style={{ transform: 'translateZ(60px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
                  className="flex items-center gap-3 bg-obsidian-950 text-white rounded-2xl pl-3 pr-5 py-3 shadow-2xl"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-champagne-500 text-obsidian-950">
                    <Tick />
                  </span>
                  <span className="font-outfit font-semibold text-sm whitespace-nowrap">{stages[stage].badge}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stage switcher; the bar under the current stage counts down to the next one. */}
          <div role="tablist" aria-label="Application stages" className="mt-12 w-full max-w-[440px] grid grid-cols-3 gap-2">
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={stage === i}
                onClick={() => setStage(i)}
                className="group text-left"
              >
                <span className="block h-1 rounded-full bg-slate-200 overflow-hidden mb-2.5">
                  {stage === i && (
                    <motion.span
                      key={`${stage}-${paused}`}
                      initial={{ scaleX: paused || reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : CYCLE_SECONDS, ease: 'linear' }}
                      onAnimationComplete={() => {
                        if (!paused && !reduce) setStage((stage + 1) % stages.length)
                      }}
                      className="block h-full origin-left bg-gradient-to-r from-cobalt-600 to-champagne-500"
                    />
                  )}
                  {stage > i && <span className="block h-full bg-cobalt-600/40" />}
                </span>
                <span className={`font-grotesk text-[10px] font-bold mr-1.5 ${stage === i ? 'text-cobalt-600' : 'text-slate-400'}`}>0{i + 1}</span>
                <span
                  className={`font-outfit text-sm font-semibold transition-colors ${
                    stage === i ? 'text-obsidian-950' : 'text-slate-500 group-hover:text-obsidian-950'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Tick({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

const rise = (i) => ({
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay: 0.2 + i * 0.12, ease: EASE },
})

function ProfileDoc() {
  const items = ['Academics & grades', 'Test scores', 'Extracurriculars', 'Your personal story']
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-cobalt-50 text-cobalt-600 font-outfit font-bold">You</span>
        <div>
          <p className="font-outfit font-bold text-lg text-obsidian-950">Student profile</p>
          <p className="text-xs text-slate-500">Built with your counsellor</p>
        </div>
      </div>
      <ul className="space-y-2.5 mb-6">
        {items.map((it, i) => (
          <motion.li key={it} {...rise(i)} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-2.5">
            <span className="grid place-items-center w-5 h-5 rounded-full bg-cobalt-600 text-white">
              <Tick className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-slate-700">{it}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <span className="text-slate-500">Profile strength</span>
        <span className="text-cobalt-600">Standing out</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.9 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="h-full origin-left rounded-full bg-gradient-to-r from-cobalt-600 to-cobalt-400"
        />
      </div>
    </div>
  )
}

function ApplicationsDoc() {
  const apps = [
    { name: 'Ivy League', status: 'Submitted' },
    { name: 'Oxbridge', status: 'Interview' },
    { name: 'Top 50 QS, Canada', status: 'Submitted' },
    { name: 'Top 50 QS, Australia', status: 'Submitted' },
  ]
  return (
    <div>
      <p className="font-outfit font-bold text-lg text-obsidian-950 mb-1">Applications</p>
      <p className="text-xs text-slate-500 mb-5">Essays, SOPs and LORs ready for each one</p>
      <ul className="space-y-2.5">
        {apps.map((a, i) => (
          <motion.li key={a.name} {...rise(i)} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3">
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cobalt-500" />
              <span className="text-sm font-semibold text-slate-700">{a.name}</span>
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.15, ease: EASE }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                a.status === 'Interview' ? 'bg-amber-50 text-amber-700' : 'bg-cobalt-50 text-cobalt-700'
              }`}
            >
              {a.status}
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function OfferDoc() {
  return (
    <div className="relative">
      <p className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-2">Offer of admission</p>
      <p className="font-outfit font-bold text-2xl text-obsidian-950 mb-5">Congratulations!</p>
      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        We are delighted to offer you a place in our incoming class, with a merit scholarship towards your tuition.
      </p>
      <div className="space-y-2 mb-6" aria-hidden="true">
        {['w-full', 'w-11/12', 'w-4/5', 'w-2/3'].map((w, i) => (
          <motion.div key={w} {...rise(i)} className={`h-2 rounded-full bg-slate-100 ${w}`} />
        ))}
      </div>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
        className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-700"
      >
        <Tick className="w-3.5 h-3.5" />
        Scholarship awarded
      </motion.span>

      {/* Gold seal stamps onto the letter. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 2.2, rotate: -40 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.9 }}
        className="absolute -bottom-2 right-0 grid place-items-center w-24 h-24 rounded-full bg-gradient-to-br from-champagne-400 to-amber-600 shadow-xl ring-4 ring-amber-100"
      >
        <div className="grid place-items-center w-[76px] h-[76px] rounded-full border-2 border-dashed border-white/70 text-white text-center">
          <span className="font-outfit font-extrabold text-[11px] leading-tight uppercase tracking-wider">
            Offer
            <br />
            accepted
          </span>
        </div>
      </motion.div>
    </div>
  )
}
