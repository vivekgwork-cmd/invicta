import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const steps = [
  { title: 'Apply', desc: 'Submit soft copies (10th, 12th, passport, IELTS, photo).' },
  { title: 'Interview', desc: 'University interview within 1–2 days.' },
  { title: 'Offer', desc: 'Conditional offer letter with scholarship in 7 days.' },
  { title: 'Secure Your Seat', desc: 'Registration fee + 1st installment.' },
  { title: 'Documentation', desc: 'Apostille + Georgian Ministry processing (30–60 days).' },
  { title: 'Visa', desc: 'VFS Global + e-visa in approx. 45 working days.' },
  { title: 'Final Payment', desc: '2nd installment + hostel + TRC fee.' },
  { title: 'Fly To Georgia', desc: 'Arrive in Tbilisi and settle in.' },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-secondary-dim/50 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Your Journey — The Steps</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">Here's Exactly How That Plays Out</h2>
          <p className="mt-4 text-slate leading-relaxed">Eight steps, start to finish — from your first document to landing in Tbilisi.</p>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-primary/10" />
          <motion.div
            className="absolute left-[19px] top-2 w-px bg-accent origin-top"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          <Stagger className="grid gap-8" stagger={0.1}>
            {steps.map((s, i) => (
              <StaggerItem key={s.title} direction="left">
                <div className="relative pl-14">
                  <span className="absolute left-0 top-0 w-10 h-10 rounded-md bg-primary text-secondary grid place-items-center font-display text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg text-primary">{s.title}</h3>
                  <p className="text-sm text-slate mt-1">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-14 rounded-2xl bg-white border border-primary/8 border-l-2 border-l-accent p-6">
          <div className="text-sm text-slate leading-relaxed">
            Admission is merit and interview based — <strong className="text-primary">no entrance exam required</strong>.
            English proficiency support: a bridge program is available where needed.
            <br />
            <span className="text-primary font-medium">No visa? No problem.</span> Our team manages the
            entire documentation and visa process with you, end to end.
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <a href="#apply" className="group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-semibold text-white hover:bg-accent-light transition-colors">
            Start My Application <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
