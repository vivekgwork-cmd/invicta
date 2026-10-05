import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Marquee, Words, fadeUp, useScrollOut } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

// Scorers shown in the running strip. `photo` is a placeholder until real student photos are
// added; without one the card falls back to the student's initial.
const PLACEHOLDER_PHOTO = '/images/professional-lady.jpg'

const scorers = [
  { name: 'Akarsh Chittineni', school: 'Duke University', sat: 1530, photo: PLACEHOLDER_PHOTO },
  { name: 'Aditya Miriyala', school: 'Milwaukee School of Engineering', sat: 1500, photo: PLACEHOLDER_PHOTO },
  { name: 'Yukta Tata Koganti', school: 'Drexel University', sat: 1490, photo: PLACEHOLDER_PHOTO },
]

const CARD_MIN = 140
const CARD_MAX = 220
const FOLD_GAP = 24

// Sizes the scorer cards to the space left between the strip and the bottom of the first screen, so
// the whole card is visible on load whatever the screen height. offsetTop is used rather than
// getBoundingClientRect so the hero's entrance transforms don't skew the measurement.
function useFoldHeight() {
  const ref = useRef(null)
  const [height, setHeight] = useState(CARD_MAX)

  useLayoutEffect(() => {
    const measure = () => {
      let top = 0
      for (let el = ref.current; el; el = el.offsetParent) top += el.offsetTop
      setHeight(Math.round(Math.min(CARD_MAX, Math.max(CARD_MIN, window.innerHeight - top - FOLD_GAP))))
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return [ref, height]
}

function ScorerCard({ name, school, sat, photo, height }) {
  return (
    <div
      style={{ height }}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-card-tech text-left bg-gradient-to-br from-cobalt-600 to-obsidian-950">
      {photo ? (
        <img src={photo} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-white/90 font-outfit font-bold text-5xl">{name[0]}</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-outfit font-bold text-white text-sm leading-tight">{name}</p>
        <p className="text-[11px] text-slate-300 truncate mt-0.5">{school}</p>
        <p className="font-outfit font-extrabold text-champagne-400 text-sm mt-1">SAT {sat}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const [ref, contentStyle] = useScrollOut()
  const [stripRef, cardHeight] = useFoldHeight()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-[clamp(1.5rem,5svh,3rem)] pb-[clamp(1.5rem,4svh,3rem)] px-5 sm:px-6 lg:px-12 border-b border-slate-200/80"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-cobalt-500/15 via-champagne-400/10 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-20 w-80 h-80 bg-cobalt-600/10 rounded-full blur-[90px] pointer-events-none"
      />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-champagne-500/10 rounded-full blur-[90px] pointer-events-none" />

      <motion.div
        style={contentStyle}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
        className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-[clamp(2.75rem,7svh,3.75rem)] text-obsidian-950 max-w-5xl tracking-tight leading-[1.08] mb-[clamp(0.75rem,2.5svh,1.25rem)] text-balance">
          <Words text="Study abroad, from test prep to Ivy League colleges." />
        </h1>

        <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-3xl mb-[clamp(1rem,3.5svh,2rem)] leading-relaxed">
          Expert test prep and university counselling that helps students study abroad affordably, strategically and
          successfully.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link to={ROUTES.counselling} className={`${btn.gold} ${size.lg} w-full sm:w-auto`}>
            Book Free Counselling
            <Arrow />
          </Link>
          <Link to={ROUTES.studyAbroad} className={`${btn.dark} ${size.lg} w-full sm:w-auto`}>
            Explore the Study Abroad Guide
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-[clamp(1rem,3.5svh,2rem)] w-full"
        >
          <p className="font-grotesk text-[11px] uppercase tracking-wider text-slate-500 mb-3">Recent Invicta SAT scorers</p>
          {/* Doubled so the strip stays full on wide screens while there are only a few scorers. */}
          <div ref={stripRef}>
            <Marquee
              items={[...scorers, ...scorers].map((s, i) => <ScorerCard key={i} {...s} height={cardHeight} />)}
              itemClassName="!px-2"
              duration={40}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
