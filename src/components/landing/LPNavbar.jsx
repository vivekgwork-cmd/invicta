import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Burger } from '../shared/Glyphs.jsx'
import useActiveSection from '../../lib/useActiveSection.js'

const sections = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'programs', label: 'Programs & Fees' },
  { id: 'support', label: 'Support' },
  { id: 'process', label: 'Admission Process' },
  { id: 'campus', label: 'Campus' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'faq', label: 'FAQs' },
]

export default function LPNavbar() {
  const [showSubNav, setShowSubNav] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(sections.map((s) => s.id))

  useEffect(() => {
    const onScroll = () => setShowSubNav(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: 'smooth' })
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="bg-primary border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-secondary/80 hover:text-secondary text-sm font-medium transition-colors">
            <span aria-hidden="true">←</span> Invicta Global Education
          </Link>
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('apply')
            }}
            className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
          >
            Apply Now
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showSubNav && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-secondary border-b border-primary/10 shadow-sm"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 h-12 flex items-center justify-between">
              <nav className="hidden lg:flex items-center gap-7">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`relative text-sm font-medium whitespace-nowrap py-3 transition-colors ${
                      active === s.id ? 'text-accent' : 'text-slate hover:text-primary'
                    }`}
                  >
                    {s.label}
                    {active === s.id && (
                      <motion.span layoutId="lp-subnav-underline" className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent" />
                    )}
                  </button>
                ))}
              </nav>
              <button className="lg:hidden text-primary p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle sections">
                <Burger open={mobileOpen} />
              </button>
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('apply')
                }}
                className="hidden lg:inline-flex rounded-md bg-primary px-5 py-2 text-sm font-semibold text-secondary hover:bg-accent transition-colors"
              >
                Check Eligibility
              </a>
            </div>
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="lg:hidden overflow-hidden border-t border-primary/10"
                >
                  <div className="flex flex-col px-5 py-3">
                    {sections.map((s) => (
                      <button key={s.id} onClick={() => scrollTo(s.id)} className="text-left py-2.5 text-sm font-medium text-slate">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
