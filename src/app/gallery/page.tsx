import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sanctuary Imagery & Architecture | Rich Inn Palace Chennai",
  description:
    "Explore the architectural grandeur, courtyard reflection pools, luxury suites, and evening light at Rich Inn Palace Chennai.",
  keywords: [
    "Rich Inn Palace Gallery",
    "Chennai Luxury Resort Photos",
    "Heritage Architecture Chennai",
    "Boutique Hotel Gallery Tamil Nadu",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/gallery`,
  },
  openGraph: {
    title: "Sanctuary Imagery & Architecture | Rich Inn Palace Chennai",
    description:
      "Explore the architectural grandeur and courtyard reflection pools at Rich Inn Palace Chennai.",
    url: `${SITE_CONFIG.domain}/gallery`,
    siteName: "Rich Inn Palace Hotel",
    images: [
      {
        url: "/images/photo1.avif",
        width: 1200,
        height: 630,
        alt: "Rich Inn Palace Architecture & Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanctuary Imagery & Architecture | Rich Inn Palace Chennai",
    description:
      "Explore the architectural grandeur and courtyard reflection pools at Rich Inn Palace Chennai.",
    images: ["/images/photo1.avif"],
  },
};

const galleryImages = [
  { src: "/images/photo1.avif", title: "Courtyard Sanctuaries", category: "Architecture" },
  { src: "/images/photos2.avif", title: "Luxury Suite Chambers", category: "Suites" },
  { src: "/images/photos3.jpg", title: "Private Plunge Pools", category: "Amenities" },
  { src: "/images/photos4.jpg", title: "Twilight Lantern Corridor", category: "Atmosphere" },
  { src: "/images/photos5.jpg", title: "Executive Dining Pavilion", category: "Culinary" },
  { src: "/images/photos6.jpg", title: "Lime Plaster & Teak Architecture", category: "Design" },
  { src: "/images/photos7.jpg", title: "Sun Terrace & Pool", category: "Outdoors" },
  { src: "/images/photos8.jpg", title: "Ensuite Stone Bath", category: "Sanctuary" },
  { src: "/images/photos9.jpg", title: "Garden Veranda", category: "Views" },
];

export default function GalleryPage() {
  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 block">
            THE VISUAL CHRONICLE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-text-offwhite font-light tracking-wide mb-6">
            Light, Form <br /> & Silence.
          </h1>
          <p className="font-sans text-sm md:text-base text-text-gray font-light leading-relaxed">
            A visual glimpse into our twenty-eight residential keys, serene courtyard fountains, and slow evening light in Chennai.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-dark border border-border-dark/50 hover:border-gold/30 transition-all duration-500"
            >
              <Image
                src={img.src}
                alt={`${img.title} - Rich Inn Palace Chennai`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={idx < 2}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[9px] text-gold uppercase tracking-[0.2em] font-sans font-medium">
                  {img.category}
                </span>
                <h3 className="font-serif text-xl text-text-offwhite font-light">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 bg-surface-dark border border-border-dark/60 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-text-offwhite font-light">
            Experience the Sanctuary in Person.
          </h2>
          <p className="text-xs md:text-sm text-text-gray font-light max-w-xl mx-auto">
            Reserve your private chamber and experience dedicated butler care set against the Aravalli hills.
          </p>
          <div>
            <Link
              href="/booking"
              className="inline-block px-8 py-3.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-colors"
            >
              Reserve Your Stay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
