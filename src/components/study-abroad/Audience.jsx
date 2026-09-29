import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../shared/Glyphs.jsx'
import { EASE, Heading, Rise } from '../site/motion.jsx'
import { btn, size } from '../site/ui.js'

const audiences = {
  student: {
    tab: 'For Students',
    title: 'A clear plan, not guesswork',
    body: 'You have big goals. You get direct access to a 1:1 mentor, honest essay brainstorming and a step-by-step plan for your dream college.',
    points: [
      'WhatsApp and weekly video access to your mentor',
      'Candid essay feedback that keeps your own voice',
      'Guidance on extracurricular projects with real impact',
    ],
    cta: 'Book a Student Strategy Session',
    href: '#evaluation-form',
    stat: { value: '1:1', label: 'Dedicated mentor' },
  },
  parent: {
    tab: 'For Parents',
    title: 'Full visibility, no surprises',
    body: 'You want your child guided by people who know what top universities look for, with regular progress reports and clear milestones.',
    points: [
      'Updates every two weeks on deadlines, drafts and submissions',
      'A clear view of scholarship value and total costs',
      'Honest guidance, never false guarantees',
    ],
    cta: 'Schedule a Call With an Advisor',
    href: '#mentor-consult',
    stat: { value: '2 wks', label: 'Between progress reports' },
  },
}

export default function Audience() {
  const [active, setActive] = useState('student')
  const a = audiences[active]

  return (
    <section id="audience" className="w-full py-24 lg:py-32 px-5 sm:px-6 lg:px-12">
      <Rise className="max-w-6xl mx-auto">
        <Heading
          title="Built for ambitious students and their parents."
          body="Admissions are a family effort. Here is how we support both sides."
          className="mb-10"
        />

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200" role="tablist">
            {Object.entries(audiences).map(([key, item]) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={`relative px-6 sm:px-8 py-2.5 rounded-xl font-outfit font-bold text-sm transition-colors ${
                  active === key ? 'text-white' : 'text-slate-600 hover:text-obsidian-950'
                }`}
              >
                {active === key && (
                  <motion.span
                    layoutId="audience-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-obsidian-950 shadow-md"
                  />
                )}
                <span className="relative">{item.tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-white rounded-3xl border border-slate-200 shadow-card-elevated overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
                <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-obsidian-950 mb-4 tracking-tight">{a.title}</h3>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">{a.body}</p>
                <ul className="border-t border-slate-100 mb-8">
                  {a.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: EASE }}
                      className="flex items-center gap-3 py-3.5 border-b border-slate-100 text-sm font-semibold text-slate-800"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cobalt-600 shrink-0" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <a href={a.href} className={`${btn.dark} ${size.sm}`}>
                  {a.cta}
                  <Arrow />
                </a>
              </div>
              <div className="lg:col-span-5 relative bg-obsidian-950 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-end min-h-[220px] overflow-hidden">
                <div className="absolute inset-0 site-grid-dots opacity-25" />
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-cobalt-600/25 rounded-full blur-[80px]" />
                <motion.p
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  className="relative font-outfit font-extrabold text-6xl sm:text-7xl text-champagne-400 tracking-tight origin-bottom-left"
                >
                  {a.stat.value}
                </motion.p>
                <p className="relative font-grotesk text-xs uppercase tracking-wider text-slate-400 mt-3">{a.stat.label}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Rise>
    </section>
  )
}
