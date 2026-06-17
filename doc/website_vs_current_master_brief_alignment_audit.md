---
title: Cleanuva Website vs Current Platform Master Brief — Alignment Audit
status: Read-only audit — no code/content changed
authority: doc/Cleanuva_Current_Platform_Master_Brief.md (2026-06-16) — business positioning authority
scope: Homepage · Platform · Robotics · Solutions · Resources · Company · Request Demo · Get Pricing · Legal/Footer/Nav
date: 2026-06-16
---

# Cleanuva Website vs Current Master Brief — Alignment Audit

Priorities: **P0** = must fix before launch · **P1** = important positioning fix · **P2** = useful improvement · **P3** = optional polish.

---

## 1. Executive Summary

The website is a **well-built, honest, on-brand marketing site** — but it was built against the *V4.1 "platform-is-the-identity, AI-Copilot-as-the-differentiator, platform-first/robotics-second"* line. The new Master Brief makes three structural moves the site has not yet absorbed:

1. **Cleanuva is the commercial MASTER BRAND** — *not* equal to the software platform. Platform / Robotics / Solutions are **peer product lines** under it. The site currently presents Cleanuva ≈ "the AI-native operating layer" (i.e. the software).
2. **"AI Copilot" is deprecated → "Operational Analyst."** The site is built around "AI Copilot" (~20 occurrences/locale + nav, footer, a hero section, a content file). "Operational Analyst" appears **nowhere**. This directly conflicts with the just-completed V4.1 content work.
3. **Robotics product names are not real SKUs.** The Master Brief states "Cleanuva R-Series" is a demo seed, and **"NuvaTrack U-Series" and "NuvaSpan" do not exist anywhere in the repo** — "do not present as implemented products." The site presents all three as defined products with spec tables, a Compare page, and pricing. This is the single biggest **honesty risk**.

Everything else (vendor-neutral platform framing, verified-outcome/evidence emphasis, multi-persona Solutions, removed internal jargon, no fabricated proof, no autonomy claims in chrome) is **broadly aligned** — much of it thanks to the V4.1 and trust-policy work.

---

## 2. Overall Alignment Score

**≈ 65% aligned (Moderate).**

- **Foundation & honesty discipline: strong** (no fabricated customers; internal jargon removed; vendor-neutral correctly scoped to the Platform).
- **Brand architecture: weak** (master brand not expressed).
- **Terminology: one major conflict** (AI Copilot).
- **Robotics honesty: at risk** (undefined SKUs presented as products).
- **Messaging/tagline: partially aligned** (concrete "find lost revenue / fix / prove" loop not used).

---

## 3. Major Aligned Areas (keep)

- **Vendor-neutral "works with your existing data"** correctly lives on the Platform page (Master Brief: vendor-neutral applies to the *Platform*, not the brand). ✓
- **Verified outcomes / evidence / proof** emphasis (C2 "Verified recovery"; CSV/Inspection Early Access). ✓
- **Multi-persona Solutions** (5 of the high-value A–E personas) — already broke "O&M-only." ✓
- **Internal-architecture terms removed** (Operational Memory, Grounded Corpus, Compound Moat, LoopRun, Trust Budget, Agent Runtime) — matches Master Brief §15 "don't expose." ✓
- **NETRO Sparkle GmbH** confined to legal/company/footer, not product chrome. ✓
- **No "full autonomy" / production-SaaS / self-service** claims in chrome; Early-Access framing; no-auth boundary. ✓
- **Robotics kept commercially first-class** (top-level nav, product pages) — consistent with "peer pillar," even if the framing needs adjustment (§5). ✓

---

## 4. Major Misaligned Areas (summary)

| # | Area | Priority |
|---|---|---|
| A | Cleanuva presented as ≈ platform, not as master brand with Platform/Robotics/Solutions product lines | **P0/P1** |
| B | Robotics SKUs (NuvaTrack R/U-Series, NuvaSpan) presented as real products with specs | **P0** |
| C | "AI Copilot" deprecated → "Operational Analyst" (pervasive on site) | **P1** |
| D | Core brand sentence + "Find lost solar revenue. Fix it. Prove it." tagline absent | **P1** |
| E | "Cleanuva Solutions = packaged offers" concept absent (site Solutions = role segmentation) | **P2** |
| F | Commercial entries thin — Get Pricing robotics-only; no evidence/pay-per-report, no partner co-sell, no platform pricing | **P2** |
| G | Robots over-claimed as "autonomous / runs itself" for undefined SKUs | **P1** |

