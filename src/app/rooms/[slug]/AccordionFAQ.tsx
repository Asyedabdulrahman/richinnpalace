"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  faqs: FAQItem[];
}

export default function AccordionFAQ({ faqs }: AccordionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-border-dark/60 rounded-xl bg-surface-dark/20 overflow-hidden transition-colors duration-300"
          >
            {/* Header / Question button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left font-serif text-base text-text-offwhite font-light hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={16}
                className={cn(
                  "text-gold/60 transition-transform duration-500 ease-out",
                  isOpen && "transform rotate-180 text-gold"
                )}
              />
            </button>

            {/* Answer body panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-5 pt-0 border-t border-border-dark/30 font-sans text-xs md:text-sm text-text-gray font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
