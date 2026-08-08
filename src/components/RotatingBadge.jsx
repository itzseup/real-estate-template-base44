import { Circle, ShieldCheck, Clock } from "lucide-react"

const badges = [
  {
    label: "Verified",
    description: "Licensed & Insured",
    icon: ShieldCheck,
    variant: "default",
  },
  {
    label: "24/7 Support",
    description: "Around the clock",
    icon: Clock,
    variant: "secondary",
  },
  {
    label: "Premium",
    description: "High-end properties",
    icon: Circle,
    variant: "outline",
  },
]

export default function RotatingBadge({ property }) {
  if (!property?.badges) return null

  const badgeList = property.badges.split(",").map(b => b.trim()).filter(Boolean)

  return (
    <div className="flex flex-wrap gap-2">
      {badgeList.map((badge, i) => (
        <span
          key={i}
          className="inline-block px-2 py-1 bg-accent/10 text-accent font-body text-xs rounded-full"
        >
          {badge}
        </span>
      ))}
    </div>
  )
}

export function RotatingBadgeOpenHouse({ listing }) {
  if (!listing?.open_house) return null

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground font-body text-xs rounded-full">
      <Circle className="w-2 h-2 fill-current animate-pulse" />
      Open House
    </div>
  )
}

export { badges }
