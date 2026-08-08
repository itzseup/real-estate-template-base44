import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getBadgeForProperty } from "@/lib/badgeUtils"

export default function PropertyCard({ property, size = "default", badges: badgeProp }) {
  const badgeData = badgeProp || getBadgeForProperty(property)
  const badgeList = badgeData?.badges || []

  const sizeClasses = {
    default: "aspect-[4/3]",
    large: "aspect-[16/10] md:aspect-[21/9]",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/property/${property.id}`} className="group block">
        <div className={`${sizeClasses[size] || sizeClasses.default} overflow-hidden rounded-lg bg-secondary`}>
          {property.featured_image && (
            <img
              src={property.featured_image}
              alt={property.title}
              className="h-full w-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-105"
            />
          )}
          {!property.featured_image && (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-xl md:text-2xl font-light group-hover:text-accent transition-colors">
              {property.title}
            </h3>
            {badgeList.length > 0 && (
              <div className="flex gap-2">
                {badgeList.map((badge, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full font-body ${
                      badge.variant === "destructive"
                        ? "bg-destructive text-destructive-foreground"
                        : badge.variant === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="font-body text-muted-foreground mt-2 line-clamp-2">
            {property.description}
          </p>
          <div className="mt-3 flex items-center gap-4 font-body text-sm">
            <span className="font-display text-lg font-light">{property.price ? `$${property.price.toLocaleString()}` : "Price on request"}</span>
            <span className="text-muted-foreground">{property.bedrooms && `${property.bedrooms} bd`}</span>
            <span className="text-muted-foreground">{property.bathrooms && `${property.bathrooms} ba`}</span>
            <span className="text-muted-foreground">{property.sqft && `${property.sqft} sqft`}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
