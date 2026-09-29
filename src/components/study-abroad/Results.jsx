import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { Card, Counter, EASE, Heading, Panel } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'
import { ROUTES } from '../site/links.js'

const stats = [
  { value: '$43M+', label: 'Scholarships secured', gold: true },
  { value: '98.4%', label: 'Top-choice admit rate' },
  { value: '100%', label: 'Visa success record' },
  { value: '10,000+', label: 'Students placed' },
]

const testimonials = [
  {
    quote: 'Invicta turned my high school engineering projects into a clear story. A ₹2.4 Cr scholarship was something my family never thought was possible.',
    name: 'Aditya Miriyala',
    school: 'Milwaukee School of Engineering',
    result: '₹2.4 Cr ($290,000) scholarship',
  },
  {
    quote: 'My mentor gave me honest feedback on my Common App essays and showed me how to talk about my community biology work without sounding boastful.',
    name: 'Yukta Tata Koganti',
    school: 'Drexel University',
    result: '₹1.02 Cr ($125,000) scholarship',
  },
  {
    quote: 'Admits from Duke, Rice and Columbia. Invicta knows exactly what top US research universities look for in a profile.',
    name: 'Akarsh Chittineni',
    school: 'Duke University & Rice University',
    result: 'Admitted with distinction',
  },
]

export function TestPrepBanner() {
  return (
    <section className="w-full pb-24 lg:pb-32 px-5 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-cobalt-950 border border-obsidian-800 p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl"
      >
        <motion.div
          aria-hidden="true"
          animate={{ x: ['-10%', '30%', '-10%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-0 w-[500px] h-[250px] bg-cobalt-600/25 rounded-full blur-[90px] pointer-events-none"
        />
        <div className="relative max-w-2xl">
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-3 tracking-tight">
            Need a higher SAT or IELTS score first?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Our admissions program pairs with our test prep, so your score targets and university shortlist are planned
            together.
          </p>
        </div>
        <Link to={ROUTES.testPrep} className={`${btn.gold} ${size.sm} relative shrink-0`}>
          Explore Test Prep
          <Arrow />
        </Link>
      </motion.div>
    </section>
  )
}

export default function Results() {
  return (
    <Panel className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12 bg-obsidian-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-cobalt-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Heading
          dark
          title="Students we have guided."
          body="Consistent admits to the world's most selective universities, often with life-changing scholarships."
          className="mb-16"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-obsidian-800 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="border-r border-b border-obsidian-800 p-6 sm:p-8 text-center hover:bg-obsidian-900/70 transition-colors"
            >
              <div className={`font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight ${s.gold ? 'text-champagne-400' : 'text-white'}`}>
                <Counter value={s.value} />
              </div>
              <div className="text-[11px] uppercase tracking-wider font-grotesk text-slate-400 mt-3">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              i={i}
              glow="dark"
              className="bg-obsidian-900/80 p-7 sm:p-8 rounded-3xl border border-obsidian-700 hover:border-cobalt-500/40 hover:shadow-glow-cobalt flex flex-col justify-between"
            >
              <p className="text-base text-slate-300 mb-8 leading-relaxed">“{t.quote}”</p>
              <div className="pt-5 border-t border-obsidian-700">
                <h4 className="font-outfit text-base font-bold text-white">{t.name}</h4>
                <div className="text-xs text-slate-400 mt-0.5">{t.school}</div>
                <div className="text-xs text-champagne-400 font-bold mt-2 font-grotesk">{t.result}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Panel>
  )
}
