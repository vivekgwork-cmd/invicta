import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { img } from '../site/links.js'
import { EASE, Emph, Ink, Underline } from './ui.jsx'

const contents = [
  ['Why consider AP?', '#why', 'II'],
  ['Find your subject', '#subjects', 'IV'],
  ['Inside each exam', '#shelf', 'V'],
  ['The May 2027 window', '#calendar', 'VIII'],
]

const lines = ['Go further in the', 'subjects that', '*matter to you.*']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const spin = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <section id="cover" ref={ref} className="relative px-5 sm:px-6 lg:px-12 pt-8 pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-3 border-y-2 border-obsidian-950 py-2.5 text-[11px] uppercase tracking-[0.3em] text-obsidian-950"
        >
          <span>The Invicta Journal · Advanced Placement</span>
          <span className="hidden sm:inline font-display italic normal-case tracking-normal text-sm">Exam window, May 2027</span>
          <span>AP Exam Preparation</span>
        </motion.div>

        <h1 className="mt-10 lg:mt-14 font-display font-medium text-obsidian-950 tracking-tight leading-[0.95] text-[3rem] sm:text-7xl lg:text-[7.5rem]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                <Emph text={l} />
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <p className="text-lg text-obsidian-950/75 leading-relaxed first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:text-emerald-800">
              Explore college-level learning while you’re still in school. With Invicta’s AP preparation, build deeper subject knowledge,
              practise exam skills and connect your academic interests to your university plans.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Ink href="#talk-to-expert">Talk to an AP Expert</Ink>
              <Underline href="#subjects">Explore AP Subjects</Underline>
            </div>
          </motion.div>

          <div className="lg:col-span-4 order-1 lg:order-2 relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }}
              transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
              className="relative aspect-[3/4] rounded-t-full overflow-hidden bg-[#e8dfcd] max-w-sm mx-auto"
            >
              <motion.img style={{ y: imgY }} src={img('study-abroad-hero.jpg')} alt="A student studying with economics and research textbooks" className="absolute inset-0 w-full h-[118%] object-cover -top-[9%]" />
            </motion.div>
            <motion.div style={{ rotate: spin }} className="absolute -top-6 right-2 sm:right-8 lg:-right-6 w-28 h-28" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
                <defs>
                  <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
                </defs>
                <circle cx="50" cy="50" r="49" fill="#065f46" />
                <text fill="#fbf8f1" fontSize="10.5" letterSpacing="2.4" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">
                  <textPath href="#badge-circle">COLLEGE-LEVEL · IN SCHOOL · </textPath>
                </text>
                <text x="50" y="58" textAnchor="middle" fill="#fbf8f1" fontSize="24" fontStyle="italic" fontFamily="Source Serif 4, serif">
                  AP
                </text>
              </svg>
            </motion.div>
          </div>

          <motion.nav
            aria-label="In this issue"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="lg:col-span-4 order-3"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-obsidian-950/60 mb-3">In this issue</p>
            <ul className="border-t border-obsidian-950/20">
              {contents.map(([t, href, n]) => (
                <li key={t} className="border-b border-obsidian-950/20">
                  <a href={href} className="group flex items-baseline gap-4 py-3.5">
                    <span className="font-display italic text-emerald-800 w-8">{n}</span>
                    <span className="flex-1 font-display text-xl text-obsidian-950 group-hover:translate-x-1.5 transition-transform">{t}</span>
                    <span className="text-obsidian-950/40 group-hover:text-emerald-800 transition-colors">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>
    </section>
  )
}
