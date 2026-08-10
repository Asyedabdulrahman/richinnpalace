# 02 — Input Validation Results

**Audit Date**: August 10, 2026  
**Target Module**: `src/components/booking/BookingClient.tsx`  
**Overall Result**: PASS WITH WARNINGS

---

## 1. Input Field Test Results

### Full Name Field (`fullName`)
- **HTML5 Attributes**: `type="text"`, `required`
- **Validation Rule**: `!fullName.trim()`
- **Test Payloads Tested**:
  1. `<script>alert(document.domain)</script>` → **PASS** (Rendered as plain text, JSX escapes DOM nodes)
  2. `' OR '1'='1` → **PASS** (Treated as plain text string)
  3. `   ` (Only spaces) → **PASS** (Rejected by `.trim()` check)
  4. Extremely long string (5,000 characters) → **WARNING** (Accepted without explicit length restriction)

### Email Address Field (`email`)
- **HTML5 Attributes**: `type="email"`, `required`
- **Validation Rule**: `Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Test Payloads Tested**:
  1. `plainaddress` → **PASS** (Rejected by regex)
  2. `@domain.com` → **PASS** (Rejected by regex)
  3. `user@domain` → **PASS** (Rejected by regex — requires TLD extension)
  4. `<script>alert(1)</script>@test.com` → **PASS** (Handled safely as string literal in React)

### Phone Number Field (`phone`)
- **HTML5 Attributes**: `type="tel"`, `required`
- **Validation Rule**: `!phone.trim() || phone.trim().length < 6`
- **Test Payloads Tested**:
  1. `+91 99402 41501` → **PASS** (Valid phone format)
  2. `123` → **PASS** (Rejected due to length < 6)
  3. `abcdef` → **FAIL / WARNING** (Accepted because length >= 6, missing numeric/phone regex verification)

### Room Guest Selection (`guests`)
- **HTML5 Attributes**: `<select>` element with dynamically calculated `<option>` tags (1 to `maxCapacity`)
- **Validation Rule**: `if (guests > maxCapacity) return "The selected chamber accommodates a maximum of..."`
- **Test Payloads Tested**:
  1. Standard select `1` or `2` → **PASS**
  2. DOM manipulation to force `value="999"` → **PASS** (Caught by `validateForm()` server/component check)

### Special Arrangements / Dietary Needs (`requests`)
- **HTML5 Attributes**: `<textarea maxLength={1000}>`
- **Validation Rule**: `if (requests.length > 1000) return "Special arrangements text cannot exceed 1000 characters."`
- **Test Payloads Tested**:
  1. 500 characters of plain text → **PASS**
  2. 1,050 characters pasted into DOM → **PASS** (Truncated by `maxLength={1000}` and rejected by `validateForm()`)
  3. HTML tags (`<b>Bold Request</b>`) → **PASS** (Safely text-encoded in React render and WhatsApp message)

---

## 2. Findings Summary

### FINDING-VAL-01: Soft Validation on Phone Number Input
- **Severity**: LOW / WARNING
- **Affected Component**: [BookingClient.tsx](file:///c:/Users/Syed%20Enarxi/abdulazeez/src/components/booking/BookingClient.tsx#L105)
- **Input Used**: `abcdef`
- **Expected Behavior**: Phone field should enforce international phone format / numeric digits (e.g. `/^\+?[0-9\s\-]{6,20}$/`).
- **Actual Behavior**: Phone field accepts arbitrary alphabetical text as long as string length is at least 6 characters.
- **Security Impact**: Allows submitting invalid contact numbers in reservation requests.
- **Recommended Remediation (Phase 2B)**: Strengthen phone validation regex: `/^\+?[0-9\s\-\(\)]{6,20}$/`.
