# Cleanuva — Brand Design System
### "The Loop — Light First Edition" · v1.0 · Build Spec

**Brand:** Cleanuva · **Legal entity:** NETRO Sparkle GmbH (Germany)
**Audience for this doc:** design team + frontend team (Next.js / Tailwind / Framer Motion / shadcn/ui) + Claude Code.

**Governing principle**
Light is the default brand state. Dark is *earned*, never decorative. A section may use the dark canvas **only** when it depicts one of: (1) the Loop turning, (2) the live Command Center / telemetry, (3) thermal / drone / defect data imagery, (4) the Verify / proof moment. Everything explanatory, human, hardware-beauty, commercial, and legal stays light.

The signature is the **Loop** (Connect → Analyze → Inspect → Execute → Verify) animated as a **Cool → Warm** energy current. Cool = intelligence. Warm = physical execution. The loop cycles cool → warm → cool, every time.

---

# PART 1 — Brand Design System (Color)

## 1.1 Color System

All tokens are named for *role*, not appearance, so light/dark swap by role.

### Light (default canvas)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#FAFAF8` | Primary page background (warm paper white) |
| `surface` | `#FFFFFF` | Elevated cards, panels |
| `surface-sunk` | `#F0EFEB` | Wells, input fields, subtle insets |
| `ink` | `#14181C` | Primary text (cool graphite-black) |
| `ink-2` | `#4A525B` | Secondary text |
| `ink-3` | `#79828C` | Tertiary / captions / disabled |
| `line` | `#E4E2DC` | Hairline borders, dividers |
| `line-strong` | `#CFCCC4` | Emphasis dividers |

### Dark (operational / "system alive")
| Token | Hex | Role |
|---|---|---|
| `abyss` | `#0E1419` | Primary dark canvas (warm-leaning graphite-navy) |
| `abyss-1` | `#161E26` | Dark surface / panel |
| `abyss-2` | `#1F2A33` | Raised dark surface |
| `ink-inv` | `#EDEFF2` | Primary text on dark (never pure white) |
| `ink-inv-2` | `#9BA6B0` | Secondary on dark |
| `ink-inv-3` | `#6B7680` | Tertiary on dark |
| `line-inv` | `rgba(255,255,255,0.08)` | Hairlines on dark |
| `line-inv-strong` | `rgba(255,255,255,0.16)` | Emphasis on dark |

### Signature accents — Cool → Warm
| Token | Hex | Role |
|---|---|---|
| `cool` | `#22D3C2` | Intelligence / Analyze. UI fills, graphics, dark-mode text, loop. |
| `cool-text` | `#0A7468` | Cool when used as **text/links on light** (AA-safe) |
| `cool-tint` | `#E2F7F4` | Cool wash / chips on light |
| `warm` | `#FFB347` | Execution / Robotics. UI fills, graphics, dark-mode accents, loop. |
| `warm-text` | `#9A5200` | Warm when used as **text on light** (AA-safe) |
| `warm-tint` | `#FFF2DF` | Warm wash / chips on light |

### Operational status (dark Command Center + alerts only)
| Token | Hex | Meaning |
|---|---|---|
| `status-online` | `#22D3C2` | Healthy / connected (reuses cool) |
| `status-verified` | `#3FD17A` | Verified / proof confirmed |
| `status-warning` | `#F5A623` | Degraded / attention |
| `status-critical` | `#FF5247` | Alarm / fault |

> Status amber `#F5A623` is intentionally distinct from brand `warm #FFB347` so "execution" never reads as "warning."

## 1.2 Color Usage Rules

1. **80/20 light-to-dark.** Across the whole site, roughly 80–85% of viewport-area is light. Dark is punctuation.
2. **One accent per region.** Cool dominates Platform/intelligence contexts; Warm dominates Robotics/execution contexts. Never split a section 50/50 except inside the Loop itself.
3. **Accents are for energy, not decoration.** Bright `cool`/`warm` appear on: the loop, data-viz, icons, focus rings, small fills, dark-mode text, hover glows. They never tint large background fields and never fill body paragraphs.
4. **Gradient is rare.** The Current Gradient (§1.5) is reserved for the loop's flow line and at most one hero accent moment per page. Never behind text, never as a full-section background on light.
5. **Black is `ink`, not `#000`.** White surface is `#FFFFFF`; page is warm `canvas`. Pure black/white only inside photography.
6. **Status colors live in dark/operational contexts only.** Don't use `status-critical` red as a marketing accent.

## 1.3 Light Mode Rules
- Backgrounds: `canvas` for page, `surface` for cards, `surface-sunk` for inputs/wells.
- Text: `ink` for headings/body, `ink-2` for support, `ink-3` for captions.
- Elevation via **soft shadow** (§Part 10), never via accent borders.
- Accent text uses `cool-text` / `warm-text` only. Bright accents allowed as icon/graphic fills, 1–2px borders, underlines-on-hover.
- Hairlines `line`; never use accent colors as default borders.

