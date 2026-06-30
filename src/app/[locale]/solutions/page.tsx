import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Building2, Wrench, Droplet, ShieldCheck, Handshake,
  Search, TrendingDown, ListChecks, Bot, BadgeCheck,
  ArrowRight, Check, type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Solutions — Cleanuva",
  description:
    "Cleanuva Solutions combines robotics and AI O&M into scenarios for PV asset owners, O&M teams, cleaning service operators, EPC / warranty teams and distribution partners — from site condition to verified proof.",
};

// Platform-led beats are cool; robotics/field execution is warm. This code runs
// through the whole page so "two business lines combine" stays legible.
const HERO_FLOW = [
  { key: "f1", tone: "neutral" },
  { key: "f2", tone: "cool" },
  { key: "f3", tone: "warm" },
  { key: "f4", tone: "cool" },
] as const;

type Accent = "cool" | "warm";
interface PathCta { label: string; href: string }
interface SolPath { key: string; Icon: LucideIcon; accent: Accent; ctaA: PathCta; ctaB: PathCta }

const PATHS: SolPath[] = [
  { key: "owners", Icon: Building2, accent: "cool", ctaA: { label: "demo", href: "/request-demo" }, ctaB: { label: "platform", href: "/platform" } },
  { key: "om", Icon: Wrench, accent: "cool", ctaA: { label: "platform", href: "/platform" }, ctaB: { label: "demo", href: "/request-demo" } },
  { key: "cleaning", Icon: Droplet, accent: "warm", ctaA: { label: "compare", href: "/robotics/compare" }, ctaB: { label: "pricing", href: "/get-pricing" } },
  { key: "epc", Icon: ShieldCheck, accent: "cool", ctaA: { label: "talk", href: "/company" }, ctaB: { label: "demo", href: "/request-demo" } },
];
const PARTNER: SolPath = { key: "partner", Icon: Handshake, accent: "warm", ctaA: { label: "distribution", href: "/distribution-network" }, ctaB: { label: "contact", href: "/company" } };

const PAINS = ["p1", "p2", "p3", "p4"] as const;
const COMBINE = ["c1", "c2", "c3", "c4"] as const;

const CHOOSE: { key: string; href: string; accent: Accent }[] = [
  { key: "q1", href: "/robotics", accent: "warm" },
  { key: "q2", href: "/platform", accent: "cool" },
  { key: "q3", href: "/platform", accent: "cool" },
  { key: "q4", href: "/robotics/u-series", accent: "warm" },
  { key: "q5", href: "/robotics/nuvaspan", accent: "warm" },
  { key: "q6", href: "/robotics/accessories", accent: "warm" },
];

const LOOP: { key: string; Icon: LucideIcon; accent: string }[] = [
  { key: "s1", Icon: Search, accent: "text-cool-text" },
  { key: "s2", Icon: TrendingDown, accent: "text-cool-text" },
  { key: "s3", Icon: ListChecks, accent: "text-cool-text" },
  { key: "s4", Icon: Bot, accent: "text-warm-text" },
  { key: "s5", Icon: BadgeCheck, accent: "text-cool-text" },
];

const FLEX = ["w1", "w2", "w3", "w4", "w5"] as const;

const MATRIX: { key: string; href: string }[] = [
  { key: "m1", href: "/robotics" },
  { key: "m2", href: "/platform" },
  { key: "m3", href: "/robotics/compare" },
  { key: "m4", href: "/robotics/accessories" },
  { key: "m5", href: "/get-pricing" },
  { key: "m6", href: "/request-demo" },
];

