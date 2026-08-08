import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function ClientStories({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 md:py-40 px-[2%] max-w-[1400px] mx-auto">
      <div className="text-center mb-16">

        <h2 className="font-display text-display-lg font-light mt-3">
          Success <span className="italic">Stories</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <Quote size={48} className="text-border mx-auto mb-8" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed italic mb-8">
              "{testimonials[current].quote}"
            </blockquote>
            <div>
              <p className="font-body text-sm font-medium">{testimonials[current].client_name}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {testimonials[current].property_type && `${testimonials[current].property_type} · `}
                {testimonials[current].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="font-body text-xs text-muted-foreground">
              {current + 1} / {testimonials.length}
            </span>
            <button onClick={next} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}