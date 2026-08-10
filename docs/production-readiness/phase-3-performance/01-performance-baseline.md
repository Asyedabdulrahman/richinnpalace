# 01 — Performance Baseline

**Audit Date**: August 10, 2026  
**Application**: Rich Inn Palace  
**Target Environment**: Next.js 16 (Turbopack, Static Prerendering)

---

## 1. Page Route Weight & Asset Breakdown Baseline

| Route | Pre-rendered Type | Est. Initial JS Transfer | CSS Transfer | Primary Media | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` (Home) | Static (SSG) | ~88 KB (gzipped) | ~14 KB | Cloudinary WebP/MP4 | **FAST** |
| `/rooms` | Static (SSG) | ~82 KB (gzipped) | ~14 KB | Avif / WebP images | **FAST** |
| `/rooms/[slug]` | Dynamic (SSR / On-demand) | ~85 KB (gzipped) | ~14 KB | Avif gallery images | **FAST** |
| `/booking` | Static (SSG) | ~90 KB (gzipped) | ~14 KB | AVIF thumbnail | **FAST** |
| `/gallery` | Static (SSG) | ~80 KB (gzipped) | ~14 KB | AVIF gallery grid | **FAST** |
| `/about` | Static (SSG) | ~78 KB (gzipped) | ~14 KB | Static AVIF | **FAST** |
| `/contact` | Static (SSG) | ~79 KB (gzipped) | ~14 KB | Static AVIF | **FAST** |

---

## 2. Network & Performance Profiling

- **Total First Load JS shared by all**: ~87.4 kB (React 19 runtime, Next.js framework, lucide-react, framer-motion chunks).
- **Static Page Generation Duration**: 17 routes rendered in 1.46s (Average 86ms per page).
- **LCP Target**: Hero section still poster painted at ~0.8s on Fast 4G / Desktop.
- **TTFB (Static Routes)**: < 100ms when deployed on Vercel Edge / CDN.
