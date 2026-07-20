"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { rooms, hotelDetails } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Calendar, Users, ShieldCheck, Mail, Phone, User, Check, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get tomorrow and day after date strings
  const getTomorrowString = (offsetDays = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  // State initialized from search params or defaults
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [checkIn, setCheckIn] = useState(getTomorrowString(1));
  const [checkOut, setCheckOut] = useState(getTomorrowString(2));
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);

  // Form info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  // Sync state with search params on load
  useEffect(() => {
    const roomParam = searchParams.get("room");
    const checkinParam = searchParams.get("checkin");
    const checkoutParam = searchParams.get("checkout");
    const guestsParam = searchParams.get("guests");

    if (roomParam && rooms.some((r) => r.id === roomParam)) {
      setSelectedRoomId(roomParam);
    } else if (rooms.length > 0) {
      setSelectedRoomId(rooms[0].id);
    }

    if (checkinParam) setCheckIn(checkinParam);
    if (checkoutParam) setCheckOut(checkoutParam);
    if (guestsParam) setGuests(parseInt(guestsParam) || 2);
  }, [searchParams]);

  // Recalculate nights when dates change
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

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Pricing calculations
  const basePrice = selectedRoom ? selectedRoom.price : 0;
  const baseTotal = basePrice * nights;
  const luxuryTax = Math.round(baseTotal * 0.18);
  const grandTotal = baseTotal + luxuryTax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);

    // Simulate luxury server action request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      // Generate realistic booking reference
      const ref = "SR" + Math.floor(100000 + Math.random() * 900000);
      setBookingReference(ref);
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-xl mx-auto px-6 text-center py-20 space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-20 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold"
        >
          <Check size={36} className="stroke-[1.5]" />
        </motion.div>

        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
            RESERVATION CONFIRMED
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-text-offwhite font-light tracking-wide leading-tight">
            Welcome to Stillness.
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-gray font-light leading-relaxed max-w-sm mx-auto">
            Your booking at SÉRA has been registered. An invitation letter with details of your private airport transfer has been sent to your email.
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="border border-border-dark bg-surface-dark/40 rounded-2xl p-6 text-left space-y-4 font-sans text-xs max-w-sm mx-auto">
          <div className="flex justify-between border-b border-border-dark/40 pb-2">
            <span className="text-text-gray/70">Booking Reference</span>
            <span className="text-gold font-semibold tracking-wider">{bookingReference}</span>
          </div>
          <div className="flex justify-between border-b border-border-dark/40 pb-2">
            <span className="text-text-gray/70">Sanctuary</span>
            <span className="text-text-offwhite">{selectedRoom?.name}</span>
          </div>
          <div className="flex justify-between border-b border-border-dark/40 pb-2">
            <span className="text-text-gray/70">Dates</span>
            <span className="text-text-offwhite">{checkIn} to {checkOut}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-text-gray/70">Guests</span>
            <span className="text-text-offwhite">{guests} Adults</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-colors"
          >
            Return to Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left Column: Form entry */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-medium block">
            Bespoke Reservation
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-text-offwhite font-light tracking-wide">
            Reserve Your Stay
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Dates & Sanctuary Selection */}
          <div className="bg-surface-dark/30 border border-border-dark/60 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-2">
              1. Stay Details
            </h3>

            {/* Room selector */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium">
                Select Chamber or Suite
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full cursor-pointer appearance-none"
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} — {formatPrice(room.price)} / night
                  </option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={getTomorrowString(0)}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    const nextDay = new Date(e.target.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    const nextDayStr = nextDay.toISOString().split("T")[0];
                    if (checkOut <= e.target.value) {
                      setCheckOut(nextDayStr);
                    }
                  }}
                  className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn ? getTomorrowString(0) : getTomorrowString(1)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full cursor-pointer appearance-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

          </div>

          {/* Section 2: Contact Information */}
          <div className="bg-surface-dark/30 border border-border-dark/60 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-2">
              2. Guest Contact
            </h3>

            {/* Full Name */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium flex items-center">
                <User size={11} className="mr-1.5" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Elena Rostova"
                className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full placeholder-text-gray/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Address */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium flex items-center">
                  <Mail size={11} className="mr-1.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@writer.com"
                  className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full placeholder-text-gray/30"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium flex items-center">
                  <Phone size={11} className="mr-1.5" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 55555"
                  className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full placeholder-text-gray/30"
                />
              </div>

            </div>

            {/* Special requests */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-medium">
                Special Arrangements or Dietary Needs
              </label>
              <textarea
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="Prefer lavender scent in turndown, or airport greeting transfers details..."
                rows={3}
                className="bg-bg-dark border border-border-dark rounded-lg p-3 text-xs text-text-offwhite font-sans focus:outline-none focus:border-gold transition-colors w-full placeholder-text-gray/30 resize-none"
              />
            </div>

          </div>

          {/* Checkout Button */}
          <button
            type="submit"
            disabled={isSubmitting || !fullName || !email || !phone}
            className="w-full py-4 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover disabled:bg-gold/40 disabled:text-bg-dark/60 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(199,168,109,0.25)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Registering Details...</span>
              </>
            ) : (
              <span>Complete Sanctuary Booking</span>
            )}
          </button>

        </form>
      </div>

      {/* Right Column: Checkout Summary */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28 space-y-6">
          <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
              Reservation Summary
            </h3>

            {/* Room Snapshot */}
            {selectedRoom && (
              <div className="flex items-center space-x-4 border-b border-border-dark/40 pb-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-bg-dark shrink-0">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-medium font-sans">
                    {selectedRoom.tag}
                  </span>
                  <h4 className="font-serif text-lg text-text-offwhite font-light">
                    {selectedRoom.name}
                  </h4>
                  <p className="text-[10px] text-text-gray font-sans font-light">
                    {selectedRoom.size} · Max occupancy {selectedRoom.guests}
                  </p>
                </div>
              </div>
            )}

            {/* Booking calculations */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between text-text-gray font-light">
                <span>Check-in Date</span>
                <span className="text-text-offwhite font-medium">{checkIn}</span>
              </div>
              <div className="flex justify-between text-text-gray font-light">
                <span>Check-out Date</span>
                <span className="text-text-offwhite font-medium">{checkOut}</span>
              </div>
              <div className="flex justify-between text-text-gray font-light">
                <span>Duration</span>
                <span className="text-text-offwhite font-medium">
                  {nights} night{nights > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between text-text-gray font-light">
                <span>Guests</span>
                <span className="text-text-offwhite font-medium">{guests} Adults</span>
              </div>

              <div className="h-px bg-border-dark/30 w-full my-2" />

              <div className="flex justify-between text-text-gray font-light">
                <span>Base Sanctuary Rate</span>
                <span className="text-text-offwhite">
                  {formatPrice(basePrice)} x {nights}
                </span>
              </div>
              <div className="flex justify-between text-text-gray font-light">
                <span>Luxury GST (18%)</span>
                <span className="text-text-offwhite">{formatPrice(luxuryTax)}</span>
              </div>

              <div className="h-px bg-border-dark/40 w-full my-2" />

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs uppercase tracking-[0.1em] text-text-offwhite font-semibold">
                  Estimated Total
                </span>
                <span className="font-serif text-xl md:text-2xl text-gold font-light">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Policies Badge */}
          <div className="border border-border-dark/80 bg-surface-dark/20 rounded-2xl p-5 space-y-3.5 text-[10px] tracking-wide text-text-gray leading-relaxed font-sans font-light">
            <div className="flex items-center space-x-2 text-gold">
              <ShieldCheck size={14} className="stroke-[1.75]" />
              <span className="uppercase font-medium tracking-[0.15em]">Cancellation Policy</span>
            </div>
            <p>
              Complimentary cancellation or modifications allowed up to 72 hours prior to arrival date. Check-in is after 14:00. Late check-out is subject to unhurried room availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link
          href="/rooms"
          className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-text-gray hover:text-gold transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft size={10} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Stays</span>
        </Link>

        {/* Suspense is required here because useSearchParams() causes client-side hydration delays or de-optimization on build */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-gold" size={24} />
            </div>
          }
        >
          <BookingContent />
        </Suspense>
      </div>
    </div>
  );
}
