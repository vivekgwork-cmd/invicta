import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

const stats = [
  { to: 84, suffix: '%', label: 'Graduates employed within 4 months', source: 'SEU Career Office', color: '#16233b' },
  { to: 3, prefix: '#', label: "Among Europe's Top Business Schools in Georgia", source: 'Regional Ranking, 2024', color: '#ff6b35' },
  { to: 1, prefix: '#', label: 'MIT-partnered Master’s program', source: 'QS World Rankings 2024', color: '#9c7a2f' },
]

const badges = ['Martin Trust Center', 'GLEEN Member', 'MIT Orbit Access']

export default function CredentialsSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative z-10 py-20 bg-secondary-dim/50 border-t border-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">The Proof</span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
                Your Global Degree, With The <span className="text-gold-deep">MIT Advantage</span>
              </h2>
            </Reveal>

            <Stagger className="mt-10 grid sm:grid-cols-3 gap-5">
              {stats.map((s) => (
                <StaggerItem key={s.label} direction="up">
                  <div
                    className="h-full rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: `${s.color}0F`, border: `1px solid ${s.color}33` }}
                  >
                    <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: s.color }}>
                      {s.source}
                    </span>
                    <div className="font-display text-4xl mt-3" style={{ color: s.color }}>
                      <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <p className="text-xs text-slate mt-3 leading-relaxed">{s.label}</p>
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

            <div className="absolute bottom-0 inset-x-0 translate-y-0 opacity-100 group-hover:-translate-y-1 transition-transform duration-300 text-secondary bg-gradient-to-t from-primary/95 to-transparent px-6 pt-10 pb-6">
              <p className="text-sm leading-relaxed text-secondary/90 border-l-4 border-accent pl-3">
                SEU partners with the <strong>Martin Trust Center for MIT Entrepreneurship</strong>,
                giving students access to MIT's global innovation network.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
