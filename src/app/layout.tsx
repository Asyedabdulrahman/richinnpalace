import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serahotel.com"),
  title: {
    default: "SÉRA | Luxury Hotel & Sanctuary Jaipur",
    template: "%s | SÉRA Jaipur",
  },
  description: "Experience unhurried luxury at SÉRA Jaipur. A quiet retreat of twenty-eight keys and dedicated butler care set against the historical Aravalli hills.",
  keywords: ["Luxury Hotel Jaipur", "Boutique Resort Rajasthan", "Sera Hotel Jaipur", "Jaipur Luxury Stay", "Aravalli Hills Resort", "Heritage Sanctuary Jaipur"],
  authors: [{ name: "SÉRA Hospitality Group" }],
  creator: "SÉRA Hospitality Group",
  publisher: "SÉRA Hospitality Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SÉRA | Luxury Hotel & Sanctuary Jaipur",
    description: "Experience unhurried luxury at SÉRA Jaipur. A quiet retreat of twenty-eight keys and dedicated butler care.",
    url: "https://serahotel.com",
    siteName: "SÉRA Hotel",
    images: [
      {
        url: "/images/photo1.avif",
        width: 1200,
        height: 630,
        alt: "SÉRA Jaipur Luxury Sanctuary Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SÉRA | Luxury Hotel & Sanctuary Jaipur",
    description: "Experience unhurried luxury at SÉRA Jaipur. A quiet retreat of twenty-eight keys and dedicated butler care.",
    images: ["/images/photo1.avif"],
  },
  alternates: {
    canonical: "https://serahotel.com",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  // Structured data for SEO (Hotel, Organization, LocalBusiness)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": "https://serahotel.com/#hotel",
        "name": "SÉRA Resorts & Sanctuary",
        "description": "Experience unhurried luxury at SÉRA Jaipur. A quiet retreat of twenty-eight keys and dedicated butler care.",
        "image": "https://serahotel.com/images/photo1.avif",
        "telephone": "+91 141 555 0198",
        "email": "reservations@serahotel.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "NH-8, Amber Road",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302028",
          "addressCountry": "IN"
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": "5.0"
        },
        "priceRange": "INR 12800 - INR 34500",
        "numberOfRooms": 28,
        "checkinTime": "14:00",
        "checkoutTime": "12:00"
      },
      {
        "@type": "Organization",
        "@id": "https://serahotel.com/#organization",
        "name": "SÉRA Hotels Group",
        "url": "https://serahotel.com",
        "logo": "https://serahotel.com/images/logo.png"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-dark text-text-offwhite overflow-x-hidden selection:bg-gold selection:text-bg-dark font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col pt-0 pb-20 md:pb-0">
          {children}
          {modal}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
