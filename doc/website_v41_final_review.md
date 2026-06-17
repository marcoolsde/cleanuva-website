---
title: Cleanuva Website — V4.1 Final Review
status: Read-only review — no code/content changed
scope: Homepage · Platform · Robotics · Solutions · Resources · Company
date: 2026-06-15
---

# Cleanuva Website — V4.1 Final Review

**Verdict.** The site is **substantially aligned** with V4.1 after Phases C1–C4. The Copilot, verified-outcome, Works-With-Your-Data, FAQ, and customer-segmentation content all reflect the corrected positioning. **No banned architecture term is rendered to customers** (`Operational Memory`, `Layer 1/2/3`, `Grounded Corpus`, `Moat` appear nowhere in visible copy). A small set of **residuals and two genuine conflicts** remain — mostly the pre-C1 Copilot phrasing that wasn't propagated beyond the Copilot section, plus the legacy Vision/Roadmap items. None are structural; all are content/copy fixes for a later phase.

**Counts:** 1 × P1 · 3 × P2 · 3 × P3. Items #5, #6, #7 (homepage hierarchy, segmentation, CSV placement) are fully aligned.

---

## A. Architecture-language term scan (rendered copy)

| Term | Rendered on site? | Notes |
|---|:-:|---|
| Operational Memory | ❌ none | Clean. |
| Layer 1 / 2 / 3 | ❌ none | Clean. |
| Grounded Corpus / Corpus | ❌ none (copy) | Only in `ai-copilot.tsx` **code comments** (not rendered) — see F4. |
| Moat | ❌ none (copy) | Only in `ai-copilot.tsx` code comment — F4. |
| Agent / Agents | ⚠️ key only | Content key `agents` in `roadmap.ts`; visible label is "Autonomous operation" (not "Agent"). Acceptable. |
| Runtime | ⚠️ false positive | Only "Extended runtime" / "Runtime and swap options" = **battery runtime** on Robotics. Not architecture. |
| Operational knowledge ("grounded in…") | ⚠️ 3 spots | Pre-C1 Copilot phrasing not propagated — F1/F2/F3. |

---

## B. The seven review questions

| # | Question | Status |
|---|---|---|
| 1 | Remaining V3-era messaging | ⚠️ Minor — "grounded in your plant's own operational knowledge" sublines (F1–F3); legacy Vision items (F5); OperatingModel uses the older Intelligence→Coordination→Accountability backbone (F7). |
| 2 | Remaining internal-architecture language | ✅ Clean in rendered copy; only code comments (F4) + a battery-"runtime" false positive. |
| 3 | Messaging conflicting with V4.1 | ⚠️ One real conflict — Vision "Thermal AI Analytics" / "Defect Detection" imply Cleanuva-authored thermal/CV (F5), which V4.1 forbids. |
| 4 | Platform communicates **Data → Copilot → Decision → Execution → Verified Outcome** | ⚠️ Partially — all stages exist but aren't sequenced/labeled as one explicit chain (F6). |
| 5 | Homepage **Platform First / Robotics Second** + Robotics commercial strength | ✅ Aligned. |
| 6 | Solutions matches updated segmentation | ✅ Aligned. |
| 7 | CSV Sandbox / Inspection-PDF placement vs Request Demo / Get Pricing | ✅ Aligned. |

**#5 detail.** Homepage order: Hero → Fragmentation → OperatingModel → LoopStrip → AiCopilot → CommandCenterPreview → **ConnectedExecution** → OutcomeLedger → ProofMetrics → SolutionsRoles → VisionRoadmap → TrustStrip → FinalCta. Platform narrative leads; Robotics is the connected-execution layer (second) while retaining commercial strength (top-level nav, product pages, "Get robotics pricing" CTA, flagship treatment in ConnectedExecution). ✔

**#6 detail.** Solutions renders the five updated personas (Self-operated Asset Owners · Independent O&M Providers · Financial Asset Owners / IPPs · EPC Contractors · Technical Auditors), Tier-1 first, anchors `#owners/#om/#ipps/#epc/#auditor`, footer label "Technical auditors". No "Utility-scale Operators" / old-persona residue. Request Demo role options match. ✔

**#7 detail.** Early Access (CSV / Inspection-PDF) lives only on the Platform page; its CTA is **Request a demo** (`/request-demo`), so it *feeds* the demo funnel rather than competing. It is not on the homepage hero, is not a primary site CTA, and is independent of Get Pricing (robotics). ✔

---

## C. Findings

### F5 — Vision/Roadmap implies Cleanuva builds internal thermal/CV — **P1**
- **Where:** `Vision.items.thermal` ("Thermal AI Analytics — IR imagery turned into defect-grade heat signatures") and `Vision.items.defect` ("Defect Detection — module-level fault classification at portfolio scale").
- **Why it conflicts:** V4.1 states Cleanuva **never authors internal thermal-vision/CV algorithms** (Tier-3 is **Reserved, boundary-API only**); Digital Twin is "hidden until pulled"; autonomy is shadow. Advertising thermal/defect analytics as Cleanuva roadmap capabilities implies internal CV ownership the architecture explicitly forbids, and stretches the roadmap-honesty rule (reserved/research shown as "building toward").
- **Note:** "Drone Inspection" (framed as a *connected* data-capture layer feeding the Copilot) and "Autonomous operation" (framed as *earned after the advisory Copilot proves itself*) are already V4.1-consistent. The issue is specifically the two CV/thermal items.
- **Recommended fix:** reframe Thermal/Defect as **partner-/connected-fed** (ingested from specialist providers), or drop them from the advertised roadmap; keep the connected/earned framing used by the Drone and Autonomy items.

