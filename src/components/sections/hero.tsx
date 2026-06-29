import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Chip } from "@/components/primitives/chip";
import { HeroBackgroundImage } from "@/components/sections/hero-image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/*
  Homepage Hero — "Intelligence over the field, at scale" (Hero Art Direction
  Brief v1.0). Full-bleed, environment-first, dark-cinematic. The hero is a
  CATEGORY STATEMENT, not a product showcase. Read order: Solar → utility-scale
  → operations → technology → AI.

  Built as separable layers so a real aerial plant asset can drop into the back
  layer later (Step 12) with the data layer + robot re-anchored — no rebuild:
    1. Backdrop  — dawn sky + horizon glow + panel-blue field (CSS)
    2. Field     — perspective rows converging to the horizon (SVG)
    3. DataLayer — restrained cool nodes/threads + one verify pulse (the platform)
    4. Robot     — one small, off-center execution detail
    5. Scrims    — legibility for copy + header safe-area
    6. Copy      — category line, lower-left, over the scene
*/

// Hero keyword chips — the at-a-glance value props under the subline. Warm
// marks the commercial (cost) and differentiator (AI platform) chips.
const CHIPS = [
  { key: "efficient", accent: "cool" },
  { key: "smart", accent: "cool" },
  { key: "deploy", accent: "cool" },
  { key: "mobility", accent: "cool" },
  { key: "cost", accent: "warm" },
  { key: "aiplatform", accent: "warm" },
] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Perspective field geometry — a wide trapezoid narrowing to the horizon.
const FIELD = { w: 1440, h: 560, topL: 600, topR: 840, botL: -260, botR: 1700 };
const ROW_COUNT = 18;
const ROWS = Array.from({ length: ROW_COUNT + 1 }, (_, k) => {
  const p = k / ROW_COUNT;
  return {
    x1: lerp(FIELD.topL, FIELD.topR, p),
    x2: lerp(FIELD.botL, FIELD.botR, p),
  };
});
// Row-breaks compressed toward the horizon (top) for depth.
const BREAK_FS = [0.04, 0.09, 0.15, 0.22, 0.31, 0.42, 0.55, 0.7, 0.86, 1];
const BREAKS = BREAK_FS.map((f) => ({
  x1: lerp(FIELD.topL, FIELD.botL, f),
  x2: lerp(FIELD.topR, FIELD.botR, f),
  y: FIELD.h * f,
}));

// Restrained data layer — sparse, perspective-placed over the field, kept to the
// right of the lower-left copy. ~4–7 nodes total (brief §8).
type Node = { x: number; y: number; kind: "cool" | "verify"; small?: boolean };
const NODES: Node[] = [
  { x: 64, y: 65, kind: "cool" },
  { x: 77, y: 59, kind: "cool" },
  { x: 86, y: 70, kind: "cool", small: true },
  { x: 57, y: 72, kind: "cool", small: true },
  { x: 71, y: 77, kind: "verify" },
];
const ANCHOR = { x: 75, y: 45 }; // notional command point the threads reach toward
const ROBOT = { x: 60, y: 71 }; // one small execution detail, off-center

