import { useState } from 'react'
import PageShell from '../components/site/PageShell.jsx'
import Hero from '../components/test-prep/Hero.jsx'
import { Metrics, Problem, HowItWorks } from '../components/test-prep/Method.jsx'
import { ChooseExam, WhyInvicta } from '../components/test-prep/Programs.jsx'
import { Testimonials, FAQ } from '../components/test-prep/Proof.jsx'
import BookDiagnostic from '../components/test-prep/BookDiagnostic.jsx'

export default function TestPrep() {
  const [exam, setExam] = useState('Digital SAT')

  return (
    <PageShell>
      <Hero />
      <Metrics />
      <Problem />
      <HowItWorks />
      <ChooseExam onPick={setExam} />
      <WhyInvicta />
      <Testimonials />
      <FAQ />
      <BookDiagnostic exam={exam} onExamChange={setExam} />
    </PageShell>
  )
}
