import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { img } from '../site/links.js'
import { Chevron, EASE, Magnetic, Scramble, SpotlightGrid } from './ui.jsx'

function useCountdown(start) {
  const [left, setLeft] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : start)), 1000)
    return () => clearInterval(id)
  }, [start])
  return `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`
}

function BigCounter() {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? 1600 : 400)
  useEffect(() => {
    if (reduce) return
    const c = animate(400, 1600, { duration: 2.6, delay: 0.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v / 10) * 10) })
    return () => c.stop()
  }, [reduce])
  return (
    <span
      aria-hidden="true"
      className="absolute -right-6 lg:right-0 top-8 lg:top-1/2 lg:-translate-y-1/2 font-outfit font-black text-[9rem] sm:text-[14rem] lg:text-[19rem] leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(96,165,250,0.18)] select-none tabular-nums"
    >
      {n}
    </span>
  )
}

export default function Hero() {
  const timer = useCountdown(32 * 60)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      className="relative overflow-hidden min-h-[calc(100svh-5rem)] flex items-center px-5 sm:px-6 lg:px-12 py-20"
    >
      <SpotlightGrid />
      <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-cobalt-600/25 rounded-full blur-[140px] pointer-events-none" />
      <BigCounter />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-3 rounded-full border border-cobalt-500/30 bg-cobalt-500/10 px-4 py-2 font-grotesk text-[11px] uppercase tracking-[0.25em] text-cobalt-300"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-cobalt-400 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-cobalt-400" />
            </span>
            Digital SAT Preparation
          </motion.p>

          <h1 className="mt-8 font-outfit font-extrabold text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white">
            <span className="block"><Scramble text="Your target score" speed={22} /></span>
            <span className="block"><Scramble text="starts with a" delay={0.35} speed={22} /></span>
            <span className="block bg-gradient-to-r from-cobalt-400 via-sky-300 to-champagne-400 bg-clip-text text-transparent">
              <Scramble text="better plan." delay={0.7} speed={22} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-8 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl"
          >
            Build your skills, sharpen your strategy and prepare for the digital SAT with Invicta. From personalised coaching to
            focused practice, we help you understand what to work on—and how to move forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Magnetic href="#talk-to-expert">
              Talk to a SAT Expert <Chevron />
            </Magnetic>
            <Magnetic href="#approach" variant="ghost">
              Explore the Programme
            </Magnetic>
          </motion.div>
        </div>

        {/* Exam window that tilts with the cursor */}
        <div className="lg:col-span-6 [perspective:1400px]">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          >
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative">
              <div className="rounded-2xl border border-white/10 bg-obsidian-900/90 shadow-[0_40px_120px_-20px_rgba(37,99,235,0.45)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 font-grotesk text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  </span>
                  <span className="hidden sm:inline">Section 1 · Module 1</span>
                  <span className="text-white font-bold tabular-nums">{timer}</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <img src={img('test-prep-hero.jpg')} alt="A student practising on a laptop" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 border-t border-white/10">
                  {[...Array(12)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                      className={`grid place-items-center w-6 h-6 rounded text-[10px] font-bold ${
                        i < 5 ? 'bg-cobalt-500 text-white' : i === 5 ? 'border-2 border-champagne-400 text-champagne-400' : 'border border-white/15 text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div
                style={{ translateZ: 60 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.7, ease: EASE }}
                className="absolute -left-4 sm:-left-10 bottom-20 rounded-xl border border-cobalt-400/40 bg-obsidian-950/90 backdrop-blur px-4 py-3 font-grotesk"
              >
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Score range</p>
                <p className="text-white font-bold">400 – 1600</p>
              </motion.div>
              <motion.div
                style={{ translateZ: 90 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.7, ease: EASE }}
                className="absolute -right-3 sm:-right-8 top-16 rounded-xl bg-champagne-400 text-obsidian-950 px-4 py-3 font-grotesk shadow-2xl"
              >
                <p className="text-[10px] uppercase tracking-widest opacity-70">Adaptive</p>
                <p className="font-bold">Module 1 → 2</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#glance"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-white"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-cobalt-400 to-transparent" />
      </motion.a>
    </section>
  )
}
