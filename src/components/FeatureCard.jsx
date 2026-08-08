import { Link } from "react-router-dom"

export default function FeatureCard({ title, description, icon: Icon, href }) {
  return (
    <Link to={href} className="group block">
      <div className="p-6 border border-border/50 rounded-lg hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          {Icon && <Icon size={24} className="text-accent flex-shrink-0" />}
          <h3 className="font-display text-lg font-light">{title}</h3>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  )
}
