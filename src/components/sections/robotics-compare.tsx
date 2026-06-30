import { useTranslations } from "next-intl";
import * as React from "react";
import { Check, Minus } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";
import {
  COMPARE_MODELS,
  METRIC_FIELDS,
  COMPARE_GROUPS,
  COMPARE_MATRIX,
  CHOOSE_MODELS,
} from "@/content/compare";

/**
 * Robotics compare (P4R-1) — a selection page, not a text page: model selector
 * cards → key decision metrics → grouped feature table → "which should I choose"
 * → CTA. Booleans render as Yes / —; no fabricated numeric specs.
 */
export function RoboticsCompare() {
  const t = useTranslations("Robotics.comparePage");
  const tCta = useTranslations("Cta");

  return (
    <>
      {/* 1. Compare hero */}
      <Section>
        <Container className="max-w-[860px]">
          <Eyebrow accent="warm">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("hero.title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="warm" asChild>
              <Link href="/get-pricing">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/request-demo">{t("hero.talk")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics">{t("hero.back")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 2. Model selector cards */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Eyebrow accent="cool">{t("selector.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("selector.title")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARE_MODELS.map((m) => (
              <Reveal key={m.id} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-canvas">
                  <MediaFrame src={m.image} alt={m.name} sizes="(max-width:640px) 100vw, 320px" className="aspect-[4/3]" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-h4 text-ink">{m.name}</h3>
                    <p className="mt-1 text-body-s text-ink-2">{t(`models.${m.id}.tagline`)}</p>
                    <p className="mt-2 flex-1 text-body-s text-ink-3">{t(`models.${m.id}.fit`)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="warm" size="sm" asChild>
                        <Link href={m.pricingHref}>{tCta("getPricing")}</Link>
                      </Button>
                      <Button variant="ghostLink" size="sm" asChild>
                        <Link href={m.viewHref}>{t("viewProduct")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Key decision metrics */}
      <Section>
        <Container>
          <Eyebrow accent="warm">{t("metrics.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("metrics.title")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARE_MODELS.map((m) => (
              <div key={m.id} className="rounded-xl border border-line bg-canvas p-5">
                <h3 className="text-h4 text-ink">{m.name}</h3>
                <dl className="mt-4 space-y-3">
                  {METRIC_FIELDS.map((f) => (
                    <div key={f}>
                      <dt className="text-eyebrow text-ink-3">{t(`metrics.fields.${f}`)}</dt>
                      <dd className="mt-0.5 text-body-s text-ink">{t(`metrics.${m.id}.${f}`)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Detailed comparison table */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Eyebrow accent="cool">{t("tableEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("tableTitle")}</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="w-[28%] py-4 pe-4" />
                  {COMPARE_MODELS.map((m) => (
                    <th key={m.id} className="py-4 pe-4 text-h4 text-ink">{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_GROUPS.map((g) => (
                  <React.Fragment key={g.key}>
                    <tr className="bg-surface-sunk/50">
                      <th
                        colSpan={1 + COMPARE_MODELS.length}
                        className="py-2.5 pe-4 text-start text-eyebrow text-ink-3"
                      >
                        {t(`groups.${g.key}`)}
                      </th>
                    </tr>
                    {g.rows.map((row) => (
                      <tr key={row} className="border-b border-line">
                        <th className="py-3 pe-4 text-body-s font-normal text-ink-2">{t(`rows.${row}`)}</th>
                        {COMPARE_MODELS.map((m) => {
                          const on = COMPARE_MATRIX[m.id][row];
                          return (
                            <td key={m.id} className="py-3 pe-4">
                              {on ? (
                                <Check className="size-[18px] text-cool-text" aria-label={t("val.yes")} />
                              ) : (
                                <Minus className="size-[18px] text-ink-3/50" aria-label={t("val.no")} />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-body-s text-ink-3">{t("tableNote")}</p>
        </Container>
      </Section>

      {/* 5. Which model should I choose? */}
      <Section>
        <Container>
          <Eyebrow accent="warm">{t("choose.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("choose.title")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CHOOSE_MODELS.map((id) => {
              const model = COMPARE_MODELS.find((m) => m.id === id)!;
              return (
                <div key={id} className="rounded-xl border border-line bg-canvas p-6">
                  <h3 className="text-h4 text-ink">{model.name}</h3>
                  <p className="mt-2 text-body-m text-ink-2">{t(`choose.${id}`)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 6. Compare CTA */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[640px] text-center">
          <h2 className="text-h1 text-balance text-ink">{t("cta.title")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("cta.body")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/get-pricing">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/request-demo">{t("cta.consultation")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
