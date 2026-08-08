import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

/**
 * Site chrome shared by every route.
 *
 * `transparent` renders the header over a full-bleed hero (home page); every
 * other route gets the solid white header and matching top padding so content
 * is not hidden behind the fixed bar.
 */
export default function Layout({ children, transparent = false }) {
  const { pathname } = useLocation()

  // Reset scroll on navigation so a new page never opens mid-way down.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header transparent={transparent} />
      <main className={`flex-1 ${transparent ? "" : "pt-16 md:pt-20"}`}>{children}</main>
      <Footer />
    </div>
  )
}
