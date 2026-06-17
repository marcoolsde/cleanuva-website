---
title: Phase IMG-2 — Homepage Hero Image Wiring (Report)
status: Done — lint + build passing
scope: Image wiring only. No Hero redesign, no copy/CTA/layout/overlay/animation changes.
date: 2026-06-15
---

# Phase IMG-2 — Homepage Hero Image Wiring

**Goal achieved:** the Homepage Hero now supports a real background image at a stable path. If the file exists, it loads as the hero's back layer; if it's absent, the Hero renders **exactly the current SVG/CSS scene** — no broken image, no change to copy, CTAs, layout, the data-layer overlay, the verify pulse, the robot marker, or the animations.

---

## 1. Files modified

| File | Change |
|---|---|
| `src/components/sections/hero-image.tsx` | **New** small `"use client"` component `HeroBackgroundImage`. Renders an optimized `next/image` (fill, priority, fade-in) when the file loads; **renders `null` on a missing/failed file** so the existing scene shows through. |
| `src/components/sections/hero.tsx` | Added the import and inserted **one new background layer ("2b")** between the synthetic Perspective Field and the data layer. Nothing else changed. |

**Layer order (unchanged except the new 2b):**
```
1.  Backdrop (CSS gradient)        ← unchanged
1b. Horizon glow line              ← unchanged
2.  Perspective Field (SVG)        ← unchanged
2b. Real hero background image     ← NEW (covers the synthetic scene when present; nothing when absent)
3.  Data layer + verify pulse      ← unchanged, stays ON TOP
4.  Robot marker                   ← unchanged, stays ON TOP
5.  Scrims                         ← unchanged, stays ON TOP
6.  Copy + CTAs                    ← unchanged, stays ON TOP
```

The image sits **below** the data layer, robot, scrims, and copy — so every foreground element remains on top in both states. No foreground element was removed or modified.

---

## 2. Image path

```
public/images/hero/homepage-hero.jpg
```

(The `public/images/hero/` directory already exists from Phase IMG-1. No real image was added in this phase — wiring only. Until a file is dropped there, the current CSS/SVG scene is shown.)

---

## 3. Replacement rule (going forward)

> **Yes — to update the Homepage Hero you only need to replace `public/images/hero/homepage-hero.jpg`.**

```
overwrite public/images/hero/homepage-hero.jpg → pnpm build → deploy
```

- **No code change**, no copy/layout/CTA edit.
- Same filename, same path. The new image loads automatically as the hero background, with the data layer / robot / scrims / copy still on top.
- If the file is removed or fails to load, the Hero automatically falls back to the current SVG/CSS scene (never a broken image).

---

## 4. Verification

- `pnpm lint` → **clean**.
- `pnpm build` → **green** (71 static pages, all locales).
- Preview (no image file present): Hero renders the **synthetic scene exactly as before** — field SVG, 5 data-layer pulse nodes, robot, headline triad, subline, "Request a demo" + "See how it works" CTAs all intact; **0 image elements, 0 broken images**.

---

## Out of scope (untouched)

No Hero redesign, no Step 12 visual direction, no new visual concept, no copy change. Command Center, AI Copilot, CSV Analysis, Verify Report, Company, and Case-study surfaces remain for their own phases.

*End of Phase IMG-2. Stopping for review.*
