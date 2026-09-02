import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const core = [
  'We shortlist the right program and prepare you for the university interview.',
  'We negotiate and lock in the best possible scholarship for you.',
  'We handle your full documentation, apostille, and Georgian Ministry processing.',
  'We prepare your complete visa file and guide you through VFS Global.',
  'We assist with flights, airport pickup, hostel booking, and settling into Tbilisi.',
  'You get a dedicated relationship manager who stays with you till the end.',
]

const packageItems = [
  'College admission fee handling support',
  "Admission letter and rector's letter support",
  'Visa from India and Ministry invitation support',
  'Apostille and authentication of documents',
  'TRC and I-card assistance',
  'Airport pickup',
  'Travel coordination India to Georgia',
  'Medical checkup and reports in Georgia',
  'Bank account opening and forex debit card support',
  'Mobile SIM in Georgia',
  'Bank loan file preparation support',
  'Digital study materials support',
]

export default function SupportSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="support" className="py-24 bg-primary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Your Journey — Who's With You</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            We Don't Just Guide You. We Take Full Ownership.
          </h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">
            Applying to a foreign university can feel messy and uncertain. That is why our team
            takes complete responsibility for your entire journey, from the first conversation
            until you are settled in Georgia — here's what that looks like, end to end.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {core.map((c, i) => (
            <StaggerItem key={c}>
              <div className="h-full bg-primary p-6">
                <span className="font-display text-accent-soft/50 text-2xl">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm text-secondary/80 leading-relaxed mt-4">{c}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft border-b border-accent-soft/40 pb-0.5"
          >
            {open ? 'Hide' : 'See'} everything included in your support package
            <span className={`inline-block transition-transform duration-300 ${open ? '-rotate-180' : ''}`}>⌄</span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {packageItems.map((p) => (
                    <div key={p} className="rounded-lg bg-white/[0.03] px-4 py-3 text-xs text-secondary/65">
                      {p}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Reveal delay={0.15} className="mt-10 text-center font-display text-xl text-secondary/90">
          "You focus on your future. We handle everything else, end to end."
        </Reveal>
      </div>
    </section>
  )
}
