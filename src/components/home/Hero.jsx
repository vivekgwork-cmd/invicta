import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import CountUp from '../shared/CountUp.jsx'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink pt-24 pb-16">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/images/indian-college-students.jpg"
          alt="Indian students studying abroad"
          className="w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>

      {/* decorative grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs font-semibold tracking-[0.14em] text-gold-soft uppercase mb-6"
          >
            Trusted by 12,000+ Indian students since 2011
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper text-balance"
          >
            Your Global Career Starts With The Right{' '}
            <span className="text-gold-soft">University</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-lg text-paper/70 max-w-xl leading-relaxed"
          >
            Invicta Global Education plans, funds, and manages your entire study-abroad
            journey — from shortlisting universities and scholarships to visas, flights,
            and life on campus. One team, zero guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3.5 font-semibold text-white hover:bg-brand-light transition-colors"
            >
              Book Free Counselling
              <Arrow />
            </a>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 font-semibold text-paper/90 hover:bg-white/5 transition-colors"
            >
              Student Stories
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-14 grid grid-cols-3 max-w-md gap-6 border-t border-white/10 pt-7"
          >
            {[
              { to: 40, suffix: '+', label: 'Partner Universities' },
              { to: 12, suffix: 'K+', label: 'Students Placed' },
              { to: 98, suffix: '%', label: 'Visa Success Rate' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl sm:text-3xl text-paper">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-xs text-paper/55 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <img src="/images/professional-lady.jpg" alt="Invicta admissions counsellor" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-paper">
              <div className="text-sm font-semibold">Priya Nair</div>
              <div className="text-xs text-paper/70">Lead Admissions Counsellor, Invicta</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -right-6 -top-6 bg-paper text-ink rounded-2xl shadow-xl px-5 py-4 w-52"
          >
            <div className="text-xs text-slate font-medium mb-1">Next Intake</div>
            <div className="font-display text-lg font-semibold">October 2026</div>
            <div className="mt-2 h-1.5 rounded-full bg-paper-dim overflow-hidden">
              <motion.div
                className="h-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
              />
            </div>
            <div className="text-[11px] text-slate mt-1.5">Seats filling fast</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
