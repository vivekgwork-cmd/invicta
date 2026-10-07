import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { img } from '../site/links.js'
import { Btn, Lead, SPRING, glass, sec } from './ui.jsx'

/* ------------------------------------------------ At a glance: floating bubbles */

const bubbles = [
  { k: 'Standard exam fee in India', v: '₹19,000*', size: 'w-56 h-56 sm:w-64 sm:h-64', c: 'from-violet-500/20 to-fuchsia-400/20', big: true },
  { k: 'Maximum band', v: '9', size: 'w-44 h-44 sm:w-48 sm:h-48', c: 'from-amber-300/30 to-pink-300/20', big: true },
  { k: 'Test duration', v: 'Approximately 2 hours 45 minutes', size: 'w-52 h-52 sm:w-56 sm:h-56', c: 'from-sky-300/30 to-violet-300/20' },
  { k: 'Skills assessed', v: 'Listening, Reading, Writing and Speaking', size: 'w-56 h-56 sm:w-60 sm:h-60', c: 'from-fuchsia-300/30 to-violet-300/20' },
]

export function Glance() {
  const reduce = useReducedMotion()
  return (
    <section id="glance" className="relative px-5 sm:px-6 lg:px-12 py-16 scroll-mt-20">
      <p className="text-center text-sm font-semibold text-violet-700">IELTS Academic at a glance</p>
      <div className="mt-8 max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        {bubbles.map((b, i) => (
          <motion.div
            key={b.k}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: i * 0.1 }}
            className={i % 2 ? 'sm:mt-16' : ''}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, i % 2 ? 12 : -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              className={`${b.size} rounded-full ${glass} bg-gradient-to-br ${b.c} flex flex-col items-center justify-center text-center p-7`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-700/80">{b.k}</p>
              <p className={`mt-2 font-outfit font-extrabold text-violet-950 ${b.big ? 'text-5xl' : 'text-lg leading-snug'}`}>{b.v}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-violet-950/55 max-w-2xl mx-auto">
        *Confirm the current fee when booking through IDP IELTS India. Other test types and services may have different fees. Coaching fees are separate.
      </p>
    </section>
  )
}

/* ------------------------------------------------ Overview: rotating word ring */

export function Overview() {
  return (
    <section id="overview" className={sec}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative mx-auto w-72 h-72 sm:w-[26rem] sm:h-[26rem]">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" aria-hidden="true">
            <defs>
              <path id="ring-path" d="M100 100 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0" />
            </defs>
            <text fontSize="9.5" letterSpacing="3.2" fontWeight="700" fill="#6d28d9" fontFamily="Outfit, sans-serif">
              <textPath href="#ring-path">UNDERGRADUATE · POSTGRADUATE · DOCTORAL · PROFESSIONAL REGISTRATION ·</textPath>
            </text>
          </svg>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={SPRING}
            className="absolute inset-[14%] rounded-full overflow-hidden shadow-[0_30px_80px_-20px_rgba(91,33,182,0.5)]"
          >
            <img src={img('get-started-section.jpg')} alt="A student holding academic writing books outside a university" className="w-full h-full object-cover" />
          </motion.div>
        </div>
        <div>
          <Lead pill="The test" title="What is *IELTS Academic?*" body="The International English Language Testing System, or IELTS, assesses your ability to communicate in English." />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...SPRING, delay: 0.3 }} className={`mt-8 rounded-[28px] ${glass} p-7 space-y-4 text-violet-950/75 leading-relaxed`}>
            <p>
              IELTS Academic is designed for higher education and certain professional registration purposes. For students planning undergraduate, postgraduate or
              doctoral study, it can help demonstrate the English skills needed in an academic environment.
            </p>
            <p>
              It tests how you understand spoken and written information, explain ideas in writing and communicate with an examiner. Check the exact test and score
              requirements of your chosen institutions before booking.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Why: drag carousel */

const flags = [
  ['us', 'U.S.'],
  ['uk', 'UK'],
  ['ca', 'Canada'],
  ['au', 'Australia'],
  ['eu', 'Europe'],
]

const reasons = [
  { title: 'Designed for academic study', body: 'Practise the reading, writing, listening and speaking skills you will use in lectures, assignments and university conversations.', emoji: '🎓' },
  { title: 'Widely recognised', body: 'IELTS is accepted by many institutions across destinations including the U.S., UK, Canada, Australia, New Zealand and Europe. Acceptance and minimum scores depend on the university and programme.', emoji: '🌍', flags: true },
  { title: 'A clear score for every skill', body: 'Your results include four section bands and an overall band. This helps you understand your strengths and the areas that need further work.', emoji: '📊' },
  { title: 'A conversation with an examiner', body: 'The Speaking test assesses your communication through an interview, giving you the opportunity to explain your ideas and respond naturally.', emoji: '💬' },
  { title: 'Prompt results for computer testing', body: 'IELTS on computer results are generally available within 1–5 days. Allow time for score reporting and your receiving institution’s requirements when planning applications.', emoji: '⚡' },
]

export function Why() {
  const track = useRef(null)
  const [limit, setLimit] = useState(0)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setLimit(Math.max(0, el.scrollWidth - el.parentElement.offsetWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section id="why" className={`${sec} overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Lead pill="Why IELTS" title="Why choose *IELTS Academic?*" />
          <Btn href="#talk-to-expert" variant="glass" className="shrink-0">
            Plan My IELTS Preparation
          </Btn>
        </div>
        <p className="mt-8 text-xs font-semibold text-violet-700/70">← Drag to explore →</p>
        <div className="mt-4 cursor-grab active:cursor-grabbing">
          <motion.div ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} dragElastic={0.1} className="flex gap-5 w-max pb-4">
            {reasons.map((r, i) => (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className={`select-none w-[290px] sm:w-[360px] min-h-[340px] rounded-[32px] p-8 flex flex-col ${r.flags ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-[0_30px_60px_-20px_rgba(124,58,237,0.7)]' : `${glass}`}`}
              >
                <span className={`w-14 h-14 rounded-2xl grid place-items-center text-2xl ${r.flags ? 'bg-white/20' : 'bg-violet-100'}`}>{r.emoji}</span>
                <h3 className={`mt-8 font-outfit font-bold text-2xl ${r.flags ? 'text-white' : 'text-violet-950'}`}>{r.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${r.flags ? 'text-white/85' : 'text-violet-950/65'}`}>{r.body}</p>
                {r.flags && (
                  <div className="mt-auto pt-6 flex -space-x-2">
                    {flags.map(([c, n]) => (
                      <img key={c} src={img(`flags/${c}.svg`)} alt={n} title={n} draggable="false" className="w-9 h-9 rounded-full object-cover ring-2 ring-white" />
                    ))}
                    <span className="w-9 h-9 rounded-full ring-2 ring-white bg-white/25 grid place-items-center text-[10px] font-bold" title="New Zealand">NZ</span>
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
