import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { PlusMinus } from '../shared/Glyphs.jsx'

// Motion kit shared by the Homepage, Study Abroad and Test Prep pages.
export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Thin reading-progress bar across the top of the viewport.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-cobalt-600 via-cobalt-500 to-champagne-500"
    />
  )
}

// Scroll-linked entrance: content rises and settles while the section scrolls in, so one section
// hands over to the next instead of popping in.
export function Rise({ children, className = '', distance = 80 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.45'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y, scale }} className={className}>
      {children}
    </motion.div>
  )
}

// Dark band that opens from an inset rounded card to full bleed as it scrolls into view.
export function Panel({ children, className = '', id }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0])
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px)`
  return (
    <motion.section ref={ref} id={id} style={reduce ? undefined : { clipPath }} className={className}>
      {children}
    </motion.section>
  )
}

export function Parallax({ children, className = '', offset = 50 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  )
}

// Hero content drifts down and fades as the hero scrolls away. Returns [sectionRef, contentStyle].
export function useScrollOut() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  return [ref, reduce ? undefined : { y, opacity }]
}

// 0 → 1 progress of an element through the viewport, for lines that draw as you scroll.
export function useDrawProgress(offset = ['start 0.75', 'end 0.55']) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const full = useMotionValue(1)
  return [ref, reduce ? full : smooth]
}

// Masked word-by-word reveal. Words take their timing from the nearest variant parent.
export function Words({ text, className = '' }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className={`inline-block ${className}`}
        variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.75, ease: EASE } } }}
      >
        {w}
      </motion.span>
      {i < words.length - 1 && ' '}
    </span>
  ))
}

export function Heading({ title, body, align = 'center', dark = false, action, className = '' }) {
  const center = align === 'center'
  const block = (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <h2
        className={`font-outfit font-bold text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.12] text-balance ${
          dark ? 'text-white' : 'text-obsidian-950'
        }`}
      >
        <Words text={title} />
      </h2>
      {body && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-base sm:text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'} ${
            dark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {body}
        </motion.p>
      )}
    </div>
  )

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      className={action ? `flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}` : className}
    >
      {block}
      {action && (
        <motion.div variants={fadeUp} className="shrink-0">
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}

const glows = {
  cobalt: 'rgba(37, 99, 235, 0.09)',
  gold: 'rgba(245, 158, 11, 0.11)',
  dark: 'rgba(96, 165, 250, 0.13)',
  darkGold: 'rgba(251, 191, 36, 0.13)',
}

// Card that rises in (staggered by its index within a row) and carries a soft spotlight
// following the cursor. Hover lift uses the CSS `translate` property so it composes with the
// transform framer-motion owns.
export function Card({ children, className = '', i = 0, cols = 3, glow = 'cobalt', ...rest }) {
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, ${glows[glow]}, transparent 70%)`
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (i % cols) * 0.09, ease: EASE }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onMouseLeave={() => {
        mx.set(-999)
        my.set(-999)
      }}
      style={glow ? { backgroundImage: spotlight } : undefined}
      className={`group relative hover:-translate-y-1.5 transition-[translate,box-shadow,border-color] duration-300 ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Counts the first number in a label ("$43M+", "10,000+", "98.4%") up from zero when it scrolls into view.
export function Counter({ value, className = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match || !inView || reduce) return
    const target = parseFloat(match[2].replace(/,/g, ''))
    const controls = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setN })
    return () => controls.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match || reduce) return <span className={className}>{value}</span>
  const [, pre, num, post] = match
  const decimals = (num.split('.')[1] || '').length
  const text = n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: num.includes(','),
  })
  return (
    <span ref={ref} className={className}>
      {pre}
      {text}
      {post}
    </span>
  )
}

export function Marquee({ items, className = '', itemClassName = '', duration = 32 }) {
  return (
    <div className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} aria-hidden={i >= items.length} className={`shrink-0 px-8 ${itemClassName}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className={`bg-white rounded-2xl border transition-colors duration-300 ${
              isOpen ? 'border-cobalt-500/60 shadow-card-elevated' : 'border-slate-200 shadow-card-tech hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full px-5 sm:px-6 py-5 text-left flex items-center gap-4 sm:gap-5"
            >
              <span className={`font-grotesk text-xs font-bold transition-colors ${isOpen ? 'text-cobalt-600' : 'text-slate-400'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-outfit font-semibold text-base sm:text-lg text-obsidian-950">{f.q}</span>
              <PlusMinus open={isOpen} className={isOpen ? 'text-cobalt-600' : 'text-slate-500'} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 sm:px-6 pb-6 sm:pl-[3.9rem] text-sm sm:text-base text-slate-600 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

// Circle and tick that draw themselves, for form success states.
export function DrawnCheck({ className = '' }) {
  return (
    <motion.svg viewBox="0 0 52 52" className={className} initial="hidden" animate="show" aria-hidden="true">
      <motion.circle
        cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6, ease: EASE } } }}
      />
      <motion.path
        d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.4, delay: 0.5, ease: EASE } } }}
      />
    </motion.svg>
  )
}
