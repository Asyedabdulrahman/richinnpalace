import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Rich Inn Palace Chennai",
  description:
    "Privacy Policy for Rich Inn Palace Chennai. Learn how we handle guest information, reservation data, and security protocols.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg-dark min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium block mb-2">
            LEGAL & TRUST
          </span>
          <h1 className="font-serif text-4xl text-text-offwhite font-light">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-xs text-text-gray font-light leading-relaxed border-t border-border-dark/60 pt-8">
          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">1. Information Collection</h2>
            <p>
              Rich Inn Palace collects personal information provided directly by guests during booking inquiries, room reservations, and check-in procedures (including full name, email address, contact telephone, and identity verification documents required under local laws).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">2. Use of Guest Data</h2>
            <p>
              Your personal details are strictly used to fulfill reservation requests, process payments, arrange requested private transfers, and communicate essential concierge arrival details. We do not sell, rent, or trade guest personal information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">3. Data Security & Storage</h2>
            <p>
              All reservation details and digital communications are processed through encrypted channels. Physical records captured at check-in are safeguarded in accordance with hospitality data protection standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm text-text-offwhite font-medium">4. Contact & Inquiries</h2>
            <p>
              For questions regarding your data privacy or to request update/deletion of your contact information, please write to our privacy officer at <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-gold underline">{SITE_CONFIG.contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
