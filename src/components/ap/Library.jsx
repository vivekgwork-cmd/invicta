import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { img } from '../site/links.js'
import { Chapter, EASE, Headline, Ink, sec } from './ui.jsx'

/* ------------------------------------------------ Subject finder: a sentence you complete */

const interests = ['anything', 'engineering', 'physical sciences', 'mathematics', 'economics', 'computer science', 'the humanities']

const subjects = [
  { name: 'AP Calculus AB', focus: 'Core calculus: limits, derivatives and integrals', group: 'calc', tags: ['engineering', 'mathematics', 'physical sciences', 'economics'] },
  { name: 'AP Calculus BC', focus: 'AB content plus further calculus topics', group: 'calc', tags: ['engineering', 'mathematics', 'physical sciences'] },
  { name: 'AP Physics C: Mechanics', focus: 'Calculus-based study of motion, forces and energy', group: 'physics', tags: ['engineering', 'physical sciences'] },
  { name: 'AP Physics C: Electricity and Magnetism', focus: 'Electric fields, circuits, magnetism and induction', group: 'physics', tags: ['engineering', 'physical sciences'] },
  { name: 'AP Microeconomics', focus: 'Decisions by individuals and firms', group: 'econ', tags: ['economics', 'the humanities'] },
  { name: 'AP Macroeconomics', focus: 'Growth, inflation, employment and economic policy', group: 'econ', tags: ['economics', 'the humanities'] },
  { name: 'AP Computer Science A', focus: 'Programming and problem-solving using Java', group: 'cs', tags: ['computer science', 'engineering', 'mathematics'] },
  { name: 'AP English Language and Composition', focus: 'Nonfiction analysis and evidence-based writing', group: 'english', tags: ['the humanities'] },
]

