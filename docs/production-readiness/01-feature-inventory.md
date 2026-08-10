# 01 — Production Feature Inventory

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE (Baseline established)

---

## 1. Pages & Routes Inventory

| Route | Purpose | Important Components | Rendering Mode | Data Source |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Landing / Home Page | `HeroSection`, `StatsSection`, `TestimonialsSection`, `FeaturedRooms`, `ManifestoSection`, `GallerySection`, `FAQSection`, `CTASection` | Static (`○`) | Static data from `@/lib/data.ts` |
| `/about` | Hotel Heritage & Story | Hero, Image Grids, Architecture/Philosophy Story Blocks, Value Pillars, CTA | Static (`○`) | Hardcoded in `about/page.tsx` & `@/lib/data.ts` |
| `/rooms` | Room / Chamber Directory | `RoomsClient`, `RoomCardMedia` | Static (`○`) | Static data from `@/lib/data.ts` (`rooms` array) |
| `/rooms/[slug]` | Individual Room Detail | `RoomGallery`, `BranchDropdownSelector`, `AccordionFAQ`, `StickyBookingPanel` | Dynamic (`ƒ`) / SSG with `generateStaticParams` | Static data from `@/lib/data.ts` |
| `/booking` | Reservation Request Form | `BookingClient`, `BookingContent`, `ReservationConfirmationView` | Static (`○`) / Client-side interactive | `@/lib/data.ts`, URL search params, EmailJS |
| `/gallery` | Visual Photography Chronicle | Image Grid, Filter Categories, CTA Banner | Static (`○`) | Hardcoded gallery array in `gallery/page.tsx` |
| `/contact` | Concierge & Location | Contact details, Address card, Directions, FAQ | Static (`○`) | `@/lib/data.ts`, JSON-LD schema |
| `/privacy` | Legal Privacy Policy | Privacy sections, contact email | Static (`○`) | Static JSX |
| `/terms` | Terms & Cancellation Rules | Check-in/out, Cancellation rules, Conduct | Static (`○`) | Static JSX |
| `/_not-found` | 404 Error Page | `NotFound` custom branded component | Static (`○`) | Static JSX |
| `/robots.txt` | Search engine crawler rules | `robots()` route handler | Static (`○`) | Generated in `robots.ts` |
| `/sitemap.xml` | XML sitemap for SEO | `sitemap()` route handler | Static (`○`) | Generated from static routes & `rooms` in `sitemap.ts` |

---

## 2. Navigation Architecture

### Header Navigation (`Navbar.tsx`)
- **Brand Logo**: Links to `/` ("Rich Inn Palace").
- **Navigation Links**:
  - `HOME` → `/`
  - `ROOMS` → `/rooms`
  - `ABOUT` → `/about`
  - `GALLERY` → `/gallery`
  - `CONTACT` → `/contact`
- **Primary CTA**: "Book Your Stay" → redirects to `/rooms`.
- **Mobile View**: Symmetrical 3-column top header with "ESTD. 2001", Logo, and "CHENNAI · IN".

### Mobile Navigation Bar (`MobileNav.tsx`)
- Fixed bottom navigation bar on mobile viewports (`md:hidden`).
- Icons/Links:
  - `Home` (`/`)
  - `Chambers` (`/rooms`)
  - `Gallery` (`/gallery`)
  - `Enquire` (`/booking`)

### Footer Navigation (`Footer.tsx`)
- Note: Conditionally hidden on all `/rooms` routes via `usePathname().startsWith("/rooms")`.
- Brand description and Established year.
- **Branches Column**: Lists T.Nagar Grand, T.Nagar South, Vadapalani Central, Vadapalani West, T.Nagar Club.
- **Sanctuary Column**: Links to Home, Our Rooms & Suites, About & Manifesto, Sanctuary Gallery, Location & Contact, Reserve a Stay.
- **Enquiries Column**:
  - Phone link (`tel:+911415550198`)
  - Email link (`mailto:reservations@serahotel.com`)
  - Physical address
- **Newsletter Subscription**: Dummy input and "Subscribe" button (non-functional mock).
- **Legal Links**: Privacy Policy (`/privacy`), Terms & Cancellation (`/terms`).

---

## 3. Booking & Reservation Request Flow

The booking flow represents a **Reservation Request** mechanism rather than an automated instant booking engine:

