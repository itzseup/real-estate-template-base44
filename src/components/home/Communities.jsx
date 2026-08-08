import { useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { COMMUNITIES } from "@/data/site"

export default function Communities() {
  const railRef = useRef(null)

  const scrollRail = (direction) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section className="bg-forest py-16 text-white md:py-24">
      <div className="mx-auto max-w-shell px-[5%] xl:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-display-lg text-white">
              Explore Communities in Dubai
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-white/75">
              Every community trades differently — on service charges, handover timing, rental
              demand and what a square foot is actually worth. Browse the areas we cover most.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              aria-label="Scroll communities left"
              className="rounded-full border border-white/30 p-2.5 transition-colors hover:bg-white hover:text-forest"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              aria-label="Scroll communities right"
              className="rounded-full border border-white/30 p-2.5 transition-colors hover:bg-white hover:text-forest"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5%] pb-2 md:mt-14 xl:px-10"
      >
        {COMMUNITIES.map((community) => (
          <Link
            key={community.name}
            to={`/properties?location=${encodeURIComponent(community.name)}`}
            className="group w-[68vw] shrink-0 snap-start sm:w-[40vw] md:w-[28vw] lg:w-[19vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={community.image}
                alt={community.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/70 to-transparent" />
            </div>
            <p className="mt-3 font-display text-lg text-white">{community.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
