---
title: Cleanuva Website — Image Asset Structure Audit
status: Read-only audit — no files moved/added/deleted, no code changed
purpose: Guide future image replacement and asset management.
date: 2026-06-15
---

# Cleanuva Website — Image Asset Structure Audit

## 0. Headline findings

- **There are ZERO real raster images in the repo** — no `.png` / `.jpg` / `.webp` / `.avif` anywhere under `src/`, `public/`, `content/`, or `components/`.
- `public/` contains only **5 default Next.js scaffold SVGs** (`file/globe/next/vercel/window.svg`) — **unused by the site** (leftovers).
- Every "image" on the site today is one of: a **`PhotoPlate` gradient fallback**, a **custom inline `<svg>`**, or a **pure HTML/CSS mockup**. None reference an image file.
- The **only** real-image injection mechanism that exists is the **`PhotoPlate`** primitive: it renders an optimized `next/image` **when given a `src` prop**, otherwise a gradient. **No usage currently passes `src`** → all are placeholders.

---

## 1. Where image resources live

| Location | What's there | Real images? |
|---|---|---|
| `public/` | `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (default scaffold) | None used |
| `src/` (raster `.png/.jpg/.webp/.avif`) | **none** | None |
| Inline SVG in components | `hero.tsx`, `loop/loop-svg.tsx`, `loop-strip.tsx`, IntelArc, etc. (decorative/diagram SVG) | N/A (vector art) |
| `next/image` | Only inside `src/components/primitives/photo-plate.tsx` | Only if `src` is passed (none today) |
| `src/content/` | `robots.ts` has a `scene` string field (drives the gradient mood, not an image) | None |

**Conclusion:** no AVIF/WEBP/PNG/JPG exist; SVG is limited to 5 unused scaffold files + inline decorative vector art.

---

## 2. Pages / components using images or placeholder visuals

| Page | Component | Visual today | Type |
|---|---|---|---|
| **Homepage** | `sections/hero.tsx` | Custom CSS backdrop + 2 inline `<svg>` (perspective field, data layer) + small robot | **Inline SVG / CSS** |
| Homepage | `command-center-preview.tsx` | HTML/CSS console mockup | **CSS mockup** |
| Homepage | `loop-strip.tsx`, `loop/loop-svg.tsx` | SVG loop diagram | Inline SVG |
| Homepage | `ai-copilot.tsx` (`CopilotPanel`) | HTML mockup (chat panel) | **CSS mockup** |
| **Platform** | `platform-hero.tsx` | **`PhotoPlate scene="product-ui"`** + `DiagnosisCard` overlay | **PhotoPlate gradient** |
| Platform | `command-center.tsx` | HTML/CSS console mockup (no image) | **CSS mockup** |
| Platform | `intel-arc.tsx` | SVG arc diagram | Inline SVG |
| Platform | `ai-copilot.tsx` (shared) | HTML mockup | CSS mockup |
| Platform | `early-access.tsx` (CSV/PDF) | Text + 2 icon cards — **no screenshot slot** | none |
| Platform | `roi-band.tsx` (Verified recovery) | Metrics grid — **no screenshot slot** | none |
| **Robotics overview** | `robotics-hero.tsx` | **`PhotoPlate fill scene="robot-in-operation"`** | **PhotoPlate gradient** |
| Robotics overview | `robotics-product-hero.tsx` ×3 | **`PhotoPlate fill scene={family.scene}`** | **PhotoPlate gradient** |
| **Robotics product** (R/U/NuvaSpan) | `robotics-product.tsx` ×3 | **`PhotoPlate fill scene={family.scene}`** | **PhotoPlate gradient** |
| **Company** | `company/page.tsx` | Text + icon pillars — **no image** | none |
| **Solutions** | `solutions/page.tsx` + tiles | Lucide icons only | icon font (vector) |
| **Resources** | `resources/page.tsx` | Lucide icons only | icon font (vector) |

---

## 3. How visuals are referenced

| Method | Used? | Where |
|---|---|---|
| `public/` path reference | ❌ not used by the site | (only unused scaffold SVGs exist) |
| `next/image` | ⚠️ only via `PhotoPlate` when `src` given (none today) | `photo-plate.tsx` |
| CSS background / gradient | ✅ heavily | `hero.tsx`, `PhotoPlate` fallback, dark section backdrops |
| Inline `<svg>` | ✅ | `hero.tsx`, `loop-svg.tsx`, IntelArc |
| Gradient placeholder | ✅ (the dominant pattern) | `PhotoPlate` `sceneGradient` map |
| Content config | ⚠️ `scene` string only (mood, not an image) | `robots.ts` |
| Hardcoded in component | ✅ (mockups) | `command-center.tsx`, `CopilotPanel`, `DiagnosisCard` |

---

## 4. Are there any real images? — No.

Everything is a placeholder. Classification:

- **Gradient placeholder (`PhotoPlate`):** Platform hero (`product-ui`), Robotics hero (`robot-in-operation`), Robotics teasers & product heroes (`robot-dusk`, `plant-utility`). The `PhotoPlate` comment itself says: *"Fallback gradients keep layout intact before real assets land. Never the final look — real photography replaces these in Step 12."*
- **Inline SVG / CSS scene:** Homepage Hero, Loop diagrams, IntelArc.
- **HTML/CSS mockup (fake UI):** Platform Command Center, Command Center Preview, AI Copilot panel, DiagnosisCard.
- **No visual surface at all:** CSV/PDF analysis screenshot, Verified-outcome/Report screenshot, Company/founder/team, Case studies.

---

## 5. Recommended approach for future replacement

### 5.1 Recommended directory structure

```
public/images/
├── hero/        # homepage hero background/art
├── platform/    # product screenshots: command center, copilot, csv/pdf analysis, verify report
├── robotics/    # overview hero + R/U/NuvaSpan product shots
├── company/     # founder / team / office
├── cases/       # future case-study / customer-project imagery
├── og/          # social/OpenGraph share images
└── misc/        # fallbacks, textures, anything else
```

What goes where:
- `hero/` — the single homepage hero visual (and any homepage section image).
- `platform/` — real product screenshots: `command-center`, `ai-copilot`, `csv-analysis`, `verify-report`.
- `robotics/` — `overview-hero`, and per model `r-series-*`, `u-series-*`, `nuvaspan-*` (hero / on-array / detail).
- `company/` — `founder`, `team`, `office`.
- `cases/` — `<customer-or-project-slug>-cover.jpg` (only when a real, consented case exists).
- `og/` — `default-og.png` + per-page OG images.

### 5.2 Naming convention

- **kebab-case**, descriptive, stable: `r-series-hero.jpg`, `command-center.png`, `homepage-hero.webp`.
- Optional variant suffix: `-hero`, `-on-array`, `-detail`, `-2x`, `-mobile`.
- **The filename is the contract.** Once a component points at `/images/robotics/r-series-hero.jpg`, that exact path/name becomes the swap target.
- **Format:** photos → `.jpg`/`.webp` source (next/image auto-serves AVIF/WebP); screenshots → `.png`/`.webp`. Provide high-resolution sources; `next/image` handles responsive sizing.

### 5.3 Replacement mechanics by surface type

There are **three** kinds of surface, with three different replacement costs:

1. **PhotoPlate-backed** (Platform hero, Robotics hero/teasers/products) → swap by giving `PhotoPlate` a `src`. **One-time wiring** needed (no `src` is passed today); after that, **same-name file replacement works**.
2. **Custom SVG/CSS mockup** (Homepage Hero, Command Center, Copilot panel) → **requires code change** to render a real image (refactor the mockup to an `Image`/`PhotoPlate`, optionally keeping the mockup as fallback).
3. **No surface yet** (CSV/PDF screenshot, Verify report, Company/team, Cases) → **requires code** to add an image slot before any file can be dropped in.

---

## 6. Per-page replacement matrix

| Page / Asset | Current visual source | Recommended file path | Recommended filename | Same-name swap? | Code change needed? | Notes |
|---|---|---|---|:-:|:-:|---|
| **A. Homepage Hero** | `hero.tsx` inline SVG + CSS | `public/images/hero/` | `homepage-hero.webp` | ❌ (no image today) | ✅ refactor `hero.tsx` to render `Image` | After refactor → same-name swap. Decide field-photo vs product-UI first. |
| **B. Platform Command Center screenshot** | `command-center.tsx` HTML/CSS mockup | `public/images/platform/` | `command-center.png` | ❌ | ✅ replace mockup with `Image` (or wrap) | Biggest credibility asset. Needs real product UI. |
| **B′. Platform hero plate** | `platform-hero.tsx` `PhotoPlate product-ui` | `public/images/platform/` | `platform-hero.webp` | ✅ after 1-time `src` wiring | ⚠️ one-time (add `src`) | Easiest platform-side win. |
| **C. AI Copilot screenshot** | `ai-copilot.tsx` `CopilotPanel` mockup | `public/images/platform/` | `ai-copilot.png` | ❌ | ✅ swap panel for `Image` | Shared by Homepage + Platform. |
| **D. CSV / Inspection-PDF analysis** | `early-access.tsx` — none | `public/images/platform/` | `csv-analysis.png` | ❌ | ✅ add an image slot | No surface exists yet. |
| **E. Verified Outcome / Report** | `roi-band.tsx` — none | `public/images/platform/` | `verify-report.png` | ❌ | ✅ add an image slot | No surface exists yet. |
| **F. Robotics overview image** | `robotics-hero.tsx` `PhotoPlate robot-in-operation` | `public/images/robotics/` | `overview-hero.jpg` | ✅ after 1-time `src` wiring | ⚠️ one-time (add `src`) | — |
| **G. R-Series product** | `robotics-product.tsx` + teaser `PhotoPlate family.scene` | `public/images/robotics/` | `r-series-hero.jpg` | ✅ after 1-time wiring | ⚠️ one-time (add `image` to `robots.ts`) | **Easiest of all** — config-driven. |
| **H. U-Series product** | same | `public/images/robotics/` | `u-series-hero.jpg` | ✅ after 1-time wiring | ⚠️ one-time (config) | Config-driven. |
| **I. NuvaSpan product** | same | `public/images/robotics/` | `nuvaspan-hero.jpg` | ✅ after 1-time wiring | ⚠️ one-time (config) | Config-driven. |
| **J. Company / founder / team** | `company/page.tsx` — none | `public/images/company/` | `founder.jpg`, `team.jpg` | ❌ | ✅ add an image slot | No surface exists yet. |
| **K. Case study / customer** | none | `public/images/cases/` | `<slug>-cover.jpg` | ❌ | ✅ add surface (future) | Gated on a real, consented customer. |

---

## 7. The core question: can I later just replace a file?

**"Same filename + same path + rebuild/deploy" works ONLY for assets already wired to a stable `src` path. Today, nothing is wired — so the first integration always needs a one-time code/config change.**

- **PhotoPlate-backed assets (B′, F, G, H, I):** need a **one-time** change to pass `src="/images/..."`. **After that, yes** — drop a new file at the same path, same name, rebuild/deploy, done. No further code change.
- **Custom mockups (A, B, C):** **no** — there is no image file to replace; you must change code (refactor the SVG/HTML mockup to render an `Image`). After that refactor, future swaps become same-name.
- **Missing surfaces (D, E, J, K):** **no** — code is required to *add* the image slot first.

**简短回答（中文）：**
> 目前没有任何图片被接入，所以现在任何替换都需要**先做一次性接线（改代码或配置）**。
> 接线完成后：**PhotoPlate 类（机器人产品图、机器人/平台 hero）→ 同名同路径 + 重新 build 即可替换，无需再改代码**；
> **自定义 mockup 类（首页 Hero、Command Center、Copilot 截图）→ 必须改组件代码**；
> **尚无图位的（CSV/报告截图、公司/团队、案例）→ 必须先改代码加图位**。

---

## 8. Recommendations

### 8.1 Best long-term asset-management plan
Do **one "wiring pass"** that makes the whole site drop-in replaceable:
1. Create `public/images/{hero,platform,robotics,company,cases,og,misc}/` with the stable filenames above.
2. Add an optional `image` field to `content/robots.ts` (per family) and pass `src` to every `PhotoPlate` (Platform hero, Robotics hero/teasers/products). → robotics & platform-hero become config-driven, same-name-swappable.
3. Refactor the three mockup surfaces (Homepage Hero, Command Center, AI Copilot panel) to render a real `Image` **when an asset exists**, falling back to the current mockup/SVG when it doesn't. → screenshots become drop-in without losing the current look.
4. Add image slots to EarlyAccess (CSV/PDF), RoiBand (report), and Company (team) — only when those assets are ready.

After this pass, **all future image changes are same-name file replacements + rebuild**, except for adding brand-new surfaces.

### 8.2 Minimal-change plan (do the cheapest high-value wiring now)
- Wire only the **config-driven** surfaces: add `image` to `robots.ts` (G/H/I), and pass `src` to the Robotics overview hero (F) and the Platform hero plate (B′). That makes the **sell-today robotics product images** drop-in replaceable with the least code, and leaves the mockups untouched until real screenshots exist.

### 8.3 Suggested first 10 images to replace (priority order)
1. **Platform Command Center screenshot** (B) — biggest credibility gap *(code)*
2. **AI Copilot screenshot** (C) — *(code)*
3. **R-Series product image** (G) — *(config)*
4. **U-Series product image** (H) — *(config)*
5. **NuvaSpan product image** (I) — *(config)*
6. **Robotics overview hero** (F) — *(config)*
7. **Homepage Hero** (A) — *(code)*
8. **CSV / Inspection-PDF analysis screenshot** (D) — *(code: add slot)*
9. **Verified Outcome / Report screenshot** (E) — *(code: add slot)*
10. **Company / founder / team** (J) — *(code: add slot)*

> Items 3–6 (robotics + overview hero) are the **cheapest** to wire (config only) and directly support the sell-today products; items 1–2 are the **highest-credibility** but depend on a real/prototype product UI.

*End of audit. Read-only — no files moved, added, or deleted; no code changed.*
