import { useEffect, useState } from "react"
import { base44 } from "@/api/base44Client"
import AdvisorCard from "@/components/about/AdvisorCard"

export default function OurTeamPage() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgents() {
      try {
        const data = await base44.entities.Agent.list("-created_date", 50)
        setAgents(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading agents:", error)
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-display text-display-xl font-light mt-3">
            Our <span className="italic">Team</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            Each advisor brings a unique perspective shaped by years of experience
            and a genuine passion for architecture and community.
          </p>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">No agents found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {agents.map((agent, i) => (
              <AdvisorCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