function Field() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]" aria-hidden>
      <svg
        viewBox={`0 0 ${FIELD.w} ${FIELD.h}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="hero-field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C3A58" />
            <stop offset="28%" stopColor="#224A70" />
            <stop offset="100%" stopColor="#0A1422" />
          </linearGradient>
          <linearGradient id="hero-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0C151F" stopOpacity="0.9" />
            <stop offset="38%" stopColor="#0C151F" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Panel-blue field */}
        <path
          d={`M ${FIELD.botL} ${FIELD.h} L ${FIELD.topL} 0 L ${FIELD.topR} 0 L ${FIELD.botR} ${FIELD.h} Z`}
          fill="url(#hero-field)"
        />
        {/* Converging rows */}
        {ROWS.map((r, i) => (
          <line
            key={`r${i}`}
            x1={r.x1}
            y1={0}
            x2={r.x2}
            y2={FIELD.h}
            stroke="#74A6C8"
            strokeOpacity={0.34}
            strokeWidth={1}
          />
        ))}
        {/* Row-breaks (perspective horizontals) */}
        {BREAKS.map((b, i) => (
          <line
            key={`b${i}`}
            x1={b.x1}
            y1={b.y}
            x2={b.x2}
            y2={b.y}
            stroke="#8FB9D4"
            strokeOpacity={0.12 + i * 0.02}
            strokeWidth={1}
          />
        ))}
        {/* Atmospheric haze fading rows into the horizon */}
        <rect x="0" y="0" width={FIELD.w} height={FIELD.h} fill="url(#hero-haze)" />
      </svg>
    </div>
  );
}

function DataLayer() {
  return (
    <>
      {/* Threads — diegetic, drawn over the field toward the command anchor */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-current" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3C2" />
            <stop offset="60%" stopColor="#5FE0B0" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
        </defs>
        {NODES.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={ANCHOR.x}
            y2={ANCHOR.y}
            stroke={n.kind === "verify" ? "url(#hero-current)" : "#22D3C2"}
            strokeOpacity={n.kind === "verify" ? 0.5 : 0.22}
            strokeWidth={0.18}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Command anchor — faint point where the intelligence converges */}
      <span
        className="pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cool/40"
        style={{ left: `${ANCHOR.x}%`, top: `${ANCHOR.y}%` }}
        aria-hidden
      />

      {/* Nodes — the asset, instrumented */}
      {NODES.map((n, i) => {
        const verify = n.kind === "verify";
        const color = verify ? "bg-status-verified" : "bg-cool";
        return (
          <span
            key={i}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-hidden
          >
            <span
              className={cn("absolute -inset-2.5 animate-ping rounded-full opacity-50", color)}
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <span
              className={cn(
                "relative block rounded-full",
                n.small ? "size-1.5" : "size-2",
                color,
                verify && "shadow-[0_0_12px_2px_rgba(63,209,122,0.6)]",
              )}
            />
          </span>
        );
      })}
    </>
  );
}

function RobotMark() {
  // One small autonomous robot on a single row — a scale reference and an
  // execution detail, never the subject (brief §6). Warm = execution.
  return (
    <span
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${ROBOT.x}%`, top: `${ROBOT.y}%` }}
      aria-hidden
    >
      <span className="block h-1 w-3 rounded-[2px] bg-warm/90 shadow-[0_0_8px_1px_rgba(255,179,71,0.55)]" />
    </span>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  const tCta = useTranslations("Cta");

  return (
    <section
      className="dark relative isolate flex min-h-[640px] w-full items-end overflow-hidden bg-abyss text-ink-inv md:min-h-[88vh]"
      aria-label={t("sceneAlt")}
    >
      {/* 1. Backdrop — dawn sky + warm horizon glow */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(130% 58% at 50% 58%, rgba(255,172,92,0.26) 0%, rgba(255,142,60,0.08) 26%, rgba(255,142,60,0) 48%), linear-gradient(180deg, #0A1018 0%, #0C1622 44%, #15293D 57%, #0C1A28 64%, #0A1320 100%)",
        }}
      />
      {/* Thin horizon glow line */}
      <div
        className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,196,128,0.55),transparent)]"
        style={{ top: "58%" }}
        aria-hidden
      />

      {/* 2. Perspective field */}
      <Field />

      {/* 2b. Real hero background image (Phase IMG-2). Drops into the back layer
           over the synthetic scene when the file exists; renders nothing when it
           is absent, so the CSS/SVG scene above shows through unchanged. The data
           layer, robot, scrims, and copy below always stay on top. */}
      <div className="absolute inset-0" aria-hidden>
        <HeroBackgroundImage src="/images/hero/homepage-hero.jpg" />
      </div>

      {/* 3. Data layer (the platform, diegetic) + 4. robot.
           Mirrored in RTL so the intelligence sits opposite the copy (brief §9). */}
      <div className="absolute inset-0 rtl:-scale-x-100" aria-hidden>
        <DataLayer />
        <RobotMark />
      </div>

      {/* 5. Scrims — copy legibility + header safe-area */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent"
        aria-hidden
      />

      {/* 6. Copy — category statement, lower-left */}
      <Container className="relative z-10 w-full pb-32 md:pb-44">
        <div className="max-w-[640px]">
          {process.env.NEXT_PUBLIC_SHOW_CHIPS === "1" ? (
            <div className="mb-5">
              <Chip accent="cool">utility-scale plant · dawn</Chip>
            </div>
          ) : null}
          <Reveal>
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-display-xl text-balance text-ink-inv">
              <span className="block">{t("headline.line1")}</span>
              <span className="block">
                {t("headline.line2lead")}{" "}
                <span className="text-cool">{t("headline.line2accent")}</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[54ch] text-body-l text-ink-inv-2">
              {t("subline")}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-7 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <Chip key={c.key} accent={c.accent}>
                  {t(`chips.${c.key}`)}
                </Chip>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/get-pricing">{tCta("getQuote")}</Link>
              </Button>
              <Button variant="ghostLink" asChild>
                <Link href="/robotics">{tCta("exploreRobotics")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
