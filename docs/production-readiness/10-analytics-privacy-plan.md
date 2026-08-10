# 10 — Analytics & Privacy Measurement Plan

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE (Planning Baseline)

---

## 1. Current State of Tracking & Analytics

- **Google Analytics (GA4)**: **Not implemented**. (No `gtag.js` or `next/script` GA scripts present).
- **Microsoft Clarity / Hotjar**: **Not implemented**.
- **Facebook Pixel / Meta CAPI**: **Not implemented**.
- **Custom Event Dispatchers**: None present.
- **Cookies & Tracking Storage**: No tracking cookies or advertising pixels are currently loaded.
- **Privacy Policy**: Exists at `/privacy`, but lists placeholder contact email `reservations@serahotel.com`.

---

## 2. Privacy Architecture & PII Protection Rules

### Mandatory Privacy Constraints for Analytics Implementation
> [!IMPORTANT]
> In accordance with privacy standards (GDPR, India Digital Personal Data Protection Act 2023), **NO Personally Identifiable Information (PII)** may ever be transmitted to third-party analytics platforms.

Under no circumstances should any event payload include:
- ❌ Guest Full Name
- ❌ Guest Email Address
- ❌ Guest Phone Number
- ❌ Raw Special Request Text
- ❌ Exact Room Suite Reference Codes tied to identifiable guests

Permissible parameters are strictly non-identifiable commercial attributes (e.g. `room_type`, `nights_count`, `guests_count`, `currency`, `estimated_value`).

---

## 3. Recommended Measurement Plan (Phase 1 / Future)

| Event Name | User Action / Trigger | Business Purpose | Permissible Event Parameters (No PII) | Recommended Target Platform |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | User navigates to any route | Measure traffic and page engagement | `page_path`, `page_title` | GA4 / Vercel Web Analytics |
| `room_view` | User views a room details page (`/rooms/[slug]`) | Measure popularity of individual chambers | `room_id`, `room_name`, `room_category`, `price_per_night` | GA4 |
| `booking_started` | User clicks "Book Your Stay", "Details", or lands on `/booking` | Measure top-of-funnel conversion intent | `source_page`, `selected_room_id` | GA4 |
| `room_selected` | User toggles room dropdown in booking form | Measure chamber preference shifts | `room_id`, `branch_id`, `room_price` | GA4 |
| `date_selected` | User chooses check-in and check-out dates | Measure average length of stay interest | `duration_nights`, `lead_time_days` | GA4 |
| `guest_details_started` | User focuses into the guest name / email inputs | Track mid-funnel progression | `step: "guest_details"` | GA4 |
| `reservation_submitted` | Successful EmailJS dispatch | Measure completed reservation request volume and estimated pipeline value | `room_id`, `nights`, `guests_count`, `estimated_value`, `currency: "INR"` | GA4 / Meta CAPI (Offline) |
| `reservation_failed` | EmailJS network / API error | Monitor technical reservation failures in real-time | `error_type: "emailjs_failure"` | GA4 / Sentry |
| `whatsapp_clicked` | User clicks WhatsApp floating / confirmation button | Measure high-intent VIP direct concierge chats | `source_location: "confirmation_view" \| "error_banner"`, `room_id` | GA4 |
| `phone_clicked` | User clicks phone number link (`tel:`) | Track direct telephone inquiries | `phone_number_label`, `page_location` | GA4 |
| `email_clicked` | User clicks email link (`mailto:`) | Track direct email inquiries | `page_location` | GA4 |
| `map_clicked` | User clicks "Google Maps" directions button | Measure local navigation interest | `branch_name`, `page_location` | GA4 |

---

## 4. Privacy & Consent Compliance Recommendations

1. **Vercel Web Analytics (Privacy-First)**: For initial launch, lightweight privacy-friendly analytics (like Vercel Analytics) can be enabled without requiring invasive cookie consent banners.
2. **Cookie Consent Banner**: If GA4 or advertising conversion pixels (Meta/Google Ads) are introduced in later phases, an explicit cookie consent banner must be deployed prior to firing third-party cookies.
3. **Privacy Policy Update**: Replace `reservations@serahotel.com` in `/privacy` with the actual hotel domain privacy contact email.
