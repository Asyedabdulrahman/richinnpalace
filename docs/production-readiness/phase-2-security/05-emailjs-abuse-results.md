# 05 — EmailJS Abuse & Integration Results

**Audit Date**: August 10, 2026  
**Target Module**: `src/lib/emailjs.ts` & `src/components/booking/BookingClient.tsx`  
**Overall Result**: PASS WITH MANUAL VERIFICATION REQUIREMENT

---

## 1. EmailJS Architecture & Abuse Prevention Assessment

### Client-Side Dispatched API Integration
EmailJS operates via `@emailjs/browser` SDK. The request payload contains reservation metadata (guest name, email, phone, room, branch, dates, duration, total estimate, special requests, and reference code).

```typescript
// Controlled EmailJS Dispatch Execution (src/lib/emailjs.ts)
export async function sendReservationEmail(
  data: ReservationEmailParams
): Promise<{ success: boolean; error?: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      error: "EmailJS configuration missing. Please ensure environment variables are set.",
    };
  }

  const templateParams = { ...data };
  await emailjs.send(serviceId, templateId, templateParams, publicKey);
  return { success: true };
}
```

---

## 2. Test Execution & Abuse Scenarios

| Test Scenario | Action / Input | Expected Behavior | Observed Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Missing Config** | Call `sendReservationEmail` with unset env vars | Safe error return, no crash | Catches missing keys, returns `success: false` | **PASS** |
| **Rapid Double Click** | Click submit twice within 50ms | Prevent duplicate submission | `isSubmitting=true` locks UI button instantly | **PASS** |
| **Form Invalid Submission** | Submit form with empty email/phone | Block API request | `validateForm()` halts execution prior to EmailJS call | **PASS** |
| **Oversized Field Input** | Submit 1,000 char special request | Truncated / validated | Enforced by `maxLength={1000}` & `validateForm()` | **PASS** |
| **Client Public Key Exposure** | Public key embedded in browser bundle | Expected design pattern | Public key visible in bundle (Standard EmailJS design) | **PASS** |
| **Domain Whitelist Restriction** | Third-party origin API invocation test | Require origin match | Configured in EmailJS Dashboard | **REQUIRES MANUAL VERIFICATION** |

---

## 3. Findings & Required Client Action

### FINDING-EMAILJS-01: EmailJS Dashboard Domain Whitelisting
- **Severity**: MEDIUM / REQUIREMENT
- **Affected Service**: EmailJS Service Account Dashboard
- **Security Context**: Because `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is exposed in client-side JavaScript, malicious actors could copy the public key and template ID to trigger email sends from non-hotel domains if origin restrictions are disabled.
- **Recommended Action**:
  Log into the EmailJS Dashboard (`https://dashboard.emailjs.com/admin/account`), navigate to **Security**, and add the hotel's verified domain (e.g. `https://serahotel.com` or `https://richinnpalace.com`) to the **Allowed Domains** whitelist.
