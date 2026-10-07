import PageShell from '../components/site/PageShell.jsx'
import { Dock } from '../components/ielts/ui.jsx'
import Hero from '../components/ielts/Hero.jsx'
import { Glance, Overview, Why } from '../components/ielts/Intro.jsx'
import { BandChecker, FlipCards, Scores, SkillWheel } from '../components/ielts/Tools.jsx'
import { CTA, ChatFAQ, Compare, Options, Wizard } from '../components/ielts/Finale.jsx'

const dock = [
  { id: 'overview', label: 'Overview' },
  { id: 'why', label: 'Why IELTS' },
  { id: 'target', label: 'Target' },
  { id: 'skills', label: 'Skills' },
  { id: 'approach', label: 'Approach' },
  { id: 'scores', label: 'Scores' },
  { id: 'options', label: 'Formats' },
  { id: 'compare', label: 'Compare' },
  { id: 'route', label: 'Route' },
  { id: 'faq', label: 'FAQ' },
]

const faqs = [
  { q: 'What is the difference between IELTS Academic and General Training?', a: 'Academic is designed for higher education and certain professional purposes. General Training serves other needs, including migration and study below degree level. The Reading and Writing sections differ, while Listening and Speaking are the same.' },
  { q: 'What IELTS band should I aim for?', a: 'Your target depends on your chosen university and programme. Check both the overall requirement and any minimum for individual sections.' },
  { q: 'Is there a pass or fail score?', a: 'No. IELTS reports your English proficiency through band scores. Universities and other receiving organisations set their own requirements.' },
  { q: 'How often can I take IELTS?', a: 'You can retake IELTS when you are ready. Review your previous performance and allow enough preparation time to address the areas that need improvement.' },
  { q: 'How long are IELTS results valid?', a: 'IELTS recommends a two-year validity period. Confirm the receiving institution’s policy and when it requires your result to remain valid.' },
  { q: 'Can I send my scores to universities?', a: 'Yes. Use your test provider’s result-sharing process to send your Test Report Form or electronic results to the relevant institutions. Follow each university’s submission instructions.' },
  { q: 'Is IELTS still available on paper?', a: 'IELTS is transitioning to computer delivery, with timing varying by market. A Writing on Paper option is available in selected locations. Check current options with your test provider.' },
  { q: 'Can I take IELTS from home?', a: 'IELTS Online may be available to eligible candidates. Check local availability and university acceptance first. It is not accepted for immigration purposes.' },
  { q: 'How much does IELTS Academic cost in India?', a: 'The standard IELTS Academic exam fee listed by IDP India is ₹19,000. Confirm the current amount and test type before paying. Coaching fees are separate.' },
  { q: 'How soon will I receive my results?', a: 'IELTS on computer results are generally available within 1–5 days. Timing differs for other formats, so confirm with your provider and plan around your application deadlines.' },
  { q: 'Does every student need IELTS to study abroad?', a: 'No. Institutions may accept other English tests or grant exemptions in specific circumstances. Check the current requirements of each programme.' },
  { q: 'Can Invicta also help with university applications?', a: 'Yes. Discuss how IELTS preparation can fit alongside Invicta’s course selection, profile development and application guidance.' },
]

export default function IELTSPage() {
  return (
    <PageShell className="bg-gradient-to-b from-[#f6f3ff] via-[#fbf9ff] to-[#f3eeff] font-jakarta text-violet-950 selection:bg-violet-600 selection:text-white">
      <Hero />
      <Glance />
      <Overview />
      <Why />
      <BandChecker />
      <SkillWheel />
      <FlipCards />
      <Scores />
      <Options />
      <Compare />
      <Wizard />
      <ChatFAQ items={faqs} />
      <CTA />
      <Dock items={dock} />
    </PageShell>
  )
}
