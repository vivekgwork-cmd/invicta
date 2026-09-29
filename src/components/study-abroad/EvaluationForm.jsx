import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { DrawnCheck, EASE, fadeUp } from '../site/motion.jsx'
import { btn } from '../site/ui.js'
import { img } from '../site/links.js'

const label = 'block text-xs font-bold font-grotesk text-slate-700 uppercase tracking-wider mb-2'
const field =
  'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-cobalt-500/40 focus:border-cobalt-500 transition-all'

const perks = ['Free 30-minute profile session', 'Completely confidential', 'A written admissions assessment']

export default function EvaluationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [audience, setAudience] = useState('student')

  return (
    <section id="evaluation-form" className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-slate-100/70 border-t border-slate-200 scroll-mt-20">
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
          className="lg:col-span-5 relative bg-obsidian-950 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute inset-0 site-grid-dots opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cobalt-600/25 rounded-full blur-[90px]" />
          <div className="relative">
            <motion.div variants={fadeUp} className="bg-white p-2 rounded-xl inline-block mb-8">
              <img src={img('invicta-career-logo.png')} alt="Invicta Career Consultancy" className="h-7 w-auto object-contain" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-outfit text-3xl sm:text-4xl text-white mb-4 font-bold tracking-tight leading-tight">
              Let us map your path to a top university.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Book a free 1-on-1 profile evaluation with a senior admissions counsellor and get a plan built around your
              target universities.
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
          <motion.p variants={fadeUp} className="relative pt-10 text-xs text-slate-500 font-grotesk">
            Rated 4.9/5 by 2,000+ students and parents across India and Southeast Asia.
          </motion.p>
        </motion.div>

        <div id="mentor-consult" className="lg:col-span-7 p-8 sm:p-10 lg:p-12 scroll-mt-20">
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
                <h3 className="font-outfit text-2xl font-bold text-obsidian-950 mb-2">Your evaluation is booked</h3>
                <p className="text-sm text-slate-600 max-w-md">
                  Thank you. A senior counsellor will review your details and contact you on WhatsApp to confirm a time.
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
                  <span className={label}>I am filling this in as</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['student', 'A Student'],
                      ['parent', 'A Parent'],
                    ].map(([value, text]) => (
                      <label
                        key={value}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-sm font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cobalt-500 ${
                          audience === value ? 'bg-obsidian-950 border-obsidian-950 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name="audience_type"
                          value={value}
                          checked={audience === value}
                          onChange={() => setAudience(value)}
                          className="sr-only"
                        />
                        {text}
                      </label>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className={label} htmlFor="student_name">Student's Full Name *</label>
                  <input className={field} id="student_name" placeholder="e.g. Aarav Sharma" required type="text" />
                </motion.div>

                <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={label} htmlFor="phone_number">WhatsApp / Phone *</label>
                    <input className={field} id="phone_number" placeholder="+91 98765 43210" required type="tel" />
                  </div>
                  <div>
                    <label className={label} htmlFor="email_address">Email Address *</label>
                    <input className={field} id="email_address" placeholder="aarav@example.com" required type="email" />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className={label} htmlFor="grade_year">Current Grade / Year *</label>
                  <select className={field} id="grade_year" required defaultValue="">
                    <option disabled value="">Select current grade</option>
                    <option value="grade_9">Grade 9</option>
                    <option value="grade_10">Grade 10</option>
                    <option value="grade_11">Grade 11</option>
                    <option value="grade_12">Grade 12</option>
                    <option value="gap_transfer">Gap Year / University Transfer</option>
                  </select>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className={label} htmlFor="target_countries">Target Countries or Universities</label>
                  <input
                    className={field}
                    id="target_countries"
                    placeholder="e.g. USA, UK (Oxford/Cambridge), Canada; CS or Business"
                    type="text"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <button type="submit" className={`${btn.gold} w-full py-4 px-8 text-base`}>
                    Book My Free Evaluation
                    <Arrow />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">Confidential. No commitment. A free 30-minute session.</p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
