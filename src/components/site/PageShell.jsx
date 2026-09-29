import { MotionConfig } from 'framer-motion'
import SiteNavbar from './SiteNavbar.jsx'
import SiteFooter from './SiteFooter.jsx'
import { ScrollProgress } from './motion.jsx'

// Shared frame for the Homepage, Study Abroad and Test Prep pages.
export default function PageShell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-surface font-jakarta text-slate-900 min-h-screen flex flex-col selection:bg-cobalt-600 selection:text-white">
        <ScrollProgress />
        <SiteNavbar variant="light" />
        <main className="w-full pt-20 flex-1 overflow-x-clip">{children}</main>
        <SiteFooter variant="slate" />
      </div>
    </MotionConfig>
  )
}
