---
title: Robotics RP-0 – RP-3 Implementation Report
status: Done — lint clean, build green
scope: RP-0 spec truthfulness · RP-1 English default · RP-2 Robotics dropdown · RP-3 product pages
date: 2026-06-23
guardrails: No Homepage / Platform / Company / IA / brand-architecture / AI-Copilot-naming changes. SolarCleano = structure reference only.
---

# Robotics RP-0 → RP-3 — Implementation Report

## Summary

Four phases implemented and verified against the production build. The biggest change is **RP-0 honesty**: every fabricated robot figure is gone and replaced with **real datasheet values**; the previous "autonomous" overclaims (R-Series is single-operator, not autonomous) are corrected. Product pages are rebuilt to the **8-section structure** with graceful video and datasheet handling; the Robotics nav gains a lightweight product **dropdown**; and the root URL now **opens in English**.

---

## RP-0 — Robot spec truthfulness (`src/content/robots.ts`)

All metric/spec **values are now datasheet-sourced**; fabricated figures removed.

**Removed (0× in build):** `1.2 / 2.8 / 6.0 MWp/day-night`, `99.2% / 99.5% / 99.6% uptime`, `Auto-charging dock`, "Full autonomy".

**Real values now shown (sample, verified in build):**

| | NuvaTrack R-Series | NuvaTrack U-Series | NuvaSpan Series |
|---|---|---|---|
| Cleaning capacity | 2,000 m²/h | 600 m²/h | 4,000 m²/h |
| Travel speed | up to 60 m/min | 30 m/min | 18 m/min |
| Climbing | 20° | 10° | 25° |
| Dimensions | 600×530×220 mm | 600×490×220 mm | 4,923×540×562 mm |
| Weight | 42 kg | 38 kg | 48–80 kg |
| Cleaning | Dry & wet (dual-mode) | Dry, fully automatic | Water-free dry |
| Battery / power | 2 × Li-ion 36 V/15 Ah | Li-ion 36 V/15 Ah · solar | Solar self-powered |
| Notable | 2.4 GHz · 200 m remote · 9.6 L/min | IP65 · True unattended | 45° tilt · suspended/bridge |
| Warranty | 12 months | 12 months | 12 months |

- **Overclaim fixes:** R-Series reframed "autonomous" → **single-operator** (datasheet-accurate); U-Series "Fully autonomous" → **True unattended**; family copy, features, and the page `<meta>` description all softened off "autonomous".
- Added `datasheet` and `video` path fields; `FEATURE_KEYS` (f1–f4) for the new features list. Removed unused `AUTONOMY_KEYS` / `CONFIG_KEYS` (only the rewritten product page used them).
- Compare page (`robotics-compare.tsx`) `COMPARE_ROWS` updated to shared real keys (cleaningCapacity, speed, climbing, weight, cleaning, warranty, connectivity).

---

## RP-1 — English default (`src/i18n/routing.ts`)

