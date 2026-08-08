import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Footer from "./Footer"

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Our Team", href: "/our-team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}>
        <div className="px-[4%] md:px-[2%] h-16 md:h-20 flex items-center justify-between max-w-[1400px] mx-auto">
          <Link to="/" className="font-display text-xl font-light">
            Maison Estate
          </Link>
          <nav className="flex items-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-xs tracking-label uppercase transition-colors ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content with top padding for fixed header */}
      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
