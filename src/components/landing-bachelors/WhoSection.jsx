import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { Check } from '../shared/Glyphs.jsx'

const audience = [
  'Students who have completed 12th grade with the minimum required marks.',
  'Students looking for an affordable European Bachelor’s with MIT academic collaboration.',
  'Families who want Indian food hostels and dedicated end-to-end support.',
  'Students interested in global careers across Europe, the Gulf, India, and beyond.',
  'Students who want part-time work options while studying in Georgia.',
]

export default function WhoSection() {
  return (
    <section id="who" className="py-20 bg-secondary scroll-mt-24 border-t border-primary/8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <Reveal direction="left" className="lg:sticky lg:top-28">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Who This Is For</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">
            This Path Is <span className="text-gold-deep">Built For</span>
          </h2>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 gap-4" stagger={0.08}>
          {audience.map((a, i) => (
            <StaggerItem key={a} direction="up" className={i === audience.length - 1 ? 'sm:col-span-2' : ''}>
              <div className="h-full flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_16px_32px_-18px_rgba(26,43,94,0.3)]">
                <Check className="bg-accent/10 text-accent shrink-0 w-6 h-6" />
                <p className="text-sm text-primary/80 leading-relaxed">{a}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
