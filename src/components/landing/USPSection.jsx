import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'
import { ProofIcon } from '../shared/Glyphs.jsx'

const core = [
  { icon: 'curriculum', label: 'Curriculum', detail: 'Designed and mapped by MIT' },
  { icon: 'faculty', label: 'Faculty', detail: 'Trained by MIT' },
  { icon: 'immersion', label: 'Immersion', detail: '3 weeks at MIT Boston' },
  { icon: 'degree', label: 'Degree', detail: 'SEU with MIT collaboration' },
  { icon: 'career', label: 'Career Edge', detail: 'Powered by the MIT accent' },
]

const extras = [
  'European Master’s taught in English at SEU, Tbilisi.',
  'Martin Trust Center for MIT Entrepreneurship framework built into how you learn.',
  'Ultra-modern AC hostels exclusively for Indian students, with Indian food.',
  'Legally work up to 20 hours per week while studying.',
  'Cost of living in Tbilisi: approximately $300 to $400 per month.',
  'Hostel starts at about $190 per month, Indian food included.',
]

export default function USPSection() {
  return (
    <section id="highlights" className="py-20 bg-primary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Program Highlights</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Here's Exactly What That <span className="text-gold-soft">Gets You</span>
          </h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">
            Now that you've seen the proof, here's what's actually included in the SEU x MIT
            collaboration. No fine print, no vague promises.
          </p>
        </Reveal>

        {/* core points, badge row — after the upgrad accreditation-strip reference */}
        <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-3" stagger={0.08}>
          {core.map((c) => (
            <StaggerItem key={c.label}>
              <div className="h-full flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3.5">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-accent-soft/15 text-accent-soft shrink-0">
                  <ProofIcon name={c.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-secondary leading-tight">{c.label}</span>
                  <span className="block text-xs text-secondary/55 leading-tight mt-0.5">{c.detail}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* divider that only draws in once the user scrolls further */}
        <Reveal direction="fade" amount={0.6} className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-semibold text-accent-soft uppercase tracking-wide whitespace-nowrap">
            Plus, for Indian students
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </Reveal>

        {/* extras — revealed after the divider, as its own scroll moment */}
        <Reveal direction="up" amount={0.4} className="mt-10">
          <h3 className="font-display text-2xl sm:text-3xl text-secondary text-balance max-w-lg">
            Advantages For Indian Students
          </h3>
        </Reveal>

        <Stagger className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.09} amount={0.15}>
          {extras.map((e) => (
            <StaggerItem key={e} direction="up">
              <div className="h-full rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:bg-white/[0.07] hover:border-white/20 transition-colors">
                <p className="text-secondary/75 text-sm leading-relaxed">{e}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
