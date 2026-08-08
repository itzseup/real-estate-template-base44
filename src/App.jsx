import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/AuthContext"

import HomePage from "@/pages/Home"
import AboutPage from "@/pages/About"
import AccessibilityPage from "@/pages/Accessibility"
import PropertiesPage from "@/pages/Properties"
import PropertyDetailPage from "@/pages/PropertyDetail"
import ContactPage from "@/pages/Contact"
import OurTeamPage from "@/pages/OurTeam"
import BlogPage from "@/pages/Blog"
import SellPage from "@/pages/Sell"
import TermsPage from "@/pages/Terms"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/our-team" element={<OurTeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </Router>
  )
}

export default App
