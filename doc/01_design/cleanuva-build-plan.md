# Cleanuva — Component Implementation & Build Plan
### For Claude Code · Next.js (App Router) · Tailwind · Framer Motion · shadcn/ui · v1.0

This plan turns the approved design system and the three approved mockups into a component architecture and a step-by-step build sequence. It assumes the tokens from the Brand Design System (`cleanuva-design-system.md`) are the single source of truth. **Do not introduce new colors, type sizes, or a global dark-mode toggle.**

**Three rules that govern the whole build**
1. **Light is the default.** `<body>` is `bg-canvas text-ink`. Dark is applied per-section, never globally.
2. **Earned dark only.** A section may be `bg-abyss` only if it renders one of: the Loop, the Command Center / telemetry, an AI-analysis viz, or the Verify/proof moment. Enforce in review.
3. **One dominant CTA per section.** Demo = primary (ink / cool-on-dark). Robotics pricing = warm. Never two equal buttons except Header + final CTA.

---

## PART A — Foundation primitives (build these first)

These are tiny and reused everywhere. Build before any section.

| Primitive | Purpose | Key notes |
|---|---|---|
| `Section` | Wraps every band; owns vertical rhythm + light/dark | prop `tone: 'light' \| 'dark'`; applies `py-20 md:py-32`, `bg-canvas`/`bg-abyss`, sets text color. The `dark` tone is the single gate for the earned-dark rule — components don't set their own page background. |
| `Container` | Max-width + gutter | `max-w-[1280px] mx-auto px-5 md:px-8`. Text blocks add `max-w-[68ch]`. |
| `Eyebrow` | Mono uppercase label | `font-mono text-[13px] tracking-[0.10em] uppercase`; prop `accent: 'neutral'\|'cool'\|'warm'` → `text-ink3 / text-cool-text / text-warm-text` (on dark → `text-cool/-warm`). |
| `Button` | All CTAs | shadcn Button re-skinned. Variants: `primary`, `warm`, `secondary`, `onDark`, `glass`, `ghostLink`. `h-[52px] rounded-md`. |
| `Chip` | Photo/UI annotation tag (mockup only) | Render only when `process.env.NEXT_PUBLIC_SHOW_CHIPS==='1'`. Strip in production. |
| `PhotoPlate` | Stand-in/wrapper for real imagery | props `src?`, `alt`, `scene` (e.g. `'plant-golden-hour'`), `chip?`. Falls back to a styled gradient block when `src` absent so layout holds before assets land. Uses `next/image` when `src` present. |
| `MetricStat` | Big number + mono label | props `value`, `label`, `accent`. Count-up on `inView` (see Motion). |
| `LoopSVG` | The signature asset, parameterized | props `mode: 'full' \| 'strip' \| 'intel-arc' \| 'exec-arc'`, `animate`. Single component, four render modes. Current gradient + traveling comet. `aria-hidden` decorative; expose label via `role="img"`. |

`Reveal` helper (Framer Motion wrapper): `opacity 0→1`, `y 8→0`, `dur.reveal`, `ease.entrance`, `whileInView once viewport margin -15%`. Respects `useReducedMotion()`.

---

## PART B — Components

For each: purpose · props · layout · light/dark · motion · Tailwind/shadcn notes.

### 1. Header
- **Purpose:** sticky global nav + dual conversion. Five primary links, region switcher, Demo (primary) + Get pricing (secondary).
- **Props:** `currentPath?: string` (active underline), `locale: 'en'|'de'|'ar'`, `nav: NavItem[]`, `transparentOverHero?: boolean`.
- **Layout:** flex row `h-[72px]`, brand left, `navlinks` center (hidden `<980px` → mobile drawer), actions right. Sticky `top-0 z-50`.
- **Light/dark:** always light. `bg-canvas/82 backdrop-blur`. Hairline `border-b` appears only after scroll>10px (toggle `.scrolled`). Active link gets `border-b-2 border-cool` (Platform) / `border-warm` (Robotics).
- **Motion:** border fade-in on scroll (`dur.base`); mega-menu open/fade (`dur.base`, `ease.entrance`); no shrink/parallax.
- **Tailwind/shadcn:** use shadcn `NavigationMenu` for mega-menus (Platform two-column, Robotics card grid, Solutions role grid), `Sheet` for mobile drawer, `DropdownMenu` for region. Brand mark = 22px circle with `bg-[image:var(--current)]`.

