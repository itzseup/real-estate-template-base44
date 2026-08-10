import { useNavigate } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import InquiryForm from "@/components/InquiryForm"
import { DEFAULT_OG_IMAGE, breadcrumbSchema } from "@/lib/seo"

export default function ContactPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    await base44.entities.Inquiry.create(data)
    // After a successful submission, send the visitor to the confirmation
    // page where they see the quick-response guarantee and direct contact info.
    navigate("/inquiry-received")
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <div className="max-w-[600px] mx-auto">
        <Seo
          title="Contact"
          description="Get in touch with City Walk Real Estate LLC for UAE real estate inquiries. Fill out our form and we'll respond within 24 hours."
          image={DEFAULT_OG_IMAGE}
          url="/contact"
          schema={breadcrumbSchema([
            { name: "Home", url: "https://citywalkrealestatellc.com" },
            { name: "Contact", url: "https://citywalkrealestatellc.com/contact" },
          ])}
        />
        <h1 className="font-display text-display-xl font-light mt-3 mb-8">
          Get in <span className="italic">Touch</span>
        </h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          We'd love to hear from you. Fill out the form below and one of our
          advisors will get back to you.
        </p>

        <div className="bg-secondary/30 border border-border/20 rounded-lg p-6 md:p-8 mb-8">
          <InquiryForm onSubmit={handleSubmit} />
        </div>

        <div className="text-center">
          <p className="font-body text-sm text-muted-foreground mb-4">
            Prefer to call now?
          </p>
          <a
            href="tel:+971566036117"
            className="inline-block px-6 py-3 bg-forest text-white font-body text-xs tracking-label uppercase hover:bg-forest/90 transition-colors"
          >
            +971 56 603 6117
          </a>
        </div>
      </div>
    </div>
  )
}
