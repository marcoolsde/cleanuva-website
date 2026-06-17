import { useTranslations } from "next-intl";
import { BrainCircuit, Network, BadgeCheck, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { OPERATING_LAYERS, type OperatingLayer } from "@/content/operating-model";
import { cn } from "@/lib/utils";

const ICONS: Record<OperatingLayer["icon"], typeof BrainCircuit> = {
  BrainCircuit,
  Network,
  BadgeCheck,
};

const accentIcon: Record<OperatingLayer["accent"], string> = {
  cool: "bg-cool-tint text-cool-text",
  verified: "bg-[#E9F9EF] text-status-verified",
};

const accentText: Record<OperatingLayer["accent"], string> = {
  cool: "text-cool-text",
  verified: "text-status-verified",
};

/**
 * The three-layer operating model — the narrative backbone (positioning-v1
 * §Part 2). Replaces the old equal-pillars section. Intelligence → Coordination
 * → Accountability, read left-to-right as one connected system.
 */
export function OperatingModel() {
  const t = useTranslations("OperatingModel");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-x-4 gap-y-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {OPERATING_LAYERS.map((layer, i) => {
            const Icon = ICONS[layer.icon];
            return (
              <div key={layer.key} className="contents">
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "inline-flex size-11 items-center justify-center rounded-md",
                          accentIcon[layer.accent],
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-2xl font-medium text-ink-3">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-h4">{t(`layers.${layer.key}.title`)}</h3>
                    <p className="mt-2 flex-1 text-body-s text-ink-2">
                      {t(`layers.${layer.key}.desc`)}
                    </p>
                    <p className={cn("mt-5 text-loop", accentText[layer.accent])}>
                      {t(`layers.${layer.key}.tangible`)}
                    </p>
                  </div>
                </Reveal>

                {i < OPERATING_LAYERS.length - 1 ? (
                  <div className="flex items-center justify-center text-ink-3">
                    <ArrowRight className="hidden size-6 rtl:rotate-180 lg:block" aria-hidden />
                    <ArrowRight className="size-6 rotate-90 lg:hidden" aria-hidden />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
