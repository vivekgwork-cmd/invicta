import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal from '../shared/Reveal.jsx'

export default function FinalCTASection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="apply" className="py-20 bg-primary relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0">
        <img src={`${import.meta.env.BASE_URL}images/get-started-section.jpg`} alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
        <Reveal direction="left">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Ready To Start Your <span className="text-gold-soft">MIT-Aligned</span> Master's Journey?
          </h2>
          <p className="mt-4 text-secondary/65 leading-relaxed">
            Talk to our admissions team to check your eligibility, understand your scholarship,
            and get a clear roadmap to Georgian National University SEU.
          </p>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="rounded-lg bg-primary-soft border border-white/10 p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-display text-xl text-secondary">Thank you. This is a demo form.</p>
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
              <h3 className="font-display text-lg text-secondary">Unlock Your $12,800 Program Scholarship</h3>
              <input required placeholder="Name" className="lp-input" />
              <input required type="tel" placeholder="Phone Number" className="lp-input" />
              <input required type="email" placeholder="Email" className="lp-input" />
              <input placeholder="City" className="lp-input" />
              <motion.button whileTap={{ scale: 0.97 }} type="submit" className="group mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
                Get Your Fee Breakdown <Arrow />
              </motion.button>
              <p className="text-[13px] text-secondary/40 text-center mt-1">
                Get a free consultation and check your scholarship eligibility now.
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
