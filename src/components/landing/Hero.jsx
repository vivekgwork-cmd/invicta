import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Countdown from '../shared/Countdown.jsx'

const proof = [
  { value: '2 Years', label: 'Program duration' },
  { value: '$12,800', label: 'Scholarship' },
  { value: '$14,900', label: 'Final fee (USD)' },
  { value: '3 Weeks', label: 'MIT Boston immersion' },
  { value: 'Oct 2026', label: 'Next intake' },
]

const INTAKE_DEADLINE = '2026-10-01T00:00:00'

export default function Hero() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="relative overflow-hidden bg-primary pt-28">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={`${import.meta.env.BASE_URL}images/Tbilisi.jpg`} alt="Tbilisi, Georgia skyline at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-primary/40" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 w-full grid lg:grid-cols-[1.05fr_0.85fr] gap-10 items-center pb-16 pt-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.14em] text-gold-soft uppercase mb-7"
          >
            In Collaboration With MIT, USA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display max-w-4xl text-4xl sm:text-5xl lg:text-[4rem] leading-[1.08] text-secondary text-balance"
          >
            A Global European Master's. With Real{' '}
            <span className="text-gold-soft">MIT</span> Advantage.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-secondary/70 leading-relaxed"
          >
            Earn your Master's at Georgian National University SEU with an MIT-mapped
            curriculum, MIT-trained faculty, and a 3-week immersion at MIT Boston.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#apply" className="group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
              Check Your Eligibility
              <Arrow />
            </a>
            <a href="#programs" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 font-semibold text-secondary/90 hover:bg-white/5 transition-colors">
              Get Your Fee Breakdown
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-secondary/60 text-sm border-l-2 border-gold-soft/50 pl-3"
          >
            An Official MIT + SEU Academic Collaboration
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 inline-flex flex-wrap items-center gap-5 rounded-2xl border border-gold-soft/25 bg-white/5 px-5 py-4"
          >
            <div className="text-xs text-secondary/60 leading-tight max-w-[7rem]">
              Oct 2026 intake closes in
            </div>
            <Countdown target={INTAKE_DEADLINE} unitClassName="text-gold-soft" labelClassName="text-secondary/45" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-2xl bg-white text-primary p-6 sm:p-7 shadow-2xl shadow-black/30"
        >
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-display text-xl text-primary">Thank you. This is a demo form.</p>
              <p className="text-slate text-sm mt-1.5">A real Invicta admissions counsellor would follow up shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-lg text-primary">Check Your Eligibility</h3>
              <p className="text-xs text-slate mt-1">Free counselling call. No obligation.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="mt-5 grid gap-3"
              >
                <input required placeholder="Name" className="lp-hero-input" />
                <input required type="tel" placeholder="Phone Number" className="lp-hero-input" />
                <input required type="email" placeholder="Email" className="lp-hero-input" />
                <button type="submit" className="group mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
                  Get My Fee Breakdown <Arrow />
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative bg-secondary"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-7 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {proof.map((p) => (
            <div key={p.label} className="rounded-xl border border-primary/8 bg-white px-4 py-4 text-center sm:text-left">
              <div className="font-display text-xl sm:text-2xl text-accent">{p.value}</div>
              <div className="text-xs text-slate mt-1 leading-tight">{p.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .lp-hero-input {
          background: #f8f9fa;
          border: 1px solid rgba(22,35,59,0.12);
          border-radius: 0.375rem;
          padding: 0.8rem 1rem;
          color: #16233b;
          font-size: 0.9rem;
          outline: none;
          transition: border-color .2s;
        }
        .lp-hero-input::placeholder { color: rgba(22,35,59,0.4); }
        .lp-hero-input:focus { border-color: #ff6b35; }
      `}</style>
    </section>
  )
}
