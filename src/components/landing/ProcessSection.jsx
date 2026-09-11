import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const steps = [
  { title: 'Apply', desc: 'Submit soft copies (10th, 12th, passport, IELTS, photo).' },
  { title: 'Interview', desc: 'University interview within 1 to 2 days.' },
  { title: 'Offer', desc: 'Conditional offer letter with scholarship in 7 days.' },
  { title: 'Secure Your Seat', desc: 'Registration fee + 1st installment.' },
  { title: 'Documentation', desc: 'Apostille + Georgian Ministry processing (30 to 60 days).' },
  { title: 'Visa', desc: 'VFS Global + e-visa in approx. 45 working days.' },
  { title: 'Final Payment', desc: '2nd installment + hostel + TRC fee.' },
  { title: 'Fly To Georgia', desc: 'Arrive in Tbilisi and settle in.' },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-[#0a0e18] scroll-mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Your Journey, The Steps</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Here's Exactly How That <span className="text-gold-soft">Plays Out</span>
          </h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">Eight steps, start to finish, from your first document to landing in Tbilisi.</p>
        </Reveal>

        {/* Desktop: horizontal timeline, inspired by the upgrad reference. A 3-row grid (not
            absolute-positioned blocks) so every "top" label shares one row — bottom-aligned to
            the line regardless of how many lines its own description wraps to — and every
            "bottom" label shares another, top-aligned. The step number lives inside the marker
            itself (not a floating label), so there's nothing to collide with wrapped text.
            Fluid columns, no fixed min-width, so it never needs its own horizontal scrollbar. */}
        <div
          className="hidden lg:grid mt-20"
          style={{ gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'auto 40px auto', columnGap: '8px', rowGap: '28px' }}
        >
          <motion.div
            className="self-center h-0 border-t-2 border-dashed border-white/15"
            style={{ gridRow: 2, gridColumn: '1 / -1', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {steps.map((s, i) => (
            <div key={s.title} style={{ gridRow: 2, gridColumn: i + 1 }} className="relative z-10 min-w-0 flex items-center justify-center">
              <span className="grid place-items-center w-9 h-9 rounded-full border-2 border-accent bg-[#0a0e18] ring-8 ring-[#0a0e18] font-display text-xs text-accent-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}

          {steps.map((s, i) => {
            const top = i % 2 === 0
            return (
              <div
                key={`${s.title}-label`}
                style={{ gridRow: top ? 1 : 3, gridColumn: i + 1 }}
                className={`min-w-0 text-center px-1 flex flex-col ${top ? 'justify-end pb-1' : 'justify-start pt-1'}`}
              >
                <h3 className="font-display text-base text-secondary text-balance">{s.title}</h3>
                <p className="text-xs text-secondary/55 mt-1.5 leading-snug">{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Mobile / tablet fallback: vertical list */}
        <div className="lg:hidden mt-14 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-secondary/10" />
          <motion.div
            className="absolute left-[19px] top-2 w-px bg-accent-soft origin-top"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          <Stagger className="grid gap-8" stagger={0.1}>
            {steps.map((s, i) => (
              <StaggerItem key={s.title} direction="left">
                <div className="relative pl-14">
                  <span className="absolute left-0 top-0 w-10 h-10 rounded-md bg-accent text-white grid place-items-center font-display text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg text-secondary">{s.title}</h3>
                  <p className="text-sm text-secondary/60 mt-1">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-14 rounded-2xl bg-white/[0.04] border border-white/10 border-l-2 border-l-accent-soft p-6">
          <div className="text-sm text-secondary/70 leading-relaxed">
            Admission is merit and interview based. <strong className="text-secondary">No entrance exam required.</strong>{' '}
            English proficiency support: a bridge program is available where needed.
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
