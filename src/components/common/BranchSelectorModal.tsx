"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin } from "lucide-react";
import { Room, Branch } from "@/lib/data";

interface BranchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onSelectBranch: (branch: Branch) => void;
}

export default function BranchSelectorModal({
  isOpen,
  onClose,
  room,
  onSelectBranch,
}: BranchSelectorModalProps) {
  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-dark/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-surface-dark border border-border-dark/80 rounded-2xl p-6 md:p-10 shadow-2xl z-10 text-left overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-border-dark flex items-center justify-center text-text-gray hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer"
              aria-label="Close branch selector"
            >
              <X size={14} />
            </button>

            <div className="overflow-y-auto no-scrollbar pr-1">
              {/* Header */}
              <div className="mb-8">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-sans font-medium mb-2.5 block">
                  § Select Preferred Sanctuary
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-text-offwhite font-light tracking-wide mb-3">
                  Choose Your Branch Location
                </h2>
                <p className="font-sans text-xs md:text-sm text-text-gray/80 font-light leading-relaxed max-w-lg">
                  We offer multiple distinguished properties in the{" "}
                  <span className="text-text-offwhite font-medium">{room.name}</span> district.
                  Which branch would you like to explore today?
                </p>
              </div>

              {/* Branches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {room.branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => onSelectBranch(branch)}
                    className="border border-border-dark/70 bg-bg-dark/30 hover:bg-gold/[0.03] hover:border-gold/30 rounded-xl p-5 md:p-6 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer group w-full focus:outline-none focus:border-gold/40"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-lg text-text-offwhite font-light group-hover:text-gold transition-colors duration-300">
                          {branch.name.split(" — ")[1] || branch.name}
                        </h3>
                        <div className="w-6 h-6 rounded-full border border-border-dark/60 flex items-center justify-center text-text-gray group-hover:border-gold group-hover:bg-gold group-hover:text-bg-dark transition-all duration-300">
                          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <p className="text-xs text-text-gray/70 leading-relaxed font-sans font-light mb-4">
                        {branch.description}
                      </p>
                    </div>

                    <div className="w-full text-[10px] text-text-gray/50 font-sans font-light leading-relaxed flex items-start border-t border-border-dark/30 pt-3 mt-auto">
                      <MapPin size={11} className="mr-1.5 text-gold/60 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
