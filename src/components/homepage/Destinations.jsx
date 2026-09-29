import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Counter, EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const destinations = [
  { code: 'US', name: 'United States', unis: 'Ivy League, Stanford, MIT and the top 30 national universities', rate: 96.8 },
  { code: 'UK', name: 'United Kingdom', unis: 'Russell Group, Oxford, Cambridge, Imperial and UCL', rate: 98.2 },
  { code: 'CA', name: 'Canada', unis: 'Toronto, McGill, UBC, Waterloo and the U15', rate: 99.1 },
  { code: 'AU', name: 'Australia', unis: 'Melbourne, Sydney, UNSW, ANU and the Group of Eight', rate: 99.4 },
  { code: 'EU', name: 'Europe', unis: 'ETH Zurich, TU Munich, INSEAD, Bocconi and LERU', rate: 97.5 },
]

export default function Destinations() {
  return (
    <section id="destinations" className="bg-slate-100/70 py-24 lg:py-32 px-5 sm:px-6 lg:px-12 border-y border-slate-200 scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Get noticed by top universities across the globe"
          body="Where you are doesn’t limit where you can go. With a strong application and the right strategy, the admission letter from your dream college is within reach."
          action={
            <Link to={ROUTES.studyAbroad} className={`${btn.dark} ${size.sm} whitespace-nowrap`}>
              Explore Our Programs
              <Arrow />
            </Link>
          }
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((d, i) => (
            <Card
              key={d.name}
              i={i}
              cols={5}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card-tech hover:border-cobalt-500/60 hover:shadow-glow-cobalt flex flex-col justify-between"
            >
              <div>
                <span className="block font-grotesk font-bold text-3xl text-slate-200 mb-4">{d.code}</span>
                <h4 className="font-outfit font-bold text-lg text-obsidian-950 mb-1">{d.name}</h4>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">{d.unis}</p>
              </div>
              <div>
                <div className="flex items-center justify-between font-grotesk text-xs mb-2">
                  <span className="text-slate-500">Acceptance rate</span>
                  <span className="font-bold text-cobalt-600">
                    <Counter value={`${d.rate}%`} />
                  </span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: d.rate / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.08, ease: EASE }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-cobalt-600 to-cobalt-400"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Rise>
    </section>
  )
}
