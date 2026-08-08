import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { NAV_LINKS } from "@/data/site"

/** Small inline Union Jack used as the locale switch. */
function UkFlag({ className = "" }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" focusable="false">
      <clipPath id="uk-flag-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  )
}

export default function Header({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isOverHero = transparent && !scrolled && !menuOpen
  const shellClass = isOverHero
    ? "bg-transparent"
    : "bg-white shadow-[0_1px_20px_rgba(10,61,49,0.08)]"
  const textClass = isOverHero ? "text-white" : "text-forest"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shellClass}`}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-[5%] md:h-20 xl:px-10">
        <Link
          to="/"
          className={`font-display text-xl tracking-tight transition-colors md:text-2xl ${textClass}`}
        >
          White &amp; Co.
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body text-[11px] uppercase tracking-label transition-opacity hover:opacity-60 ${textClass} ${
                location.pathname === link.href ? "opacity-100" : "opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/blog"
            className={`hidden rounded-sm border px-5 py-2.5 font-display text-sm transition-colors md:inline-block ${
              isOverHero
                ? "border-white/70 text-white hover:bg-white hover:text-forest"
                : "border-forest/40 text-forest hover:bg-forest hover:text-white"
            }`}
          >
            Read Our Outlook
          </Link>

          <button
            type="button"
            className={`flex items-center transition-colors ${textClass}`}
            aria-label="Change region, currently United Kingdom"
          >
            <UkFlag className="h-4 w-7 rounded-[2px]" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`-mr-1 p-1 transition-colors ${textClass}`}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="site-menu" className="border-t border-forest/10 bg-white">
          <nav
            aria-label="Menu"
            className="mx-auto flex max-w-shell flex-col px-[5%] py-6 xl:px-10"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="border-b border-forest/10 py-3 font-display text-lg text-forest"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link to="/meet-the-team" className="font-body text-[11px] uppercase tracking-label text-forest/70">
                Meet The Team
              </Link>
              <Link to="/careers" className="font-body text-[11px] uppercase tracking-label text-forest/70">
                Careers
              </Link>
              <Link to="/contact" className="font-body text-[11px] uppercase tracking-label text-forest/70">
                Contact
              </Link>
              <Link to="/blog" className="font-body text-[11px] uppercase tracking-label text-forest/70">
                Read Our Outlook
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
