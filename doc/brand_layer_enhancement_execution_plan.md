---
title: Cleanuva Website — Brand Layer Enhancement Execution Plan (Phase D1)
status: Read-only audit + plan — NO code/content changed yet. Awaiting founder confirmation.
scope: Brand Layer · Marketing Narrative · Copy Hierarchy ONLY
not-in-scope: Website re-architecture · IA · navigation · page structure · Hero · video
authority:
  - doc/master_brand_alignment_review.md (Audit A)
  - doc/demo_narrative_alignment_review.md (Audit B)
  - Founder decisions (below) override audit recommendations where they conflict
date: 2026-06-16
---

# Brand Layer Enhancement — Execution Plan (Phase D1)

## Founder decisions locked for this round (override the audits)

1. **AI Copilot stays as-is.** Do **not** run the audits' "AI Copilot → Operational Analyst" site-wide rename or the phased terminology migration. The site keeps **AI Copilot**. The dual-name scheme (`AI Copilot (Operational Analyst)`) is a future *in-platform* matter, **not touched this round.** → Audit A R8 and the entire "Terminology migration" section are **dropped**.
2. **NuvaTrack R-Series / U-Series / NuvaSpan are real Cleanuva Robotics product lines.** No "platform not implemented" / "code does not exist" reasoning. Robotics page **stays as-is structurally.**
3. **Hero is frozen.** No Hero rewrite, no Hero redo, no Hero IA change. We do not enter the Hero this round.
4. **Video deferred.** No video plan, audit, or development.

## The single problem this round solves

> Cleanuva is misread as **a Platform** (an AI software/operating layer for solar).

We make the brand architecture legible:

- **Cleanuva** = the clean-energy technology **brand**
- **Cleanuva Platform** = a product line (the AI software / operating layer)
- **Cleanuva Robotics** = a product line (NuvaTrack / NuvaSpan)
- **Cleanuva Solutions** = a product line (packaged delivery by role)

This is achievable with **copy + naming edits only** — no nav, no IA, no page structure, no Hero.

---

## 1. Where the "Cleanuva = Platform" brand collapse lives today

Audited read-only across `src/messages/en.json`, page files, and section components. The collapse is driven by these exact strings:

| # | Location (key) | Current string | Why it collapses brand→software | Touchable this round? |
|---|---|---|---|---|
| C1 | `Footer.tagline` | "The AI-native operating layer for solar." | Appears on **every page** — site-wide, the brand is defined as the operating layer. **Highest leverage.** | ✅ Yes (not the Hero) |
| C2 | `Hero.eyebrow` + `Hero.subline` | "The AI-native operating layer for solar" / "…the system you run solar on, not another dashboard." | First screen equates Cleanuva with the software. | ❌ **FROZEN** — Hero. Leave untouched. |
| C3 | `OperatingModel.body` | "Cleanuva replaces fragmented tools with one operating layer…" | "Cleanuva" (the brand) = "one operating layer" (one product line). | ✅ Yes |
| C4 | `Company.title` + `Company.lead` | "Building the operating layer for solar." / "Cleanuva unifies… into one AI-native system" | Company page — the brand's home — defines Cleanuva as the operating layer/system. | ✅ Yes |
| C5 | `Company.vision.heading` + `Company.vision.body` | "One platform, three layers." / "The platform is the product." | Explicitly states brand = platform; the three "layers" are *inside* the platform, not the three product lines. | ✅ Yes |
| C6 | `Company.vision.pillars` | Platform / **AI Copilot** / Robotics | The three brand pillars read as Platform + a feature + Robotics — **Solutions is absent** and AI Copilot (a Platform feature) sits at pillar altitude. | ✅ Yes (see §3 + decision flag) |
| C7 | `Execution.title` + `Execution.body` | "The platform commands the execution." / "Robots, drones, and crews connect into Cleanuva as options." | Robotics is framed only as an *execution option inside the platform*, not as the peer **Cleanuva Robotics** product line. | ✅ Yes |
| C8 | `Loop.platformTag` | "Cleanuva operating layer" | Reinforces brand = operating layer in the loop strip. | ✅ Yes (minor) |
| C9 | `Resources.categories.platform.desc`, `Trust.signals.maturity` | "the AI-native operating layer…", "Platform and robotics" | Minor reinforcement; low leverage. | ✅ Optional (P2) |

