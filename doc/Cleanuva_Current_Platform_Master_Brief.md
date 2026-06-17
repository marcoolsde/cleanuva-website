---
title: Cleanuva Current Platform Master Brief
status: current — business positioning authority
date: 2026-06-16
supersedes_for_positioning:
  - docs/90_reports/Cleanuva_Master_Product_Brief.md (2026-06-14) — folded in, kept as historical
  - "O&M-Provider-as-sole-primary-buyer" framing in AI_CONTEXT.md §2 and frontend_ssot_v4 Ch.16 (see §16)
authority_scope: >
  Current reference for BUSINESS POSITIONING, personas, commercial model, demo narrative,
  and terminology intent. Does NOT override technical contracts (domain model, DB schema,
  API spec, runtime). Where this brief and a technical SSOT disagree on a CONTRACT, the
  technical SSOT wins and the conflict must be reported (see §16).
basis:
  - AI_CONTEXT.md (master-brand + curtailment + adapter ecosystem anchor)
  - docs/90_reports/pv_om_platform_commercial_strategy_report.md (status: current, commercial authority)
  - docs/05_execution/Cleanuva_V4_Architecture_Correction_and_Execution_Plan.md (V4.1, 2026-06-14)
  - docs/90_reports/Cleanuva_PRD_Core_Strategy_v4_up_EN.md / _CN.md (A–E persona model)
  - docs/90_reports/Cleanuva_D2_Commercial_Reality_And_Moat_Audit.md (WTP reality)
  - docs/95_audit/Cleanuva_V4_1_Product_Experience_Commercial_Readiness_Audit.md (UX reality)
  - Live codebase verification (frontend Next.js 15 / backend NestJS 11 / Prisma / TimescaleDB)
companion: docs/95_audit/Cleanuva_Documentation_Conflict_and_Authority_Audit.md
language: English primary, with 中文 notes; full 中文创始人摘要 at the end.
---

# Cleanuva — Current Platform Master Brief & Documentation Authority Reset

> **Purpose.** One current, internally consistent reference that explains what Cleanuva *is today*, who it is for, how the platform and robotics relate, what it can and cannot do, and how to talk about it — for founder briefing, partner/investor conversations, internal training, website/PPT copy, exhibition explanation, demo scripts, and future AI-agent (Claude / Cursor / Codex) tasks.
>
> **Why this exists.** A recent commercial-readiness audit treated an older V4 document as current authority and stated the platform's primary commercial buyer is the independent O&M Provider. That is **outdated**. The current positioning is broader and integrated. This brief resets the business authority and records the conflict transparently (see §16 and the companion authority audit).

---

## 0. Authority Note — read before citing this document

There are **two parallel "V4" documentation lineages** in this repository, and they disagree about the primary buyer:

- **Lineage 1 — Frozen SSOT (2026-06-12):** `frontend_ssot_v4.md` (via phases V4-A → V4-D). Declares **"O&M Provider is the single primary commercial buyer."** CLAUDE.md and AI_CONTEXT.md currently enforce this.
- **Lineage 2 — Later commercial correction (2026-06-14, partly authoritative):** the V4.1 Architecture Correction & Execution Plan, the PRD Core Strategy "v4-up", the D2 Commercial Reality Audit, and `commercial_strategy_report.md` (marked `status: current`). These **break "O&M-Provider centralism"** and establish a multi-persona model.

**This brief adopts Lineage 2** as the current business positioning, because it is (a) more recent, (b) already partly authoritative (`commercial_strategy_report.md` supersedes its own v1 and explicitly removes the "owner-as-secondary" assumption), and (c) directly confirmed by founder direction (2026-06-16). The technical loop, primitives, and adapter model from Lineage 1 remain valid — only the **single-primary-buyer claim** is superseded. Full conflict detail: companion *Documentation Conflict & Authority Audit*.

中文：仓库里存在两条"V4"文档线，对"谁是主要买家"结论相反。本文件采用较新的、且部分已具权威性的"多角色"定位（Lineage 2），不再把"独立运维商"当作唯一主要买家。技术回路与机器人适配器模型仍然有效。

---

## Brand Architecture

> **Read this first.** *Cleanuva is the commercial **master brand** — it is NOT identical to Cleanuva Platform.* The software platform is one product line under the brand. Do not conflate brand, software platform, robotics product line, solution packaging, and legal entity.

```text
NETRO Sparkle GmbH                      ← legal entity (contracts, invoices, Impressum, VAT)
  └── Cleanuva                          ← commercial master brand (clean-energy technology brand)
        ├── Cleanuva Platform           ← the AI-native energy asset operations platform (software)
        ├── Cleanuva Robotics           ← robot product line + flagship first-party execution adapter
        ├── Cleanuva Solutions          ← solution packaging / project delivery / integration / consulting
        └── Future: Storage / Energy Management / Hybrid Energy Solutions
```

| Layer | Definition | Customer-facing? |
|---|---|---|
| **NETRO Sparkle GmbH** | The **legal company entity** — contracts, invoices, legal pages, Impressum, VAT, company registration, formal legal documents. | **Legal/financial only.** Not the product brand in customer-facing product UI. |
| **Cleanuva** | The **commercial master brand** — a clean-energy technology brand focused on AI-enabled solar and energy asset operations, robotics, field execution, verification, and future energy solutions. **Broader than the software platform.** | Yes — master brand. |
| **Cleanuva Platform** | The **AI-native energy asset operations platform** (the software product line). Sits above existing monitoring/data sources; connects data, analyzes problems, recommends actions, supports work orders / robot execution, verifies outcomes, generates proof/evidence. **Vendor-neutral · additive · AI-native · operations + verification/evidence + data/decision layer.** | Yes — product line. |
| **Cleanuva Robotics** | The **robotics product line** — Cleanuva's solar-cleaning robot business and future robot execution products. In the platform architecture it is the **flagship first-party execution adapter**; commercially a **peer business pillar** under the brand. **First-party hardware** (not vendor-neutral). | Yes — product line. |
| **Cleanuva Solutions** | The **solution packaging / project delivery / integration / consulting / bundled offering** layer (e.g. platform + robotics package, O&M solution, cleaning solution, EPC/partner package, industrial solar asset solution, future storage / energy-management packages). A **commercial packaging layer, not necessarily a separate implemented software module.** | Yes — commercial offer. |
| **Future lines** | Energy storage, energy management, hybrid solar + storage, broader renewable-energy operations, other clean-energy products/services. **Do not lock the master brand into "PV O&M platform only."** | Roadmap. |

