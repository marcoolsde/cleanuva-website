---
title: Robotics Product Pages + Locale Routing — Audit & Implementation Plan
status: Read-only audit + plan — NO code changed this round
inputs: NuvaTrack R-Series.pdf · NuvaTrack U-Series.pdf · NuvaSpan Series.pdf (real datasheets, extracted) · SolarCleano F1 page (structure reference only)
design: frontend-design skill (premium, restrained Tesla/Apple/clean-energy; NOT a SolarCleano visual copy)
date: 2026-06-16
---

# Robotics Product Pages + Locale Routing — Audit & Plan

> Read-only. No code, content, or routing changed. SolarCleano is a **structure reference only** — Cleanuva keeps its current premium, restrained aesthetic (no SolarCleano fonts/colors/layout/low-end feel).

---

## 0. Headline findings

1. **All three datasheets were provided and are real** (4 content pages each). I extracted full specs — so R-Series and NuvaSpan are **not** "awaiting datasheet"; only **media assets** (videos, posters, downloadable PDFs) are missing.
2. **Critical honesty issue:** the current `content/robots.ts` metrics/specs are **fabricated and contradict the real datasheets** (e.g. "1.2 MWp/day", "99.2% uptime", "Full autonomy", "Auto-charging dock"). These must be **replaced with the real datasheet figures** (§5). This both fixes an overclaim and gives the pages credibility.
3. **Product pages are ~70% there** — banner, metrics, autonomy(features), specs, CTA exist. **Missing:** MP4 video section, datasheet download, and a Request Demo CTA.
4. **Default locale (corrected):** the root currently redirects to `/zh` because next-intl auto-detects the browser language. Fix is one line — `localeDetection: false` — so `/` always opens **`/en`**. (No `/cn`, no rename; see §2.)
5. **Robotics dropdown:** add as a small, data-driven submenu (children on the Robotics nav item); desktop hover/focus panel + mobile expandable group. No mega-menu.
6. **Confirmed canonical company facts (founder, 2026-06-16):** domain **`cleanuva.ai`** (canonical; `cleanuva.eu` is the legacy site and auto-redirects to `cleanuva.ai`) · address **Römerstraße 54, 40667 Meerbusch, Germany** · contact email **`info@cleanuva.de`** (the datasheet's `info@cleanuva.com` is superseded). These can fill the legal/contact `TODO`s in a later legal-update phase. *(Caveat: confirm whether this address is NETRO Sparkle GmbH's registered office/Sitz for the Impressum, vs the Cleanuva operating address.)* Brand etymology: "Cleanuva = Clean + Nova."

---

## 1. Current-state audit

### 1.1 Locale routing
- `src/i18n/routing.ts`: `locales: ["en","de","ar","zh"]`, `defaultLocale: "en"`, `localePrefix: "always"`. Labels/dir keyed by `zh` ("中文", ltr).
- `src/i18n/request.ts`: loads `messages/${locale}.json` → `zh.json`.
- `src/proxy.ts`: `createMiddleware(routing)`, matcher excludes api/_next/files.
- `src/app/[locale]/layout.tsx`: `generateStaticParams` over `routing.locales`; `<html lang={locale} dir>`; **Noto SC font gated on `locale === "zh"`**.
- `next.config.ts`: `createNextIntlPlugin`, no redirects.
- **Conclusion:** `zh` is the locale code everywhere; URLs are `/zh/...`.

### 1.2 Navigation
- `content/nav.ts` `NAV = [platform, robotics, solutions, resources, company]` — flat.
- `components/layout/header.tsx`: desktop maps `NAV` → `<Link>`; mobile `Sheet` maps `NAV` → links. **No dropdown anywhere.**

### 1.3 Robotics product pages
- Route `app/[locale]/robotics/[family]/page.tsx` → `generateStaticParams` (r-series/u-series/nuvaspan) → renders `RoboticsProduct`.
- `components/sections/robotics-product.tsx` sections: (1) cinematic hero/banner, (2) key metrics, (3) autonomy, (4) tech specs table, (5) deployment, (6) configuration highlights, (7) platform-connected advantage, (8) CTA (Get Pricing + Compare Models).
- Hero `PhotoPlate` already wired to `family.image` (IMG-1).
- **Gap vs target structure:** ❌ MP4 video · ❌ datasheet download · ❌ Request Demo CTA · ⚠️ specs are fabricated.

| Target section | Present? | Note |
|---|:-:|---|
| Product banner | ✅ | name, tagline, positioning, CTA, banner image |
| Product summary | ⚠️ | covered by hero positioning + metrics + autonomy; no single summary block |
| MP4 video | ❌ | **missing** |
| Features | ✅ (autonomy) | enrich from real datasheet |
| Technical data | ✅ | **but values fabricated** → replace |
| Datasheet download | ❌ | **missing** |
| CTA | ⚠️ | has Get Pricing + Compare; **add Request Demo** |

