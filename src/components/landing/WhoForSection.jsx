import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { Check } from '../shared/Glyphs.jsx'

const items = [
  'Students who completed graduation with the minimum required marks.',
  'Students looking for an affordable European Master’s with MIT academic collaboration.',
  'Families who want Indian food hostels and dedicated end-to-end support.',
  'Students interested in global careers across Europe, the Gulf, India, and beyond.',
  'Students who want part-time work options while studying in Georgia.',
]

export default function WhoForSection() {
  return (
    <section className="py-20 bg-secondary-dim/50 border-t border-primary/8">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Is This For You?</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-primary text-balance">Before You Go Further, <span className="text-gold-deep">Check Yourself Off</span></h2>
          <p className="mt-4 text-slate leading-relaxed">This path was built for a specific kind of student. See how many apply to you.</p>
        </Reveal>

        <Stagger className="mt-12">
          {items.map((t) => (
            <StaggerItem key={t}>
              <div className="flex items-center gap-5 border-b border-primary/10 py-5">
                <Check className="bg-accent/10 text-accent" />
                <p className="text-primary/80 leading-relaxed">{t}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