**Core brand sentences (use verbatim where possible):**
- **Brand:** *Cleanuva is a clean-energy technology brand building AI-native solar and energy asset operations solutions — combining software, robotics, field execution, verification, and future energy solutions under one brand.*
- **Platform:** *Cleanuva Platform is the AI-native operations layer for solar and energy assets — it sits above existing monitoring, finds lost revenue, drives action, verifies results, and produces evidence.*
- **Robotics:** *Cleanuva Robotics is the first-party robot product line and the flagship execution adapter for the Cleanuva Platform.*
- **Solutions:** *Cleanuva Solutions packages the platform, robotics, integration, and field execution capabilities into customer-specific commercial solutions.*

中文：**Cleanuva 是商业母品牌，不等于 Cleanuva Platform（软件平台）。** 母品牌之下有 Cleanuva Platform（软件）、Cleanuva Robotics（机器人产品线 / 旗舰首个执行适配器）、Cleanuva Solutions（方案打包 / 集成 / 交付）以及未来的储能 / 能源管理 / 混合能源等业务线；**NETRO Sparkle GmbH 仅为法律实体**。"厂商中立"只用于描述 Cleanuva Platform 的数据/集成/软件层，不可用于整个母品牌（因为 Cleanuva Robotics 是第一方硬件）。

---

## 1. Executive Summary

**One-sentence positioning — Brand (external):**
> **Cleanuva is a clean-energy technology brand building AI-native solar and energy asset operations solutions — combining software, robotics, field execution, verification, and future energy solutions under one brand.**

**One-sentence positioning — Platform (the software product line):**
> **Cleanuva Platform is the AI-native operations layer for solar and energy assets — it sits above existing monitoring, finds lost revenue, drives action, verifies results, and produces evidence.**

中文一句话（品牌）：**Cleanuva 是清洁能源科技母品牌，在同一品牌下整合软件、机器人、现场执行、验证与未来能源方案。**
中文一句话（平台）：**Cleanuva Platform 是面向光伏与能源资产的 AI 原生运维层——叠加在现有监控之上，发现损失、推动处理、验证结果、产出证据。**

