import { Link } from "react-router-dom"
import { Clock, Phone, Mail, CheckCircle } from "lucide-react"
import Seo from "@/components/Seo"
import { CONTACT } from "@/data/site"

/**
 * InquiryPage — shown after a visitor submits their phone number or contact
 * details from the Contact page or a property listing.
 *
 * It confirms the submission, displays the quick-response guarantee, and
 * gives them a direct line to call if they'd rather speak to an agent now.
 */
export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <Seo
        title="Inquiry Received"
        description="Thank you for your inquiry. One of our advisors will contact you within 24 hours."
        url="/inquiry-received"
        noIndex
      />
      <div className="max-w-[600px] mx-auto">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="font-display text-display-xl font-light text-center mb-6">
          Thank You
        </h1>

        <p className="font-body text-center text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          Your inquiry has been received. One of our advisors will contact you
          within 24 hours to discuss your requirements.
        </p>

        {/* Quick Response Guarantee */}
        <div className="bg-secondary/30 border border-border/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-forest mt-0.5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-light text-forest mb-2">
                Our 24-Hour Guarantee
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                We guarantee a response within 24 hours of receiving your inquiry.
                If for any reason you haven't heard from us within that window,
                please call us directly — we'll make it right.
              </p>
            </div>
          </div>
        </div>

        {/* Direct contact options */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 border border-border/20 rounded-lg">
            <Phone className="h-5 w-5 text-forest" />
            <div>
              <p className="font-body text-sm font-medium">Call us now</p>
              <a
                href={CONTACT.phoneHref}
                className="font-body text-sm text-forest hover:text-orange-accent transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-border/20 rounded-lg">
            <Mail className="h-5 w-5 text-forest" />
            <div>
              <p className="font-body text-sm font-medium">Email us</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-body text-sm text-forest hover:text-orange-accent transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-forest text-white font-body text-xs tracking-label uppercase hover:bg-forest/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
