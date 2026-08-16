import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/AuthContext"
import Layout from "@/components/Layout"

import HomePage from "@/pages/Home"
import AboutPage from "@/pages/About"
import AccessibilityPage from "@/pages/Accessibility"
import PropertiesPage from "@/pages/Properties"
import PropertyDetailPage from "@/pages/PropertyDetail"
import RentPage from "@/pages/Rent"
import OffPlanPage from "@/pages/OffPlan"
import CommercialPage from "@/pages/Commercial"
import ContactPage from "@/pages/Contact"
import InquiryPage from "@/pages/InquiryPage"
import LoginPage from "@/pages/LoginPage"
import AgentLoginPage from "@/pages/AgentLoginPage"
import AgentDashboardPage from "@/pages/AgentDashboardPage"
import AppointmentsPage from "@/pages/Appointments"
import AppointmentConfirmedPage from "@/pages/AppointmentConfirmed"
import OurTeamPage from "@/pages/OurTeam"
import CareersPage from "@/pages/Careers"
import BlogPage from "@/pages/Blog"
import BlogDetailPage from "@/pages/BlogDetail"
import SellPage from "@/pages/Sell"
import TermsPage from "@/pages/Terms"
import PageNotFound from "@/lib/PageNotFound"

const ROUTES = [
  { path: "/", element: <HomePage />, transparent: true },
  { path: "/properties", element: <PropertiesPage /> },
  { path: "/properties/rent", element: <RentPage /> },
  { path: "/property/:id", element: <PropertyDetailPage /> },
  { path: "/off-plan", element: <OffPlanPage /> },
  { path: "/commercial", element: <CommercialPage /> },
  { path: "/sell", element: <SellPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/meet-the-team", element: <OurTeamPage /> },
  { path: "/our-team", element: <OurTeamPage /> },
  { path: "/book-appointment", element: <AppointmentsPage /> },
  { path: "/appointment-confirmed", element: <AppointmentConfirmedPage /> },
  { path: "/careers", element: <CareersPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:id", element: <BlogDetailPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/inquiry-received", element: <InquiryPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/agent-login", element: <AgentLoginPage /> },
  { path: "/agent-dashboard", element: <AgentDashboardPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/accessibility", element: <AccessibilityPage /> },
]

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout transparent={route.transparent}>{route.element}</Layout>}
            />
          ))}
          {/* Catch-all 404 route — must come last */}
          <Route path="*" element={<Layout><PageNotFound /></Layout>} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </Router>
  )
}

export default App
