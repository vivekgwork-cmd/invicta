import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Burger } from '../shared/Glyphs.jsx'
import { NAV_LINKS, ROUTES, img } from './links.js'

const themes = {
  light: {
    header: 'bg-white/90 border-slate-200/80 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)]',
    pillBar: 'bg-slate-100/70 border-slate-200/60',
    active: 'bg-white text-cobalt-700 shadow-sm',
    idle: 'text-slate-600 hover:text-obsidian-950 hover:bg-white/60',
    burger: 'text-obsidian-950',
    drawer: 'bg-white border-slate-200',
    drawerLink: 'text-slate-700',
    drawerActive: 'text-cobalt-700',
  },
  dark: {
    header: 'bg-midnight-900/90 border-slate-800/80 shadow-2xl',
    pillBar: 'bg-slate-900/80 border-slate-700/60 shadow-inner',
    active: 'text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-sm',
    idle: 'text-slate-300 hover:text-white hover:bg-slate-800',
    burger: 'text-white',
    drawer: 'bg-midnight-900 border-slate-800',
    drawerLink: 'text-slate-200',
    drawerActive: 'text-amber-400',
  },
}

export default function SiteNavbar({ variant = 'light' }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const t = themes[variant]
  const isActive = (to) => !to.includes('#') && pathname === to

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b ${t.header}`}>
      <div className="h-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link to={ROUTES.home} className="flex items-center shrink-0" aria-label="Invicta home">
          <span className="flex items-center">
            <img src={img('invicta-career-logo.png')} alt="Invicta Career Consultancy" className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply" />
          </span>
        </Link>

        <nav className={`hidden xl:flex items-center gap-1.5 p-1.5 rounded-full border ${t.pillBar}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              aria-current={isActive(l.to) ? 'page' : undefined}
              className={`px-4 py-1.5 font-outfit text-xs font-semibold rounded-full transition-all ${
                isActive(l.to) ? t.active : t.idle
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.counselling}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-champagne-500 to-amber-500 hover:from-champagne-600 hover:to-amber-600 text-obsidian-950 font-outfit font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-wider"
          >
            Book Free Counselling
          </Link>
          <button
            className={`xl:hidden p-2 ${t.burger}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Burger open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`xl:hidden overflow-hidden border-t ${t.drawer}`}
          >
            <div className="px-5 py-5 flex flex-col gap-4 font-outfit">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`font-semibold ${isActive(l.to) ? t.drawerActive : t.drawerLink}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to={ROUTES.counselling}
                onClick={() => setOpen(false)}
                className="inline-flex w-fit items-center gap-1.5 bg-gradient-to-r from-champagne-500 to-amber-500 text-obsidian-950 font-bold text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider"
              >
                Book Free Counselling
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
