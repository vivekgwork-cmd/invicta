import { motion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.25,
  as: Component = motion.div,
}) {
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

export function Stagger({ children, className = '', delay = 0, stagger = 0.12, once = true, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', direction = 'up' }) {
  return (
    <motion.div className={className} variants={variants[direction]} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
