import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'

const groups = [
  { title: 'Banking & Finance', companies: ['HSBC', 'Deutsche Bank', 'Citi', 'Visa', 'Mastercard', 'Bank of Georgia', 'TBC Bank', 'ProCredit Bank'] },
  { title: 'Technology', companies: ['Microsoft', 'Amazon', 'Google', 'AWS', 'IBM', 'Cisco', 'SAP', 'Oracle', 'EPAM', 'Booking.com'] },
  { title: 'FinTech', companies: ['Binance', 'Wise', 'PayPal', 'Revolut', 'Tether'] },
  { title: 'Consulting', companies: ['EY', 'Deloitte', 'PwC', 'KPMG', 'Accenture', 'Grant Thornton', 'BDO'] },
  { title: 'Global Business', companies: ['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Coca-Cola', 'Unilever', 'P&G', 'Nestle', 'Marriott'] },
  { title: 'International Organisations', companies: ['World Bank', 'IFC', 'UNDP', 'ADB', 'EBRD'] },
]

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="py-20 bg-secondary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-primary/10 pb-10">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">The Payoff</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
              From Tbilisi To The World's <span className="text-gold-deep">Best Companies</span>
            </h2>
            <p className="mt-4 text-slate leading-relaxed max-w-xl">
              This is where the pathway leads. Graduates of the SEU Consortium build careers in
              banking, technology, consulting, fintech, and global business across Europe, the
              Gulf, India, and beyond.
            </p>
          </Reveal>
          <Reveal direction="left" className="shrink-0 text-right">
            <div className="font-display text-4xl text-accent">
              <CountUp to={84} suffix="%" />
            </div>
            <div className="text-xs text-slate mt-1 max-w-[10rem]">graduates employed within 4 months</div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {groups.map((g) => (
            <StaggerItem key={g.title}>
              <div>
                <h3 className="font-display text-xl text-primary mb-3">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.companies.map((c) => (
                    <span key={c} className="text-xs font-medium text-primary/75 bg-primary/[0.06] border border-primary/10 rounded-full px-3 py-1.5">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 text-xs text-slate/70">
          Representative employers of SEU Consortium alumni. Company names belong to their
          respective owners. Salary and placement figures are SEU-reported illustrative ranges,
          not a personal guarantee.
        </p>
      </div>
    </section>
  )
}
