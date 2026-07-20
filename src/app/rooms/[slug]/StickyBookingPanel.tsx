"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Calendar, Users, Info, ShieldCheck } from "lucide-react";

interface StickyBookingPanelProps {
  roomPrice: number;
  roomId: string;
}

export default function StickyBookingPanel({ roomPrice, roomId }: StickyBookingPanelProps) {
  const router = useRouter();

  // Get default dates (tomorrow and day after)
  const getTomorrowString = (offsetDays = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const [checkIn, setCheckIn] = useState(getTomorrowString(1));
  const [checkOut, setCheckOut] = useState(getTomorrowString(2));
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);

  // Calculate nights whenever dates change
  useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end > start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(1);
    }
  }, [checkIn, checkOut]);

  // Calculations
  const baseTotal = roomPrice * nights;
  const luxuryTax = Math.round(baseTotal * 0.18); // 18% GST for luxury hotel
  const grandTotal = baseTotal + luxuryTax;

  const handleBookNow = () => {
    // Navigate to booking page with details prefilled
    router.push(
      `/booking?room=${roomId}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
      {/* Price Heading */}
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-gray/70">
          Sanctuary Rate
        </span>
        <div className="text-right">
          <span className="font-serif text-2xl md:text-3xl text-text-offwhite font-light">
            {formatPrice(roomPrice)}
          </span>
          <span className="font-sans text-[11px] text-text-gray/50 lowercase block">
            per night (excl. tax)
          </span>
        </div>
      </div>

      <div className="h-px bg-border-dark/60 w-full" />

      {/* Date Pickers */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          
          {/* Check In */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium flex items-center">
              <Calendar size={11} className="mr-1.5" />
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              min={getTomorrowString(0)}
              onChange={(e) => {
                setCheckIn(e.target.value);
                // Ensure check out is at least 1 day after check in
                const nextDay = new Date(e.target.value);
                nextDay.setDate(nextDay.getDate() + 1);
                const nextDayStr = nextDay.toISOString().split("T")[0];
                if (checkOut <= e.target.value) {
                  setCheckOut(nextDayStr);
                }
              }}
              className="bg-bg-dark border border-border-dark rounded-lg p-2.5 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full [color-scheme:dark]"
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium flex items-center">
              <Calendar size={11} className="mr-1.5" />
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn ? getTomorrowString(0) : getTomorrowString(1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-bg-dark border border-border-dark rounded-lg p-2.5 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full [color-scheme:dark]"
            />
          </div>

        </div>

        {/* Guest selector */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium flex items-center">
            <Users size={11} className="mr-1.5" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="bg-bg-dark border border-border-dark rounded-lg p-2.5 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full cursor-pointer appearance-none"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-3 pt-2">
        
        {/* Base subtotal */}
        <div className="flex justify-between text-xs text-text-gray font-light font-sans">
          <span>
            {formatPrice(roomPrice)} x {nights} night{nights > 1 ? "s" : ""}
          </span>
          <span className="text-text-offwhite">{formatPrice(baseTotal)}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-xs text-text-gray font-light font-sans">
          <span className="flex items-center">
            Luxury GST (18%)
            <span className="group/info relative ml-1.5 cursor-pointer text-text-gray/50 hover:text-gold transition-colors">
              <Info size={11} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 bg-bg-dark border border-border-dark text-[9px] leading-relaxed text-text-gray rounded-md shadow-xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300">
                18% luxury GST imposed by statutory state regulations.
              </span>
            </span>
          </span>
          <span className="text-text-offwhite">{formatPrice(luxuryTax)}</span>
        </div>

        <div className="h-px bg-border-dark/30 w-full" />

        {/* Grand Total */}
        <div className="flex justify-between items-baseline font-sans pt-1">
          <span className="text-xs uppercase tracking-[0.1em] text-text-offwhite font-semibold">
            Total Estimate
          </span>
          <span className="font-serif text-xl md:text-2xl text-gold font-light">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Booking CTA Button */}
      <button
        onClick={handleBookNow}
        className="w-full py-4 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(199,168,109,0.25)] cursor-pointer"
      >
        Book Sanctuary
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center space-x-2 text-[9px] uppercase tracking-[0.15em] text-text-gray/50 pt-2 font-sans font-light">
        <ShieldCheck size={12} className="text-gold/60" />
        <span>No upfront payment required today</span>
      </div>
    </div>
  );
}
