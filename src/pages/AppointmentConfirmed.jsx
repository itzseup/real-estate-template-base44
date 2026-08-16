import { Link } from "react-router-dom"
import { Check } from "lucide-react"

export default function AppointmentConfirmedPage() {
  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <div className="max-w-[500px] mx-auto text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h1 className="font-display text-display-xl font-light mt-3 mb-6">
          Appointment <span className="italic">Confirmed</span>
        </h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          Your appointment request has been submitted successfully. One of our advisors
          will contact you shortly to confirm the details. A confirmation email has also
          been sent to the address you provided.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
