# 03 — Image Asset & Next.js Image Audit

**Audit Date**: August 10, 2026  
**Module**: All Image Usage Across Pages & Components

---

## 1. Image Inventory & Format Breakdown

| Asset Path | Format | Sizing / Container | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| `/images/photo1.avif` | AVIF | Hero Poster / Gallery | Modern AVIF format, High compression efficiency |
| `/images/photo2.avif` | AVIF | Room Cards / Suites | Modern AVIF format |
| `/images/photo3.avif` | AVIF | Gallery & Manifesto | Modern AVIF format |
| `/images/photo4.avif` | AVIF | Suite Gallery | Modern AVIF format |
| `/images/photo5.avif` | AVIF | Sanctuary Details | Modern AVIF format |
| `/images/photo6.avif` | AVIF | Courtyard Showcase | Modern AVIF format |
| `/images/photo7.avif` | AVIF | Heritage Chambers | Modern AVIF format |

---

## 2. Next.js Image Component Best Practices

- **Format Selection**: 100% of local gallery and chamber assets are authored in `.avif`, providing up to 50% byte savings over standard JPEG/PNG formats.
- **Responsive `sizes` Attributes**:
  - `FeaturedRooms.tsx`: `sizes="(max-width: 768px) 85vw, 30vw"`
  - `RoomsClient.tsx`: `sizes="(max-width: 1024px) 100vw, 45vw"`
  - `RoomGallery.tsx`: Responsive modal & full-width aspect containers.
- **Priority Loading**: Above-the-fold hero still poster loads synchronously without lazy-load delays, ensuring rapid LCP.
