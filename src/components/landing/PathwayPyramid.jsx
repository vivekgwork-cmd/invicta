import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const cx = 160

function block(cyTop, rw, rh, wallH) {
  const apex = [cx, cyTop]
  const right = [cx + rw, cyTop + rh]
  const bottom = [cx, cyTop + 2 * rh]
  const left = [cx - rw, cyTop + rh]

  const top = `M${apex} L${right} L${bottom} L${left} Z`
  const leftWall = `M${left} L${bottom} L${cx},${cyTop + 2 * rh + wallH} L${cx - rw},${cyTop + rh + wallH} Z`
  const rightWall = `M${bottom} L${right} L${cx + rw},${cyTop + rh + wallH} L${cx},${cyTop + 2 * rh + wallH} Z`
  const labelPoint = [cx - rw / 2, cyTop + rh + wallH / 2 + rh / 2]

  return { top, leftWall, rightWall, labelPoint }
}

const b1 = block(130, 110, 30, 50) // base
const b2 = block(90, 75, 20, 45) // mid — sits on b1's apex
const b3 = block(66, 45, 12, 40) // top — sits on b2's apex

const VIEW_H = 262

export const tiers = [
  {
    n: '01',
    title: 'SEU Degree',
    copy: 'A recognised European Master’s, at a cost that often undercuts private universities in India.',
    shape: b1,
    top: '#2c4a73',
    left: '#1b365d',
    right: '#12233f',
  },
  {
    n: '02',
    title: 'MIT Academic Edge',
    copy: 'Curriculum, faculty, and a Boston immersion shaped by MIT’s global standard.',
    shape: b2,
    top: '#ff8f5e',
    left: '#ff6b35',
    right: '#e0551f',
  },
  {
    n: '03',
    title: 'Global Career',
    copy: 'Don’t just graduate. Walk away with a real, recognisable global edge.',
    shape: b3,
    top: '#ffd9c2',
    left: '#ffb896',
    right: '#ff8f5e',
  },
]

const ordered = [...tiers].reverse() // read top (apex) to bottom (base), for the mobile list

