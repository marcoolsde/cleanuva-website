import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { MetricStat } from "@/components/primitives/metric-stat";
import { PROOF_METRICS } from "@/content/metrics";

/** Credibility band (build-plan [06]) — business outcomes, count-up on view. */
export function ProofMetrics() {
  const t = useTranslations("Proof");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {PROOF_METRICS.map((metric) => (
            <MetricStat
              key={metric.key}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              decimals={metric.decimals}
              accent={metric.accent}
              label={t(`items.${metric.key}`)}
            />
          ))}
        </div>

        <p className="mt-10 text-caption text-ink-3">{t("note")}</p>
      </Container>
    </Section>
  );
}