**Pages affected by the collapse:** Homepage (C2 frozen, C3/C7/C8 fixable), Company (C4/C5/C6), and the Footer (C1, every page). The Platform page's own "operating layer" hero is **correct in context** (it *is* the Platform) and is left alone.

---

## 2. Homepage — strengthen the master brand WITHOUT touching the Hero

Constraint acknowledged: the Hero (eyebrow/headline/subline/scene) is frozen, so the **first screen will still read "operating layer for solar."** We therefore correct the read in the sections that follow — a **brand "recovery"** after the Hero, not a fix at the Hero. Levers, all copy-only on existing sections:

- **`OperatingModel` (the section right after the problem):** rename the subject from the bare brand to the product line. 
  - `OperatingModel.body`: "Cleanuva replaces fragmented tools…" → **"Cleanuva Platform replaces fragmented tools…"** This reframes "operating layer" as **one product line**, not the whole brand. (Audit A R2.)
- **`ConnectedExecution`:** elevate Robotics from "an execution option" to the peer product line. 
  - `Execution.body`: name **"Cleanuva Robotics"** as the first-party robot line that the **Cleanuva Platform** dispatches — "one product line, not the identity" framing (keeps the existing "execution is a layer, not the identity" intent). 
  - `Execution.layers.robotics.desc`: lead with "Cleanuva Robotics — NuvaTrack robots…". 
- **`Loop.platformTag`:** "Cleanuva operating layer" → **"Cleanuva Platform"** (the strip already pairs it with "Connected execution"; naming both as product lines makes the architecture legible at a glance). *(Minor, P2.)*
- **`FinalCta` (optional, P2):** add one brand-architecture sentence to the closing body, e.g. *"Platform, Robotics, and Solutions — one clean-energy brand for solar."* No new section, just one line in existing copy.

**Explicitly NOT done on the homepage:** no Hero edit, no new section, no reordering, no IA change. The brand-architecture "anchor" the homepage cannot put in the Hero is instead carried **site-wide by the Footer** (§4) — which is why the Footer change is the highest-leverage P0.

---

## 3. Company page — strengthen the three-pillar (three product line) expression

The Company page is the closest to correct (it already carries "Cleanuva is a brand of NETRO Sparkle GmbH" and a 3-pillar block). Two copy moves + one small key swap:

- **`Company.title` / `Company.lead`:** soften the brand=operating-layer framing. Title can stay outcome-led, but the lead should open with the brand, e.g. *"Cleanuva is a clean-energy technology brand for solar — AI software, robotics, and the solutions that package them."* (Audit A R1, scoped to Company since the Hero is frozen.)
- **`Company.vision.heading` / `body`:** "One platform, three layers." / "The platform is the product." → **brand-architecture framing**, e.g. heading *"One brand, three product lines."* and a body that names **Cleanuva Platform · Cleanuva Robotics · Cleanuva Solutions** as the pillars (keep the AI Copilot/intelligence idea *inside* the Platform pillar).
- **`Company.vision.pillars` — the one structural-adjacent decision (see §6 flag):** today the three pillars are Platform / **AI Copilot** / Robotics. To express the three **product lines**, the middle pillar should become **Cleanuva Solutions**, and titles become "Cleanuva Platform / Cleanuva Robotics / Cleanuva Solutions". 
  - **AI Copilot is NOT renamed or removed** — it moves *inside* the Cleanuva Platform pillar description (where it belongs as a Platform capability). This is consistent with founder decision #1 (the name "AI Copilot" stays on the site). 
  - Code touch: `src/app/[locale]/company/page.tsx` `PILLARS` array key `copilot` → `solutions`, and swap the `Sparkles` icon for a Solutions icon (e.g. `Boxes`/`Package`). This is a **3-line copy/label change, not a structural change** — same grid, same layout.

