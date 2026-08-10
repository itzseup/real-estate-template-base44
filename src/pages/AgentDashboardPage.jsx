import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import { LogOut, Mail, Phone, Calendar, User, ExternalLink } from "lucide-react"

/**
 * AgentDashboardPage — agent's view at /agent-dashboard.
 *
 * Shows all inquiries assigned to the logged-in agent.
 * The agent logs in at /agent-login with their email.
 * Their agent profile is looked up from the database by matching email.
 */

export default function AgentDashboardPage() {
  const navigate = useNavigate()
  const [agent, setAgent] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const agentEmail = localStorage.getItem("agent_session_email")

  // If not logged in, redirect to /agent-login
  useEffect(() => {
    if (!agentEmail) {
      navigate("/agent-login", { replace: true, state: { from: "/agent-dashboard" } })
    }
  }, [agentEmail, navigate])

  // Load agent profile and assigned inquiries
  useEffect(() => {
    if (!agentEmail) return

    async function loadData() {
      setLoading(true)
      try {
        const agents = await base44.entities.Agent.list("-created_date", 100)
        const matchedAgent = agents.find((a) => a.email === agentEmail)
        setAgent(matchedAgent || null)

        if (matchedAgent) {
          const allInquiries = await base44.entities.Inquiry.list("-created_date", 200)
          const assigned = allInquiries.filter(
            (i) => i.agent_assigned === matchedAgent.id
          )
          setInquiries(assigned)
        } else {
          // If agent email not found in DB, still load inquiries by email field
          const allInquiries = await base44.entities.Inquiry.list("-created_date", 200)
          setInquiries(allInquiries.filter((i) => i.email === agentEmail))
        }
      } catch (e) {
        console.error("Error loading agent data:", e)
        setError("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [agentEmail])

  function handleLogout() {
    localStorage.removeItem("agent_session_email")
    navigate("/agent-login", { replace: true })
  }

  function getStatusColor(status) {
    const colors = {
      new: "bg-slate-100 text-slate-700",
      read: "bg-blue-100 text-blue-700",
      replied: "bg-green-100 text-green-700",
      archived: "bg-gray-100 text-gray-700",
    }
    return colors[status] || colors.new
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Redirect if not logged in
  if (!agentEmail) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-[4%] md:px-[2%]">
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-24 px-[4%] md:px-[2%]">
      <Seo
        title="Agent Dashboard"
        description="View your assigned leads and manage customer inquiries."
        url="/agent-dashboard"
        noIndex
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-display-xl font-light">
              Agent Dashboard
            </h1>
            {agent && (
              <p className="font-body text-muted-foreground mt-2">
                {agent.name} — {agent.email}
              </p>
            )}
            {!agent && agentEmail && (
              <p className="font-body text-muted-foreground mt-2">
                {agentEmail}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-border text-foreground font-body text-xs tracking-label uppercase hover:bg-secondary transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {error && (
          <p className="font-body text-sm text-destructive mb-4">{error}</p>
        )}

        <div className="mb-6">
          <span className="font-body text-sm text-muted-foreground">
            {inquiries.length} assigned lead{inquiries.length !== 1 ? "s" : ""}
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg">
            <User className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-lg font-light mb-2">
              No assigned leads
            </h3>
            <p className="font-body text-muted-foreground">
              You don't have any inquiries assigned to you yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-body text-xs tracking-label uppercase text-muted-foreground py-3 px-4">
                    Customer
                  </th>
                  <th className="text-left font-body text-xs tracking-label uppercase text-muted-foreground py-3 px-4">
                    Contact
                  </th>
                  <th className="text-left font-body text-xs tracking-label uppercase text-muted-foreground py-3 px-4">
                    Property
                  </th>
                  <th className="text-left font-body text-xs tracking-label uppercase text-muted-foreground py-3 px-4">
                    Status
                  </th>
                  <th className="text-left font-body text-xs tracking-label uppercase text-muted-foreground py-3 px-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border">
                    <td className="py-4 px-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-forest mr-3 mt-0.5" />
                        <div>
                          <p className="font-body font-medium text-foreground">
                            {inquiry.name}
                          </p>
                          {inquiry.message && (
                            <p
                              className="font-body text-sm text-muted-foreground mt-1 max-w-xs"
                              title={inquiry.message}
                            >
                              {inquiry.message.length > 100
                                ? inquiry.message.substring(0, 100) + "..."
                                : inquiry.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 font-body text-sm text-foreground">
                          <Mail size={14} /> {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2 font-body text-sm text-foreground">
                            <Phone size={14} /> {inquiry.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {inquiry.property_id ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`/properties#${inquiry.property_id}`}
                            className="font-body text-sm text-foreground hover:text-forest transition-colors"
                          >
                            View property
                            <ExternalLink size={12} className="inline ml-1" />
                          </a>
                        </div>
                      ) : (
                        <span className="font-body text-sm text-muted-foreground">
                          No property linked
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full font-body text-xs ${getStatusColor(inquiry.status)}`}
                      >
                        {inquiry.status || "new"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <Calendar size={14} /> {formatDate(inquiry.created_at)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
