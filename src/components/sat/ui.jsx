import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import useActiveSection from '../../lib/useActiveSection.js'

// Design language for the SAT page: a dark "digital exam" interface. Monospace labels, decoding
// headings, glowing cobalt, and controls that react to the cursor.

export const EASE = [0.22, 1, 0.36, 1]
export const sec = 'relative px-5 sm:px-6 lg:px-12 py-24 lg:py-36 scroll-mt-20'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>'

// Text that decodes from random glyphs into place the first time it scrolls into view.
export function Scramble({ text, className = '', delay = 0, speed = 28 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || reduce) return
    let frame = 0
    let id
    const timer = setTimeout(() => {
      setStarted(true)
      id = setInterval(() => {
        frame += 1
        const revealed = Math.floor(frame / 2)
        setOut(
          text
            .split('')
            .map((c, i) => (i < revealed || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (revealed >= text.length) clearInterval(id)
      }, speed)
    }, delay * 1000)
    return () => {
      clearTimeout(timer)
      clearInterval(id)
    }
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} aria-label={text} className={className} style={{ opacity: reduce || started ? 1 : 0 }}>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}

// `[02] FORMAT_` label with a blinking caret.
export function Tag({ index, children, className = '' }) {
  return (
    <p className={`font-grotesk text-[11px] sm:text-xs uppercase tracking-[0.25em] text-cobalt-400 flex items-center gap-3 ${className}`}>
      {index && <span className="text-slate-500">[{index}]</span>}
      <Scramble text={children} />
      <span className="w-2 h-3.5 bg-cobalt-400 animate-pulse" aria-hidden="true" />
    </p>
  )
}

export function Title({ index, tag, title, body, className = '', center = false }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      <Tag index={index} className={center ? 'justify-center' : ''}>
        {tag}
      </Tag>
      <h2 className="mt-5 font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-white text-balance">
        <Scramble text={title} delay={0.15} speed={18} />
      </h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className={`mt-5 text-base sm:text-lg text-slate-400 leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}
        >
          {body}
        </motion.p>
      )}
    </div>
  )
}

// Button that leans toward the cursor.
export function Magnetic({ children, href, variant = 'primary', className = '', ...rest }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  const styles = {
    primary: 'bg-cobalt-500 text-white shadow-[0_0_40px_-8px_rgba(59,130,246,0.8)] hover:bg-cobalt-400',
    ghost: 'border border-white/20 text-white hover:bg-white/10',
    gold: 'bg-champagne-400 text-obsidian-950 hover:bg-champagne-500',
  }
  const El = href ? motion.a : motion.button
  return (
    <El
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.3)
        y.set((e.clientY - r.top - r.height / 2) * 0.4)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-grotesk text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </El>
  )
}

export function Chevron() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      {'>'}
    </span>
  )
}

// Grid lines lit by a soft spotlight that follows the cursor across the section.
export function SpotlightGrid({ className = '' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -999, y: -999 })
  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])
  const mask = `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, black, transparent 75%)`
  return (
    <div ref={ref} aria-hidden="true" className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 site-grid-lines opacity-40" />
      <div
        className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(96,165,250,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.35)_1px,transparent_1px)]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  )
}

// Fixed vertical section index on the right edge (desktop).
export function DotNav({ items }) {
  const active = useActiveSection(items.map((i) => i.id), 200)
  return (
    <nav aria-label="Page sections" className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {items.map((it, i) => {
        const on = active === it.id
        return (
          <a key={it.id} href={`#${it.id}`} className="group flex items-center justify-end gap-3" aria-current={on ? 'true' : undefined}>
            <span
              className={`font-grotesk text-[10px] uppercase tracking-widest transition-all duration-300 ${
                on ? 'opacity-100 text-cobalt-300' : 'opacity-0 -translate-x-1 text-slate-400 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {it.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 ${on ? 'w-6 h-1.5 bg-cobalt-400' : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400'}`} />
          </a>
        )
      })}
    </nav>
  )
}
