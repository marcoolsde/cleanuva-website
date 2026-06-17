import { useTranslations } from "next-intl";
import { Radar, Thermometer, ScanSearch, Layers, Bot } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { ROADMAP_ITEMS, type RoadmapItem } from "@/content/roadmap";

const ICONS: Record<RoadmapItem["icon"], typeof Radar> = {
  Radar,
  Thermometer,
  ScanSearch,
  Layers,
  Bot,
};

/**
 * Vision / roadmap (build-plan [08]). Ambition signal — every card is visibly
 * "on the roadmap" (dashed frame + Roadmap badge + muted icon), never dressed
 * up as generally available. No overpromising.
 */
export function VisionRoadmap() {
  const t = useTranslations("Vision");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ROADMAP_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.key} delay={(i % 5) * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-dashed border-line-strong bg-canvas p-5">
                  <span className="inline-flex w-fit items-center rounded-pill bg-surface-sunk px-2.5 py-1 text-eyebrow text-ink-3">
                    {t("badge")}
                  </span>
                  <Icon className="mt-5 size-6 text-ink-3" aria-hidden />
                  <h3 className="mt-3 text-h4">{t(`items.${item.key}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`items.${item.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
