import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PROPERTY_TYPES } from "@/data/site"

export default function PropertyTypes() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-shell px-[5%] xl:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg text-forest">Explore Property in Dubai</h2>
          <p className="mt-5 font-body text-base leading-relaxed text-forest/70">
            Whether you are buying a first apartment, listing a villa, leasing an office or tracking
            an off-plan handover, start with the category that matches what you need.
          </p>
        </div>

        {/* Horizontal rail on small screens, six-up grid from lg. */}
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-14 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {PROPERTY_TYPES.map((type, index) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="w-[62vw] shrink-0 snap-start sm:w-[38vw] md:w-[26vw] lg:w-auto"
            >
              <Link
                to={type.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img
                  src={type.image}
                  alt={type.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-lg text-white md:text-xl">
                  {type.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
