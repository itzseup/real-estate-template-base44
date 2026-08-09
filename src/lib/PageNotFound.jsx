import { Link } from "react-router-dom"
import Seo from "@/components/Seo"

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24">
      <div className="text-center max-w-md px-4">
        <Seo
          title="404 — Page Not Found"
          description="The page you're looking for doesn't exist or has been moved. Return to City Walk Real Estate LLC for UAE real estate services."
          noIndex
        />
        <h1 className="font-display text-display-xl font-light mb-6">404</h1>
        <h2 className="font-display text-xl font-light mb-4">Page Not Found</h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-foreground text-background font-body text-xs tracking-label uppercase hover:bg-foreground/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
