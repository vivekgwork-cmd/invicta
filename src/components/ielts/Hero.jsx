import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { img } from '../site/links.js'
import { Aurora, Blur, Btn, Pill, SPRING, glass } from './ui.jsx'

const orbs = [
  { name: 'Listening', pos: 'left-[4%] -top-6', c: 'from-violet-500 to-violet-700' },
  { name: 'Reading', pos: 'right-[6%] -top-8', c: 'from-fuchsia-500 to-pink-600' },
  { name: 'Writing', pos: 'left-[10%] -bottom-7', c: 'from-amber-400 to-orange-500' },
  { name: 'Speaking', pos: 'right-[12%] -bottom-6', c: 'from-sky-400 to-indigo-500' },
]

function Wave({ bars = 64 }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex items-center justify-center gap-[3px] h-16" aria-hidden="true">
      {[...Array(bars)].map((_, i) => {
        const base = 0.25 + Math.abs(Math.sin(i * 0.45)) * 0.75
        return (
          <motion.span
            key={i}
            animate={reduce ? undefined : { scaleY: [base, base * 0.35, base] }}
            transition={{ duration: 1.1 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.08 }}
            style={{ scaleY: base }}
            className="w-[3px] h-full rounded-full bg-white/90"
          />
        )
      })}
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const radius = useTransform(scrollYProgress, [0, 1], [999, 40])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 sm:px-6 lg:px-12 pt-16 lg:pt-24 pb-28">
      <Aurora />
      <div className="relative max-w-5xl mx-auto text-center">
        <Pill>IELTS Academic Preparation</Pill>
        <Blur
          as="h1"
          animateNow
          delay={0.2}
          text="Your study abroad plans deserve *confident English.*"
          className="mt-7 font-outfit font-extrabold text-[2.6rem] sm:text-6xl lg:text-7xl tracking-tight leading-[1.04] text-violet-950"
        />
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-7 text-lg text-violet-950/65 leading-relaxed max-w-2xl mx-auto"
        >
          Prepare for IELTS Academic with a clear target and a focused plan. Invicta helps you work on Listening, Reading, Writing and Speaking
          so you can approach the test—and your next academic step—with greater confidence.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 1.1 }} className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Btn href="#talk-to-expert">Talk to an IELTS Expert</Btn>
          <Btn href="#skills" variant="glass">
            Explore IELTS Preparation
          </Btn>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 60, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-6xl mx-auto mt-16">
        <motion.div style={{ borderRadius: radius }} className="relative overflow-hidden aspect-[16/9] sm:aspect-[21/9] shadow-[0_40px_100px_-30px_rgba(91,33,182,0.55)]">
          <motion.img style={{ scale }} src={img('indian-college-students.jpg')} alt="Students abroad reviewing notes together" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/70 via-violet-900/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-4 sm:bottom-6 px-6">
            <Wave />
          </div>
        </motion.div>
        {orbs.map((o, i) => (
          <motion.div key={o.name} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...SPRING, delay: 1.3 + i * 0.12 }} className={`absolute ${o.pos} hidden sm:block`}>
            <motion.div
              animate={{ y: [0, i % 2 ? 10 : -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12 }}
              className={`rounded-full ${glass} pl-1.5 pr-4 py-1.5 flex items-center gap-2`}
            >
              <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${o.c}`} />
              <span className="text-sm font-bold text-violet-950">{o.name}</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
