"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { MetricStat } from "@/components/primitives/metric-stat";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { OUTCOME_EXAMPLE } from "@/content/outcome";
import { cn } from "@/lib/utils";

// On dark, accent text uses the bright tokens; detect/verify cells get a faint
// tint so the worked example reads as a live, verified operational outcome.
const textAccent: Record<string, string> = {
  cool: "text-cool",
  warm: "text-warm",
  verified: "text-status-verified",
  neutral: "text-ink-inv",
};

function cellTint(variant?: "detect" | "verify") {
  if (variant === "detect") return "bg-cool/10";
  if (variant === "verify") return "bg-status-verified/10";
  return "bg-abyss-1";
}

/**
 * ROI Band (build-plan #9) — the worked ROI example on an earned-dark band.
 * Reuses the SAME OUTCOME_EXAMPLE as the homepage Outcome Ledger. This is the
 * ROI deep-dive home (the homepage no longer repeats it).
 */
export function RoiBand() {
  const t = useTranslations("Platform.Roi");
  const tOut = useTranslations("Outcome");
  const locale = useLocale();

  return (
    <section id="proof" className="dark bg-abyss py-20 text-ink-inv md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[52ch]">
              <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-ink-inv">{t("title")}</h2>
            </div>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-cool transition-all hover:gap-2.5"
            >
              {t("calculatorCta")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line-inv bg-line-inv sm:grid-cols-3 lg:grid-cols-6">
            {OUTCOME_EXAMPLE.steps.map((step) => (
              <div key={step.key} className={cn("flex flex-col gap-1 p-5", cellTint(step.variant))}>
                {step.kind === "number" ? (
                  <MetricStat
                    value={step.value}
                    format={step.format}
                    decimals={step.decimals}
                    prefix={step.prefix}
                    accent={step.accent}
                    label={tOut(`steps.${step.key}`)}
                    locale={locale}
                    currency={OUTCOME_EXAMPLE.currency}
                    size="md"
                  />
                ) : (
                  <>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 font-mono text-2xl font-medium md:text-3xl",
                        textAccent[step.accent],
                      )}
                    >
                      {step.valueKey === "verified" ? (
                        <BadgeCheck className="size-6" aria-hidden />
                      ) : null}
                      {tOut(`values.${step.valueKey}`)}
                    </span>
                    <span className="text-eyebrow text-ink-inv-3">
                      {tOut(`steps.${step.key}`)}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 font-mono text-[13px] text-ink-inv-3">{t("subline")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
