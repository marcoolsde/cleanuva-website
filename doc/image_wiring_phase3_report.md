---
title: Phase IMG-3 — Core Page Image Wiring (Report)
status: Done — lint + build passing
scope: Image wiring only. No page redesign, no copy/CTA/structure/tile/category/legal/trust changes.
date: 2026-06-15
---

# Phase IMG-3 — Core Page Image Wiring

**Goal achieved:** Platform, Solutions, Resources, and Company now each support a real top-visual image at a stable path. If the file exists it loads behind the hero; if it's absent the page renders **exactly the current visual/layout** — no broken image, mobile- and RTL-safe, no content/structure change.

The reusable `HeroBackgroundImage` component (added in IMG-2) is reused: it renders an optimized `next/image` when the file loads and **`null`** when it's missing/fails, so the existing hero shows through. Hero text stays on top (`relative z-10`).

---

## 1. Files modified

| File | Change |
|---|---|
| `src/app/[locale]/platform/page.tsx` | **None** — already wired in IMG-1 (the Platform hero `PhotoPlate` carries `src="/images/platform/platform-hero.webp"`). Verified complete. |
| `src/app/[locale]/solutions/page.tsx` | Import `HeroBackgroundImage`; hero `<Section>` → `relative isolate overflow-hidden`; inserted a background image layer; hero `<Container>` → `relative z-10`. Nothing else touched. |
| `src/app/[locale]/resources/page.tsx` | Same minimal hero wiring. |
| `src/app/[locale]/company/page.tsx` | Same minimal hero wiring. |
| `src/components/sections/hero-image.tsx` | **None** — reused as-is. |

Each new hero layer is identical in shape:
```tsx
<Section className="relative isolate overflow-hidden">
  <div className="absolute inset-0" aria-hidden>
    <HeroBackgroundImage src="/images/.../<page>-hero.jpg" />
  </div>
  <Container className="relative z-10 ...">  {/* unchanged content */}
</Section>
```
Only the wrapper positioning + the image layer were added. Copy, CTAs, the 5 Solutions tiles, the Resource categories, the Company intro / Legal links / Trust section — all unchanged.

---

## 2. Image path per page

| Page | Image path | Mechanism |
|---|---|---|
| **Platform** | `public/images/platform/platform-hero.webp` | `PhotoPlate` (IMG-1) |
| **Solutions** | `public/images/hero/solutions-hero.jpg` | `HeroBackgroundImage` |
| **Resources** | `public/images/hero/resources-hero.jpg` | `HeroBackgroundImage` |
| **Company** | `public/images/company/company-hero.jpg` | `HeroBackgroundImage` |

(No real images were added in this phase — wiring only. Directories already exist from IMG-1.)

---

## 3. Same-name file replacement?

**Yes.** For all four pages, future updates are:
```
overwrite the same-named file → pnpm build → deploy
```
…with **no code change**. Drop the file at the exact path above and it loads automatically behind the hero.

---

## 4. Fallback when the file is missing

- `HeroBackgroundImage` / `PhotoPlate` detect a missing or failed load (`onError`) and render the fallback: `HeroBackgroundImage` renders **nothing** (the current light hero shows), `PhotoPlate` keeps its **gradient**.
- Result: **no broken image, no layout shift, mobile + RTL unaffected.** The image layer is a full-bleed `inset-0` cover with no directional positioning; content sits above via `relative z-10`.

---

## 5. Any future code change needed?

**No** — once a file is placed at its path, all subsequent swaps are same-name overwrites. The only thing not covered by wiring is **legibility treatment**: the Solutions/Resources/Company heroes are light with dark text, so when a real photo is dropped in, a scrim/treatment may be wanted for contrast. That is a **deferred design decision**, intentionally out of scope for this wiring-only phase.

---

## 6. Build / Lint

- `pnpm lint` → **clean**.
- `pnpm build` → **green** (71 static pages, all locales).

---

## 7. Verification (image files absent)

| Page | Result |
|---|---|
| Platform | Wired (IMG-1) — PhotoPlate `product-ui` gradient fallback, unchanged. |
| Solutions | h1 + **5 tiles** intact · 0 broken images · 0 stray img elements. |
| Resources | h1 + **categories + "Coming soon"** intact · 0 broken images. |
| Company | h1 + **#vision/#security/#contact anchors + Trust section + 9 Legal links** intact · 0 broken images. |

No errors, no broken images, page visuals normal across all four.

---

## Out of scope (untouched)
Homepage Hero, Robotics pages, Command Center, AI Copilot, CSV Analysis, Verify Report, Case studies, product screenshots, page redesign, copy. Legibility/scrim treatment deferred.

*End of Phase IMG-3. Stopping for review.*
