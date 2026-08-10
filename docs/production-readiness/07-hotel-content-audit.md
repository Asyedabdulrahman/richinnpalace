# 07 — Hotel Content & Data Audit

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE (Requires Client Verification)

---

## 1. Hotel Identity & Contact Information

| Property / Field | Current Code Value | Code Location | Status / Notes |
| :--- | :--- | :--- | :--- |
| **Hotel Name** | `Rich Inn Palace` | `src/lib/data.ts:30` | Confirmed primary name across layout and navigation. |
| **Legacy Brand Inconsistency** | `Nilaya` | `src/lib/data.ts:344` (Elena Rostova Testimonial) | **FAIL / REQUIRES CLIENT VERIFICATION**: Testimonial quote references "Nilaya" instead of "Rich Inn Palace". |
| **Tagline / Subtitle** | `Luxury, redefined.` / `ESTD. 2001 \| CHENNAI · IN` | `src/lib/data.ts:31-32` | Consistent. |
| **Primary Email** | `reservations@serahotel.com` | `src/lib/data.ts:35`, `src/app/contact/page.tsx:50`, `src/app/privacy/page.tsx:48` | **FAIL / REQUIRES CLIENT VERIFICATION**: Placeholder domain `serahotel.com` is used in email links and JSON-LD schemas. |
| **Primary Phone 1** | `+91 141 555 0198` | `src/lib/data.ts:34`, `src/app/contact/page.tsx:49` | **FAIL / REQUIRES CLIENT VERIFICATION**: `0141` is a Jaipur landline area code. |
| **Primary Phone 2** | `+91 89390 07600` | `src/lib/data.ts:337` (Manifesto #06) | **INCONSISTENCY / REQUIRES CLIENT VERIFICATION**: Chennai mobile number advertised in the Manifesto. |
| **Primary Phone 3 (WhatsApp)** | `+91 99402 41501` | `.env.local:7`, `src/components/booking/ReservationConfirmationView.tsx:200` | **INCONSISTENCY / REQUIRES CLIENT VERIFICATION**: Concierge WhatsApp mobile number. |
| **Primary Address** | `Usman Road, T.Nagar, Chennai, Tamil Nadu 600017, India` | `src/lib/data.ts:36`, `src/app/contact/page.tsx:53` | Valid Chennai address. |

---

## 2. Rooms Catalogue & Specification Audit

| Room Name | Slug | Price Display | Area | Capacity | Tag | Branch Locations | Attractions Listed in Code |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T.Nagar** | `haveli-room` | `₹12,800` | 480 SF | 2 Guests | COURTYARD VIEW | T.Nagar Grand (G.N. Chetty Rd), T.Nagar South (Venkatnarayana Rd) | **Amer Fort (15 min), Jal Mahal (10 min), Hawa Mahal (25 min), City Palace (25 min)** ⚠️ |
| **Vadapalani** | `garden-suite` | `₹18,500` | 650 SF | 2 Guests | PRIVATE GARDEN | Vadapalani Central (Arcot Rd), Vadapalani West (Saligramam Link Rd) | **Amer Fort (15 min), Nahargarh Fort (20 min)** ⚠️, Chennai T.Nagar Shopping Hub (10 min) |
| **T.Nagar** | `signature-sanctuary` | `₹26,000` | 920 SF | 4 Guests | PLUNGE POOL | T.Nagar Club (2nd Ave), T.Nagar Heights (5th Ave) | **Amer Fort Trek, Jaigarh Fort, Galta Ji** ⚠️ |
| **Royal Palace Suite** | `royal-palace-suite` | `₹34,500` | 1200 SF | 4 Guests | Aravalli Range View ⚠️ | Rich Inn Palace — T.Nagar (Usman Rd), Rich Inn Palace — Heritage Club (ECR) | **City Palace (25 min), Amer Fort (15 min)** ⚠️ |

### Critical Content Inconsistency: Jaipur Landmarks for Chennai Properties
- **CRITICAL / REQUIRES CLIENT VERIFICATION**: The hotel is situated in Chennai, Tamil Nadu (T. Nagar / Vadapalani), but the `attractions` arrays and descriptions across all 4 rooms list landmarks located in **Jaipur, Rajasthan** (e.g. Amer Fort, Jal Mahal, Hawa Mahal, City Palace, Nahargarh Fort, Galta Ji, and the "Aravalli Mountains").
- Chennai cultural landmarks (e.g. Kapaleeshwarar Temple, Marina Beach, San Thome Basilica, Fort St. George, Pondy Bazaar) should be provided by the client to replace the placeholder Rajasthan attractions.

---

## 3. Pricing Discrepancy: Rooms Catalog vs. Manifesto

- **In `src/lib/data.ts` (Rooms array)**:
  - T.Nagar Room: `₹12,800 / night`
  - Vadapalani Suite: `₹18,500 / night`
  - T.Nagar Plunge Pool: `₹26,000 / night`
  - Royal Palace Suite: `₹34,500 / night`
- **In `src/lib/data.ts` (Manifesto array, item 01 & 02)**:
  - Executive Rooms Single: `₹3,200` / Double: `₹3,800`
  - Suite Rooms Single: `₹4,800` / Double: `₹5,600`
  - Weekend Special Offer: `₹2,999`
- **Impact**: Visitors reading the Manifesto see rates of ₹2,999–₹5,600, while the rooms directory and booking calculations bill ₹12,800–₹34,500.
- **Status**: **REQUIRES CLIENT VERIFICATION** to align the correct tariff sheet.

---

## 4. Policy Discrepancy: Check-In & Check-Out Times

- **Terms Page (`src/app/terms/page.tsx:27`)**: Specifies standard check-in at `14:00 PM` and check-out at `12:00 PM noon`.
- **Manifesto Section (`src/lib/data.ts:323`)**: Advertises `"True 24-Hour Check-In & Check-Out — Stay full 24 hours from your arrival time"`.
- **Status**: **REQUIRES CLIENT VERIFICATION** to confirm which check-in policy applies.

---

## 5. Media & Asset Storage Optimization

- **Active Media**: 9 web-optimized images in `/public/images/` (AVIF/JPG formats, 120KB–380KB) and 5 streaming videos hosted on Cloudinary.
- **Unused Large Files**: 4 local video files located in `/public/videos/`:
  - `reel_2_v.mp4` (76.5 MB)
  - `t_nagar_2.mp4` (56.1 MB)
  - `t_nagar_5bhk.mp4` (71.6 MB)
  - `t_nagar_outro.mp4` (50.3 MB)
  - **Total Unused Volume**: **254.5 MB**
- **Impact**: Bloats repository size and Vercel/production deployment bundle unnecessarily.
- **Recommendation**: Safe removal of `/public/videos/` in Phase 1 after confirming Cloudinary video streams are 100% active.
