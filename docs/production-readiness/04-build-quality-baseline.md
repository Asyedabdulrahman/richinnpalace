# 04 — Build, TypeScript & ESLint Baseline

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE (Baseline established)

---

## 1. Quality Gate Summary

| Check | Command Executed | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Production Build** | `npm run build` | **PASS** | 17/17 routes compiled and generated successfully in 4.7s |
| **TypeScript Type Check** | `npx tsc --noEmit` | **PASS** | 0 type errors found across the codebase |
| **ESLint Static Analysis** | `npm run lint` | **FAIL** | 25 problems (12 errors, 13 warnings) detected |

---

## 2. Production Build Output Details

```
▲ Next.js 16.2.10 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 4.7s
  Running TypeScript ...
  Finished TypeScript in 5.5s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (17/17) in 568ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /booking
├ ○ /contact
├ ○ /gallery
├ ○ /privacy
├ ○ /robots.txt
├ ○ /rooms
├ ƒ /rooms/[slug]
├ ○ /sitemap.xml
└ ○ /terms

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## 3. ESLint Findings Breakdown (12 Errors, 13 Warnings)

### Category A: React Hooks & Function Purity Errors (2 Errors)

| File & Location | Rule | Severity | Issue & Explanation |
| :--- | :--- | :--- | :--- |
| `src/app/rooms/[slug]/StickyBookingPanel.tsx:36:7` | `react-hooks/set-state-in-effect` | **ERROR** | `setNights(diffDays)` is called synchronously inside `useEffect`. React 19 rules prohibit synchronous setState inside effect body to prevent cascading renders. (Nights should be derived during render). |
| `src/components/booking/BookingClient.tsx:128:31` | `react-hooks/purity` | **ERROR** | `Date.now()` is called directly inside the component scope during submission preparation. (Should be derived inside an event handler or ref callback). |

### Category B: Explicit `any` Types in Framer Motion Variants (10 Errors)

In Framer Motion transition definitions, easing arrays were cast as `as any`:

| File & Location | Rule | Severity | Explanation |
| :--- | :--- | :--- | :--- |
| `src/components/home/HeroSection.tsx:26:36` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/HeroSection.tsx:38:36` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/FeaturedRooms.tsx:62:63` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/FeaturedRooms.tsx:74:36` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/FAQSection.tsx:66:63` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/ManifestoSection.tsx:24:36` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/StatsSection.tsx:24:36` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/TestimonialsSection.tsx:22:63` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/home/WhyChooseUsSection.tsx:28:63` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |
| `src/components/rooms/RoomsClient.tsx:87:63` | `@typescript-eslint/no-explicit-any` | **ERROR** | `ease: [0.16, 1, 0.3, 1] as any` |

### Category C: Unused Variables & Imports (13 Warnings)

| File & Location | Rule | Item |
| :--- | :--- | :--- |
| `src/app/contact/page.tsx:2:8` | `@typescript-eslint/no-unused-vars` | Unused import `Link` |
| `src/app/gallery/page.tsx:4:10` | `@typescript-eslint/no-unused-vars` | Unused import `rooms` |
| `src/app/rooms/[slug]/page.tsx:1:8` | `@typescript-eslint/no-unused-vars` | Unused import `Image` |
| `src/components/booking/BookingClient.tsx:10:3` | `@typescript-eslint/no-unused-vars` | Unused import `ShieldCheck` |
| `src/components/booking/ReservationConfirmationView.tsx:10:3` | `@typescript-eslint/no-unused-vars` | Unused import `RefreshCw` |
| `src/components/booking/ReservationConfirmationView.tsx:11:3` | `@typescript-eslint/no-unused-vars` | Unused import `Sparkles` |
| `src/components/booking/ReservationConfirmationView.tsx:12:3` | `@typescript-eslint/no-unused-vars` | Unused import `Phone` |
| `src/components/booking/ReservationConfirmationView.tsx:13:3` | `@typescript-eslint/no-unused-vars` | Unused import `Mail` |
| `src/components/booking/ReservationConfirmationView.tsx:33:3` | `@typescript-eslint/no-unused-vars` | Unused prop `onNewRequest` |
| `src/components/rooms/RoomsClient.tsx:6:8` | `@typescript-eslint/no-unused-vars` | Unused import `Link` |
| `src/components/rooms/RoomsClient.tsx:10:28` | `@typescript-eslint/no-unused-vars` | Unused import `Calendar` |
| `src/components/rooms/RoomsClient.tsx:60:24` | `@typescript-eslint/no-unused-vars` | Unused setter `setActiveFilter` |
| `src/components/rooms/RoomsClient.tsx:66:9` | `@typescript-eslint/no-unused-vars` | Unused handler `handleBookingClick` |
