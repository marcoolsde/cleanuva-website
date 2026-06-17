---
title: Cleanuva Website — Asset Implementation Roadmap
status: Roadmap / planning only — NO asset or wiring implementation started. Awaiting founder go-ahead.
scope: The six asset categories the founder prioritized after the brand-architecture workstream (P0–P2) closed
supersedes: nothing — extends doc/website_asset_gap_analysis.md (what's missing) and doc/website_image_asset_structure_audit.md (how images wire) into an implementation sequence
date: 2026-06-17
guardrails: trust-and-claims-policy (no fabricated proof) · real product OR honestly-labeled mockups · no stock hardware
---

# Asset Implementation Roadmap

The brand-architecture phase (D1 / P0–P2) is complete. The next priority is **asset readiness** — replacing synthetic/placeholder visuals with real product imagery. This document sequences that work into an **implementation plan** (production + codebase wiring), per category. **No implementation has started.**

## 0. How assets wire into this codebase (the mechanism, confirmed read-only)

There are **two injection paths** today, plus a class of visuals that have **no image slot yet**:

1. **`PhotoPlate`** (`src/components/primitives/photo-plate.tsx`) — pass a `src` under `/public/images/...` → renders an optimized `next/image`; if the file is absent it keeps the gradient fallback (never a broken image). **Swap = drop a correctly-named file (or pass `src`).** Slots that already exist (just need the file + `src`): Platform hero (`platform-hero.tsx`, `scene="product-ui"`), Robotics overview hero, the three product heroes, the three product pages.
2. **`HeroBackgroundImage`** (`src/components/sections/hero-image.tsx`) — full-bleed hero background by `src`. Already used on Company (`/images/company/company-hero.jpg`).
3. **No slot yet (hard-coded CSS/HTML mockups)** — the **Command Center** (`command-center.tsx`, `command-center-preview.tsx`), the **AI Copilot panel** (`ai-copilot.tsx`), the **CSV/Inspection** block (`early-access.tsx`), and the **Verified report / Outcome** (`roi-band.tsx`, `outcome-ledger.tsx`) are synthetic. Using **real screenshots** here requires **adding an image slot** (a `PhotoPlate`/`next/image` next to or in place of the mockup) — that is net-new wiring, listed per category below.

**Folder convention** (from `public/images/`): `platform/`, `robotics/`, `hero/`, `company/`, `cases/`, `og/`, `misc/`. Existing real files: `hero/homepage-hero.jpg`, `robotics/overview-hero.jpg`, `robotics/u-series-hero.jpg`. Proposed new files follow the same pattern.

**The central gate:** the four *Platform UI* categories (screenshots, Command Center, Copilot, CSV/inspection, verified report) depend on **the real product UI existing** (`app.cleanuva.ai` / the V4.1 build). They must be **real product or honestly-labeled mockups** — never a faked dashboard passed as live. Robotics imagery is **not** product-UI-gated and can move first.

---

## 1. The six categories — current state, target, wiring, production, gating

### A. Robotics photography / renders  *(not product-gated — start here)*
- **Current:** `PhotoPlate` gradient fallbacks only (`robot-in-operation`, `robot-dusk`, `plant-golden-hour`); two stray real files exist (`robotics/overview-hero.jpg`, `u-series-hero.jpg`) of unconfirmed quality.
- **Target assets:** per model (NuvaTrack R-Series, U-Series, NuvaSpan) — hero shot, on-array/in-operation shot, scale/with-human shot, 1–2 detail shots. Real hardware photography **or** photorealistic renders (OEM/partner imagery with usage rights is acceptable per the partner/OEM model).
- **Wiring:** **slots already exist** — `robotics-hero.tsx`, `robotics-product-hero.tsx` (×3), `robotics-product.tsx` (×3) all call `PhotoPlate`. Implementation = drop files at `/public/images/robotics/{r,u,nuvaspan}-{hero,array,scale,detail}.jpg` and pass `src` (or wire `src` off `content/robots.ts`). Minimal code.
- **Production:** commission renders from the OEM/partner CAD, or a photo shoot of a real unit. Gated only on a render-ready model or a filmable unit.
- **Honesty:** must be the actual hardware or accurate renders — never stock robots.

### B. Platform screenshots  *(umbrella — product-UI-gated)*
- **Current:** the Platform page sells a SaaS platform with **zero real UI** — Platform hero is a `product-ui` gradient + synthetic `DiagnosisCard`.
- **Target:** a small, decisive set of **real product screenshots** (or honestly-labeled high-fidelity prototype) that map 1:1 to page claims — the four below (C/D/E/F) are the specific shots.
- **Wiring:** Platform hero slot exists (`platform-hero.tsx`); the four specific shots need slots per C–F.
- **Gating:** the V4.1 product UI must exist. **Sequence with product progress.**
- **Honesty:** real product, or clearly labeled "product mockup / preview."

### C. Command Center visuals
- **Current:** hard-coded CSS console mockup in `command-center.tsx` (Platform) and `command-center-preview.tsx` (homepage). **No image slot.**
- **Target:** one real Command Center screenshot (portfolio map + telemetry + work orders + recommendations + verified outcomes).
- **Wiring (net-new):** add a `PhotoPlate`/`next/image` slot — either replacing the mockup or as a "real screenshot" companion beside it. File: `/public/images/platform/command-center.png` (+ optional `command-center-preview.png` for the homepage crop).
- **Decision needed:** replace the synthetic console, or keep it as stylized art and add the real screenshot elsewhere on the page?

### D. AI Copilot visuals  *(name unchanged — "AI Copilot" per locked decision)*
- **Current:** hard-coded chat mockup (`ai-copilot.tsx` `CopilotPanel`) on Homepage + Platform. **No image slot.**
- **Target:** a real AI Copilot conversation screenshot (grounded, source-cited answer + "draft work order" action), reinforcing the V4.1 Copilot-primary story.
- **Wiring (net-new):** add a slot in/next to `CopilotPanel`. File: `/public/images/platform/ai-copilot.png`. (A short Copilot demo *video* is the higher-value asset per the gap analysis but **video is explicitly out of scope this round** — note only.)
- **Honesty:** the conversation must reflect real product behavior, not an aspirational script.

### E. CSV / Inspection analysis visuals
- **Current:** `early-access.tsx` is text + two icon cards — **no screenshot slot at all.**
- **Target:** two output screenshots — (1) historical CSV → soiling/underperformance/recoverable-yield analysis; (2) inspection-PDF → defects/risks/recommended actions.
- **Wiring (net-new):** add two image slots to `early-access.tsx`. Files: `/public/images/platform/analysis-csv.png`, `/public/images/platform/analysis-inspection.png`.
- **Gating:** depends on the analysis feature/UI producing a real, shareable output.

### F. Verified report visuals
- **Current:** `roi-band.tsx` (Platform) and `outcome-ledger.tsx` (homepage) are synthetic metric/ledger mockups; figures are honestly labeled "illustrative." **No screenshot slot.**
- **Target:** a real VERIFY / recovered-revenue report (recovered yield reconciled against real generation, with the verification trail).
- **Wiring (net-new):** add an image slot to `roi-band.tsx` (and optionally the homepage ledger). File: `/public/images/platform/verified-report.png`.
- **Honesty (critical):** this is the proof surface — a real **verified** report needs **real data**. Until a pilot exists, keep the **"illustrative"** label or show an explicitly-labeled sample. A real, numbers-bearing report is **earned, not produced** (see §3). Do **not** present fabricated recovery as verified.

---

## 2. Sequencing — two parallel tracks

**Track 1 — Robotics (producible now, slots mostly exist).** Lowest friction, highest "this is a real product you can buy" payoff. Order: overview hero → three model heroes → scale/detail shots → product-page + Compare visuals. Wiring is minimal (files + `src`).

**Track 2 — Platform UI (gated on the product existing).** Order by credibility leverage: **Command Center → AI Copilot → CSV/Inspection analysis → Verified report**. Each of C–F needs **net-new image-slot wiring** plus the real screenshot. Start the slot-wiring design as soon as the product UI can produce real (or honestly-labeled preview) screenshots.

| Step | Asset | Track | Wiring effort | Gated on |
|---|---|---|---|---|
| 1 | Robotics overview + 3 model heroes | 1 | Low (slots exist) | render-ready model / filmable unit |
| 2 | Robotics scale + detail + product-page/Compare | 1 | Low–Med | same |
| 3 | Command Center screenshot | 2 | **Med (new slot)** | product UI |
| 4 | AI Copilot screenshot | 2 | **Med (new slot)** | product UI |
| 5 | CSV + Inspection analysis screenshots | 2 | **Med (2 new slots)** | analysis feature UI |
| 6 | Verified report screenshot | 2 | **Med (new slot)** | product UI + (real data = earned) |

> Note: the **homepage hero** (real field photography vs product-UI hero) and **video** (Copilot demo, robot-in-operation) are documented in `website_asset_gap_analysis.md` but are **out of scope for this roadmap** per the founder's category list and the "no video work" constraint.

---

## 3. Honesty guardrails (binding — trust-and-claims-policy)

- **Real or clearly-labeled.** Product screenshots = real product, or visibly labeled "preview/mockup." Robot imagery = actual hardware or accurate renders. No stock.
- **Verified ≠ fabricated.** A "verified recovery report" with real numbers is **earned** — it requires a real pilot + consent + real data. Until then, the verified-report visual stays **illustrative/sample-labeled**.
- **Product-gated honesty:** don't ship a screenshot of a feature that doesn't function as shown.
- **AI Copilot stays "AI Copilot"** in all asset captions/labels (locked naming decision).

---

## 4. Open decisions before any implementation

1. **Robotics imagery source:** commissioned photorealistic renders (from OEM/partner CAD) vs a photo shoot of a real unit — which, and is there usage-rights-cleared partner imagery?
2. **Command Center & Copilot:** replace the synthetic mockups with real screenshots, or keep the stylized mockups as art and place real screenshots alongside?
3. **Product-UI readiness:** can `app.cleanuva.ai` / the V4.1 build currently export real (or honestly-labeled preview) screenshots for Command Center, Copilot, CSV/inspection, and the report? This sets the Track-2 start.
4. **Verified report:** ship an explicitly-labeled *sample* report now, or hold the slot until a real pilot produces real data?

---

*End of roadmap. Planning only — no assets produced, no slots wired, no components changed. Awaiting founder go-ahead to begin (recommended start: Track 1 / Robotics, which is not product-gated).*
