import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import useActiveSection from '../../lib/useActiveSection.js'

// Design language for the AP page: an academic journal. Cream paper, serif display type, ink
// rules, chapter numerals and italic emphasis. Motion is calm: lines unmask, rules draw, ink circles.

export const EASE = [0.65, 0, 0.35, 1]
export const sec = 'relative px-5 sm:px-6 lg:px-12 py-24 lg:py-32 scroll-mt-20'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII']
export const roman = (n) => ROMAN[n - 1] ?? String(n)

// "*text*" in a string becomes italic emerald emphasis.
export function Emph({ text }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') ? (
      <em key={i} className="italic text-emerald-800 font-normal">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export function Chapter({ n, children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-display italic text-lg text-emerald-800">Ch. {roman(n)}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE }}
        className="h-px flex-1 max-w-[120px] bg-obsidian-950/40 origin-left"
      />
      <span className="text-[11px] uppercase tracking-[0.3em] text-obsidian-950/60 font-semibold">{children}</span>
    </div>
  )
}

export function Headline({ text, className = '', as: Tag = 'h2', size = 'text-4xl sm:text-5xl lg:text-6xl' }) {
  return (
    <Tag className={`font-display font-medium tracking-tight leading-[1.04] text-obsidian-950 text-balance ${size} ${className}`}>
      <motion.span
        className="block"
        initial={{ clipPath: 'inset(0 0 100% 0)', y: 30 }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Emph text={text} />
      </motion.span>
    </Tag>
  )
}

export function Lede({ children, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
      className={`text-lg text-obsidian-950/70 leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  )
}

// Ink pill with a circled arrow that rolls on hover.
export function Ink({ href, children, light = false, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-colors ${
        light ? 'bg-[#fbf8f1] text-obsidian-950 hover:bg-white' : 'bg-obsidian-950 text-[#fbf8f1] hover:bg-emerald-900'
      } ${className}`}
      {...rest}
    >
      {children}
      <span className={`w-9 h-9 rounded-full grid place-items-center overflow-hidden ${light ? 'bg-obsidian-950 text-white' : 'bg-[#fbf8f1] text-obsidian-950'}`}>
        <span className="block transition-transform duration-500 group-hover:-rotate-45">→</span>
      </span>
    </a>
  )
}

// Text link whose underline draws on hover.
export function Underline({ href, children, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative inline-flex items-center gap-1.5 font-display italic text-lg text-obsidian-950"
    >
      {children}
      {external && <span aria-hidden="true">↗</span>}
      <span className="absolute left-0 -bottom-0.5 h-px w-full bg-obsidian-950/30" />
      <span className="absolute left-0 -bottom-0.5 h-px w-full bg-emerald-800 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
    </a>
  )
}

// Bottom-left "contents" widget: a reading-progress ring with the current chapter numeral that
// opens the table of contents.
export function ChapterNav({ items }) {
  const active = useActiveSection(items.map((i) => i.id), 200)
  const idx = Math.max(0, items.findIndex((i) => i.id === active))
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div className="fixed left-4 sm:left-6 bottom-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Contents"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 left-0 w-72 rounded-2xl bg-[#fbf8f1] border border-obsidian-950/15 shadow-2xl p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-obsidian-950/50 mb-2 px-2">Contents</p>
            <ol>
              {items.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-3 px-2 py-1.5 rounded-lg text-sm hover:bg-obsidian-950/5 ${i === idx ? 'text-emerald-800 font-semibold' : 'text-obsidian-950/80'}`}
                  >
                    <span className="font-display italic w-8">{roman(i + 1)}</span>
                    <span className="flex-1">{it.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-3 rounded-full bg-[#fbf8f1]/95 backdrop-blur border border-obsidian-950/15 shadow-lg pl-1.5 pr-4 py-1.5"
      >
        <span className="relative w-10 h-10">
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" className="text-obsidian-950/10" strokeWidth="2.5" />
            <motion.circle cx="20" cy="20" r="17" fill="none" stroke="#065f46" strokeWidth="2.5" style={{ pathLength: ring }} />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display italic text-sm text-obsidian-950">{roman(idx + 1)}</span>
        </span>
        <span className="hidden sm:block text-left">
          <span className="block text-[9px] uppercase tracking-[0.25em] text-obsidian-950/50">Now reading</span>
          <span className="block text-sm font-semibold text-obsidian-950">{items[idx].label}</span>
        </span>
      </button>
    </div>
  )
}
