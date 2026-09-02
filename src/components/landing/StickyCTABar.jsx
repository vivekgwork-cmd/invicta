import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const applySection = document.getElementById('apply')
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const beforeApply = applySection ? window.scrollY + window.innerHeight < applySection.offsetTop : true
      setVisible(pastHero && beforeApply)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToApply = () => {
    const el = document.getElementById('apply')
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 bg-primary border-t border-accent-soft/20"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
            <div className="text-secondary text-xs sm:text-sm leading-tight">
              <span className="hidden sm:inline">Next intake </span>
              <strong className="text-accent-soft">Oct 2026</strong>
              <span className="mx-2 text-secondary/30">|</span>
              Final fee <strong className="text-accent-soft">$14,900</strong>
            </div>
            <button
              onClick={scrollToApply}
              className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Check Your Eligibility
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
