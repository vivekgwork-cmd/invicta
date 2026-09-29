import PageShell from '../components/site/PageShell.jsx'
import Hero from '../components/study-abroad/Hero.jsx'
import Problem from '../components/study-abroad/Problem.jsx'
import Suite from '../components/study-abroad/Suite.jsx'
import Roadmap from '../components/study-abroad/Roadmap.jsx'
import Audience from '../components/study-abroad/Audience.jsx'
import Results, { TestPrepBanner } from '../components/study-abroad/Results.jsx'
import FAQ from '../components/study-abroad/FAQ.jsx'
import EvaluationForm from '../components/study-abroad/EvaluationForm.jsx'

export default function StudyAbroad() {
  return (
    <PageShell>
      <Hero />
      <Problem />
      <Suite />
      <Roadmap />
      <Audience />
      <TestPrepBanner />
      <Results />
      <FAQ />
      <EvaluationForm />
    </PageShell>
  )
}
