import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusMinus } from '../shared/Glyphs.jsx'
import Reveal from '../shared/Reveal.jsx'

const faqs = [
  {
    q: 'Is this a European Master’s?',
    a: 'Yes. You earn your Master’s at Georgian National University SEU in Tbilisi, Georgia, with MIT academic collaboration.',
  },
  {
    q: 'What is the MIT advantage exactly?',
    a: 'Curriculum designed and mapped by MIT, faculty trained by MIT, and a 3-week immersion at MIT Boston, plus SEU’s MIT Martin Trust Center entrepreneurship framework.',
  },
  {
    q: 'What is the fee after scholarship?',
    a: 'Tuition $27,700. Scholarship $12,800. Final fee $14,900 USD. The INR amount varies with the exchange rate at time of payment.',
  },
  {
    q: 'Can I work while studying?',
    a: 'Yes. Students are legally allowed to work up to 20 hours per week.',
  },
  {
    q: 'What about food and hostel?',
    a: 'Ultra-modern hostels for Indian students with Indian food options. Hostel starts around $190 per month. Living costs are about $300 to $400 per month.',
  },
  {
    q: 'Is there an entrance exam?',
    a: 'No. Admission is merit and interview based.',
  },
  {
    q: 'What if visa feels difficult?',
    a: 'No visa? No problem. Our team manages the entire documentation and visa process with you, end to end.',
  },
  {
    q: 'What is the next intake?',
    a: 'October 2026.',
  },
  {
    q: 'How long is the program?',
    a: '2 years for most Master’s programs. Executive MBA is 1 year.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-20 bg-secondary-dim/50 scroll-mt-24 border-t border-primary/8">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">FAQs</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            Questions Families Ask <span className="text-gold-deep">Before Applying</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.03} className="rounded-2xl bg-white border border-primary/8 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-primary">{f.q}</span>
                  <span className="shrink-0 text-accent">
                    <PlusMinus open={isOpen} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-slate leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
