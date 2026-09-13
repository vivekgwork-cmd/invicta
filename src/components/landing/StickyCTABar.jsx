import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function StickyCTABar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const applySection = document.getElementById('apply')
      // Visible at all times, only hiding once the user reaches the final application section.
      const beforeApply = applySection ? window.scrollY + window.innerHeight < applySection.offsetTop : true
      setVisible(beforeApply)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBrochure = () => {
    const el = document.getElementById('hero-form')
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
          <div className="mx-auto max-w-7xl px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-invitica.png`}
                alt="Invicta"
                className="hidden sm:inline-block h-6 w-auto shrink-0"
              />
              <div className="text-secondary text-xs sm:text-sm leading-tight truncate">
                <span className="hidden sm:inline">Next intake </span>
                <strong className="text-accent-soft">Oct 2026</strong>
                <span className="mx-2 text-secondary/30">|</span>
                Final fee <strong className="text-accent-soft">$14,900</strong>
              </div>
            </div>
            <button
              onClick={scrollToBrochure}
              className="shrink-0 rounded-md bg-accent px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-accent-light transition-colors whitespace-nowrap"
            >
              Download Brochure
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
