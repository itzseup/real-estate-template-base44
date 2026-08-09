import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS, SOCIAL_LINKS } from "@/data/site"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-shell px-[5%] py-16 md:py-20 xl:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          {/* Contact block */}
          <div>
            <Link to="/" className="font-display text-2xl">
              City Walk Real Estate LLC
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="mt-6 block font-display text-2xl transition-opacity hover:opacity-70 md:text-3xl"
            >
              {CONTACT.phone}
            </a>
            <p className="mt-6 font-body text-sm text-white/70">{CONTACT.company}</p>
            <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-white/70">
              {CONTACT.address}
            </p>
            <a
              href={CONTACT.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-body text-[11px] uppercase tracking-label text-orange-accent transition-opacity hover:opacity-70"
            >
              Get Directions
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="font-body text-[11px] uppercase tracking-label text-white/50">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/85 transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-body text-[11px] uppercase tracking-label text-white/50">
              Connect
            </h2>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-white/85 transition-opacity hover:opacity-60"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="font-body text-xs text-white/60 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-white/50">
            &copy; {year} {CONTACT.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
