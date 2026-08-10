# 04 — Analytics Privacy & PII Audit

**Audit Date**: August 10, 2026  
**Auditor**: Antigravity Automated Verification  
**Standard**: GDPR / CCPA / Data Privacy Guidelines

---

## 1. PII Exclusion Audit

| Question | Verification Result | Evidence |
| :--- | :--- | :--- |
| **Is Guest Name ever sent to Google Analytics?** | **NO** | `trackEvent` strips `name`, `fullName`, `guestName` parameters |
| **Is Guest Email ever sent to Google Analytics?** | **NO** | `trackEvent` strips `email`, `guestEmail` parameters |
| **Is Guest Phone number ever sent to Google Analytics?** | **NO** | `trackEvent` strips `phone`, `guestPhone` parameters |
| **Are Special Requests / Dietary Notes sent?** | **NO** | `trackEvent` strips `requests`, `specialRequests`, `notes` |
| **Is IP Anonymization enabled?** | **YES** | `gtag('config', ID, { anonymize_ip: true })` active |
| **Are booking reference codes transmitted?** | **NO** | Only aggregate category IDs (`haveli-room`, etc.) are passed |

---

## 2. Programmatic Sanitization Engine

In `src/lib/analytics.ts`, all outgoing event parameters pass through an automated blocklist:

```typescript
const forbiddenPiiKeys = [
  "name", "guestname", "fullname",
  "email", "guestemail",
  "phone", "guestphone",
  "requests", "specialrequests", "notes"
];
```

Any parameter matching these keys is filtered out before calling `window.gtag()`.
