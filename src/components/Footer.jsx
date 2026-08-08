import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="px-[4%] md:px-[2%] py-12 md:py-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display text-lg font-light mb-4">Maison Estate</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              For over two decades, Maison Estate has been the definitive authority in luxury real estate.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-sm font-light mb-4 uppercase tracking-label text-muted-foreground">
              Pages
            </h4>
            <ul className="space-y-3 font-body">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/properties" className="text-muted-foreground hover:text-foreground transition-colors">Properties</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-sm font-light mb-4 uppercase tracking-label text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-3 font-body">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Buy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sell</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Rent</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Commercial</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-sm font-light mb-4 uppercase tracking-label text-muted-foreground">
              Contact
            </h4>
            <ul className="space-y-3 font-body">
              <li><a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground transition-colors">+1 (234) 567-8900</a></li>
              <li><a href="mailto:info@maisonestate.com" className="text-muted-foreground hover:text-foreground transition-colors">info@maisonestate.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center font-body text-sm text-muted-foreground">
          <p>&copy; 2024 Maison Estate. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
