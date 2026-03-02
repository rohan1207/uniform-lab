import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { prefetch } from './lib/apiCache'

// Kick off the school list fetch immediately — it will be shared across
// Navbar, SchoolLogoStrip, FeaturedSchools, and SchoolsPage via cachedFetch.
prefetch('/api/public/schools')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
