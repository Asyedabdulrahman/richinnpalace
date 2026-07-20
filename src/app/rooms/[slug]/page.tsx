import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms, Room } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Maximize2, Users, Calendar, ArrowRight, ShieldCheck, Landmark } from "lucide-react";
import AccordionFAQ from "./AccordionFAQ"; // Client component for FAQ interactivity
import StickyBookingPanel from "./StickyBookingPanel"; // Client component for sticky calculations

interface Props {
  params: Promise<{ slug: string }>;
}

// Enable Next.js Static Generation
export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

// Dynamic page metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  
  if (!room) return {};

  return {
    title: `${room.name} | SÉRA Jaipur`,
    description: room.longDescription.slice(0, 155) + "...",
    openGraph: {
      title: `${room.name} | SÉRA Jaipur`,
      description: room.longDescription.slice(0, 155) + "...",
      images: [{ url: room.image }],
    },
  };
}

export default async function RoomDetailsPage({ params }: Props) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  // Filter other rooms for the bottom recommendation section
  const relatedRooms = rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-[10px] tracking-[0.2em] uppercase text-text-gray/65 flex items-center space-x-2">
          <Link href="/" className="hover:text-gold transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-gold transition-colors">CHAMBERS</Link>
          <span>/</span>
          <span className="text-gold font-medium">{room.name}</span>
        </nav>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="md:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-dark">
            <Image
              src={room.image}
              alt={room.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {room.gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative aspect-[16/10] md:aspect-[16/9.5] rounded-2xl overflow-hidden bg-surface-dark">
                <Image
                  src={img}
                  alt={`${room.name} gallery ${idx + 2}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Description & Sticky Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            
            {/* Title & Core Description */}
            <div className="space-y-4">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-medium block">
                {room.tag}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-text-offwhite font-light tracking-wide leading-tight">
                {room.name}
              </h1>
              <p className="font-serif text-xl md:text-2xl text-gold font-light italic leading-relaxed">
                &ldquo;{room.description}&rdquo;
              </p>
              <div className="h-px bg-border-dark/60 w-full pt-4" />
              <p className="font-sans text-sm md:text-base text-text-gray font-light leading-relaxed pt-2">
                {room.longDescription}
              </p>
            </div>

            {/* Room Specs Grid */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl md:text-2xl text-text-offwhite font-light tracking-wide">
                Chamber Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 border border-border-dark/65 rounded-2xl p-6 bg-surface-dark/30">
                {room.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2.5 border-b border-border-dark/30 last:border-b-0 sm:last:border-b-0 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-text-gray/70 font-sans">
                      {spec.label}
                    </span>
                    <span className="text-xs text-text-offwhite font-sans font-light text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl md:text-2xl text-text-offwhite font-light tracking-wide">
                Bespoke Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-text-gray/90 text-xs md:text-sm font-sans font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            {room.attractions && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl md:text-2xl text-text-offwhite font-light tracking-wide">
                  Environs & Excursions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.attractions.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-border-dark/50 rounded-xl bg-surface-dark/30 hover:border-gold/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Landmark size={14} className="text-gold stroke-[1.25] shrink-0" />
                        <span className="text-xs text-text-offwhite font-sans font-light">{attraction.name}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-text-gray/60 font-sans">{attraction.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl md:text-2xl text-text-offwhite font-light tracking-wide">
                Frequently Asked
              </h3>
              <AccordionFAQ faqs={room.faqs} />
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 lg:relative">
            <div className="lg:sticky lg:top-28">
              <StickyBookingPanel roomPrice={room.price} roomId={room.id} />
            </div>
          </div>

        </div>

        {/* Related Rooms recommendations */}
        <div className="border-t border-border-dark mt-24 pt-16 space-y-10">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif text-2xl md:text-3xl text-text-offwhite font-light tracking-wide">
              Other Sanctuaries
            </h3>
            <Link
              href="/rooms"
              className="text-[10px] uppercase tracking-[0.2em] text-gold hover:text-text-offwhite transition-colors duration-300"
            >
              See All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedRooms.map((relRoom) => (
              <div
                key={relRoom.id}
                className="bg-surface-dark border border-border-dark/50 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:border-gold/20 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] sm:aspect-square sm:w-44 shrink-0 overflow-hidden bg-bg-dark">
                  <Image
                    src={relRoom.image}
                    alt={relRoom.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                      {relRoom.tag}
                    </span>
                    <h4 className="font-serif text-xl text-text-offwhite font-light group-hover:text-gold transition-colors duration-300">
                      {relRoom.name}
                    </h4>
                    <p className="text-[11px] text-text-gray/80 line-clamp-2 leading-relaxed font-sans font-light">
                      {relRoom.longDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border-dark/30 mt-4">
                    <span className="font-serif text-sm text-text-offwhite font-light">
                      {formatPrice(relRoom.price)}<span className="font-sans text-[9px] text-text-gray/50 lowercase">/night</span>
                    </span>
                    <Link
                      href={`/rooms/${relRoom.slug}`}
                      className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium inline-flex items-center space-x-1 hover:text-text-offwhite transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
