# 03 — Dependency & Package Audit

**Project**: Rich Inn Palace (Hotel Website)  
**Audit Date**: August 10, 2026  
**Status**: AUDIT COMPLETE

---

## 1. Technical Stack & Environment Baseline

- **Framework**: Next.js 16.2.10 (App Router, Turbopack support)
- **React Runtime**: React 19.2.4 / React-DOM 19.2.4
- **TypeScript**: TypeScript 5.x
- **Styling Engine**: TailwindCSS v4 with `@tailwindcss/postcss`
- **Node Engine Target**: Node.js 18.18+ / 20.x / 22.x LTS compatible (`@types/node: ^20`)
- **Package Manager Inconsistency**: `package.json` specifies `"packageManager": "yarn@1.22.22..."`, but a `package-lock.json` file is present in the repository and `npm` is currently used for script execution.

---

## 2. Dependencies Inventory

### Production Dependencies (`dependencies`)

| Package | Installed Version | Purpose | Usage Status |
| :--- | :--- | :--- | :--- |
| `@emailjs/browser` | `^4.4.1` | Client-side EmailJS integration for sending reservation requests | **Active** (`src/lib/emailjs.ts`) |
| `class-variance-authority` | `^0.7.1` | Component variant utility | **Unused directly** (No UI components currently invoke `cva()`) |
| `clsx` | `^2.1.1` | Conditional class utility | **Active** (Used in `src/lib/utils.ts` via `cn()`) |
| `framer-motion` | `^12.42.2` | Page transitions, hero entrance animations, and modal crossfades | **Active** across multiple components |
| `lucide-react` | `^1.25.0` | Modern SVG iconography | **Active** across navigation, rooms, and booking |
| `next` | `16.2.10` | React core framework | **Active** |
| `react` | `19.2.4` | UI library | **Active** |
| `react-dom` | `19.2.4` | DOM renderer for React | **Active** |
| `tailwind-merge` | `^3.6.0` | Utility for merging TailwindCSS class names safely | **Active** (`src/lib/utils.ts`) |

### Development Dependencies (`devDependencies`)

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for TailwindCSS v4 |
| `@types/node` | `^20` | TypeScript definitions for Node.js |
| `@types/react` | `^19` | TypeScript definitions for React |
| `@types/react-dom` | `^19` | TypeScript definitions for React DOM |
| `eslint` | `^9` | Linter engine |
| `eslint-config-next` | `16.2.10` | Next.js standard ESLint rules |
| `tailwindcss` | `^4` | TailwindCSS compiler |
| `typescript` | `^5` | TypeScript compiler |

---

## 3. Vulnerability Audit (`npm audit`)

Running `npm audit` returned **6 High Severity Vulnerabilities**:

| Package | Affected Versions | Severity | Advisory / Issue Summary | Production Impact Analysis |
| :--- | :--- | :--- | :--- | :--- |
| `next` | `9.3.4-canary.0 - 16.3.0-preview.10` | **High** | Multiple advisories (Server Actions DoS, Turbopack single-locale middleware bypass, SVG image optimization DoS) | **Low / Mitigated in practice**: The application is an SSG/client-rendered hotel site without Server Actions, custom proxies, or user-uploaded SVGs. |
| `postcss` | `<=8.5.22` | **High** | Path traversal in source map auto-loading; XSS in CSS stringify | **Low**: Dev/build tool only; not exposed at runtime. |
| `sharp` | `<0.35.0` | **High** | Inherited vulnerabilities in `libvips` (CVE-2026-33327, etc.) | **Low**: Only utilized during build-time image optimization. |
| `brace-expansion` | `<=1.1.17 \|\| 4.0.0 - 5.0.8` | **High** | DoS via unbounded expansion length causing memory crash | **None in production**: ESLint/TypeScript toolchain dependency only. |
| `nanoid` | `<3.3.17` | **High** | Custom generators loop indefinitely when size is zero | **Low**: Indirect dependency of PostCSS. |
| `js-yaml` | `4.0.0 - 4.3.0` | **High** | Quadratic CPU consumption in `!!omap` resolution | **None in production**: Dev dependency of ESLint. |

---

## 4. Recommended Phase 1 Actions

1. **Package Manager Alignment**: Standardize on `npm` by removing the `packageManager: yarn` field in `package.json`, or align development scripts with the intended toolchain.
2. **Remove Unused Dependencies**: Prune `class-variance-authority` if no component library primitives rely on it.
3. **Framework Patch Update**: Plan a patch update to Next.js 16.3.x when testing Phase 1 to address the upstream Next.js and PostCSS advisories safely after regression verification.
