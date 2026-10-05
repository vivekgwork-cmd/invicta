import PageShell from '../components/site/PageShell.jsx'
import Hero from '../components/homepage/Hero.jsx'
import StatsBar from '../components/homepage/StatsBar.jsx'
import Pathways from '../components/homepage/Pathways.jsx'
import Destinations from '../components/homepage/Destinations.jsx'
import Stories from '../components/homepage/Stories.jsx'
import WhyInvicta from '../components/homepage/WhyInvicta.jsx'
import Journey from '../components/homepage/Journey.jsx'

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <StatsBar />
      <Pathways />
      <Destinations />
      <Stories />
      <WhyInvicta />
      <Journey />
    </PageShell>
  )
}
