import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES, img } from './links.js'
import { EASE } from './motion.jsx'

const accreditations = [
  'AIRC Certified',
  'NAFSA Member',
  'Ivy League Alliance',
  'British Council Reg.',
  'ICEF Recognized',
  'PTE Academic Core',
]

const destinations = [
  'United States (Ivy Plus)',
  'United Kingdom (Oxbridge & RG)',
  'Canada (U15 Consortium)',
  'Australia (Group of Eight)',
  'Continental Europe (ETH, TU9, LERU)',
]

const services = [
  { label: 'Profile Evaluation & Audits', to: ROUTES.counselling },
  { label: 'SAT / GRE / GMAT Prep', to: ROUTES.testPrep },
  { label: 'SOP & Essay Writing', to: ROUTES.studyAbroad },
  { label: 'Visa & Interview Prep', to: `${ROUTES.studyAbroad}#roadmap` },
  { label: 'Scholarships & Financial Aid', to: ROUTES.studyAbroad },
]

const pages = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Study Abroad', to: ROUTES.studyAbroad },
  { label: 'Test Prep', to: ROUTES.testPrep },
  { label: 'About Us', to: ROUTES.about },
  { label: "SEU x MIT Master's", to: '/landing-page' },
]

const column = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// variant "slate" = Homepage footer, "midnight" = darker variant
export default function SiteFooter({ variant = 'slate' }) {
  const dark = variant === 'midnight'
  const heading = 'font-grotesk font-bold text-xs text-champagne-400 mb-4 uppercase tracking-wider'

  return (
    <footer
      className={`w-full text-slate-300 pt-16 pb-12 border-t border-slate-800 font-jakarta ${
        dark ? 'bg-midnight-950' : 'bg-slate-900'
      }`}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12"
      >
        <motion.div variants={column} className="rounded-2xl px-6 py-5 mb-14 border border-slate-800 bg-obsidian-950/60">
          <p className="text-center mb-3 font-grotesk text-[11px] uppercase tracking-widest text-slate-500">
            Accredited &amp; partnered with global consulates and leading institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-semibold text-slate-200">
            {accreditations.map((a, i) => (
              <span key={a} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-slate-600" />}
                {a}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-14 border-b border-slate-800">
          <motion.div variants={column} className="lg:col-span-2">
            <Link to={ROUTES.home} className="inline-flex p-1.5 rounded-lg bg-white mb-4">
              <img src={img('invicta-career-logo.png')} alt="Invicta Career Consultancy" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Test prep and admissions counselling for students applying to the Ivy League, the Russell Group and top
              universities worldwide.
            </p>
            <Link
              to={ROUTES.counselling}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-champagne-400 transition-colors"
            >
              Book a free counselling session
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div variants={column}>
            <h4 className={heading}>Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {pages.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="hover:text-white transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={column} className="lg:col-span-2">
            <h4 className={heading}>Destinations</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {destinations.map((d) => (
                <li key={d}>
                  <Link to={ROUTES.studyAbroad} className="hover:text-white transition-colors">{d}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={column}>
            <h4 className={heading}>Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className="hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Invicta Career Consultancy Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Academic Integrity Policy</span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
