import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const features = [
  {
    tone: 'cobalt',
    title: 'Ivy League & Oxbridge admissions strategy',
    body: 'We match you with the right universities and shape your story, essays and application so admissions officers remember you.',  },
  {
    tone: 'gold',
    title: 'Portfolio & extracurricular focus',
    body: 'We help you build real depth in one area instead of a long list of generic activities, so your application carries weight.',  },
  {
    tone: 'cobalt',
    title: 'Scholarship applications',
    body: 'A plan built around merit grants and full funding: university awards, national foundations and scholarship essays that win.',  },
  {
    tone: 'gold',
    title: 'Profile building to final application',
    body: 'From your starting point to submitting on Common App, UCAS and direct portals, a dedicated mentor works with you on every deadline.',  },
]

export default function Suite() {
  return (
    <section className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          title="One team. Every step of your admissions journey."
          body="We take the guesswork out of global admissions with personal mentorship, a clear application story and steady follow-through."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const gold = f.tone === 'gold'
            return (
              <Card
                key={f.title}
                i={i}
                glow={gold ? 'gold' : 'cobalt'}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card-tech hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <span className={`block font-grotesk text-sm font-bold mb-10 ${gold ? 'text-amber-600' : 'text-cobalt-600'}`}>0{i + 1}</span>
                <div>
                  <h3 className="font-outfit text-xl font-bold text-obsidian-950 mb-3 leading-snug">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
                </div>
              </Card>
            )
          })}

          <Card
            i={1}
            glow="darkGold"
            className="bg-obsidian-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-obsidian-800 md:col-span-2 flex flex-col md:flex-row gap-8 md:items-end justify-between overflow-hidden"
          >
            <div>
              <span className="block font-grotesk text-sm font-bold mb-10 text-champagne-400">05</span>
              <h3 className="font-outfit text-2xl font-bold text-white mb-3 leading-snug">Visa guidance &amp; consulate interviews</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                We handle the immigration documents, I-20 and CAS checks, and run mock consulate interviews, so nothing
                slows you down once your offer arrives.
              </p>
            </div>
            <a href="#evaluation-form" className={`${btn.gold} ${size.sm} shrink-0`}>
              Check Eligibility
              <Arrow />
            </a>
          </Card>
        </div>
      </Rise>
    </section>
  )
}