**One-paragraph positioning.**
**Cleanuva** is the **commercial master brand** — a clean-energy technology brand spanning multiple product lines under **NETRO Sparkle GmbH** (the legal entity). Its current pillars are **Cleanuva Platform** (the AI-native energy asset operations **software** — vendor-neutral and additive above existing monitoring such as Solarman, Huawei FusionSolar, SMA, CSV), **Cleanuva Robotics** (the first-party solar-cleaning robot line, which is also the platform's *flagship first execution adapter*), and **Cleanuva Solutions** (solution packaging / delivery / integration), with room for future **Storage / Energy Management / Hybrid Energy** lines. The platform's differentiator is **closing the loop**: Connect → Understand → Decide → Act → Verify → Prove. The commercial target is **not a single buyer**; Cleanuva serves a set of personas (asset owners/operators, O&M providers, EPC, cleaning companies, robotics operators, distributors, auditors/investors), each with a distinct role, value proposition, and demo path.

**Current product stage.** **Cleanuva Platform** is in a **Commercial Foundation / Demo-Ready Foundation** stage — a real, runnable full stack (frontend + backend + database + working modules + adapters), **demo-capable with curation**, but **not yet production SaaS, not yet customer self-service**, and currently leaning on demo/fixture data for several flows; its engineering priority is **Block 1 — Real Data Integration Readiness**. **Cleanuva Robotics** is a parallel business/product line whose external product naming and SKU structure still need formal definition. **Cleanuva Solutions** is a commercial packaging layer, not necessarily a separate implemented software module. **The Cleanuva brand is broader than the current software repository.**

**Core value proposition (Platform).** Turn silent solar revenue loss into **diagnosed → actioned → verified → proven** outcomes, with vendor-neutral integration and an execution-adapter ecosystem (robots being the flagship).

**Software ↔ robotics relationship.** Peer business lines under one brand. The platform is the strategic center of gravity; **robotics is the most differentiated, fully-closed proof of the loop, and a real hardware revenue line — but the platform produces value with or without robots** (the "curtailment test").

**Intended commercial direction.** Multi-persona market entry through the **loop-inhabiting operators** (self-operated owners + O&M providers) for adoption and demos, while pursuing the **higher-willingness-to-pay** audit/financial-owner plays for revenue — with pricing, beachhead, and final persona priority still to be locked by the founder.

---

## 2. What Cleanuva Is (plain language)

**Cleanuva is the master brand.** Under it sit the product/business lines:

- **Cleanuva Platform** — the AI-native operations **software**: it connects to a solar/energy plant's existing data, uses AI to detect and explain problems (soiling, underperformance, faults), recommends the most economically valuable action with an ROI estimate, turns the decision into trackable field work, and verifies whether the action actually recovered performance/revenue.
- **Cleanuva Robotics** — Cleanuva's own solar-cleaning robots (first-party hardware). In platform terms they are the **flagship first execution adapter**: when the platform decides "this plant should be cleaned," a Cleanuva robot (or a human crew, or a partner system) carries it out, and the platform measures the before/after result.
- **Cleanuva Solutions** — the **commercial packaging / delivery** layer: bundles platform + robotics + integration + field execution into customer-specific offers (O&M solution, cleaning solution, EPC/partner package, industrial asset solution, future storage/energy-management packages). Not necessarily a separate implemented software module.
- **Future lines** — storage, energy management, hybrid solar + storage, broader renewable-energy operations.

**Inside Cleanuva Platform**, the value is delivered as connected layers:
- **AI-native O&M layer** — the "understand + decide" brain: root-cause analysis, operational summaries, recommendation explanations, economic-impact ranking, fleet risk, and a conversational **Operational Analyst** ("why did generation drop today?").
- **Execution layer** — the "act" layer: work orders, cleaning tasks, robot dispatch, routed through a **pluggable adapter ecosystem** (Cleanuva Robotics first-party today; partner/standard/customer adapters over time).
- **Verification / proof layer** — the "prove it" layer: before/after comparison, outcome validation, ROI, and **evidence packages / reports** for the customer and external stakeholders.

**Why these belong together.** Monitoring alone tells you *something is wrong*. Robots alone *clean on a schedule*. The brand's value is the **connected loop** — the only way to honestly say *"we found the loss, we fixed it, and here is the recovered money, proven."* **Cleanuva Robotics** makes that loop physically complete and demonstrable; **Cleanuva Platform** makes it intelligent, vendor-neutral, and scalable; **Cleanuva Solutions** packages it for each customer.

---

## 3. What Cleanuva Is Not

| Mislabel | Reality |
|---|---|
| Just another monitoring dashboard | No — monitoring shows data; Cleanuva diagnoses, acts, verifies, and proves ROI on top of monitoring. |
| Just a robot vendor | No — robots are *one* execution option; the platform produces value with zero robots (curtailment test). |
| Just a ticketing / CMMS system | No — AI generates and explains the work, ranks it by money, and verifies the outcome. |
| A SCADA / real-time control replacement | No — Cleanuva Platform is the value/intelligence layer above infrastructure; it does not run grid-critical real-time control. |
| Cleanuva = Cleanuva Platform | **No** — Cleanuva is the master brand; the platform is one product line (alongside Robotics and Solutions). Do not equate the brand with the software. |
| A generic AI chatbot | No — the Operational Analyst is grounded in plant data, evidence, and the loop, not open-ended chat. |
| A fully autonomous SaaS product | **Not yet** — every action requires human approval today; **zero autonomous actions execute** in production. |
| Only for independent O&M providers | **No — this is the key correction.** O&M providers are one important persona, not the whole business. |
| A finished, self-service commercial SaaS | Not yet — it is a Commercial Foundation baseline that needs productization, real-data hardening, and an export/proof layer before pilot/self-serve. |

---

## 4. Latest Commercial Positioning

**Main commercial thesis.** Solar assets lose real money silently — soiling, drift, faults, slow response — and the tools owners already have (monitoring portals) **show the symptom but never close the loop**. **Cleanuva Platform** is the **vendor-neutral operations-and-evidence layer** that converts that loss into diagnosed, actioned, **verified and proven** recovery; **Cleanuva Robotics** and **Cleanuva Solutions** extend that into first-party execution and packaged delivery. The defensible position is **inhabiting the daily operating loop** and **owning the proof** (verified outcomes + evidence), not any single feature.

**Customer pain points.**
- Monitoring overload: many alarms, little prioritized, money-ranked action.
- No trustworthy root-cause + recommended action in plain language.
- No proof that an intervention (e.g. cleaning) actually paid off.
- O&M margins squeezed; owners/investors want auditable performance and ROI.
- Multiple vendor monitoring stacks; no neutral layer that spans them.

**Why the market needs this now.** Falling tariffs and tighter asset economics make **recovered revenue and provable O&M ROI** a board-level concern; AI now makes credible root-cause + economic reasoning feasible on top of existing telemetry without ripping out infrastructure.

**Where Cleanuva enters first.** Through the **loop-inhabiting operators** — self-operated industrial owners and O&M providers who would use it daily (best adoption + best demos) — while pursuing **higher-WTP** financial-owner/audit use cases for revenue. (See §5 and the honest WTP note.)

**Why platform + robotics is strategically important.** Robotics gives Cleanuva (a) a **physically complete, undeniable demo** of the loop, (b) a **real hardware revenue line**, and (c) a **differentiator no software-only competitor has** — while the platform's vendor-neutral, adapter-based design keeps Cleanuva from being "just a robot company" and lets it create value even where robots are irrelevant.

**Why evidence / verification / ROI matters.** It is both the **customer trust mechanism** (prove the money) and the **moat substrate** — accumulated verified outcomes (Operational Memory → Corpus) compound into intelligence and switching cost over time. *(Honesty rule: the network-effect moat is a destination, not a present-tense claim — do not pitch it as already built.)*

---

## 5. Customer Personas

> **Critical rule:** Do **not** present "independent O&M provider" as the sole or automatically primary buyer. Treat it as **one important persona** among several. The model below is the A–E framework from the current commercial lineage, plus operational/channel roles.

| Persona | Role (buyer/user/beneficiary/channel) | Pain Point | Cleanuva Value | Who Pays | Who Uses | Demo Angle | Priority |
|---|---|---|---|---|---|---|---|
| **1. PV asset owner / investor** (incl. financial owner / IPP / fund — "B") | Buyer + beneficiary | Underperformance, weak auditable proof, ROI accountability | Provable recovered revenue + independent evidence/audit | Owner / fund | Asset/portfolio manager | Economic Impact → evidence/ROI report | **High-WTP** (revenue play) |
| **2. PV plant operator / self-operated industrial owner ("A")** | Buyer + daily user + beneficiary | Drowning in alarms; no money-ranked action; staff scarce | Closed loop run daily; fewer people, more recovered yield | Owner-operator | O&M manager, engineers | Alarm Analysis → act → verify | **Tier-1 wedge** (adoption + revenue) |
| **3. Independent O&M service provider ("C")** | Buyer + daily user (on behalf of owners) | Thin margins, manual triage, must prove value to clients | Productivity + client-facing proof of work and ROI | O&M firm (seat/tier) | O&M managers, technicians | Multi-site loop + client evidence | **Tier-1 wedge for adoption / demos — but weakest payer; do not anchor pricing on C** |
| **4. EPC / project delivery party ("E")** | Channel + implementation partner | Needs differentiated handover + post-build value | Bundled/white-label loop in project delivery | Project CapEx bundle | Project + handover teams | Project bundle / white-label | Channel (lumpy, high ACV) |
| **5. Cleaning service company** | Daily user + beneficiary | Justify cleaning ROI, schedule by need not calendar | Soiling-driven dispatch + proven cleaning effectiveness | Cleaning firm / pass-through | Cleaning ops | Soiling → clean → before/after PR | Supporting / execution-side |
| **6. Robotics operator** | Daily user + beneficiary | Fleet utilization, dispatch, demonstrate value | Robot fleet ops integrated with the decision loop | Robot owner/operator | Fleet operators | Robot Operations + dispatch + ROI | Supporting (robotics pillar) |
| **7. Distributor / local partner** | Channel partner | Needs a repeatable, self-runnable demo + local motion | Packaged demo + co-sell of platform + robots | (resells) | Partner sales | Curated guided demo path | Channel enablement |
| **8. Internal platform operator / admin** | Internal user | Onboard tenants, integrations, data quality | Admin, integration, data-quality tooling | (internal) | Platform/integration team | Not customer-facing | Internal only |
| **9. Technical auditor / TDD ("D")** | Episodic buyer + beneficiary | One-off due-diligence, needs exportable proof | Pay-per-report, high-margin evidence export | Per-report | Auditor | Evidence/report export | **High-margin, episodic hook** |
| **10. Strategic partner / investor** | Capital / strategic | Wants defensible category + moat trajectory | Platform + robotics + verified-outcome compounding | (invests) | — | 5-min investor story (§13) | Strategic |

**Role clarifications (do not conflate):**
- **Buyer** = signs/pays (owner, O&M firm, fund, EPC bundle, per-report auditor).
- **Daily user** = lives in the loop (O&M managers, engineers, plant/robot/cleaning operators).
- **Beneficiary** = gets the financial upside (owners/investors, and operators via margin).
- **Channel partner** = resells/co-sells (distributors, EPC).
- **Implementation partner** = deploys/integrates (EPC, internal platform team).

**Honest WTP reality (from the D2 commercial audit — do not ignore):** the **loop-inhabiting operators (A, C) demo best but are the hardest to get paid by**; **C (O&M providers) is the weakest payer**. Willingness-to-pay ranks roughly **B → A → E → D → C**. Implication: lead **adoption/demos** with A + C, but lead **paid focus** with A + B (and D for quick high-margin hooks). **Final persona priority is a founder decision (open question — see §17).**

---

## 6. Business Model

> No confirmed/transactable prices exist yet — pricing is a **known gap and a top adoption risk** (see §17). A SKU *model* exists; numbers do not.

| Model | Suitable Customer | Revenue Logic | Pros | Risks | Current Readiness |
|---|---|---|---|---|---|
| SaaS subscription | Owners (A/B), O&M (C) | Base seat + per-MW annual; or per-seat tiered by active projects/technicians | Recurring, scalable | No price set; C pays slowly | Partially (single deployment; no tenant billing) |
| Private deployment | Large owners, utilities, data-sensitive | License + deployment fee | High ACV, data sovereignty | Ops/cost heavy | Reserved (metadata + architecture only) |
| Hybrid deployment | Multi-region / mixed-sensitivity | Mixed subscription + private | Flexibility | Complexity | Reserved (no edge runtime) |
| Project-based (EPC / utility) | EPC (E), utilities | Project bundle integrated into CapEx bid | High ACV, channel reach | Lumpy, long cycles | Vision / channel concept |
| Robot sales / leasing | Robot-running customers, owners | Hardware sale or lease (Cleanuva Robotics) | Real hardware revenue; differentiation | Capital intensive; narrow | Real business line (robotics pillar) |
| Robot + software bundle | Owners/operators wanting turnkey | Hardware + platform subscription | Strongest closed-loop story | Bundle pricing undefined | Concept (best demo, no SKU) |
| O&M service enablement | O&M providers (C) | Per-seat / per-project productivity tier | Sticky, daily use | Weakest-payer segment | Partially (platform usable, no metering) |
| Distributor / partner | Local partners | Channel margin / white-label | Geographic scale | Needs packaged demo + enablement | Vision / channel concept |
| Data / AI / evidence premium | Auditors (D), investors (B) | Pay-per-report; premium audit seat | High margin, low friction entry | Episodic; needs export layer | Partially (reports preview only, export disabled) |
| Pilot project | Any beachhead | Paid pilot (avoid free) | Validates WTP | Free pilots ≠ PMF | Suitable after productization cleanup |

---

## 7. Product Architecture in Business Language

A **business-facing operating loop** — *not* a set of customer-facing jargon labels (see §15 for what customers should actually see):

1. **Connect** — bring in plant/device/robot/report data from existing monitoring and files (vendor-neutral). *Hero proof: "your data is trustworthy," not "12 sources configured."*
2. **Understand** — normalize data, detect anomalies, diagnose problems (root cause in plain language).
3. **Decide** — AI recommends the most valuable action, with ROI, priority, and risk; human stays in control.
4. **Act** — convert the decision into a work order / cleaning task / robot dispatch via the execution-adapter ecosystem.
5. **Verify** — compare before/after, validate whether the action recovered performance/revenue.
6. **Prove** — produce the evidence package / report / customer-facing outcome (recovered money, audit-grade proof).

> Internally this maps to the technical spine **CONNECT → ANALYZE → INSPECT (Reserved) → EXECUTE → VERIFY**, with the **LoopRun** as the atomic unit. Customers should experience a **plain-language journey**, not these stage codes.

---

## 8. Technical Architecture (accurate, non-overclaimed)

**Stack (code-verified):**
- **Frontend:** Next.js 15 (App Router, localized `app/[locale]/`), React 19, TypeScript, Tailwind, Radix UI, next-intl, TanStack Query, ECharts/Recharts, Three.js / react-three-fiber (digital-twin showcase).
- **Backend:** NestJS 11, TypeScript, Prisma 6, Swagger/OpenAPI, JWT (passport-jwt) auth; ~60 modules / 55 controllers.
- **Database:** PostgreSQL via Prisma; **TimescaleDB** hypertables for telemetry/KPI time-series (raw-SQL migrations).
- **API:** REST + OpenAPI. (WebSocket gateway and server Agent Tool API are **Reserved**; frontend mocks WS.)
- **Auth / tenant:** JWT + multi-tenant via `tenant_id` + request-context middleware + IAM/permission guards. **No tenant/organization admin REST API yet.**
- **Integration adapters:** Adapter Runtime with registry + ingest harness. Working: **CSV, Solarman, FusionSolar, Robot-MQTT**. **Modbus = stub.** Live Solarman/FusionSolar validation is open **P0** work.
- **AI modules:** **Operational Intelligence (`/ai/recommendations/*`) is the primary path today.** Copilot/Operational Analyst module references LLM providers with guardrails/redaction (LLM-backed with deterministic fallback). **Server Agent Runtime (`/agent/*`) is empty / Reserved.**
- **Robot execution adapter:** `Cleanuva Robotics` first-party execution adapter is implemented in the adapter registry.
- **Deployment:** Docker Compose with TimescaleDB; Redis/Kafka/MQTT broker **commented out** (ingest is currently **synchronous**, no streaming bus running). `docker-compose.prod.yml` exists; **no Kubernetes**.

**Status taxonomy** (from scope boundary §0.9): **Implemented · Partially Implemented · Reserved · Vision.**

**Implemented now:** core O&M REST (auth, plant, zone, device, robot, telemetry, alarm, cleaning task, work order, dashboard); alarm engine on ingest; Operational Intelligence; recommendation/workflow runtime; rule builder + event correlation; integration runtime + vendor adapters; i18n; command centers; AI workspace routes; assets center.

**Partially implemented:** Operational Analyst (LLM-backed + deterministic fallback; some flows persist to local state only); Reports (preview only, **export disabled, session-only**); Digital Twin (UI/showcase only, **persistence Reserved**); multi-tenant admin (DB + middleware, no admin REST); Economic Intelligence (client ROI engine; **numbers lack currency/units in UI**); command-center map layers (may use demo geo data).

**Reserved (do NOT claim shipped):** Inspection / Drone / Defect / Thermal (no tables, no routes); server Agent Runtime + Agent Tool API; Digital Twin persistence; Report / File / Organization / Tenant HTTP modules; Modbus adapter; production Kafka/Redis/MQTT streaming.

**Vision:** production Kafka scale; K8s / multi-region; SaaS tenant provisioning + billing; full drone autonomy; industrial CV.

**Current limitations (top):** synchronous ingest pipeline (no queue/idempotency hardening); fixture-vs-live data labeling not enforced; live vendor API validation pending; reports cannot export; key AI actions in some flows are preview/local-only (no real dispatch); economic figures need currency/units; UX is architecture-driven (see UX audit).

---

## 9. Product Modules

Legend — **C** = customer-facing · **D** = demo asset · **I** = internal/admin · **R** = reserved/future.

| Module | Purpose | Current Status | Customer Value | Demo Readiness | Notes |
|---|---|---|---|---|---|
| Dashboard / Briefing | Portfolio home | Implemented (metric-dense) | Med | Needs rework | Should become an outcome **briefing**, not a KPI wall (UX audit). **C** |
| Plants / Portfolio | Plant list + summary | Implemented | High | Good | Map view is placeholder. **C** |
| Plant Detail | Single-plant view | Implemented | High | Good (long) | Needs tabs. **C** |
| Assets / Devices | Registry | Implemented | Med | Low | Supporting. **C/I** |
| Command Center | NOC big-screen | Implemented | Med | **High (wow)** | Display-only; not clickable. **D** |
| Digital Twin | 3D/2D twin | Showcase implemented; persistence Reserved | Med | **High (wow)** | Best visual asset; flow simulated. **D/R** |
| Alarms | Triage hub | Implemented | High | Good | Strong. **C** |
| AI Analysis / Operational Analyst | Conversational + analysis | Partially (LLM + fallback) | High | **High (AI felt)** | Hero. Name per §15. **C/D** |
| Recommendations | AI recs + reasoning + ROI | Partially (backend + demo fallback) | High | Good | Strip internal badges. **C** |
| Economic Impact | Revenue-at-risk / ROI | Partially (client engine) | High | Good | **Add currency/units.** **C/D** |
| Work Orders | Execution hub | Implemented | High | Good | Two work-order surfaces exist — consolidate. **C** |
| Robots | Robot ops + dispatch | Implemented (status); dispatch preview placeholder | Med-High | Med | Close the recommendation→robot→result loop. **C/D** |
| Reports | Report/evidence center | Partially (preview only) | High | Med (deflates) | **Export disabled / session-only.** **C** |
| Verification / Evidence | Outcome + proof | Partially | High | Med | Verify is PR% only, not €. **C** |
| Decision-chain (Approve/Plan/Execute/Verify/Trust/Autonomy) | The loop, operable | Implemented (V4.1) | Med | Med | Scattered across 3 nav groups; jargon-named. **C/I** |
| Admin / Tenant / Integrations | Onboarding, integration | Implemented/Partial | (internal) | Low | 17 technical pages — role-gate. **I** |
| Data Quality / Adapter layer | Trust the data | Implemented/Partial | Med | Low-Med | Useful as a trust signal. **I/C** |

---

## 10. AI Capabilities (in customer-value terms)

- **Root-cause analysis** — explains *why* generation dropped or an alarm fired, in plain language with evidence. *(Strong, real.)*
- **Operational summary** — "what happened across the fleet" briefings.
- **Recommendation explanation** — the recommended action plus its reasoning chain. *(Strong.)*
- **Economic impact analysis** — revenue at risk, recoverable revenue, cleaning ROI, money-ranked priority. *(Strong; needs currency/units in UI.)*
- **Fleet risk assessment** — which plants are most at risk.
- **Evidence package generation** — verifiable proof artifacts for the customer/stakeholders. *(Foundation present; export not yet shippable.)*
- **Operational Analyst** — grounded conversational assistant ("why did generation drop today?", "what's today's cleaning ROI?"). LLM-backed with deterministic fallback. *(The most viscerally felt AI surface.)*
- **Decision support vs autonomous execution** — Cleanuva is **decision support today**: it recommends; **humans approve**; **no autonomous actions execute in production**. Autonomy/Trust machinery exists in shadow.
- **Human approval / trust boundary** — graded autonomy with a trust mechanism that earns headroom from verified outcomes; default is human-in-the-loop.
- **Limitations / data dependency** — AI quality depends on real, clean telemetry; several flows still use demo/fixture data; live data integration is the current priority. Do not present demo recommendations as production-grade.

---

## 11. Robotics Connection

- **Robotics is not just hardware** — it is the platform's **first concrete execution adapter**.
- **The loop:** the platform **detects/recommends cleaning** → a **Cleanuva robot or a human crew executes** → the platform **verifies** whether cleaning improved performance (before/after PR) and reports the recovered value.
- **Commercial story:** not *"we sell robots,"* but *"we close the loop from insight → action → proof,"* with robots as the most differentiated, fully-closed execution path.
- **Curtailment test (binding principle):** in a plant where physical execution contributes nothing (e.g. curtailed output), **Cleanuva Robotics value ≈ 0, but Cleanuva Platform value is substantial.** This proves the platform's value is decoupled from robotics.
- **Peer business lines:** Cleanuva Platform and Cleanuva Robotics are **equal business capabilities under the Cleanuva master brand**; robotics is the flagship adapter, **not the architectural center**.

**Robot product lines — honest status (do not overstate):**

| Name | Status in repo | Action needed |
|---|---|---|
| **Cleanuva Robotics** | **Real, defined business line + implemented execution adapter** | Use confidently. |
| "Cleanuva R-Series" | Appears only as a **demo/seed robot name** (backend seeds, DTO example, schema doc) | Not yet a specified product line — define before external SKU claims. |
| "NuvaTrack R1 / NuvaTrack-R" | Appears only as an **older API-spec fixture**, inconsistent with "R-Series" | Reconcile naming; not a defined line. |
| **"NuvaTrack R-Series"** | **Not found** as a defined line (mix of two inconsistent fixtures) | Define formally if intended. |
| **"NuvaTrack U-Series"** | **Does not exist anywhere in the repo** | Net-new — must be defined in SSOT + naming rules first. |
| **"NuvaSpan Series"** | **Does not exist anywhere in the repo** | Net-new — must be defined in SSOT + naming rules first. |

> Recommendation: treat NuvaTrack / NuvaSpan / R-Series / U-Series as **proposed marketing product-family names** until formally defined (specs, SKUs) in the domain/naming SSOT. Do not present them as implemented products. *(中文：这些机器人系列名目前在代码与文档中要么只是演示数据，要么根本不存在，对外介绍前必须先正式定义，切勿当作已实现产品。)*

---

## 12. Current Product Stage (honest)

**Framing (Cleanuva Platform).** The **Cleanuva Platform** software is in a **Commercial Foundation / Demo-Ready Foundation** stage — real, runnable, broadly built — **not** prototype, **not** full commercial SaaS, **not** customer self-service. (Do **not** apply "Commercial Foundation Platform" to the whole Cleanuva brand: **Cleanuva Robotics** is a parallel product line whose external naming/SKUs need formal definition; **Cleanuva Solutions** is a commercial packaging layer, not a separate software module; the **Cleanuva brand** is broader than this repository.) The readiness table below is for the Platform software.

| Stage (Cleanuva Platform) | Current Readiness | Notes |
|---|---|---|
| Exhibition visual attraction | **Partially Ready** | Command Center + Digital Twin are genuine "wow"; curate the booth loop. |
| Guided 3-minute demo | **Partially Ready** | Story landable by a knowledgeable presenter avoiding mock labels/jargon. |
| 15-minute sales demo | **Not Ready** | Scattered loop, no real export, money without units, placeholder robot loop. |
| Customer self-use | **Not Ready** | Jargon nav, no guided journey, no onboarding CTA. |
| Pilot deployment | **Not Ready** | Live data, dispatch, export, and proof layer incomplete. |
| Commercial SaaS | **Not Ready** | Productization + real-data + billing/tenant ops outstanding. |

**Before pilot, minimum required:** real data integration hardening, demo-path packaging, export/proof layer, customer-facing simplification (plain-language naming, outcome-first home, one connected loop, currency/units).

---

## 13. Demo Narrative

> Use Demo Mode with seeded data. Avoid surfaces stamped `(Mock)` / `simulated` / `Phase X` / `coming soon` / raw 0–1 trust scores in customer demos.

### 30-second exhibition explanation
- **Opening screen:** Command Center (Global) auto-rotating, or Digital Twin (3D).
- **Key message:** *"Cleanuva is the AI brain for solar operations — it finds lost revenue, sends a robot or crew to fix it, and proves the money it recovered."*
- **Show:** the live map / 3D twin. **Avoid:** dashboard, decision-chain internals, admin.
- **Don't say:** "fully autonomous," moat-as-built, unfinished features.
- **Takeaway:** "This is more than monitoring — it acts and proves results."

### 3-minute guided demo
- **Opening:** Command Center → "one plant is losing money."
- **Show, in order:** Alarm Analysis (root cause) → Operational Analyst (ask "why did generation drop today?") → Recommendation + approve → robot/crew acts → Outcome + Economic Impact (recovered revenue).
- **Avoid:** LoopRuns, Operational Memory, trace "(Mock)", admin.
- **Takeaway:** "Detect → diagnose → act → verify → prove, in one loop."

### 5-minute partner demo
- As above + **vendor-neutral Connect** (works on existing monitoring) + **robot pillar** (Cleanuva Robotics as flagship adapter) + **evidence/report** as the partner-sellable proof.
- **Message:** "You can co-sell platform + robots; the platform creates value even without robots."
- **Takeaway:** "Two revenue pillars, one loop, defensible proof."

### 15-minute deeper technical/business demo
- Add: multi-site Portfolio, Data Quality/Connect trust, adapter ecosystem, autonomy/trust boundary (human-in-the-loop), and the honest implemented-vs-reserved map.
- **Avoid overclaiming:** show shadow autonomy as *future*, not live; be explicit about live-vs-demo data.
- **Takeaway:** "Real foundation, honest roadmap, clear moat trajectory."

---

## 14. Website / PPT / Partner Messaging (reusable blocks)

> Naming discipline: use **"Cleanuva"** for the master brand; use **"Cleanuva Platform"** when the claim is specifically about the software (vendor-neutral, operations/evidence layer). "Vendor-neutral" applies to the Platform, not to the whole brand (Cleanuva Robotics is first-party hardware).

- **Tagline:** *Find lost solar revenue. Fix it. Prove it.* （发现损失 · 推动处理 · 证明收益）
- **One-sentence pitch — Brand:** *Cleanuva is a clean-energy technology brand building AI-native solar and energy asset operations solutions — combining software, robotics, field execution, verification, and future energy solutions under one brand.*
- **One-sentence pitch — Platform:** *Cleanuva Platform is the AI-native operations layer for solar and energy assets — it sits above existing monitoring, finds lost revenue, drives action, verifies results, and produces evidence.*
- **One-sentence pitch — Robotics:** *Cleanuva Robotics is the first-party robot product line and the flagship execution adapter for the Cleanuva Platform.*
- **One-sentence pitch — Solutions:** *Cleanuva Solutions packages the platform, robotics, integration, and field execution capabilities into customer-specific commercial solutions.*
- **Short paragraph:** *Cleanuva Platform turns solar monitoring into action and proof. It diagnoses why a plant underperforms, recommends the highest-value fix with ROI, dispatches it (work order, crew, or Cleanuva cleaning robot), and verifies the recovered performance — vendor-neutral, on top of the systems you already use.*
- **Long paragraph:** *Cleanuva is a clean-energy technology master brand. Its current pillars are Cleanuva Platform (the AI-native, vendor-neutral operations and verification software), Cleanuva Robotics (first-party solar-cleaning robots and the flagship execution adapter), and Cleanuva Solutions (packaged delivery), with room for future storage and energy-management lines. Cleanuva Platform is additive: it works above Solarman, FusionSolar, SMA and CSV data rather than replacing them, and closes the operating loop — Connect, Understand, Decide, Act, Verify, Prove — so owners and operators stop losing revenue silently and start recovering it with auditable evidence. Humans stay in control; every action is approved. The platform produces value with or without robots, and grows smarter as verified outcomes accumulate.*
- **Three pillars (brand):** **Cleanuva Platform** (AI operations: diagnose + decide + verify) · **Cleanuva Robotics** (execution: first-party robots + adapter) · **Cleanuva Solutions** (packaged delivery). *(Within the Platform: AI Operations · Execution · Proof.)*
- **AI value message:** *Cleanuva Platform gives plain-language root cause, money-ranked recommendations, and a grounded Operational Analyst — AI you can act on, not a chatbot.*
- **Robotics value message:** *Cleanuva Robotics makes the loop physically complete — detected soiling becomes a dispatched cleaning and a measured, proven recovery.*
- **Proof / ROI message:** *Every action is verified; recovered revenue is shown and exportable as audit-grade evidence.*
- **Partner cooperation message:** *Co-sell platform + robots (via Cleanuva Solutions), white-label into projects, or distribute locally — with a repeatable, packaged demo.*
- **Investor / strategic message:** *One clean-energy master brand with multiple revenue pillars (platform + first-party robotics + solutions, and future energy lines), a vendor-neutral software wedge into daily operations, and a moat that compounds as verified outcomes accumulate.*

---

## 15. Terminology Standard

> Principle: **customers should not have to learn the architecture.** Internal precision (LoopRun, Trust Budget, etc.) stays; customer surfaces use plain language. *(Backed by the UX audit and SSOT Ch.2.4/2.5.)*

| Term | Customer-Facing? | Internal Only? | Preferred (customer) Replacement | Notes |
|---|---|---|---|---|
| LoopRun | SSOT says yes; **UX evidence says it confuses** | Canonical internal noun | "Case" / "Operation" (gloss) | Use sparingly + glossed; founder decision pending. |
| Operational Chain | No | Yes (V4.1 impl. term, **not in SSOT**) | "Operations / Case view" | SSOT calls it "LoopRun Timeline" — reconcile. |
| Trust Budget | Concept only; **never raw 0.0–1.0** | Raw score internal | "What the system can now do" (capability language) | SSOT forbids showing raw scores. |
| Operational Memory | No (over-hedged in UI) | Yes | hide; or "operational history" | Don't expose the Memory/Corpus/Network/Intelligence doctrine to customers. |
| Narration (Stream) | Borderline | — | "Activity timeline" | Term needs a plain gloss. |
| Autonomy | Yes (as levels/badges) | — | "Autonomy level" | Default human-in-the-loop; not "fully autonomous." |
| Evidence Package | Yes | — | "Evidence report" / "proof" | Customer-facing proof artifact. |
| AI Copilot | **Deprecated** | — | **Operational Analyst** | Do not use "AI Copilot" in new UI. |
| Operational Analyst | Yes | — | (keep) | Replacement for AI Copilot; strategically central. |
| Execute | Yes (as journey step "Act") | spine term | "Act" | Plain-language journey label. |
| Verify | Yes (as "Prove"/"Verify") | spine term | "Verify / Prove" | Customer trust step. |
| Recommendation | Yes | — | "Recommendation" | Drop "AI Recommendations" prefix. |
| Work Order | Yes | canonical entity | "Work order" | Canonical; not Ticket/MaintenanceTask. |
| Robot Mission | Internal facet | Yes | "Cleaning task" / "robot job" | Canonical cleaning entity = CleaningTask. |
| Command Center | Yes | — | "Command Center · {Region}" | Replaces "Big Screen". |
| Digital Twin | Yes | — | "Digital Twin" | Showcase; persistence reserved. |

**Deprecated strings (do not use in new UI):** AI Copilot → Operational Analyst · AI Recommendations → Recommendations · AI Alarm Center → Alarm Analysis · AI Economic Intelligence → Economic Impact · Big Screen → Command Center. **Never in product chrome:** NETRO Sparkle GmbH (legal entity only).

---

## 16. Source-of-Truth Rules Going Forward

1. **This Master Brief is the current reference for business positioning, personas, commercial model, demo narrative, and terminology intent.**
2. **Older V4 documents must not override this brief on positioning.** Specifically, the "**O&M Provider as the single primary commercial buyer**" claim in `frontend_ssot_v4.md` (Ch.16) and `AI_CONTEXT.md` §2 is **superseded** by the multi-persona model here. *(Recommended follow-up: update AI_CONTEXT.md §2 and CLAUDE.md to match; until then, treat this brief as the positioning authority and flag the discrepancy rather than silently following the old line.)*
3. **This brief does NOT override technical contracts.** Domain model, DB schema, API spec, runtime, and the loop/primitive definitions remain owned by their technical SSOTs. If positioning and a technical contract conflict, **the technical SSOT wins and the conflict must be reported.**
4. **Any future audit must cite this brief first for positioning**, then the technical SSOTs for contracts.
5. **Older documents may be used only as historical context or implementation detail**, never as current positioning authority (see companion authority audit for the keep/supersede/archive map).
6. **If implementation conflicts with this brief, report the conflict** — do not assume old documents are correct.
7. **Every future report must state which source documents it treated as authority** (positioning vs contract).

---

## 17. Known Limitations and Open Questions

**Known limitations (honest):**
- **Real data integration:** live Solarman/FusionSolar validation pending; ingest is synchronous (no streaming bus running); fixture-vs-live labeling not enforced; credential handling needs hardening.
- **Demo data:** several flows (recommendations, command center, robots) fall back to demo/fixture data; must not be presented as production.
- **Robot dispatch:** no real auto-dispatch; dispatch preview uses placeholder figures (e.g. €42/day); recommendation→robot→result loop not closed in-product.
- **Report export:** preview only; PDF/Excel/email export disabled; reports are session-only.
- **Customer-facing UX:** architecture-driven nav and jargon; no guided journey; outcome-first home and currency/units still needed (see UX audit).
- **Autonomy:** decision-support only; zero autonomous execution in production; autonomy/trust run in shadow.
- **Reserved capabilities:** Inspection / Drone / Defect / Thermal, server Agent Runtime, Digital Twin persistence, Report/File/Tenant/Org HTTP — not shipped.

**Open questions (founder decisions):**
- **Final persona priority / beachhead:** adoption (A+C) vs paid focus (A+B); is C a wedge or a trap given weakest-payer reality?
- **Pricing & packaging:** no transactable prices/metering exist — **the #1 commercial blocker.**
- **Robot product-line naming/specs:** NuvaTrack / NuvaSpan / R-/U-Series are undefined or demo-only — define or drop.
- **Pilot customer strategy:** paid pilots vs free; which segment first.
- **Moat language discipline:** network-effect moat is a destination — keep out of present-tense claims.
- **Upstream doc sync:** when to update AI_CONTEXT.md / CLAUDE.md / frontend_ssot_v4 to the multi-persona model (positioning only; keep technical contracts).

---

## 中文创始人摘要 (Founder Summary in Chinese)

**当前到底是什么（品牌 vs 平台，务必区分）。**
**Cleanuva 是商业母品牌，不等于 Cleanuva Platform。** 母品牌（隶属法律实体 **NETRO Sparkle GmbH**）之下包含多条业务线：**Cleanuva Platform**（AI 原生的光伏 / 能源资产运维 **软件**，决策 / 验证层）、**Cleanuva Robotics**（第一方清洁机器人产品线，同时是平台的 **旗舰首个执行适配器**）、**Cleanuva Solutions**（方案打包 / 集成 / 交付），并为未来 **储能 / 能源管理 / 混合能源** 等业务线预留空间。其中 **Cleanuva Platform** 是 **厂商中立、叠加式** 的——架设在客户已有的监控（Solarman、华为 FusionSolar、SMA、CSV 等）之上，而不是替代它们；核心价值是 **闭环**：连接 → 理解 → 决策 → 执行 → 验证 → 证明。注意："厂商中立"只描述软件平台层，不可用于整个母品牌（机器人是第一方硬件）；"商业基础（Commercial Foundation）"阶段只指 **Cleanuva Platform 软件**，母品牌范围更广。

**现在不应再如何误解。**
- 不要再说"主要买家就是独立运维商（O&M Provider）"——这是 **过时结论**。运维商只是 **多个角色中的一个**。
- 不是"只卖机器人"：没有机器人，平台依然能创造价值（curtailment 测试）。
- 不是纯监控、不是 SCADA、不是工单系统、不是通用聊天机器人。
- 还 **不是** 成熟的商用 SaaS，也 **不是** 客户自助产品；现在是 **商业基础（Commercial Foundation）/ 可演示基础** 阶段。

**最新商业定位。**
厂商中立的"运维 + 证据"软件层 + 旗舰机器人执行线；通过 **每天使用回路的运营者**（自运维大业主 A + 运维商 C）做 **获客与演示**，通过 **付费意愿更高** 的金融业主 / IPP（B）和审计（D）做 **收入**。护城河是 **占据日常运维回路 + 拥有"已验证结果/证据"**（网络效应是目标，不是现状，对外别当成已实现）。

**目标客户和买单方。**
多角色：业主 / 投资人、自运维大业主、运维商、EPC、清洁公司、机器人运营商、分销 / 本地伙伴、内部运营、审计 / 战略投资人。**买单、日常使用、获益、渠道** 是不同角色，别混为一谈。**诚实提醒：运维商（C）演示效果最好，但付费能力最弱；付费重心应放 A + B。最终优先级由创始人拍板。**

**软件平台和机器人关系。**
两个平行业务支柱；机器人是 **旗舰首个执行适配器**，让闭环"物理上完整、可演示"，并带来真实硬件收入——但 **平台不依赖机器人也能产生价值**，机器人不是架构中心。

**后续对外介绍应该怎么讲。**
一句话："Cleanuva 是光伏运维的 AI 大脑——发现损失、派机器人或班组去修、并证明挽回的收益。" 演示先放 **指挥中心 / 数字孪生**（视觉冲击），再走 **告警分析 → 运营分析师问答 → 推荐并审批 → 执行 → 验证 + 经济影响**。**避开** LoopRuns、运营记忆、带"(Mock)/模拟"的页面、原始 0–1 信任分。强调 **人始终在环、当前非全自动**，钱要带货币单位。

**旧文档哪些观点不能继续作为权威依据。**
- `frontend_ssot_v4.md`（Ch.16）与 `AI_CONTEXT.md` §2 中"**运维商是唯一主要买家**"——已 **被本简报取代**（建议同步更新 AI_CONTEXT.md / CLAUDE.md，仅改定位，不动技术契约）。
- 旧的"业主是次要/派生角色"假设——作废。
- 把无人机 / 红外 / 缺陷 / 巡检、服务端 Agent 运行时、数字孪生持久化、报表导出当作"已实现"——错误，它们是 **Reserved / 未交付**。
- 旧文档可作 **历史背景或实现细节** 参考，但 **不得作为当前定位权威**。技术契约（领域模型 / 数据库 / API / 运行时）仍以各自技术 SSOT 为准；若定位与技术契约冲突，**以技术契约为准并上报冲突**。

---

*End of Master Brief. Companion: `docs/95_audit/Cleanuva_Documentation_Conflict_and_Authority_Audit.md`.*
