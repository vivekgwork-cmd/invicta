import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'
import { PlayPill } from '../shared/Glyphs.jsx'

const stats = [
  { to: 2024, from: 2000, label: 'Year SEU signed its landmark agreement with MIT', source: 'SEU x MIT Agreement' },
  { to: 1, prefix: '#', label: "MIT's rank among the world's universities", source: 'World University Rankings' },
  { to: 84, suffix: '%', label: 'Graduates employed within 4 months', source: 'SEU-reported' },
]

const badges = ['Martin Trust Center', '"Raise the Bar" Network', 'Data Science & AI']

export default function CredentialsSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative z-10 rounded-t-[2rem] sm:rounded-t-[2.5rem] shadow-[0_-24px_48px_-24px_rgba(10,16,40,0.35)] py-20 bg-gradient-to-br from-[#fff7ec] via-[#fdf0e0] to-[#f9e4cc] border-t border-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">Quick Facts</span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
                The Numbers That <span className="text-gold-deep">Back Up The Claim</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-6 rounded-xl bg-accent/8 border-l-4 border-accent pl-5 pr-5 py-4">
              <p className="text-base text-primary leading-relaxed">
                In 2024, Georgian National University SEU signed a landmark agreement with the{' '}
                <span className="bg-gold-soft/70 text-primary font-semibold px-1 rounded-sm">
                  Massachusetts Institute of Technology (MIT)
                </span>
                , positioning SEU alongside the world's #1-ranked university to develop entrepreneurship
                education and the national start-up ecosystem.
              </p>
            </Reveal>

            <Stagger className="mt-8 grid sm:grid-cols-3 gap-5">
              {stats.map((s) => (
                <StaggerItem key={s.label} direction="up">
                  <div className="h-full rounded-2xl bg-white border border-primary/10 p-6 shadow-[10px_12px_0_-2px_rgba(26,43,94,0.06),16px_20px_32px_-14px_rgba(26,43,94,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_12px_0_-2px_rgba(26,43,94,0.08),20px_26px_36px_-12px_rgba(26,43,94,0.32)]">
                    <div className="font-display text-4xl text-accent">
                      <CountUp to={s.to} from={s.from} prefix={s.prefix} suffix={s.suffix} />
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
              SEU partners with the <strong className="text-primary">Martin Trust Center for MIT
              Entrepreneurship</strong>, joining MIT's <strong className="text-primary">"Raise the Bar"
              Entrepreneurship Educators Network</strong>. The agreement also centers on{' '}
              <strong className="text-primary">Data Science &amp; Artificial Intelligence</strong>, with a
              shared emphasis on preparing students for an AI-driven economy, informed by MIT's collaboration.
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
