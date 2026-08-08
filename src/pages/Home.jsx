import { useEffect, useState } from "react"
import { base44 } from "@/api/base44Client"
import HeroSection from "@/components/home/HeroSection"
import AgentHighlights from "@/components/home/AgentHighlights"
import HighPriorityListings from "@/components/home/HighPriorityListings"
import MarketInsights from "@/components/home/MarketInsights"
import NeighborhoodExpertise from "@/components/home/NeighborhoodExpertise"
import ClientStories from "@/components/home/ClientStories"
import MissionSection from "@/components/about/MissionSection"

export default function HomePage() {
  const [heroImage, setHeroImage] = useState(null)
  const [highPriority, setHighPriority] = useState([])
  const [agents, setAgents] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const [properties, agentData, testimonialsData, blogData] = await Promise.all([
          base44.entities.Property.list("-created_date", 100),
          base44.entities.Agent.list("-created_date", 20),
          base44.entities.Testimonial ? base44.entities.Testimonial.list("-created_date", 10) : [],
          base44.entities.BlogPost ? base44.entities.BlogPost.list("-created_date", 3) : [],
        ])

        setHighPriority(properties.filter((p) => p.status === "Featured" || p.status === "new").slice(0, 4))
        setAgents(agentData.slice(0, 3))
        setTestimonials(testimonialsData)
        setBlogPosts(blogData)

        const featuredImage = properties.find((p) => p.featured_image)?.featured_image
        if (featuredImage) setHeroImage(featuredImage)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection heroImage={heroImage} />
      <AgentHighlights agents={agents} />
      <HighPriorityListings properties={highPriority} />
      <MissionSection />
      <MarketInsights posts={blogPosts} />
      <NeighborhoodExpertise />
      <ClientStories testimonials={testimonials} />
    </div>
  )
}
