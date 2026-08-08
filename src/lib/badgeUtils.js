export function getBadgeForProperty(property) {
  if (!property) return {}

  const badges = []

  // Price badge
  if (property.price) {
    badges.push({
      label: `$${property.price.toLocaleString()}`,
      variant: "default",
    })
  }

  // Type badge
  if (property.property_type) {
    let variant = "secondary"
    let label = property.property_type

    if (label.toLowerCase().includes("penthouse")) {
      variant = "destructive"
    }

    badges.push({
      label,
      variant,
    })
  }

  // Status badge
  if (property.status) {
    let variant = "default"
    let label = property.status

    if (label.toLowerCase() === "sold") {
      variant = "secondary"
    } else if (label.toLowerCase() === "pending") {
      variant = "outline"
    } else if (label.toLowerCase() === "new") {
      variant = "destructive"
    }

    badges.push({
      label,
      variant,
    })
  }

  return {
    badges: badges.length > 0 ? badges : undefined,
  }
}