## 1.4 Dark Mode Rules
- Reserved for the four earned cases only (see governing principle).
- Backgrounds: `abyss` page, `abyss-1`/`abyss-2` panels.
- Text: `ink-inv` / `ink-inv-2` / `ink-inv-3`. Never pure white.
- Elevation via **glow + lighter surface**, not drop shadow. Glow = accent at 8–16% over a 1px `line-inv` border.
- Bright `cool`/`warm` are *encouraged* as text and data here — they finally get full contrast.
- A dark section must always contain live or live-feeling data. A dark section with only a headline and a button is forbidden.

## 1.5 Cool → Warm Gradient ("The Current")
The brand's flow signature. Routed deliberately through a luminous mid so it never muddies.

```
--current: linear-gradient(100deg,
  #22D3C2 0%,     /* cool — analyze */
  #5FE0B0 38%,    /* energized mid — inspect */
  #FFC76B 72%,    /* gold — pre-execute */
  #FF9E2C 100%);  /* warm — execute */
```

Rules:
- Use only on: the Loop path/current, the loop progress indicator, and a single optional hero accent stroke.
- Allowed as a **1–3px stroke**, a **glow**, or a **masked line**. Never a large solid fill.
- Direction is always cool → warm (left→right or counter-clockwise→clockwise toward Execute). Verify reverses warm→cool to close the loop.
- On dark canvas it glows (add `filter: blur` halo at 20% opacity behind the stroke). On light it stays crisp, no glow.

## 1.6 Accessibility Requirements (WCAG 2.2 AA, target AAA for body)
- Body text contrast ≥ 4.5:1; large text (≥24px or 19px bold) ≥ 3:1. `ink` on `canvas` ≈ 15:1 ✓. `ink-inv` on `abyss` ≈ 13:1 ✓.
- **Bright accents never carry body text on light.** Links/labels on light use `cool-text`/`warm-text`. On dark, `cool`/`warm` pass for text ✓.
- Focus visible on all interactive elements: 2px `cool` ring + 2px offset (`cool` on light, `cool` on dark both pass 3:1 against their canvas as non-text UI).
- Color is never the only signal: pair status color with icon + label.
- Minimum tap target 44×44px. Minimum body size 16px (`Body M` = 17px).
- `prefers-reduced-motion`: loop freezes to a static current snapshot; parallax disabled; transitions become ≤120ms opacity-only.
- All photography/data-viz needs text alternatives; decorative loop SVG marked `aria-hidden`.

---

# PART 2 — Typography System

## 2.1 Primary Typeface (Display + Body)
**Söhne** (Klim Type Foundry) — Director's pick. Contemporary grotesque: geometric enough to feel engineered, humanist enough to feel premium.
- **Open/fallback (use if license deferred):** `Inter` (display via `Inter Display` optical size).
- Loaded weights: 400 (Regular), 500 (Medium), 600 (Semibold). No 700+ — the brand is confident, not loud.
- Stack: `font-sans: "Söhne", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;`

## 2.2 Secondary Typeface
No separate serif/secondary family. Distinction comes from **weight, size, tracking, and the mono accent** — not a second voice. This keeps the system disciplined and premium. (If a softer human note is ever needed for editorial/Insights, permit `Söhne` at 400 with looser leading — still one family.)

## 2.3 Monospace Usage
**Söhne Mono** — Director's pick. **Fallback:** `Geist Mono`, then `JetBrains Mono`.
Stack: `font-mono: "Söhne Mono", "Geist Mono", "JetBrains Mono", ui-monospace, monospace;`

Mono is a **signature device**, used *only* for:
1. The five Loop verbs (CONNECT / ANALYZE / INSPECT / EXECUTE / VERIFY).
2. Eyebrows / section labels (uppercase, tracked).
3. Live data: metrics, MWp, timestamps, asset IDs, coordinates, telemetry readouts.
4. Code/docs.

Never use mono for headings or body paragraphs.

## 2.4 Heading Scale (desktop · base 16px)
| Style | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| Display XL | 72 / 76px | 500 | -0.022em | Homepage hero only |
| Display L | 56 / 60px | 500 | -0.020em | Page heroes |
| H1 | 44 / 50px | 500 | -0.016em | Section openers |
| H2 | 34 / 42px | 500 | -0.012em | Major headings |
| H3 | 26 / 34px | 500 | -0.006em | Subsection |
| H4 | 20 / 28px | 600 | 0 | Card titles |

