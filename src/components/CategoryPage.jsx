import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import PropertyCard from "@/components/PropertyCard"
import Seo from "@/components/Seo"
import { DEFAULT_OG_IMAGE, breadcrumbSchema } from "@/lib/seo"

/**
 * Shared marketing shell for the listing categories (rent, off plan,
 * commercial). Listings come from the Supabase-backed client; when it is not
 * configured the list is empty and the page shows an enquiry-led empty state.
 *
 * @param {object} props
 * @param {string} props.eyebrow    Small uppercase label above the headline.
 * @param {string} props.title      Section headline.
 * @param {string} props.intro      Supporting paragraph.
 * @param {string} props.image      Full-bleed banner image URL.
 * @param {string} [props.seoTitle]  SEO <title> (falls back to title).
 * @param {string} [props.seoDescription] SEO description.
 * @param {string} [props.seoUrl]   Canonical URL path.
 * @param {(property: object) => boolean} [props.filterFn] Client-side listing filter.
 */
export default function CategoryPage({ eyebrow, title, intro, image, seoTitle, seoDescription, seoUrl, filterFn }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadProperties() {
      try {
        const data = await base44.entities.Property.list("-created_date", 100)
        const visible = filterFn ? data.filter(filterFn) : data
        if (!cancelled) setProperties(visible)
      } catch {
        if (!cancelled) setProperties([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProperties()
    return () => {
      cancelled = true
    }
  }, [filterFn])

  return (
    <div className="bg-white">
      <Seo
        title={seoTitle || title}
        description={seoDescription}
        image={DEFAULT_OG_IMAGE}
        url={seoUrl}
        schema={breadcrumbSchema([
          { name: "Home", url: "https://citywalkrealestatellc.com" },
          { name: title, url: `https://citywalkrealestatellc.com${seoUrl || "/"}` },
        ])}
      />
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-forest">
        <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="absolute inset-0 mx-auto flex max-w-shell flex-col justify-end px-[5%] pb-12 xl:px-10">
          <p className="font-body text-[11px] uppercase tracking-label text-white/70">{eyebrow}</p>
          <h1 className="mt-3 font-display text-display-lg text-white">{title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-[5%] py-16 md:py-24 xl:px-10">
        <p className="max-w-2xl font-body text-base leading-relaxed text-forest/70">{intro}</p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
          </div>
        ) : properties.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-sm border border-forest/10 bg-cream p-10 text-center md:p-16">
            <h2 className="font-display text-display-md text-forest">
              Tell us what you are looking for
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base leading-relaxed text-forest/70">
              New instructions in this category are matched to buyers before they reach the portals.
              Send us your brief and an advisor will come back with what is available now.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-sm bg-forest px-7 py-3 font-body text-[11px] uppercase tracking-label text-white transition-colors hover:bg-forest-500"
            >
              Speak to an advisor
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
