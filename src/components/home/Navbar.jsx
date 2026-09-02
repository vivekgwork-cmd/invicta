import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Burger } from '../shared/Glyphs.jsx'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Study Abroad', href: '#services' },
  { label: 'Why Invicta', href: '#why-us' },
  { label: 'Success Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink shadow-[0_4px_30px_rgba(0,0,0,0.25)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-18 py-3.5">
        <Link to="/" className="font-display text-xl tracking-tight text-paper">
          Invicta<span className="text-gold-soft">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-paper/75 hover:text-paper transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/landing-page"
            className="text-sm font-semibold text-gold-soft border-b border-gold-soft/50 pb-0.5 hover:border-gold-soft transition-colors"
          >
            SEU x MIT Master's
          </NavLink>
          <a
            href="#contact"
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light transition-colors"
          >
            Free Counselling
          </a>
        </div>

        <button
          className="lg:hidden text-paper p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Burger open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-ink border-t border-white/10"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-paper/85 font-medium">
                  {l.label}
                </a>
              ))}
              <NavLink
                to="/landing-page"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-gold-soft border-b border-gold-soft/50 pb-0.5 w-fit"
              >
                SEU x MIT Master's
              </NavLink>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white w-fit"
              >
                Free Counselling
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