### 2. Footer
- **Purpose:** secondary IA + brand/entity seam + legal.
- **Props:** `nav: FooterColumn[]`, `locale`. Legal strip is hard-coded constant (`NETRO Sparkle GmbH …`).
- **Layout:** Tier 1 = 5-col grid (`1.4fr repeat(4,1fr)`, collapses to 2-col `<880px`). Tier 2 = legal strip, `border-t`, smaller `text-ink3`.
- **Light/dark:** always light (`bg-surface`).
- **Motion:** none (links use `Reveal` only if desired).
- **Notes:** legal line **must** include the literal: `Cleanuva is a brand of NETRO Sparkle GmbH.` Imprint/Privacy/Terms links reachable in ≤2 clicks (footer satisfies this). Localize legal to DE for `de` locale.

### 3. Hero (Homepage — physical operating scene)
- **Purpose:** the memorable first impression; software meeting physical execution. Full-bleed plant + robot + drone scan + floating live intelligence card.
- **Props:** `headline`, `sub`, `media: PhotoPlate`, `intel: IntelReadout` (`{label, rows:[{k,v,accent?}]}`), `ctas:[primary,warm]`.
- **Layout:** `.scene` height `84vh min-h-[600px]`; absolutely-positioned scrim + copy (`bottom`, `pb-12`); `Intel` card `absolute right-10 top-24 w-[300px]` (hidden `<980px`). Mobile: scene becomes static block, copy on `bg-abyss`.
- **Light/dark:** the hero photo is image content (warm scene), not an "earned dark" band — the floating Intel card is a dark glass panel (live data → allowed). Copy is white over scrim.
- **Motion:** headline words stagger-rise on load (`stagger 0.04`, `ease.entrance`); cool diagnostic trace draws once; Intel rows fade in sequentially. Reduced-motion → static.
- **Notes:** `Intel` is a reusable dark glass card (`bg-abyss/78 backdrop-blur border-line-inv`). When real hero asset lands, swap `PhotoPlate` `src`; overlays (trace, drone, intel) stay as absolutely-positioned siblings.

### 4. Outcome Ledger
- **Purpose:** state the unit of value (recovered revenue) immediately under the hero. The worked ROI example.
- **Props:** `lead:{eyebrow,title,body}`, `steps: LedgerStep[]` (`{label, value, accent?, variant?:'detect'|'verify'}`).
- **Layout:** card overlapping hero (`-mt-16 relative z-10`), `grid lg:grid-cols-[1.1fr_1.6fr]`. Steps = 6-col strip with internal `border-r` dividers; collapses 3-col then 2-col. `shadow-lift`.
- **Light/dark:** light. `detect` step tinted `bg-cool-tint`, `verify` step `bg-[#E9F9EF]`; ROI/revenue values in `text-warm-text`, verified in `text-verified`.
- **Motion:** `Reveal` on the card; values count-up on `inView` (currency + ×). 
- **Notes:** drive from a typed constant `OUTCOME_EXAMPLE` so Platform page ROI Band reuses the same data. Format currency with `Intl.NumberFormat(locale,{style:'currency',currency:'EUR'})`.

