"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an analytics service or console
    console.error("Hydration or Route Error: ", error);
  }, [error]);

  return (
    <div className="bg-bg-dark min-h-screen flex items-center justify-center font-sans text-center px-6">
      <div className="space-y-8 max-w-md">
        <div className="w-16 h-16 bg-red-950/20 border border-red-800/40 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} className="stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold font-medium">
            SYSTEM DISRUPTION
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-text-offwhite font-light tracking-wide">
            Something went quiet.
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-gray font-light leading-relaxed max-w-xs mx-auto">
            An unexpected error occurred while loading this sanctuary page. Our butler service is currently looking into it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-colors cursor-pointer"
          >
            Retry Loading
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-border-dark text-[10px] uppercase tracking-[0.2em] font-medium text-text-offwhite rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
