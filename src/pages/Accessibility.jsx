import React from "react"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 md:py-40 px-[4%] md:px-[2%] max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-display text-display-xl font-light mt-3">
            Accessibility <span className="italic">Statement</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            We are committed to ensuring digital accessibility for all users.
          </p>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="font-display text-display-md font-light mb-4">Our Commitment</h2>
          <p className="font-body text-muted-foreground leading-[1.8]">
            Maison Estate is committed to ensuring digital accessibility for all users, including those with disabilities.
            We continually improve the user experience for everyone and apply relevant accessibility standards.
          </p>

          <h2 className="font-display text-display-md font-light mb-4 mt-8">Conformance Status</h2>
          <p className="font-body text-muted-foreground leading-[1.8]">
            The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA are international standards that apply to web content.
          </p>

          <h2 className="font-display text-display-md font-light mb-4 mt-8">Feedback</h2>
          <p className="font-body text-muted-foreground leading-[1.8]">
            If you experience accessibility barriers on our website, please contact us. We aim to respond within 5 business days.
          </p>
        </div>
      </section>
    </div>
  )
}
