import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const core = [
  'Curriculum designed and mapped by MIT.',
  'Faculty trained by MIT.',
  '3-week immersion at MIT Boston.',
  'Degree from SEU with MIT academic collaboration.',
  'Career advantage powered by the MIT accent.',
]

const extras = [
  'European Master’s taught in English at SEU, Tbilisi.',
  'Martin Trust Center for MIT Entrepreneurship framework built into how you learn.',
  'Ultra-modern AC hostels exclusively for Indian students, with Indian food.',
  'Legally work up to 20 hours per week while studying.',
  'Cost of living in Tbilisi: approximately $300–400 per month.',
  'Hostel starts at about $190 per month, Indian food included.',
]

export default function USPSection() {
  return (
    <section id="highlights" className="py-24 bg-primary scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-accent-soft uppercase tracking-wide">Program Highlights</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-secondary text-balance">
            Here's Exactly What That Gets You
          </h2>
          <p className="mt-4 text-secondary/60 leading-relaxed">
            Now that you've seen the proof, here's what's actually included in the SEU x MIT
            collaboration — no fine print, no vague promises.
          </p>
        </Reveal>

        {/* core points — the first thing revealed */}
        <Stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8" stagger={0.1}>
          {core.map((c, i) => (
            <StaggerItem key={c}>
              <div className="border-t border-white/15 pt-5">
                <span className="font-display text-accent-soft/50 text-2xl">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-secondary/90 leading-relaxed mt-3">{c}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* divider that only draws in once the user scrolls further */}
        <Reveal direction="fade" amount={0.6} className="mt-24 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-semibold text-accent-soft uppercase tracking-wide whitespace-nowrap">
            Plus, for Indian students
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </Reveal>

        {/* extras — revealed after the divider, as its own scroll moment */}
        <Reveal direction="up" amount={0.4} className="mt-10">
          <h3 className="font-display text-2xl sm:text-3xl text-secondary text-balance max-w-lg">
            Additional SEU Advantages For Indian Students
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