Mobile: scale Display XL→40/44, Display L→34/40, H1→30/36, H2→26/32; keep H3/H4. Fluid via `clamp()`.

## 2.5 Body Scale
| Style | Size / line-height | Weight | Use |
|---|---|---|---|
| Body L | 19 / 30px | 400 | Hero subcopy, intros |
| Body M (default) | 17 / 28px | 400 | Standard paragraphs |
| Body S | 15 / 24px | 400 | Dense UI, captions-plus |
| Caption | 13 / 20px | 400 | Footnotes, legal |
| Eyebrow (mono) | 13 / 16px | 500 | +0.10em, UPPERCASE |
| Loop verb (mono) | 14 / 16px | 500 | +0.14em, UPPERCASE |

Measure (line length) for body: max **68ch** (~720px). Headings max ~16–20 words wide.

## 2.6 CTA Rules
Two CTA tiers map to the two sales motions.
- **Primary CTA — "Request a Demo"** (Platform motion): solid `ink` button on light / solid `cool` on dark. Label sentence case. Radius `md` (10px). Height 52px desktop / 48px mobile. Hover: subtle lift (shadow-2) + 40ms.
- **Secondary CTA — "Get robotics pricing"** (Robotics motion): outline button, `ink` border + `ink` text on light; on Robotics pages it gains a `warm` underline-accent on hover.
- **Tertiary / text link:** `ink` with animated `cool` underline draw on hover (200ms).
- One **dominant** CTA per section. Never two equal-weight buttons. Demo and Pricing may sit together only in the global header and final CTA band, where Demo is primary and Pricing is secondary.
- Button text never all-caps (caps reserved for mono labels). Active voice: "Request a demo", "Get pricing", "See the Command Center".

---

# PART 3 — The Loop Visual System

The Loop is the brand's hero asset. Geometry: a continuous rounded path (not a hard circle) with five **nodes** spaced evenly. A **current** (the gradient stroke) travels the path. Default orientation: nodes arranged so the path flows cool→warm toward Execute at the "active" position, then a return arc carries Verify back to Connect.

Canonical node order and color behavior:

| Stage | Verb | Meaning | Node color | Icon concept |
|---|---|---|---|---|
| 1 | CONNECT | Ingest signal / link assets | `cool` @ 60% (`#7FD8D0`) | Converging nodes into one link |
| 2 | ANALYZE | AI diagnosis, correlation, RCA | `cool` `#22D3C2` (peak cool) | Branching insight / waveform resolving |
| 3 | INSPECT | Confirm in the field / imagery | mid-current `#5FE0B0` | Focusing reticle / scan frame |
| 4 | EXECUTE | Dispatch robot, perform work | `warm` `#FFB347` (peak warm) | Directed vector / robot path |
| 5 | VERIFY | Prove outcome, feed back | `warm→cool` resolve, settles to `status-verified` `#3FD17A` pulse | Closed checkmark folding into the loop |

**Universal icon style:** 1.75px stroke, rounded caps/joins, 24px grid, minimal geometric line work, no fills except the active node. Each icon must read at 16px. Icons share the same optical weight as mono labels.

### Per-stage treatment

**CONNECT**
- Visual: scattered points drawing toward a single link line.
- Motion: points slide inward, snap to the path with a 1-frame settle. 240ms.
- Color: emerges from `ink-3` neutral into `cool` 60% — "raw signal becoming data."

**ANALYZE**
- Visual: the link blossoms into a small node graph / correlation web (mini version of the dataviz system).
- Motion: edges draw on sequentially (stagger 40ms), one node highlights as "root cause."
- Color: full `cool`. Brightest cool moment in the loop.

**INSPECT**
- Visual: a scan reticle passes over a panel/array fragment; a frame locks.
- Motion: reticle sweep 400ms, lock pulse.
- Color: mid-current `#5FE0B0` — the hand-off from thinking to doing.

**EXECUTE**
- Visual: a directed vector fires from the node toward a robot glyph that traverses a row.
- Motion: vector shoots (220ms easeOutExpo), robot advances along a short path.
- Color: full `warm`. Brightest warm moment.

**VERIFY**
- Visual: a checkmark forms, then *folds back into the loop path* as a return pulse.
- Motion: check draws (200ms) → a `status-verified` pulse travels the return arc back to CONNECT (closes the cycle).
- Color: warm resolves through `status-verified` green, settling cool — proof returning to the system.

**Current cycle timing:** full loop traversal 9–12s, continuous, eased (never linear, never jittery). On scroll-into-view the loop runs one "demonstration" cycle at 6s, then settles into ambient slow cycle.

### Where the Loop appears

