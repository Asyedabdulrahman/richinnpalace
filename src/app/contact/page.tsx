import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Location | Rich Inn Palace Chennai",
  description:
    "Get in touch with Rich Inn Palace Chennai. Inquire about bespoke sanctuary reservations, executive airport transfers, or corporate retreats.",
  keywords: [
    "Contact Rich Inn Palace Chennai",
    "Rich Inn Palace Address",
    "Chennai Luxury Hotel Phone Number",
    "T.Nagar Hotel Contact",
  ],
  alternates: {
    canonical: "https://serahotel.com/contact",
  },
  openGraph: {
    title: "Contact & Location | Rich Inn Palace Chennai",
    description:
      "Get in touch with Rich Inn Palace Chennai. Inquire about bespoke sanctuary reservations and airport transfers.",
    url: "https://serahotel.com/contact",
    siteName: "Rich Inn Palace Hotel",
    images: [
      {
        url: "/images/photo1.avif",
        width: 1200,
        height: 630,
        alt: "Contact Rich Inn Palace Chennai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Location | Rich Inn Palace Chennai",
    description:
      "Get in touch with Rich Inn Palace Chennai. Inquire about bespoke sanctuary reservations.",
    images: ["/images/photo1.avif"],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Rich Inn Palace Chennai",
    "telephone": "+91 141 555 0198",
    "email": "reservations@serahotel.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Usman Road, T.Nagar",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600017",
      "addressCountry": "IN"
    },
    "url": "https://serahotel.com/contact"
  };

  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-text-offwhite font-light tracking-wide mb-6">
            Location & <br /> Concierge Care.
          </h1>
          <p className="font-sans text-sm md:text-base text-text-gray font-light leading-relaxed">
            Situated in central T.Nagar, offering convenient access to cultural landmarks and corporate hubs. Contact our private concierge team for bespoke reservations, private executive transfers, or culinary queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-dark border border-border-dark/60 rounded-2xl p-8 space-y-6">
              <h2 className="font-serif text-2xl text-text-offwhite font-light border-b border-border-dark/40 pb-4">
                Sanctuary Address
              </h2>
              
              <div className="space-y-4 text-xs font-sans text-text-gray">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-text-offwhite font-medium block mb-1">Rich Inn Palace Resort</span>
                    <p className="leading-relaxed">Usman Road, T.Nagar, Chennai, Tamil Nadu 600017, India</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <Phone className="text-gold shrink-0" size={16} />
                  <div>
                    <span className="text-text-gray/60 block text-[9px] uppercase tracking-wider">Reservations & Desk</span>
                    <a href="tel:+911415550198" className="text-text-offwhite hover:text-gold transition-colors font-medium">
                      +91 141 555 0198
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <Mail className="text-gold shrink-0" size={16} />
                  <div>
                    <span className="text-text-gray/60 block text-[9px] uppercase tracking-wider">Direct Concierge Email</span>
                    <a href="mailto:reservations@serahotel.com" className="text-text-offwhite hover:text-gold transition-colors font-medium">
                      reservations@serahotel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-2 border-t border-border-dark/40">
                  <Clock className="text-gold shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-text-offwhite font-medium block">Timings</span>
                    <p className="text-[11px] text-text-gray/80 mt-0.5">Check-in: 14:00 | Check-out: 12:00</p>
                    <p className="text-[10px] text-text-gray/50 mt-0.5">Front Concierge operates 24 Hours daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Advice Card */}
            <div className="border border-border-dark/60 bg-surface-dark/30 rounded-2xl p-6 space-y-3 text-xs font-sans text-text-gray">
              <div className="flex items-center space-x-2 text-gold">
                <ShieldCheck size={16} />
                <span className="uppercase font-medium tracking-wider text-[10px]">Private Airport Transfers</span>
              </div>
              <p className="leading-relaxed font-light text-[11px]">
                Located 5 km from Chennai International Airport (MAA). Private luxury sedan transfers can be arranged with your room reservation.
              </p>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-dark border border-border-dark/60 rounded-2xl p-8 md:p-10 space-y-6">
            <h2 className="font-serif text-2xl text-text-offwhite font-light">
              Send a Concierge Inquiry
            </h2>
            <form className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-text-gray font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Lord/Lady Sterling"
                    className="w-full bg-bg-dark border border-border-dark rounded-lg p-3 text-text-offwhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-text-gray font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@domain.com"
                    className="w-full bg-bg-dark border border-border-dark rounded-lg p-3 text-text-offwhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-text-gray font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Private Event / Suite Availability / Dining"
                  className="w-full bg-bg-dark border border-border-dark rounded-lg p-3 text-text-offwhite focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-text-gray font-medium">Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How may our concierge assist your upcoming stay..."
                  className="w-full bg-bg-dark border border-border-dark rounded-lg p-3 text-text-offwhite focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-colors cursor-pointer"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
