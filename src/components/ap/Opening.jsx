import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { img } from '../site/links.js'
import { Chapter, EASE, Headline, Ink, Lede, sec } from './ui.jsx'

/* ------------------------------------------------ At a glance: newspaper fact box */

const facts = [
  ['Maximum score', '5', true],
  ['Main exam window', 'May each year'],
  ['Subjects', 'Separate exams for individual subjects'],
  ['Exam fees', 'Vary by test centre'],
]

export function Glance() {
  return (
    <section className="px-5 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto border-y-2 border-obsidian-950">
        <p className="py-2 text-center text-[11px] uppercase tracking-[0.35em] text-obsidian-950 border-b border-obsidian-950/30">AP exams at a glance</p>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {facts.map(([k, v, big], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={`relative px-5 sm:px-7 py-7 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 === 1 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} border-obsidian-950/30`}
            >
              <dt className="text-[10px] uppercase tracking-[0.3em] text-obsidian-950/60">{k}</dt>
              <dd className={`mt-3 font-display text-obsidian-950 ${big ? 'text-7xl leading-none' : 'text-2xl leading-snug italic'}`}>{v}</dd>
            </motion.div>
          ))}
        </dl>
        <p className="py-3 border-t border-obsidian-950/30 text-xs text-obsidian-950/60 font-display italic">
          Fees are charged per exam. Confirm the total payable, registration deadline and any additional charges with your school or authorised test centre.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Overview: drop cap + pull quote */

export function Overview() {
  return (
    <section id="overview" className={sec}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Chapter n={1}>The programme</Chapter>
          <Headline className="mt-6" text="What are *Advanced Placement* exams?" />
        </div>
        <div className="lg:col-span-7 lg:pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-obsidian-950/75 leading-relaxed">
          <Lede className="text-base! first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8] first-letter:text-emerald-800">
            Advanced Placement, or AP, is a College Board programme offering college-level courses and exams to school students. Each exam
            assesses a specific subject, allowing you to demonstrate knowledge beyond your regular school curriculum.
          </Lede>
          <Lede className="text-base!">
            Universities decide how they use AP courses and scores in admissions, credit and placement.
          </Lede>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-2 relative border-l-4 border-emerald-800 pl-6 sm:pl-10 py-2"
          >
            <span aria-hidden="true" className="absolute -top-10 left-4 font-display text-[8rem] leading-none text-emerald-800/15">“</span>
            <p className="relative font-display italic text-2xl sm:text-3xl text-obsidian-950 leading-snug">
              Whether you’re exploring{' '}
              {['engineering', 'economics', 'computer science', 'the humanities'].map((w, i, a) => (
                <span key={w}>
                  <span className="relative inline-block">
                    {w}
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute left-0 -bottom-1 w-full h-2 text-amber-500" aria-hidden="true">
                      <motion.path
                        d="M2 6 Q 30 1, 50 5 T 98 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.25 }}
                      />
                    </svg>
                  </span>
                  {i < a.length - 2 ? ', ' : i === a.length - 2 ? ' or ' : ''}
                </span>
              ))}
              , AP can help you investigate a subject before choosing your degree.
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Why AP: swipeable deck of index cards */

const reasons = [
  { title: 'Show academic ambition', body: 'Challenging coursework can give universities more context about your academic interests and readiness. Strong AP results may support your application where the institution considers them.' },
  { title: 'Explore a future major', body: 'Enjoy mathematics? Curious about economics? Interested in coding? AP lets you experience the demands of a subject before committing to it at university.' },
  { title: 'Build university study skills', body: 'Develop analytical thinking, independent study, time management and clear communication through demanding subject work.' },
  { title: 'Explore credit and placement opportunities', body: 'Some universities award credit or let you move beyond introductory courses for qualifying scores. The required score and the benefit differ by institution and subject.' },
  { title: 'Create more room in your degree', body: 'Where AP credit counts towards your degree, it may create space for electives or advanced study. Any savings in time or tuition depend on your university’s rules and degree requirements.' },
  { title: 'Challenge yourself with a purpose', body: 'Take on a subject because it fits your interests and goals. A manageable combination of relevant exams is more useful than a long list without a clear reason.' },
]

export function Why() {
  const [order, setOrder] = useState(reasons.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])

  return (
    <section id="why" className={`${sec} bg-emerald-900 text-[#fbf8f1] overflow-hidden`}>
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fbf8f1_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="font-display italic text-lg text-amber-300">Ch. II</span>
            <span className="h-px w-24 bg-[#fbf8f1]/40" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/70 font-semibold">Why it matters</span>
          </div>
          <h2 className="mt-6 font-display font-medium text-5xl sm:text-6xl tracking-tight leading-[1.02]">
            Why consider <em className="text-amber-300">AP?</em>
          </h2>
          <p className="mt-6 text-[#fbf8f1]/70 text-lg leading-relaxed max-w-md">Six reasons, one card at a time. Swipe the top card aside or use the arrows.</p>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={prev} aria-label="Previous reason" className="w-12 h-12 rounded-full border border-[#fbf8f1]/30 hover:bg-[#fbf8f1] hover:text-emerald-900 transition-colors">←</button>
            <button onClick={next} aria-label="Next reason" className="w-12 h-12 rounded-full border border-[#fbf8f1]/30 hover:bg-[#fbf8f1] hover:text-emerald-900 transition-colors">→</button>
            <span className="ml-3 font-display italic text-xl">
              {order[0] + 1} <span className="text-[#fbf8f1]/50">/ {reasons.length}</span>
            </span>
          </div>
          <div className="mt-10">
            <Ink href="#subjects" light>Find the Right AP Subjects for Me</Ink>
          </div>
        </div>

        <div className="lg:col-span-7 relative h-[420px] sm:h-[440px]">
          {order
            .slice(0, 4)
            .reverse()
            .map((idx) => {
              const depth = order.indexOf(idx)
              const r = reasons[idx]
              const top = depth === 0
              return (
                <motion.article
                  key={idx}
                  drag={top ? 'x' : false}
                  dragSnapToOrigin
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 110) next()
                  }}
                  animate={{ y: depth * 18, scale: 1 - depth * 0.05, rotate: depth === 0 ? 0 : (depth % 2 ? 3 : -3) * depth * 0.6, opacity: 1 - depth * 0.18 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  whileDrag={{ rotate: 6, scale: 1.02 }}
                  className={`absolute inset-x-0 sm:inset-x-8 top-0 mx-auto max-w-lg h-[360px] rounded-md bg-[#fbf8f1] text-obsidian-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden ${top ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ zIndex: 10 - depth }}
                >
                  <div className="absolute inset-0 [background-image:repeating-linear-gradient(transparent,transparent_31px,rgba(6,95,70,0.15)_31px,rgba(6,95,70,0.15)_32px)] [background-position:0_64px]" />
                  <div className="absolute left-12 inset-y-0 w-px bg-rose-400/50" />
                  <div className="relative h-full pl-16 pr-8 py-8 flex flex-col">
                    <span className="font-display italic text-emerald-800 text-lg">No. {idx + 1}</span>
                    <h3 className="mt-6 font-display text-3xl leading-tight">{r.title}</h3>
                    <p className="mt-4 text-[15px] leading-8 text-obsidian-950/75">{r.body}</p>
                  </div>
                </motion.article>
              )
            })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ Approach: a table of contents */

const approach = [
  { title: 'Subject-focused teaching', body: 'Work through the concepts and skills your chosen AP exam assesses, with attention to both understanding and application.' },
  { title: 'Personalised preparation', body: 'Identify stronger topics and areas that need more work. Use that starting point to build a focused study plan.' },
  { title: 'Flexible learning', body: 'Discuss weekend classes, intensive preparation and individual support to find a format that fits your schedule.' },
  { title: 'Practice that reflects the exam', body: 'Prepare for relevant multiple-choice and free-response tasks. Learn to explain your reasoning, organise written work and manage time.' },
  { title: 'Feedback and progress review', body: 'Use practice results to identify gaps, revisit concepts and refine your approach before the next assessment.' },
  { title: 'Guidance beyond exam day', body: 'Understand how your subject choices and scores fit into your undergraduate application and potential credit or placement options.' },
]

export function Approach() {
  const [open, setOpen] = useState(0)
  return (
    <section id="approach" className={sec}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Chapter n={3}>How we prepare you</Chapter>
            <Headline className="mt-6" text="AP preparation built around *your goals*" />
            <Lede className="mt-6">
              Invicta brings subject learning, exam practice and academic planning together. Your preparation should account for your current
              foundation, school commitments and intended university pathway.
            </Lede>
            <figure className="mt-8 hidden lg:block">
              <div className="aspect-[4/3] overflow-hidden rounded-sm grayscale-[30%] sepia-[15%]">
                <img src={img('indian-college-students.jpg')} alt="Students reviewing notes together" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-2 font-display italic text-sm text-obsidian-950/60">Fig. 1 — Study plans that fit around school.</figcaption>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.35em] text-obsidian-950/60 mb-4">Contents</p>
          <ol className="border-t-2 border-obsidian-950">
            {approach.map((a, i) => {
              const on = open === i
              return (
                <li key={a.title} className="border-b border-obsidian-950/20">
                  <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="group w-full flex items-baseline gap-4 py-5 text-left">
                    <span className="font-display italic text-emerald-800 w-10 shrink-0">§{i + 1}</span>
                    <span className={`font-display text-2xl sm:text-3xl transition-colors ${on ? 'text-emerald-800' : 'text-obsidian-950 group-hover:text-emerald-800'}`}>{a.title}</span>
                    <span className="flex-1 border-b-2 border-dotted border-obsidian-950/25 translate-y-[-6px] hidden sm:block" />
                    <span className={`shrink-0 transition-transform duration-300 ${on ? 'rotate-90 text-emerald-800' : 'text-obsidian-950/40'}`} aria-hidden="true">→</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden pl-14 pr-10 text-obsidian-950/70 leading-relaxed"
                      >
                        <span className="block pb-6">{a.body}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ol>
          <div className="mt-10">
            <Ink href="#talk-to-expert">Discuss My AP Preparation</Ink>
          </div>
        </div>
      </div>
    </section>
  )
}
