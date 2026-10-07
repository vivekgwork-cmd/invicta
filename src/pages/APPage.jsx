import { useState } from 'react'
import PageShell from '../components/site/PageShell.jsx'
import { FloatingCTA } from '../components/exam/kit.jsx'
import { ChapterNav } from '../components/ap/ui.jsx'
import Hero from '../components/ap/Hero.jsx'
import { Approach, Glance, Overview, Why } from '../components/ap/Opening.jsx'
import { Finder, Shelf } from '../components/ap/Library.jsx'
import { Calendar, Delivery, FAQ, Letter, Route, Scores } from '../components/ap/Ledger.jsx'

const chapters = [
  { id: 'overview', label: 'What is AP?' },
  { id: 'why', label: 'Why consider AP?' },
  { id: 'approach', label: 'Our approach' },
  { id: 'subjects', label: 'Subject finder' },
  { id: 'shelf', label: 'Inside each exam' },
  { id: 'scores', label: 'Your score' },
  { id: 'delivery', label: 'Exam delivery' },
  { id: 'calendar', label: 'May 2027' },
  { id: 'route', label: 'Your route' },
  { id: 'faq', label: 'Questions' },
  { id: 'talk-to-expert', label: 'Write to us' },
]

const faqs = [
  { q: 'When are AP exams held?', a: 'AP exams are held annually in May. Each subject has a scheduled date, and your coordinator or test centre confirms the time and location.' },
  { q: 'How long does an AP exam take?', a: 'The duration varies by subject. The exams listed on this page range from 2 hours 10 minutes to 3 hours 15 minutes, excluding breaks and administrative time.' },
  { q: 'How do I register?', a: 'Registration is arranged through a participating school or authorised test centre. Contact the AP coordinator early to confirm availability, payment and deadlines. A College Board account alone does not reserve your exam.' },
  { q: 'Can I take an AP exam if my school does not offer the course?', a: 'You may be able to take the exam at a school or centre that accepts external students. Contact possible centres early to confirm whether they can accommodate you.' },
  { q: 'How much does an AP exam cost?', a: 'The amount payable varies by school or authorised centre. Ask for the total exam fee, administration charges and any late fees before registering. Coaching fees are separate.' },
  { q: 'Are there late or cancellation fees?', a: 'Additional charges may apply. Your coordinator or test centre can explain registration deadlines, cancellation rules and any applicable charges.' },
  { q: 'Is there a penalty for incorrect multiple-choice answers?', a: 'Incorrect multiple-choice answers do not attract a guessing penalty. Timed practice can help you make informed choices and use your time effectively.' },
  { q: 'Will AP guarantee university admission or credit?', a: 'No. Each institution sets its own admissions and credit policies. AP should support your broader academic plan.' },
  { q: 'When will I receive my scores?', a: 'Scores are generally released in July through your College Board account. Check the official release information for your exam year.' },
  { q: 'How do I send scores to universities?', a: 'Use College Board’s AP score-sending service. Check the current free score-send deadline and any charges for additional reports.' },
  { q: 'How many AP exams should I take?', a: 'There is no single ideal number. Choose a manageable set that fits your interests, school workload and university goals.' },
]

export default function APPage() {
  const [book, setBook] = useState('calc')
  const openBook = (g) => {
    setBook(g)
    document.getElementById('shelf')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageShell className="bg-[#f5efe3] font-jakarta text-obsidian-950 selection:bg-emerald-800 selection:text-[#fbf8f1]">
      <ChapterNav items={chapters} />
      <Hero />
      <Glance />
      <Overview />
      <Why />
      <Approach />
      <Finder onOpen={openBook} />
      <Shelf active={book} onChange={setBook} />
      <Scores />
      <Delivery />
      <Calendar />
      <Route />
      <FAQ items={faqs} />
      <Letter />
      <FloatingCTA className="bottom-5 right-5 group inline-flex items-center gap-3 rounded-full bg-obsidian-950 text-[#fbf8f1] pl-5 pr-1.5 py-1.5 text-sm font-semibold shadow-2xl">
        Talk to an AP Expert
        <span className="w-8 h-8 rounded-full grid place-items-center bg-[#fbf8f1] text-obsidian-950">→</span>
      </FloatingCTA>
    </PageShell>
  )
}
