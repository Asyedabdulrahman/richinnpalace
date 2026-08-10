# 03 — Booking Business Logic Results

**Audit Date**: August 10, 2026  
**Target Module**: `src/components/booking/BookingClient.tsx` & `src/app/rooms/[slug]/StickyBookingPanel.tsx`  
**Overall Result**: PASS

---

## 1. Business Logic & State Machine Tests

### State Transition Flow
`Select Room → Select Branch → Select Dates & Guests → Provide Contact Details → Review Summary → Submit Enquiry Request → EmailJS & WhatsApp Confirmation`

| Test Scenario | Input / State | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Missing Room Query** | `/booking` without `?room=` | Default to first chamber (`haveli-room`) | Defaulted to `haveli-room` | **PASS** |
| **Invalid Room Query** | `/booking?room=invalid-slug` | Fallback to default chamber | Fallback to `haveli-room` | **PASS** |
| **Excessive Guests** | Select 4 guests for 2-guest room | Validation error / option capped | Dropdown capped; forced values rejected by validation | **PASS** |
| **Reverse Dates** | Check-in: 2026-08-20, Check-out: 2026-08-15 | Form submit blocked | `"Check-out date must be after check-in date."` displayed | **PASS** |
| **Same Day Check-in/Out** | Check-in: 2026-08-20, Check-out: 2026-08-20 | Form submit blocked | `"Check-out date must be after check-in date."` displayed | **PASS** |
| **Missing Contact Info** | Blank name, email, or phone | Submit button disabled / error shown | Submit button disabled; inline error on submission attempt | **PASS** |
| **Double Click Submit** | Rapid consecutive clicks on submit button | Single email dispatch; disable submit button | `isSubmitting` state instantly disables button and sets spinner | **PASS** |

---

## 2. Price Calculation Architecture Review

### Client-Side Price Derivation
- `basePrice`: Pulled from immutable read-only room data array in `src/lib/data.ts`.
- `nights`: Computed in render scope using `Math.ceil(diffTime / (1000 * 60 * 60 * 24))`.
- `luxuryTax`: Computed at 18% GST: `Math.round(baseTotal * 0.18)`.
- `grandTotal`: Sum of `baseTotal + luxuryTax`.

### Price Tampering Risk Assessment
- **Attack Vector**: A user could modify JavaScript runtime state or DOM properties to alter the displayed `grandTotal` or `basePrice`.
- **Business Impact**: **INFORMATIONAL / NO FINANCIAL RISK**. This application functions strictly as a *Reservation Request Engine* (inquiry dispatch via EmailJS and WhatsApp). No automated online payment gateway (e.g. Razorpay/Stripe) is connected, and guests pay nothing at request time. All rates are re-verified by desk concierge staff before sending formal booking confirmation.
