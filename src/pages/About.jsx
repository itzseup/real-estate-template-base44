import React from "react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 md:py-40 px-[4%] md:px-[2%] max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-display text-display-xl font-light mt-3">
            About <span className="italic">Maison</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            For over two decades, Maison Estate has been the definitive authority in luxury real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div>
            <h2 className="font-display text-display-lg font-light mt-4 mb-8">
              Our <span className="italic">Philosophy</span>
            </h2>
            <p className="font-body text-muted-foreground leading-[1.8] mb-6">
              For over two decades, Maison Estate has been the definitive authority in luxury real estate.
              We don't simply list properties—we curate collections. Our philosophy is rooted in the belief
              that finding the right home is an act of self-expression, one that deserves the same care
              and sophistication as acquiring a masterwork of art.
            </p>
            <p className="font-body text-muted-foreground leading-[1.8]">
              Every client relationship begins with deep listening and culminates in life-changing results.
              Our team of advisors brings an unmatched combination of market intelligence, negotiation expertise,
              and an intimate understanding of the city's most coveted neighborhoods.
            </p>
          </div>
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497373703676-0ddc6ec2ad20?w=800&h=600&fit=crop"
              alt="Office interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-24">
          <div className="text-center">
            <div className="text-4xl font-display font-light mb-2">20+</div>
            <p className="font-body text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-light mb-2">$2B+</div>
            <p className="font-body text-sm text-muted-foreground">Annual Sales Volume</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-light mb-2">50+</div>
            <p className="font-body text-sm text-muted-foreground">Industry Awards</p>
          </div>
        </div>
      </section>
    </div>
  )
}
