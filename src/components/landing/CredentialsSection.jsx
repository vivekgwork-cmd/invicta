import { useState } from 'react'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'

const stats = [
  { to: 84, suffix: '%', label: 'Graduates employed within 4 months', source: 'SEU Career Office', color: '#16233b' },
  { to: 3, prefix: '#', label: "Among Europe's Top Business Schools in Georgia", source: 'Regional Ranking, 2024', color: '#ff6b35' },
  { to: 1, prefix: '#', label: 'MIT-partnered Master’s program', source: 'QS World Rankings 2024', color: '#9c7a2f' },
]

const badges = ['Martin Trust Center', 'GLEEN Member', 'MIT Orbit Access']

const testimonials = [
  {
    name: 'Priya',
    tenure: 'MBA, Batch 2025',
    quote: 'The MIT-mapped curriculum made my resume stand out in every interview.',
    image: 'professional-lady.jpg',
  },
  {
    name: 'Arjun',
    tenure: 'M.Sc. Data Science, Batch 2024',
    quote: 'Tbilisi felt like home within a month. The support team handled everything.',
    image: 'indian-college-students.jpg',
  },
  {
    name: 'Sana',
    tenure: 'M.Sc. FinTech, Batch 2025',
    quote: 'I landed a fintech internship in Europe before I even graduated.',
    image: 'college-pic.jpg',
  },
]

function VideoCard({ t }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden border border-primary/8 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={`${import.meta.env.BASE_URL}images/${t.image}`} alt={`${t.name}, ${t.tenure}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/5 to-transparent" />

        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? 'Pause testimonial preview' : 'Play testimonial preview'}
          className="absolute inset-0 grid place-items-center group"
        >
          <span className="w-14 h-14 rounded-full bg-white/90 grid place-items-center group-hover:bg-white transition-colors shadow-lg">
            {playing ? (
              <span className="flex gap-1">
                <span className="w-1.5 h-4 bg-primary rounded-sm" />
                <span className="w-1.5 h-4 bg-primary rounded-sm" />
              </span>
            ) : (
              <span className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-primary ml-1" />
            )}
          </span>
        </button>

        {playing && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
            <div className="h-full bg-accent animate-[lp-video-progress_6s_linear_infinite]" />
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 text-secondary">
          <div className="font-display text-lg leading-none">{t.name}</div>
          <div className="text-[13px] text-secondary/70 mt-1">{t.tenure}</div>
        </div>
      </div>
      <p className="text-sm text-slate leading-relaxed p-4">"{t.quote}"</p>
    </div>
  )
}

export default function CredentialsSection() {
  return (
    <section className="py-20 bg-secondary-dim/50 border-t border-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">The Proof</span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
                That Pathway Isn't Just A Pitch. Here's The <span className="text-gold-deep">Evidence</span>.
              </h2>
            </Reveal>

            <Stagger className="mt-10 grid sm:grid-cols-3 gap-5">
              {stats.map((s) => (
                <StaggerItem key={s.label} direction="up">
                  <div className="h-full rounded-2xl border border-primary/8 bg-white overflow-hidden">
                    <div className="h-1" style={{ backgroundColor: s.color }} />
                    <div className="p-6">
                      <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: s.color }}>
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

            <Reveal delay={0.15} className="mt-6 rounded-2xl bg-white border border-primary/8 p-6 text-sm text-slate leading-relaxed">
              Average salary in Georgia is about <strong className="text-primary">$20,000</strong> (up to
              $55,000). In other EU countries, about <strong className="text-primary">$40,000</strong> (up
              to $85,000), framed by SEU materials as a European career average of roughly ₹40 lakhs
              per year. Treat these as illustrative SEU-reported ranges, not a personal guarantee.
            </Reveal>
          </div>

          <Reveal direction="right" className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <img src={`${import.meta.env.BASE_URL}images/MIT.jpg`} alt="MIT campus, Boston" className="w-full h-full object-cover" />
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

        <Reveal className="mt-16 max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Hear It From Them</span>
          <h3 className="font-display text-2xl sm:text-3xl mt-3 text-primary text-balance">
            Real Students. Real <span className="text-gold-deep">Results</span>.
          </h3>
        </Reveal>

        <Stagger className="mt-8 grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} direction="up">
              <VideoCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <style>{`
        @keyframes lp-video-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
