import CategoryPage from "@/components/CategoryPage"

const isOffPlan = (property) => String(property.status || "").toLowerCase() === "off plan"

export default function OffPlanPage() {
  return (
    <CategoryPage
      eyebrow="Off Plan"
      title="Off Plan in Dubai"
      intro="Launches, payment plans and handover timelines from the developers we work with directly. We check the escrow position and the construction record before we put a project in front of you."
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
      filterFn={isOffPlan}
    />
  )
}
