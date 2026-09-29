import { motion, useTransform } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise, useDrawProgress } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const steps = [
  {
    title: 'Profile Evaluation',
    body: 'A close look at where you stand today: academics, scores, activities and where you can grow.',
    milestone: 'Diagnostic scorecard',
  },
  {
    title: 'University Shortlist',
    body: 'A balanced list of ambitious, realistic and safe universities matched to your major and scholarship goals.',
    milestone: '10 to 12 universities',
  },
  {
    title: 'Profile Building',
    body: 'Extracurricular depth, independent research, leadership projects and the story that ties them together.',
    milestone: 'A signature project',
    featured: true,
  },
  {
    title: 'Applications',
    body: 'Personal statement brainstorming, supplemental essay rewrites, recommendation strategy and a final review before submission.',
    milestone: 'Early & regular decision files',
  },
  {
    title: 'Scholarships',
    body: 'Applications for departmental merit awards, trustee scholarships and outside foundations to bring tuition down.',
    milestone: 'Financial aid offers',
  },
  {
    title: 'Offer and Visa',
    body: 'Guidance from the day your acceptance arrives through financial documents and mock consulate interviews.',
    milestone: 'Approved student visa',
  },
]

function Step({ step, i, progress }) {
  const t = (i + 0.5) / steps.length
  const lit = useTransform(progress, [t - 0.04, t], [0, 1])
  const bg = useTransform(lit, [0, 1], ['#ffffff', step.featured ? '#f59e0b' : '#2563eb'])
  const border = useTransform(lit, [0, 1], ['#cbd5e1', step.featured ? '#f59e0b' : '#2563eb'])
  const right = i % 2 === 1

  return (
    <div className="relative grid grid-cols-[36px_1fr] lg:grid-cols-[1fr_56px_1fr] gap-x-5 lg:gap-x-0 items-center">
      <motion.span
        style={{ backgroundColor: bg, borderColor: border }}
        className="lg:col-start-2 row-start-1 justify-self-center relative z-10 w-4 h-4 rounded-full border-2"
      />
      <motion.div
        initial={{ opacity: 0, x: right ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`row-start-1 col-start-2 ${right ? 'lg:col-start-3' : 'lg:col-start-1 lg:text-right'} rounded-2xl p-6 sm:p-7 border transition-[translate,box-shadow] duration-300 hover:-translate-y-1 ${
          step.featured
            ? 'bg-obsidian-950 border-obsidian-800 text-white shadow-2xl'
            : 'bg-white border-slate-200 shadow-card-tech hover:shadow-xl'
        }`}
      >
        <span className={`font-grotesk text-xs font-bold uppercase tracking-wider ${step.featured ? 'text-champagne-400' : 'text-cobalt-600'}`}>
          Step 0{i + 1}
        </span>
        <h4 className={`font-outfit text-xl font-bold mt-2 mb-2 ${step.featured ? 'text-white' : 'text-obsidian-950'}`}>{step.title}</h4>
        <p className={`text-sm leading-relaxed ${step.featured ? 'text-slate-300' : 'text-slate-600'}`}>{step.body}</p>
        <p className={`mt-5 pt-4 border-t font-grotesk text-xs ${step.featured ? 'border-obsidian-700 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
          Milestone:{' '}
          <span className={`font-bold ${step.featured ? 'text-champagne-400' : 'text-obsidian-950'}`}>{step.milestone}</span>
        </p>
      </motion.div>
    </div>
  )
}

export default function Roadmap() {
  const [lineRef, progress] = useDrawProgress(['start 0.6', 'end 0.6'])

  return (
    <section id="roadmap" className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-slate-100/70 border-y border-slate-200 scroll-mt-20">
      <Rise className="max-w-6xl mx-auto">
        <Heading
          title="Your path to a global university."
          body="Six clear steps, in order, so you always know what comes next."
          className="mb-16"
        />

        <div ref={lineRef} className="relative space-y-6 lg:space-y-2">
          <div className="absolute top-0 bottom-0 left-[17px] lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-slate-200">
            <motion.div style={{ scaleY: progress }} className="w-full h-full origin-top bg-gradient-to-b from-cobalt-600 via-cobalt-500 to-champagne-500" />
          </div>
          {steps.map((s, i) => (
            <Step key={s.title} step={s} i={i} progress={progress} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-16 text-center"
        >
          <a href="#evaluation-form" className={`${btn.gold} ${size.lg}`}>
            Start My Roadmap
            <Arrow />
          </a>
        </motion.div>
      </Rise>
    </section>
  )
}
