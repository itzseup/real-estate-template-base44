import { useState, useEffect } from "react"

/**
 * Appointment booking form for the public-facing main site.
 * Lets a visitor pick an agent, choose a date+time window, and optionally
 * leave contact details. The submission creates a Convex `booking` row with
 * status "pending" which the agent / admin can confirm or reassign.
 *
 * @param agents   — list of agent docs { id, name, email }
 * @param onSubmit — (data) => Promise<void> called with the booking payload
 * @param defaultAgent — agent.id to pre-select (e.g. from ?agent= query param)
 */
export default function AppointmentForm({ agents, onSubmit, defaultAgent = "" }) {
  const [agentId, setAgentId] = useState(defaultAgent)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Sync defaultAgent when it changes (e.g. user navigates from different agent cards)
  useEffect(() => {
    setAgentId(defaultAgent)
  }, [defaultAgent])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!agentId) newErrors.agent = "Please select an agent"
    if (!customerName) newErrors.customerName = "Name is required"
    if (!date) newErrors.date = "Date is required"
    if (!startTime) newErrors.startTime = "Start time is required"
    if (!endTime) newErrors.endTime = "End time is required"

    if (Object.keys(newErrors).length > 0) {
      console.error("Validation errors:", newErrors)
      alert("Please fill in all required fields.")
      return
    }

    // Build epoch timestamps from date + time
    const start = Date.parse(`${date}T${startTime}`)
    const end = Date.parse(`${date}T${endTime}`)
    if (end <= start) {
      alert("End time must be after start time.")
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        agent_id: agentId,
        customer_name: customerName,
        customer_email: customerEmail || undefined,
        customer_phone: customerPhone || undefined,
        title: title || undefined,
        start_time: start,
        end_time: end,
        status: "pending",
        notes: undefined,
      })
      alert("Your appointment has been booked! We'll confirm via email soon.")
      // Reset form
      setAgentId(defaultAgent)
      setCustomerName("")
      setCustomerEmail("")
      setCustomerPhone("")
      setTitle("")
      setDate("")
      setStartTime("")
      setEndTime("")
    } catch (error) {
      console.error("Error submitting appointment:", error)
      alert("There was an error booking your appointment. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Time options in 30-minute increments (local 9am–6pm)
  const timeOptions = []
  for (let h = 9; h < 19; h++) {
    timeOptions.push(`${String(h).padStart(2, "0")}:00`)
    timeOptions.push(`${String(h).padStart(2, "0")}:30`)
  }
  // Today's date as the minimum
  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Agent selection */}
      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Select Agent *
        </label>
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
        >
          <option value="">— Choose an agent —</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} — {agent.email}
            </option>
          ))}
        </select>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          />
        </div>
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Email *
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Phone
        </label>
        <input
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          placeholder="+971 50 123 4567"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
          Appointment Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          placeholder="e.g. Property viewing, consultation"
        />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={today}
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          />
        </div>
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            Start Time *
          </label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          >
            <option value="">— Start —</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
            End Time *
          </label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
          >
            <option value="">— End —</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {submitting ? "Booking…" : "Book Appointment"}
      </button>
    </form>
  )
}
