import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../shared/Reveal.jsx'
import { Check } from '../shared/Glyphs.jsx'

const categories = [
  {
    title: 'Program & Admission',
    subheading: 'Getting you the offer',
    items: [
      'We shortlist the right program and prepare you for the university interview.',
      'We negotiate and lock in the best possible scholarship for you.',
      'College admission fee handling support.',
      "Admission letter and rector's letter support.",
    ],
  },
  {
    title: 'Documentation & Visa',
    subheading: 'Paperwork, sorted for you',
    items: [
      'We handle your full documentation, apostille, and Georgian Ministry processing.',
      'We prepare your complete visa file and guide you through VFS Global.',
      'Visa from India and Ministry invitation support.',
      'Apostille and authentication of documents.',
      'TRC and I-card assistance.',
    ],
  },
  {
    title: 'Travel & Settling In',
    subheading: 'Landing in Georgia, covered',
    items: [
      'We assist with flights, airport pickup, hostel booking, and settling into Tbilisi.',
      'Travel coordination from India to Georgia.',
      'Medical checkup and reports in Georgia.',
      'Mobile SIM in Georgia.',
    ],
  },
  {
    title: 'Finance & Banking',
    subheading: 'Money matters, simplified',
    items: [
      'Bank account opening and forex debit card support.',
      'Bank loan file preparation support.',
    ],
  },
  {
    title: 'Ongoing Relationship Manager',
    subheading: 'One person, the whole way through',
    items: [
      'You get a dedicated relationship manager who stays with you till the end.',
      'Digital study materials support.',
    ],
  },
]

export default function SupportSection() {
  const [active, setActive] = useState(0)
  const activeCategory = categories[active]

  return (
    <section id="support" className="py-20 bg-secondary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Your Journey, Who's With You</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            We Don't Just Guide You. We Take <span className="text-gold-deep">Full Ownership</span>.
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Applying to a foreign university can feel messy and uncertain. That is why our team
            takes complete responsibility for your entire journey, from the first conversation
            until you are settled in Georgia. Here's what that looks like, end to end.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-2xl border border-primary/10 bg-white p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate/60 pb-4 mb-6 border-b border-primary/10">
            Your Support Package
          </div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14">
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1">
              {categories.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group text-left whitespace-nowrap lg:whitespace-normal py-3 transition-colors"
                >
                  <span
                    className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                      active === i
                        ? 'text-accent border-accent'
                        : 'text-slate/50 border-transparent group-hover:text-slate'
                    }`}
                  >
                    {c.title}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-xl text-primary">{activeCategory.subheading}</h3>
                  <div className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {activeCategory.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="bg-accent/10 text-accent shrink-0 w-6 h-6" />
                      <p className="text-sm text-slate leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 text-center font-display text-xl text-primary/90">
          "You focus on your future. We handle everything else, end to end."
        </Reveal>
      </div>
    </section>
  )
}
