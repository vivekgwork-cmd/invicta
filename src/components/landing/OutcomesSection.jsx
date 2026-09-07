import Reveal from '../shared/Reveal.jsx'
import CountUp from '../shared/CountUp.jsx'

// Only companies verified against the actual Simple Icons manifest make it in — no guessed
// or fake logos, and no placeholder monograms for the rest. If it's not really there, it's skipped.
const logos = [
  { name: 'HSBC', slug: 'hsbc' },
  { name: 'Deutsche Bank', slug: 'deutschebank' },
  { name: 'Visa', slug: 'visa' },
  { name: 'Mastercard', slug: 'mastercard' },
  { name: 'Google', slug: 'google' },
  { name: 'Cisco', slug: 'cisco' },
  { name: 'SAP', slug: 'sap' },
  { name: 'Booking.com', slug: 'bookingdotcom' },
  { name: 'Binance', slug: 'binance' },
  { name: 'Wise', slug: 'wise' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Revolut', slug: 'revolut' },
  { name: 'Tether', slug: 'tether' },
  { name: 'Accenture', slug: 'accenture' },
  { name: 'Emirates', slug: 'emirates' },
  { name: 'Qatar Airways', slug: 'qatarairways' },
  { name: 'Turkish Airlines', slug: 'turkishairlines' },
  { name: 'Coca-Cola', slug: 'cocacola' },
  { name: 'Unilever', slug: 'unilever' },
  { name: 'Marriott', slug: 'marriott' },
]

const row1 = logos.slice(0, 10)
const row2 = logos.slice(10, 20)

function LogoBand({ items, reverse = false }) {
  const track = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-secondary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-secondary to-transparent" />

      <div className={`lp-marquee flex w-max items-center gap-12 sm:gap-16 py-4 ${reverse ? 'lp-marquee-reverse' : ''}`}>
        {track.map((c, i) => (
          <img
            key={`${c.slug}-${i}`}
            src={`https://cdn.simpleicons.org/${c.slug}`}
            alt={c.name}
            title={c.name}
            className="h-6 sm:h-8 w-auto shrink-0 object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"
          />
        ))}
      </div>
    </div>
  )
}

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

        <Reveal className="mt-12 space-y-2">
          <LogoBand items={row1} />
          <LogoBand items={row2} reverse />
        </Reveal>

        <p className="mt-10 text-xs text-slate/70">
          Representative employers of SEU Consortium alumni. Logos and company names belong to
          their respective owners and do not imply endorsement. Salary and placement figures are
          SEU-reported illustrative ranges, not a personal guarantee.
        </p>
      </div>

      <style>{`
        @keyframes lp-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .lp-marquee {
          animation: lp-marquee-scroll 36s linear infinite;
        }
        .lp-marquee-reverse {
          animation-direction: reverse;
          animation-duration: 30s;
        }
        .lp-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-marquee { animation: none; }
        }
      `}</style>
    </section>
  )
}
