import LPNavbar from '../components/landing/LPNavbar.jsx'
import Hero from '../components/landing/Hero.jsx'
import CredentialsSection from '../components/landing/CredentialsSection.jsx'
import USPSection from '../components/landing/USPSection.jsx'
import PathwaySection from '../components/landing/PathwaySection.jsx'
import TestimonialsSection from '../components/landing/TestimonialsSection.jsx'
import ProgramsSection from '../components/landing/ProgramsSection.jsx'
import SupportSection from '../components/landing/SupportSection.jsx'
import ProcessSection from '../components/landing/ProcessSection.jsx'
import VisaSection from '../components/landing/VisaSection.jsx'
import CampusSection from '../components/landing/CampusSection.jsx'
import OutcomesSection from '../components/landing/OutcomesSection.jsx'
import FAQSection from '../components/landing/FAQSection.jsx'
import FinalCTASection from '../components/landing/FinalCTASection.jsx'
import LPFooter from '../components/landing/LPFooter.jsx'
import StickyCTABar from '../components/landing/StickyCTABar.jsx'

export default function LandingPage({ heroVariant = 'original' }) {
  return (
    <div className="bg-secondary lp-root">
      <LPNavbar />
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Hero variant={heroVariant} />
        </div>
        <div className="relative z-10">
          <CredentialsSection />
        </div>
      </div>
      <USPSection />
      <PathwaySection />
      <TestimonialsSection />
      <ProgramsSection />
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
