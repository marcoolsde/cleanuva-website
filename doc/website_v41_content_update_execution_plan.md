---
title: Cleanuva Website — V4.1 Content & Messaging Update Execution Plan (Rev. 4)
status: Plan locked — execution started at Phase C1
scope: CONTENT + MESSAGING ONLY. No architecture / IA / navigation / page-structure / funnel changes.
purpose: Reflect V4.1's COMMERCIAL VALUE — NOT V4.1's internal technical architecture.
date: 2026-06-14
---

# Cleanuva Website — V4.1 Content & Messaging Update Execution Plan (Rev. 4)

## 0. Governing principles

The website's job is **Marketing · Sales · Lead Generation** — not a product spec, technical white paper, or V4.1 architecture display. V4.1 is the product-design document; the website is its **commercial expression.**

1. **Outcomes, not mechanisms.** Express **Better Decisions · Faster Diagnosis · Higher Recovery · Verified Outcomes** — never internal mechanisms.
2. **Marketing surface vs FAQ.** Marketing pages communicate capability, confidence, value. Implementation limitations, validation workflows, compatibility caveats, and onboarding procedures live only in the **FAQ**.
3. **Roadmap honesty.** May show: live capabilities, confirmed near-term roadmap, and Early-Access capabilities. Must **not** show: long-term research, paused features, or features with no confirmed implementation plan.
4. **No compatibility promises.** The current code cannot confirm full support of every brand's CSV/exports. Marketing must **never** say "Fully supports", "Compatible with all exports", or "Instantly process any CSV". Use **capability/design framing** instead (see §6). Specific support status lives in the FAQ.

