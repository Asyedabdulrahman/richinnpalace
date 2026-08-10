# 02 — Environment & Secrets Audit

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Environment Files Inventory

| File | Status in Git | Tracked / Ignored | Content Purpose |
| :--- | :--- | :--- | :--- |
| `.env.example` | Tracked in Git | Tracked | Template placeholder file documenting required public configuration keys |
| `.env.local` | Untracked / Local only | **Ignored** (`.gitignore` line 34: `.env*`) | Active local environment variables |
| `.env.production` | Does not exist | N/A | Production environment configuration file (Needs setup in Vercel/Hosting) |
| `.env` | Does not exist | N/A | Base env file |

---

## 2. Environment Variables Classification

| Variable Name | Referenced Location | Classification | Required in Production | Exposed to Browser | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `src/lib/emailjs.ts` (L22, L36) | **PUBLIC** (Client-side identifier) | Yes | Yes (Next.js `NEXT_PUBLIC_` prefix) | Identifies the EmailJS email service connected to the hotel email address |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `src/lib/emailjs.ts` (L25, L37) | **PUBLIC** (Client-side identifier) | Yes | Yes (Next.js `NEXT_PUBLIC_` prefix) | Identifies the EmailJS email template formatting reservation parameters |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `src/lib/emailjs.ts` (L28, L38) | **PUBLIC** (Client-side public key) | Yes | Yes (Next.js `NEXT_PUBLIC_` prefix) | Public authentication key for EmailJS client SDK |
| `NEXT_PUBLIC_HOTEL_WHATSAPP_NUMBER` | `src/lib/whatsapp.ts` (L20) | **PUBLIC** (Client-side configuration) | Yes | Yes (Next.js `NEXT_PUBLIC_` prefix) | Hotel WhatsApp phone number formatted for `wa.me` click-to-chat links |

---

## 3. Secrets & Hardcoded Credentials Audit

### Git Leakage Verification
- **PASS**: `.gitignore` contains `.env*` at line 34, which correctly prevents `.env.local` from being committed to version control.
- **PASS**: Git status confirms `.env.local` is untracked and unstaged.
- **PASS**: `.env.example` contains only empty variable keys and comments; no secret values are committed.

### Codebase Hardcoded Secrets Scan
- **PASS**: No database connection strings, private API keys, JWT secrets, AWS/GCP service account keys, or private SSH keys are hardcoded in the codebase.
- **POTENTIAL CONCERN / INFORMATIONAL**:
  - EmailJS uses client-side public keys (`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`). EmailJS public keys are designed by EmailJS to be client-accessible, but allow any browser visitor to invoke `emailjs.send()` against the configured template.
  - **Recommendation for Phase 1/Production**: Ensure EmailJS dashboard has Domain Restrictions / Whitelisting enabled (e.g. restrict to `yourhoteldomain.com` and `localhost:3000`) and Rate Limiting configured to prevent public abuse or spamming of the owner's inbox.

### Fallback Hardcoded Numbers / Addresses
- `src/lib/whatsapp.ts` (L23): Hardcoded fallback phone number `"911415550198"` is used if `NEXT_PUBLIC_HOTEL_WHATSAPP_NUMBER` is missing. (Note: `0141` is a Jaipur landline code, whereas the active hotel number in `.env.local` is a Chennai mobile number `919940241501`).
- `src/lib/data.ts` (L35): Hardcoded email `"reservations@serahotel.com"` remains in the data file.
- **Status**: Mark for client verification.
