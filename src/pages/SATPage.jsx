import PageShell from '../components/site/PageShell.jsx'
import { FloatingCTA } from '../components/exam/kit.jsx'
import { DotNav } from '../components/sat/ui.jsx'
import Hero from '../components/sat/Hero.jsx'
import { Format, Glance, Overview } from '../components/sat/Intro.jsx'
import { Approach, Portal, Structure } from '../components/sat/Console.jsx'
import { Admissions, CTA, Dates, FAQ, Route, Support } from '../components/sat/Journey.jsx'

const nav = [
  { id: 'top', label: 'Start' },
  { id: 'overview', label: 'Overview' },
  { id: 'format', label: 'Format' },
  { id: 'approach', label: 'Approach' },
  { id: 'structure', label: 'Structure' },
  { id: 'portal', label: 'Portal' },
  { id: 'route', label: 'Route' },
  { id: 'dates', label: 'Dates' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'faq', label: 'FAQ' },
  { id: 'talk-to-expert', label: 'Contact' },
]

const faqs = [
  { q: 'Where do I register for the SAT?', a: 'Register through your College Board account. Invicta can help you understand the registration steps and choose a date that fits your preparation and application timeline.' },
  { q: 'How often is the SAT held?', a: 'SAT Weekend tests are offered on multiple dates each year. Check the official College Board schedule for the current cycle and available test centres.' },
  { q: 'Is the SAT compulsory for studying abroad?', a: 'No. Policies differ by university and application cycle. Some require scores, some make submission optional, and others do not consider them. Check each university on your shortlist.' },
  { q: 'Can I retake the SAT?', a: 'Yes. A retake may help if you have time to address specific gaps before your application deadlines. Review your first result before deciding on another attempt.' },
  { q: 'What is a good SAT score?', a: 'There is no single target for everyone. The right goal depends on your university options, their score policies and your academic profile.' },
  { q: 'Can I choose online classes?', a: 'Online, offline and hybrid options are available, along with individual and group formats. Speak to the team about the option that suits your schedule.' },
  { q: 'Do I need my own device?', a: 'You need an approved device with Bluebook installed and exam setup completed. Eligible students who need a device can request one from the College Board in advance. Check the current device rules before registering.' },
  { q: 'Does SAT coaching include admissions support?', a: 'SAT preparation and undergraduate admissions support address different parts of your journey. Speak to the team about the services included in your chosen programme.' },
]

export default function SATPage() {
  return (
    <PageShell nav="dark" className="bg-obsidian-950 font-jakarta text-slate-300 selection:bg-cobalt-500 selection:text-white">
      <DotNav items={nav} />
      <Hero />
      <Glance />
      <Overview />
      <Format />
      <Approach />
      <Structure />
      <Portal />
      <Route />
      <Dates />
      <Admissions />
      <Support />
      <FAQ items={faqs} />
      <CTA />
      <FloatingCTA className="bottom-5 left-5 rounded-full bg-cobalt-500 hover:bg-cobalt-400 px-5 py-3 font-grotesk text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_40px_-5px_rgba(59,130,246,0.9)]">
        Talk to a SAT Expert &gt;
      </FloatingCTA>
    </PageShell>
  )
}
