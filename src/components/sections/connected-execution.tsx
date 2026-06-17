import { useTranslations } from "next-intl";
import { Bot, Radar, HardHat, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { EXECUTION_LAYERS, type ExecutionLayer } from "@/content/execution";
import { cn } from "@/lib/utils";

const ICONS: Record<ExecutionLayer["icon"], typeof Bot> = { Bot, Radar, HardHat };

const accentIcon: Record<ExecutionLayer["accent"], string> = {
  warm: "bg-warm-tint text-warm-text",
  cool: "bg-cool-tint text-cool-text",
  neutral: "bg-surface-sunk text-ink-2",
};

/**
 * Connected execution (positioning-v1 §3.4/§3.5). The platform commands the
 * execution; robots/drones/crews connect as options. Robotics is the flagship
 * and a first-class commercial offering — but one layer, not the identity.
 */
export function ConnectedExecution() {
  const t = useTranslations("Execution");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[62ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EXECUTION_LAYERS.map((layer, i) => {
            const Icon = ICONS[layer.icon];
            return (
              <Reveal key={layer.key} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-7">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-md",
                        accentIcon[layer.accent],
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span
                      className={cn(
                        "rounded-pill px-2.5 py-1 text-eyebrow",
                        layer.status === "now"
                          ? "bg-cool-tint text-cool-text"
                          : "bg-surface-sunk text-ink-3",
                      )}
                    >
                      {t(`status.${layer.status}`)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-h4">{t(`layers.${layer.key}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`layers.${layer.key}.desc`)}
                  </p>
                  {layer.cta && layer.href ? (
                    <div className="mt-6">
                      <Link
                        href={layer.href}
                        className="inline-flex items-center gap-1.5 text-[15px] font-medium text-warm-text transition-all hover:gap-2.5"
                      >
                        {t(`layers.${layer.key}.cta`)}
                        <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Robotics stays a first-class commercial path. */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <Link
              href="/get-pricing"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-warm-text transition-all hover:gap-2.5"
            >
              {tCta("getRoboticsPricing")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
