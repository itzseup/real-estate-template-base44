import { ShieldCheck } from "lucide-react"

export default function AdminRoute({ children }) {
  // This is a simple placeholder - you'd want to integrate this with
  // your actual auth system (Supabase Auth, Clerk, etc.)
  
  const isAdmin = false // Replace with actual admin check

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center max-w-md px-4">
          <ShieldCheck size={48} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-display text-2xl font-light mb-4">Admin Access Required</h1>
          <p className="font-body text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  return children
}
