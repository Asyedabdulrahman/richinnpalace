"use client";

import { motion, Variants } from "framer-motion";
import { manifesto } from "@/lib/data";

export default function ManifestoSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="manifesto" className="py-12 md:py-18 bg-bg-dark border-b border-border-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left Column: Sticky Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:h-fit text-left flex flex-col items-start justify-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium mb-3 block">
              03 · OUR MANIFESTO & TARIFFS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-text-offwhite font-light tracking-wide leading-[1.15] mb-6">
              Six things we <br />
              quietly promise.
            </h2>
            <p className="font-sans text-xs tracking-wide leading-relaxed text-text-gray/80 font-light max-w-xl">
              Transparent luxury tariffs, 24-hour check-in flexibility, complimentary South Indian breakfast buffets, and 24/7 room service across our prime T. Nagar properties.
            </p>
          </div>

          {/* Right Column: Promises List */}
          <div className="lg:col-span-8 lg:pl-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="divide-y divide-border-dark/60"
            >
              {manifesto.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="py-6 first:pt-0 last:pb-0 group"
                >
                  {/* Content */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl md:text-2xl text-text-offwhite font-light group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-text-gray/90 font-light leading-relaxed max-w-xl">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
