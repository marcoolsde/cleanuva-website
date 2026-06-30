import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Radar, TrendingDown, Lightbulb, ClipboardCheck, Bot, BadgeCheck,
  LayoutDashboard, Bell, Sparkles, ClipboardList, FileCheck, Box, TrendingUp,
  Cloud, Server, Network, Building2, Wrench, Droplet, ShieldCheck, Handshake,
  Check, ArrowRight, RotateCcw, type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "AI O&M Platform — Cleanuva",
  description:
    "Cleanuva Platform is the AI-native operations layer for solar assets: detect production losses, quantify impact, recommend and approve actions, execute with robots or teams, and verify the recovered value.",
};

const SCREENSHOT = "/images/platform/platform-home-screenshot.png";

// Detect → Quantify → Recommend → Approve → Execute → Verify. Accent encodes the
// thesis: software sees it (cool) · teams/robots fix it (warm) · proof (green).
const LOOP: { key: string; Icon: LucideIcon; accent: string }[] = [
  { key: "detect", Icon: Radar, accent: "text-cool" },
  { key: "quantify", Icon: TrendingDown, accent: "text-cool" },
  { key: "recommend", Icon: Lightbulb, accent: "text-cool" },
  { key: "approve", Icon: ClipboardCheck, accent: "text-warm" },
  { key: "execute", Icon: Bot, accent: "text-warm" },
  { key: "verify", Icon: BadgeCheck, accent: "text-status-online" },
];

const CAPS: { key: string; Icon: LucideIcon }[] = [
  { key: "portfolio", Icon: LayoutDashboard },
  { key: "alarms", Icon: Bell },
  { key: "analyst", Icon: Sparkles },
  { key: "workorders", Icon: ClipboardList },
  { key: "dispatch", Icon: Bot },
  { key: "reports", Icon: FileCheck },
  { key: "twin", Icon: Box },
  { key: "economics", Icon: TrendingUp },
];

