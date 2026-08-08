import { motion } from "framer-motion";
import { Award } from "lucide-react";

const credentials = [
  { icon: Award, label: "Luxury Collection Specialist", year: "Since 2008" },
  { icon: Award, label: "Top 1% Nationwide", year: "2019 – Present" },
  { icon: Award, label: "Best Real Estate Agency", year: "City Awards 2023" },
  { icon: Award, label: "Diamond Circle of Excellence", year: "2020 – Present" },
];

export default function CredentialsSection() {
  return (
    <section className="py-24 md:py-40 px-[4%] md:px-[2%] max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h2 className="font-display text-display-lg font-light mt-3">
            Credentials &<br />
            <span className="italic">Awards</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-6 leading-relaxed max-w-md">
            Our commitment to excellence has been recognized by the industry's 
            most prestigious organizations.
          </p>
        </div>
        <div className="space-y-0">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-6 border-b border-border/50 first:border-t flex items-center gap-5"
            >
              <cred.icon size={20} className="text-accent flex-shrink-0" />
              <div className="flex-1">
                <p className="font-display text-lg font-light">{cred.label}</p>
                <p className="font-body text-xs text-muted-foreground">{cred.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}