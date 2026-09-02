import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../shared/Reveal.jsx'

export default function ProgramSpotlight() {
  return (
    <section id="why-us" className="py-24 bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-gold-soft uppercase tracking-wide">Featured Program</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-paper text-balance">
            One Program We're Especially Proud Of
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center rounded-2xl border border-white/10 bg-ink-soft p-3 sm:p-4">
          <Reveal direction="left" className="relative rounded-lg overflow-hidden aspect-[4/3]">
            <img src="/images/SEU.jpg" alt="Georgian National University SEU campus" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute top-4 left-4 text-xs font-semibold tracking-wide text-paper uppercase">
              Tbilisi, Georgia
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-4 left-4 right-4 rounded-md bg-ink border border-white/10 px-4 py-3 text-paper"
            >
              <span className="text-sm">Next intake: <strong className="font-semibold">October 2026</strong></span>
            </motion.div>
          </Reveal>

          <Reveal direction="right" className="p-4 sm:p-6 lg:pr-10">
            <h3 className="font-display text-2xl sm:text-3xl text-paper leading-tight text-balance">
              A Global European Master's, With Real MIT Advantage
            </h3>
            <p className="mt-4 text-paper/65 leading-relaxed">
              Earn your Master's at Georgian National University SEU with an MIT-mapped
              curriculum, MIT-trained faculty, and a 3-week immersion at MIT Boston — final
              fee from $14,900 after scholarship.
            </p>
            <ul className="mt-6 space-y-2 border-l-2 border-gold-soft/40">
              {['MBA, AI, Data Science, FinTech & more', 'Scholarship up to $12,800', '84% graduates employed within 4 months'].map((f) => (
                <li key={f} className="pl-4 text-sm text-paper/80">
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/landing-page"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold-soft px-6 py-3.5 font-semibold text-ink hover:bg-gold transition-colors"
            >
              Explore The Full Program
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
