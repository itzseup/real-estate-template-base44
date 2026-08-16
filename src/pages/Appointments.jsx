import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import AppointmentForm from "@/components/AppointmentForm"
import { DEFAULT_OG_IMAGE, breadcrumbSchema } from "@/lib/seo"

export default function AppointmentsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  // Read ?agent=<id> from the URL to pre-select an advisor
  const queryParams = new URLSearchParams(location.search)
  const defaultAgent = queryParams.get("agent") || ""

  useEffect(() => {
    async function loadAgents() {
      try {
        const data = await base44.entities.Agent.list("-created_date", 50)
        setAgents(data || [])
      } catch (error) {
        console.error("Error loading agents:", error)
        setAgents([])
      } finally {
        setLoading(false)
      }
    }
    loadAgents()
  }, [])

  const handleSubmit = async (data) => {
    await base44.entities.Booking.create(data)
    navigate("/appointment-confirmed")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <Seo
        title="Book an Appointment"
        description="Schedule a consultation with one of our City Walk Real Estate advisors. Find the perfect time to discuss your UAE property needs."
        image={DEFAULT_OG_IMAGE}
        url="/book-appointment"
        schema={breadcrumbSchema([
          { name: "Home", url: "https://citywalkrealestatellc.com" },
          { name: "Book Appointment", url: "https://citywalkrealestatellc.com/book-appointment" },
        ])}
      />
      <div className="max-w-[600px] mx-auto">
        <h1 className="font-display text-display-xl font-light mt-3 mb-8">
          Book an <span className="italic">Appointment</span>
        </h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          Schedule a consultation with one of our advisors. Select your preferred
          agent and time slot, and we'll confirm your appointment via email.
        </p>

        {agents.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">
              No agents are currently available for booking. Please try again later.
            </p>
          </div>
        ) : (
          <div className="bg-secondary/30 border border-border/20 rounded-lg p-6 md:p-8">
            <AppointmentForm agents={agents} onSubmit={handleSubmit} defaultAgent={defaultAgent} />
          </div>
        )}
      </div>
    </div>
  )
}
