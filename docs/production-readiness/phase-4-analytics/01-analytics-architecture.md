# 01 — Analytics Architecture

**Audit Date**: August 10, 2026  
**Platform**: Google Analytics 4 (Measurement ID: `G-FLKG46R9CB`)  
**Design Philosophy**: Privacy-First, Zero-PII, Non-Blocking, Fault-Tolerant

---

## 1. System Architecture & Component Hierarchy

```
+-------------------------------------------------------------+
|                     Next.js Root Layout                     |
|  - next/script (gtag.js async deferred load afterInteractive)|
|  - Configures G-FLKG46R9CB with anonymize_ip: true           |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|              src/lib/analytics.ts (Central Engine)          |
|  - Strict PII sanitization filter                            |
|  - Safe window.gtag error boundary & try/catch wrapper      |
|  - Type-safe telemetry helper functions                     |
+-------------------------------------------------------------+
                              |
     +------------------------+------------------------+
     |                        |                        |
     v                        v                        v
[Booking Engine]       [Marketing CTAs]       [Room Showcase]
- booking_started      - book_now_click       - room_view
- room_selected        - whatsapp_clicked     - date_selected
- guest_details_start  - phone_clicked        - gallery_opened
- reservation_submit   - email_clicked
- reservation_failed   - map_clicked
```

---

## 2. Fault Tolerance & Non-Blocking Design

1. **Ad-Blocker Resilience**: If a visitor uses uBlock Origin, Brave Shields, or privacy extensions, all `window.gtag` calls silently no-op without triggering JavaScript exceptions or degrading application functionality.
2. **Zero Interaction Delay**: Script execution is assigned `strategy="afterInteractive"`, ensuring that initial page DOM parsing and interactivity (INP) are never blocked by analytics tracking.
