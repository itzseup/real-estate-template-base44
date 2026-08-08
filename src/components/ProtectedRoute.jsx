import { Link } from "react-router-dom"
import { ShieldCheck, UserCheck } from "lucide-react"

export default function ProtectedRoute({ children, requiredRole = "admin" }) {
  // This is a simple placeholder - you'd want to integrate this with
  // your actual auth system (Supabase Auth, Clerk, etc.)
  
  // Check if user is authenticated
  const isAuthenticated = false // Replace with actual auth check
  const hasRole = false // Replace with actual role check

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center max-w-md px-4">
          <UserCheck size={48} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-display text-2xl font-light mb-4">Authentication Required</h1>
          <p className="font-body text-muted-foreground mb-6">
            You need to be logged in to access this page.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (requiredRole && !hasRole) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center max-w-md px-4">
          <ShieldCheck size={48} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-display text-2xl font-light mb-4">Access Denied</h1>
          <p className="font-body text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  return children
}
