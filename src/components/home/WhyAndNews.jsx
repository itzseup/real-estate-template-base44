import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronsRight } from "lucide-react"
import { NEWS_ITEM, WHY_SLIDES } from "@/data/site"

export default function WhyAndNews() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = WHY_SLIDES[activeSlide]

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-shell gap-12 px-[5%] md:grid-cols-2 md:gap-16 xl:px-10">
        {/* Why City Walk Real Estate LLC — carousel */}
        <div>
          <p className="eyebrow">Why City Walk Real Estate LLC</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="mt-4 font-display text-display-md text-forest">{slide.title}</h2>
              <p className="mt-5 max-w-md font-body text-base leading-relaxed text-forest/70">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2.5">
            {WHY_SLIDES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}: ${item.title}`}
                aria-current={index === activeSlide}
                className={`h-2 rounded-full transition-all ${
                  index === activeSlide ? "w-7 bg-forest" : "w-2 bg-forest/25 hover:bg-forest/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* News & updates */}
        <div className="md:border-l md:border-forest/10 md:pl-16">
          <p className="eyebrow">News &amp; Updates</p>
          <h2 className="mt-4 font-display text-display-md text-forest">{NEWS_ITEM.title}</h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-forest/70">
            {NEWS_ITEM.body}
          </p>
          <Link
            to={NEWS_ITEM.href}
            className="mt-8 inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-label text-orange-accent transition-opacity hover:opacity-70"
          >
            Read More
            <ChevronsRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
