import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

// Undergraduate and postgraduate students see their own pair of pathways. Both CTAs lead to a
// lead form: test prep to the diagnostic booking form, admissions to the counselling form.
const LEVELS = [
  { id: 'ug', label: 'Undergraduate (UG)' },
  { id: 'pg', label: 'Postgraduate (PG)' },
]

const pathways = {
  ug: [
    {
      tone: 'cobalt',
      title: 'Test Preparation',
      tagline: 'SAT, IELTS and AP (Advanced Placement) Exams',
      body: 'Structured lessons, realistic mock tests and personal mentors who know how to ensure top scores.',
      points: [
        'Instructors who scored in the 99th percentile themselves',
        'Comprehensive study material for each test',
        'Diagnostic mock tests with score forecasting',
        'Targeted drills for weak areas and pacing',
      ],
      cta: 'Explore Test Prep',
      to: ROUTES.testPrepForm,
    },
    {
      tone: 'gold',
      title: 'University Admissions Consultancy - UG Programs',
      tagline: 'University applications, start to finish',
      body: 'From building your profile to choosing the right universities, winning scholarships and sorting out your visa, we guide you at every step.',
      points: [
        'Ivy League and other top 50 QS-ranked university application strategy',
        'Profiles and portfolios that set you apart',
        'Tailor-made essays crafted for every individual',
        'Scholarship applications aimed at full funding',
      ],
      cta: 'Explore Study Abroad',
      to: ROUTES.counselling,
    },
  ],
  pg: [
    {
      tone: 'cobalt',
      title: 'Test Preparation',
      tagline: 'GRE, GMAT and IELTS',
      body: 'Focused coaching, full-length mock tests and personal mentors who know how to ensure top scores for graduate admissions.',
      points: [
        'Mentors with 99th-percentile scores on the exams they teach',
        'Complete study material for every section of each test',
        'Full-length diagnostic mocks with score forecasting',
        'Practice built around your weak areas, timing and strategy',
      ],
      cta: 'Explore Test Prep',
      to: ROUTES.testPrepForm,
    },
    {
      tone: 'gold',
      title: 'University Admissions Consultancy - PG Programs',
      tagline: "Master's and MBA applications, start to finish",
      body: 'From shortlisting programs that fit your career goals to scholarships, funding and your visa, we guide you at every step.',
      points: [
        'Application strategy for top 50 QS-ranked universities and business schools',
        'Profiles and CVs that showcase your academics and work experience',
        'Statements of purpose written around your own story',
        'Scholarship and funding applications to lower your costs',
      ],
      cta: 'Explore Study Abroad',
      to: ROUTES.counselling,
    },
  ],
}


function Tick({ gold }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-px grid place-items-center w-5 h-5 rounded-full shrink-0 ${
        gold ? 'bg-amber-100 text-amber-600' : 'bg-cobalt-100 text-cobalt-600'
      }`}
    >
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
    </span>
  )
}

export default function Pathways() {
  const [level, setLevel] = useState('ug')

  const toggle = (
    <div role="tablist" aria-label="Study level" className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          type="button"
          role="tab"
          aria-selected={level === l.id}
          onClick={() => setLevel(l.id)}
          className={`relative px-5 sm:px-6 py-2 rounded-full font-outfit text-sm font-semibold transition-colors ${
            level === l.id ? 'text-white' : 'text-slate-600 hover:text-obsidian-950'
          }`}
        >
          {level === l.id && (
            <motion.span
              layoutId="pathway-level"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full bg-obsidian-950"
            />
          )}
          <span className="relative">{l.label}</span>
        </button>
      ))}
    </div>
  )

  // Compact layout: tight spacing and two-column point lists keep the heading, level toggle and
  // both cards within a single laptop viewport.
  return (
    <section
      id="programs"
      className="py-16 lg:py-12 px-5 sm:px-6 lg:px-12 w-full scroll-mt-20 lg:min-h-[100svh] lg:flex lg:items-center"
    >
      <Rise className="max-w-6xl mx-auto w-full">
        <Heading
          title="Two tailored pathways to global admissions."
          body="For ambitious students aiming at top universities, with profile building and score improvement under one roof."
          className="mb-6"
        />

        <div className="mb-8 flex justify-center">{toggle}</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {pathways[level].map((p, i) => {
              const gold = p.tone === 'gold'
              return (
                <Card
                  key={p.title}
                  i={i}
                  cols={2}
                  glow={gold ? 'gold' : 'cobalt'}
                  className="bg-white rounded-3xl p-6 lg:p-7 border border-slate-200 shadow-card-tech hover:shadow-xl flex flex-col overflow-hidden"
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

                  <div className="flex items-start gap-4 mb-4">
                    <span
                      className={`grid place-items-center w-11 h-11 rounded-2xl shrink-0 font-grotesk text-sm font-bold ${
                        gold ? 'bg-amber-50 text-amber-600' : 'bg-cobalt-50 text-cobalt-600'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-outfit font-bold text-xl lg:text-2xl leading-tight text-obsidian-950">{p.title}</h3>
                      <p className={`mt-1 text-sm font-semibold ${gold ? 'text-amber-600' : 'text-cobalt-600'}`}>{p.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{p.body}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 pt-5 mb-6 border-t border-slate-100">
                    {p.points.map((pt, j) => (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.3 + j * 0.06, ease: EASE }}
                        className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-700"
                      >
                        <Tick gold={gold} />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>

                  <Link to={p.to} className={`${gold ? btn.gold : btn.dark} ${size.sm} w-full mt-auto`}>
                    {p.cta}
                    <Arrow />
                  </Link>
                </Card>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </Rise>
    </section>
  )
}
