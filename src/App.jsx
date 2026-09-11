import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import LandingPage from './pages/LandingPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/landing-page-charcoal" element={<LandingPage heroVariant="charcoal" />} />
        <Route path="/landing-page-emerald" element={<LandingPage heroVariant="emerald" />} />
        <Route path="/landing-page-maroon" element={<LandingPage heroVariant="maroon" />} />
      </Routes>
    </>
  )
}