export function Finder({ onOpen }) {
  const [interest, setInterest] = useState('anything')
  const match = (s) => interest === 'anything' || s.tags.includes(interest)
  const sorted = [...subjects].sort((a, b) => Number(match(b)) - Number(match(a)))

  return (
    <section id="subjects" className={sec}>
      <div className="max-w-7xl mx-auto">
        <Chapter n={4}>Subject finder</Chapter>
        <Headline className="mt-6 max-w-3xl" text="Find the subject that fits *your direction*" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 font-display text-3xl sm:text-5xl leading-snug text-obsidian-950"
        >
          I’m curious about{' '}
          <span className="relative inline-block">
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              aria-label="Area of interest"
              className="appearance-none bg-transparent italic text-emerald-800 border-b-2 border-emerald-800 pr-10 cursor-pointer outline-none focus-visible:bg-emerald-800/5"
            >
              {interests.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 bottom-2 text-xl text-emerald-800">▾</span>
          </span>
          .
        </motion.p>
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.slice(1).map((x) => (
            <button key={x} onClick={() => setInterest(x)} className={`text-sm rounded-full px-3 py-1 border transition-colors ${interest === x ? 'bg-obsidian-950 text-[#fbf8f1] border-obsidian-950' : 'border-obsidian-950/20 text-obsidian-950/70 hover:border-obsidian-950/60'}`}>
              {x}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((s) => {
            const on = match(s)
            return (
              <motion.li layout key={s.name} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <button
                  onClick={() => onOpen(s.group)}
                  className={`group w-full h-full text-left p-5 border transition-all duration-500 ${
                    on ? 'bg-[#fbf8f1] border-obsidian-950 shadow-[6px_6px_0_0_#065f46] hover:shadow-[2px_2px_0_0_#065f46] hover:translate-x-1 hover:translate-y-1' : 'border-obsidian-950/15 opacity-40'
                  }`}
                >
                  <span className="block font-display text-xl leading-tight text-obsidian-950">{s.name}</span>
                  <span className="block mt-3 text-sm text-obsidian-950/65 leading-relaxed">{s.focus}</span>
                  <span className="block mt-4 font-display italic text-sm text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">Open the exam →</span>
                </button>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Shelf: spines open into a two-page spread */

const groups = {
  calc: {
    spine: 'Calculus AB & BC',
    color: 'bg-emerald-900',
    h: 'h-56',
    title: 'AP Calculus AB and BC',
    tagline: 'Build a foundation for quantitative study.',
    image: 'fintech.jpg',
    paras: [
      'AP Calculus AB introduces limits, differentiation, integration and their applications. It develops your ability to interpret mathematical relationships and solve problems using calculus.',
      'AP Calculus BC includes the AB foundation and extends into additional topics such as parametric and polar functions, further integration techniques, and sequences and series.',
      'Both can support students exploring mathematics, engineering, physical sciences and other quantitative fields. The right choice depends on your existing foundation and the time you can devote to preparation.',
    ],
    examTitle: 'Exam structure: May 2027',
    examIntro: 'The structure below applies to both AB and BC.',
    cols: ['Section', 'Questions', 'Time', 'Score weighting', 'Calculator'],
    rows: [
      ['Multiple choice — Part A', '29', '62 minutes', '50% across both parts', 'Not permitted'],
      ['Multiple choice — Part B', '13', '38 minutes', '—', 'Required'],
      ['Free response — Part A', '2', '30 minutes', '50% across both parts', 'Required'],
      ['Free response — Part B', '4', '60 minutes', '—', 'Not permitted'],
    ],
    total: ['Total', '42 multiple choice + 6 free response', '3 hours 10 minutes', '100%', 'As specified'],
    notes: ['Format: Hybrid digital. Complete multiple-choice questions in Bluebook and write free-response answers in paper booklets.'],
    cta: 'Explore Calculus Preparation',
  },
  physics: {
    spine: 'Physics C',
    color: 'bg-[#7c2d12]',
    h: 'h-64',
    title: 'AP Physics C',
    tagline: 'Understand the physics. Show the reasoning.',
    image: 'mba-ai.jpg',
    paras: [
      'Physics C consists of two separate courses and exams, both using calculus to explore physical systems.',
      'Mechanics covers motion, forces, energy, momentum, rotation and oscillations. Preparation develops mathematical reasoning and the ability to connect concepts with physical situations.',
      'Electricity and Magnetism explores electric fields, circuits, magnetic fields and electromagnetic induction.',
      'These subjects are especially relevant to students considering engineering or physical sciences. A suitable calculus foundation is important.',
    ],
    examTitle: 'Exam structure: May 2027',
    examIntro: 'Each Physics C exam follows this structure.',
    cols: ['Section', 'Questions', 'Time', 'Score weighting'],
    rows: [
      ['Multiple choice', '42', '85 minutes', '50%'],
      ['Free response', '4', '95 minutes', '50%'],
    ],
    total: ['Total', '46', '3 hours', '100%'],
    notes: [
      'Format: Hybrid digital. Multiple-choice responses are completed in Bluebook; free-response answers are handwritten.',
      'Calculators are permitted, subject to College Board rules. Preparation includes solving problems, interpreting representations and explaining experimental reasoning.',
    ],
    cta: 'Explore Physics C Preparation',
  },
  econ: {
    spine: 'Micro & Macroeconomics',
    color: 'bg-obsidian-900',
    h: 'h-60',
    title: 'AP Microeconomics and Macroeconomics',
    tagline: 'Learn to make sense of economic decisions.',
    image: 'business-analysis.jpg',
    paras: [
      'Microeconomics focuses on individuals, firms and markets. Explore supply and demand, production costs, competition, factor markets and the role of government.',
      'Macroeconomics examines the economy as a whole. Study national income, growth, unemployment, inflation, fiscal policy and monetary policy.',
      'Both develop your ability to use graphs, models and evidence to explain economic outcomes. They are separate exams, so you can plan for one or both.',
    ],
    examTitle: 'Exam structure',
    cols: ['Section', 'Questions', 'Time', 'Approximate score weighting'],
    rows: [
      ['Multiple choice', '60', '70 minutes', 'Two-thirds'],
      ['Free response', '3: one long, two short', '60 minutes, including reading time', 'One-third'],
    ],
    total: ['Total', '63', '2 hours 10 minutes', '100%'],
    notes: ['Format: Hybrid digital for both subjects. Free-response work is handwritten.'],
    cta: 'Explore Economics Preparation',
  },
  cs: {
    spine: 'Computer Science A',
    color: 'bg-[#1e3a5f]',
    h: 'h-52',
    title: 'AP Computer Science A',
    tagline: 'Turn logical thinking into working solutions.',
    image: 'data-science.jpg',
    paras: [
      'Learn to analyse, write and test Java code. Preparation covers objects and methods, selection and iteration, class creation and data collections.',
      'Develop the ability to trace what a programme does, identify errors and build solutions from a specification. The focus is on understanding how code works and communicating that understanding.',
    ],
    examTitle: 'Exam structure',
    cols: ['Section', 'Questions', 'Time', 'Score weighting'],
    rows: [
      ['Multiple choice', '42', '90 minutes', '55%'],
      ['Free response', '4', '90 minutes', '45%'],
    ],
    total: ['Total', '46', '3 hours', '100%'],
    notes: ['Format: Fully digital in Bluebook. Both multiple-choice and free-response answers are submitted digitally.'],
    cta: 'Explore Computer Science Preparation',
  },
  english: {
    spine: 'English Language',
    color: 'bg-amber-700',
    h: 'h-[15rem]',
    title: 'AP English Language and Composition',
    tagline: 'Read closely. Think critically. Write convincingly.',
    image: 'get-started-section.jpg',
    paras: [
      'Develop the skills to analyse nonfiction, understand how writers persuade and construct an evidence-based argument.',
      'Preparation covers reading comprehension, rhetorical analysis, writing revision and the use of sources. These skills carry into university essays, research and classroom discussions.',
    ],
    examTitle: 'Exam structure',
    cols: ['Section', 'Questions', 'Time', 'Score weighting'],
    rows: [
      ['Multiple choice', '45', '60 minutes', '45%'],
      ['Free response', '3 essays', '135 minutes, including reading time', '55%'],
    ],
    total: ['Total', '48', '3 hours 15 minutes', '100%'],
    notes: ['The three essays assess synthesis, rhetorical analysis and argument.', 'Format: Fully digital in Bluebook.'],
    cta: 'Explore English Language Preparation',
  },
}

export function Shelf({ active, onChange }) {
  const g = groups[active]
  return (
    <section id="shelf" className={`${sec} bg-[#ece3d2]`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <Chapter n={5}>The library</Chapter>
            <Headline className="mt-6" text="Take a subject *off the shelf*" />
          </div>
          <p className="lg:col-span-6 text-obsidian-950/70 lg:text-right">Pick a spine to open the book: what the subject covers, and how its exam is put together.</p>
        </div>

        {/* shelf */}
        <div className="mt-12 relative">
          <div role="tablist" aria-label="AP subjects" className="flex items-end justify-center gap-2 sm:gap-3 px-4 overflow-x-auto">
            {Object.entries(groups).map(([k, v]) => {
              const on = active === k
              return (
                <motion.button
                  key={k}
                  role="tab"
                  aria-selected={on}
                  onClick={() => onChange(k)}
                  animate={{ y: on ? -22 : 0 }}
                  whileHover={{ y: on ? -22 : -10, rotate: on ? 0 : -2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={`relative shrink-0 w-14 sm:w-16 ${v.h} ${v.color} rounded-t-sm text-[#fbf8f1] shadow-[inset_-6px_0_10px_rgba(0,0,0,0.25),inset_4px_0_6px_rgba(255,255,255,0.08)] ${on ? 'ring-2 ring-amber-300' : ''}`}
                >
                  <span className="absolute inset-x-0 top-3 h-px bg-amber-300/60" />
                  <span className="absolute inset-x-0 top-5 h-px bg-amber-300/60" />
                  <span className="absolute inset-x-0 bottom-5 h-px bg-amber-300/60" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="[writing-mode:vertical-rl] rotate-180 font-display text-sm sm:text-base tracking-wide whitespace-nowrap">{v.spine}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>
          <div className="h-4 bg-[#6b4f2a] rounded-sm shadow-[0_10px_20px_-6px_rgba(0,0,0,0.4)]" />
        </div>

        {/* open book */}
        <div className="mt-14 [perspective:2000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ rotateY: -25, opacity: 0, x: 40 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: 20, opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ transformOrigin: 'left center' }}
              className="grid grid-cols-1 lg:grid-cols-2 bg-[#fbf8f1] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] rounded-sm relative"
            >
              <div className="hidden lg:block absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
              {/* left page */}
              <div className="p-7 sm:p-12">
                <p className="text-[10px] uppercase tracking-[0.35em] text-obsidian-950/50">{g.spine}</p>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-obsidian-950">{g.title}</h3>
                <p className="mt-2 font-display italic text-xl text-emerald-800">{g.tagline}</p>
                <figure className="mt-6">
                  <img src={img(g.image)} alt="" className="w-full aspect-[16/9] object-cover sepia-[20%]" />
                </figure>
                <div className="mt-6 space-y-3 text-[15px] text-obsidian-950/75 leading-relaxed">
                  {g.paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              {/* right page */}
              <div className="p-7 sm:p-12 border-t lg:border-t-0 lg:border-l border-obsidian-950/10 flex flex-col">
                <h4 className="font-display text-2xl text-obsidian-950">{g.examTitle}</h4>
                {g.examIntro && <p className="mt-1 font-display italic text-obsidian-950/60">{g.examIntro}</p>}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm border-collapse min-w-[460px]">
                    <thead>
                      <tr className="border-y-2 border-obsidian-950">
                        {g.cols.map((c) => (
                          <th key={c} className="py-2 pr-3 text-left text-[10px] uppercase tracking-[0.2em] text-obsidian-950/70 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {g.rows.map((r, i) => (
                        <motion.tr key={r[0]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="border-b border-obsidian-950/15">
                          {r.map((c, j) => (
                            <td key={j} className={`py-3 pr-3 align-top ${j === 0 ? 'font-display text-base text-obsidian-950' : 'text-obsidian-950/75'}`}>
                              {c === 'Required' ? <span className="italic text-emerald-800">{c}</span> : c}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                      <tr className="border-b-2 border-obsidian-950">
                        {g.total.map((c, j) => (
                          <td key={j} className="py-3 pr-3 align-top font-semibold text-obsidian-950">{c}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="mt-6 space-y-2">
                  {g.notes.map((n, i) => (
                    <li key={n} className="text-sm text-obsidian-950/75 leading-relaxed flex gap-2">
                      <sup className="font-display italic text-emerald-800 pt-2">{i + 1}</sup>
                      {n}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Ink href="#talk-to-expert">{g.cta}</Ink>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