---

## 2. Default-locale fix — open in English (`/en`), not `/zh`

**Corrected requirement (2026-06-16): there is NO `/cn` requirement.** The real issue: visiting `cleanuva.ai/` currently auto-redirects to `/zh`. The goal is that the root **always opens in English at `/en`**; users switch language manually.

**Root cause:** `defaultLocale` is **already `"en"`**, so the `/zh` redirect is **next-intl's automatic locale detection** — the middleware reads the browser `Accept-Language` header (and/or a `NEXT_LOCALE` cookie) and sends `/` to the best-matched locale. A Chinese-preferring browser therefore lands on `/zh`.

**Fix (one line):** disable automatic detection so `/` always redirects to the default locale (`en`):
```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "de", "ar", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,   // ← root always → /en; ignore Accept-Language/cookie
});
```
- After this, `cleanuva.ai/` → `cleanuva.ai/en` for everyone; `/de`, `/ar`, `/zh` remain directly reachable and via the language switcher.
- **No `/cn`, no locale rename, no `zh.json` change, no redirect rules.** en/de/ar/zh and SSG all unaffected.

**Risk / verification:** confirm `/` → `/en` via `pnpm build` + preview, and that the locale switcher still navigates to `/de` `/ar` `/zh`. Trade-off (intended): a returning Chinese-browser user is **not** auto-sent to `/zh` from the root — that is exactly the requested English-default behavior.

**Withdrawn:** the previous "keep `zh`, map `/cn`" plan is no longer needed.

---

## 3. Robotics nav dropdown plan (lightweight, 4-locale, mobile-safe)

**Data model (minimal):** give the Robotics `NAV` item optional `children`:
```ts
// content/nav.ts (shape only)
{ key: "robotics", href: "/robotics", children: [
  { key: "rSeries",  href: "/robotics/r-series" },
  { key: "uSeries",  href: "/robotics/u-series" },
  { key: "nuvaSpan", href: "/robotics/nuvaspan" },
  // optional: { key: "compare", href: "/robotics/compare" }
]}
```
Labels = the product names (`NuvaTrack R-Series · NuvaTrack U-Series · NuvaSpan`) — brand names, identical across locales; an optional one-line descriptor per item can come from messages for 4-locale richness.

**Desktop:** when a nav item has `children`, render it as a trigger that opens a **small, restrained panel** on hover **and** focus/click (keyboard accessible) — a clean white card, hairline `border-line`, soft `shadow-lift`, cool-accent active state; each row = product name + a thin descriptor; a quiet "Compare models →" footer link. **Not** a mega-menu, **not** SolarCleano styling. (The repo already has a Radix `navigation-menu` component if preferred, but a focused popover keeps it lighter.)

**Mobile (Sheet):** the Robotics row becomes an **expandable group** — tapping it reveals the 3 indented product links (disclosure pattern), Platform/Solutions/Resources/Company stay simple links. Keep the existing drawer; only Robotics gains children.

**Guardrails:** don't change Platform/Solutions/Resources/Company; hover panel must be keyboard- and touch-accessible (open on focus/click, close on Esc/outside); respect reduced motion; RTL-safe (logical positioning).

---

## 4. Product page structure plan

Keep the current premium page; **add three things and correct the specs**. Proposed section order (banner → summary → video → features → specs → datasheet → CTA), reusing existing sections where possible:

1. **Product Banner** — *(exists)* name eyebrow, one-line tagline, banner image, CTA. **Add Request Demo** beside Get Pricing.
2. **Product Summary** — *(light new block or reuse metrics)* positioning paragraph + "best for" use-cases + 3–4 headline value points (from the real datasheet).
3. **MP4 Video** — **new**. A 16:9 framed player, **poster image**, `controls muted playsInline preload="none"` (no autoplay sound). Path `/videos/robotics/<slug>-demo.mp4`; **graceful**: if the file is absent, show the **poster/placeholder** (a small client `ProductVideo` component, same null-on-error discipline as the image wiring) — never a broken frame; mobile-safe; reduced-motion respected.
4. **Features** — *(exists as "autonomy"; rename/enrich)* real datasheet features (unattended op, dual-ended cleaning, IP65, dry brushing, etc.).
5. **Technical Data** — *(exists; replace values)* real specs table from §5 (dimensions, weight, movement, battery, brush, water where applicable).
6. **Datasheet Download** — **new**. "Download datasheet" → `/downloads/robotics/<slug>-datasheet.pdf`; **graceful**: if missing, show **"Request datasheet"** (→ Request Demo) instead. (We *have* the PDFs and can place them in the implementation phase.)
7. **CTA** — *(exists)* **Get Pricing · Request Demo · Compare Models.**