- **Homepage:** full-scale, animated, in a **dark** operational section — the signature centerpiece. Carries a live worked example (soiling → flag → inspect → NuvaTrack clean → yield-restored verify).
- **Platform page:** the **intelligence arc only** (Connect → Analyze → Inspect) enlarged; each capability maps to a stage. Lives in dark Command Center zones; explanatory copy around it stays light.
- **Robotics page:** the **execution arc only** (Execute → Verify) enlarged; hardware is the protagonist, the loop shows the robot as "the loop's hands" + verify pulse. Loop in dark band; hardware beauty shots in light.
- **Solutions page:** a **compact horizontal loop** (5 nodes in a row) used as a persona-agnostic explainer; light background, static or gentle once-through on scroll. No full dark zone needed unless showing a live portfolio view.
- **Trade show booth:** the loop is the **anchor light wall / LED motif** — slow ambient cycle, large scale, readable from 10m. Becomes the booth's recognizable silhouette.
- **PowerPoint:** a **simplified 5-node static loop** as a recurring slide motif (footer-corner small mark + one full "how it works" slide). Cool→warm preserved; no heavy animation (use a 3-state build animation max).

---

# PART 4 — Photography System

Global grade: clean, true-to-life color, controlled contrast, no heavy filters. The brand's photographic fingerprint is **real world fused with cool data overlays** — but fusion is used selectively (hero/loop/proof), not on every image.

## 4.1 Robotics photography
- **Framing:** hero hardware as product portraiture — 3/4 angle, low hero angle for scale, plus tight detail crops (brush edge, sensor, drive).
- **Lighting:** bright, directional golden-hour key on real arrays; clean studio softbox on isolated product shots. High key, optimistic.
- **Composition:** generous negative space (for type), robot off-center on thirds, leading lines down panel rows.
- **Grading:** warm-neutral, slightly lifted shadows, accurate blues in panels, no teal-orange Hollywood push. Hardware always desirable, never muddy.
- Light background dominates; warm accent context.

## 4.2 Platform photography
- The platform's "photography" is mostly **product UI + screens in context** (operator at a console, control-room ambiance).
- **Framing:** over-shoulder console shots, screen-forward dashboard captures, hands-on-tablet in the field.
- **Lighting:** cooler, controlled; screen glow allowed as the cool accent source.
- **Composition:** screen is hero; human is supporting and calm.
- **Grading:** neutral-cool. This is where dark zones live — UI shown on `abyss`.

## 4.3 Drone photography (future-ready)
- **Framing:** top-down orthographic array shots (read as data surfaces) + low dramatic fly-bys.
- **Lighting:** dawn/dusk for raking texture; thermal/IR renders for defect content.
- **Composition:** grid geometry of arrays, drone small for scale, room for data overlays.
- **Grading:** thermal palettes (deep blue→magenta→amber) confined to data layers; base imagery stays neutral. These dark, glowing visuals are *designed to sit in dark zones* and pop against the light site.

## 4.4 Human photography
- **Framing:** real operators, engineers, owners — in context (field, control room, site walk). Mid shots and environmental portraits, not stock close-ups.
- **Lighting:** natural, warm, honest.
- **Composition:** people working *with* the system, never posing at camera; show competence and calm.
- **Grading:** warm-neutral, true skin tones, no over-saturation.

## 4.5 NEVER use
- Generic blue "tech mesh / circuit board / glowing AI brain" stock.
- Cliché eco imagery: green leaves on panels, hands cradling a sprout, lens-flare sunbursts.
- Teal-orange cinematic LUTs or heavy vignettes.
- Fake/placeholder dashboard screenshots with nonsense numbers (data must be plausible).
- Tilt-shift toy-look, fisheye gimmicks, motion-blur for "speed."
- People pointing at screens / fake-laughing in meetings (corporate stock tropes).
- Robots composited at wrong scale or impossible lighting.
- Pure-black hero backgrounds for hardware (kills desirability — hardware lives in light).

---

# PART 5 — Illustration & Data Visualization System

One visual family across all graphics so Platform and Robotics feel like one system. Built from: 1.75px line work, mono labels, the cool/warm accents, hairline grids, and the Current gradient for flow only.

## 5.1 Diagrams (architecture, deployment, process)
- Light background, `ink` lines, `line` hairline grid optional.
- Nodes = rounded rects (radius 6) or circles; edges = 1.5px lines; flow direction = `cool`→`warm` where it represents the loop, else neutral `ink-2`.
- Mono labels on nodes; sentence-case captions below.
- Deployment (SaaS/Private/Hybrid) shown as three clean grouped diagrams sharing one legend.

## 5.2 Telemetry graphics
- Live readouts in mono on dark (`abyss`): time-series sparklines in `cool`, thresholds in `status-warning`, faults in `status-critical`.
- Tabular data treated as a designed object: hairline `line-inv`, right-aligned mono numerals, subtle row hover glow.
- Always plausible values and real units (kWh, MWp, %, °C, ms).

