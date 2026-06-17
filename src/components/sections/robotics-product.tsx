import { useTranslations } from "next-intl";
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  Moon,
  Crosshair,
  BadgeCheck,
  BatteryCharging,
  Brush,
  ShieldCheck,
  Globe,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";
import {
  type RobotFamily,
  AUTONOMY_KEYS,
  DEPLOYMENT_KEYS,
  CONFIG_KEYS,
} from "@/content/robots";

const AUTONOMY_ICONS = [Bot, BrainCircuit, CalendarClock] as const;
const CONFIG_ICONS: Record<string, typeof BatteryCharging> = {
  batteries: BatteryCharging,
  brushes: Brush,
  warranty: ShieldCheck,
  logistics: Globe,
};

/**
 * Full Tesla-style product page for one robot family (Phase 5B). Product-led,
 * autonomy-forward, premium — with technical credibility and clear specs.
 * Order: hero → key metrics → autonomy → specs → deployment → configuration →
 * platform-connected advantage → CTA.
 */
export function RoboticsProduct({ family }: { family: RobotFamily }) {
  const t = useTranslations("Robotics");
  const tp = useTranslations("Robotics.product");
  const tf = useTranslations(`Robotics.families.${family.key}`);
  const tCta = useTranslations("Cta");

  return (
    <>
      {/* 1. Cinematic hero */}
      <section className="dark relative isolate flex min-h-[560px] w-full items-end overflow-hidden text-ink-inv md:min-h-[80vh]">
        <PhotoPlate fill src={family.image} scene={family.scene} alt={tf("alt")} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/35 to-abyss/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />
        <Container className="relative z-10 pt-28 pb-16 md:pb-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow accent="warm">{family.name}</Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-line-inv-strong bg-white/10 px-2.5 py-1 text-[11px] font-medium text-ink-inv backdrop-blur">
                <span className="size-1.5 rounded-full bg-cool" aria-hidden />
                {t("platformConnected")}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-[20ch] text-display-l text-balance text-ink-inv">
              {tf("tagline")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[54ch] text-body-l text-ink-inv-2">{tf("positioning")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="warm" asChild>
                <Link href={family.pricingHref}>{tCta("getPricing")}</Link>
              </Button>
              {/* Configure → pricing for now; repoints to the configurator in 5C. */}
              <Button variant="glass" asChild>
                <Link href={family.pricingHref}>{tp("configure")}</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Key performance metrics */}
      <Section tone="light">
        <Container>
          <Reveal>
            <Eyebrow accent="warm">{tp("sections.metrics")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
              {family.metrics.map((m) => (
                <div key={m.key}>
                  <dd className="font-mono text-4xl font-medium text-ink md:text-5xl">{m.value}</dd>
                  <dt className="mt-1 text-eyebrow text-ink-3">{t(`specs.${m.key}`)}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Autonomy capabilities */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="warm">{tp("sections.autonomy")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance">{tf("autonomyTitle")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {AUTONOMY_KEYS.map((k, i) => {
              const Icon = AUTONOMY_ICONS[i] ?? Moon;
              return (
                <Reveal key={k} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                    <span className="inline-flex size-11 items-center justify-center rounded-md bg-warm-tint text-warm-text">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-h4">{tf(`autonomy.${k}.title`)}</h3>
                    <p className="mt-2 flex-1 text-body-s text-ink-2">{tf(`autonomy.${k}.desc`)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Technical specifications */}
      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <Eyebrow accent="neutral">{tp("sections.specs")}</Eyebrow>
              <h2 className="mt-3 text-h2">{tp("specsTitle")}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="divide-y divide-line border-t border-line">
              {family.specs.map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="text-body-s text-ink-2">{t(`specs.${s.key}`)}</dt>
                  <dd className="font-mono text-body-s text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 5. Best-fit deployment scenarios */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="neutral">{tp("sections.deployment")}</Eyebrow>
              <h2 className="mt-3 text-h1">{tp("deploymentTitle")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DEPLOYMENT_KEYS.map((k, i) => (
              <Reveal key={k} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                  <Crosshair className="size-5 text-warm-text" aria-hidden />
                  <h3 className="mt-4 text-h4">{tf(`deployment.${k}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{tf(`deployment.${k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Configuration highlights (not the configurator) */}
      <Section tone="light">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="neutral">{tp("sections.config")}</Eyebrow>
              <h2 className="mt-3 text-h1">{tp("configTitle")}</h2>
              <p className="mt-4 measure text-body-m text-ink-2">{tp("configBody")}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {CONFIG_KEYS.map((k, i) => {
              const Icon = CONFIG_ICONS[k];
              return (
                <Reveal key={k} delay={(i % 4) * 0.06}>
                  <div className="flex h-full flex-col bg-canvas p-7">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-surface-sunk text-ink-2">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-h4">{tp(`config.${k}.title`)}</h3>
                    <p className="mt-2 flex-1 text-body-s text-ink-2">{tp(`config.${k}.desc`)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Platform-connected advantage */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="rounded-lg border border-line bg-canvas p-8 md:p-10">
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="size-5 text-cool-text" aria-hidden />
                <Eyebrow accent="cool">{tp("sections.advantage")}</Eyebrow>
              </div>
              <h2 className="mt-3 max-w-[24ch] text-h2">{tp("advantageTitle")}</h2>
              <p className="mt-3 measure text-body-m text-ink-2">{tp("advantageBody")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. CTA */}
      <Section tone="light">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[46ch] text-center">
              <span aria-hidden className="mx-auto block h-[3px] w-[120px] rounded-pill bg-[image:var(--current)]" />
              <h2 className="mt-6 text-display-l text-balance">{tp("ctaTitle")}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-ink-2">{tp("ctaBody")}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button variant="warm" asChild>
                  <Link href={family.pricingHref}>{tCta("getPricing")}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/robotics/compare">{tp("compareModels")}</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
