/**
 * Centralized Site Configuration & Production Environment Constants
 */
export const SITE_CONFIG = {
  name: "Rich Inn Palace",
  tagline: "Luxury, redefined.",
  subTitle: "ESTD. 2001 | CHENNAI · IN",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://richinnpalace.com",
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://richinnpalace.com",
  contact: {
    email: process.env.NEXT_PUBLIC_HOTEL_EMAIL || "reservations@richinnpalace.com",
    phone: "+91 99402 41501",
    altPhone: "+91 89390 07600",
    address: "Rich Inn Palace, T.Nagar, Chennai, Tamil Nadu, 600017, India",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rich+Inn+Palace+T.Nagar+Chennai",
  },
};
