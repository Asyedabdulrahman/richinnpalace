# 02 — Event Taxonomy & Schema Definition

**Audit Date**: August 10, 2026  
**Standard**: Google Analytics 4 Custom Events (Strict Zero-PII)

---

## 1. Event Taxonomy Matrix

| Event Name | Trigger Context | Safe Parameters Transmitted | PII Audit |
| :--- | :--- | :--- | :--- |
| **`page_view`** | Route navigation | `page_location`, `page_title` | **ZERO PII** |
| **`room_view`** | Clicking / viewing a chamber card or details | `room_id`, `room_category`, `price_per_night` | **ZERO PII** |
| **`book_now_click`** | Clicking any primary "Book Stay" CTA | `source` (`hero`, `navbar`, `room_detail`, etc.), `room_id` | **ZERO PII** |
| **`booking_started`** | Entering the booking interface | `source`, `room_id`, `branch_id` | **ZERO PII** |
| **`room_selected`** | Changing chamber in dropdown selector | `room_id`, `room_name`, `branch_id` | **ZERO PII** |
| **`date_selected`** | Selecting check-in / check-out dates | `duration_nights` | **ZERO PII** |
| **`guest_details_started`** | Focusing on contact input fields | `room_id`, `duration_nights`, `guest_count` | **ZERO PII** |
| **`reservation_submitted`** | Successful EmailJS reservation dispatch | `room_id`, `room_name`, `duration_nights`, `guest_count`, `estimated_total`, `branch_name`, `currency` | **ZERO PII** |
| **`reservation_failed`** | EmailJS dispatch network error | `room_id`, `error_type` | **ZERO PII** |
| **`whatsapp_clicked`** | Clicking WhatsApp Concierge chat button | `source`, `room_id` | **ZERO PII** |
| **`phone_clicked`** | Clicking telephone link (`tel:`) | `source` | **ZERO PII** |
| **`email_clicked`** | Clicking mailto link (`mailto:`) | `source` | **ZERO PII** |
| **`map_clicked`** | Clicking Google Maps address link | `source` | **ZERO PII** |
| **`gallery_opened`** | Interacting with room/sanctuary gallery | `source`, `room_id` | **ZERO PII** |
