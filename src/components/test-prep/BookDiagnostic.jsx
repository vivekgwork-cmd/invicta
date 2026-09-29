import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { DrawnCheck, EASE, fadeUp } from '../site/motion.jsx'
import { btn } from '../site/ui.js'

const label = 'block text-xs font-bold font-grotesk text-slate-700 uppercase tracking-wider mb-2'
const field =
  'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-cobalt-500/40 focus:border-cobalt-500 transition-all'

const perks = ['A concept-by-concept report on your weak spots', 'A realistic plan for your target score', 'A free 30-minute call with a mentor']

const EXAMS = ['Digital SAT', 'GRE General', 'GMAT Focus', 'IELTS Academic']

export default function BookDiagnostic({ exam, onExamChange }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="book-diagnostic" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          className="lg:col-span-5 relative bg-obsidian-950 text-white p-8 sm:p-10 lg:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 site-grid-dots opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cobalt-600/25 rounded-full blur-[90px]" />
          <div className="relative">
            <motion.h2 variants={fadeUp} className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
              Take your free diagnostic test.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              A 45-minute test that shows exactly where you stand, followed by a 1-on-1 strategy call with one of our
              mentors.
            </motion.p>
            <ul className="border-t border-obsidian-800">
              {perks.map((p) => (
                <motion.li key={p} variants={fadeUp} className="flex items-center gap-3 py-3.5 border-b border-obsidian-800 text-sm font-semibold text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 shrink-0" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <DrawnCheck className="w-16 h-16 text-emerald-600 mb-5" />
                <h3 className="font-outfit text-2xl font-bold text-obsidian-950 mb-2">Your diagnostic is booked</h3>
                <p className="text-sm text-slate-600 max-w-sm">
                  Thank you. Your {exam} diagnostic link and a time for your strategy call will reach your inbox shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <motion.div variants={fadeUp}>
                  <span className={label}>Target exam</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {EXAMS.map((x) => (
                      <button
                        key={x}
                        type="button"
                        onClick={() => onExamChange(x)}
                        aria-pressed={exam === x}
                        className={`relative px-3 py-3 rounded-xl border text-xs font-bold transition-colors ${
                          exam === x ? 'border-obsidian-950 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {exam === x && (
                          <motion.span
                            layoutId="exam-pill"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-[11px] bg-obsidian-950"
                          />
                        )}
                        <span className="relative">{x}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className={label} htmlFor="student-name">Full Name</label>
                  <input className={field} id="student-name" placeholder="Aarav Sharma" required type="text" />
                </motion.div>
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={label} htmlFor="student-email">Email Address</label>
                    <input className={field} id="student-email" placeholder="aarav@example.com" required type="email" />
                  </div>
                  <div>
                    <label className={label} htmlFor="test-date">Target Test Date</label>
                    <select className={field} id="test-date">
                      <option>Next 30 days</option>
                      <option>1 to 3 months</option>
                      <option>3 to 6 months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <button type="submit" className={`${btn.gold} w-full py-4 px-8 text-base`}>
                    Start My Free Diagnostic
                    <Arrow />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
