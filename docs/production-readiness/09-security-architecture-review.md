# 09 — Security Architecture Review

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Security Baseline & Findings Summary

| Security Category | Severity | Current Status | Finding / Recommendation |
| :--- | :--- | :--- | :--- |
| **Secrets & Credential Exposure** | Informational | **PASS** | `.env.local` is ignored in `.gitignore`; no private API keys or database passwords found in repository. |
| **Cross-Site Scripting (XSS)** | Low | **PASS (Low Risk)** | `dangerouslySetInnerHTML` is used in 4 files strictly for static JSON-LD SEO schemas; no user input reaches raw HTML sinks. |
| **Injection Vulnerabilities** | None | **PASS** | No backend database, SQL queries, or server-side shell executions exist. |
| **Client-Side Storage of PII** | None | **PASS** | No guest personal data is written to `localStorage`, `sessionStorage`, or cookies. |
| **EmailJS Relay Abuse Exposure** | Medium | **POTENTIAL ABUSE RISK** | Client-side SDK calls EmailJS with public keys; requires EmailJS Dashboard Domain Whitelisting and Rate Limiting. |
| **External Outbound Links** | Low | **PASS** | External links targeting new tabs utilize `rel="noopener noreferrer"`. |
| **HTTP Security Headers** | Medium | **MISSING IN CONFIG** | `next.config.ts` does not define standard HTTP response headers (CSP, HSTS, X-Frame-Options, etc.). |
| **Authentication & Authorization** | N/A | **N/A** | Not applicable to current public hotel website. |

---

## 2. Detailed Code-Level Security Analysis

### Input Handling & Validation
- Form inputs in `BookingClient.tsx` (Full Name, Email, Phone, Special Requests) undergo client-side validation.
- Email uses RFC-compliant regex validation.
- Phone number length is verified (`>= 6`).
- **Improvement Recommendation**: Add explicit `maxLength={500}` on the Special Requests `<textarea>` to prevent excessively large payload transit.

### XSS & Raw HTML Injection Review
A search for `dangerouslySetInnerHTML` identified 4 occurrences across the codebase:
1. `src/app/layout.tsx:164`: Structured JSON-LD for Hotel schema.
2. `src/app/rooms/[slug]/page.tsx:133`: Structured JSON-LD for Room schema.
3. `src/app/contact/page.tsx:66`: Structured JSON-LD for Hotel Contact schema.
4. `src/components/home/FAQSection.tsx:87`: Structured JSON-LD for FAQ schema.

**Verdict**: **PASS**. All 4 instances serialize static or compile-time known data objects via `JSON.stringify()`. No user-controlled form inputs or query parameters are interpolated into these scripts.

### EmailJS API Abuse & Spam Prevention
- The application invokes `@emailjs/browser` directly from the client.
- Because `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is accessible to the browser, any automated bot could theoretically send emails by calling the EmailJS API endpoint directly.
- **Recommended Mitigations in Phase 1 / Production**:
  1. In the **EmailJS Dashboard**: Enable **Domain Whitelist** (restrict execution to `yourhoteldomain.com` and `localhost`).
  2. In the **EmailJS Dashboard**: Enable **Rate Limiting** per IP address.
  3. Optional: Add a simple honeypot field or turnstile captcha in the booking form if bot spam is observed in production.

### HTTP Security Headers Configuration
Inspection of `next.config.ts` indicates that no security headers are currently defined:

```typescript
// next.config.ts (Current)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Recommended Production Headers for Phase 1**:
- `X-Frame-Options: DENY` (Clickjacking prevention)
- `X-Content-Type-Options: nosniff` (MIME sniffing prevention)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy`: Allowing scripts, styles, Cloudinary media (`res.cloudinary.com`), and EmailJS API connections (`api.emailjs.com`).