---

## 5. Brand Architecture Findings

**BA-1 — Cleanuva is not presented as the master brand. (P0/P1)**
- *Current:* Hero eyebrow "The AI-native operating layer for solar"; Company "Building the operating layer for solar." Cleanuva reads as the software/operating layer. No statement that Cleanuva is a brand spanning Platform / Robotics / Solutions (+ future energy lines).
- *Master Brief:* "Cleanuva is the commercial **master brand** — it is NOT identical to Cleanuva Platform." Platform/Robotics/Solutions are product lines; future storage/energy lines exist.
- *Gap/risk:* The site equates brand with software — the exact error the brief flags ("Cleanuva = Cleanuva Platform → No"). Under-frames Robotics and Solutions as peer pillars; locks the brand into "solar O&M software."
- *Correction:* Add master-brand framing in copy (Homepage + Company): "Cleanuva is a clean-energy technology brand…"; introduce the three product-line names (Cleanuva Platform / Cleanuva Robotics / Cleanuva Solutions) as the brand's pillars. Messaging only — no IA change required.
- *Affected:* `Hero`, `Company.*`, `OperatingModel`, footer tagline.
- *Priority:* **P1** (P0 for any investor/partner-facing launch).

**BA-2 — Robotics under-positioned as "one execution layer, not the identity." (P1)**
- *Current:* positioning-v1 + homepage frame robotics as "a connected execution layer," "one layer, not the identity," platform-first/robotics-second.
- *Master Brief:* Robotics is a **peer business pillar** *and* the **flagship first-party execution adapter** — dual identity; "equal business capabilities under the master brand" (platform is center of gravity, robotics is not subordinate).
- *Gap:* "second / not the identity" subtly demotes a peer revenue pillar.
- *Correction:* Reframe to "peer product line + flagship execution adapter"; keep platform as strategic center, but present Robotics as a co-equal commercial pillar, not a sub-feature of the platform story.
- *Affected:* `ConnectedExecution`, `Robotics` overview, `Company.vision.pillars.robotics`.
- *Priority:* **P1.**

**BA-3 — "Cleanuva Solutions" (packaging layer) is absent. (P2)** — see §7 Solutions and §9 Business Model.

**BA-4 — NETRO Sparkle GmbH placement: aligned. (P3)** Confined to legal pages, the Company "company behind Cleanuva" block, footer seam, and a trust signal — all legal/company context, not product chrome. Keep it out of product *feature* copy. No change needed.

---

## 6. Messaging / Tagline Findings

**MSG-1 — Core brand sentence missing. (P1)**
- *Current:* No "Cleanuva is a clean-energy technology brand…" statement anywhere.
- *Master Brief:* provides the verbatim Brand/Platform/Robotics/Solutions sentences (§14) to use where possible.
- *Correction:* Place the Brand sentence on Homepage and/or Company; the Platform/Robotics/Solutions sentences on their respective pages.
- *Affected:* `Hero`/`Company`, `Platform.Hero`, `Robotics.Hero`, Solutions.
- *Priority:* **P1.**

**MSG-2 — Tagline not aligned. (P1)**
- *Current:* Homepage hero triad "It unifies the fragments / coordinates the work / runs the operation" — abstract; Master Brief tagline absent.
- *Master Brief:* **"Find lost solar revenue. Fix it. Prove it."** (发现损失 · 推动处理 · 证明收益) — concrete, commercial, maps to the loop.
- *Gap:* The current hero is less commercially direct and doesn't lead with *recovered revenue / proof*.
- *Correction:* Consider adopting the brief's tagline (founder decision — Hero is currently frozen). At minimum align the homepage/CTA language toward "lost revenue → fix → prove."
- *Affected:* `Hero` (frozen — founder decision), `FinalCta`, meta.
- *Priority:* **P1** (gated by the Hero-frozen decision).