const HANDOFF = ["s1", "s2", "s3", "s4", "s5"] as const;
const PROOF = ["kwh", "revenue", "beforeafter", "trail", "verification", "evidence"] as const;
const DATA_IN = ["inverter", "alarms", "weather", "inspection", "robotRecords", "workorders"] as const;
const MODES: { key: string; Icon: LucideIcon }[] = [
  { key: "saas", Icon: Cloud },
  { key: "private", Icon: Server },
  { key: "hybrid", Icon: Network },
];
const TRUST = ["gdpr", "rbac", "audit", "ownership"] as const;
const AUDIENCE: { key: string; Icon: LucideIcon }[] = [
  { key: "owners", Icon: Building2 },
  { key: "om", Icon: Wrench },
  { key: "cleaning", Icon: Droplet },
  { key: "epc", Icon: ShieldCheck },
  { key: "partners", Icon: Handshake },
];
const TRIAD = ["t1", "t2", "t3"] as const;

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Platform.page");

  return (
    <>
      {/* 1. Hero — product/system, with the real operations screenshot */}
      <section className="dark relative isolate overflow-hidden bg-abyss text-ink-inv">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_120%_at_85%_0%,#15293D_0%,#0A1320_60%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(80%_80%_at_70%_10%,black,transparent)]" />

        <Container className="relative z-10 grid items-center gap-12 pt-36 pb-16 lg:grid-cols-[1.04fr_1fr] lg:gap-10 lg:pb-20">
          <div>
            <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
            <h1 className="mt-3 text-display-xl text-balance text-ink-inv">{t("hero.title")}</h1>
            <p className="mt-4 max-w-[48ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
            <p className="mt-3 max-w-[56ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="warm" asChild>
                <Link href="/request-demo">{t("hero.cta.demo")}</Link>
              </Button>
              <Button variant="glass" asChild>
                <Link href="/robotics">{t("hero.cta.robotics")}</Link>
              </Button>
              <Button variant="glass" asChild>
                <a href="#operating-loop">{t("hero.cta.loop")}</a>
              </Button>
            </div>

            {/* Thesis triad — software sees · teams/robots fix · proof */}
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {TRIAD.map((k, i) => (
                <div key={k} className="rounded-lg border border-line-inv-strong bg-white/[0.04] p-4">
                  <dt className={"text-[11px] uppercase tracking-[0.12em] " + ["text-cool", "text-warm", "text-status-online"][i]}>
                    {t(`hero.triad.${k}.label`)}
                  </dt>
                  <dd className="mt-1.5 text-body-m font-medium text-ink-inv">{t(`hero.triad.${k}.line`)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Operations screenshot in a system panel (window chrome) */}
          <div className="overflow-hidden rounded-2xl border border-line-inv-strong bg-white/[0.03] shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-line-inv-strong px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="ms-3 text-[11px] uppercase tracking-[0.14em] text-ink-inv-3">{t("hero.panelLabel")}</span>
            </div>
            <MediaFrame
              src={SCREENSHOT}
              alt={t("hero.screenshotAlt")}
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="aspect-[1876/995] w-full"
            />
          </div>
        </Container>
      </section>

      {/* 2. Operating loop — the signature: a closed Detect→Verify cycle */}
      <Section id="operating-loop" tone="dark" className="scroll-mt-20">
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="cool">{t("loop.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink-inv">{t("loop.title")}</h2>
            <p className="mt-3 text-body-l text-ink-inv-2">{t("loop.intro")}</p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {LOOP.map(({ key, Icon, accent }, i) => (
              <li key={key} className="flex flex-col rounded-xl border border-line-inv-strong bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <span className={"font-mono text-body-s " + accent}>{`0${i + 1}`}</span>
                  <Icon className={"size-5 " + accent} aria-hidden />
                </div>
                <h3 className="mt-4 text-h4 text-ink-inv">{t(`loop.steps.${key}.name`)}</h3>
                <p className="mt-2 text-body-s text-ink-inv-3">{t(`loop.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>

          {/* Closure: Verify feeds the next Detect */}
          <div className="mt-6 flex items-center gap-3 rounded-full border border-dashed border-line-inv-strong px-5 py-3 text-body-s text-ink-inv-2">
            <RotateCcw className="size-4 shrink-0 text-status-online" aria-hidden />
            {t("loop.closure")}
          </div>
        </Container>
      </Section>

      {/* 3. What the platform does — capability matrix */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("caps.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("caps.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("caps.intro")}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPS.map(({ key, Icon }) => (
              <div key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <Icon className="size-6 text-cool-text" aria-hidden />
                <h3 className="mt-4 text-h4 text-ink">{t(`caps.items.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`caps.items.${key}.value`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. From insight to action — Platform + Robotics as parallel businesses */}
      <Section>
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="cool">{t("action.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("action.title")}</h2>
          </div>

          {/* Parity panels — equal weight, joined by a handoff */}
          <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col rounded-2xl border border-cool/40 bg-cool-tint/40 p-7">
              <span className="text-eyebrow text-cool-text">{t("action.platform.tag")}</span>
              <h3 className="mt-2 text-h2 text-ink">Cleanuva Platform</h3>
              <p className="mt-2 text-body-m text-ink-2">{t("action.platform.line")}</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-canvas px-4 py-2 text-body-s font-medium text-ink-2">
                {t("action.handoffLabel")}
                <ArrowRight className="size-4 text-warm-text rtl:-scale-x-100" aria-hidden />
              </span>
            </div>
            <div className="flex flex-col rounded-2xl border border-warm/40 bg-warm/5 p-7">
              <span className="text-eyebrow text-warm-text">{t("action.robotics.tag")}</span>
              <h3 className="mt-2 text-h2 text-ink">Cleanuva Robotics</h3>
              <p className="mt-2 text-body-m text-ink-2">{t("action.robotics.line")}</p>
            </div>
          </div>

          {/* The 5-step handoff */}
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {HANDOFF.map((s, i) => (
              <li key={s} className="flex flex-col bg-canvas p-5">
                <span className="font-mono text-body-s text-warm-text">{`0${i + 1}`}</span>
                <p className="mt-3 text-body-s text-ink">{t(`action.steps.${s}`)}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-[70ch] text-body-m text-ink-2">{t("action.note")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/robotics">{t("action.cta.explore")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics/compare">{t("action.cta.compare")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5. Proof and reporting — evidence panel (earned-dark verify beat) */}
      <Section tone="dark">
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="cool">{t("proof.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink-inv">{t("proof.title")}</h2>
            <p className="mt-3 text-body-l text-ink-inv-2">{t("proof.intro")}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            {/* Illustrative before/after panel */}
            <div className="rounded-2xl border border-line-inv-strong bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow text-ink-inv-3">{t("proof.panel.title")}</span>
                <span className="rounded-pill border border-line-inv-strong px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">
                  {t("proof.panel.tag")}
                </span>
              </div>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-body-s text-ink-inv-2">
                    <span>{t("proof.panel.before")}</span><span className="font-mono">94.2%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-status-warning" style={{ width: "94.2%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body-s text-ink-inv-2">
                    <span>{t("proof.panel.after")}</span><span className="font-mono">98.7%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-status-online" style={{ width: "98.7%" }} />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-line-inv-strong pt-4">
                  <span className="text-body-s text-ink-inv-3">{t("proof.panel.recovery")}</span>
                  <span className="font-mono text-h4 text-status-online">≈ +4.5 pp</span>
                </div>
              </div>
            </div>

            {/* Evidence list */}
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {PROOF.map((p) => (
                <li key={p} className="flex items-start gap-3 border-t border-line-inv-strong pt-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-cool" aria-hidden />
                  <span className="text-body-m text-ink-inv">{t(`proof.items.${p}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-body-s text-ink-inv-3">{t("proof.disclaimer")}</p>
        </Container>
      </Section>

      {/* 6. Data and integrations — conservative */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("data.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("data.title")}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-canvas p-7">
              <h3 className="text-h4 text-ink">{t("data.inTitle")}</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {DATA_IN.map((d) => (
                  <li key={d} className="flex items-start gap-3 border-t border-line pt-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cool" />
                    <span className="text-body-m text-ink">{t(`data.in.${d}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-7">
              <h3 className="text-h4 text-ink">{t("data.intTitle")}</h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-cool-text" aria-hidden />
                  <span className="text-body-m text-ink">{t("data.int.solarman")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-3" />
                  <span className="text-body-m text-ink-2">{t("data.int.others")}</span>
                </li>
              </ul>
              <p className="mt-5 text-body-s text-ink-3">{t("data.int.note")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Deployment and trust */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("deploy.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("deploy.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {MODES.map(({ key, Icon }) => (
              <div key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <Icon className="size-6 text-cool-text" aria-hidden />
                <h3 className="mt-4 text-h4 text-ink">{t(`deploy.modes.${key}.name`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`deploy.modes.${key}.note`)}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-3">
            {TRUST.map((k) => (
              <li key={k} className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2 text-body-s text-ink">
                <ShieldCheck className="size-4 text-cool-text" aria-hidden />
                {t(`deploy.trust.${k}`)}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 8. Who it is for */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("audience.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("audience.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map(({ key, Icon }) => (
              <div key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <Icon className="size-6 text-cool-text" aria-hidden />
                <h3 className="mt-4 text-h4 text-ink">{t(`audience.items.${key}.name`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`audience.items.${key}.use`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[720px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("finalCta.cta.demo")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics">{t("finalCta.cta.robotics")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/company">{t("finalCta.cta.contact")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
