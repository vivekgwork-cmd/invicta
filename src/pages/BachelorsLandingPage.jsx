import { useEffect } from 'react'
import LPNavbar from '../components/landing-bachelors/LPNavbar.jsx'
import Hero from '../components/landing-bachelors/Hero.jsx'
import CredentialsSection from '../components/landing-bachelors/CredentialsSection.jsx'
import USPSection from '../components/landing-bachelors/USPSection.jsx'
import PathwaySection from '../components/landing-bachelors/PathwaySection.jsx'
import TestimonialsSection from '../components/landing/TestimonialsSection.jsx'
import ProgramsSection from '../components/landing-bachelors/ProgramsSection.jsx'
import WhoSection from '../components/landing-bachelors/WhoSection.jsx'
import SupportSection from '../components/landing-bachelors/SupportSection.jsx'
import ProcessSection from '../components/landing-bachelors/ProcessSection.jsx'
import VisaSection from '../components/landing-bachelors/VisaSection.jsx'
import CampusSection from '../components/landing-bachelors/CampusSection.jsx'
import OutcomesSection from '../components/landing-bachelors/OutcomesSection.jsx'
import FAQSection from '../components/landing-bachelors/FAQSection.jsx'
import FinalCTASection from '../components/landing-bachelors/FinalCTASection.jsx'
import LPFooter from '../components/landing/LPFooter.jsx'
import StickyCTABar from '../components/landing-bachelors/StickyCTABar.jsx'

const TITLE = 'BBA at SEU Georgia | MIT Collaboration | European Degree'
const DESCRIPTION =
  "Earn your Bachelor's at Georgian National University SEU with an MIT-mapped curriculum, MIT-trained faculty, and a 3-week immersion at MIT Boston. Final fee from $14,850 after scholarship. Talk to admissions."

function usePageMeta(title, description) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    const prev = { title: document.title, description: meta?.getAttribute('content') }
    document.title = title
    meta?.setAttribute('content', description)
    return () => {
      document.title = prev.title
      if (prev.description != null) meta?.setAttribute('content', prev.description)
    }
  }, [title, description])
}

export default function BachelorsLandingPage({ heroVariant = 'original' }) {
  usePageMeta(TITLE, DESCRIPTION)

  return (
    <div className="bg-secondary lp-root lp-theme-bachelors">
      <LPNavbar />
      <div className="relative">
        <Hero variant={heroVariant} />
        <div className="relative z-10">
          <CredentialsSection />
        </div>
      </div>
      <USPSection />
      <PathwaySection />
      <TestimonialsSection />
      <ProgramsSection />
      <WhoSection />
      <SupportSection />
      <ProcessSection />
      <VisaSection />
      <CampusSection />
      <OutcomesSection />
      <FAQSection />
      <FinalCTASection />
      <LPFooter />
      <StickyCTABar />
    </div>
  )
}
