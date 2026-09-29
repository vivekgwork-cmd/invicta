import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const pathways = [
  {
    tone: 'cobalt',
    title: 'Test Preparation',
    tagline: 'SAT, GRE, GMAT and IELTS',
    body: 'Structured lessons, realistic mock tests and personal mentors who know what top universities expect.',
    points: [
      'Diagnostic mock exams with score forecasting',
      'Instructors who scored in the 99th percentile themselves',
      'Targeted drills for weak areas and pacing',
    ],
    cta: 'Explore Test Prep',
    to: ROUTES.testPrep,
  },
  {
    tone: 'gold',
    title: 'Undergraduate Programs',
    tagline: 'University applications, start to finish',
    body: 'From building your profile to choosing the right universities, winning scholarships and sorting out your visa, we guide you at every step.',
    points: [
      'Ivy League and Oxbridge application strategy',
      'Extracurriculars that set you apart',
      'Scholarship applications aimed at full funding',
    ],
    cta: 'Explore Study Abroad',
    to: ROUTES.studyAbroad,
  },
]

export default function Pathways() {
  return (
    <section id="programs" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 w-full scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          title="Two tailored pathways to global admissions."
          body="For ambitious students aiming at top universities, with profile building and score improvement under one roof."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pathways.map((p, i) => {
            const gold = p.tone === 'gold'
            return (
              <Card
                key={p.title}
                i={i}
                cols={2}
                glow={gold ? 'gold' : 'cobalt'}
                className="bg-white rounded-3xl p-7 sm:p-8 lg:p-10 border border-slate-200 shadow-card-tech hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease: EASE }}
                  className={`absolute top-0 left-0 right-0 h-1.5 origin-left bg-gradient-to-r ${
                    gold ? 'from-champagne-400 via-amber-500 to-amber-600' : 'from-cobalt-500 via-cobalt-600 to-indigo-600'
                  }`}
                />
                <div>
                  <span className="block font-grotesk text-sm font-bold text-slate-300 mb-8">0{i + 1}</span>
                  <h3 className="font-outfit font-bold text-2xl lg:text-3xl text-obsidian-950 mb-1">{p.title}</h3>
                  <p className={`text-base font-semibold mb-4 ${gold ? 'text-amber-600' : 'text-cobalt-600'}`}>{p.tagline}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.body}</p>
                  <ul className="mb-8 border-t border-slate-100">
                    {p.points.map((pt, j) => (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + j * 0.08, ease: EASE }}
                        className="flex items-center gap-3 py-3 border-b border-slate-100 text-sm text-slate-700"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${gold ? 'bg-amber-500' : 'bg-cobalt-600'}`} />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Link to={p.to} className={`${gold ? btn.gold : btn.dark} ${size.sm} w-full`}>
                  {p.cta}
                  <Arrow />
                </Link>
              </Card>
            )
          })}
        </div>
      </Rise>
    </section>
  )
}
