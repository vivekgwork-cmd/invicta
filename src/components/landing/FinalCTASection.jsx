import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal from '../shared/Reveal.jsx'

export default function FinalCTASection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="apply" className="py-24 bg-primary relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0">
        <img src="/images/professional-lady.jpg" alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
        <Reveal direction="left">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Ready To Start Your MIT-Aligned Master's Journey?
          </h2>
          <p className="mt-4 text-secondary/65 leading-relaxed">
            Talk to our admissions team to check your eligibility, understand your scholarship,
            and get a clear roadmap to Georgian National University SEU.
          </p>
          <div className="mt-6 border-l-2 border-accent-soft/50 pl-4 text-sm text-secondary/70">
            No visa? No problem. Scores low? We'll help you level up.
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="rounded-lg bg-primary-soft border border-white/10 p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-display text-xl text-secondary">Thank you — this is a demo form.</p>
              <p className="text-secondary/60 text-sm mt-1.5">A real Invicta admissions counsellor would follow up shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="grid gap-4"
            >
              <input required placeholder="Name" className="lp-input" />
              <input required type="tel" placeholder="Phone Number" className="lp-input" />
              <input required type="email" placeholder="Email" className="lp-input" />
              <input placeholder="City" className="lp-input" />
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                <motion.button whileTap={{ scale: 0.97 }} type="submit" className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
                  Apply Now <Arrow />
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 py-3.5 font-semibold text-secondary border border-white/15 hover:bg-white/15 transition-colors">
                  Check Eligibility
                </motion.button>
              </div>
              <p className="text-[11px] text-secondary/40 text-center mt-1">
                Free counselling conversation. No obligation to enroll on the first call.
              </p>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        .lp-input {
          background: #24406b;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 0.375rem;
          padding: 0.85rem 1rem;
          color: #f8f9fa;
          font-size: 0.9rem;
          outline: none;
          transition: border-color .2s;
        }
        .lp-input::placeholder { color: rgba(248,249,250,0.4); }
        .lp-input:focus { border-color: #ff6b35; }
      `}</style>
    </section>
  )
}
