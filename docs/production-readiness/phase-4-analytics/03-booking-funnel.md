# 03 — Booking Conversion Funnel

**Audit Date**: August 10, 2026  
**Funnel Target**: Reservation Request Submission & WhatsApp Concierge Handover

---

## 1. Funnel Stages & Sequence

```
1. Visitor Landed (page_view)
      │
      ▼
2. Chamber Inspection (room_view)
      │
      ▼
3. CTA Click (book_now_click)
      │
      ▼
4. Booking Engine Entry (booking_started)
      │
      ▼
5. Chamber & Date Configuration (room_selected / date_selected)
      │
      ▼
6. Guest Information Entry (guest_details_started)
      │
      ▼
7. Reservation Request Dispatched (reservation_submitted)
      │
      ▼
8. WhatsApp Priority Handover (whatsapp_clicked)
```

---

## 2. Distinction Between Request & Confirmation

- `reservation_submitted` records a **Reservation Request Dispatch** (Email enquiry received by desk concierge).
- It does **not** indicate a finalized transaction or instant booking confirmation, preserving accurate hotel reporting semantics without generating false transaction counts in analytics reports.
