import Reveal, { Stagger, StaggerItem } from '../shared/Reveal.jsx'

const services = [
  {
    title: 'University Shortlisting',
    desc: 'We match your profile, budget, and goals with the right universities and programs abroad.',
  },
  {
    title: 'Scholarship Negotiation',
    desc: 'Our team negotiates and locks in the best possible scholarship for every applicant.',
  },
  {
    title: 'Documentation & Apostille',
    desc: 'End-to-end handling of paperwork, apostille, and ministry-level processing.',
  },
  {
    title: 'Visa & Travel Support',
    desc: 'Complete visa filing guidance plus flights, airport pickup, and settling-in support.',
  },
  {
    title: 'Dedicated Relationship Manager',
    desc: 'One point of contact who stays with you from first call to graduation day.',
  },
  {
    title: 'Post-Arrival Care',
    desc: 'Hostel booking, local SIM, bank account opening, and community integration abroad.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold text-brand uppercase tracking-wide">What We Do</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 text-ink text-balance">
            Everything Between "I Want To Study Abroad" And Landing At Your Campus
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="group h-full bg-white p-8 hover:bg-paper-dim/60 transition-colors duration-300">
                <span className="font-display text-brand/35 text-3xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-lg mt-4 text-ink">{s.title}</h3>
                <p className="text-sm text-slate mt-2.5 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