function PathCard({ path, t, wide = false }: { path: SolPath; t: (k: string) => string; wide?: boolean }) {
  const tint = path.accent === "cool" ? "bg-cool-tint text-cool-text" : "bg-warm/10 text-warm-text";
  const checkColor = path.accent === "cool" ? "text-cool-text" : "text-warm-text";
  const { Icon } = path;
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-canvas p-7">
      <div className="flex items-start gap-4">
        <span className={"inline-flex size-11 shrink-0 items-center justify-center rounded-md " + tint}>
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-h3 text-ink">{t(`paths.items.${path.key}.role`)}</h3>
          <p className="mt-0.5 text-body-s text-ink-3">{t(`paths.items.${path.key}.tag`)}</p>
        </div>
      </div>
      <div className={"mt-6 grid flex-1 gap-6 " + (wide ? "lg:grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <p className="text-eyebrow text-ink-3">{t("paths.painLabel")}</p>
          <ul className="mt-3 space-y-2">
            {PAINS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-body-s text-ink-2">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ink-3" />
                {t(`paths.items.${path.key}.pains.${p}`)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow text-ink-3">{t("paths.combineLabel")}</p>
          <ul className="mt-3 space-y-2">
            {COMBINE.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-body-s text-ink">
                <Check className={"mt-0.5 size-4 shrink-0 " + checkColor} aria-hidden />
                {t(`paths.items.${path.key}.combine.${c}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button variant="secondary" asChild>
          <Link href={path.ctaA.href}>{t(`cta.${path.ctaA.label}`)}</Link>
        </Button>
        <Button variant="ghostLink" asChild>
          <Link href={path.ctaB.href}>{t(`cta.${path.ctaB.label}`)}</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Solutions.page");

  return (
    <>
      {/* 1. Hero — scenario entry, with the solution flow as the thesis */}
      <section className="dark relative isolate overflow-hidden bg-abyss text-ink-inv">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,#15293D_0%,#0A1320_60%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(80%_80%_at_30%_0%,black,transparent)]" />

        <Container className="relative z-10 pt-36 pb-16 lg:pb-20">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 max-w-[20ch] text-display-xl text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[54ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[64ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <a href="#solution-paths">{t("hero.cta.explore")}</a>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics">{t("hero.cta.robotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/request-demo">{t("hero.cta.demo")}</Link>
            </Button>
          </div>

          {/* Signature: the combined solution flow */}
          <ol className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {HERO_FLOW.map((b, i) => (
              <li key={b.key} className="contents">
                <div className="flex h-full flex-col rounded-xl border border-line-inv-strong bg-white/[0.04] p-5">
                  <span
                    className={
                      "text-[11px] uppercase tracking-[0.12em] " +
                      (b.tone === "cool" ? "text-cool" : b.tone === "warm" ? "text-warm" : "text-ink-inv-3")
                    }
                  >
                    {t(`hero.flow.${b.key}.owner`)}
                  </span>
                  <span className="mt-1.5 text-body-m font-medium text-ink-inv">{t(`hero.flow.${b.key}.label`)}</span>
                </div>
                {i < HERO_FLOW.length - 1 ? (
                  <div className="flex items-center justify-center text-ink-inv-3" aria-hidden>
                    <ArrowRight className="size-4 rotate-90 lg:rotate-0 rtl:-scale-x-100" />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 2. Solution paths — by customer scenario */}
      <Section id="solution-paths" tone="light" className="scroll-mt-20 bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("paths.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("paths.title")}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {PATHS.map((p) => (
              <PathCard key={p.key} path={p} t={t} />
            ))}
          </div>
          {/* Distributors / partners — channel audience, full-width band */}
          <div className="mt-6">
            <PathCard path={PARTNER} t={t} wide />
          </div>
        </Container>
      </Section>

      {/* 3. Choose by problem */}
      <Section>
        <Container className="max-w-[940px]">
          <Eyebrow accent="cool">{t("choose.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("choose.title")}</h2>
          <ul className="mt-8">
            {CHOOSE.map((c) => (
              <li key={c.key} className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex flex-wrap items-center gap-3 text-body-l text-ink">
                  <span className="text-ink-2">{t(`choose.items.${c.key}.need`)}</span>
                  <ArrowRight className="size-4 shrink-0 text-ink-3 rtl:-scale-x-100" aria-hidden />
                  <span className={"font-medium " + (c.accent === "cool" ? "text-cool-text" : "text-warm-text")}>
                    {t(`choose.items.${c.key}.target`)}
                  </span>
                </p>
                <Button variant="ghostLink" asChild>
                  <Link href={c.href}>{t("choose.view")}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Platform + Robotics solution loop */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="warm">{t("loop.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("loop.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("loop.intro")}</p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {LOOP.map(({ key, Icon, accent }, i) => (
              <li key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <div className="flex items-center justify-between">
                  <span className={"font-mono text-body-s " + accent}>{`0${i + 1}`}</span>
                  <Icon className={"size-5 " + accent} aria-hidden />
                </div>
                <h3 className="mt-4 text-h4 text-ink">{t(`loop.steps.${key}.name`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`loop.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5. Regional / deployment flexibility */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("flex.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("flex.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FLEX.map((w) => (
              <div key={w} className="flex items-start gap-3 rounded-xl border border-line bg-canvas p-6">
                <Check className="mt-0.5 size-5 shrink-0 text-cool-text" aria-hidden />
                <div>
                  <h3 className="text-h4 text-ink">{t(`flex.items.${w}.name`)}</h3>
                  <p className="mt-1.5 text-body-s text-ink-2">{t(`flex.items.${w}.note`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Solution CTA matrix */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("matrix.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("matrix.title")}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MATRIX.map((m) => (
              <Link
                key={m.key}
                href={m.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-cool/50"
              >
                <div>
                  <p className="text-body-m font-medium text-ink">{t(`matrix.items.${m.key}.need`)}</p>
                  <p className="mt-1 text-body-s text-cool-text">{t(`matrix.items.${m.key}.action`)}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[760px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("cta.demo")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/get-pricing">{t("cta.pricing")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/company">{t("cta.contact")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
