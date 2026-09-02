import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function CountUp({ to, from = 0, duration = 1.6, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
