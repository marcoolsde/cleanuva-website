import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";
import { type RobotFamily } from "@/content/robots";

/**
 * Tesla-style product launch hero (build-plan #8). Full-bleed cinematic section
 * per family — hardware as the protagonist, a short spec strip, one dominant
 * warm CTA. Rendered three times from ROBOT_FAMILIES. Not a product card.
 */
export function RoboticsProductHero({ family }: { family: RobotFamily }) {
  const t = useTranslations("Robotics");

  return (
    <section
      id={family.slug}
      className="dark relative isolate flex min-h-[600px] scroll-mt-20 items-end overflow-hidden text-ink-inv md:min-h-[680px]"
    >
      {/* Full-bleed scene (golden hour / dusk / utility-scale) */}
      <PhotoPlate fill src={family.image} scene={family.scene} alt={t(`families.${family.key}.alt`)} />
      {/* Legibility scrim — hardware stays bright, copy stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/35 to-abyss/5"
      />

      <Container className="relative z-10 pt-24 pb-12 md:pb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow accent="warm">{family.name}</Eyebrow>
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-line-inv-strong bg-white/10 px-2.5 py-1 text-[11px] font-medium text-ink-inv backdrop-blur">
              <span className="size-1.5 rounded-full bg-cool" aria-hidden />
              {t("platformConnected")}
            </span>
          </div>
          <h3 className="mt-3 max-w-[18ch] text-display-l text-balance text-ink-inv">
            {t(`families.${family.key}.tagline`)}
          </h3>
          <p className="mt-4 max-w-[52ch] text-body-l text-ink-inv-2">
            {t(`families.${family.key}.line`)}
          </p>
        </Reveal>

        {/* Headline metrics strip (4) — full specs live on the product page */}
        <Reveal delay={0.1}>
          <dl className="mt-8 grid max-w-[680px] grid-cols-2 gap-px overflow-hidden rounded-lg border border-line-inv bg-line-inv sm:grid-cols-4">
            {family.metrics.map((metric) => (
              <div key={metric.key} className="bg-abyss/70 p-4 backdrop-blur">
                <dd className="font-mono text-lg font-medium text-ink-inv">{metric.value}</dd>
                <dt className="mt-1 text-eyebrow text-ink-inv-3">{t(`specs.${metric.key}`)}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="warm" asChild>
              <Link href={`/robotics/${family.slug}`}>{t("viewDetails")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href={family.pricingHref}>{t(`families.${family.key}.cta`)}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