**MSG-3 — Platform sentence ~aligned. (P2)** The site's "AI-native operating layer for solar" + C2 "verified recovery" is close to the Master Brief Platform sentence; tighten toward "sits above existing monitoring, finds lost revenue, drives action, verifies results, produces evidence."

**MSG-4 — Loop wording differs. (P2)** Site uses "Intelligence → Coordination → Accountability" + "Execute → Verify." Master Brief customer loop = **Connect → Understand → Decide → Act → Verify → Prove.** Consider aligning the loop labels for a consistent demo narrative (§ Demo).

---

## 7. Page-by-Page Findings

| Page | Current state | Master Brief requirement | Gap / risk | Recommended correction | Priority |
|---|---|---|---|---|---|
| **Homepage** | Platform-narrative-led; "operating layer for solar"; AI-Copilot section; abstract hero triad; robotics as "one execution layer." | Master-brand statement; tagline "find lost revenue/fix/prove"; Platform+Robotics as peer pillars; Operational Analyst (not Copilot). | Reads like a SaaS-platform site, not a master brand; uses deprecated "AI Copilot." | Add brand sentence + pillars; reframe robotics as peer pillar; rename Copilot. | **P1** |
| **Platform** | Strong: Works-With-Your-Data, verified recovery, "AI Copilot" section, capabilities, Early-Access CSV/PDF. | "Cleanuva Platform is the AI-native operations layer…finds lost revenue, drives action, verifies, produces evidence"; Operational Analyst; honest stage. | "AI Copilot" deprecated; ensure no implied finished report export / production SaaS. | Rename Copilot→Operational Analyst; keep Early-Access honesty; align Platform sentence. | **P1** |
| **Robotics** | NuvaTrack R/U-Series + NuvaSpan as defined products: spec tables, metrics, Compare, Get Pricing; "Cleaning that runs itself," "Full autonomy." | Names are proposed/undefined; "do not present as implemented products"; robots are decision-support-dispatched, no real auto-dispatch. | **Overclaim:** undefined SKUs sold as real; autonomy overstated. | Add "proposed product family" honesty framing or reduce spec specificity; soften autonomy to platform-dispatched/human-approved. | **P0** |
| **Solutions** | 5 role tiles (A/C/B/E/D personas) — role segmentation. | "Cleanuva Solutions = packaged commercial offers (platform+robotics+integration)." | Conceptual mismatch: "who it's for" vs "packaged offers"; channel/partner/investor absent. | Either keep as audience segmentation **and** add a "packaged solutions" notion, or reframe; founder decision. | **P2** |
| **Resources** | Platform/Robotics overviews + Coming-soon brochures/ROI/insights. | Evidence/report assets matter (D persona); honest "coming soon." | No evidence-report/pay-per-report hook. | Optional: add an "evidence/audit report" resource (Early Access). | **P2/P3** |
| **Company** | Operator/German/solar; vision pillars Platform/Copilot/Robotics; Trust; Legal. | Master brand + product lines; Operational Analyst; future energy breadth. | "operating layer" framing; "Copilot" pillar; solar-only lock. | Reframe pillars to Platform/Robotics/Solutions; rename Copilot; hint future energy lines. | **P1** |
| **Request Demo** | Lead-gen; roles = 5 personas (post-C4). | Platform demo lead; multi-persona; could add investor/partner. | Mostly aligned; missing partner/investor/auditor-report intent. | Keep; optionally add partner/investor + "request an evidence report" intent. | **P2** |
| **Get Pricing** | Robotics config→RFQ only. | Many models (SaaS, robot, bundle, pay-per-report, solutions, partner). | Commercial surface = robotics-only; no platform/solutions/evidence path. | Add platform/solutions/evidence commercial entries (founder decision). | **P2** |
| **Legal/Footer/Nav** | NETRO Sparkle in legal/footer; nav Platform/Robotics/Solutions/Resources/Company; footer "AI Copilot" label. | Legal entity legal-only (aligned); Operational Analyst (not Copilot); brand architecture. | Footer/nav still say "AI Copilot"; no brand-architecture seam. | Rename Copilot labels; consider a brand-architecture line. | **P1** |

---

## 8. Persona / Customer-Role Findings

