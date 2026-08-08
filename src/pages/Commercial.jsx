import CategoryPage from "@/components/CategoryPage"

const isCommercial = (property) =>
  String(property.property_type || "").toLowerCase().includes("commercial")

export default function CommercialPage() {
  return (
    <CategoryPage
      eyebrow="Commercial"
      title="Commercial Property in Dubai"
      intro="Offices, retail units, warehouses and whole floors — for occupiers who need space that works and investors who need a yield that holds. Fit-out condition, service charge and permitted use are checked before we list."
      image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
      filterFn={isCommercial}
    />
  )
}
