# 06 — Third-Party Services Inventory

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Third-Party Services Detailed Analysis

### Service 1: EmailJS (`@emailjs/browser`)
- **Purpose**: Transmits reservation request submissions from the browser directly to the hotel management's configured email address.
- **Where used**: `src/lib/emailjs.ts`, `src/components/booking/BookingClient.tsx`.
- **Data sent**: Guest name, guest email, guest phone number, requested room, branch name, check-in date, check-out date, stay duration, guest count, special requests, calculated base rate, GST tax, and estimated grand total.
- **Execution**: Client-side execution in the visitor's browser (`emailjs.send(...)`).
- **Required for core functionality**: **Yes** (Primary vehicle for receiving reservation requests).
- **Potential privacy impact**: Guest PII (name, email, phone) traverses EmailJS relays.
- **Potential performance impact**: Low (Lightweight asynchronous network request upon form submission).
- **Security / CSP Considerations**: Requires CSP connection permission to `https://api.emailjs.com`. Requires Domain Restriction & Rate Limiting in EmailJS Dashboard to prevent spam abuse.

---

### Service 2: WhatsApp Click-to-Chat (`wa.me`)
- **Purpose**: Provides immediate secondary communication channel for guests by creating a pre-formatted chat with the hotel concierge.
- **Where used**: `src/lib/whatsapp.ts`, `src/components/booking/BookingClient.tsx`, `src/components/booking/ReservationConfirmationView.tsx`.
- **Data sent**: URI-encoded message payload containing reservation reference, guest name, chamber, stay dates, guest count, and estimated total passed in the URL query string.
- **Execution**: Client-side redirect (`https://wa.me/<PHONE>?text=...`).
- **Required for core functionality**: **Yes** (Secondary VIP conversion pathway).
- **Potential privacy impact**: Low (Data stays within the guest's personal WhatsApp application and the hotel's business number).
- **Potential performance impact**: None (Native browser anchor redirect).
- **Security / CSP Considerations**: Standard outbound anchor navigation; no API keys required.

---

### Service 3: Cloudinary Video Delivery Network
- **Purpose**: Cloud streaming and automatic video format (`f_auto`) and quality (`q_auto`) delivery for MP4 showcase videos.
- **Where used**: `src/components/home/HeroSection.tsx`, `src/lib/data.ts` (room videos).
- **Data sent**: None (Asset retrieval only).
- **Execution**: Client-side media stream (`<video>` and `<source>` tags).
- **Required for core functionality**: **Yes** (Visual media presentation and luxury aesthetic).
- **Potential privacy impact**: None.
- **Potential performance impact**: Extremely positive (Offloads heavy 250MB+ local video bandwidth to optimized CDN edges).
- **Security / CSP Considerations**: Requires `media-src https://res.cloudinary.com` in Content Security Policy headers.

---

### Service 4: Google Fonts (`next/font/google`)
- **Purpose**: Loads typography styles (`Cormorant Garamond` serif and `Inter` sans-serif).
- **Where used**: `src/app/layout.tsx`.
- **Data sent**: None at runtime (Next.js automatically downloads and self-hosts fonts locally at build time).
- **Execution**: Server-side build-time font bundling.
- **Required for core functionality**: **Yes** (Typography & branding).
- **Potential privacy impact**: **None** (Self-hosted by Next.js; no direct runtime requests made to Google servers by clients).
- **Potential performance impact**: Zero layout shift (Automatic `font-display: swap` and local caching).
- **Security / CSP Considerations**: No external domain CSP needed for fonts due to Next.js build-time bundling.

---

### Service 5: Google Maps (External Link)
- **Purpose**: Allows guests to look up hotel branch directions on Google Maps.
- **Where used**: `src/app/rooms/[slug]/page.tsx`, `src/components/layout/Footer.tsx`.
- **Data sent**: Encoded address query string in URL.
- **Execution**: Client-side anchor link (`target="_blank"`).
- **Required for core functionality**: No (Informational link).
- **Potential privacy impact**: Standard external web link.
- **Potential performance impact**: None.
- **Security / CSP Considerations**: All links use `rel="noopener noreferrer"`.
