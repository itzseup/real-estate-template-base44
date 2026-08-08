import { motion } from "framer-motion";
import PropertyCard from "../PropertyCard";
import { Link } from "react-router-dom";
import { getBadgeForProperty } from "@/lib/badgeUtils";

export default function HighPriorityListings({ properties }) {
  if (!properties || properties.length === 0) return null;

  return (
    <section id="listings" className="py-24 md:py-40 px-[2%] max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-16 px-[2%]">
        <div>
          <h2 className="font-display text-display-lg font-light mt-3">
            Featured Properties
          </h2>
        </div>
        <Link
          to="/properties"
          className="hidden md:block font-body text-xs tracking-label uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Big featured card on top */}
      {properties[0] && (
        <div className="mb-6 md:mb-8">
          <PropertyCard
            property={properties[0]}
            size="large"
            {...getBadgeForProperty(properties[0])}
          />
        </div>
      )}

      {/* 3 smaller cards below */}
      {properties.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {properties.slice(1, 4).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              {...getBadgeForProperty(property)}
            />
          ))}
        </div>
      )}

      <div className="mt-12 md:hidden text-center">
        <Link to="/properties" className="ghost-btn inline-block">
          View All Properties
        </Link>
      </div>
    </section>
  );
}