import { Link } from "react-router-dom"

const ROLES = [
  {
    title: "Property Consultant — Secondary Sales",
    location: "Motor City, Dubai",
    type: "Full time",
    summary:
      "Own a community, build a listing base and take clients from first viewing to transfer at the DLD.",
  },
  {
    title: "Leasing Advisor",
    location: "Motor City, Dubai",
    type: "Full time",
    summary:
      "Handle landlord instructions and tenant enquiries across long-let apartments and villas.",
  },
  {
    title: "Off Plan Specialist",
    location: "Motor City, Dubai",
    type: "Full time",
    summary: "Work directly with developers on launches, allocations and investor payment plans.",
  },
  {
    title: "Marketing Executive",
    location: "Motor City, Dubai",
    type: "Full time",
    summary: "Run listing campaigns, community guides and the video pipeline across our channels.",
  },
]

export default function CareersPage() {
  return (
    <div className="bg-white">
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-forest">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest/65" />
        <div className="absolute inset-0 mx-auto flex max-w-shell flex-col justify-end px-[5%] pb-12 xl:px-10">
          <p className="font-body text-[11px] uppercase tracking-label text-white/70">Careers</p>
          <h1 className="mt-3 font-display text-display-lg text-white">Build a career here</h1>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-[5%] py-16 md:py-24 xl:px-10">
        <p className="max-w-2xl font-body text-base leading-relaxed text-forest/70">
          We train advisors on the communities they cover, pair them with senior brokers on live
          instructions, and give them the marketing support to build a real listing base. If you
          want a desk for a season, this is not the place. If you want a career, talk to us.
        </p>

        <div className="mt-14 divide-y divide-forest/10 border-y border-forest/10">
          {ROLES.map((role) => (
            <article
              key={role.title}
              className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between"
            >
              <div className="max-w-xl">
                <h2 className="font-display text-xl text-forest md:text-2xl">{role.title}</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-forest/70">
                  {role.summary}
                </p>
                <p className="mt-3 font-body text-[11px] uppercase tracking-label text-forest/50">
                  {role.location} — {role.type}
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 self-start rounded-sm border border-forest/40 px-6 py-3 font-display text-sm text-forest transition-colors hover:bg-forest hover:text-white md:self-auto"
              >
                Apply now
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-sm bg-cream p-10 md:p-14">
          <h2 className="font-display text-display-md text-forest">Nothing listed that fits you?</h2>
          <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-forest/70">
            Send us your details anyway. We keep an open list and speak to strong candidates before
            a role goes public.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-sm bg-forest px-7 py-3 font-body text-[11px] uppercase tracking-label text-white transition-colors hover:bg-forest-500"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