- Added **`localeDetection: false`** → the root `/` always redirects to **`/en`** (no Accept-Language/cookie auto-redirect). en/de/ar/zh all retained; no `/cn`, no JSON rename.
- *Verification note:* config set + build green. The local preview tool was non-functional this session (couldn't be driven), so the live `/`→`/en` redirect should be eyeballed once on deploy — but this is next-intl's documented behavior for `localeDetection:false` + `localePrefix:"always"`.

---

## RP-2 — Robotics nav dropdown (`src/content/nav.ts`, `src/components/layout/header.tsx`)

- `nav.ts`: Robotics gains `children` (NuvaTrack R-Series · NuvaTrack U-Series · NuvaSpan Series · Compare models). Platform / Solutions / Resources / Company unchanged.
- **Desktop:** Robotics is still a link to `/robotics`, with a restrained hover/focus panel (white card, hairline border, `shadow-lift`, chevron) listing each product **name + a one-line positioning descriptor** + a separated "Compare models". Keyboard-accessible (opens on focus-within). Cleanuva styling, not a mega-menu, not SolarCleano.
- **Mobile (drawer):** Robotics shows its products as an indented sub-group. 4-locale via `Nav.roboticsMenu.*` (names are brand; descriptors localized).

---

## RP-3 — Product pages (8 sections) (`src/components/sections/robotics-product.tsx` + 2 new components)

New section order, premium-restrained Cleanuva language:

1. **Hero banner** — name, tagline, positioning; CTAs **Request a demo · Get pricing · Download datasheet**.
2. **Demo video** — `ProductVideo` (poster-first; play loads the mp4 with `controls muted playsInline`, no autoplay sound).
3. **Product summary** — positioning line + the 4 real headline metrics + "Best for:".
4. **Key features** — 4 real datasheet features (checklist).
5. **Technical specifications** — full real spec table + "All figures from the product datasheet."
6. **Deployment & use cases** — two real use-case cards.
7. **Datasheet download** — `DatasheetButton` (graceful).
8. **Final CTA** — Get pricing · Request a demo · Compare models.

**New graceful client components:**
- `product-video.tsx` — poster + play affordance; on missing/failed mp4 → "Demo video coming soon" (never a broken player); poster `onError` → dark frame (never a broken image); mobile/RTL safe.
- `datasheet-button.tsx` — HEAD-checks the PDF: present → "Download datasheet"; absent (default) → **"Request datasheet"** → Request a demo. Auto-upgrades when the PDF is dropped in. Never a 404.

---

## Files changed

- **Routing:** `src/i18n/routing.ts`.
- **Content:** `src/content/robots.ts` (real specs + datasheet/video fields), `src/content/nav.ts` (children).
- **Components:** `src/components/layout/header.tsx` (dropdown), `src/components/sections/robotics-product.tsx` (8 sections), **new** `product-video.tsx` + `datasheet-button.tsx`, `robotics-compare.tsx` (COMPARE_ROWS).
- **Route:** `src/app/[locale]/robotics/[family]/page.tsx` (meta description softened).
- **Messages:** `src/messages/{en,de,ar,zh}.json` — `Nav.roboticsMenu`, full `Robotics.specs` label set, `Robotics.product` additions (sections/video/summary/features/datasheet/etc.), and per-family real copy + features + deployment.
- **Dirs:** `public/videos/robotics/` + `public/downloads/robotics/` (`.gitkeep`).

**Untouched (per guardrails):** Homepage, Platform, Company, site IA/structure, brand architecture, AI-Copilot naming.

---

## Verification

- `pnpm lint` → **clean**.
- `pnpm build` → **green**, 71 static pages, **no MISSING_MESSAGE**.
- Build-output grep (authoritative, since the preview tool was down):
  - Real specs present: `600 / 2,000 / 4,000 m²/h` (54×), `38 kg`, `IP65`, `600 × 490 × 220 mm`, `2.4 GHz · 200 m`, `True unattended`.
  - **Fabricated data: 0×** for `2.8/1.2/6.0 MWp`, `99.5%/99.2%`, `Auto-charging dock`.
  - RP-3 sections present: `Key features`, `Deployment & use cases`, `Request datasheet`, `Play the demo`.
  - RP-2 dropdown present: `Unattended · large plants`, `Single-operator · rooftop`, `Compare models`.

---

## Follow-ups (assets to drop in — same-name, no code change)

- `/public/downloads/robotics/{nuvatrack-r-series, nuvatrack-u-series, nuvaspan-series}-datasheet.pdf` (we have the source PDFs).
- `/public/videos/robotics/{nuvatrack-r,nuvatrack-u,nuvaspan}-demo.mp4` (+ optional poster images).
- Real hardware photos at `/public/images/robotics/<slug>-hero.jpg`.
- Quick manual check of `/` → `/en` on the deployed build.

*End of report. Lint clean, build green. Stopping for review.*
