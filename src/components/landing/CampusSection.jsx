import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const points = [
  'On-campus life at Georgian National University SEU with an active Indian student community.',
  'Indian food hostels with AC and student amenities.',
  'Modern campus infrastructure, including high-tech lab environments.',
  'Part-time work legally allowed up to 20 hours per week.',
  'Typical living cost about $300–400 per month.',
  'A safe, affordable, modern European capital city for international students.',
]

export default function CampusSection() {
  return (
    <section id="campus" className="py-24 bg-primary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Life In Tbilisi</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">Once You Land, Here's Life</h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">Georgia becomes home for two years. Here's what that actually looks like day to day.</p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          <Reveal direction="left" className="rounded-3xl overflow-hidden aspect-[16/11] lg:row-span-2">
            <img src="/images/Tbilisi.jpg" alt="Tbilisi Old Town at night" className="w-full h-full object-cover" />
          </Reveal>
          <Reveal direction="right" className="rounded-3xl overflow-hidden aspect-[16/9]">
            <img src="/images/SEU.jpg" alt="SEU campus building" className="w-full h-full object-cover" />
          </Reveal>
          <Reveal direction="right" delay={0.1} className="rounded-3xl overflow-hidden aspect-[16/9]">
            <img src="/images/indian-college-students.jpg" alt="Indian students abroad" className="w-full h-full object-cover" />
          </Reveal>
        </div>

        <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {points.map((p, i) => (
            <StaggerItem key={p}>
              <div className="h-full bg-primary p-6">
                <span className="font-display text-accent-soft/50 text-lg">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm text-secondary/70 leading-relaxed mt-3">{p}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
