import { Link } from "react-router-dom"
import { TEAM_IMAGE } from "@/data/site"

/** Full-bleed associate directors image + the "Life at City Walk Real Estate LLC" copy block. */
export default function TeamShowcase() {
  return (
    <>
      <section className="bg-white">
        <figure className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <img
            src={TEAM_IMAGE}
            alt="City Walk Real Estate LLC associate directors"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-6 md:p-10">
            <span className="font-body text-[11px] uppercase tracking-label text-white/85">
              Associate Directors 2026
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-shell px-[5%] xl:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-display-lg text-forest">Life at City Walk Real Estate LLC</h2>
            <p className="mt-6 font-body text-base leading-relaxed text-forest/70">
              We hire people who want to build a career, not close a single deal. New advisors are
              trained on the communities they will cover, shadow senior brokers on live listings, and
              are held to the same standard from their first viewing onwards.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-forest/70">
              The result is a team that stays. Clients deal with the same faces across a purchase, a
              tenancy renewal and a resale years later — and that continuity is what makes the whole
              process feel handled rather than transactional.
            </p>
            <Link
              to="/careers"
              className="mt-8 inline-block rounded-sm border border-forest/40 px-6 py-3 font-display text-sm text-forest transition-colors hover:bg-forest hover:text-white"
            >
              Join the team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
