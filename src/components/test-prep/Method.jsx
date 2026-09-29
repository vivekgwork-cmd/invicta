import { motion, useTransform } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Counter, EASE, Heading, Panel, Rise, useDrawProgress } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const metrics = [
  { value: '+210', label: 'Average SAT increase', note: 'Verified across full cohorts' },
  { value: '+14', label: 'Average GRE gain', note: 'Verbal and Quant combined' },
  { value: '94%', label: 'Ivy & T20 acceptance', note: 'First-choice admits secured', gold: true },
  { value: '500+', label: 'Top 1% mentors', note: 'Across 12 countries' },
]

const flawed = [
  'Hundreds of repetitive questions with no look at why you got them wrong',
  'One schedule for everyone, whatever your pace or gaps',
  'Instructors who scored well years ago, never re-certified',
]

const invicta = [
  ['Weak-spot mapping', 'finds the small set of concepts costing you the most points'],
  ['Focused sprints', 'spend your time only where your score can still move'],
  ['1-on-1 mentors', 'adjust your strategy week by week'],
]

const steps = [
  { title: 'Diagnostic baseline', body: 'A full-length adaptive test that measures your pace, stamina and the patterns behind your mistakes.' },
  { title: 'Weak-spot mapping', body: 'We break your results down concept by concept to see exactly where points are being lost.' },
  { title: '1-on-1 mentor sessions', body: 'Work with a top 1% instructor on strategy, shortcuts and the mindset for test day.', featured: true },
  { title: 'Timed practice sprints', body: 'Full sections under real exam timing and pressure, so nothing on test day feels new.' },
  { title: 'Test day and score guarantee', body: 'Walk in ready. If you complete the program and miss your target, we keep working with you.' },
]

export function Metrics() {
  return (
    <Panel id="results" className="w-full bg-obsidian-950 text-white py-20 px-5 sm:px-6 lg:px-12 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 site-grid-dots opacity-25" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[300px] bg-cobalt-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-obsidian-800">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="relative border-r border-b border-obsidian-800 p-6 sm:p-8 hover:bg-obsidian-900/70 transition-colors"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE }}
              className={`absolute top-0 left-0 h-[2px] w-full origin-left ${m.gold ? 'bg-champagne-500' : 'bg-cobalt-500'}`}
            />
            <p className="font-grotesk text-[11px] uppercase tracking-wider text-slate-400 mb-3">{m.label}</p>
            <p className={`font-outfit font-extrabold text-4xl sm:text-5xl tracking-tight ${m.gold ? 'text-champagne-400' : 'text-white'}`}>
              <Counter value={m.value} />
            </p>
            <p className="text-xs text-slate-500 mt-3">{m.note}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  )
}

export function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-12">
      <Rise className="max-w-7xl mx-auto">
        <Heading
          align="left"
          title="Studying hard is not the same as studying right."
          body="Traditional prep spends most of your hours on concepts you already know. We go straight to the ones that cost you points."
          action={
            <a href="#how-it-works" className={`${btn.light} ${size.sm}`}>
              See How It Works
              <Arrow />
            </a>
          }
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10"
          >
            <h3 className="font-outfit text-2xl font-bold text-slate-500">How most coaching centres teach</h3>
            <ul className="mt-8 border-t border-slate-200">
              {flawed.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE }}
                  className="py-4 border-b border-slate-200 text-sm text-slate-500 line-through decoration-slate-300"
                >
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative rounded-3xl bg-obsidian-950 text-white p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-cobalt-600/25 rounded-full blur-[80px]" />
            <h3 className="relative font-outfit text-2xl font-bold text-white">How Invicta prepares you</h3>
            <ul className="relative mt-8 border-t border-obsidian-700">
              {invicta.map(([b, t], i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: EASE }}
                  className="py-4 border-b border-obsidian-700 text-sm text-slate-300"
                >
                  <strong className="text-white font-semibold">{b}</strong> {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Rise>
    </section>
  )
}

function StepRow({ step, i, progress }) {
  const t = (i + 0.5) / steps.length
  const lit = useTransform(progress, [t - 0.08, t], [0, 1])
  const bg = useTransform(lit, [0, 1], ['#ffffff', step.featured ? '#f59e0b' : '#1e40af'])
  const color = useTransform(lit, [0, 1], ['#64748b', '#ffffff'])
  const border = useTransform(lit, [0, 1], ['#cbd5e1', step.featured ? '#f59e0b' : '#1e40af'])

  return (
    <div className="relative flex gap-5 sm:gap-6">
      <motion.span
        style={{ backgroundColor: bg, color, borderColor: border }}
        className="relative z-10 mt-6 w-10 h-10 rounded-full border-2 font-grotesk text-sm font-bold flex items-center justify-center shrink-0"
      >
        0{i + 1}
      </motion.span>
      <Card
        i={0}
        glow={step.featured ? 'gold' : 'cobalt'}
        className={`flex-1 rounded-2xl p-6 sm:p-7 border ${
          step.featured ? 'bg-white border-champagne-500/60 shadow-glow-gold' : 'bg-white border-slate-200 shadow-card-tech hover:shadow-xl'
        }`}
      >
        <h4 className="font-outfit text-lg font-bold text-obsidian-950">{step.title}</h4>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{step.body}</p>
      </Card>
    </div>
  )
}

export function HowItWorks() {
  const [lineRef, progress] = useDrawProgress(['start 0.65', 'end 0.65'])

  return (
    <section id="how-it-works" className="bg-slate-100/70 border-y border-slate-200 py-24 lg:py-32 px-5 sm:px-6 lg:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Heading
              align="left"
              title="How Invicta raises your score."
              body="From your first diagnostic to test day, every step is planned for steady, measurable improvement."
            />
          </div>
        </div>
        <div ref={lineRef} className="lg:col-span-7 relative space-y-4">
          <div className="absolute left-[19px] top-12 bottom-12 w-[2px] bg-slate-200">
            <motion.div style={{ scaleY: progress }} className="w-full h-full origin-top bg-gradient-to-b from-cobalt-700 to-champagne-500" />
          </div>
          {steps.map((s, i) => (
            <StepRow key={s.title} step={s} i={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  )
}
