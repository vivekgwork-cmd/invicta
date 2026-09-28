import { useState } from 'react'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import mitCollegeBuilding from '../../../assets/MIT-college-building.jpg'

const programs = [
  {
    code: 'BS',
    title: 'Data Science & Artificial Intelligence',
    tag: 'In-demand',
    image: 'data-science.jpg',
    desc: 'Build a foundation in data, machine learning, and AI for an AI-driven economy.',
  },
  {
    code: 'BS',
    title: 'Information Technology',
    image: 'mba-ai.jpg',
    desc: 'Core computing, software, and systems skills for a global technology career.',
  },
  {
    code: 'BBA',
    title: 'Global Business Management',
    tag: 'Most popular',
    image: 'mba.jpg',
    desc: 'Management, strategy, and entrepreneurship for careers in international business.',
  },
  {
    code: 'BBA',
    title: 'Business Management & Digital Technology',
    image: 'business-analysis.jpg',
    desc: 'Where business meets technology, from digital strategy to data-led decisions.',
  },
]

export default function ProgramsSection() {
  const [active, setActive] = useState(null)

  return (
    <section id="programs" className="relative py-20 scroll-mt-24 border-t border-gold-soft/25 overflow-hidden">
      {/* One shared full-bleed photo behind the whole section — defaults to the MIT campus
          shot, crossfading to match whichever program card is hovered, per the
          innerflow.es studio-areas pattern. */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={mitCollegeBuilding}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            active === null ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {programs.map((p, i) => (
          <img
            key={p.title}
            src={`${import.meta.env.BASE_URL}images/${p.image}`}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/65 to-primary/85" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative z-10 max-w-2xl rounded-2xl border border-white/15 bg-primary/85 p-5 shadow-xl backdrop-blur-md sm:p-6">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Programs &amp; Fees</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-white text-balance drop-shadow-md">
            Our <span className="text-gold-soft">Bachelor's</span> Programs
          </h2>
          <p className="mt-4 text-white leading-relaxed drop-shadow-sm">
            Four BS and BBA programs run on the same SEU x MIT pathway. Here's the full course list,
            and exactly what it costs after your scholarship.
          </p>
        </div>

        {/* Cards are a plain overlay on top of the shared photo — hovering one swaps the
            background image above, it doesn't carry its own. */}
        <div onMouseLeave={() => setActive(null)}>
          <Stagger className="mt-12 flex flex-wrap justify-center gap-5" stagger={0.08}>
            {programs.map((p, i) => (
              <StaggerItem key={p.title} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
                <div
                  onMouseEnter={() => setActive(i)}
                  className={`lp-spin-card relative h-full min-h-[240px] rounded-2xl border backdrop-blur-md p-6 flex flex-col justify-between transition-colors duration-300 cursor-default ${
                    active === i ? 'bg-primary/80 border-accent/70' : 'bg-primary/55 border-secondary/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-sm text-secondary/70">{String(i + 1).padStart(2, '0')}</span>
                    {p.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-primary bg-accent-soft rounded-full px-2.5 py-1">
                        {p.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-soft">{p.code}</span>
                    <h3 className="mt-1 text-lg font-semibold text-secondary leading-snug text-balance">{p.title}</h3>
                    <p className="mt-2 text-[13px] text-secondary/75 leading-relaxed">{p.desc}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-secondary/55">
                      <span>3 Years</span>
                      <span aria-hidden="true">·</span>
                      <span>Tbilisi campus</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Fee Structure — a full-width bar under the grid, not a squeezed sidebar */}
        <Reveal delay={0.15} className="relative mt-6 rounded-3xl border border-gold-soft/60 bg-gradient-to-br from-white via-[#fffdf7] to-[#fff8e8] text-primary p-7 sm:p-8 shadow-[0_12px_32px_-20px_rgba(24,54,80,0.32)] overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <div className="max-w-xs">
              <h3 className="font-display text-xl">Fee Structure</h3>
              <p className="text-xs text-primary/70 mt-1.5 leading-relaxed">
                3-year Bachelor's tracks: $27,700 program fee minus $12,850 scholarship equals $14,850
                final fee (USD). Final fee in INR may vary based on the currency exchange rate at the
                time of payment.
              </p>
              <p className="text-xs text-primary/70 mt-2 leading-relaxed">
                Living costs: approx. <strong className="text-primary">$200/month</strong>,
                hostel from <strong className="text-primary">$190/month</strong> (with Indian food).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-wide text-primary/65">Program Fee</div>
                <div className="font-display text-xl mt-1 text-primary">$27,700</div>
              </div>
              <span className="text-primary/40 text-lg">−</span>
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-wide text-primary/65">Scholarship</div>
                <div className="font-display text-xl mt-1 text-accent-dark">$12,850</div>
              </div>
              <span className="text-primary/40 text-lg">=</span>
              <div className="text-center rounded-xl bg-primary px-5 py-2.5 shadow-lg shadow-primary/20">
                <div className="text-[11px] uppercase tracking-wide text-secondary/70">Final Fee (USD)</div>
                <div className="font-display text-2xl mt-1 text-gold-soft">$14,850</div>
              </div>
            </div>

            <a href="#hero-form" className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-soft px-6 py-3.5 font-semibold text-primary hover:bg-accent transition-colors whitespace-nowrap ml-auto">
              Get Your Personalized Fee Breakdown
              <Arrow />
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @property --lp-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .lp-spin-card::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(from var(--lp-angle), transparent 0%, #ff6835 12%, transparent 30%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .lp-spin-card:hover::before {
          opacity: 1;
          animation: lp-spin 2.2s linear infinite;
        }
        @keyframes lp-spin {
          to { --lp-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-spin-card:hover::before { animation: none; }
        }
      `}</style>
    </section>
  )
}
