"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { hotelDetails } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark border-t border-border-dark text-text-offwhite font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-3xl tracking-[0.25em] text-gold">SÉRA</h3>
            <p className="text-xs tracking-[0.1em] text-text-gray font-light max-w-xs leading-relaxed">
              A quiet sanctuary where Jaipur&apos;s heritage is slowly rewritten. Twenty-eight keys of unhurried luxury.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="text-text-gray hover:text-gold transition-colors duration-300"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Facebook"
                className="text-text-gray hover:text-gold transition-colors duration-300"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Sanctuary</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-xs tracking-[0.1em] text-text-gray hover:text-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-xs tracking-[0.1em] text-text-gray hover:text-gold transition-colors duration-300">
                  Our Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/#manifesto" className="text-xs tracking-[0.1em] text-text-gray hover:text-gold transition-colors duration-300">
                  The Manifesto
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-xs tracking-[0.1em] text-text-gray hover:text-gold transition-colors duration-300">
                  Sanctuary Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-xs tracking-[0.1em] text-text-gray hover:text-gold transition-colors duration-300">
                  Reserve a Stay
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Enquiries</h4>
            <ul className="space-y-3 text-xs tracking-[0.1em] text-text-gray font-light">
              <li className="flex items-center space-x-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${hotelDetails.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors duration-300">
                  {hotelDetails.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${hotelDetails.email}`} className="hover:text-gold transition-colors duration-300">
                  {hotelDetails.email}
                </a>
              </li>
              <li className="flex items-start space-x-3 leading-relaxed">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span>{hotelDetails.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Booking Invitation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Newsletter</h4>
            <p className="text-xs tracking-[0.1em] text-text-gray font-light leading-relaxed">
              Subscribe to receive private invitations, seasonal offers, and notes on still living.
            </p>
            <form className="flex flex-col space-y-2 pt-1" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full px-4 py-2.5 bg-bg-dark border border-border-dark rounded-md text-xs tracking-[0.15em] placeholder-text-gray/50 focus:outline-none focus:border-gold transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-md hover:bg-gold-hover transition-colors duration-300 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-dark mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] text-text-gray font-light">
            &copy; {currentYear} SÉRA RESORTS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-[10px] tracking-[0.15em] text-text-gray font-light">
            <Link href="/privacy" className="hover:text-gold transition-colors duration-300">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors duration-300">
              TERMS & CONDITIONS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
