import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";

const STEPS = ["detect", "clean", "verify", "prove"] as const;

/**
 * Compact proof band (P0C) — replaces the heavier Outcome/Proof run with one
 * detect → clean → verify → prove strip. No ROI figures or customer claims.
 */
export function ProofImpact() {
  const t = useTranslations("ProofImpact");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <div className="mx-auto max-w-[56ch] text-center">
          <Reveal>
            <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance">{t("title")}</h2>
            <p className="mt-4 text-body-l text-ink-2">{t("body")}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                <span className="text-loop text-warm-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-h4">{t(`steps.${s}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`steps.${s}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
