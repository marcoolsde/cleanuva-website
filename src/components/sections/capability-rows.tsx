import { useTranslations } from "next-intl";
import {
  Activity,
  Stethoscope,
  LineChart,
  Network,
  ClipboardList,
  Bot,
  BadgeCheck,
  FileText,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import {
  PLATFORM_CAPABILITIES,
  CAPABILITY_LAYERS,
  type Capability,
  type CapabilityAccent,
  type OperatingModelLayer,
} from "@/content/capabilities";
import { cn } from "@/lib/utils";

const ICONS: Record<Capability["icon"], typeof Activity> = {
  Activity,
  Stethoscope,
  LineChart,
  Network,
  ClipboardList,
  Bot,
  BadgeCheck,
  FileText,
};

const accentIcon: Record<CapabilityAccent, string> = {
  cool: "bg-cool-tint text-cool-text",
  warm: "bg-warm-tint text-warm-text",
  verified: "bg-[#E9F9EF] text-status-verified",
};

const accentText: Record<CapabilityAccent, string> = {
  cool: "text-cool-text",
  warm: "text-warm-text",
  verified: "text-status-verified",
};

const layerDot: Record<OperatingModelLayer, string> = {
  intelligence: "bg-cool",
  coordination: "bg-warm",
  accountability: "bg-status-verified",
};

/**
 * Capability rows (build-plan P3) — grouped by the three operating-model layers
 * (Intelligence → Coordination → Accountability). Each card opens with the
 * outcome and closes with a proof line — business value, not mechanism.
 */
export function CapabilityRows() {
  const t = useTranslations("Platform.Capabilities");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-10">
          {CAPABILITY_LAYERS.map((layer) => {
            const items = PLATFORM_CAPABILITIES.filter((c) => c.layer === layer);
            return (
              <div key={layer}>
                <Reveal>
                  <div className="flex items-center gap-2.5">
                    <span className={cn("size-2.5 rounded-full", layerDot[layer])} aria-hidden />
                    <h3 className="text-loop text-ink-2">{t(`groups.${layer}`)}</h3>
                  </div>
                </Reveal>
                <div className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                  {items.map((cap, i) => {
                    const Icon = ICONS[cap.icon];
                    return (
                      <Reveal key={cap.key} delay={(i % 2) * 0.06}>
                        <div className="flex h-full flex-col bg-canvas p-7">
                          <span
                            className={cn(
                              "inline-flex size-10 items-center justify-center rounded-md",
                              accentIcon[cap.accent],
                            )}
                          >
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <h4 className="mt-4 text-h4">{t(`items.${cap.key}.title`)}</h4>
                          <p className="mt-2 flex-1 text-body-s text-ink-2">
                            {t(`items.${cap.key}.outcome`)}
                          </p>
                          <p
                            className={cn(
                              "mt-4 font-mono text-[13px] font-medium",
                              accentText[cap.accent],
                            )}
                          >
                            {t(`items.${cap.key}.proof`)}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