**Design direction (frontend-design, premium-restrained):** dark cinematic banner with real hardware imagery (per image wiring); generous whitespace; mono for numeric specs (already the pattern); one warm accent for the execution CTA; the **video** is the page's "signature moment" — a single framed, posters-first player, not a wall of media. Keep specs as a clean two-column data list, not a SolarCleano-style dense table.

**Asset path conventions (to wire, like IMG-1/3):**
- Banner image: `/images/robotics/<slug>-hero.jpg` *(already wired)*
- Video: `/videos/robotics/<slug>-demo.mp4` + poster `/images/robotics/<slug>-poster.jpg`
- Datasheet: `/downloads/robotics/<slug>-datasheet.pdf`

---

## 5. Extracted datasheet content (REAL — use these, replace fabricated specs)

> Common to all: brand line *"Cleanuva stands for Clean + Nova — we boost real-world PV output in harsh environments (desert, mountainous, coastal) through true unattended and single-operator cleaning."* · Dry/helical dual-fiber brush family · **12-month warranty** · fits common PV module types. Positioning term **"true unattended"** is OK; **avoid implying fully-autonomous platform control** of all operations.

### 5.1 NuvaTrack U-Series — *true unattended, large plants*
- **Hero tagline:** "True unattended PV cleaning."  **Eyebrow callouts:** Auto route planning · Smart return-to-charge · Dual-ended cleaning · IP65 · Night-time operation · MW-scale daily cleaning.
- **Summary:** Purpose-built for routine, high-frequency maintenance of large PV plants — runs **without on-site personnel**, suited to harsh outdoor conditions; **zero on-site intervention after one-time deployment**.
- **Features:** Auto route planning for scheduled missions · Smart return-to-charge when battery low · Dry cleaning with helical dual-fiber brush (no trace) · Dual-ended pathing for efficient row passes · Works day or night (no lighting) · IP65 enclosure, salt-resistant alloy build.
- **Tech specs (real):** Chassis **600×490×220 mm** · Total weight **38 kg** · Speed **30 m/min** · Cleaning capacity **600 m²/h** · Climbing **10°** · Battery **1 × Li-ion 36 V / 15 Ah**, autonomy **4 h**, charger **15 A**, charge time **3 h**, **solar charging** · Cleaning **dry**, **fully automatic** · Brush length **1132/1420 mm**, diameter **200 mm**, speed **330 rpm**, servo motor.
- **Reliability/Env:** IP65 · salt-resistant alloy · day/night · long-term reliability & easy service.
- *Note:* the current robots.ts "2.8 MWp/night / 99.5% uptime / Auto-charging dock" are **invented** → replace with the above; use **"MW-scale daily cleaning"** (datasheet's own claim) qualitatively instead of a fake MWp number.

### 5.2 NuvaTrack R-Series — *single-operator, small/medium, rooftop/carport*
- **Hero tagline:** "Single-operator tracked PV cleaning."  **Callouts:** Labor-reduced semi-auto lane assist · Dual-mode dry/wet · Heading hold · auto turning · Dual-ended cleaning.
- **Summary:** Compact, high-efficiency tracked robots for small-to-medium distributed plants, carports, rooftop PV; **one operator** can deploy, control, and complete daily cleaning; modular for one-person transport & setup. **Two configurations** (Base: single-operator remote, manual steering; + a heading-hold/auto-turning config).
- **Features:** Single-operator remote (battery) · Modular quick-disassembly · Dual-mode (dry brushing + wet rinse as needed) · Dual-ended (twin brushes + front/rear nozzles, one-pass) · 360° rotating water pipe · Ultrasonic edge protection.
- **Tech specs (real):** Chassis **600×530×220 mm** · Total weight **42 kg** (aluminum body ~15 kg) · Speed **up to 60 m/min** · Cleaning capacity **2000 m²/h** · Climbing **20°** · Battery **2 × Li-ion 36 V / 15 Ah**, runtime **3 h**, charger **15 A**, charge **1.5 h** · Remote **2.4 G, 200 m** · Water: flow **9.6 L/min**, hose ID **12–14 mm**, pump **14 L/min**, max head **70 m** · Brush **1132/1420 mm**, **200 mm**, **330 rpm**, servo.
- *Note:* current "1.2 MWp/day / 99.2% uptime" are **invented** → replace.

### 5.3 NuvaSpan Series — *suspended/bridge, utility-scale, complex terrain*
- **Hero tagline:** "Suspended PV cleaning for utility-scale terrain."  **Callouts:** Suspended/bridge architecture · PV self-charging · Water-free dry brushing · Obstacle crossing (front/back & vertical) · Project-specific rails · Unattended operation.
- **Summary:** Purpose-built for utility-scale ground-mounted PV and complex terrain (mountainous, desert/Gobi, long uneven rows); travels automatically along **project-specific rails**; cuts O&M workload and water dependency.
- **Features:** Unattended after deployment · Suspended/bridge with custom rails/spans · **Battery + integrated PV self-charging** (no external cabling) · Accommodates module tilts/heights · Obstacle crossing front/back + vertical · Built-in self-check & diagnostics · **Water-free dry brushing**.
- **Tech specs (real):** Size **4923×540×562 mm** (customizable) · Net weight **48–80 kg** · Travel speed **18 m/min** · Cleaning capacity **4000 m²/h** · Climbing **25°** · Module tilt **45°** · Obstacle clearance: vertical step **50 mm**, longitudinal offset **50 mm** · Power **solar self-powered**, runtime **2 h**.
- *Note:* current "6.0 MWp/night / 99.6% uptime" are **invented** → replace.

---

## 6. Missing inputs (to provide before/at implementation)

| Item | Status | Note |
|---|---|---|
| R-Series / U-Series / NuvaSpan **datasheet text** | ✅ provided (extracted §5) | use real specs |
| **Demo videos** `/videos/robotics/<slug>-demo.mp4` | ❌ not provided | section degrades to poster until added |
| **Video poster images** `/images/robotics/<slug>-poster.jpg` | ❌ | reuse hero image as fallback |
| **Datasheet PDFs** in `/public/downloads/robotics/` | ⚠️ available on disk (Desktop) | place + rename to `<slug>-series-datasheet.pdf` when implementing |
| **Real hardware photography** `/images/robotics/<slug>-hero.jpg` | ❌ (gradient fallback) | from image asset gap analysis |
| R-Series **two-configuration** detail | ⚠️ partial in PDF | confirm the second config's exact name/features |
| Per-product 4-locale **descriptors** (dropdown + summary) | ❌ | short copy to write in en/de/ar/zh |
| Domain / contact | ✅ confirmed | Canonical domain **cleanuva.ai** (`cleanuva.eu` legacy → redirects); email **info@cleanuva.de**; address Römerstraße 54, 40667 Meerbusch |

---

## 7. Recommended implementation phases

- **Phase RP-0 — Spec correctness (do first, P0 honesty).** Replace fabricated `robots.ts` metrics/specs with the real datasheet figures (§5); add real features. *(content only; no layout change.)*
- **Phase RP-1 — English-default fix.** Add `localeDetection: false` in `routing.ts` so `/` → `/en`; build + verify the root redirect and the language switcher. *(one line; routing only.)*
- **Phase RP-2 — Robotics dropdown.** Add `children` to the Robotics nav item; desktop popover + mobile expandable group; 4-locale labels. *(header + nav.ts; no other nav change.)*
- **Phase RP-3 — Product page upgrades.** Add MP4 video section (poster-first, graceful), datasheet download (graceful "Request datasheet"), Request Demo CTA, and a summary block; wire video/datasheet path conventions. *(robotics-product.tsx + a small ProductVideo client component.)*
- **Phase RP-4 — Assets.** Place datasheet PDFs, posters, (later) real videos and hardware photos via the established same-name-swap wiring.

Each phase: `pnpm lint` + `pnpm build` + preview, stop for review (matching established workflow).

---

## 8. Risks & guardrails

- **Honesty:** use only real datasheet specs; **do not re-introduce invented MWp/uptime numbers**; "true unattended" is allowed, but **avoid implying full platform autonomy / no-human operation of everything** (Master Brief: human-in-the-loop, no autonomous execution).
- **No broken media:** video/datasheet must degrade gracefully (poster / "Request datasheet"); never a broken frame or 404 link; mobile + RTL safe; video muted + playsInline + controls, no autoplay sound.
- **Locale:** `localeDetection: false` for an English default (`/` → `/en`); verify the switcher still reaches de/ar/zh; no `/cn`, no JSON rename.
- **Nav:** dropdown must not break Platform/Solutions/Resources/Company; keyboard + touch accessible; light, not a mega-menu.
- **Brand/visual:** keep Cleanuva's premium restraint; **do not** copy SolarCleano's fonts/colors/layout/feel.
- **Scope (this round and these phases):** do **not** touch Homepage Hero, Platform page, Company page, or Get Pricing logic. SolarCleano is reference structure only.
- **Side note (not in scope this round):** confirmed canonical facts — domain **cleanuva.ai**, address **Römerstraße 54, 40667 Meerbusch, Germany**, email **info@cleanuva.de** — to fill the legal/contact `TODO`s in a separate legal-update phase (confirm registered-office vs operating-address for the Impressum first).

*End of plan. Read-only — no code, content, routing, or assets changed. Awaiting confirmation.*
