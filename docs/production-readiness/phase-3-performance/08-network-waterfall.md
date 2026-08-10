# 08 — Network Waterfall & Request Analysis

**Audit Date**: August 10, 2026  
**Scope**: Network Request Scheduling on Initial Page Visits

---

## 1. Initial Page Load Waterfall Sequence

```
1. [HTML Document]        --> Initial static document response (Edge TTFB < 100ms)
2. [Critical CSS & Fonts] --> Self-hosted fonts + compiled CSS (Parallel download)
3. [JavaScript Bundles]   --> Framework & component chunks (Executed asynchronously)
4. [Hero Media & Poster]  --> photo1.avif still poster painted immediately (LCP ~0.8s)
5. [Analytics Script]     --> googletagmanager.com (Deferred afterInteractive)
6. [Hover Video Buffers]  --> Lazy / on-demand only (preload="none" prevents upfront blocking)
```

---

## 2. Bottleneck Prevention

1. **Elimination of Unused Local Videos**: Phase 1 deletion of 254.5 MB local files prevents accidental bundle bloat.
2. **Prioritization of Image Poster over Video Bytes**: Hero video renders an instantaneous AVIF still poster (`/images/photo1.avif`), ensuring the visual above-the-fold content paints instantly without waiting for MP4 video buffers.
3. **HTTP/2 & HTTP/3 Multiplexing**: Static chunks and images stream concurrently over multiplexed connections.
