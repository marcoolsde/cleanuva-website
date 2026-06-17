"use client";

import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { MetricStat } from "@/components/primitives/metric-stat";
import { OUTCOME_EXAMPLE, type LedgerStep } from "@/content/outcome";
import { cn } from "@/lib/utils";

function cellTint(variant?: LedgerStep["variant"]) {
  if (variant === "detect") return "bg-cool-tint";
  if (variant === "verify") return "bg-[#E9F9EF]";
  return "bg-surface";
}

const textAccent: Record<string, string> = {
  cool: "text-cool-text",
  warm: "text-warm-text",
  verified: "text-status-verified",
  neutral: "text-ink",
};

export function OutcomeLedger() {
  const t = useTranslations("Outcome");
  const locale = useLocale();

  return (
    // Supporting accountability — the worked example, "where it pays" (no longer
    // the homepage's crown; demoted below the operating model + execution).
    <section className="bg-canvas py-20 md:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-8 rounded-lg border border-line bg-surface p-6 shadow-lift md:p-8 lg:grid-cols-[1.05fr_1.7fr]">
            {/* Lead — the unit of value */}
            <div>
              <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h2">{t("title")}</h2>
              <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
            </div>

            {/* 6-step strip — hairline dividers via gap-px over bg-line */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-line sm:grid-cols-3 lg:grid-cols-6">
              {OUTCOME_EXAMPLE.steps.map((step) => (
                <div
                  key={step.key}
                  className={cn("flex flex-col gap-1 p-5", cellTint(step.variant))}
                >
                  {step.kind === "number" ? (
                    <MetricStat
                      value={step.value}
                      format={step.format}
                      decimals={step.decimals}
                      prefix={step.prefix}
                      accent={step.accent}
                      label={t(`steps.${step.key}`)}
                      locale={locale}
                      currency={OUTCOME_EXAMPLE.currency}
                      size="md"
                    />
                  ) : (
                    <>
                      <span
                        className={cn(
                          "font-mono text-2xl font-medium md:text-3xl",
                          textAccent[step.accent],
                        )}
                      >
                        {t(`values.${step.valueKey}`)}
                        {step.valueKey === "verified" ? " ✓" : ""}
                      </span>
                      <span className="text-eyebrow text-ink-3">
                        {t(`steps.${step.key}`)}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
