import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import PropertyCard from "@/components/PropertyCard"

export default function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await base44.entities.Property.list("-created_date", 100)
        setProperties(data)
        setFiltered(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading properties:", error)
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  useEffect(() => {
    let result = [...properties]

    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const price = searchParams.get("price")
    const listing = searchParams.get("listing") // eslint-disable-line

    if (location) {
      result = result.filter((p) => p.neighborhood === location)
    }
    if (type) {
      result = result.filter((p) => p.property_type === type)
    }
    if (price) {
      const maxPrice = {
        "Under $2M": 2000000,
        "$2M – $5M": 5000000,
        "$5M – $10M": 10000000,
        "$10M+": Infinity,
      }[price]
      if (maxPrice) {
        result = result.filter((p) => p.price <= maxPrice)
      }
    }

    setFiltered(result)
  }, [searchParams, properties])

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
        <div className="mb-12">
          <h1 className="font-display text-display-xl font-light mt-3">
            Properties
          </h1>
          <p className="font-body text-muted-foreground mt-4">
            {filtered.length} properties found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
