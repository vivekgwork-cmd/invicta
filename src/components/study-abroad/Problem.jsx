import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Counter, EASE, Heading, Panel } from '../site/motion.jsx'

const factors = [
  { id: 'story', label: 'A clear story that stays with the committee' },
  { id: 'depth', label: 'Depth over a long list of activities' },
  { id: 'fit', label: 'The right fit for each university' },
]

// What the committee makes of "your" file with 0–3 of the factors in place.
const verdicts = ['Blends in', 'Noticed', 'Shortlisted', 'Admitted']

const COLS = 16
const ROWS = 4
const YOU = COLS + 10 // second row, eleventh column

export default function Problem() {
  const [on, setOn] = useState([false, false, false])
  const [touched, setTouched] = useState(false)
  const poolRef = useRef(null)
  const inView = useInView(poolRef, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const level = on.filter(Boolean).length

  // Plays the story once when the pool comes into view, unless the visitor gets there first.
  useEffect(() => {
    if (!inView || touched) return
    if (reduce) {
      setOn([true, true, true])
      return
    }
    const timers = factors.map((_, i) =>
      setTimeout(() => setOn((prev) => prev.map((v, j) => (j === i ? true : v))), 900 + i * 1100),
    )
    return () => timers.forEach(clearTimeout)
  }, [inView, touched, reduce])

  const toggle = (i) => {
    setTouched(true)
    setOn((prev) => prev.map((v, j) => (j === i ? !v : v)))
  }

  return (
    <Panel className="w-full py-16 lg:py-12 lg:min-h-[calc(100svh-5rem)] lg:flex lg:items-center px-5 sm:px-6 lg:px-12 bg-obsidian-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 site-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[400px] bg-champagne-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <Heading
            dark
            align="left"
            title="Good grades alone don't get you in anymore."
            body="Top universities see thousands of applicants with near-perfect GPAs and 1500+ SAT scores. The few who get in have a memorable story, a clear area of strength and an application plan that starts well before the early deadline."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-7 flex items-end gap-5"
          >
            <span className="font-outfit text-5xl sm:text-6xl font-extrabold text-champagne-400 tracking-tight leading-none">
              <Counter value="95%" />
            </span>
            <p className="text-sm text-slate-300 leading-snug max-w-[15rem] pb-1">
              of rejected Ivy League applicants had qualifying scores
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="relative mt-7 pl-6"
          >
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-champagne-400 to-amber-600 rounded-full"
            />
            <h4 className="font-outfit font-bold text-lg text-champagne-400 mb-2">Where Invicta comes in</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We help you build all three: your strength, your story and your scholarship positioning. We also handle
              the paperwork, so you can focus on becoming the student admissions committees want.
            </p>
          </motion.div>
        </div>

        {/* The applicant pool: identical files, one of which is yours. */}
        <motion.div
          ref={poolRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-6 rounded-3xl bg-obsidian-900/80 border border-obsidian-700 p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-slate-500">One admissions season</p>
              <p className="font-outfit font-bold text-xl text-white mt-1">60,000+ files on the desk</p>
            </div>
            <div className="text-right">
              <p className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-slate-500">Your file</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={level}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`font-outfit font-bold text-xl mt-1 ${level === 3 ? 'text-champagne-400' : level > 0 ? 'text-white' : 'text-slate-400'}`}
                >
                  {verdicts[level]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative grid gap-1 sm:gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }} aria-hidden="true">
            {Array.from({ length: COLS * ROWS }, (_, i) =>
              i === YOU ? (
                <YouFile key={i} level={level} />
              ) : (
                <motion.div
                  key={i}
                  animate={{ opacity: [1, 0.55, 0.3, 0.12][level], scale: level === 3 ? 0.92 : 1 }}
                  transition={{ duration: 0.6, delay: ((i * 7) % 13) * 0.02, ease: EASE }}
                  className="aspect-[3/4] rounded-[5px] bg-obsidian-800 border border-obsidian-700 p-[18%] flex flex-col gap-[12%]"
                >
                  <span className="h-[8%] w-full rounded-full bg-slate-700" />
                  <span className="h-[8%] w-2/3 rounded-full bg-slate-700" />
                </motion.div>
              ),
            )}
          </div>
          <p className="mt-3 text-xs text-slate-500">Every grey file: a 4.0 GPA and a 1500+ SAT. Switch on what sets yours apart.</p>

          <div className="mt-4 pt-4 border-t border-obsidian-700 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {factors.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="switch"
                aria-checked={on[i]}
                onClick={() => toggle(i)}
                className={`group flex sm:flex-col sm:items-start items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                  on[i] ? 'border-champagne-500/50 bg-champagne-500/10' : 'border-obsidian-700 hover:border-slate-600'
                }`}
              >
                <span className={`text-[13px] leading-snug font-semibold transition-colors ${on[i] ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {f.label}
                </span>
                <span className={`relative w-11 h-6 rounded-full shrink-0 transition-colors duration-300 ${on[i] ? 'bg-champagne-500' : 'bg-obsidian-700'}`}>
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow ${on[i] ? 'right-1' : 'left-1'}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </Panel>
  )
}

// "Your" file grows, warms to gold and finally lifts out of the pile as the factors switch on.
function YouFile({ level }) {
  const scale = [1, 1.35, 1.75, 2.3][level]
  const tones = [
    'bg-obsidian-800 border-obsidian-700',
    'bg-obsidian-700 border-cobalt-400',
    'bg-cobalt-600 border-cobalt-400',
    'bg-gradient-to-br from-champagne-400 to-amber-600 border-champagne-300',
  ]

  return (
    <div className="relative z-10">
      <motion.div
        animate={{ scale, y: level === 3 ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className={`aspect-[3/4] rounded-[5px] border p-[18%] flex flex-col gap-[12%] transition-colors duration-500 ${tones[level]} ${
          level === 3 ? 'shadow-[0_0_30px_rgba(245,158,11,0.55)]' : level > 0 ? 'shadow-[0_0_18px_rgba(37,99,235,0.45)]' : ''
        }`}
      >
        <span className={`h-[8%] w-full rounded-full ${level > 1 ? 'bg-white/70' : 'bg-slate-700'}`} />
        <span className={`h-[8%] w-2/3 rounded-full ${level > 1 ? 'bg-white/50' : 'bg-slate-700'}`} />
      </motion.div>

      <AnimatePresence>
        {level > 0 && (
          <motion.span
            initial={{ opacity: 0, y: 6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 6, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className={`absolute left-1/2 ${level === 3 ? '-top-14' : '-top-9'} whitespace-nowrap rounded-full px-2.5 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider shadow-lg ${
              level === 3 ? 'bg-champagne-400 text-obsidian-950' : 'bg-white text-obsidian-950'
            }`}
          >
            {level === 3 ? 'You · Admitted' : 'You'}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
