import type { Metadata } from "next";
import RoomsClient from "@/components/rooms/RoomsClient";

export const metadata: Metadata = {
  title: "Sanctuaries & Luxury Chambers | Rich Inn Palace Chennai",
  description:
    "Discover twenty-eight hand-built residential chambers in Chennai crafted with private plunge pools, courtyards, and dedicated butler care.",
  keywords: [
    "Chennai Luxury Rooms",
    "Rich Inn Palace Chambers",
    "Resort Suites Tamil Nadu",
    "Chennai Plunge Pool Hotel",
    "Heritage Suites Chennai",
  ],
  alternates: {
    canonical: "https://serahotel.com/rooms",
  },
  openGraph: {
    title: "Sanctuaries & Luxury Chambers | Rich Inn Palace Chennai",
    description:
      "Discover twenty-eight hand-built residential chambers in Chennai crafted with natural lime plaster.",
    url: "https://serahotel.com/rooms",
    siteName: "Rich Inn Palace Hotel",
    images: [
      {
        url: "/images/photo1.avif",
        width: 1200,
        height: 630,
        alt: "Rich Inn Palace Chennai Luxury Chambers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanctuaries & Luxury Chambers | Rich Inn Palace Chennai",
    description:
      "Discover twenty-eight hand-built residential chambers in Chennai.",
    images: ["/images/photo1.avif"],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
