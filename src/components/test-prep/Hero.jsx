import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Counter, EASE, Parallax, Words, fadeUp, useScrollOut } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { img } from '../site/links.js'

const trust = [
  { value: '99.4%', label: 'Hit their target score' },
  { value: '+210', label: 'Average SAT gain' },
  { value: '1:1', label: 'Top 1% mentors', gold: true },
]

export default function Hero() {
  const [ref, contentStyle] = useScrollOut()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-14 pb-24 lg:pt-20 lg:pb-32 px-5 sm:px-6 lg:px-12 border-b border-slate-200/80"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 right-0 w-[800px] h-[500px] bg-gradient-to-bl from-cobalt-500/15 via-champagne-400/10 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <motion.div
          style={contentStyle}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl text-obsidian-950 tracking-tight leading-[1.08] mb-7 text-balance">
            <Words text="Score higher, faster, with top 1% mentors." />
          </h1>

          <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            Studying hard is not the same as studying right. Start with a diagnostic test, get a study plan built around
            your weak spots, and train 1-on-1 with mentors who aced the exam themselves.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <a href="#book-diagnostic" className={`${btn.gold} ${size.lg}`}>
              Take the Free Diagnostic
              <Arrow />
            </a>
            <a href="#choose-exam" className={`${btn.dark} ${size.lg}`}>
              Explore Exam Programs
            </a>
          </motion.div>

          <motion.dl variants={fadeUp} className="grid grid-cols-3 gap-6 w-full max-w-lg pt-8 border-t border-slate-200">
            {trust.map((t) => (
              <div key={t.label}>
                <dt className="sr-only">{t.label}</dt>
                <dd className={`font-outfit font-extrabold text-2xl sm:text-3xl tracking-tight ${t.gold ? 'text-amber-600' : 'text-obsidian-950'}`}>
                  {t.value}
                </dd>
                <dd className="font-grotesk text-[11px] uppercase tracking-wider text-slate-500 mt-1">{t.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 32px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-200 aspect-[4/5]"
          >
            <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
              <img src={img('test-prep-hero.jpg')} alt="A student studying in a university library" className="w-full h-full object-cover" />
            </Parallax>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="absolute -bottom-6 -left-4 sm:-left-8 right-8 sm:right-auto"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white rounded-2xl border border-slate-200 shadow-card-elevated p-5 grid grid-cols-2 gap-6"
            >
              <div>
                <p className="font-grotesk text-[10px] uppercase tracking-wider text-slate-500">Accuracy</p>
                <p className="font-outfit font-extrabold text-xl text-obsidian-950">
                  68% → <Counter value="96%" className="text-cobalt-600" />
                </p>
              </div>
              <div>
                <p className="font-grotesk text-[10px] uppercase tracking-wider text-slate-500">Pace</p>
                <p className="font-outfit font-extrabold text-xl text-amber-600">−34s / q</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
