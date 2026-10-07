import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Heading, Panel, Rise } from '../site/motion.jsx'
import { btn } from '../site/ui.js'
import { ROUTES } from '../site/links.js'
import { Link } from 'react-router-dom'

const exams = [
  {
    perk: 'Top 1% tutors',
    title: 'SAT',
    body: 'Master the adaptive module format, Desmos calculator shortcuts and pacing for the Reading and Writing section.',
    rows: [['Avg. increase', '+210 points'], ['Curriculum', '32 practice modules'], ['Format', '1:1 + online platform']],
    exam: 'Digital SAT',
    page: ROUTES.sat,
  },
  {
    perk: 'Ivy network',
    title: 'GRE',
    body: 'Vocabulary in context, quantitative comparison shortcuts and a clear structure for the analytical writing task.',
    rows: [['Avg. increase', '+14 points'], ['Curriculum', '40+ timed sprints'], ['Format', 'Intensive 1:1 coaching']],
    featured: true,
    exam: 'GRE General',
  },
  {
    perk: 'M7 alumni mentors',
    title: 'GMAT',
    body: 'Master the Data Insights section, unusual problem types and critical reasoning under time pressure.',
    rows: [['Target score', '685+ (99th %ile)'], ['Curriculum', 'Data Insights focus'], ['Format', '1:1 executive prep']],
    exam: 'GMAT Focus',
  },
  {
    perk: 'Band 8.5+ faculty',
    title: 'IELTS',
    body: 'Live speaking mock interviews, precise structure for Writing Task 2 and listening practice across accents.',
    rows: [['Avg. score', 'Band 8.0+'], ['Curriculum', 'Graded speaking drills'], ['Format', 'Live 1:1 sessions']],
    exam: 'IELTS Academic',
    page: ROUTES.ielts,
  },
]

const pillars = [
  {
    title: 'Practice that adapts to you',
    body: 'Question difficulty adjusts to how quickly and accurately you answer, and to the mistakes you keep repeating.',
  },
  {
    title: 'Top 1% mentors',
    body: 'Fewer than 2% of instructor applicants pass our teaching auditions. You learn only from people who achieved top scores themselves.',
    gold: true,
  },
  {
    title: 'Focused sprints',
    body: 'Never spend an hour on a topic you have already mastered. Sprints are ordered by how many points they can win you.',
  },
  {
    title: 'Real exam conditions',
    body: 'Full-length practice tests recreate the exact interface, timing and section breaks of the real exam, so test day feels like routine practice.',
    wide: true,
    gold: true,
  },
  {
    title: 'Score guarantee',
    body: "Complete the assigned checkpoints and if you don't reach your target, we refund your tuition.",
  },
]

export function ChooseExam({ onPick }) {
  return (
    <section id="choose-exam" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Choose your exam program."
          body="Every program starts with a diagnostic and follows the scoring patterns of the real exam."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {exams.map((e, i) => (
            <Card
              key={e.title}
              i={i}
              cols={4}
              glow={e.featured ? 'dark' : 'cobalt'}
              className={`rounded-3xl p-7 flex flex-col justify-between ${
                e.featured
                  ? 'bg-obsidian-950 text-white border border-obsidian-800 shadow-2xl'
                  : 'bg-white border border-slate-200 shadow-card-tech hover:shadow-xl hover:border-cobalt-500/50'
              }`}
            >
              {e.featured && (
                <motion.span
                  initial={{ scale: 0, rotate: -8 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.6 }}
                  className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-champagne-500 to-amber-500 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider text-obsidian-950 shadow-md"
                >
                  Most popular
                </motion.span>
              )}
              <div>
                <h3 className={`font-outfit text-4xl font-extrabold tracking-tight ${e.featured ? 'text-white' : 'text-obsidian-950'}`}>
                  {e.title}
                </h3>
                <p className={`mt-1 text-sm font-semibold ${e.featured ? 'text-champagne-400' : 'text-amber-600'}`}>{e.perk}</p>
                <p className={`mt-3 text-sm leading-relaxed ${e.featured ? 'text-slate-400' : 'text-slate-600'}`}>{e.body}</p>
                <dl className={`mt-6 border-t ${e.featured ? 'border-obsidian-700' : 'border-slate-100'}`}>
                  {e.rows.map(([k, v], j) => (
                    <div key={k} className={`flex items-center justify-between py-2.5 border-b text-xs ${e.featured ? 'border-obsidian-700' : 'border-slate-100'}`}>
                      <dt className={e.featured ? 'text-slate-400' : 'text-slate-500'}>{k}</dt>
                      <dd className={`font-bold ${j === 0 ? (e.featured ? 'text-champagne-400' : 'text-cobalt-600') : e.featured ? 'text-white' : 'text-obsidian-950'}`}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <a
                href="#book-diagnostic"
                onClick={() => onPick?.(e.exam)}
                className={`${e.featured ? btn.gold : btn.dark} mt-8 w-full text-xs uppercase tracking-wider px-5 py-3.5`}
              >
                Start with {e.title}
                <Arrow />
              </a>
              {e.page && (
                <Link
                  to={e.page}
                  className={`mt-3 text-center text-xs font-semibold underline-offset-4 hover:underline ${e.featured ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  Explore the full {e.title} programme
                </Link>
              )}
            </Card>
          ))}
        </div>
      </Rise>
    </section>
  )
}

export function WhyInvicta() {
  return (
    <Panel id="why-invicta" className="bg-obsidian-950 text-white py-24 lg:py-32 px-5 sm:px-6 lg:px-12 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[500px] h-[500px] bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Heading
          dark
          title="Why Invicta outperforms standard coaching."
          body="Built on how people actually learn, detailed feedback on every test, and a team of 99th-percentile tutors."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <Card
              key={p.title}
              i={i}
              glow={p.gold ? 'darkGold' : 'dark'}
              className={`rounded-3xl border border-obsidian-700 bg-obsidian-900/80 p-8 flex flex-col justify-between min-h-[220px] hover:border-obsidian-700 ${p.wide ? 'md:col-span-2' : ''}`}
            >
              <span className={`font-grotesk text-sm font-bold ${p.gold ? 'text-champagne-400' : 'text-cobalt-400'}`}>0{i + 1}</span>
              <div className="mt-10">
                <h3 className="font-outfit text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">{p.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Panel>
  )
}
