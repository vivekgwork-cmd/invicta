import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const reasons = [
  {
    stat: '30+',
    title: 'Years of expertise',
    body: 'Decades of guiding students to top universities. Our counsellors know how to make an application stand out.',
    tone: 'cobalt',
  },
  {
    stat: '100%',
    title: 'Transparency',
    body: 'No hidden fees and no surprises. A clear, structured process that keeps you informed at every stage.',
    tone: 'gold',
  },
  {
    stat: 'A to Z',
    title: 'End-to-end support',
    body: 'From shortlisting universities to writing your SOP and securing your visa, one team supports you throughout.',
    tone: 'cobalt',
  },
  {
    stat: 'Day 1',
    title: 'Post-arrival help',
    body: 'Our support doesn’t end with your visa. We help you settle in and find your way around your new country.',
    tone: 'gold',
  },
]

// How long each panel stays open while the showcase cycles on its own.
const CYCLE_SECONDS = 5

// Expanding panels: the open panel shows its stat large with the full description, the rest fold
// into slim columns with vertical titles. Panels open on hover, focus or tap, and cycle on their own
// while the section is on screen until the visitor takes over.
export default function WhyInvicta() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [touched, setTouched] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const cycling = inView && !hovering && !touched && !reduce

  const open = (i) => {
    setActive(i)
    setTouched(true)
  }

  return (
    <section id="why-invicta" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 w-full scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Stand out from the crowd with Invicta."
          action={
            <Link to={ROUTES.counselling} className={`${btn.dark} ${size.sm}`}>
              Enquire Now
              <Arrow />
            </Link>
          }
          className="mb-12"
        />

        <div
          ref={ref}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="flex flex-col lg:flex-row gap-3 lg:h-[440px]"
        >
          {reasons.map((r, i) => (
            <Panel
              key={r.title}
              reason={r}
              index={i}
              isOpen={active === i}
              cycling={cycling && active === i}
              onOpen={() => open(i)}
              onHover={() => setActive(i)}
              onCycleEnd={() => setActive((i + 1) % reasons.length)}
            />
          ))}
        </div>
      </Rise>
    </section>
  )
}

function Panel({ reason: r, index, isOpen, cycling, onOpen, onHover, onCycleEnd }) {
  const gold = r.tone === 'gold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      onMouseEnter={onHover}
      style={{ flexGrow: isOpen ? 4 : 1 }}
      className={`relative overflow-hidden rounded-3xl border basis-auto lg:basis-0 lg:min-w-0 transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? 'bg-obsidian-950 border-obsidian-950' : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Glow and dot grid fade in behind the open panel. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 site-grid-dots opacity-20" />
        <div
          className={`absolute -bottom-24 -right-16 w-80 h-80 rounded-full blur-[90px] ${
            gold ? 'bg-champagne-500/35' : 'bg-cobalt-600/40'
          }`}
        />
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onOpen}
        onFocus={onOpen}
        className="relative z-10 w-full h-full text-left p-6 lg:p-8 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-inset rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`font-grotesk text-xs font-bold tracking-wider ${isOpen ? 'text-slate-500' : 'text-slate-400'}`}>
            0{index + 1}
          </span>
          <span
            aria-hidden="true"
            className={`grid place-items-center w-8 h-8 rounded-full border text-lg leading-none transition-all duration-500 ${
              isOpen ? 'rotate-45 border-obsidian-700 text-white' : 'border-slate-200 text-slate-400'
            }`}
          >
            +
          </span>
        </div>

        {/* Folded state: a stat and title row on mobile, a vertical title on desktop. */}
        {!isOpen && (
          <div className="mt-4 lg:mt-auto flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-6 min-h-0">
            <span className={`font-outfit font-extrabold text-2xl tracking-tight ${gold ? 'text-amber-500' : 'text-cobalt-600'}`}>
              {r.stat}
            </span>
            <span className="font-outfit font-bold text-lg text-obsidian-950 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap">
              {r.title}
            </span>
          </div>
        )}

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="mt-6 lg:mt-auto"
            >
              <p
                className={`font-outfit font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-6 ${
                  gold ? 'text-champagne-400' : 'text-cobalt-400'
                }`}
              >
                {r.stat}
              </p>
              <p className="font-outfit font-bold text-2xl lg:text-3xl text-white mb-3">{r.title}</p>
              <p className="text-slate-400 leading-relaxed max-w-md">{r.body}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Progress bar for the automatic cycle; finishing it opens the next panel. */}
      {isOpen && (
        <div className="absolute left-6 right-6 lg:left-8 lg:right-8 bottom-4 h-[2px] rounded-full bg-obsidian-800 overflow-hidden">
          {cycling && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CYCLE_SECONDS, ease: 'linear' }}
              onAnimationComplete={onCycleEnd}
              className={`block h-full origin-left ${gold ? 'bg-champagne-500' : 'bg-cobalt-500'}`}
            />
          )}
        </div>
      )}
    </motion.div>
  )
}
