"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Calendar, Users, Info } from "lucide-react";
import { rooms } from "@/lib/data";

interface StickyBookingPanelProps {
  roomPrice: number;
  roomId: string;
  selectedBranchId?: string;
}

export default function StickyBookingPanel({ roomPrice, roomId, selectedBranchId }: StickyBookingPanelProps) {
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

  // Derive maximum allowed guests for this room
  const activeRoom = rooms.find((r) => r.id === roomId);
  const maxGuests = activeRoom ? parseInt(activeRoom.guests, 10) || 2 : 4;

  // Calculate nights directly in render scope
  const nights = (() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end > start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  })();

  // Calculations
  const baseTotal = roomPrice * nights;
  const luxuryTax = Math.round(baseTotal * 0.18); // 18% GST for luxury hotel
  const grandTotal = baseTotal + luxuryTax;

  const handleBookNow = () => {
    // Ensure guests does not exceed max capacity
    const validatedGuests = Math.min(guests, maxGuests);
    const branchQuery = selectedBranchId ? `&branch=${selectedBranchId}` : "";
    router.push(
      `/booking?room=${roomId}&checkin=${checkIn}&checkout=${checkOut}&guests=${validatedGuests}${branchQuery}`
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
          <span className="font-serif text-2xl md:text-3xl text-gold font-light">
            {formatPrice(roomPrice)}
          </span>
          <span className="text-[10px] font-sans text-text-gray/50 block font-light">
            per night (excl. tax)
          </span>
        </div>
      </div>

      <div className="h-px bg-border-dark/60 w-full" />

      {/* Date & Guest Form controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
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
              min={checkIn ? (() => {
                const nextDay = new Date(checkIn);
                nextDay.setDate(nextDay.getDate() + 1);
                return nextDay.toISOString().split("T")[0];
              })() : getTomorrowString(1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-bg-dark border border-border-dark rounded-lg p-2.5 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Guest selector */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium flex items-center">
            <Users size={11} className="mr-1.5" />
            Guests (Max {maxGuests})
          </label>
          <select
            value={guests > maxGuests ? maxGuests : guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="bg-bg-dark border border-border-dark rounded-lg p-2.5 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full cursor-pointer appearance-none"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between text-xs text-text-gray font-light">
          <span>
            {formatPrice(roomPrice)} &times; {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span className="text-text-offwhite font-medium">{formatPrice(baseTotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-text-gray font-light">
          <span className="flex items-center">
            Luxury GST (18%)
            <span className="ml-1 text-text-gray/40 cursor-help" title="Standard GST for luxury hotel tariffs">
              <Info size={11} />
            </span>
          </span>
          <span className="text-text-offwhite font-medium">{formatPrice(luxuryTax)}</span>
        </div>

        <div className="h-px bg-border-dark/40 w-full my-2" />

        <div className="flex justify-between items-baseline pt-1">
          <span className="text-xs uppercase tracking-[0.15em] text-text-offwhite font-medium">
            Total Estimate
          </span>
          <span className="font-serif text-2xl text-gold font-light">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleBookNow}
        className="w-full py-4 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(199,168,109,0.3)] cursor-pointer"
      >
        Book Sanctuary
      </button>

      {/* Micro Copy */}
      <div className="text-[10px] text-text-gray/60 text-center font-light leading-relaxed">
        No upfront payment required today. Direct enquiry review by desk concierge.
      </div>
    </div>
  );
}