## 5.3 AI analysis graphics
- **Alarm correlation:** node graph, edges weighted by correlation, the root node pulsing `cool`.
- **Root cause analysis:** collapsing tree, branches dimming as the path narrows to one `cool` root.
- **Diagnosis confidence:** mono percentage + a thin cool arc gauge.
- Animation: edges draw on, never bounce. On dark.

## 5.4 Command Center graphics
- The flagship dark surface. A portfolio map of sites as status nodes (`status-online`/`warning`/`critical`), a work-order rail, a live activity log in mono.
- Cool dominant; warm appears only when an *execution* (robot dispatch) is shown.
- Glow elevation, hairline panels, generous dark negative space — dense but calm.

## 5.5 ROI graphics
- Light background (this is a *trust/finance* artifact — must read transparent).
- Clean bar/area charts, `cool` for baseline, `warm` for "with Cleanuva" uplift, the delta annotated in mono.
- The ROI Calculator output uses the same language: inputs in `surface-sunk` fields, result as a large mono number with a cool→warm delta bar.
- No 3D charts, no skeuomorphic gauges, no chartjunk.

---

# PART 6 — Homepage Experience (Wireframe)

Light is home. Two dark "operational" zones are earned: the **Loop** (§3) and the **Command Center**. Transitions marked explicitly.

```
┌─────────────────────────────────────────────┐
│ [00] HEADER  (light, sticky, translucent)     │
├─────────────────────────────────────────────┤
│ [01] HERO                          ◻ LIGHT    │
│ [02] PROBLEM                       ◻ LIGHT    │
│ ════════ transition into dark ════════        │
│ [03] THE LOOP (signature)          ◼ DARK     │
│ ════════ transition back to light ════         │
│ [04] PLATFORM TEASER               ◻ LIGHT    │
│ ─── inset dark panel: Command Ctr  ◼ DARK ──   │
│ [05] ROBOTICS TEASER               ◻ LIGHT    │
│ [06] PROOF BAND (metrics/regions)  ◻ LIGHT    │
│ [07] SOLUTIONS BY ROLE             ◻ LIGHT    │
│ [08] VISION / ROADMAP              ◻ LIGHT*   │
│ [09] TRUST (security/deployment)   ◻ LIGHT    │
│ [10] FINAL CTA (dual path)         ◻ LIGHT    │
│ [11] FOOTER (brand + legal strip)  ◻ LIGHT    │
└─────────────────────────────────────────────┘
```

**[00] Header** — *Objective:* navigate + convert. *Style:* light, translucent `canvas`/85% blur, hairline bottom on scroll. *Imagery:* wordmark + tiny loop mark. *Motion:* shrinks/condenses on scroll (240ms). *CTA:* Request a demo (primary) · Get robotics pricing (secondary) · Region EN/DE/AR.

**[01] Hero** — *Objective:* reframe the category in 8 seconds. *Style:* light `canvas`. *BG:* `canvas`, optional faint warm field photo at far right, low opacity. *Imagery:* Display XL headline ("From detection to done. And proven."), Body L subline, one optional Current accent stroke. *Motion:* headline rises on load (entrance ease, staggered words 40ms); current stroke draws once. *CTA:* primary Demo + text link "See how the Loop works" → scrolls to [03].

**[02] Problem** — *Objective:* name the pain (fragmented, reactive ops). *Style:* light, `surface` cards on `canvas`. *Imagery:* three quiet line diagrams (monitoring sees-but-doesn't-act / robots act-but-don't-think / the gap). *Motion:* cards reveal on scroll, opacity+8px rise. *CTA:* none (narrative).

**═══ TRANSITION → DARK:** full-bleed band; light fades to `abyss` over ~160px using a soft gradient wipe + the Current stroke leading the eye down. This is the visual cue "you are now entering the live system."

**[03] The Loop** — *Objective:* prove the closed loop; the signature moment. *Style:* **dark** `abyss`. *BG:* `abyss` with faint dotted grid. *Imagery:* full animated Loop (§3) running the worked example; mono stage labels; live-feeling micro data. *Motion:* one demonstration cycle on entry (6s), then ambient (9–12s); `prefers-reduced-motion` → static snapshot. *CTA:* text link "Explore the Platform" / "Meet the Robots" feeding [04]/[05].

**═══ TRANSITION → LIGHT:** Verify's `status-verified` pulse "resolves" the screen back to `canvas` (dark lifts to light over ~120px).

