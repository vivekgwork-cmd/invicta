import { Arrow } from '../shared/Glyphs.jsx'
import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const programs = [
  'MBA — Master of Business Administration',
  'M.Sc. Artificial Intelligence',
  'M.Sc. Data Science',
  'M.Sc. Financial Technology (FinTech)',
  'M.Sc. Business Analysis',
  'Executive MBA (1 Year)',
]

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-secondary-dim/50 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Programs &amp; Fees</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">Pick Your Master's</h2>
          <p className="mt-4 text-slate leading-relaxed">
            Six programs run on the same SEU x MIT pathway. Here's the full list, and exactly
            what it costs after your scholarship.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <Stagger className="grid">
            {programs.map((p, i) => (
              <StaggerItem key={p}>
                <div className="flex items-baseline gap-4 border-b border-primary/10 py-4">
                  <span className="font-display text-accent/40 text-base w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-primary">{p}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal direction="right" className="rounded-3xl bg-primary text-secondary p-8">
            <h3 className="font-display text-xl">Fee Structure</h3>
            <p className="text-xs text-secondary/50 mt-1">2-year Master's tracks · scholarship math</p>

            <div className="mt-7 flex items-center justify-between text-sm">
              <span className="text-secondary/70">Tuition Fee</span>
              <span className="font-display text-lg">$27,700</span>
            </div>
            <div className="text-center my-1 text-secondary/40 text-sm">−</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary/70">Scholarship</span>
              <span className="font-display text-lg text-accent-soft">$12,800</span>
            </div>
            <div className="text-center my-2 text-secondary/40 text-sm">=</div>
            <div className="flex items-center justify-between rounded-xl bg-accent/15 border border-accent/30 px-4 py-4">
              <span className="font-semibold text-sm">Final Fee (USD)</span>
              <span className="font-display text-2xl text-white">$14,900</span>
            </div>
            <p className="text-[11px] text-secondary/40 mt-4 leading-relaxed">
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