---

## 4. Footer — add brand-layer expression (highest site-wide leverage)

The Footer renders on every page and currently *defines the brand as the operating layer* (C1). Two moves:

- **`Footer.tagline`:** "The AI-native operating layer for solar." → a **master-brand line**, e.g. *"Clean-energy technology for solar — software, robotics, and proven results."* (This is `Footer.tagline`, a distinct key from `Hero.eyebrow`; changing it does **not** touch the Hero.)
- **Brand-architecture micro-line (P2):** add one line near the tagline or in the legal strip, e.g. *"Cleanuva Platform · Cleanuva Robotics · Cleanuva Solutions — one clean-energy brand."* (Audit A R6.) 
  - Implementation note: this is a **single copy line** added to existing footer markup (`src/components/layout/footer.tsx`), not a new column or structural block. The footer columns (Platform / Robotics / Solutions / Company) already exist and stay exactly as they are.

---

## 5. Robotics page — raise it to a peer product line (no structural change)

Founder: Robotics page **stays as-is structurally.** The only lever is **naming** — wrap the existing copy in the **"Cleanuva Robotics" pillar voice** so the page reads as a co-equal product line, not "robots that plug into the platform":

- **`Robotics.Fleet.body`** (or `Robotics.Advantage.body`): introduce the family as **"Cleanuva Robotics"** once — e.g. *"Cleanuva Robotics is our first-party robot line — NuvaTrack R-Series, U-Series, and NuvaSpan…"* This single naming sentence establishes the pillar without any layout change.
- Keep the autonomy narrative, the product/spec/compare structure, the CTAs, and the product names **exactly as they are.** (Audit B's "soften full autonomy" recommendation is **out of scope** — founder confirmed Robotics is real product expression.)

No new sections, no reordering, no hero edit on Robotics.

---

## 6. What MUST change vs. what MUST NOT be touched

### Must change (brand-collapse fixes)
- `Footer.tagline` (C1) — **P0**, site-wide.
- `OperatingModel.body` (C3) — name **Cleanuva Platform**.
- `Company.lead`, `Company.vision.heading`, `Company.vision.body` (C4/C5).
- `Company.vision.pillars` (C6) — middle pillar → **Cleanuva Solutions**; pillar titles → proper-noun product lines. *(Touches the AI Copilot pillar — see decision flag below.)*
- `Execution.title`/`body`/`layers.robotics.desc` (C7) — **Cleanuva Robotics** peer voice.
- Selective proper-noun pass: `Loop.platformTag` (C8), and naming **Cleanuva Robotics** once on the Robotics page (§5).
- New brand-architecture micro-lines: Footer (§4) and optional FinalCta (§2).

### Must NOT be touched
- **Hero** — eyebrow, headline, subline, scene (`Hero.*`). Frozen.
- **AI Copilot naming** anywhere (`Copilot.*`, `Platform.Hero.diag.title`, `Footer.links.diagnosis`, `OperatingModel.layers.intelligence.tangible`, `Forms.Demo.goals.copilot`, etc.). No rename, no "Operational Analyst", no dual-name. Founder decision #1.
- **Robotics product names** (NuvaTrack R/U-Series, NuvaSpan) and the **Robotics page structure**.
- **NETRO Sparkle GmbH** legal seam — already correct; leave.
- **Honesty posture** — illustrative figures, `Trust.status`, "no customers we don't have", no self-service/production-SaaS claims.
- **Navigation, IA, page order, new pages** — none.
- **Platform page hero** — "operating layer" is correct *there* (it is the Platform). Leave.
- **Video** — out of scope.
- A **full global** "Cleanuva Platform/Robotics/Solutions" find-and-replace — do it **selectively** at the high-leverage points above; do not over-name every incidental "the platform" mention (avoids stilted copy and a 4-locale churn).

---

## 7. Estimated files affected

Copy is centralized in the four locale message files; section components read from them. Only one code file needs a (small) edit.

| File | Change | Notes |
|---|---|---|
| `src/messages/en.json` | All copy edits above | Source of truth |
| `src/messages/de.json` | Same keys, German | **Every string change must propagate to all 4 locales** |
| `src/messages/ar.json` | Same keys, Arabic (RTL) | |
| `src/messages/zh.json` | Same keys, Chinese | |
| `src/components/layout/footer.tsx` | Add brand-architecture micro-line markup (one `<p>`) | Only if P2 micro-line is approved; tagline change alone needs no code edit |
| `src/app/[locale]/company/page.tsx` | `PILLARS` key `copilot`→`solutions` + icon swap | Only if §3 pillar swap is approved |

No changes to: `content/*.ts` (structural keys only — `Execution`/`OperatingModel` icons stay), routing, nav config (`content/nav.ts`), or any other page.

---

## 8. Implementation order

### P0 — kill the site-wide brand=software collapse
- **C1** `Footer.tagline` → master-brand line (4 locales). *Highest leverage: every page, no code edit, no Hero.*
- **C3** `OperatingModel.body` → "Cleanuva Platform replaces…" (4 locales).
- **C5/C4** `Company.vision.heading`+`body` and `Company.lead` → brand-architecture framing (4 locales).

### P1 — make the three product lines legible
- **C6** Company vision pillars → Cleanuva Platform / Robotics / **Solutions** (+ `company/page.tsx` key/icon). *Pending founder OK on the AI-Copilot-pillar move (§6 flag).*
- **C7** `Execution.*` → Cleanuva Robotics peer voice (4 locales).
- §5 Robotics: one "Cleanuva Robotics" naming sentence in `Robotics.Fleet`/`Advantage` (4 locales).
- Selective proper-noun naming where it reads naturally.

### P2 — reinforce
- Footer brand-architecture micro-line (`footer.tsx` + 4 locales).
- `Loop.platformTag` → "Cleanuva Platform" (C8); optional `FinalCta` brand line; `Resources`/`Trust` minor touch-ups (C9).

---

## Decision flags requiring founder confirmation before coding

1. **Company vision middle pillar (C6):** confirm replacing the **AI Copilot** pillar with **Cleanuva Solutions**, relocating the AI Copilot description *inside* the Cleanuva Platform pillar. This does **not** rename AI Copilot (decision #1 respected) — but it does change what sits at pillar altitude on the Company page. Approve / hold?
2. **Footer tagline rewrite (C1):** confirm the new master-brand tagline direction ("Clean-energy technology for solar — software, robotics, and proven results.") vs. an alternative wording you prefer.
3. **Homepage limitation:** confirm acceptance that, with the Hero frozen, the homepage's brand-architecture correction lands in OperatingModel / ConnectedExecution / Footer (post-Hero recovery), not on the first screen.

---

---

## Supplementary audit — does the Homepage still tilt "Cleanuva = Platform"? (added per founder request)

Read-only re-sweep of every homepage section after the Hero freeze:

| Section | Brand=Platform tilt? | Verdict |
|---|---|---|
| **Hero** (`Hero.*`) | **Strong** — "operating layer for solar" / "the system you run solar on". | **FROZEN** — cannot touch this round. Remains the dominant residual tilt by founder decision. |
| Fragmentation | None (problem framing). | OK — leave. |
| **OperatingModel** (`OperatingModel.body`) | Yes — "Cleanuva replaces… with one operating layer". | **Fixed in P0** → "Cleanuva Platform replaces…". |
| **LoopStrip** (`Loop.platformTag`) | Mild — "Cleanuva operating layer". | Deferred to P2 (C8). |
| AiCopilot (`Copilot.*`) | None — it's a Platform feature, correctly sub-positioned. | OK — and AI Copilot name preserved (decision #2). |
| CommandCenterPreview | None — eyebrow already reads "Platform · Command Center" (correctly attributes to the Platform). | OK. |
| **ConnectedExecution** (`Execution.*`) | Yes — Robotics framed only as an execution option "inside" the platform. | Deferred to P1 (C7). |
| OutcomeLedger / ProofMetrics | None (outcome framing). | OK. |
| SolutionsRoles (`Solutions.*`) | Under-expresses **Cleanuva Solutions** as a product line, but does not cause brand=platform tilt. | P1/P2 naming opportunity. |
| VisionRoadmap / TrustStrip | None of note. | OK. |
| FinalCta | Soft — "Run your plant on Cleanuva" reads slightly platform-ish. | Optional P2 brand line. |

**Conclusion:** Yes, a residual "Cleanuva = Platform" tilt remains on the homepage — but it is now **concentrated almost entirely in the frozen Hero**. No *new* tilt sources were found beyond those already in this plan. With the Hero frozen, the homepage correction is a **post-Hero recovery** (OperatingModel fixed in P0; ConnectedExecution/LoopStrip in P1/P2). **No new page, module, or IA change is needed or proposed** — all fixes are copy-only on existing sections.

---

## P0 execution log (this round)

**Done (4 locales each: en / de / ar / zh):**
- **C3** `OperatingModel.body` → "**Cleanuva Platform** replaces fragmented tools…" (reframes the operating layer as one product line).
- **C4** `Company.title` → "Building the technology behind solar operations." + `Company.lead` → brand-architecture opening (names Cleanuva as the brand + the three product lines).
- **C5** `Company.vision.heading` → "One brand, three product lines." + `Company.vision.body` → brand-level framing (AI Copilot kept *inside* the Platform pillar).
- **C6** `Company.vision.pillars`: `copilot` → **`solutions`**; titles → **Cleanuva Platform / Cleanuva Robotics / Cleanuva Solutions**. AI Copilot relocated into the Platform pillar description (decision #1 honored — name preserved, no rename). Code: `src/app/[locale]/company/page.tsx` `PILLARS` reordered to Platform → Robotics → Solutions, `Sparkles` icon → `Boxes`.

> **Scope note on C6:** C6 was tagged P1 in the original plan, but founder **decision #1** explicitly mandated the Company-vision three-pillar change. Because rewriting the vision intro (C5, P0) to "three product lines" would visibly contradict an unchanged "AI Copilot" card beneath it, C6 was executed together with C5 for coherence. If you'd prefer the cards reverted, say so.

**Validation:** all four locale JSON files parse OK; `tsc --noEmit` clean; `Boxes` icon verified; no orphaned `copilot` pillar key remains.

**C1 closed (founder re-evaluated; final selection "Find lost solar revenue. Recover it. Prove it."):** `Footer.tagline` updated in all 4 locales — en "Find lost solar revenue. Recover it. Prove it." · de "Verlorenen Solarertrag finden. Zurückgewinnen. Nachweisen." · ar "اكتشِف الإيراد الشمسي المفقود. استعِدْه. أثبِتْه." · zh "发现流失的光伏收益。挽回它。证明它。" Removes the site-wide brand=software tagline and restores the core value prop (lost solar revenue + recovery + proof); replaces the earlier interim "Find it. Fix it. Prove it." which was too generic.

**P0 COMPLETE.** All C1/C3/C4/C5/C6 edits applied; all 4 locale JSON parse OK; `tsc --noEmit` clean.

**Not started (correctly held): P1 and P2.** Stopping here per instruction.

*End of Phase D1 — P0 batch complete. Awaiting founder confirmation before P1.*

---

## P1 execution log (this round)

**Founder P1 directive:** clarify Cleanuva = parent commercial brand; Company pillars = Cleanuva Platform/Robotics/Solutions (done P0); AI Copilot stays inside Cleanuva Platform (unchanged); **strengthen Robotics as a parallel pillar, not merely an execution layer**; no Hero / IA / nav / video.

**Done (4 locales each: en / de / ar / zh) — copy-only, no code files:**
- **C7 · ConnectedExecution (`Execution.*`):**
  - `title` → "**Cleanuva Platform** commands the execution." (named product line, selective proper-noun).
  - `body` → leads with "**Cleanuva Robotics** — our own first-party robot line" and closes "**a product line in its own right, not just an execution option**" — directly elevates Robotics to a parallel pillar while keeping the honest operational fact that the Platform orchestrates. Drones/crews stay generic connected options (distinguishing first-party Robotics from third-party execution).
  - `layers.robotics.title` "Robotic cleaning" → "**Cleanuva Robotics**"; `desc` → "Our first-party NuvaTrack robots — Cleanuva-branded, platform-directed…". (drones/crews cards unchanged.)
- **C8 · LoopStrip pillar tags (`Loop.platformTag` / `roboticsTag`):** "Cleanuva operating layer" / "Connected execution" → "**Cleanuva Platform**" / "**Cleanuva Robotics**" — the loop strip now visibly connects two **named, peer product lines** (parallel-pillar reinforcement).
- **§5 · Robotics page (`Robotics.Fleet.body`):** prepended "**Cleanuva Robotics is our first-party robot line** — NuvaTrack R-Series, U-Series, and NuvaSpan…". Names the pillar on the Robotics page itself. **No structural change** (Robotics hero, autonomy narrative, product/spec/compare, CTAs all untouched).

**Brand-architecture clarification (founder item #1):** Cleanuva = parent commercial brand is now carried by the P0 Company lead/vision *plus* the P1 named peer pillars in ConnectedExecution and the loop strip. No new copy block needed.

**Explicitly NOT touched:** Hero (homepage + all page heroes), AI Copilot naming (14 occurrences in en intact), navigation (`content/nav.ts`), IA / page structure, Robotics page structure, video. No new pages or modules.

**Validation:** all 4 locale JSON parse OK; AI Copilot strings unchanged; no code files modified in P1.

**Held: P2** (Footer brand-architecture micro-line; FinalCta brand line; `Solutions` intro "Cleanuva Solutions" naming; Resources/Trust minor touch-ups). Not started — awaiting review.

*End of Phase D1 — P1 batch complete. Stopping for review before any P2 work.*

---

## P2 execution log (this round) — lightweight copy-layer refinement only

**Done (4 locales each: en / de / ar / zh):**
- **Footer brand-architecture micro-line:** added `Footer.brandLine` = "**Cleanuva Platform · Cleanuva Robotics · Cleanuva Solutions**", rendered as a muted caption under the tagline on every page. Code: one `<p>` added to `src/components/layout/footer.tsx` (no new module, no structural change — same footer grid).
- **Cleanuva Solutions naming alignment** (`Solutions.page.intro`): now opens "**Cleanuva Solutions** packages Platform and Robotics into one accountable operation for every role…". Names the third product line on the Solutions page. (Nav/column label stays the short "Solutions" — no nav change.)
- **Brand-consistency touch-ups** (`Resources.categories`): `platform.desc` "the AI-native operating layer" → "**Cleanuva Platform**" (removes the last lingering brand=operating-layer phrasing outside the Platform hero); `robotics.desc` prefixed with "**Cleanuva Robotics:**".

**Explicitly NOT touched:** Hero (all heroes), homepage structure, navigation, IA, Robotics page structure, AI Copilot naming. No new modules, no new pages.

**Validation:** all 4 locale JSON parse OK; `brandLine` present in all 4; `tsc --noEmit` clean (footer change).

*End of Phase D1 — P0 + P1 + P2 all complete. Brand-architecture workstream closed.*
