import { useEffect, useState } from "react"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import HeroSection from "@/components/home/HeroSection"
import PropertyTypes from "@/components/home/PropertyTypes"
import WhyAndNews from "@/components/home/WhyAndNews"
import TrustStats from "@/components/home/TrustStats"
import TeamShowcase from "@/components/home/TeamShowcase"
import Communities from "@/components/home/Communities"

export default function HomePage() {
  const [heroImage, setHeroImage] = useState(null)

  // Live listing imagery when Supabase is configured; the hero falls back to a
  // placeholder skyline when the API is not set up (mock client returns []).
  useEffect(() => {
    let cancelled = false

    async function loadHeroImage() {
      try {
        const properties = await base44.entities.Property.list("-created_date", 20)
        const featured = properties.find((property) => property.featured_image)?.featured_image
        if (!cancelled && featured) setHeroImage(featured)
      } catch {
        // Non-fatal: the hero keeps its placeholder image.
      }
    }

    loadHeroImage()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-white">
      <Seo
        title="Ajman Real Estate"
        description="City Walk Real Estate LLC — buying, selling, renting and investing in UAE real estate, handled end to end."
        url="/"
      />
      <HeroSection heroImage={heroImage} />
      <PropertyTypes />
      <WhyAndNews />
      <TrustStats />
      <TeamShowcase />
      <Communities />
    </div>
  )
}