**Banned terms on the entire website** (internal architecture — customers don't buy these):
> Operational Memory · Layer 1 / Layer 2 · Grounded Corpus · Compound Moat · Decision Layer · Decision Policy · Decision Artifact · Session Router · Trust Budget · Runtime Architecture.

**Fixed & untouched architecture/navigation:**
```
Homepage · Platform · Robotics · Solutions · Resources · Company · Request Demo · Get Pricing · Login(app.cleanuva.ai)
```
Business identity stays: **Cleanuva = AI O&M Platform + Robotics.**

---

## 1. UNCHANGED this round (strictly forbidden to modify)

- **Homepage Hero · Robotics pages · Navigation · IA · Funnels · Login · Request Demo architecture · Get Pricing architecture** — all confirmed correct; do not touch.
- Top-level architecture, routing, anchors, page structures/order; design system; i18n; legal pages; trust-layer; platform-first + dual (Platform + Robotics) identity.

---

## 2. Pages getting a V4.1 CONTENT upgrade

| Rank | Page | Weight | Focus |
|---|---|---|---|
| 1 | **Platform** | Heavy | Copilot value · verified outcomes · **Works With Your Existing Data** · CSV/PDF Early-Access entry · lightweight **FAQ** |
| 2 | **AI Copilot content** (shared Homepage + Platform) | Medium | Reframe to outcomes (Phase C1) |
| 3 | **Solutions** | Medium | Segmentation relabel (same 5 tiles) |
| 4 | **Company** | Light | Vision-pillar wording (outcome-led) |
| 5 | **Request Demo** | Light (content) | Role options aligned to segmentation |
| — | Homepage (non-hero) | Minimal | Inherits Copilot/proof wording |
| — | **Robotics / Hero / Login / Nav / Funnels** | **None** | Out of scope |

---

## 3. Per-page content upgrades

### 3.1 AI Copilot (Phase C1) — `src/content/copilot.ts` + `Copilot.*`; shared Homepage + Platform
- Reframe to outcomes. Core message: **"AI Copilot learns from your operational history and verified outcomes."** → faster diagnosis, better decisions, higher recovery. Source-cited, human-in-the-loop.
- **Remove** the "moat is the grounded corpus" line and any banned term. **Do not** explain internal mechanisms further.
- Keep the customer-facing conversation example and the real-sources credibility list.

### 3.2 Platform page — keep all sections, upgrade content
Emphasize: **operational visibility · AI-assisted diagnosis · verified outcomes · turning historical data into decisions.**
- Copilot section → §3.1.
- `IntelArc` → light outcome line ("gets sharper as it runs your plants"); no theory/autonomy.
- Proof (`RoiBand` / Homepage `OutcomeLedger`) → strengthen EXISTING content toward **verified outcomes**; no new concept layer.
- `Capabilities.items` → value-led copy.
- NEW: Works With Your Existing Data (§4.1); CSV/PDF Early Access (§4.2); lightweight FAQ (§4.3).

### 3.3 Solutions — same 5 tiles, relabel only
Self-operated Asset Owners · Independent O&M Providers · Financial Asset Owners / IPPs · EPC Contractors · Technical Auditors. Change title/description/pain only (+ stale `utility`→`auditor` key/anchor). IA unchanged.

### 3.4 Company — light outcome-led vision-pillar wording.
### 3.5 Request Demo — role dropdown options aligned to segmentation (content only).
### 3.6 Homepage (non-hero) — inherits §3.1/§3.2 wording. No hero change.

---

## 4. Modules ADDED (inside the Platform page)

### 4.1 Works With Your Existing Data (marketing — capability/value)
- Answers *"Can it work with my existing data?"* with confidence, no caveats.
- Capability framing only: connects to what you already run — **Solarman · Huawei FusionSolar · Sungrow · SMA · CSV · Inspection Reports** — **no new hardware**.
- New `src/content/adapters.ts` + `Adapters.*` (4 locales).

### 4.2 CSV Sandbox / Inspection-PDF Analysis (marketing — value & use cases)
- Visible **Early Access** capability + acquisition entry. **CTA → Request Demo.** Not a primary CTA; never replaces Demo/Pricing.
- Marketing copy = value only, e.g. **Historical CSV Analysis · Inspection Report Analysis · Turn Historical Data Into Actionable Insights**.
- **Must NOT contain:** compatibility disclaimers, adapter-validation workflow, CSV-field checks, brand-support limits, "we need to validate your format", or "submit data to help us adapt". All of that → §4.3 FAQ.

### 4.3 Lightweight FAQ (transparency — details live here only)
- A small accordion section on the Platform page (existing `Accordion` component), anchored — content within an existing page, **no new route/nav**.
- **Keep it light: 4–6 items. Not a product manual.** Suggested set:
  - How does the CSV Sandbox work?
  - What data sources can Cleanuva work with?
  - How do I request access?
  - Can I use historical data?
  - Do I need new hardware?
  - What happens after I submit a demo request?
- New `src/content/faq.ts` + `Faq.*` (4 locales). FAQ is a supporting module, **not** the page's main narrative.

---

## 5. Modules MODIFIED (content rewrites only)
`Copilot.*` + `copilot.ts` (C1) · Platform `IntelArc` · Platform `RoiBand` + Homepage `OutcomeLedger` · Platform `Capabilities.items` · `Solutions.roles.*` (+ `SOLUTION_ROLES`) · `Company.vision.pillars.*` · `Forms.Demo.roles` · project-memory note.

---

## 6. Allowed capability phrasing for data sources (no compatibility promises)
Use: **"Works With Leading Solar Data Sources" · "Built To Connect With Existing Operational Data" · "Designed For Historical CSV And Inspection Data".**
Never: "Fully supports" · "Compatible with all exports" · "Instantly process any CSV". Specific support status → FAQ.

---

## 7. Explicitly NOT done
No nav/IA/routing/structure changes; no new routes (FAQ is a Platform section). No Hero/Robotics/Login/Funnel/Request-Demo/Get-Pricing changes. No caveats/validation/onboarding on marketing pages (FAQ only). No banned internal-architecture terms anywhere. No compatibility promises. No fabricated proof. No long-term research / paused / unplanned features shown as current.

---

## 8. Phases (each: edits in 4 locales → build → lint → preview → stop for review)
- **C1 — Copilot outcome correction** (`copilot.ts` + `Copilot.*` + shared AiCopilot sections). **← executing now.**
- **C2 — Proof / verified-outcome strengthening** (Platform `RoiBand`, Homepage `OutcomeLedger`, light `IntelArc`).
- **C3 — Platform modules + FAQ** (Works-With-Your-Data; CSV/PDF Early Access; lightweight 4–6-item FAQ).
- **C4 — Solutions relabel** (+ Request Demo role options).
- **C5 — Company + minimal Homepage polish.**

---

## 9. Notes
- FAQ = Platform-page accordion section; no new route/nav. Marketing modules stay caveat-free; all detail in the FAQ.
- CSV/PDF entry CTA resolves to existing `/request-demo`.
- Hero, Robotics, Login, Nav, IA, Funnels: untouched.

*End of Rev. 4 (locked). Executing Phase C1.*
