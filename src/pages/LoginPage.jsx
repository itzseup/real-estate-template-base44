import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import Seo from "@/components/Seo"
import { Lock } from "lucide-react"

/**
 * LoginPage — standalone login at /login.
 *
 * After a successful login, the user is redirected to /admin (or wherever
 * they were trying to go). If Supabase is not configured, a demo login
 * screen is shown so the admin panel is usable in development.
 */
export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Where to send the user after login — default to /admin
  const from = location.state?.from || "/admin"

  const supabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL

  // Demo login for development without Supabase
  const [demoMode] = useState(!supabaseConfigured)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return

    if (demoMode) {
      // Simple demo auth — store flag in localStorage and navigate
      localStorage.setItem("demo_admin_logged_in", "true")
      navigate(from, { replace: true })
      return
    }

    setSubmitting(true)
    setError("")
    try {
      const { error: signInError } = await signIn(email, password)
      if (signInError) {
        setError(signInError.message || "Invalid email or password.")
      } else {
        navigate(from, { replace: true })
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <Seo
        title="Login"
        description="Login to the admin dashboard."
        url="/login"
        noIndex
      />
      <div className="max-w-[480px] mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Lock className="h-12 w-12 text-forest" />
        </div>
        <h1 className="font-display text-display-xl font-light text-center mb-4">
          Admin Login
        </h1>
        <p className="font-body text-center text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          Sign in to manage properties and agents.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg font-body text-sm ${
                error ? "border-destructive" : "border-border"
              }`}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg font-body text-sm ${
                error ? "border-destructive" : "border-border"
              }`}
              placeholder="password"
            />
          </div>
          {error && (
            <p className="font-body text-sm text-destructive">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-forest text-white font-body text-xs tracking-label uppercase hover:bg-forest/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {demoMode && (
          <p className="mt-4 font-body text-xs text-muted-foreground text-center">
            Demo mode — any email and password works.
          </p>
        )}
      </div>
    </div>
  )
}
