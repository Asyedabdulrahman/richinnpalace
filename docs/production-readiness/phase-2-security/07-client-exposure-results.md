# 07 — Client Exposure & Privacy Results

**Audit Date**: August 10, 2026  
**Target Scope**: Compiled Client Bundles, Environment Variables, Web Storage  
**Overall Result**: PASS

---

## 1. Secret & Sensitive Data Inspection

### Environment Variable Audit
- `NEXT_PUBLIC_SITE_URL`: Public web application domain URL (Public by design).
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Public EmailJS service identifier (Public by design).
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Public EmailJS template identifier (Public by design).
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: EmailJS client public key (Public by design).
- `NEXT_PUBLIC_HOTEL_WHATSAPP_NUMBER`: Public concierge WhatsApp number (Public by design).

**Secret Leakage Verification**:
- **Private Keys**: 0 detected.
- **Database Credentials**: 0 detected.
- **OAuth Client Secrets**: 0 detected.
- **Internal API Tokens**: 0 detected.

---

## 2. Client-Side Storage & Guest PII Audit

### Web Storage (`localStorage` / `sessionStorage`) Inspection
- `localStorage.getItem()` / `localStorage.setItem()`: 0 invocations.
- `sessionStorage.getItem()` / `sessionStorage.setItem()`: 0 invocations.
- `document.cookie`: 0 custom cookie writes.

**Verdict**: The application writes zero persistent client storage entries. Guest PII (full name, email address, telephone number, dietary preferences) exists solely in transient React component state (`useState`) during active session navigation.

---

## 3. Browser History & URL Data Transmission

- **Confirmation Flow**:
  Upon successful submission, the guest details are passed into the WhatsApp web link generator (`buildWhatsAppUrl()`), producing a standard `https://wa.me/919940241501?text=...` anchor tag.
- **Privacy Note**:
  The pre-filled message text in the WhatsApp URL contains guest reservation details (Name, Dates, Room Name). This is standard for click-to-chat concierge handoffs and requires explicit guest user action (clicking the WhatsApp button) to initiate communication.
