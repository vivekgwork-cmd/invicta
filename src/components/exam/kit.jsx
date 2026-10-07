import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'

// The one piece the exam pages share: a call-to-action that appears after the hero and steps aside
// near the enquiry form. Each page passes its own look.
export function FloatingCTA({ children, className = '' }) {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useEffect(
    () =>
      scrollY.on('change', (y) => {
        const form = document.getElementById('talk-to-expert')
        const nearForm = form && form.getBoundingClientRect().top < window.innerHeight * 0.9
        setShow(y > 700 && !nearForm)
      }),
    [scrollY],
  )

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#talk-to-expert"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed z-50 ${className}`}
        >
          {children}
        </motion.a>
      )}
    </AnimatePresence>
  )
}
