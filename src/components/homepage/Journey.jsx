import { Link } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise, useDrawProgress } from '../site/motion.jsx'
import { btn } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const steps = [
  {
    title: '1:1 Profile Evaluation',
    body: 'A detailed assessment of your academics, goals, test scores and preferred destinations with an expert counsellor.',
  },
  {
    title: 'University & Program Selection',
    body: 'A shortlist of programs that fit your profile, career goals and budget, so every choice is a real option.',
  },
  {
    title: 'Application Preparation',
    body: 'SOPs, essays, LORs and résumé support to build an application that shows your strengths and your story.',
  },
  {
    title: 'Interview & Visa Guidance',
    body: 'Mock interviews and step-by-step visa support. Our students see exceptionally high visa approval rates.',
  },
  {
    title: 'Pre-Departure Support',
    body: 'Housing, insurance, culture and the essentials, so you arrive ready and confident.',
  },
]

function Step({ step, i, progress }) {
  const t = (i / (steps.length - 1)) * 0.92
  const fill = useTransform(progress, [Math.max(t - 0.06, 0), t + 0.001], ['#ffffff', '#2563eb'])
  const text = useTransform(progress, [Math.max(t - 0.06, 0), t + 0.001], ['#64748b', '#ffffff'])
  const border = useTransform(progress, [Math.max(t - 0.06, 0), t + 0.001], ['#cbd5e1', '#2563eb'])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: (i % 5) * 0.08, ease: EASE }}
      className="relative flex lg:flex-col lg:items-center gap-5"
    >
      <motion.span
        style={{ backgroundColor: fill, color: text, borderColor: border }}
        className="relative z-10 w-9 h-9 rounded-full border-2 font-grotesk text-xs font-bold flex items-center justify-center shrink-0"
      >
        0{i + 1}
      </motion.span>
      <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-card-tech hover:border-cobalt-500/60 hover:-translate-y-1 transition-[translate,border-color] duration-300 lg:text-center">
        <h4 className="font-outfit font-bold text-base text-obsidian-950 mb-2">{step.title}</h4>
        <p className="text-xs text-slate-600 leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const [lineRef, progress] = useDrawProgress(['start 0.8', 'end 0.55'])

  return (
    <section id="journey" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-slate-100/70 border-t border-slate-200 scroll-mt-20">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          title="Your journey to success."
          body="Complete support through every stage of studying abroad, from your first consultation to your first day on campus."
          className="mb-16"
        />

        <div ref={lineRef} className="relative mb-20">
          <div className="hidden lg:block absolute top-[17px] left-[10%] right-[10%] h-[2px] bg-slate-200">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-cobalt-600 to-cobalt-400" />
          </div>
          <div className="lg:hidden absolute left-[17px] top-2 bottom-2 w-[2px] bg-slate-200">
            <motion.div style={{ scaleY: progress }} className="w-full h-full origin-top bg-gradient-to-b from-cobalt-600 to-cobalt-400" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} i={i} progress={progress} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border border-obsidian-800 rounded-3xl p-8 sm:p-10 lg:p-14 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-20%', '20%', '-20%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 left-1/4 w-[600px] h-[250px] bg-cobalt-600/25 rounded-full blur-[90px] pointer-events-none"
          />
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="font-outfit font-bold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
              Ready to study at your dream university?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">A free 30-minute consultation with a senior admissions advisor.</p>
            <Link to={ROUTES.counselling} className={`${btn.gold} font-outfit text-base sm:text-lg px-7 sm:px-9 py-4`}>
              Start your Study Abroad Journey
              <Arrow />
            </Link>
          </div>
        </motion.div>
      </Rise>
    </section>
  )
}
