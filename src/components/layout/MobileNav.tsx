"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bed, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", href: "/", icon: Home },
    { name: "ROOMS", href: "/rooms", icon: Bed },
    { name: "OFFERS", href: "/#offers", icon: Sparkles },
    { name: "PROFILE", href: "/booking", icon: User }, // Map Profile to Booking for now
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="w-full max-w-sm h-16 glass rounded-full border border-border-dark flex items-center justify-around px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/" && pathname === "/") ||
            (item.href.startsWith("/#") && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-16 h-full text-[9px] tracking-[0.1em] font-sans transition-all duration-300 active:scale-[0.9]"
            >
              <Icon
                size={18}
                className={cn(
                  "mb-1 stroke-[1.25] transition-all duration-300",
                  isActive ? "text-gold scale-110 stroke-[1.75]" : "text-text-gray"
                )}
              />
              <span
                className={cn(
                  "font-medium transition-all duration-300",
                  isActive ? "text-gold font-semibold" : "text-text-gray/70"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
