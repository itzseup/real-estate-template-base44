import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import { DEFAULT_OG_IMAGE, realEstateListingSchema, breadcrumbSchema } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await base44.entities.Property.get(id)
        setProperty(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading property:", error)
        setLoading(false)
      }
    }

    if (id) {
      loadProperty()
    }
  }, [id])

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

  if (!property) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[1400px] mx-auto text-center py-16">
          <h1 className="font-display text-2xl font-light mb-4">Property Not Found</h1>
          <Link to="/properties" className="font-body text-accent hover:underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  const images = property.images || (property.featured_image ? [property.featured_image] : [])
  const prevImage = () => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const nextImage = () => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="min-h-screen bg-white py-12 md:py-24 px-[4%] md:px-[2%]">
      <Seo
        title={property.title}
        description={property.description || "Dubai luxury real estate listing."}
        image={property.featured_image || DEFAULT_OG_IMAGE}
        url={`/property/${property.id}`}
        schema={[
          realEstateListingSchema(property),
          breadcrumbSchema([
            { name: "Home", url: "https://citywalkrealestatellc.com" },
            { name: "Properties", url: "https://citywalkrealestatellc.com/properties" },
            { name: property.title, url: `https://citywalkrealestatellc.com/property/${property.id}` },
          ]),
        ]}
      />
      <div className="max-w-[1400px] mx-auto">
        <Link to="/properties" className="inline-flex items-center font-body text-sm text-muted-foreground hover:text-foreground mb-8">
          ← Back to Properties
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {images.length > 0 && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="font-display text-display-lg font-light">{property.title}</h1>
            <p className="font-display text-2xl font-light">
              {property.price ? `$${property.price.toLocaleString()}` : "Price on request"}
            </p>

            <div className="flex gap-4 text-sm font-body text-muted-foreground">
              {property.bedrooms && <span>{property.bedrooms} bd</span>}
              {property.bathrooms && <span>{property.bathrooms} ba</span>}
              {property.sqft && <span>{property.sqft} sqft</span>}
            </div>

            {property.status && (
              <Badge variant={property.status === "sold" ? "secondary" : "default"}>
                {property.status}
              </Badge>
            )}

            {property.description && (
              <p className="font-body text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            )}

            <Button asChild>
              <Link to="/contact">Schedule a Viewing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
