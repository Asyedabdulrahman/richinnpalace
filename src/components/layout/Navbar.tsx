"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Manifesto", href: "/#manifesto" },
  ];

  const rightLinks = [
    { name: "Gallery", href: "/#gallery" },
    { name: "Reviews", href: "/#reviews" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-transparent",
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-border-dark py-4"
          : "bg-transparent py-6"
      )}
    >
      {/* Desktop Navigation: Symmetric 3-Column Grid */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 grid-cols-3 items-center">
        
        {/* Left Column: Left Links */}
        <nav className="flex items-center space-x-8">
          {leftLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-xs uppercase tracking-[0.15em] text-text-gray hover:text-gold transition-colors duration-300",
                  isActive && "text-gold font-medium"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Center Column: Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.25em] text-text-offwhite font-light transition-transform duration-300 hover:scale-[1.02]">
              Rich Inn Palace
            </span>
          </Link>
        </div>

        {/* Right Column: Right Links & CTA Button */}
        <div className="flex items-center justify-end space-x-8">
          <nav className="flex items-center space-x-8">
            {rightLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-sans text-xs uppercase tracking-[0.15em] text-text-gray hover:text-gold transition-colors duration-300",
                    isActive && "text-gold font-medium"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/booking"
            className="inline-block px-5 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-bg-dark hover:border-gold font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-[0_0_15px_rgba(199,168,109,0.2)]"
          >
            Book Your Stay
          </Link>
        </div>

      </div>

      {/* Mobile Navigation: Simple Flexbar */}
      <div className="md:hidden max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Left */}
        <div className="text-[9px] tracking-[0.15em] text-text-gray font-sans font-light">
          ESTD. 2012
        </div>

        {/* Mobile Center Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="font-serif text-xl tracking-[0.2em] text-text-offwhite font-light">
            Rich Inn Palace
          </span>
        </Link>

        {/* Mobile Right */}
        <div className="text-[9px] tracking-[0.15em] text-text-gray font-sans font-light text-right">
          JAIPUR · IN
        </div>

      </div>
    </header>
  );
}
