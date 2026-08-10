# 04 — Active Video Usage & Streaming Audit

**Audit Date**: August 10, 2026  
**Infrastructure**: Cloudinary CDN Streaming (`https://res.cloudinary.com`)

---

## 1. Active Video Stream Inventory

| Component | Cloudinary Stream URL | Parameters | Preload | Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **`HeroSection.tsx`** | `.../q_auto,f_auto/v1786340853/t_nagar_outro.mp4` | `q_auto,f_auto` | `metadata` | Autoplay, Muted, Loop, Poster |
| **`FeaturedRooms.tsx`** | `.../q_auto,f_auto/v1786340853/t_nagar_5bhk.mp4` | `q_auto,f_auto` | `none` | Play on card hover only |
| **`FeaturedRooms.tsx`** | `.../q_auto,f_auto/v1786340853/t_nagar_2.mp4` | `q_auto,f_auto` | `none` | Play on card hover only |
| **`FeaturedRooms.tsx`** | `.../q_auto,f_auto/v1786340853/reel_2_v.mp4` | `q_auto,f_auto` | `none` | Play on card hover only |
| **`RoomsClient.tsx`** | Cloudinary MP4 streams per room | `q_auto,f_auto` | `none` | Play on card hover only |

---

## 2. Bandwidth & Performance Optimizations

1. **Auto Quality & Format (`q_auto,f_auto`)**:
   Cloudinary dynamically determines optimal video codec (H.264, VP9, AV1) based on user browser capabilities, saving up to 60% bandwidth.
2. **Hover Video Preload Optimization**:
   Card hover videos are set to `preload="none"`. Mobile devices and desktop users browsing the homepage download zero video bytes for hover cards until explicit interaction occurs.
3. **Local Storage Footprint**:
   Phase 1 eliminated 254.5 MB of unreferenced local MP4 files from `/public/videos/`. All video traffic is offloaded to Cloudinary CDN edge servers.
