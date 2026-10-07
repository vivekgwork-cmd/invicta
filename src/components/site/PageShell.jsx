import { MotionConfig } from 'framer-motion'
import SiteNavbar from './SiteNavbar.jsx'
import SiteFooter from './SiteFooter.jsx'
import { ScrollProgress } from './motion.jsx'

// Shared frame for the Homepage, Study Abroad and Test Prep pages. The exam pages pass their own
// surface classes and, on dark pages, the dark navbar.
export default function PageShell({ children, nav = 'light', className = 'bg-surface font-jakarta text-slate-900 selection:bg-cobalt-600 selection:text-white' }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`min-h-screen flex flex-col ${className}`}>
        <ScrollProgress />
        <SiteNavbar variant={nav} />
        <main className="w-full pt-20 flex-1 overflow-x-clip">{children}</main>
        <SiteFooter variant="slate" />
      </div>
    </MotionConfig>
  )
}
