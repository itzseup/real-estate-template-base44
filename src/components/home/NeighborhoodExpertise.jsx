import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const neighborhoods = [
  {
    name: "Downtown Dubai",
    tagline: "Iconic skyline living at the city's heart",
    image: "https://media.base44.com/images/public/69db45a7fc9eedd006e6060b/549d642e5_generated_c90ff458.png",
  },
  {
    name: "Dubai Marina",
    tagline: "Waterfront luxury along the marina promenade",
    image: "https://media.base44.com/images/public/69db45a7fc9eedd006e6060b/1e5e447e3_generated_bd2f305c.png",
  },
  {
    name: "Palm Jumeirah",
    tagline: "Exclusive island residences with sea views",
    image: "https://media.base44.com/images/public/69db45a7fc9eedd006e6060b/6d063e766_generated_bc4b1d6d.png",
  },
];

export default function NeighborhoodExpertise() {
  const [neighborhoodCounts, setNeighborhoodCounts] = useState({});

  useEffect(() => {
    const load = async () => {
      const properties = await base44.entities.Property.list("-created_date", 1000);
      const counts = {};
      neighborhoods.forEach((n) => {
        counts[n.name] = properties.filter((p) => p.neighborhood === n.name).length;
      });
      setNeighborhoodCounts(counts);
    };
    load();
  }, []);

  return (
    <section className="py-24 md:py-40 bg-secondary/30">
      <div className="px-[2%] max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-display-lg font-light mt-3">
            Neighborhood <span className="italic">Expertise</span>
          </h2>
          <p className="font-body text-muted-foreground text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Decades of local knowledge distilled into unparalleled guidance 
            for the city's most coveted addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                to={`/properties?location=${encodeURIComponent(n.name)}`}
                className="group block"
              >
                <div className="relative h-[450px] md:aspect-auto md:min-h-[480px] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-foreground to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="font-body text-xs tracking-label uppercase text-white/60 mb-2">
                      {neighborhoodCounts[n.name] || 0} Properties
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-white font-light">
                      {n.name}
                    </h3>
                    <p className="font-body text-sm text-white/70 mt-1">{n.tagline}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}