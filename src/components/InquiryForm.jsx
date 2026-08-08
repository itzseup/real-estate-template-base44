import { useState } from "react"

export default function InquiryForm({ propertyId, onSubmit }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
    inquiry_type: "General",
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors = {}
    if (!formData.full_name) newErrors.full_name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.message) newErrors.message = "Message is required"
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      const data = {
        ...formData,
        property_id: propertyId,
        status: "New",
      }
      
      if (onSubmit) {
        await onSubmit(data)
      }
      
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        message: "",
        inquiry_type: "General",
      })
      
      alert("Your inquiry has been sent! We'll contact you soon.")
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      alert("There was an error sending your inquiry. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg font-body text-sm ${
              errors.full_name ? "border-destructive" : "border-border"
            }`}
          />
          {errors.full_name && (
            <p className="text-destructive text-xs mt-1 font-body">{errors.full_name}</p>
          )}
        </div>
        
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg font-body text-sm ${
              errors.email ? "border-destructive" : "border-border"
            }`}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
        />
      </div>

      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Inquiry Type
        </label>
        <select
          name="inquiry_type"
          value={formData.inquiry_type}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
        >
          <option value="General">General Inquiry</option>
          <option value="Tour Request">Tour Request</option>
          <option value="Price Inquiry">Price Inquiry</option>
          <option value="Virtual Tour">Virtual Tour</option>
        </select>
      </div>

      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg font-body text-sm resize-none ${
            errors.message ? "border-destructive" : "border-border"
          }`}
        />
        {errors.message && (
          <p className="text-destructive text-xs mt-1 font-body">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  )
}
