"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageSquare } from "lucide-react";
import { buildWhatsAppUrl, WhatsAppReservationData } from "@/lib/whatsapp";

interface ReservationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationData: WhatsAppReservationData | null;
  bookingReference: string;
}

export default function ReservationSuccessModal({
  isOpen,
  onClose,
  reservationData,
  bookingReference,
}: ReservationSuccessModalProps) {
  // Handle keyboard ESC to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!reservationData) return null;

  const whatsappUrl = buildWhatsAppUrl(reservationData);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reservation-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-dark/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-surface-dark border border-border-dark/80 rounded-2xl p-6 md:p-8 shadow-2xl z-10 text-center overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-border-dark flex items-center justify-center text-text-gray hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={14} />
            </button>

            <div className="overflow-y-auto no-scrollbar pt-2 space-y-6">
              {/* Checkmark icon badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold"
              >
                <Check size={28} className="stroke-[1.75]" />
              </motion.div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-sans font-medium block">
                  Reservation Request Received
                </span>
                <h2
                  id="reservation-modal-title"
                  className="font-serif text-2xl md:text-3xl text-text-offwhite font-light tracking-wide"
                >
                  REQUEST RECEIVED
                </h2>
                <p className="font-sans text-xs md:text-sm text-text-gray/80 font-light leading-relaxed max-w-sm mx-auto pt-1">
                  Thank you for choosing Rich Inn Palace. <br />
                  Our reservation team will contact you shortly to confirm your stay.
                </p>
              </div>

              {/* Reservation Snapshot Card */}
              <div className="border border-border-dark/70 bg-bg-dark/40 rounded-xl p-4 md:p-5 text-left space-y-2.5 font-sans text-xs">
                <div className="flex justify-between border-b border-border-dark/40 pb-2">
                  <span className="text-text-gray/70">Request Reference</span>
                  <span className="text-gold font-semibold tracking-wider">{bookingReference}</span>
                </div>
                <div className="flex justify-between border-b border-border-dark/40 pb-2">
                  <span className="text-text-gray/70">Guest</span>
                  <span className="text-text-offwhite font-medium">{reservationData.guestName}</span>
                </div>
                <div className="flex justify-between border-b border-border-dark/40 pb-2">
                  <span className="text-text-gray/70">Sanctuary</span>
                  <span className="text-text-offwhite">{reservationData.roomName}</span>
                </div>
                {reservationData.propertyName && (
                  <div className="flex justify-between border-b border-border-dark/40 pb-2">
                    <span className="text-text-gray/70">Branch</span>
                    <span className="text-text-offwhite">{reservationData.propertyName}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-border-dark/40 pb-2">
                  <span className="text-text-gray/70">Dates</span>
                  <span className="text-text-offwhite">
                    {reservationData.checkIn} to {reservationData.checkOut} ({reservationData.duration})
                  </span>
                </div>
                <div className="flex justify-between border-b border-border-dark/40 pb-2">
                  <span className="text-text-gray/70">Guests</span>
                  <span className="text-text-offwhite">{reservationData.guests} Adults</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-text-gray/70">Estimated Total</span>
                  <span className="text-gold font-medium">{reservationData.estimatedTotal}</span>
                </div>
              </div>

              {/* CTA Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer"
                >
                  <MessageSquare size={14} className="stroke-[2]" />
                  <span>CONTINUE ON WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 border border-border-dark hover:border-gold/40 text-text-gray hover:text-text-offwhite text-xs uppercase tracking-[0.15em] font-medium rounded-full transition-all duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
