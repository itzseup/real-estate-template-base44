import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronDown, Search, Sparkles } from "lucide-react"
import { HERO_IMAGE } from "@/data/site"

const LISTING_MODES = [
  { label: "Buy", path: "/properties" },
  { label: "Rent", path: "/properties/rent" },
]

const QUICK_LINKS = [
  { label: "Residential", href: "/properties" },
  { label: "Commercial", href: "/commercial" },
  { label: "Off Plan", href: "/off-plan" },
]

export default function HeroSection({ heroImage }) {
  const [mode, setMode] = useState(LISTING_MODES[0])
  const [modeOpen, setModeOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = query.trim() ? `?location=${encodeURIComponent(query.trim())}` : ""
    navigate(`${mode.path}${params}`)
  }

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-forest">
      <video
        src="/hero-video.mp4"
        poster={heroImage || HERO_IMAGE}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest/90" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-shell flex-col justify-end px-[5%] pb-10 pt-28 md:pb-16 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-display-xl text-white">
            Dubai Real Estate
            <span className="mt-1 block font-semibold italic">Built Better</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-white/85">
            Buying, selling, renting or investing in Dubai should feel clear, seamless and well
            handled — from the first viewing through to the keys in your hand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-3xl md:mt-14"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 rounded-sm bg-white/95 p-2 shadow-lg backdrop-blur sm:flex-row sm:items-center"
          >
            {/* Buy / Rent toggle */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setModeOpen((open) => !open)}
                aria-expanded={modeOpen}
                aria-label={`Listing type: ${mode.label}`}
                className="flex w-full items-center justify-between gap-3 rounded-full bg-forest px-5 py-3 font-body text-[11px] uppercase tracking-label text-white sm:w-auto"
              >
                {mode.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${modeOpen ? "rotate-180" : ""}`}
                />
              </button>

              {modeOpen && (
                <ul className="absolute left-0 top-full z-20 mt-2 w-full min-w-[9rem] overflow-hidden rounded-sm border border-forest/10 bg-white shadow-lg">
                  {LISTING_MODES.map((option) => (
                    <li key={option.label}>
                      <button
                        type="button"
                        onClick={() => {
                          setMode(option)
                          setModeOpen(false)
                        }}
                        className="block w-full px-5 py-3 text-left font-body text-[11px] uppercase tracking-label text-forest hover:bg-forest-50"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label htmlFor="hero-search" className="sr-only">
              Community or building
            </label>
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Community or Building"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 font-body text-sm text-forest outline-none placeholder:text-forest/50"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-sm bg-forest px-6 py-3 font-body text-[11px] uppercase tracking-label text-white transition-colors hover:bg-forest-500"
            >
              <Search className="h-4 w-4" />
              <span className="sm:hidden">Search</span>
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-[11px] uppercase tracking-label text-white/80 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-label text-orange-accent transition-opacity hover:opacity-80"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Advanced Search
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
