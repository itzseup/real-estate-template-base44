import { useEffect, useState } from "react"
import { base44 } from "@/api/base44Client"
import { Badge } from "@/components/ui/badge"

export default function AgentProfile({ agentId }) {
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgent() {
      try {
        if (agentId) {
          const data = await base44.entities.Agent.get(agentId)
          setAgent(data)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error loading agent:", error)
        setLoading(false)
      }
    }

    loadAgent()
  }, [agentId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-muted-foreground">Agent not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {agent.photo && (
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
          )}
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="font-display text-display-xl font-light">{agent.name}</h1>
            <Badge variant="secondary" className="mt-2">
              {agent.title}
            </Badge>
          </div>

          {agent.bio && (
            <p className="font-body text-muted-foreground leading-relaxed">
              {agent.bio}
            </p>
          )}

          <div className="space-y-2 text-sm font-body">
            {agent.years_experience && (
              <p className="text-muted-foreground">
                {agent.years_experience} Years Experience
              </p>
            )}
            {agent.total_sales_volume && (
              <p className="text-muted-foreground">
                {agent.total_sales_volume} in Total Sales Volume
              </p>
            )}
            {agent.email && (
              <p className="text-muted-foreground">
                Email: {agent.email}
              </p>
            )}
            {agent.phone && (
              <p className="text-muted-foreground">
                Phone: {agent.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
