import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

export default function MarketInsights({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 md:py-40 bg-secondary/30">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-display-lg font-light mt-3">
            Insights & <span className="italic">Analysis</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              {post.featured_image && (
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
              )}
              <p className="font-body text-xs tracking-label uppercase text-accent mb-3">
                {post.category}
                {post.read_time && ` · ${post.read_time} min read`}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-light mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-body text-xs tracking-label uppercase text-foreground group-hover:text-accent transition-colors">
                Read More <ArrowRight size={12} />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}