**PER-1 — Core personas present; channel/strategic absent. (P2)**
- *Current:* Solutions + Request Demo cover **Self-operated Owner (A) · Independent O&M (C) · Financial Owner/IPP (B) · EPC (E) · Technical Auditor (D)** — the 5 customer-facing A–E personas.
- *Master Brief:* 10 roles; the additional ones (cleaning company, robotics operator, distributor/partner, internal admin, strategic investor) are supporting/channel/internal.
- *Gap:* High-value **distributor/partner co-sell** and **strategic investor** stories are absent; cleaning company / robotics operator (execution-side) not represented.
- *Correction:* Keep the 5 core personas; consider adding a **partner/co-sell** entry (ties to Cleanuva Solutions) and an **investor** narrative (master-brand + pillars). Internal admin correctly omitted.
- *Priority:* **P2.**

**PER-2 — WTP/priority. (P3)** Site leads Solutions with A+C (adoption wedge) — consistent with the brief's "lead adoption with A+C." The brief warns "don't anchor pricing on C"; the site shows no pricing on C, so no conflict. Aligned; no change.

**PER-3 — Request Demo roles. (Aligned)** Post-C4 role options match the 5 personas. Optionally add Partner/Investor.

---

## 9. Business Model Findings

**BM-1 — Commercial surface is robotics-pricing-centric. (P2)**
- *Current:* Get Pricing = robotics config→RFQ. Request Demo = platform lead. No other commercial path.
- *Master Brief §6:* 10 models — SaaS subscription, private/hybrid deployment, project/EPC bundle, robot sales/leasing, **robot+software bundle**, O&M enablement, **distributor/partner**, **data/AI/evidence premium (pay-per-report)**, paid pilot.
- *Gap:* No platform SaaS pricing path, no **evidence/pay-per-report** entry (the D persona's high-margin hook), no **partner co-sell / Solutions packaging** entry, no robot+software bundle framing.
- *Correction (founder decision):* Add (a) a clearer 3-way commercial split — **Platform demo / Robotics pricing / Solutions package** — and (b) an evidence/report (pay-per-report) entry. No prices exist yet (brief §17), so keep these as "request" flows, not published prices.
- *Affected:* `Get Pricing`, `Request Demo`, Solutions, nav CTAs.
- *Priority:* **P2.**

**BM-2 — No "Cleanuva Solutions" packaging / co-sell expression. (P2)** See BA-3 / §7 Solutions.

**BM-3 — Honesty on pricing. (Aligned)** The site shows **no published prices** (RFQ/quote only) — consistent with "no transactable prices exist yet." Keep it that way.

---

## 10. Terminology Findings

**TERM-1 — "AI Copilot" deprecated → "Operational Analyst." (P1, pervasive)**
- *Current:* "Copilot" ~20× in en/de messages, 15× zh; `ai-copilot.tsx`, `copilot.ts`, the AiCopilot homepage+platform sections, nav/footer labels ("AI Copilot"), Platform hero diagnosis card "AI Copilot." **"Operational Analyst" = 0 occurrences.**
- *Master Brief §15:* **"AI Copilot → Deprecated → Operational Analyst. Do not use 'AI Copilot' in new UI."**
- *Gap/risk:* Direct terminology conflict — and a conflict with the **just-completed V4.1 content update**, which deliberately built the differentiator copy around "AI Copilot."
- *Correction:* Rename "AI Copilot" → "Operational Analyst" across copy, the `Copilot` namespace, `copilot.ts`, the `ai-copilot.tsx` component, and nav/footer labels. Keep the *concept* (grounded, source-cited, human-in-the-loop) — only the name changes. **Phasing recommended** (it's pervasive and 4-locale).
- *Affected:* `Copilot.*` (4 locales), `ai-copilot.tsx`, `copilot.ts`, `Nav`/`Footer.links`, `Platform.Hero.diag`, Company vision pillar.
- *Priority:* **P1** (high — but a deliberate, sequenced rename, not a scramble).

**TERM-2 — Internal-architecture terms: aligned. (no action)** Operational Memory, Grounded Corpus, Compound Moat, LoopRun, Trust Budget, Agent Runtime are **absent from rendered copy** (removed in V4.1). Matches Master Brief §15. Keep them out.

**TERM-3 — Minor deprecated-string check. (P2/P3)** "AI Diagnosis" (Platform capability item) — Master Brief prefers plain "Alarm Analysis" / drop "AI" prefixes ("AI Recommendations → Recommendations," "AI Economic Intelligence → Economic Impact"). The site mostly avoids these, but a sweep for "AI <X>" prefixes is worth it during the rename. "Command Center" is correctly used (replaces "Big Screen"). 

---

## 11. Overclaim / Honesty-Risk Findings

**OC-1 — Robotics SKUs presented as real products. (P0)** — see §12 (the primary risk).

**OC-2 — Robot autonomy overstated. (P1)**
- *Current:* Robotics overview "Cleaning that runs itself"; U-Series "Full autonomy / Autonomous"; "unmanned."
- *Master Brief:* zero autonomous execution in production; no real auto-dispatch; robots are platform-dispatched with human approval.
- *Gap:* "runs itself / full autonomy" for undefined products overstates both autonomy and product readiness.
- *Correction:* Soften to "platform-dispatched, human-approved cleaning"; reserve "autonomous" claims until real.
- *Affected:* `Robotics.*`, `robots.ts` spec values ("Autonomous", "Full").
- *Priority:* **P1.**

**OC-3 — Don't imply finished report export. (P2)**
- *Master Brief:* report export disabled (preview/session-only).
- *Current:* C2 "verified recovery" is illustrative; CSV/PDF is Early Access (honest). No explicit "download report" promise found.
- *Correction:* Keep evidence/report framing as Early Access / illustrative; avoid implying exportable production reports.
- *Priority:* **P2.**

**OC-4 — Drone/Thermal/Defect: aligned. (no action)** After the F5 fix these are partner-/connected-fed and roadmap-framed — consistent with Reserved status. Keep.

**OC-5 — "Operating platform" maturity tone. (P2)** "operating layer/operations platform" can imply mature SaaS. Mitigated by no self-service/login, Early-Access framing, no-auth boundary. Keep the Commercial-Foundation honesty; avoid "production-grade / fully deployed" language.

---

## 12. Robotics Naming / SKU Risk Findings

**RSKU-1 — NuvaTrack R/U-Series and NuvaSpan presented as defined products. (P0 — top honesty risk)**
- *Current:* `robots.ts` defines 3 families with slugs, names (NuvaTrack R-Series, NuvaTrack U-Series, NuvaSpan), headline metrics (e.g. "1.2 MWp/day", "99.2% uptime", "2.8 MWp/night"), full spec tables, 3 product pages, a Compare page, and `Get Pricing` per model. Names appear 4× (R) / 3× (U) / 8× (NuvaSpan) in en copy alone.
- *Master Brief §11:* "Cleanuva R-Series" = demo/seed only; **"NuvaTrack U-Series" and "NuvaSpan" do not exist anywhere in the repo**; "NuvaTrack R-Series" is a mix of inconsistent fixtures. **"Do not present them as implemented products"**; treat as *proposed marketing family names* until formally defined (specs, SKUs).
- *Gap/risk:* The site presents undefined/nonexistent SKUs with concrete specs and pricing — an honesty, and potentially commercial/legal, exposure (selling specs for products with no defined SKU).
- *Correction (founder decision):* Options — (a) **Honesty framing:** keep the names but label the range as a *proposed/forthcoming product family* and soften the spec precision to "target/indicative"; (b) **De-spec:** keep the product pages but remove hard performance numbers until defined; (c) **Consolidate:** present "Cleanuva Robotics" confidently (real business line) and treat individual series as "coming" until SKUs are locked.
- *Affected:* `robots.ts`, `Robotics.*`, robotics product pages, Compare, Get Pricing, robotics nav/teasers.
- *Priority:* **P0.**

---

## 13. Prioritized Recommended Fixes

**P0 — before launch**
1. **RSKU-1 / OC-1:** stop presenting NuvaTrack R/U-Series + NuvaSpan as defined products with hard specs/pricing — add honesty framing or de-spec until SKUs are formally defined. *(robotics pages, robots.ts, Get Pricing)*
2. **BA-1 (launch-critical for partner/investor):** introduce master-brand framing (Cleanuva = brand; Platform/Robotics/Solutions = pillars). *(Homepage, Company)*

**P1 — important positioning**
3. **TERM-1:** rename "AI Copilot" → "Operational Analyst" across copy/components/nav/footer (phased, 4-locale). *(Copilot namespace, ai-copilot.tsx, copilot.ts, nav, footer)*
4. **BA-2:** reframe Robotics as a peer business pillar + flagship execution adapter (not "one layer / second"). *(ConnectedExecution, Robotics, Company)*
5. **MSG-1/MSG-2:** add the core brand sentence; adopt/align toward "Find lost solar revenue. Fix it. Prove it." *(Homepage — Hero frozen, founder call; Company; CTAs)*
6. **OC-2:** soften robot "full autonomy / runs itself" to platform-dispatched + human-approved. *(Robotics, robots.ts)*

**P2 — useful**
7. **BM-1/BM-2:** broaden the commercial surface — Platform demo / Robotics pricing / Solutions package split; add an evidence/pay-per-report entry; add partner co-sell. *(Get Pricing, Solutions, Request Demo, nav)*
8. **MSG-4:** align the loop labels to Connect → Understand → Decide → Act → Verify → Prove. *(OperatingModel, Loop, IntelArc)*
9. **PER-1:** add partner/co-sell + investor narratives. *(Solutions/Company)*
10. **TERM-3:** sweep "AI <X>" prefixes during the rename. *(Platform capabilities, footer)*

**P3 — polish**
11. Hint future energy lines (don't lock brand to solar-only). *(Company/brand copy)*
12. Optional evidence/report resource on Resources.

---

## 14. What Should NOT Be Changed

- **No fabricated customers/logos/case studies/certs** — trust policy stays; aligns with brief's honesty rules.
- **No-auth marketing boundary** — keep; matches "not customer self-service yet."
- **Internal-architecture terms stay removed** — Operational Memory, Grounded Corpus, Compound Moat, LoopRun, Trust Budget, Agent Runtime: keep out of customer copy (Master Brief §15 agrees). **Do NOT "restore" the deleted internal-architecture content** — what's missing is *brand/commercial* framing (master brand, product lines), not technical internals.
- **NETRO Sparkle GmbH placement** — keep legal/company/footer only; do not move into product chrome.
- **Vendor-neutral wording on the Platform page** — correct scope; keep (do not apply it to the whole brand or to Robotics).
- **Site IA / navigation / page structure / funnels / image wiring** — no structural change required by this audit; all findings are copy/positioning/commercial-entry level.
- **Solar focus for now** — acceptable as the current beachhead; just avoid locking the brand into "solar-only forever."

---

## 15. Questions Requiring Founder Decision

1. **AI Copilot → Operational Analyst:** rename now (pervasive, undoes part of the V4.1 "AI Copilot" content work) or phase it? Any brand-equity attachment to "Copilot"?
2. **Robotics SKUs:** which option for NuvaTrack/NuvaSpan — honesty-framed "proposed family," de-spec, or consolidate to "Cleanuva Robotics" + "series coming"? Keep the Compare page and per-model Get Pricing or pause them until SKUs are defined?
3. **Master-brand framing:** how prominently to introduce "Cleanuva = master brand; Platform/Robotics/Solutions = pillars" (messaging only, no IA change)?
4. **Tagline:** adopt "Find lost solar revenue. Fix it. Prove it."? (Requires unfreezing the Hero.)
5. **Robotics positioning:** move from "platform-first / robotics-second / one execution layer" to "master brand + peer product lines (platform = center of gravity, robotics = peer pillar + flagship adapter)" — confirm.
6. **Solutions page:** keep as audience/role segmentation, or reframe/add "Cleanuva Solutions = packaged commercial offers"? 
7. **Commercial entries:** add evidence/pay-per-report (D persona) and partner co-sell (Solutions) entries now, or defer until pricing exists?
8. **Scope breadth:** hint future energy/storage lines in brand copy, or stay solar-only for the current phase?
9. **Persona priority / beachhead:** the brief leaves A+C (adoption) vs A+B (paid) open — the site should follow whatever you lock.

---

*End of audit. Read-only — no code or content changed. The Master Brief is treated as the positioning authority; technical-contract questions (if any) defer to the technical SSOTs per Master Brief §16.*
