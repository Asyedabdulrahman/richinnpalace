"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { rooms, Room, Branch } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Maximize2, Users, Calendar, ArrowRight } from "lucide-react";
import BranchSelectorModal from "@/components/common/BranchSelectorModal";

export default function RoomsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalMode, setModalMode] = useState<"details" | "booking">("details");

  const handleDetailsClick = (e: React.MouseEvent, room: Room) => {
    e.preventDefault();
    if (room.branches && room.branches.length > 0) {
      setSelectedRoom(room);
      setModalMode("details");
      setIsModalOpen(true);
    } else {
      router.push(`/rooms/${room.slug}`);
    }
  };

  const handleBookingClick = (e: React.MouseEvent, room: Room) => {
    e.preventDefault();
    if (room.branches && room.branches.length > 0) {
      setSelectedRoom(room);
      setModalMode("booking");
      setIsModalOpen(true);
    } else {
      router.push(`/booking?room=${room.id}`);
    }
  };

  const handleSelectBranch = (branch: Branch) => {
    setIsModalOpen(false);
    if (selectedRoom) {
      if (modalMode === "details") {
        router.push(`/rooms/${selectedRoom.slug}?branch=${branch.id}`);
      } else {
        router.push(`/booking?room=${selectedRoom.id}&branch=${branch.id}`);
      }
    }
  };

  // Filtering logic
  const categories = ["ALL", "COURTYARD", "PRIVATE GARDEN", "PLUNGE POOL", "Aravalli Range View"];

  const filteredRooms = activeFilter === "ALL"
    ? rooms
    : rooms.filter(room => room.tag.toUpperCase() === activeFilter.toUpperCase());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium mb-3 block">
            THE CHRONICLE OF KEYS
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-text-offwhite font-light tracking-wide mb-6">
            Sanctuaries of <br />
            profound silence.
          </h1>
          <p className="font-sans text-sm md:text-base text-text-gray font-light leading-relaxed">
            Twenty-eight residential chambers, hand-built with Amber-cut yellow sandstone and natural lime plaster. Designed to stay cool in the desert heat, and warm in Jaipur&apos;s slow winter nights.
          </p>
        </div>

        {/* Sticky filter bar */}
        {/* <div className="sticky top-20 z-30 bg-bg-dark/95 backdrop-blur-md py-5 border-y border-border-dark mb-12">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? "bg-gold text-bg-dark font-medium"
                    : "border border-border-dark/60 text-text-gray hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat === "ALL" ? "All Chambers" : cat}
              </button>
            ))}
          </div>
        </div> */}

        {/* Rooms List */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room) => (
              <motion.div
                layout
                key={room.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-surface-dark border border-border-dark/50 rounded-2xl overflow-hidden flex flex-col group hover:border-gold/25 transition-all duration-500"
              >
                {/* Image Wrap */}
                <div onClick={(e) => handleDetailsClick(e, room)} className="relative aspect-[16/10] w-full overflow-hidden block cursor-pointer">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 glass border border-border-dark text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-text-offwhite rounded-full">
                      {room.tag}
                    </span>
                  </div>
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3.5 py-1.5 bg-green-950/40 backdrop-blur-md border border-green-800/40 text-[9px] uppercase tracking-[0.15em] font-sans font-medium text-green-400 rounded-full flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                      Available
                    </span>
                  </div>

                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                      priority={room.id === "haveli-room"}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div onClick={(e) => handleDetailsClick(e, room)} className="cursor-pointer">
                        <h2 className="font-serif text-2xl md:text-3xl text-text-offwhite font-light hover:text-gold transition-colors duration-300">
                          {room.name}
                        </h2>
                      </div>
                      <span className="font-serif text-xl text-gold font-light">
                        {formatPrice(room.price)}
                        <span className="font-sans text-[10px] text-text-gray/50 lowercase">/night</span>
                      </span>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-text-gray font-light leading-relaxed">
                      {room.longDescription}
                    </p>
                  </div>

                  {/* Specs footer bar */}
                  <div className="flex flex-wrap items-center justify-between border-t border-border-dark/60 pt-6 gap-4">
                    <div className="flex items-center space-x-6 text-[10px] tracking-[0.12em] uppercase font-sans text-text-gray/80 font-light">
                      <span className="flex items-center">
                        <Maximize2 size={11} className="mr-2 text-gold/75" />
                        {room.size}
                      </span>
                      <span className="flex items-center">
                        <Users size={11} className="mr-2 text-gold/75" />
                        {room.guests}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => handleDetailsClick(e, room)}
                        className="px-4 py-2 border border-border-dark/80 text-[10px] uppercase tracking-[0.2em] font-medium text-text-offwhite rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={(e) => handleBookingClick(e, room)}
                        className="px-5 py-2 bg-gold text-bg-dark text-[10px] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-all duration-300 flex items-center space-x-2 transform active:scale-[0.97] cursor-pointer"
                      >
                        <Calendar size={11} className="stroke-[1.75]" />
                        <span>Book Stay</span>
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <BranchSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onSelectBranch={handleSelectBranch}
      />
    </div>
  );
}