### F1 — Platform Hero subline uses pre-C1 Copilot framing — **P2**
- **Where:** `Platform.Hero.subline` — "…an AI Copilot **grounded in your plant's own operational knowledge** — so you run the operation instead of chasing it."
- **Why it conflicts:** C1 corrected the Copilot story to outcomes ("learns from your operational history and verified outcomes"); the Platform hero still carries the old "grounded in operational knowledge" framing.
- **Recommended fix:** align to the C1 line — e.g. "…an AI Copilot that learns from your operational history and verified outcomes — so you run the operation instead of chasing it."

### F2 — Company AI-Copilot vision pillar uses pre-C1 framing — **P2**
- **Where:** `Company.vision.pillars.copilot.desc` — "An assistant **grounded in your plant's own operational knowledge** — turning fragmented data into decisions you can act on."
- **Why it conflicts:** same residual as F1. (Falls in the paused C5 scope.)
- **Recommended fix:** "An assistant that learns from your operational history and verified outcomes — turning fragmented data into decisions you can act on." (same fix as F1).

### F6 — Platform doesn't explicitly communicate the Data → Copilot → Decision → Execution → Verified Outcome chain — **P2**
- **Where:** Platform page narrative as a whole.
- **Status:** every stage is present — **Data** (Works With Your Existing Data; Telemetry Integration; IntelArc "Connect") → **Copilot** (AiCopilot) → **Decision** (IntelArc "from signal to evidence-based decision"; Work Order Management) → **Execution** (Command Center; Execution Dispatch) → **Verified Outcome** (RoiBand "Verified recovery"; Verification & Proof). But they are **not sequenced or labeled as one explicit chain**, and the data-source module sits late (after Copilot/Command Center).
- **Recommended fix (future phase, no new sections needed):** light reordering and/or a connective line so the five stages read as one narrative arc. Not actionable under the current "no new sections" constraint — flag for a sequencing pass.

### F3 — Homepage Hero subline carries the old Copilot framing — **P3 (Hero frozen)**
- **Where:** `Hero.subline` — "…an AI Copilot **grounded in your plant's own operational knowledge** — the system you run solar on, not another dashboard."
- **Why:** same residual as F1/F2. The Hero is **frozen by founder decision**, so this is deferred/optional — listed only for completeness and so the fix is applied consistently if/when the Hero is ever revisited.

### F4 — `ai-copilot.tsx` code comments still contain banned terms — **P3 (not rendered)**
- **Where:** comments in `src/components/sections/ai-copilot.tsx` — "Its moat is the grounded Operational Knowledge corpus, not the model", "Operational Knowledge — the grounded corpus", "grounded in that corpus".
- **Why:** not customer-facing (code comments), but inconsistent with C1, which only updated `copilot.ts`. Cleanup for consistency.
- **Recommended fix:** reword the comments to the outcome framing (no moat/corpus/Operational-Knowledge language).

### F7 — Homepage OperatingModel uses the V4-era backbone — **P3 (optional)**
- **Where:** `OperatingModel.body` — "…one operating layer — intelligence, coordination, and accountability, working as a single system."
- **Why:** compatible with V4.1 (intelligence≈Copilot, coordination≈execution, accountability≈verified) but predates the V4.1 chain. Not a conflict; optional future alignment toward Data → Copilot → Decision → Execution → Verified Outcome.

---

## D. Priority-ranked fix list

| Priority | Item | Fix | Scope |
|---|---|---|---|
| **P1** | F5 — Vision Thermal/Defect imply internal CV | Reframe as partner-/connected-fed or drop from advertised roadmap | Vision messages |
| **P2** | F1 — Platform Hero subline | Replace "grounded in operational knowledge" → "learns from your operational history and verified outcomes" | `Platform.Hero` |
| **P2** | F2 — Company Copilot pillar | Same reframing as F1 | `Company.vision` (paused C5) |
| **P2** | F6 — Platform chain not explicit | Sequencing/connective copy pass (no new sections) | Platform narrative |
| **P3** | F4 — code comments | Reword `ai-copilot.tsx` comments | Code comment only |
| **P3** | F3 — Homepage Hero subline | Same reframing as F1 — **deferred (Hero frozen)** | `Hero` |
| **P3** | F7 — OperatingModel backbone | Optional alignment to the V4.1 chain | `OperatingModel` |

---

## E. Confirmed aligned (no action)

- Copilot section (C1), verified-recovery/proof (C2), Works-With-Your-Data + Early Access + FAQ (C3), Solutions segmentation + Request Demo roles (C4).
- No `Operational Memory` / `Layer 1-2-3` / `Corpus` / `Moat` in rendered copy.
- Homepage Platform-First / Robotics-Second with Robotics commercial strength intact.
- CSV Sandbox / Inspection-PDF placement (Platform-only, Demo-feeding, non-competing).
- Robotics "runtime" = battery runtime (not architecture).

*End of review. No code or content changed. Fixes above are recommendations for a follow-up phase, several of which (F2, F3) sit inside the paused C5 / frozen-Hero scope and need your go-ahead.*
