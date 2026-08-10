# 05 — Route & URL Inventory

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Internal Routes Inventory

| Route Path | Type | Dynamic Parameters | Page Purpose | Important Metadata / OpenGraph |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Static (`○`) | None | Main landing page showcasing hotel hero video, statistics, guest reviews, featured rooms, manifesto, gallery preview, FAQ, and footer CTA. | Title: "Rich Inn Palace Chennai", JSON-LD Hotel schema |
| `/about` | Static (`○`) | None | Hotel history, architectural details, and craft philosophy. | Canonical: `https://serahotel.com/about` (⚠️ Domain mismatch) |
| `/rooms` | Static (`○`) | None | Complete room catalogue displaying all 4 suites/chambers with amenities and details CTA. | Canonical: `https://serahotel.com/rooms` (⚠️ Domain mismatch) |
| `/rooms/[slug]` | Dynamic (`ƒ`) / SSG | `slug` (e.g. `haveli-room`, `garden-suite`, `signature-sanctuary`, `royal-palace-suite`) | Comprehensive chamber detail view with interactive image gallery, branch selector, chamber specifications, amenities, attractions, FAQs, and sticky pricing calculation widget. | Dynamic Title, Canonical `https://serahotel.com/rooms/[slug]`, JSON-LD `HotelRoom` schema |
| `/booking` | Static (`○`) | Query parameters: `?room=`, `?branch=`, `?checkin=`, `?checkout=`, `?guests=` | Bespoke reservation request form with live pricing calculation, luxury tax breakdown, and submission to hotel concierge. | No index tag not set, standard page metadata |
| `/gallery` | Static (`○`) | None | High-resolution image gallery highlighting architecture, suites, pool, and dining. | Canonical: `https://serahotel.com/gallery` (⚠️ Domain mismatch) |
| `/contact` | Static (`○`) | None | Concierge contact details, address cards, phone/email contact links, and JSON-LD structured data. | Canonical: `https://serahotel.com/contact`, JSON-LD `Hotel` schema |
| `/privacy` | Static (`○`) | None | Guest data collection, storage, and handling privacy policy. | Canonical: `https://serahotel.com/privacy` |
| `/terms` | Static (`○`) | None | Check-in/check-out timing, 72-hour cancellation rules, and guest conduct policies. | Canonical: `https://serahotel.com/terms` |
| `/_not-found` | Static (`○`) | None | Branded 404 Error page with return-to-home CTA. | Title: "Sanctuary Not Found" |
| `/robots.txt` | Static (`○`) | None | Search engine crawl directives. | Specifies `sitemap: https://serahotel.com/sitemap.xml` |
| `/sitemap.xml` | Static (`○`) | None | Dynamically generated XML sitemap containing all 8 static pages and 4 room routes. | Base URL: `https://serahotel.com` |

---

## 2. External URLs & Outbound Links Inventory

| Service / Destination | Code Location | URL Format | Purpose | Classification / Issue |
| :--- | :--- | :--- | :--- | :--- |
| **WhatsApp Deep Link** | `src/lib/whatsapp.ts:69` | `https://wa.me/919940241501?text=...` | Direct concierge WhatsApp chat with pre-filled enquiry | **Active / Production Ready** (Depends on `NEXT_PUBLIC_HOTEL_WHATSAPP_NUMBER`) |
| **Cloudinary Video CDN** | `src/lib/data.ts` (L60, L130, L195, L260), `src/components/home/HeroSection.tsx:59` | `https://res.cloudinary.com/u4u9xqwy/video/upload/...` | High-performance streaming for 4 room showcase videos and 1 hero background loop | **Active / Production Ready** |
| **Google Maps Search** | `src/app/rooms/[slug]/page.tsx:175` | `https://www.google.com/maps/search/?api=1&query=...` | Opens branch address search on Google Maps | **Active / Functional** |
| **Google Maps Generic** | `src/lib/data.ts:37` | `https://maps.google.com` | Generic fallback link | **Placeholder URL**: Needs actual Google Business Profile listing URL |
| **Instagram Profile** | `src/components/layout/Footer.tsx:32` | `https://instagram.com/richinnpalace` | Hotel social media presence | **Unverified Handle**: Requires client verification |
| **Email Links** | `src/components/layout/Footer.tsx:112`, `src/app/contact/page.tsx:119` | `mailto:reservations@serahotel.com` | Outbound email link | **Placeholder Domain (`serahotel.com`)**: Requires client verification |
| **Phone Call Links** | `src/components/layout/Footer.tsx:102`, `src/app/contact/page.tsx:103` | `tel:+911415550198` | Direct phone call | **Unverified / Jaipur area code (`0141`)**: Requires client verification |

---

## 3. Domain Configuration & SEO Anomalies

- **Canonical Base Domain**: Across `sitemap.ts`, `robots.ts`, `about/page.tsx`, `contact/page.tsx`, `rooms/page.tsx`, `rooms/[slug]/page.tsx`, `gallery/page.tsx`, `privacy/page.tsx`, and `terms/page.tsx`, the base domain is hardcoded as:
  ```
  https://serahotel.com
  ```
  This is a placeholder domain that must be updated to the client's actual production domain (e.g. `https://richinnpalace.com` or custom domain) before launch to avoid severe SEO canonical conflicts and sitemap crawl failures.
