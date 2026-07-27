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
    default: "Rich Inn Palace | Luxury Hotel & Sanctuary Chennai",
    template: "%s | Rich Inn Palace Chennai",
  },
  description: "Experience unhurried luxury at Rich Inn Palace Chennai. A quiet retreat of twenty-eight keys and dedicated butler care in T.Nagar.",
  keywords: ["Luxury Hotel Chennai", "Boutique Resort Tamil Nadu", "Rich Inn Palace Hotel Chennai", "Chennai Luxury Stay", "T.Nagar Resort", "Heritage Sanctuary Chennai"],
  authors: [{ name: "Rich Inn Palace Hospitality Group" }],
  creator: "Rich Inn Palace Hospitality Group",
  publisher: "Rich Inn Palace Hospitality Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rich Inn Palace | Luxury Hotel & Sanctuary Chennai",
    description: "Experience unhurried luxury at Rich Inn Palace Chennai. A quiet retreat of twenty-eight keys and dedicated butler care.",
    url: "https://serahotel.com",
    siteName: "Rich Inn Palace Hotel",
    images: [
      {
        url: "/images/photo1.avif",
        width: 1200,
        height: 630,
        alt: "Rich Inn Palace Chennai Luxury Sanctuary Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rich Inn Palace | Luxury Hotel & Sanctuary Chennai",
    description: "Experience unhurried luxury at Rich Inn Palace Chennai. A quiet retreat of twenty-eight keys and dedicated butler care.",
    images: ["/images/photo1.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  // Structured data for SEO (Hotel, Organization, LocalBusiness, WebSite)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": "https://serahotel.com/#hotel",
        "name": "Rich Inn Palace Resorts & Sanctuary",
        "description": "Experience unhurried luxury at Rich Inn Palace Chennai. A quiet retreat of twenty-eight keys and dedicated butler care.",
        "image": "https://serahotel.com/images/photo1.avif",
        "telephone": "+91 141 555 0198",
        "email": "reservations@serahotel.com",
        "url": "https://serahotel.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Usman Road, T.Nagar",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600017",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.0418",
          "longitude": "80.2341"
        },
        "hasMap": "https://maps.google.com/?q=TNagar+Chennai",
        "sameAs": [
          "https://instagram.com/richinnpalace",
          "https://facebook.com/richinnpalace",
          "https://twitter.com/richinnpalace"
        ],
        "starRating": {
          "@type": "Rating",
          "ratingValue": "5.0"
        },
        "priceRange": "INR 12800 - INR 34500",
        "numberOfRooms": 28,
        "checkinTime": "14:00",
        "checkoutTime": "12:00",
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Private Butler Care", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Fine Dining Restaurant", "value": true }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://serahotel.com/#organization",
        "name": "Rich Inn Palace Hotels Group",
        "url": "https://serahotel.com",
        "logo": "https://serahotel.com/images/logo.png",
        "sameAs": [
          "https://instagram.com/richinnpalace",
          "https://facebook.com/richinnpalace"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://serahotel.com/#website",
        "url": "https://serahotel.com",
        "name": "Rich Inn Palace Chennai",
        "publisher": {
          "@id": "https://serahotel.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://serahotel.com/rooms?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
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
