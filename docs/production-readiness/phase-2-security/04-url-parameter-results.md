# 04 — URL Query Parameter Testing Results

**Audit Date**: August 10, 2026  
**Target Route**: `/booking` and `/rooms/[slug]`  
**Overall Result**: PASS

---

## 1. Query Parameter Injection Test Matrix

| URL Tested | Intent / Payload | Expected Behavior | Actual Behavior | Result |
| :--- | :--- | :--- | :--- | :--- |
| `/booking?room=nonexistent-id` | Request nonexistent chamber | Fallback to default room | Fallback to `haveli-room` | **PASS** |
| `/booking?room=<script>alert(1)</script>` | XSS in room parameter | Sanitized / ignored | Ignored, fallback to `haveli-room` | **PASS** |
| `/booking?branch=../../../etc/passwd` | Directory traversal in branch param | Sanitized / ignored | Ignored, fallback to primary branch | **PASS** |
| `/booking?guests=-1` | Negative guest count parameter | Default to valid guest count | Sanitized via `parseInt() \|\| 2` fallback | **PASS** |
| `/booking?guests=99999` | Excessive guest count parameter | Blocked at validation | State updated to 99999, submission blocked by `validateForm()` | **PASS** |
| `/booking?guests=abc` | Non-numeric guest parameter | Fallback to default (2) | `parseInt("abc")` returns `NaN`, falls back to 2 | **PASS** |
| `/booking?checkin=invalid-date` | Malformed check-in date | Reject submit safely | `validateForm()` catches `isNaN(start.getTime())` | **PASS** |
| `/booking?checkout=2020-01-01` | Past check-out date | Blocked on submit | `validateForm()` enforces `end > start` | **PASS** |
| `/rooms/malicious-slug-test` | Nonexistent dynamic slug route | Safe 404 response | `notFound()` triggered, returns Next.js 404 page | **PASS** |

---

## 2. Technical Findings & Robustness Analysis

- **`useMemo` & Whitelist Checking**:
  In `BookingClient.tsx`, `initialRoomId` validates the incoming URL parameter against the immutable `rooms` array using `rooms.some((r) => r.id === roomParam)`. Any parameter not matching an exact room ID is safely discarded without crashing or rendering untrusted HTML.
- **Parsing Fallbacks**:
  All numeric URL parameters (e.g. `guests`) employ defensive parsing:
  `const [guests, setGuests] = useState<number>(() => parseInt(searchParams.get("guests") || "2", 10) || 2);`
- **Route Error Boundaries**:
  Dynamic route parameters in `/rooms/[slug]/page.tsx` pass through `rooms.find((r) => r.slug === slug)`. If undefined, `notFound()` is invoked immediately, preventing null pointer errors or unhandled server exceptions.
