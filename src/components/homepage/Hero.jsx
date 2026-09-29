import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Words, fadeUp, useScrollOut } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const highlights = [
  { value: '95%', label: 'Admit success rate' },
  { value: '500+', label: 'Partner universities' },
  { value: '$45M+', label: 'Scholarships secured', gold: true },
  { value: '1:1', label: 'Profile strategy' },
]

export default function Hero() {
  const [ref, contentStyle] = useScrollOut()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-16 pb-24 lg:pt-24 lg:pb-32 px-5 sm:px-6 lg:px-12 border-b border-slate-200/80"
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
        <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-7xl text-obsidian-950 max-w-5xl tracking-tight leading-[1.08] mb-7 text-balance">
          <Words text="Study abroad, from test prep to Ivy-level colleges." />
        </h1>

        <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
          Expert test prep and university counselling that helps students study abroad affordably, strategically and
          successfully.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-10">
          <Link to={ROUTES.counselling} className={`${btn.gold} ${size.lg} w-full sm:w-auto`}>
            Book Free Counselling
            <Arrow />
          </Link>
          <Link to={ROUTES.studyAbroad} className={`${btn.dark} ${size.lg} w-full sm:w-auto`}>
            Explore the Study Abroad Guide
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2 bg-white/95 border border-slate-200 px-6 py-2.5 rounded-full shadow-sm text-xs sm:text-sm text-slate-600"
        >
          <span className="text-amber-500 font-bold tracking-tight">★★★★★</span>
          <span className="font-grotesk font-bold text-obsidian-950 ml-1">4.9/5</span>
          <span>from 10,000+ placed students</span>
          <span className="hidden md:inline text-slate-300">•</span>
          <span className="text-slate-900 font-semibold">Mentors from Harvard, Oxford, Stanford and MIT</span>
        </motion.div>

        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.08, ease: EASE }}
              className={`bg-white rounded-2xl px-5 py-5 border border-slate-200 shadow-card-tech text-left transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 ${
                h.gold ? 'hover:border-champagne-500/50 hover:shadow-glow-gold' : 'hover:border-cobalt-500/50 hover:shadow-glow-cobalt'
              }`}
            >
              <p className={`font-outfit font-extrabold text-2xl sm:text-3xl tracking-tight ${h.gold ? 'text-amber-600' : 'text-obsidian-950'}`}>
                {h.value}
              </p>
              <p className="font-grotesk text-[11px] uppercase tracking-wider text-slate-500 mt-1">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
