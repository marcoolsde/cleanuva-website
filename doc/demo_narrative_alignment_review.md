---
title: Cleanuva Website — Demo Narrative Alignment Review (Audit B)
status: Read-only review — no code/content changed
lens: Sales demo · exhibition demo · customer first-contact (NOT product architecture, NOT code)
authority: doc/Cleanuva_Current_Platform_Master_Brief.md §13 Demo Narrative
date: 2026-06-16
note: Requested `frontend-design` skill was unavailable; the equivalent sales-demo/first-impression critique lens was applied manually.
---

# Demo Narrative Alignment Review (Audit B)

## Corrections applied from R1
- **Robotics product family is legitimate** (NuvaTrack/NuvaSpan = Cleanuva Robotics commercial product line). It is evaluated here only for **demo flow**, not implementation/SKU honesty.
- **No future-energy** expansion; demo stays Solar · Platform · Robotics · Proof.
- **AI Copilot → Operational Analyst** treated as a phased naming transition (Audit A).

> Lens reminder: this is a **sales/exhibition/first-contact** critique — how the site *performs as a pitch*, not how it's architected or coded.

---

## The target demo (from Master Brief §13)

- **30s:** *"Cleanuva is the AI brain for solar operations. Find lost revenue. Fix it. Prove it."*
- **3min:** Command Center → Analysis → Recommendation → Work Order / Robot → Outcome → Evidence.
- **5min:** Platform · Robotics · Proof.

---

## Demo-readiness at a glance

| Level | Readiness | Why |
|---|---|---|
| **30 seconds** | ⚠️ **Weak** | The hook ("AI brain · find lost revenue · fix · prove") is **not on the first screen**. The hero opens abstract ("unifies the fragments / coordinates the work / runs the operation"). A presenter can't read the 30s line off the page; a cold visitor doesn't get the punch. |
| **3 minutes** | 🟡 **Partial** | Every beat exists (Command Center, Analysis, Recommendation/Analyst, Execution/Robot, Outcome, Evidence) and is high quality — but the **rhythm isn't pre-arranged**: the page never opens on the Command Center, proof lands late, and the Analyst is still called "AI Copilot." A knowledgeable presenter lands it; the site doesn't lead them. *(Matches Master Brief: "Guided 3-min demo — Partially Ready.")* |
| **5 minutes** | 🟢 **Good** | Platform, Robotics, and Proof destinations all exist and are visitable. Caveats: proof is "illustrative," and the Robotics page is product-catalog-deep (a detour from the loop story). |

---

## Page-by-page demo support

| Page | Role in the demo | Supports the pitch? | Where it breaks rhythm | Misunderstanding risk |
|---|---|---|---|---|
| **Homepage** | First contact / opening canvas | Has all 3-min beats, but **opens abstract** (no "AI brain / find-fix-prove") and the **Command Center appears mid-scroll**, not as the opener. | Abstract hero; proof ("recovered money") lands late; "AI Copilot" wording. | "Operating layer" → *"just another SaaS dashboard"*; Cleanuva = Platform. |
| **Platform** | The core loop surface (3-min spine) | **Strong** — Connect (Works-With-Your-Data) + Analysis (intelligence arc) + Recommendation (Analyst) + Command Center + Verify (recovered revenue) all present. | Opens with an abstract "operating system" hero, not the hook; Command Center sits mid-page; proof is illustrative; "AI Copilot." | Could read as generic monitoring SaaS if the "find lost revenue → prove" punch isn't led verbally. |
| **Robotics** | The "fix it" beat + the robotics pillar (5-min) | **Good** for a robot-buyer; the execution + cleaning-ROI + platform-dispatch story is there. | For the **loop** demo, spec tables / Compare / per-model pricing are a **depth detour** that interrupts the find→fix→prove narrative. | *"Cleaning that runs itself / full autonomy"* can read as *already fully autonomous* (credibility risk with a knowledgeable buyer); deep catalog can read as *"robot vendor."* |
| **Solutions** | "Is this for me?" qualifier (supporting, not the spine) | Useful for first-contact persona qualification. | Not part of the core loop — fine as a side trip; don't route the live loop demo through it. | Low — though "Solutions" as role-segmentation may not read as the **packaged-offer** the brand intends. |
| **Request Demo** | The natural endpoint of every pitch | **Aligned** — clean conversion; "…request a demo" lands here. | None. | None. |
| **Get Pricing** | Robotics commercial close (5-min robot pillar) | Works for a robot buyer (config → RFQ). | For a **platform**-focused prospect, the only "pricing" surface is robotics — a rhythm break at the commercial step. | A platform buyer at "Get Pricing" sees only robots → *"is Cleanuva a robot company?"* |

---

## The 6 questions

