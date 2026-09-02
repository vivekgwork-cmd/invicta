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

/** Vertical rail between the copy and the pyramid: fills with the accent color and lights up each numbered stop as `active` advances. */
function ProgressRail({ progress, active }) {
  const fillHeight = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="hidden sm:block relative w-7 h-[280px] mx-auto">
      <div className="absolute left-1/2 -translate-x-1/2 top-3.5 bottom-3.5 w-px bg-primary/10" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-3.5 w-px bg-accent"
        style={{ height: fillHeight }}
      />
      {tiers.map((t, i) => (
        <div
          key={t.n}
          className="absolute left-1/2 flex items-center justify-center w-7 h-7 rounded-full border font-display text-[11px] transition-colors duration-300"
          style={{
            top: `${(i / (tiers.length - 1)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: active >= i ? t.left : 'rgba(27,54,93,0.15)',
            backgroundColor: active >= i ? t.left : '#ffffff',
            color: active >= i ? '#f8f9fa' : '#94a3b8',
          }}
        >
          {t.n}
        </div>
      ))}
    </div>
  )
}

/** Desktop hook: pyramid builds tier-by-tier as `progress` (0→1) advances through the scroll track. */
function ScrollPyramid({ progress }) {
  const b1Opacity = useTransform(progress, [0, 0.08], [0, 1])
  const b1Y = useTransform(progress, [0, 0.08], [30, 0])

  const b2Opacity = useTransform(progress, [0.33, 0.42], [0, 1])
  const b2Y = useTransform(progress, [0.33, 0.42], [30, 0])

  const b3Opacity = useTransform(progress, [0.66, 0.75], [0, 1])
  const b3Y = useTransform(progress, [0.66, 0.75], [30, 0])

  const glowOpacity = useTransform(progress, [0.8, 1], [0, 0.55])
  const glowScale = useTransform(progress, [0.8, 1], [0.7, 1.15])

  return (
    <svg viewBox={`0 0 320 ${VIEW_H}`} className="w-full h-auto max-w-[400px] mx-auto overflow-visible">
      <defs>
        <radialGradient id="pyramid-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={cx} cy={244} rx={128} ry={14} fill="#1b365d" opacity={0.12} />

      <motion.circle cx={b3.labelPoint[0]} cy={b3.labelPoint[1] - 6} r={70} fill="url(#pyramid-glow)" style={{ opacity: glowOpacity, scale: glowScale }} />

      <motion.g style={{ opacity: b1Opacity, y: b1Y }}>
        <path d={b1.top} fill={tiers[0].top} />
        <path d={b1.leftWall} fill={tiers[0].left} />
        <path d={b1.rightWall} fill={tiers[0].right} />
        <text x={b1.labelPoint[0]} y={b1.labelPoint[1]} textAnchor="middle" dominantBaseline="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize={20} fill="#f8f9fa" opacity={0.85}>01</text>
      </motion.g>

      <motion.g style={{ opacity: b2Opacity, y: b2Y }}>
        <path d={b2.top} fill={tiers[1].top} />
        <path d={b2.leftWall} fill={tiers[1].left} />
        <path d={b2.rightWall} fill={tiers[1].right} />
        <text x={b2.labelPoint[0]} y={b2.labelPoint[1]} textAnchor="middle" dominantBaseline="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize={17} fill="#f8f9fa" opacity={0.85}>02</text>
      </motion.g>

      <motion.g style={{ opacity: b3Opacity, y: b3Y }}>
        <path d={b3.top} fill={tiers[2].top} />
        <path d={b3.leftWall} fill={tiers[2].left} />
        <path d={b3.rightWall} fill={tiers[2].right} />
        <text x={b3.labelPoint[0]} y={b3.labelPoint[1]} textAnchor="middle" dominantBaseline="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize={14} fill="#f8f9fa" opacity={0.85}>03</text>
      </motion.g>
    </svg>
  )
}

export default function PathwayPyramid() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    setActive((prev) => (prev === idx ? prev : idx))
  })

  const activeTier = tiers[active]

  return (
    <div>
      {/* sm and up: sticky scroll-driven build sequence — the "hook" */}
      <div ref={trackRef} className="hidden sm:block h-[280vh]">
        <div className="sticky top-28 h-[600px] flex items-center overflow-hidden">
          <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 grid grid-cols-[1fr_28px_400px] gap-10 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.n}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 pl-7"
                style={{ borderColor: activeTier.left }}
              >
                <span className="font-display text-base" style={{ color: activeTier.left }}>{activeTier.n}</span>
                <h4 className="font-display text-4xl sm:text-5xl text-primary mt-3">{activeTier.title}</h4>
                <p className="text-lg text-slate leading-relaxed mt-5 max-w-md">{activeTier.copy}</p>
              </motion.div>
            </AnimatePresence>

            <ProgressRail progress={scrollYProgress} active={active} />

            <ScrollPyramid progress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* mobile fallback: pyramid on top, stacked rows below */}
      <div className="sm:hidden mx-auto max-w-7xl px-5 sm:px-8">
        <StaticPyramid />
        <div className="grid gap-3 mt-8">
          {ordered.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="border-l-2 pl-4"
              style={{ borderColor: t.left }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-sm" style={{ color: t.left }}>{t.n}</span>
                <h4 className="font-display text-base text-primary">{t.title}</h4>
              </div>
              <p className="text-sm text-slate leading-relaxed mt-1">{t.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
