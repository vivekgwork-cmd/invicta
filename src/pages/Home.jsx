import Navbar from '../components/home/Navbar.jsx'
import Hero from '../components/home/Hero.jsx'
import TrustStrip from '../components/home/TrustStrip.jsx'
import Services from '../components/home/Services.jsx'
import ProgramSpotlight from '../components/home/ProgramSpotlight.jsx'
import Stories from '../components/home/Stories.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import Footer from '../components/home/Footer.jsx'

export default function Home() {
  return (
    <div className="bg-paper">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Services />
      <ProgramSpotlight />
      <Stories />
      <ContactCTA />
      <Footer />
    </div>
  )
}
