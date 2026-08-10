# 10 — Dependency Security Audit Results

**Audit Date**: August 10, 2026  
**Command Executed**: `npm audit`  
**Overall Result**: PASS WITH WARNINGS

---

## 1. Vulnerability Findings Breakdown

`npm audit` detected **6 high-severity advisories** in development toolchains and transitive framework packages:

| Package | Severity | Vector / Advisory | Production Relevance | Remediation Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **`brace-expansion`** | HIGH | DoS via unbounded expansion length | Dev tool dependency (`@typescript-eslint`) | `npm audit fix` |
| **`js-yaml`** | HIGH | Quadratic CPU consumption | Dev tool dependency | `npm audit fix` |
| **`nanoid`** | HIGH | Infinite loop vulnerability | Dev tool dependency | `npm audit fix` |
| **`next`** | HIGH | Middleware/Server Action advisories | Core Framework (`16.2.10`) | Upgrade to `16.3.0` upon validation |
| **`postcss`** | HIGH | XSS via unescaped CSS stringify output | Build-time CSS parser | `npm audit fix` |
| **`sharp`** | HIGH | Inherited libvips vulnerability | Optional image optimizer | `npm audit fix` |

---

## 2. Risk Context & Mitigation Analysis

- **Direct Dependency Footprint**:
  The application utilizes a lightweight set of 7 direct runtime dependencies: `@emailjs/browser`, `clsx`, `framer-motion`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`.
- **Runtime Risk Evaluation**:
  - The flagged advisories in `next` relate to App Router Server Actions and Edge Runtime middleware proxies. This application does not implement Server Actions or custom middleware, significantly reducing practical exploitability.
  - Vulnerabilities in `postcss`, `brace-expansion`, and `js-yaml` are limited to dev-time compilation and build steps.
