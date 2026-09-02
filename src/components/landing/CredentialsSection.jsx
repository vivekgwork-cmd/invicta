import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'

const stats = [
  { to: 84, suffix: '%', label: 'Graduates employed within 4 months', source: 'SEU Career Office', color: '#1b365d' },
  { to: 3, prefix: '#', label: "Among Europe's Top Business Schools in Georgia", source: 'Regional Ranking, 2024', color: '#ff6b35' },
  { to: 1, prefix: '#', label: 'MIT-partnered Master’s program', source: 'QS World Rankings 2024', color: '#e0551f' },
]

const badges = ['Martin Trust Center', 'GLEEN Member', 'MIT Orbit Access']

export default function CredentialsSection() {
  return (
    <section className="py-24 bg-secondary overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
        <div>
          <Reveal>
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">The Proof</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
              That Pathway Isn't Just A Pitch. Here's The Evidence.
            </h2>
          </Reveal>

          <Stagger className="mt-10 grid sm:grid-cols-3 gap-5">
            {stats.map((s) => (
              <StaggerItem key={s.label} direction="up">
                <div className="h-full rounded-2xl border border-primary/8 bg-white overflow-hidden">
                  <div className="h-1" style={{ backgroundColor: s.color }} />
                  <div className="p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: s.color }}>
                      {s.source}
                    </span>
                    <div className="font-display text-4xl mt-2" style={{ color: s.color }}>
                      <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <p className="text-xs text-slate mt-3 leading-relaxed">{s.label}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-6 rounded-2xl bg-secondary-dim/80 p-6 text-sm text-slate leading-relaxed">
            Average salary in Georgia is about <strong className="text-primary">$20,000</strong> (up to
            $55,000). In other EU countries, about <strong className="text-primary">$40,000</strong> (up
            to $85,000) — framed by SEU materials as a European career average of roughly ₹40 lakhs
            per year. Treat these as illustrative SEU-reported ranges, not a personal guarantee.
          </Reveal>
        </div>

        <Reveal direction="right" className="relative rounded-3xl overflow-hidden aspect-[4/5]">
          <img src="/images/MIT.jpg" alt="MIT campus, Boston" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/15 to-primary/5" />

          <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="text-xs font-semibold text-secondary bg-primary/40 backdrop-blur-sm border border-secondary/25 rounded-full px-3 py-1.5"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-secondary">
            <p className="text-sm leading-relaxed text-secondary/85">
              SEU partners with the <strong>Martin Trust Center for MIT Entrepreneurship</strong>,
              giving students access to MIT's global innovation network.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
