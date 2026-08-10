import { TRUST_STATS } from "@/data/site"

export default function TrustStats() {
  return (
    <section className="border-y border-forest/10 bg-[#f2f1ee]">
      <div className="mx-auto grid max-w-shell grid-cols-2 gap-8 px-[5%] py-10 md:grid-cols-4 md:py-12 xl:px-10">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-display text-2xl text-forest md:text-3xl">{stat.value}</p>
            <p className="mt-2 font-body text-[11px] uppercase tracking-label text-forest/60">
              {stat.label}
            </p>
            <p className="mt-1 font-body text-sm text-forest/70">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
