import { UserX } from "lucide-react"

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24">
      <div className="text-center max-w-md px-4">
        <UserX size={48} className="mx-auto text-muted-foreground mb-6" />
        <h1 className="font-display text-2xl font-light mb-4">Account Not Registered</h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          Your account is not registered in our system. Please contact support
          or sign up for an account to continue.
        </p>
        <a
          href="/signup"
          className="inline-block px-6 py-3 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors"
        >
          Create Account
        </a>
      </div>
    </div>
  )
}
