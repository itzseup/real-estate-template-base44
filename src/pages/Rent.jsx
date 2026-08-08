import CategoryPage from "@/components/CategoryPage"

const isRental = (property) =>
  !property.listing_type || String(property.listing_type).toLowerCase() === "rent"

export default function RentPage() {
  return (
    <CategoryPage
      eyebrow="Rent"
      title="Rent in Dubai"
      intro="Long-let apartments, villas and townhouses across the communities we cover. We handle viewings, Ejari, cheques and the handover inventory so a tenancy starts without loose ends."
      image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80"
      filterFn={isRental}
    />
  )
}