**[04] Platform teaser** — *Objective:* sell the intelligence layer. *Style:* light, with **one inset dark panel** showing a Command Center slice (earned dark). *Imagery:* light explanatory copy + capability chips; dark inset = live portfolio map. *Motion:* the inset's data ticks subtly. *CTA:* "See the Command Center" → Platform page.

**[05] Robotics teaser** — *Objective:* make hardware desirable. *Style:* light. *BG:* `canvas`/`surface`. *Imagery:* golden-hour NuvaTrack hero shot, three family thumbnails. *Motion:* parallax product reveal, warm accent on hover. *CTA:* "Explore Robotics" + "Get pricing".

**[06] Proof band** — *Objective:* credibility. *Style:* light. *Imagery:* 3–4 headline metrics in mono (MWp managed, yield uplift %, downtime ↓), a region map (EU/MEA/NA), client logos. *Motion:* numbers count up once on view. *CTA:* "View deployments".

**[07] Solutions by role** — *Objective:* self-segmentation. *Style:* light, 5 tiles (Owners/Investors, IPPs, Utility-scale, EPC, O&M). *Motion:* hover lift. *CTA:* each tile → its Solutions page.

**[08] Vision / roadmap** — *Objective:* ambition + investor signal. *Style:* light by default; *may* host a small dark thermal/drone visual as an earned inset (future-data = dark). *Imagery:* drone/thermal/digital-twin teasers as loop nodes-to-come. *Motion:* horizontal scroll or staged reveal. *CTA:* "Our vision" → Company.

**[09] Trust** — *Objective:* de-risk. *Style:* light. *Imagery:* deployment trio (SaaS/Private/Hybrid), security/compliance badges. *CTA:* "Security & trust".

**[10] Final CTA** — *Objective:* convert both motions. *Style:* light, generous. *Imagery:* one Current accent stroke. *Motion:* minimal. *CTA:* Demo (primary) + Get robotics pricing (secondary).

**[11] Footer** — light. Tier 1 brand nav (Platform/Robotics/Solutions/Resources/Company) + both CTAs + region. Tier 2 legal strip, lower contrast `ink-3`: `© 2026 NETRO Sparkle GmbH. Cleanuva is a brand of NETRO Sparkle GmbH.` + Impressum · Privacy · Terms · Cookie settings.

---

# PART 7 — Platform Page (Wireframe)

Theme: the **intelligence arc**. Cool-dominant. Dark zones = Command Center + live capabilities; everything explanatory stays light.

```
[P0] Header (light)
[P1] Page hero — light. Display L: "The operating system for solar assets."
     Sub: outcome line (fewer truck rolls, restored yield). CTA: Demo.
[P2] Intelligence arc loop — DARK. Connect→Analyze→Inspect enlarged; each
     node is a clickable capability anchor. Earned dark (loop + telemetry).
[P3] Capabilities (light, alternating rows) — each: Outcome → Capability →
     proof stat → small dataviz. Order mirrors the loop:
        • Asset Monitoring        (Connect)
        • AI Diagnosis            (Analyze)
        • Alarm Correlation + RCA (Analyze)  ── dark inset: node graph
        • Inspection Management   (Inspect)
        • Work Order Management   (act)
        • AI Copilot              (act)       ── dark inset: live console
        • Performance + ROI       (optimize)  ── light ROI chart
[P4] Command Center — DARK full band. The flagship surface (§5.4). Live
     portfolio map, work-order rail, activity log. Earned dark.
[P5] Deployment — light. SaaS / Private Cloud / Hybrid, three clean diagrams,
     shared legend, "which is right for you" guidance.
[P6] Security & Trust — light. Compliance badges, data residency (EU), GDPR.
[P7] Integration note — light. Works with existing SCADA/monitoring (EPC-friendly).
[P8] Final CTA — light. "See the Command Center" (Demo primary).
[P9] Footer.
```
Rule: every capability block opens with the **outcome**, not the mechanism. Dark insets appear only where live data is shown.

---

# PART 8 — Robotics Page (Wireframe)

Theme: the **execution arc**. Warm-dominant. Hardware is the hero, shown bright; the loop band (dark) frames robots as "the loop's hands" + Verify.

```
[R0] Header (light)
[R1] Hero — light. Golden-hour NuvaTrack hero shot, Display L:
     "Execution, proven." Sub: cleaning as part of the loop. CTA: Get pricing.
[R2] Execution arc loop — DARK. Execute→Verify enlarged; robot dispatch +
     yield-restored verify pulse. Earned dark.
[R3] Compare the families — light. Three product cards side by side
     (NuvaTrack R-Series / U-Series / NuvaSpan): use case, site type, key spec.
[R4] Product detail × 3 — light, vehicle-launch style:
        • Rotating / parallax hardware reveal
        • Animated spec callouts (mono numerals)
        • Autonomy · Smart Scheduling · AI Cleaning Decisions explained
        • Per-product CTA: Get pricing (model pre-selected)
[R5] How robotics closes the loop — light + one dark verify inset.
     Shows clean → measured yield restoration (ties to Platform).
[R6] Technology — light. Autonomy, scheduling logic, AI cleaning decisions
     (small dataviz in shared family).
[R7] Deployment & service — light. Site fit, O&M integration, EPC spec sheets
     (downloadable datasheets — gated optional).
[R8] Final CTA — light, warm-accented. Get pricing (primary) + Talk to sales.
[R9] Footer.
```
Rule: hardware never on pure-black; warm accents on hover/CTA; specs always mono.

