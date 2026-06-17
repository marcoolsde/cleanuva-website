import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";

/**
 * Robotics overview hero (Phase 5A) — product-led and autonomy-forward. Full-
 * bleed cinematic (matches the homepage/product-hero grammar), not a SaaS split.
 * Autonomy is the headline; platform-connection is the advantage, not a leash.
 */
export function RoboticsHero() {
  const t = useTranslations("Robotics.Hero");
  const tCta = useTranslations("Cta");

  return (
    <section className="dark relative isolate flex min-h-[600px] w-full items-end overflow-hidden text-ink-inv md:min-h-[86vh]">
      {/* Full-bleed scene */}
      <PhotoPlate
        fill
        src="/images/robotics/overview-hero.jpg"
        scene="robot-in-operation"
        alt={t("sceneAlt")}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/35 to-abyss/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent"
      />

      <Container className="relative z-10 pt-28 pb-20 md:pb-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-pill border border-line-inv-strong bg-white/10 px-3 py-1.5 text-[12px] font-medium text-ink-inv backdrop-blur">
            <span className="size-2 animate-pulse rounded-full bg-status-online" aria-hidden />
            {t("autonomousTag")}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <Eyebrow accent="warm" className="mt-5">
            {t("eyebrow")}
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-3 max-w-[20ch] text-display-xl text-balance text-ink-inv">
            {t("headline")}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-[54ch] text-body-l text-ink-inv-2">{t("subline")}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/get-pricing">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics#fleet">{t("meetFleet")}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