### 1. Is the current sales demo smooth?
**Partially.** The raw material is high quality and complete — but the site **doesn't lead the presenter or the visitor through the pitch**. The 30-second hook isn't on the first screen, the Command Center (the intended opener) is buried mid-scroll, and the proof punch lands late. A trained presenter can assemble a good 3-minute story; an unguided first-time visitor at a booth or on the web won't feel "AI brain → find lost revenue → fix → prove."

### 2. Where does it break the sales rhythm?
- **Abstract opener.** The hero leads with "unifies the fragments / runs the operation," not the concrete "AI brain · find lost revenue · fix it · prove it."
- **No visual-wow opener.** The demo wants to OPEN on a Command Center (or live map / twin); the site shows it mid-page.
- **Proof lands late and soft.** "Recovered revenue, proven" is the climax of the pitch but appears low on the homepage and is labeled "illustrative."
- **Robotics depth interrupts the loop.** Spec/Compare/pricing are great for a product conversation but stall the find→fix→prove narrative if shown inline.
- **Terminology friction.** The script says "Analysis / Operational Analyst"; the site says "AI Copilot."

### 3. Where might customers misunderstand?
- **"Operating layer / operating system"** → *"this is just another monitoring dashboard / generic SaaS."* (The exact misread the Master Brief warns against.)
- **Cleanuva = Platform** (the brand collapses into the software) — and at **Get Pricing**, the inverse: **Cleanuva = robot vendor**.
- **"Cleaning that runs itself / full autonomy"** → *"it already runs with no humans"* (overstates the human-approved reality; risky in front of a knowledgeable O&M/auditor buyer).
- **Abstract hero** → the visitor never learns the concrete problem (silent revenue loss) the product solves.

### 4. Which page orders need adjusting (demo flow, not IA)?
*(Framed as demo-path / verbal-narration guidance — no IA or structural change implied.)*
- **Lead every pitch with the hook + a visual-wow** (Command Center / map / twin), then narrate **Analysis → Recommendation/Analyst → Act (work order/robot) → Outcome → Evidence**, regardless of the page's scroll order.
- On the **Homepage**, the *spoken* pitch should front-load "find lost revenue → prove it" and point at the Command Center preview early — even though the scroll keeps its current order.
- On **Platform**, narrate Command Center → Analysis → Recommendation → Verify (the loop), not the page's top-to-bottom order.
- For a **loop demo**, treat the Robotics catalog (specs/Compare/pricing) as a **drill-down after** the find→fix→prove story, not as the lead.
- Route the **live loop demo to Request Demo** as the close; use **Get Pricing** only in the robotics-pillar branch.

### 5. What content should be strengthened? (prioritized)
- **[High]** Put the **30-second hook** ("AI brain for solar operations · find lost revenue · fix it · prove it") where first contact sees it.
- **[High]** Surface a **visual-wow / Command Center hook** near the top of the first-contact path.
- **[High]** Make the **"recovered revenue, proven"** punch land **earlier and more concrete** (still honest/illustrative).
- **[Med]** Add a top-of-Robotics **"the robot is how the platform proves the fix"** framing before the catalog; **soften "full autonomy / runs itself"** to platform-dispatched + human-approved.
- **[Med]** Begin the **Operational Analyst** naming (phased) so the demo word matches the screen.
- **[Med]** At **Get Pricing**, signpost it as **robotics pricing** (vs the platform demo path) so platform buyers aren't misrouted.

### 6. What should NOT change?
- **The honesty posture** — illustrative figures, no fabricated proof, no "fully autonomous" claim in chrome. (It protects credibility in front of expert buyers.)
- **The Platform loop content** — Connect / Analysis / Recommendation / Command Center / Verify are already strong demo material; don't dilute them.
- **Request Demo as the endpoint** — clean and aligned; keep it the close.
- **Vendor-neutral "works with your existing data"** — a strong trust beat in the 5-minute partner story.
- **Robotics commercial product family** — legitimate (R1); keep the product line, just frame it as the loop's execution proof.
- **No-auth boundary / no self-service claims** — consistent with the "demo-ready foundation, not self-serve SaaS" stage.
- **No IA / navigation / structural change** is required to fix any of the above — these are pitch-sequencing and copy-emphasis matters.

---

## One-paragraph verdict

The website **contains a winning demo but doesn't perform it**. Every beat the Master Brief's 30s/3min/5min script needs — Command Center, Analysis, Operational Analyst, Robot execution, Outcome, Evidence — exists and is well-made, but the site opens abstract, hides its visual-wow, lands its proof late, and names the analyst "AI Copilot." The fixes are **pitch-sequencing and copy-emphasis** (lead with the hook, surface the Command Center and the recovered-revenue proof, soften robot-autonomy language, phase in "Operational Analyst") — **no structural or code change required**, and the strong, honest core should be preserved.

*End of Audit B. Read-only — sales-demo lens only. No code, content, structure, or technical change.*