```
[User Selects Room/Dates/Guests]
               │
               ▼
[Fills Name, Email, Phone, Special Requests]
               │
               ▼
[Client-side Validation in BookingClient.tsx]
               │
               ▼
[Submits via EmailJS SDK (@emailjs/browser)]
               │
      ┌────────┴────────┐
      ▼                 ▼
  [Success]         [Failure]
      │                 │
      ▼                 ▼
[Full-Page Luxury]   [Error Banner with]
[Confirmation UI]    [WhatsApp Fallback]
      │
      ▼
[Click-to-Chat WhatsApp with Pre-filled Stay Data]
```

### Key Functional Aspects of Booking Flow
- **Room Selection**: Query param `?room=` pre-selects chamber; fallback to first room in array.
- **Branch Selection**: Query param `?branch=` pre-selects branch; dropdown selector dynamically updates according to the active room.
- **Date Picker**:
  - Check-in: HTML5 date input, minimum date calculated as tomorrow (`offsetDays = 0` from today).
  - Check-out: Dynamic minimum set to Check-In + 1 day.
  - Duration calculation: Direct day difference computed via `useMemo`.
- **Guest Selector**: 1 to 4 Guests dropdown selector.
- **Pricing Breakdown**:
  - Base Rate: Room price × number of nights.
  - Luxury GST (18%): Calculated as `Math.round(baseTotal * 0.18)`.
  - Estimated Grand Total: Base Total + Luxury Tax.
- **Submission Handler**:
  - Prevents duplicate clicks while `isSubmitting` is true.
  - Generates a reference code `RQ` + last 6 digits of timestamp.
  - Calls `sendReservationEmail()` in `@/lib/emailjs.ts`.
  - On success: Switches view to `ReservationConfirmationView`.
- **WhatsApp Integration**:
  - Constructs pre-filled message via `buildWhatsAppUrl()` in `@/lib/whatsapp.ts`.
  - Links to `https://wa.me/<HOTEL_NUMBER>?text=<ENCODED_MESSAGE>`.

---

## 4. Media & Assets Inventory

### Images
- Served from Next.js public directory (`/public/images/`):
  - `photo1.avif` (132 KB)
  - `photos2.avif` (185 KB)
  - `photos3.jpg` (196 KB)
  - `photos4.jpg` (376 KB)
  - `photos5.jpg` (347 KB)
  - `photos6.jpg` (284 KB)
  - `photos7.jpg` (154 KB)
  - `photos8.jpg` (121 KB)
  - `photos9.jpg` (170 KB)
- All images use `next/image` with responsive `sizes` attributes and `priority` flags on above-the-fold hero elements.

### Videos
- **Cloudinary Hosted (Active in code)**:
  - Hero Background: `https://res.cloudinary.com/u4u9xqwy/video/upload/q_auto,f_auto/v1786340853/t_nagar_outro.mp4`
  - T.Nagar (Haveli): `https://res.cloudinary.com/u4u9xqwy/video/upload/q_auto,f_auto/v1786340853/t_nagar_2.mp4`
  - Vadapalani: `https://res.cloudinary.com/u4u9xqwy/video/upload/q_auto,f_auto/v1786341698/reel_2_v.mp4`
  - T.Nagar Plunge Pool: `https://res.cloudinary.com/u4u9xqwy/video/upload/q_auto,f_auto/v1786340925/t_nagar_5bhk.mp4`
  - Royal Palace: `https://res.cloudinary.com/u4u9xqwy/video/upload/q_auto,f_auto/v1786341698/reel_2_v.mp4`
- **Local Unused Videos (`/public/videos/`)**:
  - 4 local `.mp4` video files totaling **254.1 MB** remain in `/public/videos/` without active references in code.

### Animations
- Built with `framer-motion` for page transitions, fade-ups, smooth stagger animations, and modal transitions.

---

## 5. External Integrations Inventory

1. **EmailJS (`@emailjs/browser`)**: Client-side SDK sending contact/booking data directly to hotel reservation inbox.
2. **WhatsApp Click-to-Chat (`wa.me`)**: Deep-link URL generator opening WhatsApp with pre-filled reservation enquiry payload.
3. **Cloudinary**: Cloud video delivery CDN serving optimized video streams with `q_auto,f_auto`.
4. **Google Maps**: External search link pointing to hotel branches in Chennai.
5. **Google Fonts (`next/font/google`)**: Loads `Cormorant Garamond` (serif) and `Inter` (sans-serif) with CSS variable binding.
