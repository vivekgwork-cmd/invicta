import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal from '../shared/Reveal.jsx'

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_20%_20%,#fff_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-gold-soft uppercase tracking-wide">Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-paper text-balance">
            Talk To A Counsellor. No Pressure, No Obligation.
          </h2>
          <p className="mt-4 text-paper/65">
            Tell us a little about your goals and we'll map out a personalised shortlist of
            universities, scholarships, and timelines within 24 hours.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.15} className="mt-10 mx-auto max-w-xl rounded-lg bg-ink-soft border border-white/10 p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <p className="text-paper font-display text-xl">Thank you — this is a demo form.</p>
              <p className="text-paper/60 text-sm mt-1.5">A real Invicta counsellor would reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="input-dark" />
              <input required type="tel" placeholder="Phone Number" className="input-dark" />
              <input required type="email" placeholder="Email" className="input-dark sm:col-span-2" />
              <input placeholder="City" className="input-dark sm:col-span-2" />
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="group sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-brand py-3.5 font-semibold text-white hover:bg-brand-light transition-colors"
              >
                Request Free Counselling <Arrow />
              </motion.button>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        .input-dark {
          background: #1a2235;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 0.375rem;
          padding: 0.85rem 1rem;
          color: #faf8f4;
          font-size: 0.9rem;
          outline: none;
          transition: border-color .2s;
        }
        .input-dark::placeholder { color: rgba(250,248,244,0.4); }
        .input-dark:focus { border-color: #c69a4b; }
      `}</style>
    </section>
  )
}
