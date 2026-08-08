import { useState } from "react"

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property_value: "",
    address: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for your submission. We'll contact you shortly for a free consultation.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      property_value: "",
      address: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-display-xl font-light mt-3">
            Sell Your <span className="italic">Property</span>
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            Get a free, no-obligation property valuation from our experts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                Full Name
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
              <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                Estimated Property Value
              </label>
              <select
                name="property_value"
                value={formData.property_value}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg"
              >
                <option value="">Select Range</option>
                <option value="<500k">Under $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-2m">$1M - $2M</option>
                <option value="2m-5m">$2M - $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
              Property Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
              Additional Information
            </label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg resize-none"
              placeholder="Any additional details about your property..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors"
          >
            Get Free Valuation
          </button>
        </form>
      </div>
    </div>
  )
}
