---
title: Phase IMG-1 — Website Image Wiring Pass (Report)
status: Done — lint + build passing
scope: Image wiring only. No layout/UI/copy/CTA/Hero/Command-Center/Copilot changes.
date: 2026-06-15
---

# Phase IMG-1 — Website Image Wiring Pass

**Goal achieved:** the wired surfaces now load a real image from a stable path **if the file exists**, and **fall back to the current gradient if it doesn't** — so future replacement is *overwrite the same-named file → build → deploy*, with **no code change**. All current visuals are unchanged.

---

## 1. Created directories

```
public/images/
├── hero/        (.gitkeep)
├── platform/    (.gitkeep)
├── robotics/    (.gitkeep)
├── company/     (.gitkeep)
├── cases/       (.gitkeep)
├── og/          (.gitkeep)
└── misc/        (.gitkeep)
```

Each holds a `.gitkeep` placeholder; **no real images were added** (per scope). Directories are ready to receive assets.

---

## 2. New image configuration (`src/content/robots.ts`)

Added an `image` field to the `RobotFamily` interface and to each family:

| Family | `image` value |
|---|---|
| NuvaTrack R-Series | `/images/robotics/r-series-hero.jpg` |
| NuvaTrack U-Series | `/images/robotics/u-series-hero.jpg` |
| NuvaSpan | `/images/robotics/nuvaspan-hero.jpg` |

The existing `scene` field is retained as the gradient fallback mood.

---

## 3. Wired surfaces

| Surface | File | Source passed to `PhotoPlate` |
|---|---|---|
| **Robotics Overview hero** | `sections/robotics-hero.tsx` | `src="/images/robotics/overview-hero.jpg"` |
| **R-Series** (overview teaser + product page) | `sections/robotics-product-hero.tsx`, `sections/robotics-product.tsx` | `src={family.image}` → `/images/robotics/r-series-hero.jpg` |
| **U-Series** (overview teaser + product page) | same components | `src={family.image}` → `/images/robotics/u-series-hero.jpg` |
| **NuvaSpan** (overview teaser + product page) | same components | `src={family.image}` → `/images/robotics/nuvaspan-hero.jpg` |
| **Platform hero** | `sections/platform-hero.tsx` | `src="/images/platform/platform-hero.webp"` |

**`PhotoPlate` upgrade** (`primitives/photo-plate.tsx`): now `"use client"` with graceful fallback — it renders the optimized `next/image` only when the file actually loads; on a missing/failed file it **keeps the existing `scene` gradient + label** (via `onError`), and the image fades in when present. The site never shows a broken image.

> Compare page (`robotics-compare.tsx`) intentionally has **no image** — unchanged.

---

## 4. Replacement rule (going forward)

To replace any of these images, **only**:

```
overwrite the same-named file → pnpm build → deploy
```

…with **no code change**, for:

- `/images/robotics/r-series-hero.jpg`
- `/images/robotics/u-series-hero.jpg`
- `/images/robotics/nuvaspan-hero.jpg`
- `/images/robotics/overview-hero.jpg`
- `/images/platform/platform-hero.webp`

Drop the file at the exact path/name above; it loads automatically. Until a file is added, the current gradient stands in.

---

## 5. Verification

- `pnpm lint` → **clean**.
- `pnpm build` → **green** (71 static pages prerendered, all locales).
- Preview (no image files present): all wired surfaces render the **gradient + scene label exactly as before** — `0` broken images, no layout/copy/CTA change, no console crash.

---

## Out of scope (not touched — next phases)

Homepage **Hero** (`hero.tsx`), **Command Center**, **AI Copilot**, **CSV Analysis**, **Verify Report**, **Company** page, **Case studies** — all left exactly as-is per instruction. These are custom SVG/CSS mockups or have no image slot yet, and require their own decisions/phases.

*End of Phase IMG-1. Stopping for review.*
