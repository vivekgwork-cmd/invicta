import { useState } from 'react'
import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const programs = [
  {
    code: 'MBA',
    title: 'Master of Business Administration',
    tag: 'Most popular',
    image: 'professional-lady.jpg',
    desc: 'Lead teams and strategy with a core business curriculum, mapped against MIT modules.',
  },
  {
    code: 'MSC-AI',
    title: 'M.Sc. Artificial Intelligence',
    tag: 'In-demand',
    image: 'MIT.jpg',
    desc: 'Build and ship real ML systems, taught alongside MIT-trained faculty.',
  },
  {
    code: 'MSC-DS',
    title: 'M.Sc. Data Science',
    tag: 'In-demand',
    image: 'college-pic.jpg',
    desc: 'Turn raw data into decisions, on a recognised European academic foundation.',
  },
  {
    code: 'MSC-FT',
    title: 'M.Sc. Financial Technology (FinTech)',
    image: 'SEU.jpg',
    desc: 'Where finance meets technology — payments, blockchain, and fintech strategy.',
  },
  {
    code: 'MSC-BA',
    title: 'M.Sc. Business Analysis',
    image: 'indian-college-students.jpg',
    desc: 'Analytics and decision science for real business problems, case by case.',
  },
  {
    code: 'EMBA',
    title: 'Executive MBA',
    tag: '1 Year',
    image: 'Tbilisi.jpg',
    desc: 'An accelerated, 1-year track built for working professionals ready to lead.',
  },
]

export default function ProgramsSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="programs" className="relative py-20 scroll-mt-24 border-t border-gold-soft/25 overflow-hidden">
      {/* One shared full-bleed photo behind the whole section — crossfades to match
          whichever program card is hovered, per the innerflow.es studio-areas pattern. */}
      <div className="absolute inset-0" aria-hidden="true">
        {programs.map((p, i) => (
          <img
            key={p.code}
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
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Programs &amp; Fees</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Pick Your <span className="text-gold-soft">Master's</span>
          </h2>
          <p className="mt-4 text-secondary/70 leading-relaxed">
            Six programs run on the same SEU x MIT pathway. Here's the full course list, and exactly
            what it costs after your scholarship.
          </p>
        </Reveal>

        {/* Cards are a plain overlay on top of the shared photo — hovering one swaps the
            background image above, it doesn't carry its own. */}
        <div onMouseLeave={() => setActive(0)}>
          <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {programs.map((p, i) => (
              <StaggerItem key={p.code}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className={`h-full min-h-[240px] rounded-2xl border backdrop-blur-md p-6 flex flex-col justify-between transition-colors duration-300 cursor-default ${
                    active === i ? 'bg-primary/60 border-accent/70' : 'bg-primary/30 border-secondary/20'
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
                      <span>2 Year Master's</span>
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
        <Reveal delay={0.15} className="mt-6 rounded-3xl bg-primary text-secondary p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 justify-between">
            <div className="max-w-xs">
              <h3 className="font-display text-xl">Fee Structure</h3>
              <p className="text-xs text-secondary/50 mt-1.5 leading-relaxed">
                2-year Master's tracks, scholarship math. Final fee in INR may vary with the
                exchange rate at time of payment.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-wide text-secondary/50">Tuition Fee</div>
                <div className="font-display text-xl mt-1">$27,700</div>
              </div>
              <span className="text-secondary/30 text-lg">−</span>
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-wide text-secondary/50">Scholarship</div>
                <div className="font-display text-xl mt-1 text-gold-soft">$12,800</div>
              </div>
              <span className="text-secondary/30 text-lg">=</span>
              <div className="text-center rounded-xl bg-accent/15 border border-accent/30 px-5 py-2.5">
                <div className="text-[11px] uppercase tracking-wide text-accent-soft">Final Fee (USD)</div>
                <div className="font-display text-2xl mt-1 text-white">$14,900</div>
              </div>
            </div>

            <a href="#hero-form" className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-soft px-6 py-3.5 font-semibold text-primary hover:bg-accent transition-colors whitespace-nowrap">
              Get Your Personalized Fee Breakdown
              <Arrow />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
