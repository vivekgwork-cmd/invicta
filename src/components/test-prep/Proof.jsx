import { Accordion, Card, Heading, Marquee, Rise } from '../site/motion.jsx'

const testimonials = [
  {
    quote: "I was stuck at 1330 on the SAT for 6 months using prep books. Invicta's diagnostic showed my geometry pacing was eating 15 minutes of the test. I jumped to 1540 in 7 weeks.",
    name: 'Marcus Vance',
    school: "Stanford University, Class of '28",
    result: '+210 SAT',
  },
  {
    quote: 'The GRE diagnostic got rid of my anxiety around probability questions within two sessions. My mentor explained traps I had fallen into ten times before.',
    name: 'Elena Rostova',
    school: 'Columbia, MS Data Science',
    result: '+16 GRE',
  },
  {
    quote: 'Scoring 725 on the GMAT Focus opened doors I thought were closed. The study plan felt like having a coach with me the whole way.',
    name: 'Devon Chen',
    school: "Wharton MBA, Class of '26",
    result: '725 GMAT',
    gold: true,
  },
]

const universities = ['Harvard', 'Stanford', 'MIT', 'Oxford', 'Cambridge', 'Yale', 'Princeton', 'Columbia', 'Wharton', 'Duke']

const faqs = [
  {
    q: 'How does the free diagnostic work?',
    a: 'It is a 45-minute test that measures your speed, pressure points and gaps in understanding. Instead of just a score, you get a breakdown of which skills will win you the most points.',
  },
  {
    q: 'Who are the 1-on-1 mentors?',
    a: 'Every Invicta mentor has a verified 99th-percentile score on their exam and a degree from a top research university. They are also trained to review your results with you and plan deliberate practice.',
  },
  {
    q: 'How does the score guarantee work?',
    a: 'If you follow your program schedule, finish the assigned timed sprints and still miss the minimum score increase over your diagnostic baseline, we refund your tuition or keep teaching you free until you reach it.',
  },
  {
    q: 'Do you cover the new Digital SAT and GMAT Focus formats?',
    a: 'Yes. Our practice tests copy the real exams, including adaptive modules, on-screen calculators and timers, so you prepare under the same conditions you will face on test day.',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Students who broke through their plateau."
          body="Students who got past stubborn score plateaus and into their dream universities."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              i={i}
              glow={t.gold ? 'gold' : 'cobalt'}
              className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-card-tech hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <p className={`font-outfit text-4xl font-extrabold tracking-tight mb-6 ${t.gold ? 'text-amber-500' : 'text-cobalt-600'}`}>{t.result}</p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">“{t.quote}”</p>
              </div>
              <div className="mt-8 pt-5 border-t border-slate-100">
                <p className="font-outfit text-base font-bold text-obsidian-950">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.school}</p>
              </div>
            </Card>
          ))}
        </div>
      </Rise>

      <div className="max-w-7xl mx-auto mt-20">
        <p className="text-center text-sm text-slate-500 mb-6">Our students now study at</p>
        <Marquee items={universities} itemClassName="font-outfit text-2xl sm:text-3xl font-bold text-slate-300" />
      </div>
    </section>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="bg-slate-100/70 border-y border-slate-200 py-24 lg:py-32 px-5 sm:px-6 lg:px-12 scroll-mt-20">
      <Rise className="max-w-3xl mx-auto">
        <Heading
          title="Frequently asked questions."
          body="The diagnostic, the mentors and the score guarantee, explained."
          className="mb-12"
        />
        <Accordion items={faqs} />
      </Rise>
    </section>
  )
}
