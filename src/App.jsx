import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import HomeClassic from './pages/HomeClassic.jsx'
import StudyAbroad from './pages/StudyAbroad.jsx'
import TestPrep from './pages/TestPrep.jsx'
import About from './pages/About.jsx'
import LandingPage from './pages/LandingPage.jsx'
import BachelorsLandingPage from './pages/BachelorsLandingPage.jsx'
import SATPage from './pages/SATPage.jsx'
import APPage from './pages/APPage.jsx'
import IELTSPage from './pages/IELTSPage.jsx'

// Scrolls to the top on page change, or to the #section when the link carries a hash
// (e.g. "/study-abroad#evaluation-form" from the homepage).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/test-prep" element={<TestPrep />} />
        <Route path="/test-prep/sat" element={<SATPage />} />
        <Route path="/test-prep/ap" element={<APPage />} />
        <Route path="/test-prep/ielts" element={<IELTSPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home-classic" element={<HomeClassic />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/landing-page-charcoal" element={<LandingPage heroVariant="charcoal" />} />
        <Route path="/landing-page-emerald" element={<LandingPage heroVariant="emerald" />} />
        <Route path="/landing-page-maroon" element={<LandingPage heroVariant="maroon" />} />
        <Route path="/landing-page-bachelors" element={<BachelorsLandingPage />} />
      </Routes>
    </>
  )
}
