import { useState } from "react"

export default function PropertyFilters({ 
  currentFilters, 
  locations, 
  types, 
  priceRanges,
  listingTypes 
}) {
  const [filters, setFilters] = useState(currentFilters || {})

  const [sidebarOpen, setSidebarOpen] = useState(false) // eslint-disable-line

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    // Call parent callback
  }

  return (
    <div className="bg-secondary/30">
      <div className="max-w-[1400px] mx-auto px-[4%] md:px-[2%] py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-light">
            Filter Properties
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Location filter */}
          <select 
            className="px-4 py-3 border border-border rounded-lg font-body text-sm bg-background"
            value={filters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
          >
            <option value="">All Locations</option>
            {locations?.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Type filter */}
          <select 
            className="px-4 py-3 border border-border rounded-lg font-body text-sm bg-background"
            value={filters.type || ""}
            onChange={(e) => updateFilter("type", e.target.value)}
          >
            <option value="">All Types</option>
            {types?.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Price filter */}
          <select 
            className="px-4 py-3 border border-border rounded-lg font-body text-sm bg-background"
            value={filters.price || ""}
            onChange={(e) => updateFilter("price", e.target.value)}
          >
            <option value="">Any Price</option>
            {priceRanges?.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>

          {/* Listing type filter */}
          <select 
            className="px-4 py-3 border border-border rounded-lg font-body text-sm bg-background"
            value={filters.listing || ""}
            onChange={(e) => updateFilter("listing", e.target.value)}
          >
            <option value="">Buy or Rent</option>
            {listingTypes?.map((lt) => (
              <option key={lt} value={lt}>{lt}</option>
            ))}
          </select>

          {/* Sort filter */}
          <select 
            className="px-4 py-3 border border-border rounded-lg font-body text-sm bg-background"
            value={filters.sort || ""}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="-created_date">Newest First</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
