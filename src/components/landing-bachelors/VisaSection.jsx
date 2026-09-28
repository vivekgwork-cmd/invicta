import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { Check } from '../shared/Glyphs.jsx'
import { motion } from 'framer-motion'

const timeline = [
  { step: '01', title: 'Documentation', desc: 'Apostille and Georgian Ministry processing.', time: '30 to 60 days' },
  { step: '02', title: 'Ministry Invitation', desc: 'Official invitation letter issued to your file.', time: '2 weeks' },
  { step: '03', title: 'VFS Global', desc: 'Biometrics and visa file submission.', time: '1 visit' },
  { step: '04', title: 'e-Visa Approval', desc: 'Visa granted and ready to travel.', time: '≈45 working days' },
]

const handled = [
  'Complete visa file preparation, checked line by line',
  'Georgian Ministry invitation support',
  'Apostille and authentication of documents',
  'VFS Global appointment and biometrics guidance',
  'TRC and I-card assistance after arrival',
  'A dedicated relationship manager for every question',
]

export default function VisaSection() {
  return (
    <section id="visa" className="relative py-20 bg-secondary scroll-mt-24 border-t border-primary/8 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 sm:top-2 overflow-hidden pointer-events-none select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lp-visa-marquee flex whitespace-nowrap font-display font-semibold text-primary/[0.05] leading-none">
          <span className="pr-16">Visa, Fully Handled</span>
          <span className="pr-16">Visa, Fully Handled</span>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative max-w-2xl">

          <Reveal className="relative z-10">
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Visa, Simplified</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
              Visa, <span className="text-gold-deep">Fully Handled.</span>
            </h2>
            <p className="mt-4 text-slate leading-relaxed">
              Our team manages the entire documentation and visa process with you, end to end —
              so you always know exactly what stage you're at and what happens next.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((t) => (
            <StaggerItem key={t.step}>
              <div className="h-full rounded-2xl border border-primary/10 bg-white p-6 relative overflow-hidden">
                <span className="font-display text-3xl text-primary/10">{t.step}</span>
                <h3 className="mt-2 font-display text-lg text-primary">{t.title}</h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">{t.desc}</p>
                <span className="mt-4 inline-flex items-center rounded-full bg-gold/10 text-gold-deep text-[13px] font-semibold uppercase tracking-wide px-3 py-1">
                  {t.time}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
          <Reveal direction="left" className="rounded-2xl bg-primary text-secondary p-8 flex flex-col justify-center">
            <p className="font-display text-2xl leading-snug text-balance">
              Visa handled for you, start to finish. No forms to decode alone.
            </p>
            <p className="text-secondary/60 text-sm mt-3 leading-relaxed">
              Our team handles everything, start to finish.
            </p>
          </Reveal>

          <Reveal direction="right" className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {handled.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <Check className="bg-accent/10 text-accent shrink-0" />
                  <p className="text-sm text-primary/80 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes lp-visa-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .lp-visa-marquee {
          width: max-content;
          font-size: clamp(5rem, 16vw, 13rem);
          animation: lp-visa-marquee 26s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-visa-marquee { animation: none; }
        }
      `}</style>

    </section>
  )
}
