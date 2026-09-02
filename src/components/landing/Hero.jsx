import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'

const proof = [
  { value: '2 Years', label: 'Program duration' },
  { value: '$12,800', label: 'Scholarship' },
  { value: '$14,900', label: 'Final fee (USD)' },
  { value: '3 Weeks', label: 'MIT Boston immersion' },
  { value: 'Oct 2026', label: 'Next intake' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary pt-28 pb-0">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={`${import.meta.env.BASE_URL}images/Tbilisi.jpg`} alt="Tbilisi, Georgia skyline at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-primary/70" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 w-full flex-1 flex flex-col justify-center pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-semibold tracking-[0.14em] text-accent-soft uppercase mb-7"
        >
          In Collaboration With MIT, USA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display max-w-4xl text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-secondary text-balance"
        >
          A Global European Master's. With Real{' '}
          <span className="text-accent-soft">MIT</span> Advantage.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg text-secondary/70 leading-relaxed"
        >
          Earn your Master's at Georgian National University SEU with an MIT-mapped
          curriculum, MIT-trained faculty, and a 3-week immersion at MIT Boston.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a href="#apply" className="group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
            Check Your Eligibility
            <Arrow />
          </a>
          <a href="#programs" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 font-semibold text-secondary/90 hover:bg-white/5 transition-colors">
            Get Your Fee Breakdown
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 text-secondary/60 text-sm border-l-2 border-accent-soft/50 pl-3"
        >
          MIT + SEU — Official Academic Collaboration
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { duration: 0.7, delay: 1 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
          className="hidden sm:block absolute bottom-2 inset-x-0 text-center text-secondary/45 text-xs tracking-wide"
        >
          ↓ See how the pathway works
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative border-t border-white/10 bg-primary-soft"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-5 gap-6">
          {proof.map((p) => (
            <div key={p.label} className="text-center sm:text-left">
              <div className="font-display text-xl sm:text-2xl text-accent-soft">{p.value}</div>
              <div className="text-xs text-secondary/55 mt-1 leading-tight">{p.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
