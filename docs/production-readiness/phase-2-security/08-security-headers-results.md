# 08 — Security Headers & Clickjacking Results

**Audit Date**: August 10, 2026  
**Target Module**: `next.config.ts`  
**Overall Result**: PASS

---

## 1. HTTP Response Header Verification

| Header Name | Configured Directive / Value | Security Benefit | Status |
| :--- | :--- | :--- | :--- |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | Forces encrypted HSTS connections for 1 year | **PASS** |
| **Content-Security-Policy** | Custom policy tailored for Cloudinary, EmailJS & Maps | Restricts script execution, frames, and external fetches | **PASS** |
| **X-Frame-Options** | `DENY` | Prevents framing and clickjacking attacks | **PASS** |
| **X-Content-Type-Options** | `nosniff` | Disables MIME type sniffing by browsers | **PASS** |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Limits cross-origin referrer leakage | **PASS** |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Blocks access to device sensors | **PASS** |

---

## 2. Content Security Policy (CSP) Analysis

```next.config.ts
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://res.cloudinary.com https://*.google.com https://*.googleapis.com;
media-src 'self' https://res.cloudinary.com;
font-src 'self' data:;
connect-src 'self' https://api.emailjs.com https://*.google.com https://*.googleapis.com;
frame-src 'self' https://www.google.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
```

- **Resource Compatibility Check**:
  - EmailJS API (`https://api.emailjs.com`): Permitted under `connect-src`.
  - Cloudinary CDN (`https://res.cloudinary.com`): Permitted under `img-src` and `media-src`.
  - Google Maps (`https://www.google.com`): Permitted under `frame-src` and `connect-src`.
- **Clickjacking Evaluation**: `frame-ancestors 'none'` combined with `X-Frame-Options: DENY` ensures arbitrary third-party websites cannot embed the Rich Inn Palace website inside an `<iframe>`, neutralizing clickjacking vectors.
