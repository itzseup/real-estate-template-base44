import { useState } from "react"
import { base44 } from "@/api/base44Client"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property_id: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await base44.entities.Inquiry.create(formData)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting inquiry:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[600px] mx-auto text-center">
          <h1 className="font-display text-display-lg font-light mb-6">Thank You</h1>
          <p className="font-body text-muted-foreground leading-relaxed">
            Thank you for reaching out. One of our advisors will contact you within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <div className="max-w-[600px] mx-auto">
        <h1 className="font-display text-display-xl font-light mt-3 mb-8">
          Get in <span className="italic">Touch</span>
        </h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          We'd love to hear from you. Fill out the form below and one of our advisors will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-body text-sm tracking-label uppercase text-muted-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-body text-sm tracking-label uppercase text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-body text-sm tracking-label uppercase text-muted-foreground mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-body text-sm tracking-label uppercase text-muted-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-foreground text-background font-body text-sm tracking-label uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}
