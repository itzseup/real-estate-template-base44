import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Header({ transparent = true }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const bgClass = transparent 
    ? (scrolled ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent")
    : "bg-white border-b border-border"
  
  const textClass = transparent 
    ? (scrolled ? "text-foreground" : "text-white")
    : "text-foreground"

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Sell", href: "/sell" },
    { name: "About", href: "/about" },
    { name: "Our Team", href: "/our-team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${bgClass}`}
    >
      <div className="px-[4%] md:px-[2%] h-16 md:h-20 flex items-center justify-between max-w-[1400px] mx-auto">
        <Link to="/" className={`font-display text-xl md:text-2xl font-light ${textClass}`}>
          Maison Estate
        </Link>
        <nav className="flex items-center gap-4 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-xs tracking-label uppercase transition-colors ${
                location.pathname === link.href
                  ? "text-accent"
                  : `text-muted-foreground hover:text-foreground`
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
