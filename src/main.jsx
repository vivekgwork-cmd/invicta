import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Maintenance from './pages/Maintenance.jsx'

// Set to false to bring the full site back. While true, every route shows the
// maintenance page and the real pages are left out of the production bundle.
const MAINTENANCE_MODE = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {MAINTENANCE_MODE ? (
      <Maintenance />
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
)
