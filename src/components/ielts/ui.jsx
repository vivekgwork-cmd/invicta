import { motion, useReducedMotion } from 'framer-motion'
import useActiveSection from '../../lib/useActiveSection.js'

// Design language for the IELTS page: soft, airy glass. Lavender aurora light, frosted panels,
// rounded pills, blur-in type and springy, sound-wave motion.

export const SPRING = { type: 'spring', stiffness: 260, damping: 24 }
export const sec = 'relative px-5 sm:px-6 lg:px-12 py-24 lg:py-32 scroll-mt-20'
export const glass = 'bg-white/55 backdrop-blur-xl border border-white/80 shadow-[0_10px_50px_-15px_rgba(91,33,182,0.25)]'

export function Aurora({ className = '' }) {
  const reduce = useReducedMotion()
  const blobs = [
    ['bg-violet-300/50', '-top-32 -left-24 w-[520px] h-[520px]', [0, 60, 0], [0, 40, 0]],
    ['bg-fuchsia-200/50', 'top-1/3 -right-32 w-[480px] h-[480px]', [0, -50, 0], [0, 60, 0]],
    ['bg-sky-200/50', 'bottom-0 left-1/3 w-[420px] h-[420px]', [0, 40, 0], [0, -40, 0]],
  ]
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobs.map(([c, pos, x, y], i) => (
        <motion.div
          key={i}
          animate={reduce ? undefined : { x, y }}
          transition={{ duration: 16 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute rounded-full blur-[90px] ${c} ${pos}`}
        />
      ))}
    </div>
  )
}

export function Pill({ children, className = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={SPRING}
      className={`inline-flex items-center gap-2.5 rounded-full ${glass} px-4 py-2 text-xs font-semibold text-violet-700 ${className}`}
    >
      <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
        {[0.5, 1, 0.7, 0.9].map((h, i) => (
          <motion.span key={i} animate={{ scaleY: [h, 1, h * 0.6, h] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }} className="w-[3px] h-full rounded-full bg-violet-500 origin-bottom" />
        ))}
      </span>
      {children}
    </motion.span>
  )
}

// Words blur into focus; "*text*" renders as gradient emphasis.
export function Blur({ text, as: Tag = 'h2', className = '', delay = 0, animateNow = false }) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean)
  const trigger = animateNow ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } }
  return (
    <Tag className={className}>
      <motion.span initial="hidden" {...trigger} variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }} className="inline">
        {parts.map((p, pi) => {
          const em = p.startsWith('*')
          const words = (em ? p.slice(1, -1) : p).split(' ').filter(Boolean)
          return words.map((word, i) => (
            <motion.span
              key={`${pi}-${i}`}
              variants={{ hidden: { opacity: 0, filter: 'blur(12px)', y: 12 }, show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7 } } }}
              className={`inline-block mr-[0.25em] ${em ? 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent' : ''}`}
            >
              {word}
            </motion.span>
          ))
        })}
      </motion.span>
    </Tag>
  )
}

export function Lead({ title, body, pill, center = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {pill && <Pill>{pill}</Pill>}
      <Blur text={title} className="mt-5 font-outfit font-bold text-3xl sm:text-5xl tracking-tight leading-[1.08] text-violet-950 text-balance" />
      {body && (
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-5 text-lg text-violet-950/65 leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}
        >
          {body}
        </motion.p>
      )}
    </div>
  )
}

export function Btn({ href, children, variant = 'solid', className = '', ...rest }) {
  const v = {
    solid: 'bg-violet-600 text-white hover:bg-violet-700 shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7)]',
    glass: `${glass} text-violet-900 hover:bg-white/80`,
  }[variant]
  return (
    <motion.a href={href} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING} className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold ${v} ${className}`} {...rest}>
      {children}
    </motion.a>
  )
}

// Floating glass dock: section links plus the enquiry button.
export function Dock({ items }) {
  const active = useActiveSection(items.map((i) => i.id), 220)
  return (
    <motion.nav
      aria-label="Page sections"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING, delay: 1.2 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)] rounded-full ${glass} p-1.5 flex items-center gap-1`}
    >
      <ul className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => {
          const on = active === it.id
          return (
            <li key={it.id} className="shrink-0">
              <a href={`#${it.id}`} aria-current={on ? 'true' : undefined} className={`relative block rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${on ? 'text-white' : 'text-violet-900/70 hover:text-violet-900'}`}>
                {on && <motion.span layoutId="dock-active" transition={SPRING} className="absolute inset-0 rounded-full bg-violet-950" />}
                <span className="relative">{it.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
      <a href="#talk-to-expert" className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-bold text-white">
        Talk to an expert
      </a>
    </motion.nav>
  )
}