---

# PART 9 — Trade Show Visual System (Intersolar et al.)

Carry the light-first system into physical space; the Loop is the recognizable silhouette.

- **Booth:** predominantly light/white architecture (back-lit white walls), with **one dark LED loop wall** as the centerpiece running the ambient Current cycle — readable from 10m. Wordmark + "Autonomous Solar Asset Operations" in Söhne. A live demo station shows the Command Center on a dark screen embedded in light surroundings. Physical NuvaTrack unit displayed under bright product lighting on a light plinth.
- **Lightboxes:** light field photography (robot at golden hour) with a single Current stroke and one mono metric. High brightness, minimal text (≤7 words).
- **Brochures:** light paper, generous margins, Söhne, mono metrics, one Loop diagram spread; legal back cover carries NETRO Sparkle GmbH details. Cool→warm accents on section dividers only.
- **Rollups (roll-up banners):** vertical light layout — top: wordmark + loop mark; middle: one headline + the 5-node loop; bottom: one CTA + QR to demo request. One per business line (Platform = cool emphasis, Robotics = warm emphasis).
- **Business cards:** light card, `ink` type, tiny loop mark; reverse can carry a subtle Current edge stroke. Front = Cleanuva brand + person; small-print footer = NETRO Sparkle GmbH legal name. Mono for contact data.

Print spec: CMYK conversions of `ink`, `cool`, `warm`; the Current gradient as a spot/duotone where budget allows; minimum loop mark size 12mm.

---

# PART 10 — Developer Handoff (Next.js · Tailwind · Framer Motion · shadcn/ui)

## 10.1 Tailwind theme tokens
Add to `tailwind.config.ts` (`theme.extend`):

```ts
colors: {
  canvas:      '#FAFAF8',
  surface:     '#FFFFFF',
  'surface-sunk':'#F0EFEB',
  ink:         '#14181C',
  'ink-2':     '#4A525B',
  'ink-3':     '#79828C',
  line:        '#E4E2DC',
  'line-strong':'#CFCCC4',
  abyss:       '#0E1419',
  'abyss-1':   '#161E26',
  'abyss-2':   '#1F2A33',
  'ink-inv':   '#EDEFF2',
  'ink-inv-2': '#9BA6B0',
  'ink-inv-3': '#6B7680',
  cool:        '#22D3C2',
  'cool-text': '#0A7468',
  'cool-tint': '#E2F7F4',
  warm:        '#FFB347',
  'warm-text': '#9A5200',
  'warm-tint': '#FFF2DF',
  'status-online':   '#22D3C2',
  'status-verified': '#3FD17A',
  'status-warning':  '#F5A623',
  'status-critical': '#FF5247',
},
fontFamily: {
  sans: ['Söhne','Inter','system-ui','sans-serif'],
  mono: ['Söhne Mono','Geist Mono','JetBrains Mono','ui-monospace','monospace'],
},
borderRadius: { sm:'6px', md:'10px', lg:'16px', pill:'999px' }, // brand corner = 6px
boxShadow: {
  s1:'0 1px 2px rgba(20,24,28,.06)',
  s2:'0 8px 24px -8px rgba(20,24,28,.12)',
  lift:'0 24px 60px -20px rgba(20,24,28,.18)',
  // dark uses glow utilities, not shadow:
  'glow-cool':'0 0 0 1px rgba(34,211,194,.16), 0 0 32px -4px rgba(34,211,194,.28)',
  'glow-warm':'0 0 0 1px rgba(255,179,71,.16), 0 0 32px -4px rgba(255,179,71,.28)',
},
backgroundImage: {
  current:'linear-gradient(100deg,#22D3C2 0%,#5FE0B0 38%,#FFC76B 72%,#FF9E2C 100%)',
},
```

Typography via CSS custom props + a small plugin or `@layer` utilities mapping the Part 2 scale (`.text-display-xl` … `.text-caption`). Use `clamp()` for fluid hero sizes:
`--fs-display-xl: clamp(2.5rem, 1.2rem + 5vw, 4.5rem);`

