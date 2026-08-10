"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { rooms, Room } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Maximize2, Users } from "lucide-react";
import { trackRoomView, trackBookNowClick } from "@/lib/analytics";

function RoomCardMedia({ src, alt, video, priority }: { src: string; alt: string; video?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setIsHovered(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className={`object-cover transition-opacity duration-500 ${isHovered && video ? "opacity-0" : "opacity-100"}`}
        priority={priority}
      />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

export default function RoomsClient() {
  const router = useRouter();
  const [activeFilter] = useState("ALL");

  const handleDetailsClick = (room: Room) => {
    trackRoomView(room.id, room.tag, room.price);
    trackBookNowClick("rooms_catalog", room.id);
    router.push(`/rooms/${room.slug}`);
  };

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
            Twenty-eight residential chambers, hand-built with handcrafted plaster and teak wood details. Designed to stay cool in the tropical warmth and peaceful through Chennai&apos;s slow evening breezes.
          </p>
        </div>

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
                <div onClick={() => handleDetailsClick(room)} className="relative aspect-[16/10] w-full overflow-hidden block cursor-pointer">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3.5 py-1.5 glass border border-border-dark text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-text-offwhite rounded-full">
                      {room.tag}
                    </span>
                  </div>
                  {/* Availability Badge Removed */}

                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <RoomCardMedia
                      src={room.image}
                      alt={room.name}
                      video={room.video}
                      priority={room.id === "haveli-room"}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div onClick={() => handleDetailsClick(room)} className="cursor-pointer">
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
                        onClick={() => handleDetailsClick(room)}
                        className="px-4 py-2 border border-border-dark/80 text-[10px] uppercase tracking-[0.2em] font-medium text-text-offwhite rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
