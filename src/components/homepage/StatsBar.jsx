import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Counter, EASE, Heading } from '../site/motion.jsx'

const stats = [
  { value: '10,000+', label: 'Students placed' },
  { value: '95%', label: 'Admit success rate' },
  { value: '500+', label: 'Partner universities' },
  { value: '$45M+', label: 'Scholarships secured', gold: true },
  { value: 'Top 50', label: 'QS-ranked universities' },
  { value: '30+', label: 'Years of experience', gold: true },
]

// The whole band arrives as a tilted card that travels in from the bottom right and settles as
// an inset rounded card, linked to scroll so it moves with the reader.
function SlideInCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const x = useTransform(progress, [0, 1], ['45%', '0%'])
  const y = useTransform(progress, [0, 1], [220, 0])
  const rotate = useTransform(progress, [0, 1], [6, 0])
  const scale = useTransform(progress, [0, 1], [0.8, 1])
  const borderRadius = useTransform(progress, [0, 1], [48, 32])

  return (
    // Padding keeps the settled card off the page edges; overflow-x-clip hides its off-screen part
    // without adding a horizontal scrollbar.
    <div ref={ref} className="overflow-x-clip px-3 sm:px-6 lg:px-10 py-4">
      <motion.section
        style={reduce ? undefined : { x, y, rotate, scale, borderRadius, transformOrigin: '100% 100%' }}
        className={className}
      >
        {children}
      </motion.section>
    </div>
  )
}

export default function StatsBar() {
  return (
    <SlideInCard className="w-full bg-obsidian-950 text-white py-16 px-5 sm:px-8 lg:px-12 relative overflow-hidden rounded-[32px] shadow-[0_12px_28px_-12px_rgba(6,9,17,0.45)]">
      <div className="absolute inset-0 site-grid-dots opacity-25" />
      <div className="absolute -top-40 left-1/3 w-[500px] h-[300px] bg-cobalt-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Heading
          dark
          align="left"
          title="Three decades of getting students into great universities."
          className="mb-14"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 border-t border-l border-obsidian-800">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group relative border-r border-b border-obsidian-800 p-6 sm:p-8 hover:bg-obsidian-900/70 transition-colors"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE }}
                className={`absolute top-0 left-0 h-[2px] w-full origin-left ${s.gold ? 'bg-champagne-500' : 'bg-cobalt-500'}`}
              />
              <p className={`font-outfit font-extrabold text-4xl sm:text-5xl tracking-tight ${s.gold ? 'text-champagne-400' : 'text-white'}`}>
                <Counter value={s.value} />
              </p>
              <p className="font-grotesk text-[11px] uppercase tracking-wider text-slate-400 mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs sm:text-sm text-slate-500">
          Every student also gets a 1:1 profile strategy and a dedicated counsellor for career planning.
        </p>
      </div>
    </SlideInCard>
  )
}
