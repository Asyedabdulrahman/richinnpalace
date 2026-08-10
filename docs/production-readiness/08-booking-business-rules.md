# 08 — Booking Business Rules & Flow Audit

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Booking Architecture & Lifecycle

```
[1. Room Selection] ──► [2. Date & Guest Selection] ──► [3. Guest Details Entry]
                                                                  │
┌─────────────────────────────────────────────────────────────────┘
▼
[4. Live Pricing & Tax Calculation]
    ├─ Base Rate = Room Price × Nights
    ├─ Luxury Tax = Math.round(Base Rate × 18%)
    └─ Estimated Grand Total = Base Rate + Luxury Tax
│
▼
[5. Client-Side Form Validation]
│
▼
[6. Reservation Request Dispatch via EmailJS SDK]
    │
    ├─► [SUCCESS] ──► Render Full-Page Luxury Confirmation View
    │                 └─► Instant VIP WhatsApp Click-to-Chat Button
    │
    └─► [FAILURE] ──► Render Error Banner with WhatsApp Direct Link
```

---

## 2. Business Rules & Validation Matrix

| Rule / Field | Implemented Behavior | Code Location | Status |
| :--- | :--- | :--- | :--- |
| **Empty Full Name** | Blocked with message: `"Please enter your full name."` | `src/components/booking/BookingClient.tsx:102` | **PASS** |
| **Empty / Invalid Email** | Validated using regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Blocked with message: `"Please enter a valid email address."` | `src/components/booking/BookingClient.tsx:103-104` | **PASS** |
| **Empty / Short Phone** | Validated `phone.trim().length >= 6`. Blocked with message: `"Please enter a valid contact phone number."` | `src/components/booking/BookingClient.tsx:105` | **PASS** |
| **Date Validity (NaN)** | Verified `isNaN(start.getTime()) \|\| isNaN(end.getTime())`. | `src/components/booking/BookingClient.tsx:108` | **PASS** |
| **Check-out Before / On Check-in** | Blocked with message: `"Check-out date must be after check-in date."` Minimum date attribute dynamically enforced on `<input type="date">`. | `src/components/booking/BookingClient.tsx:109, L317-324` | **PASS** |
| **Past Date Selection** | Date picker `min` set to today (`getTomorrowString(0)`). | `src/components/booking/BookingClient.tsx:299` | **PASS** |
| **Missing Room Selection** | Default fallback to first room in array; validation check present. | `src/components/booking/BookingClient.tsx:110` | **PASS** |
| **Room Maximum Capacity Enforcement** | **NOT ENFORCED**: The guest dropdown allows selecting 1–4 guests for all rooms, even though `haveli-room` and `garden-suite` specifications state a maximum occupancy of 2 adults. | `src/components/booking/BookingClient.tsx:332-343` | **POTENTIAL ISSUE / REQUIRES VERIFICATION** |
| **Special Requests Text Limit** | **UNBOUNDED**: `<textarea>` has no `maxLength` constraint. | `src/components/booking/BookingClient.tsx:392` | **POTENTIAL ISSUE / RECOMMEND 500 CHAR LIMIT** |
| **Duplicate Submissions** | Protected via `isSubmitting` guard and disabled submit button during request transit. | `src/components/booking/BookingClient.tsx:117, L456` | **PASS** |
| **Loading State Feedback** | Submit button shows animated spinner `<Loader2 className="animate-spin" />` and text `"SUBMITTING REQUEST..."`. | `src/components/booking/BookingClient.tsx:460-466` | **PASS** |
| **EmailJS Transit Failure** | Catches error, logs to console, and surfaces luxury error alert banner with direct concierge WhatsApp link. | `src/components/booking/BookingClient.tsx:173-177` | **PASS** |
| **WhatsApp Pre-filled Payload** | Constructs formatted stay summary with guest name, room, dates, duration, guests, and total amount. | `src/lib/whatsapp.ts:29-70` | **PASS** |
| **Semantic Representation** | Represented unambiguously as a **Reservation Request** / Enquiry, not an instant guaranteed charge. | Across all headings, badges, and confirmations | **PASS** |

---

## 3. Expected Business Rules — Requires Confirmation

1. **Room Capacity Constraints**: Should selecting a 2-guest room disable the 3 and 4 guest options in the dropdown, or should family room options automatically be suggested?
2. **Deposit / Advance Payment**: Is any advance payment gateway (e.g. Razorpay / Stripe) planned for future phases, or will payment strictly remain handled offline / on arrival by the front desk?
3. **Turnaround Time Guarantee**: The confirmation text indicates concierge response within 2–4 hours. Client should confirm this SLA matches their operational staffing.
