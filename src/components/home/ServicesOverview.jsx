import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Property Valuation",
    description: "Accurate, data-driven property valuations to help you make informed decisions.",
    icon: "🏡",
  },
  {
    title: "Market Analysis",
    description: "Comprehensive market reports and insights for buyers, sellers, and investors.",
    icon: "📊",
  },
  {
    title: "Buyer Representation",
    description: "Expert guidance through the entire home-buying process.",
    icon: "🤝",
  },
  {
    title: "Seller Advisory",
    description: "Strategic selling plans designed to maximize your property's value.",
    icon: "📈",
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-24 md:py-40 bg-secondary/30">
      <div className="px-[4%] md:px-[2%] max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-display-lg font-light mt-3">
            Our <span className="italic">Services</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            Comprehensive real estate services tailored to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-8 rounded-lg border border-border"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-display text-xl font-light mb-3">{service.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
