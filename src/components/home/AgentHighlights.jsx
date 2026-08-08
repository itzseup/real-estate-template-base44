import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AgentHighlights({ agents }) {
  if (!agents || agents.length === 0) return null;

  return (
    <section className="py-24 md:py-40 bg-secondary/30">
      <div className="px-[2%] max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
              <h2 className="font-display text-display-lg font-light mt-3">
              Meet the <span className="italic">Advisors</span>
            </h2>
          </div>
          <Link
            to="/our-team"
            className="hidden md:block font-body text-xs tracking-label uppercase text-muted-foreground hover:text-accent transition-colors"
          >
            Full Team →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {agents.slice(0, 3).map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light">{agent.name}</h3>
              <p className="font-body text-xs tracking-label uppercase text-accent mt-1">{agent.title}</p>
              {agent.total_sales_volume && (
                <p className="font-body text-sm text-muted-foreground mt-3">
                  {agent.total_sales_volume} in Sales
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}