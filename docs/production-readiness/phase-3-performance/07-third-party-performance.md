# 07 — Third-Party Performance & Resource Audit

**Audit Date**: August 10, 2026  
**External Services**: Google Analytics 4, Cloudinary CDN, EmailJS API, Google Maps

---

## 1. Third-Party Resource Loading Strategy

| Service | Hostname | Loading Strategy | Blocking / Deferred | Impact on LCP |
| :--- | :--- | :--- | :--- | :--- |
| **Google Analytics** | `www.googletagmanager.com` | `strategy="afterInteractive"` | **Deferred** (Loads after hydration) | Zero impact on LCP/FCP |
| **Cloudinary CDN** | `res.cloudinary.com` | Async Video & Streaming | **Async** (On-demand) | Fast global CDN caching |
| **EmailJS API** | `api.emailjs.com` | Client fetch on Form Submit | **On-Demand** (Submit click only) | Zero impact on initial page load |
| **Google Maps** | `maps.google.com` | Outbound anchor links | **Zero-load** (Standard `<a>` tag) | Zero page payload |

---

## 2. Asynchronous Non-Blocking Verification

- **Google Tag Manager (`gtag.js`)**: Configured with Next.js `<Script strategy="afterInteractive" />`. Execution is deferred until the main thread has completed parsing critical DOM and CSS nodes.
- **EmailJS SDK**: `@emailjs/browser` is only executed when a guest actively clicks the form submission button, ensuring zero CPU overhead during page browsing.
