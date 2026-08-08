import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import PropertyCard from "../components/PropertyCard";
import FeaturedCard from "../components/FeaturedCard";
import PropertyFilters, { priceRanges } from "../components/PropertyFilters";
import { getBadgeForProperty } from "@/lib/badgeUtils";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function PropertySearch() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getFiltersFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    return {
      type: urlParams.get("type") || "All Types",
      price: urlParams.get("price") || "Any Price",
      beds: "Any Beds",
      location: urlParams.get("location") || "All Locations",
      search: "",
      listing: urlParams.get("listing") || "Buy",
    };
  };

  const [filters, setFilters] = useState(getFiltersFromUrl);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setFilters(getFiltersFromUrl());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Property.list("-created_date", 50);
      setProperties(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.type !== "All Types" && p.property_type !== filters.type) return false;
      if (filters.location !== "All Locations" && p.neighborhood !== filters.location && p.city !== filters.location) return false;

      if (filters.listing === "Buy" && p.status !== "For Sale") return false;
      if (filters.listing === "Rent" && p.status !== "For Rent") return false;
      
      if (filters.price !== "Any Price") {
        const range = priceRanges.find((r) => r.label === filters.price);
        if (range && (p.price < range.min || p.price >= range.max)) return false;
      }
      
      if (filters.beds !== "Any Beds") {
        const minBeds = parseInt(filters.beds);
        if (p.bedrooms < minBeds) return false;
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        const searchable = `${p.title} ${p.city} ${p.neighborhood} ${p.address} ${p.property_type}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [properties, filters]);

  return (
    <>
    <div className="pt-32 pb-24 px-[2%] max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-display-lg font-light mt-3 mb-12">
          Our Listings
        </h1>
      </motion.div>

      <PropertyFilters filters={filters} onChange={setFilters} total={filtered.length} />

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-display-sm font-light text-muted-foreground">No properties match your criteria</p>
          <p className="font-body text-sm text-muted-foreground mt-3">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="mt-12 space-y-8">
          {/* First card — large horizontal with text on the side */}
           <FeaturedCard property={filtered[0]} {...getBadgeForProperty(filtered[0])} />

           {/* Rest — small grid */}
           {filtered.length > 1 && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {filtered.slice(1).map((property) => (
                 <PropertyCard
                   key={property.id}
                   property={property}
                   {...getBadgeForProperty(property)}
                 />
               ))}
             </div>
           )}


        </div>
      )}
    </div>

      {/* Scroll to top — mobile/tablet only */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="lg:hidden fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-foreground" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}