## 10.2 Spacing, layout, breakpoints
- 4px base scale: `1,2,3,4,5,6,8,10,12,16,20,24` (Tailwind defaults are fine; section padding `py-20 md:py-32 lg:py-40`).
- Container: `max-w-[1280px] mx-auto px-6 md:px-8`. Text measure: `max-w-[68ch]`.
- Breakpoints: Tailwind defaults (`sm640 md768 lg1024 xl1280 2xl1536`).
- Light is the document default (`<body className="bg-canvas text-ink">`). Dark zones are **section-scoped**, not a global theme: wrap earned-dark sections in `<section className="bg-abyss text-ink-inv">`. Do **not** ship a global dark-mode toggle for marketing pages — dark is semantic, not user-preference.

## 10.3 Framer Motion tokens
```ts
export const ease = {
  current:  [0.2, 0.6, 0.2, 1],   // standard
  entrance: [0.16, 1, 0.3, 1],    // reveals (easeOutExpo-like)
  exit:     [0.4, 0, 1, 1],
} as const;
export const dur = { micro:0.12, base:0.24, reveal:0.48, cinematic:0.8 } as const;
// loop ambient cycle: 9–12s; demo cycle on inView: 6s.
```
- Scroll reveals: `whileInView`, `viewport={{ once:true, margin:'-15%' }}`, `opacity 0→1` + `y 8px→0`, `dur.reveal`, `ease.entrance`.
- Count-up metrics: animate once on `inView`.
- Loop: a self-contained SVG component with an animated `offset`/`strokeDashoffset` current; respect reduced motion.
- **Reduced motion (required):**
```tsx
const reduce = useReducedMotion();
// if reduce: render loop static snapshot, disable parallax/count-up,
// transitions → opacity-only, dur ≤ 0.12s.
```
- No bounce/spring on brand motion (springs only for tiny UI like toggles). Parallax max translate 24px.

## 10.4 shadcn/ui usage
- Use shadcn primitives (Button, Card, Dialog, Tabs, NavigationMenu, Accordion, Tooltip, Form) but **re-skin to tokens** — override the default zinc/neutral theme with the Part 1 palette in `globals.css` CSS vars.
- **Button** variants: `primary` (bg-ink text-surface; dark zones bg-cool text-abyss), `secondary` (outline ink), `ghost` (text link w/ cool underline). Height 52/48, radius `md`.
- **NavigationMenu** for the mega-menus (Platform two-column, Robotics card grid, Solutions role grid).
- **Tabs** for Robotics "Compare families" and deployment options.
- **Accordion** for FAQ / spec sheets.
- **Form** (react-hook-form + zod) for Demo and Quote — fields on `surface-sunk`, focus ring `cool`, inline validation in `status-critical`. Demo captures role, MWp, region, goal; Quote pre-selects robot model.
- Mention to the user that shadcn/ui is in use (per its attribution).

## 10.5 Next.js structure (App Router)
```
app/
  layout.tsx            // body bg-canvas text-ink, fonts via next/font
  page.tsx              // Home (sections [01]–[11])
  platform/page.tsx
  robotics/
    page.tsx
    [family]/page.tsx   // nuvatrack-r, nuvatrack-u, nuvaspan
  solutions/[role]/page.tsx
  resources/...
  company/
    page.tsx
    legal/(imprint|privacy|terms)/page.tsx
  (forms) request-demo/page.tsx · get-pricing/page.tsx
components/
  loop/Loop.tsx · LoopNode.tsx (SVG + Framer Motion)
  command-center/* (dark, lazy-loaded)
  ui/* (re-skinned shadcn)
  sections/* (Hero, Problem, ProofBand, SolutionsGrid, FinalCTA, Footer)
```
- Fonts via `next/font/local` (Söhne) with Inter as `next/font/google` fallback; preload display weight.
- i18n: `next-intl`, locales `en`/`de`/`ar`; **AR requires RTL** (`dir="rtl"`) — mirror layouts, keep the loop direction semantic (Execute still "forward"). German Impressum/Datenschutz are real legal pages, not machine-translated.
- Dark Command Center components: `dynamic(() => import(...), { ssr:false })` and lazy-load to protect LCP.
- Accessibility floor (CI-gate): visible focus, AA contrast, reduced-motion, keyboard nav, `aria-hidden` on decorative loop, alt text on imagery.
- Perf budget: hero LCP < 2.5s; defer loop animation JS; serve hardware imagery as AVIF/WebP with `next/image`.

## 10.6 The single most important implementation rule
A section is allowed `bg-abyss` **only** if it renders the Loop, the Command Center, telemetry, thermal/drone data, or the Verify proof moment. If a dark section would contain only a headline + button, it must be built light. Dark = "the system is alive." Enforce this in code review.
