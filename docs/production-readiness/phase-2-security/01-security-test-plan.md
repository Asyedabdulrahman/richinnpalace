# 01 — Security Test Plan

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Scope**: Local / Repository Code & Local Environment Security Assessment  
**Testing Mode**: AUDIT & DOCUMENTATION ONLY (No Source Code Modifications)

---

## 1. Application Attack Surface Identification

### Public Pages & Routes
- `/` (Home page with hero video, statistics, featured stays, manifesto, gallery preview, FAQ)
- `/about` (Heritage story, architecture details)
- `/rooms` (Chamber catalog)
- `/rooms/[slug]` (Dynamic chamber detail page with interactive gallery, branch dropdown, FAQs, sticky booking widget)
- `/booking` (Interactive reservation request form)
- `/gallery` (Photography chronicle)
- `/contact` (Concierge contact info, address details, interactive JSON-LD schema)
- `/privacy` (Privacy policy)
- `/terms` (Terms of stay & cancellation guidelines)
- `/robots.txt` (Crawl instructions)
- `/sitemap.xml` (SEO index)

### User-Controlled Inputs & Injection Points
1. **Booking Form (`BookingClient.tsx`)**:
   - `fullName` (`<input type="text">`)
   - `email` (`<input type="email">`)
   - `phone` (`<input type="tel">`)
   - `checkIn` (`<input type="date">`)
   - `checkOut` (`<input type="date">`)
   - `guests` (`<select>` dropdown)
   - `requests` (`<textarea>` special arrangements)
   - `selectedRoomId` (State selector / query parameter)
   - `selectedBranchId` (State selector / query parameter)
2. **URL Query Parameters (`useSearchParams`)**:
   - `?room=`
   - `?branch=`
   - `?checkin=`
   - `?checkout=`
   - `?guests=`

### External Integrations & APIs
- **EmailJS SDK (`@emailjs/browser`)**: Transmits reservation parameters from client to EmailJS HTTP endpoint (`https://api.emailjs.com/api/v1.0/email/send`).
- **WhatsApp Click-to-Chat (`wa.me`)**: Dynamic URI scheme redirect (`https://wa.me/919940241501?text=...`).
- **Cloudinary CDN**: External media streaming (`https://res.cloudinary.com`).
- **Google Maps**: Outbound search links (`https://www.google.com/maps/search/...`).

---

## 2. Comprehensive Security Test Matrix

| Area ID | Testing Target | Test Method / Input | Classification Target |
| :--- | :--- | :--- | :--- |
| **SEC-01** | Input Validation — Name | XSS payloads (`<script>`), Unicode, SQL strings, Whitespace, 10,000+ chars | PASS / FAIL / WARNING |
| **SEC-02** | Input Validation — Email | Malformed formats (`a@b`, `test@@domain.com`, XSS strings) | PASS / FAIL / WARNING |
| **SEC-03** | Input Validation — Phone | Alphabetic text, negative numbers, extreme lengths | PASS / FAIL / WARNING |
| **SEC-04** | Input Validation — Special Requests | XSS payloads, HTML tags, 2,000+ chars (testing `maxLength={1000}`) | PASS / FAIL / WARNING |
| **SEC-05** | Booking Logic — Guest Capacity | Selecting 3 or 4 guests for 2-guest max rooms | PASS / FAIL / WARNING |
| **SEC-06** | Booking Logic — Dates | Check-out date before check-in date, past dates | PASS / FAIL / WARNING |
| **SEC-07** | Price Manipulation | Tampering with client-side price variables via DOM/JS console | PASS / FAIL / WARNING |
| **SEC-08** | URL Parameter Injection | Malicious/malformed `?room=`, `?guests=`, `?checkin=` values | PASS / FAIL / WARNING |
| **SEC-09** | Reflected & Stored XSS | HTML/JS injection into form inputs and URL params | PASS / FAIL / WARNING |
| **SEC-10** | Injection (SQL / Command) | SQL control strings (`' OR '1'='1`) in form fields | NOT APPLICABLE (No SQL DB) |
| **SEC-11** | EmailJS Abuse & Replay | Rapid duplicate submissions, missing configuration handling | PASS / WARNING / MANUAL |
| **SEC-12** | Client Exposure & Secrets | Scanning compiled scripts and source for sensitive keys/tokens | PASS / FAIL |
| **SEC-13** | Storage & PII Privacy | Inspecting `localStorage`, `sessionStorage`, cookies for guest PII | PASS / FAIL |
| **SEC-14** | Security Headers | Evaluating CSP, HSTS, X-Frame-Options, Referrer-Policy | PASS / FAIL / WARNING |
| **SEC-15** | Error Handling | Simulating API errors / invalid routes for stack trace exposure | PASS / FAIL |
| **SEC-16** | Dependency Vulnerabilities | Running `npm audit` on direct and transitive dependencies | PASS / WARNING |
| **SEC-17** | Authentication & Authz | Testing for unprotected administrative portals or endpoints | NOT APPLICABLE |

---

## 3. Safety Boundaries & Execution Guidelines

- Testing is strictly confined to local code analysis, client-side React runtime execution, and static build verification.
- No automated network fuzzers, aggressive scanners, or destructive payload execution against external infrastructure will be performed.
