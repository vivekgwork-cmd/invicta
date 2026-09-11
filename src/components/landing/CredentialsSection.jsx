import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

const stats = [
  { to: 84, suffix: '%', label: 'Graduates employed within 4 months', source: 'SEU Career Office' },
  { to: 3, prefix: '#', label: "Among Europe's top business schools in Georgia", source: 'Regional Ranking, 2024' },
  { to: 1, prefix: '#', label: 'MIT-partnered Master’s program', source: 'QS World Rankings 2024' },
]

const badges = ['Martin Trust Center', 'GLEEN Member', 'MIT Orbit Access']

export default function CredentialsSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative z-10 rounded-t-[2rem] sm:rounded-t-[2.5rem] shadow-[0_-24px_48px_-24px_rgba(11,18,32,0.35)] py-20 bg-secondary border-t border-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">The Proof</span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
                Your Global Degree, With The <span className="text-gold-deep">MIT Advantage</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-6 rounded-xl bg-accent/8 border-l-4 border-accent pl-5 pr-5 py-4">
              <p className="text-base text-primary leading-relaxed">
                SEU partners with the{' '}
                <span className="bg-gold-soft/70 text-primary font-semibold px-1 rounded-sm">
                  Martin Trust Center for MIT Entrepreneurship
                </span>
                , giving students access to MIT's global innovation network.
              </p>
            </Reveal>

            <Stagger className="mt-8 grid sm:grid-cols-3 gap-5">
              {stats.map((s) => (
                <StaggerItem key={s.label} direction="up">
                  <div className="h-full rounded-2xl bg-white border border-primary/10 p-6 transition-transform hover:-translate-y-0.5">
                    <div className="font-display text-4xl text-accent">
                      <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <p className="text-sm text-primary font-medium mt-3 leading-snug">{s.label}</p>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate/70 mt-3">
                      {s.source}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15} className="mt-6 rounded-2xl bg-white border border-primary/8 p-6 text-sm text-slate leading-relaxed">
              Average salary in Georgia is about <strong className="text-primary">$20,000</strong> (up to
              $55,000). In other EU countries, about <strong className="text-primary">$40,000</strong> (up
              to $85,000), framed by SEU materials as a European career average of roughly ₹40 lakhs
              per year.*
              <span className="block mt-4 text-xs text-slate/70">
                *Treat these as illustrative SEU-reported ranges, not a personal guarantee.
              </span>
            </Reveal>
          </div>

          <Reveal direction="right" className="relative rounded-3xl overflow-hidden aspect-[4/5] group">
            <img src={`${import.meta.env.BASE_URL}images/MIT.jpg`} alt="MIT campus, Boston" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.6]" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/15 to-primary/5" />

            {/* Placeholder for the MIT campus video — swap the poster image above for a <video> source once supplied */}
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? 'Pause campus video preview' : 'Play campus video preview'}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <PlayPill label={playing ? 'Playing…' : 'Play Campus Video'} />
              </span>
            </button>

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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