### 5. Business Pillars
- **Purpose:** present Platform + Robotics as equal business lines. Two identical-weight cards.
- **Props:** `eyebrow`, `title`, `pillars: PillarData[]` (length 2).
- **Layout:** `grid md:grid-cols-2 gap-6`. Each pillar = `PlatformCard` (see #7). Equal sizing is mandatory — same aspect-ratio media, same padding.
- **Light/dark:** section light. Platform card's media is a **dark** product-UI plate (earned: Command Center surface); Robotics card's media is a **light** golden-hour robot plate. The contrast itself signals cool-intelligence vs warm-execution.
- **Motion:** both cards `Reveal` with a small stagger (`0.08`); hover lift (`-translate-y-1 shadow-lift`, `dur.base`).
- **Notes:** never let one card grow taller from copy — use `flex flex-col` with `flex-1` body and pinned footer.

### 6. Loop Strip
- **Purpose:** the Loop as connective tissue (not hero). Slim horizontal 5-node current connecting the two pillars.
- **Props:** `mode='strip'` (delegates to `LoopSVG`), `head:{eyebrow,title,body}`, `endTags:[coolLabel,warmLabel]`.
- **Layout:** dark band `py-16`, centered head, full-width SVG `h-[120px]`, labels row beneath, pillar end-tags row.
- **Light/dark:** **dark (earned: the Loop).** Dotted grid background at low opacity.
- **Motion:** current dash flows L→R infinitely (`flow` keyframes, `2.6s linear`); pauses under reduced-motion (static gradient line).
- **Notes:** the SVG `<line>` carries `stroke="url(#current)"` + `filter blur` glow; nodes are static colored circles (cool→warm→verified). Keep total height small — this must read as *supporting*, not the centerpiece.

### 7. Platform Card (reusable Pillar/Product card)
- **Purpose:** the generic card used by Business Pillars and reusable for any product/feature teaser.
- **Props:** `accent:'cool'|'warm'`, `eyebrow`, `title`, `body`, `media: ReactNode|PhotoPlate`, `tags: string[]`, `primaryCta`, `linkCta`.
- **Layout:** `rounded-[14px] border overflow-hidden flex flex-col`; media `aspect-[16/10]`; body `p-7 flex-1`; tags wrap; footer pinned.
- **Light/dark:** card surface light; **media may be dark** when it depicts a live UI (Platform). Tag chips: cool → `bg-cool-tint text-cool-text`, warm → `bg-warm-tint text-warm-text`.
- **Motion:** hover lift; tag/`linkCta` underline-draw on hover.
- **Notes:** this is one component with an `accent` prop — do not fork into two. Cool vs warm is data-driven.

### 8. Robotics Product Hero (Tesla-style launch)
- **Purpose:** cinematic full-bleed launch section per robot family.
- **Props:** `family:{eyebrow,tagline,heading}`, `media: PhotoPlate` (`scene`), `specs: Spec[]` (4 max, `{n,label}`), `ctas:[warm,glass]`, `theme:'day'|'dusk'`.
- **Layout:** `min-h-[640px] h-[92vh] flex items-end`; centered copy; specs bar pinned `bottom-0` with gradient scrim. Mobile: collapses to static block, copy on light, specs on `bg-sunk`.
- **Light/dark:** image content, light-frame rules. `theme:'dusk'` (U-Series) uses a darker *photographic* scene — this is imagery, **not** an earned-dark section, so it's compliant; keep copy legible via scrim.
- **Motion:** heading rise on `inView`; spec numbers count-up; subtle parallax on the media (`max 24px translate`); reduced-motion disables parallax.
- **Notes:** render three instances on the Robotics page from a `ROBOT_FAMILIES` constant (R: "Single operator. Maximum coverage." / U: "Autonomous. Every night." / Span: "Built for utility-scale operations."). Per-family `Button variant="warm"` deep-links to `/get-pricing?model=<id>`.

### 9. ROI Band
- **Purpose:** outcomes-not-dashboards proof on the Platform page; the worked ROI example on a dark band, high up.
- **Props:** same `OUTCOME_EXAMPLE` data as Outcome Ledger + `subline`, `calculatorHref`.
- **Layout:** dark band; top row title + "Open ROI calculator" link; 6-step strip (`grid grid-cols-6`, internal `border-line-inv`), responsive 3→2 col; mono subline.
- **Light/dark:** **dark.** This is acceptable as a "proof/verify" surface — it shows verified operational outcome, not marketing fluff. (If a reviewer objects, it can also be built on `bg-ink` light-page-adjacent; current mockup uses `bg-ink`.) Values: warm for €/×, verified green for outcome.
- **Motion:** values count-up; `Reveal` on strip.
- **Notes:** reuse `MetricStat`-style formatting. Link routes to `/resources/roi-calculator`.

### 10. Command Center Preview
- **Purpose:** the flagship dark operational surface — live portfolio map + work-order rail + activity log.
- **Props:** `head`, `mapNodes: Node[]` (`{x,y,status:'online'|'warn'|'crit'|'warm'}`), `workOrders: WO[]`, `log: LogLine[]`, `cta`.
- **Layout:** dark band; `grid lg:grid-cols-[1.6fr_1fr]`. Left panel = map (`h-[300px]`, grid bg, pinging nodes) + log; right panel = WO rail + on-dark CTA.
- **Light/dark:** **dark (earned: live Command Center).**
- **Motion:** nodes `ping` keyframe (scale+fade, staggered delays); log lines can stream in on `inView`; reduced-motion → static nodes.
- **Notes:** status colors map to tokens (`status-online/-warning/-critical`, warm for execution). WO rail items use left-border accent (cool=queued, warm=executing, verified=done). This is a *preview/mock* of the product, lazy-loaded (`dynamic ssr:false`) so it never blocks LCP.

### 11. CTA Section
- **Purpose:** closing dual-path conversion band.
- **Props:** `title`, `body?`, `ctas: CTA[]` (primary + warm), `accentStroke?: boolean`.
- **Layout:** centered, light, generous `py-28`; optional `current` gradient stroke (`h-[3px] w-[120px]`) above title.
- **Light/dark:** light.
- **Motion:** `Reveal`; stroke can draw in.
- **Notes:** the only place besides Header where Demo + Robotics-pricing sit together with near-equal prominence; Demo still leads visually (primary vs warm).

### 12. Form components
- **Purpose:** the two conversions. `DemoForm` (Platform, qualification-gated) and `QuoteForm` (Robotics, model-preselected). Shared `Field` primitives.
- **Props:**
  - `Field` set: `TextField`, `SelectField`, `RegionField` (EU/MEA/NA), `MWpField` (numeric), `TextArea`.
  - `DemoForm` fields: name, work email, company, role (Owner/IPP/Utility/EPC/O&M/Investor), portfolio size (MWp), region, primary goal, message. 
  - `QuoteForm` fields: name, email, company, site type, region, `model` (prefilled from `?model=`), message.
- **Layout:** single column `max-w-[560px]`; fields on `bg-sunk`; label above input; `h-[52px]` inputs `rounded-md`.
- **Light/dark:** light always. Focus ring `ring-2 ring-cool ring-offset-2`. Errors `text-status-critical` + icon + message (never color-only).
- **Motion:** none beyond focus transitions and inline validation reveal.
- **Tailwind/shadcn:** shadcn `Form` + `Input`/`Select`/`Textarea` with **react-hook-form + zod**. No native `<form>` reliance for validation; submit via server action → CRM/webhook. Min tap target 44px. **Never** auto-submit; show a clear "Request a demo" / "Get pricing" button. Do not store secrets client-side.

---

## PART C — Data & content contracts

Centralize content so pages stay declarative and i18n-ready.

```
content/
  nav.ts            // NAV, FOOTER_COLUMNS, REGIONS
  outcome.ts        // OUTCOME_EXAMPLE (shared by Ledger + ROI Band)
  robots.ts         // ROBOT_FAMILIES (R, U, Span)
  capabilities.ts   // PLATFORM_CAPABILITIES (5 stages)
  metrics.ts        // PROOF_METRICS
  legal.ts          // NETRO Sparkle GmbH constants (placeholders to fill)
messages/
  en.json  de.json  ar.json   // next-intl; legal localized in de.json
```

`legal.ts` placeholders to fill before launch: registered office, Handelsregister court + HRB number, managing director(s), VAT ID. These are unknown — leave as `TODO` constants, do not invent.

---

## PART D — Step-by-step Claude Code build plan

Run in order. Each step lists the instruction, files touched, and an acceptance check.

### Step 0 — Prereqs
- Node ≥ 20, pnpm. Confirm with `node -v`.

### Step 1 — Scaffold
- `pnpm create next-app@latest cleanuva --ts --app --tailwind --eslint --src-dir --import-alias "@/*"`
- **Accept:** dev server runs; `/` renders.

### Step 2 — Dependencies
- `pnpm add framer-motion next-intl react-hook-form zod @hookform/resolvers lucide-react`
- `pnpm dlx shadcn@latest init` then add: `button input select textarea form navigation-menu sheet dropdown-menu accordion tabs tooltip`
- Fonts: place Söhne / Söhne Mono via `next/font/local` (licensed) with `Inter` + `JetBrains Mono` via `next/font/google` as fallback stacks.
- **Accept:** all packages resolve; shadcn components present under `src/components/ui`.

### Step 3 — Design tokens (single source of truth)
- Paste the Tailwind `theme.extend` from the Brand Design System (colors, fontFamily, radius, shadows, `backgroundImage.current`) into `tailwind.config.ts`.
- In `globals.css`: set `body { @apply bg-canvas text-ink font-sans }`; add type-scale utilities (`.text-display-xl` … `.text-caption`) using `clamp()`; add `@media (prefers-reduced-motion: reduce)` to neutralize animations; re-skin shadcn CSS vars to the palette.
- Create `lib/motion.ts` exporting `ease` and `dur` tokens + a `Reveal` component.
- **Accept:** a throwaway page using `bg-abyss`, `text-cool`, `.text-display-xl`, and `bg-[image:var(--current)]` renders with correct values; reduced-motion disables a test animation.

### Step 4 — Foundation primitives (Part A)
- Build `Section`, `Container`, `Eyebrow`, `Button` (variants), `Chip`, `PhotoPlate`, `MetricStat`, `LoopSVG`, `Reveal`.
- **Accept:** a `/_kitchen-sink` route renders every primitive in light and (where relevant) dark; `LoopSVG` renders all four modes; chips hidden when `NEXT_PUBLIC_SHOW_CHIPS` unset.

### Step 5 — Layout shell + i18n + RTL
- `app/[locale]/layout.tsx` with `next-intl` provider, `<Header/>`, `<Footer/>`, `dir={locale==='ar'?'rtl':'ltr'}`, fonts.
- Build `Header` (Part B #1) and `Footer` (#2). Wire `NAV`, `FOOTER_COLUMNS`, `legal.ts`.
- **Accept:** nav + footer render across `/en`, `/de`, `/ar`; AR mirrors layout; legal strip shows the NETRO Sparkle line; mega-menus open.

### Step 6 — Content contracts (Part C)
- Create `content/*` constants and `messages/*.json`. Localize legal in `de.json`.
- **Accept:** importing `OUTCOME_EXAMPLE`, `ROBOT_FAMILIES`, `PLATFORM_CAPABILITIES` type-checks.

### Step 7 — Section components
Build in this order (each into `components/sections/`), verifying against the matching mockup:
1. `Hero` (#3) → check against `01-homepage`.
2. `OutcomeLedger` (#4) → overlap + count-up.
3. `PlatformCard` (#7) then `BusinessPillars` (#5) → equal-weight cards.
4. `LoopStrip` (#6) → earned-dark, flowing current.
5. `ROIBand` (#9) → reuse `OUTCOME_EXAMPLE`.
6. `CommandCenterPreview` (#10) → `dynamic(ssr:false)`, pinging nodes.
7. `RoboticsProductHero` (#8) → three instances from `ROBOT_FAMILIES`.
8. `CTASection` (#11).
- **Accept (per component):** matches mockup composition, hierarchy, and light/dark; respects reduced-motion; passes the earned-dark check (no dark band without live/proof content).

### Step 8 — Page assembly
- `app/[locale]/page.tsx` (Home): Hero → OutcomeLedger → BusinessPillars → LoopStrip → Proof metrics → Solutions roles → Vision → CTASection.
- `app/[locale]/platform/page.tsx`: Hero(split) → ROIBand → intel-arc LoopSVG → capability rows (`PlatformCard`/viz) → CommandCenterPreview → Deployment → Security → CTASection.
- `app/[locale]/robotics/page.tsx`: master RoboticsProductHero → exec-arc LoopStrip → 3× RoboticsProductHero → closes-the-loop verify → compare table → technology → CTASection.
- **Accept:** all three pages scroll-match the approved mockups; light→dark→light transitions land where specified.

### Step 9 — Forms + routes
- Build `Field` primitives, `DemoForm`, `QuoteForm` (Part B #12) with zod schemas.
- Routes: `/request-demo`, `/get-pricing` (reads `?model=`). Submit via a server action stub posting to a configurable webhook/CRM env var.
- **Accept:** validation works; QuoteForm prefills model from query; no secrets in client; keyboard + screen-reader labels correct.

### Step 10 — Motion & reduced-motion pass
- Centralize all animation on `ease`/`dur` tokens and `Reveal`. Add `useReducedMotion()` guards to Hero stagger, count-ups, LoopSVG/CommandCenter animations, parallax.
- **Accept:** with OS "reduce motion" on, no parallax/loop animation/count-up; transitions ≤120ms opacity-only.

### Step 11 — A11y, perf, QA gates (CI)
- A11y: visible focus everywhere; AA contrast (bright accents not used as body text on light); `aria-hidden` on decorative SVG; alt text on all `PhotoPlate src`; landmark roles.
- Perf: Hero LCP < 2.5s; CommandCenter lazy; images AVIF/WebP via `next/image`; defer animation JS.
- Cross-check the **earned-dark rule** in PR review.
- **Accept:** Lighthouse a11y ≥ 95, perf ≥ 90 on Home; axe shows no critical violations.

### Step 12 — Content, imagery, legal finalization
- Replace `PhotoPlate` gradients with real assets per the chip annotations (plant golden-hour hero, robot-in-operation, operator-with-tablet, drone/thermal, product UI screens, three robot-family launches).
- Fill `legal.ts` with real NETRO Sparkle GmbH registration data; build Imprint/Privacy/Terms pages (DE + EN).
- Set `NEXT_PUBLIC_SHOW_CHIPS=0` for production.
- **Accept:** no placeholder chips in prod; Impreint reachable in ≤2 clicks; DE legal present.

---

## File structure (target)

```
src/
  app/[locale]/
    layout.tsx  page.tsx
    platform/page.tsx
    robotics/page.tsx
    solutions/[role]/page.tsx
    request-demo/page.tsx  get-pricing/page.tsx
    company/legal/(imprint|privacy|terms)/page.tsx
  components/
    ui/                # shadcn (re-skinned)
    primitives/        # Section, Container, Eyebrow, Button, Chip, PhotoPlate, MetricStat, Reveal
    loop/LoopSVG.tsx
    sections/          # Hero, OutcomeLedger, BusinessPillars, LoopStrip, PlatformCard,
                       # RoboticsProductHero, ROIBand, CommandCenterPreview, CTASection
    forms/             # Field, DemoForm, QuoteForm
    layout/            # Header, Footer
  content/  messages/  lib/motion.ts
tailwind.config.ts   src/app/globals.css
```

## Definition of done (whole site)
- Light-default; every dark band passes the earned-dark rule.
- Loop reads as connective tissue (strip), not hero.
- Platform + Robotics visually equal on the homepage.
- ROI/recovered-revenue visible in the first two viewports of Home and high on Platform.
- Each robot family has its own launch hero with the approved tagline.
- EN/DE/AR with RTL; legal = NETRO Sparkle GmbH, brand = Cleanuva.
- AA accessibility, reduced-motion, LCP budget met.
