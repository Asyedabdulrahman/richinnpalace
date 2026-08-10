# 06 — Typography & Font Optimization Audit

**Audit Date**: August 10, 2026  
**Implementation**: Next.js `next/font/google` Automatic Self-Hosting

---

## 1. Font Families & Configuration

### Serif Display Typography (`Cormorant_Garamond`)
- **Weights**: `300`, `400`, `500`, `600`, `700`
- **Styles**: `normal`, `italic`
- **Subsets**: `latin`
- **Variable**: `--font-serif`
- **Display Strategy**: `swap`

### Sans-Serif Body Typography (`Inter`)
- **Weights**: `300`, `400`, `500`, `600`
- **Subsets**: `latin`
- **Variable**: `--font-sans`
- **Display Strategy**: `swap`

---

## 2. Performance & Privacy Benefits of `next/font`

1. **Zero External Google Font Requests**: Next.js automatically downloads font files at build time and self-hosts them with the deployment bundle. No client browser connections are made to `fonts.googleapis.com` or `fonts.gstatic.com`.
2. **GDPR / Privacy Compliance**: Because fonts are served directly from the application origin, zero guest IP addresses are disclosed to third-party font servers.
3. **Zero Cumulative Layout Shift (`display: "swap"`)**: Fallback font sizing matching prevents text layout shifts during page hydration.
