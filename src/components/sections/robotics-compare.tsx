import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { ROBOT_FAMILIES, type RobotFamily } from "@/content/robots";

const COMPARE_ROWS = [
  "coverage",
  "operators",
  "water",
  "uptime",
  "cleaning",
  "navigation",
  "power",
] as const;

function specMap(family: RobotFamily): Record<string, string> {
  return Object.fromEntries(
    [...family.metrics, ...family.specs].map((s) => [s.key, s.value]),
  );
}

export function RoboticsCompare() {
  const t = useTranslations("Robotics.compare");
  const ts = useTranslations("Robotics.specs");
  const tr = useTranslations("Robotics");
  const tCta = useTranslations("Cta");

  const maps = ROBOT_FAMILIES.map((f) => ({ family: f, values: specMap(f) }));

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
            <h1 className="mt-3 text-h1">{t("title")}</h1>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line align-bottom">
                  <th className="w-[180px] py-4 pe-4" />
                  {maps.map(({ family }) => (
                    <th key={family.id} className="py-4 pe-4 align-bottom">
                      <span className="text-h4">{family.name}</span>
                      <span className="mt-1 block text-body-s font-normal text-ink-2">
                        {tr(`families.${family.key}.tagline`)}
                      </span>
                      <Link
                        href={`/robotics/${family.slug}`}
                        className="mt-2 inline-block text-[14px] font-medium text-warm-text hover:underline"
                      >
                        {t("viewProduct")} →
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                {/* Best-fit guidance */}
                <tr className="border-b border-line bg-surface-sunk/40">
                  <th className="py-4 pe-4 text-eyebrow text-ink-3">{t("bestFitLabel")}</th>
                  {maps.map(({ family }) => (
                    <td key={family.id} className="py-4 pe-4 text-body-s text-ink-2">
                      {tr(`families.${family.key}.bestFit`)}
                    </td>
                  ))}
                </tr>
                {/* Spec rows */}
                {COMPARE_ROWS.map((row) => (
                  <tr key={row} className="border-b border-line">
                    <th className="py-3.5 pe-4 text-body-s font-normal text-ink-3">
                      {ts(row)}
                    </th>
                    {maps.map(({ family, values }) => (
                      <td
                        key={family.id}
                        className="py-3.5 pe-4 font-mono text-body-s text-ink"
                      >
                        {values[row] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pt-5" />
                  {maps.map(({ family }) => (
                    <td key={family.id} className="pt-5 pe-4">
                      <Button variant="warm" size="sm" asChild>
                        <Link href={family.pricingHref}>{tCta("getPricing")}</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-body-s text-ink-3">{t("configNote")}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
