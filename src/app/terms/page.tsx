import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms & Cancellation Policy | Rich Inn Palace Chennai",
  description:
    "Terms of Stay and Cancellation Policy for Rich Inn Palace Chennai. Review check-in times, payment guidelines, and cancellation rules.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium block mb-2">
            RESERVATION GUIDELINES
          </span>
          <h1 className="font-serif text-4xl text-text-offwhite font-light">Terms & Cancellation Policy</h1>
        </div>

        <div className="space-y-6 text-xs text-text-gray font-light leading-relaxed border-t border-border-dark/60 pt-8">
          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">1. Check-In & Check-Out Times</h2>
            <p>
              Standard check-in time is at 14:00 PM. Check-out time is requested by 12:00 PM noon. Early arrival or extended late departures are subject to room availability and prior written confirmation with the concierge desk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">2. Cancellation & Modification Policy</h2>
            <p>
              Complimentary cancellations or modification requests are honored up to 72 hours prior to scheduled arrival date. Cancellations made within 72 hours of arrival may be subject to a fee equal to one night’s room charge plus applicable taxes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">3. Guest Conduct & Property Care</h2>
            <p>
              Rich Inn Palace is a quiet sanctuary dedicated to unhurried relaxation. Guests are kindly requested to maintain peaceful sound levels in common courtyards after 22:00 PM.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
