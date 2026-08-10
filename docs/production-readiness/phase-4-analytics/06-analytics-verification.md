# 06 — Analytics Verification & Failure Testing

**Audit Date**: August 10, 2026  
**Status**: VERIFIED & PASSING

---

## 1. Event Trigger & Parameter Verification

| Event Tested | Trigger Action | Emitted Parameters | Result |
| :--- | :--- | :--- | :--- |
| `page_view` | Initial page load | `page_location`, `page_title` | **PASS** |
| `book_now_click` | Click "Book Your Stay" in Navbar / Hero | `source="navbar"`, `source="hero"` | **PASS** |
| `room_view` | Click on room card in `/rooms` | `room_id="haveli-room"`, `price_per_night=12800` | **PASS** |
| `booking_started` | Navigate to `/booking` | `source="booking_page"`, `room_id="haveli-room"` | **PASS** |
| `room_selected` | Select different room in dropdown | `room_id="garden-suite"`, `room_name="..."` | **PASS** |
| `date_selected` | Change check-in / check-out | `duration_nights=2` | **PASS** |
| `guest_details_started`| Focus on Full Name input | `room_id="haveli-room"`, `duration_nights=2` | **PASS** |
| `reservation_submitted`| Complete reservation enquiry | `room_id="haveli-room"`, `estimated_total=30208` | **PASS** |
| `whatsapp_clicked` | Click WhatsApp priority button | `source="booking_confirmation"`, `room_id="..."` | **PASS** |
| `phone_clicked` | Click phone link in footer | `source="footer"` | **PASS** |
| `email_clicked` | Click email link in footer | `source="footer"` | **PASS** |

---

## 2. Failure & Ad-Blocker Resilience Test

- **Scenario**: `window.gtag` blocked by privacy extensions or network failure.
- **Verification**: `trackEvent()` encapsulates execution within `try { if (typeof window.gtag === 'function') ... } catch {}`.
- **Result**: Booking form, date calculations, EmailJS submission, and WhatsApp redirections operate flawlessly without console exceptions or broken UI flows.
