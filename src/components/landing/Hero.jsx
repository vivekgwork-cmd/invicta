import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow, ProofIcon } from '../shared/Glyphs.jsx'
import Countdown from '../shared/Countdown.jsx'

const proof = [
  { value: '18-24 Months', label: 'Program Duration', icon: 'duration' },
  { value: '$12,800', label: 'Scholarship', icon: 'scholarship' },
  { value: '$14,900', label: 'Final Fee (USD)', icon: 'fee' },
  { value: '3 Weeks', label: 'MIT Boston Immersion', icon: 'immersion' },
  { value: 'Oct 2026', label: 'Next Intake', icon: 'intake' },
  { value: 'Jan 2027', label: 'Future Intake', icon: 'intake' },
]

const streams = [
  'MS in AI',
  'MS in FinTech',
  'MS in Business Analytics',
  'MS in Data Science',
  'MBA',
]

const INTAKE_DEADLINE = '2026-10-01T00:00:00'

const HERO_VARIANTS = {
  original: {
    image: 'Tbilisi.jpg',
    alt: 'Tbilisi, Georgia skyline at dusk',
    overlayRgb: '11,18,32', // #0b1220
  },
  charcoal: {
    image: 'MIT.jpg',
    alt: 'MIT Great Dome at dusk',
    overlayRgb: '16,15,16', // #100f10
  },
  emerald: {
    image: 'SEU.jpg',
    alt: 'Georgian National University SEU campus, Tbilisi',
    overlayRgb: '8,18,13', // #08120d
    objectPosition: 'center 15%',
    filter: 'saturate(0.75) contrast(1.08) brightness(0.92)',
  },
  maroon: {
    image: 'college-pic.jpg',
    alt: 'Historic university courtyard',
    overlayRgb: '21,10,13', // #150a0d
  },
}

function EligibilityForm() {
  const [step, setStep] = useState('form') // 'form' | 'otp' | 'done'
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  if (step === 'done') {
    return (
      <div className="text-center py-8">
        <p className="font-display text-xl text-primary">Thank you. This is a demo form.</p>
        <p className="text-slate text-sm mt-1.5">A real Invicta admissions counsellor would follow up shortly.</p>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div>
        <h3 className="font-display text-lg text-primary">Verify Your Number</h3>
        <p className="text-xs text-slate mt-1">
          Enter the 6-digit code we've sent by SMS. (Demo only — any 6 digits work.)
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (otp.trim().length !== 6) {
              setOtpError('Enter the 6-digit code to continue.')
              return
            }
            setOtpError('')
            setStep('done')
          }}
          className="mt-5 grid gap-3"
        >
          <input
            required
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="lp-hero-input tracking-[0.4em] text-center"
          />
          {otpError && <p className="text-xs text-accent-dark -mt-1">{otpError}</p>}
          <button type="submit" className="group mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
            Verify &amp; Continue <Arrow />
          </button>
          <button type="button" onClick={() => setStep('form')} className="text-xs text-slate underline underline-offset-2 justify-self-center">
            Back to form
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      <h3 className="font-display text-lg text-primary">Unlock Your $12,800 Program Scholarship</h3>
      <p className="text-xs text-slate mt-1">Get a free consultation and check your scholarship eligibility now.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setStep('otp')
        }}
        className="mt-5 grid gap-3"
      >
        <input required placeholder="Name" className="lp-hero-input" />
        <input required type="tel" placeholder="Phone Number" className="lp-hero-input" />
        <input required type="email" placeholder="Email" className="lp-hero-input" />
        <input required placeholder="City" className="lp-hero-input" />
        <select required defaultValue="" className="lp-hero-input">
          <option value="" disabled>Are you a Parent or Student?</option>
          <option value="Parent">Parent</option>
          <option value="Student">Student</option>
        </select>
        <select required defaultValue="" className="lp-hero-input">
          <option value="" disabled>Have you completed your bachelor's?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <select required defaultValue="" className="lp-hero-input">
          <option value="" disabled>Preferred Stream</option>
          {streams.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit" className="group mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
          Get My Fee Breakdown <Arrow />
        </button>
      </form>
    </>
  )
}

export default function Hero({ variant = 'original' }) {
  const { image, alt, overlayRgb, objectPosition = 'center', filter = 'none' } = HERO_VARIANTS[variant] ?? HERO_VARIANTS.original

  return (
    <section className="relative overflow-hidden bg-primary pt-14 sm:pt-16">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/${image}`}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition, filter }}
        />
        {/* Premium dark treatment: overlay color swaps per variant, subtle warm glow bottom-right */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(${overlayRgb},1) 0%, rgba(${overlayRgb},0.85) 45%, rgba(${overlayRgb},0.42) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(${overlayRgb},1) 0%, rgba(${overlayRgb},0.25) 45%, rgba(${overlayRgb},0.55) 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 85% 100%, rgba(255,104,53,0.16), transparent)' }} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 w-full grid lg:grid-cols-[1.05fr_0.85fr] gap-10 items-center pb-8 pt-6">
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
            Study Masters in Georgia
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">
              With the <span className="text-gold-soft">MIT</span> Advantage
            </span>
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
            <a href="#hero-form" className="group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
              Get Your Fee Breakdown
              <Arrow />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 inline-flex flex-wrap items-center gap-5 rounded-2xl border border-gold-soft/25 bg-white/5 px-5 py-4"
          >
            <div className="text-xs text-secondary/60 leading-tight max-w-[7rem]">
              Oct 2026 intake closes in
            </div>
            <Countdown target={INTAKE_DEADLINE} unitClassName="text-gold-soft" labelClassName="text-secondary/45" />
          </motion.div>
        </div>

        <motion.div
          id="hero-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-2xl bg-white text-primary p-6 sm:p-7 shadow-2xl shadow-black/30 scroll-mt-28"
        >
          <EligibilityForm />
        </motion.div>
      </div>

      {/* Proof strip — merged into the banner as an overlapping card, not a separate section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pb-10 sm:pb-14"
      >
        <div className="rounded-2xl bg-white shadow-xl shadow-black/25 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {proof.map((p) => (
            <div key={p.label} className="rounded-xl border border-primary/8 px-4 py-4 text-center sm:text-left">
              <ProofIcon name={p.icon} className="text-accent hidden sm:inline-block mb-1.5" />
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
