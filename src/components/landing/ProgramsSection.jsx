import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const programs = [
  { code: 'MBA', title: 'Master of Business Administration', tag: 'Most popular' },
  { code: 'MSC-AI', title: 'M.Sc. Artificial Intelligence', tag: 'In-demand' },
  { code: 'MSC-DS', title: 'M.Sc. Data Science', tag: 'In-demand' },
  { code: 'MSC-FT', title: 'M.Sc. Financial Technology (FinTech)' },
  { code: 'MSC-BA', title: 'M.Sc. Business Analysis' },
  { code: 'EMBA', title: 'Executive MBA', tag: '1 Year' },
]

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-20 bg-secondary scroll-mt-24 border-t border-primary/8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Programs &amp; Fees</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            Pick Your <span className="text-gold-deep">Master's</span>
          </h2>
          <p className="mt-4 text-slate leading-relaxed">
            Six programs run on the same SEU x MIT pathway. Here's the full course list, and exactly
            what it costs after your scholarship.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          <Stagger className="grid sm:grid-cols-2 gap-4">
            {programs.map((p) => (
              <StaggerItem key={p.code}>
                <div className="group h-full rounded-2xl border border-primary/10 bg-white p-5 hover:border-accent/40 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center justify-center min-w-11 h-11 px-2.5 rounded-xl bg-primary/[0.06] font-display text-sm text-primary whitespace-nowrap group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      {p.code}
                    </span>
                    {p.tag && (
                      <span className="text-[12px] font-semibold uppercase tracking-wide text-gold-deep bg-gold/10 rounded-full px-2.5 py-1">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-primary leading-snug">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate">
                    <span>2 Year Master's</span>
                    <span aria-hidden="true">·</span>
                    <span>Tbilisi campus</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="right" className="rounded-3xl bg-primary text-secondary p-8">
            <h3 className="font-display text-xl">Fee Structure</h3>
            <p className="text-xs text-secondary/50 mt-1">2-year Master's tracks, scholarship math</p>

            <div className="mt-7 flex items-center justify-between text-sm">
              <span className="text-secondary/70">Tuition Fee</span>
              <span className="font-display text-lg">$27,700</span>
            </div>
            <div className="text-center my-1 text-secondary/40 text-sm">−</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary/70">Scholarship</span>
              <span className="font-display text-lg text-gold-soft">$12,800</span>
            </div>
            <div className="text-center my-2 text-secondary/40 text-sm">=</div>
            <div className="flex items-center justify-between rounded-xl bg-accent/15 border border-accent/30 px-4 py-4">
              <span className="font-semibold text-sm">Final Fee (USD)</span>
              <span className="font-display text-2xl text-white">$14,900</span>
            </div>
            <p className="text-[13px] text-secondary/40 mt-4 leading-relaxed">
              Final fee in INR may vary with the exchange rate at time of payment. SEU materials
              also frame total investment within about ₹15 lakhs for the full program context.
            </p>

            <a href="#apply" className="group mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent-soft px-6 py-3.5 font-semibold text-primary hover:bg-accent transition-colors">
              Get Your Personalized Fee Breakdown
              <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
