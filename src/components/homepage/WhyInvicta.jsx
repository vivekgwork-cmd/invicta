import { Link } from 'react-router-dom'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const reasons = [
  {
    stat: '30+',
    title: 'Years of expertise',
    body: 'Decades of guiding students to top universities. Our counsellors know how to make an application stand out.',    tone: 'cobalt',
  },
  {
    stat: '100%',
    title: 'Transparency',
    body: 'No hidden fees and no surprises. A clear, structured process that keeps you informed at every stage.',    tone: 'gold',
  },
  {
    stat: 'A to Z',
    title: 'End-to-end support',
    body: 'From shortlisting universities to writing your SOP and securing your visa, one team supports you throughout.',    tone: 'cobalt',
  },
  {
    stat: 'Day 1',
    title: 'Post-arrival help',
    body: 'Our support doesn’t end with your visa. We help you settle in and find your way around your new country.',    tone: 'gold',
  },
]

export default function WhyInvicta() {
  return (
    <section id="why-invicta" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 w-full scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Stand out from the crowd with Invicta."
          action={
            <Link to={ROUTES.counselling} className={`${btn.dark} ${size.sm}`}>
              Enquire Now
              <Arrow />
            </Link>
          }
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => {
            const gold = r.tone === 'gold'
            return (
              <Card
                key={r.title}
                i={i}
                cols={4}
                glow={gold ? 'gold' : 'cobalt'}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-card-tech hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <p
                    className={`font-outfit font-extrabold text-4xl tracking-tight mb-6 transition-transform duration-500 origin-left group-hover:scale-110 ${
                      gold ? 'text-amber-500' : 'text-cobalt-600'
                    }`}
                  >
                    {r.stat}
                  </p>
                  <h4 className="font-outfit font-bold text-lg text-obsidian-950 mb-2">{r.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.body}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </Rise>
    </section>
  )
}
