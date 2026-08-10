# 05 — JavaScript Bundle & Dependency Audit

**Audit Date**: August 10, 2026  
**Build System**: Next.js 16 (Turbopack Engine)

---

## 1. Bundle Composition & Shared Chunks

- **Framework Runtime**: React 19 (`react`, `react-dom`) + Next.js App Router core runtime (~87 kB gzipped shared baseline).
- **Animation Engine**: `framer-motion` (Tree-shaken variants and hooks).
- **Icons**: `lucide-react` (Named imports tree-shaken by Turbopack).
- **Styles**: Tailwind CSS v4 (Zero-runtime utility CSS bundle ~14 kB).
- **Communication SDK**: `@emailjs/browser` (~12 kB gzipped, invoked only on booking submit).
- **Analytics Helper**: `src/lib/analytics.ts` (< 1 kB zero-dependency wrapper).

---

## 2. Code Splitting & Route Chunking

- Dynamic client components (`StickyBookingPanel.tsx`, `RoomGallery.tsx`, `BookingClient.tsx`, `ReservationConfirmationView.tsx`) are automatically code-split into dedicated route chunks.
- Static marketing routes (`/about`, `/terms`, `/privacy`) ship minimal interactive JavaScript.
- Pruned unused package `class-variance-authority` in Phase 1, keeping the dependency tree clean and lightweight.
