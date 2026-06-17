import { useTranslations } from "next-intl";
import { Truck, ScanSearch, BadgeCheck } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";

const VALUES = [
  { key: "truckRolls", icon: Truck },
  { key: "rca", icon: ScanSearch },
  { key: "revenue", icon: BadgeCheck },
] as const;

function DiagnosisCard() {
  const t = useTranslations("Platform.Hero.diag");
  return (
    // Dark glass over the product-UI plate — live AI diagnosis (earned dark).
    <div className="dark w-[270px] max-w-[80%] rounded-lg border border-line-inv-strong bg-abyss/85 p-5 text-ink-inv shadow-glow-cool backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow text-cool">{t("title")}</span>
        <span className="font-mono text-[13px] text-cool">{t("confidence")}</span>
      </div>
      <dl className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-caption text-ink-inv-2">{t("rootCauseLabel")}</dt>
          <dd className="font-mono text-[13px] text-ink-inv">{t("rootCauseValue")}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-caption text-ink-inv-2">{t("assetLabel")}</dt>
          <dd className="font-mono text-[13px] text-ink-inv">{t("assetValue")}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Platform page hero (build-plan P1) — light-first, cool-dominant. */
export function PlatformHero() {
  const t = useTranslations("Platform.Hero");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light" className="overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-display-l text-balance">{t("headline")}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[54ch] text-body-l text-ink-2">{t("subline")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-col gap-3">
              {VALUES.map(({ key, icon: Icon }) => (
                <li key={key} className="flex items-center gap-3 text-body-m text-ink">
                  <span className="inline-flex size-8 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {t(`values.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/request-demo">{tCta("requestDemo")}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/platform#command-center">{tCta("seeCommandCenter")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Cool product-UI scene with a live diagnosis card */}
        <Reveal delay={0.1} className="relative">
          <PhotoPlate
            alt={t("sceneAlt")}
            src="/images/platform/platform-hero.webp"
            scene="product-ui"
            ratio="aspect-[4/3] sm:aspect-[16/11]"
            chip="command-center · live"
            className="shadow-lift"
          />
          <div className="absolute -bottom-6 right-3 md:-right-6">
            <DiagnosisCard />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