/** Mobile / no-scroll-track fallback: all three tiers fade in together as the block scrolls into view. */
function StaticPyramid() {
  return (
    <svg viewBox={`0 0 320 ${VIEW_H}`} className="w-full h-auto max-w-[260px] mx-auto overflow-visible">
      <ellipse cx={cx} cy={244} rx={128} ry={14} fill="#1b365d" opacity={0.12} />
      {tiers.map((t, i) => (
        <motion.g
          key={t.n}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d={t.shape.top} fill={t.top} />
          <path d={t.shape.leftWall} fill={t.left} />
          <path d={t.shape.rightWall} fill={t.right} />
          <text
            x={t.shape.labelPoint[0]}
            y={t.shape.labelPoint[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Source Serif 4, Georgia, serif"
            fontSize={i === 0 ? 20 : i === 1 ? 17 : 14}
            fill="#f8f9fa"
            opacity={0.85}
          >
            {t.n}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

/** Vertical rail: fills with the accent color as `progress` advances, and is directly clickable —
 * clicking a numbered stop jumps the active tier immediately. */
function ProgressRail({ progress, active, onPick }) {
  const fillHeight = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="hidden sm:block relative w-7 h-[280px] mx-auto">
      <div className="absolute left-1/2 -translate-x-1/2 top-3.5 bottom-3.5 w-px bg-primary/10" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-3.5 w-px bg-accent"
        style={{ height: fillHeight }}
      />
      {tiers.map((t, i) => (
        <button
          key={t.n}
          type="button"
          onClick={() => onPick(i)}
          aria-label={`Show ${t.title}`}
          aria-pressed={active === i}
          className="absolute left-1/2 flex items-center justify-center w-7 h-7 rounded-full border font-display text-[13px] transition-colors duration-300 cursor-pointer hover:scale-110"
          style={{
            top: `${(i / (tiers.length - 1)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: active >= i ? t.left : 'rgba(27,54,93,0.15)',
            backgroundColor: active >= i ? t.left : '#ffffff',
            color: active >= i ? '#f8f9fa' : '#94a3b8',
          }}
        >
          {t.n}
        </button>
      ))}
    </div>
  )
}

const blockDefs = [b1, b2, b3]

/**
 * Desktop hook: pyramid builds tier-by-tier as `active` (0, 1, or 2) advances.
 * Driven by plain state, not a scroll-linked transform, so a click reveals or hides the
 * matching block immediately — the same state that scrolling advances.
 *
 * The blocks themselves are the click targets (not just the side rail): a not-yet-built
 * block stays visible as a faint, clickable "ghost" outline rather than disappearing, so
 * there's always something on the block to tap.
 */
function ScrollPyramid({ active, onPick }) {
  const shown = (i) => active >= i

  return (
    <>
    <style>{`
      .pyramid-tier { outline: none; }
      .pyramid-tier:focus-visible { outline: 2px solid #ff6b35; outline-offset: 6px; border-radius: 4px; }
    `}</style>
    <svg viewBox={`0 0 320 ${VIEW_H}`} className="w-full h-auto max-w-[280px] mx-auto overflow-visible">
      <defs>
        <radialGradient id="pyramid-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={cx} cy={244} rx={128} ry={14} fill="#1b365d" opacity={0.12} />

      <motion.circle
        cx={b3.labelPoint[0]} cy={b3.labelPoint[1] - 6} r={70} fill="url(#pyramid-glow)"
        initial={false}
        animate={{ opacity: shown(2) ? 0.55 : 0, scale: shown(2) ? 1.15 : 0.7 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {tiers.map((t, i) => {
        const shape = blockDefs[i]
        const fontSize = i === 0 ? 20 : i === 1 ? 17 : 14
        return (
          <motion.g
            key={t.n}
            className="pyramid-tier"
            role="button"
            tabIndex={0}
            aria-label={`Show ${t.title}`}
            aria-pressed={active === i}
            onClick={() => onPick(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(i) } }}
            initial={false}
            animate={{ opacity: shown(i) ? 1 : 0.16 }}
            whileHover={{ scale: 1.045 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              transformOrigin: `${shape.labelPoint[0]}px ${shape.labelPoint[1]}px`,
            }}
          >
            <path d={shape.top} fill={t.top} />
            <path d={shape.leftWall} fill={t.left} />
            <path d={shape.rightWall} fill={t.right} />
            <text x={shape.labelPoint[0]} y={shape.labelPoint[1]} textAnchor="middle" dominantBaseline="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize={fontSize} fill="#f8f9fa" opacity={0.85}>
              {t.n}
            </text>
          </motion.g>
        )
      })}
    </svg>
    </>
  )
}

/**
 * Right-hand "box" — numbered rail + pyramid graphic, with the active tier's title and copy
 * anchored at the bottom of the same box. Clickable (rail) and scroll-driven (track).
 */
export default function PathwayPyramid() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const lockedUntil = useRef(0)

  // Scroll is the primary driver — except for a brief window right after a click, so a stray
  // pixel of scroll momentum can't immediately snap the tier back to wherever the page
  // happens to be scrolled.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (Date.now() < lockedUntil.current) return
    const idx = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    setActive((prev) => (prev === idx ? prev : idx))
  })

  const handlePick = (idx) => {
    lockedUntil.current = Date.now() + 1200
    setActive(idx)
  }

  const activeTier = tiers[active]

  return (
    <div>
      {/* sm and up: sticky scroll-driven build sequence, box stays put while the left intro card is sticky beside it */}
      <div ref={trackRef} className="hidden sm:block h-[220vh]">
        <div className="sticky top-28">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 sm:p-10 shadow-sm">
            <div className="flex items-center justify-center gap-8">
              <ProgressRail progress={scrollYProgress} active={active} onPick={handlePick} />
              <ScrollPyramid active={active} onPick={handlePick} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.n}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 border-t border-primary/10 pt-6 border-l-2 pl-6"
                style={{ borderLeftColor: activeTier.left }}
              >
                <span className="font-display text-base" style={{ color: activeTier.left }}>{activeTier.n}</span>
                <h4 className="font-display text-2xl sm:text-3xl text-primary mt-2">{activeTier.title}</h4>
                <p className="text-slate leading-relaxed mt-3 max-w-md">{activeTier.copy}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* mobile fallback: pyramid on top, stacked rows below (each row doubles as a tap target) */}
      <div className="sm:hidden">
        <StaticPyramid />
        <div className="grid gap-3 mt-8">
          {ordered.map((t, i) => (
            <motion.button
              type="button"
              key={t.n}
              onClick={() => handlePick(tiers.indexOf(t))}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-left border-l-2 pl-4"
              style={{ borderColor: t.left }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-sm" style={{ color: t.left }}>{t.n}</span>
                <h4 className="font-display text-base text-primary">{t.title}</h4>
              </div>
              <p className="text-sm text-slate leading-relaxed mt-1">{t.copy}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
