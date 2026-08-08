import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <section className="px-[4%] md:px-[2%] max-w-[1400px] mx-auto mb-24 md:mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-display-xl font-light mt-4 mb-8">
            A Legacy of<br />
            <span className="italic">Distinction</span>
          </h1>
          <p className="font-body text-muted-foreground leading-[1.8] mb-6">
            For over two decades, Maison Estate has been the definitive authority in luxury real estate. 
            We don't simply list properties—we curate collections. Our philosophy is rooted in the belief 
            that finding the right home is an act of self-expression, one that deserves the same care 
            and sophistication as acquiring a masterwork of art.
          </p>
          <p className="font-body text-muted-foreground leading-[1.8]">
            Every client relationship begins with deep listening and culminates in life-changing results. 
            Our team of advisors brings an unmatched combination of market intelligence, negotiation expertise, 
            and an intimate understanding of the city's most coveted neighborhoods.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden"
        >
          <img
            src="https://media.base44.com/images/public/6a0c3ea982f98940623f21f5/a725d6d49_ConstructionsWebsite_Gemini3NanoBananaPro_2026-03-11_19-19-00.png"
            alt="Modern architecture office"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}