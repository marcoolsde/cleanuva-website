import { useTranslations } from "next-intl";
import { Bot, BrainCircuit, CalendarClock, Moon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";

// Autonomy is the core product narrative (Phase 5A): unmanned, AI-assisted,
// intelligently scheduled, every night.
const PILLARS = [
  { key: "unmanned", icon: Bot },
  { key: "ai", icon: BrainCircuit },
  { key: "scheduling", icon: CalendarClock },
  { key: "nightly", icon: Moon },
] as const;

export function RoboticsAutonomy() {
  const t = useTranslations("Robotics.Autonomy");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.key} delay={(i % 4) * 0.06}>
                <div className="flex h-full flex-col bg-canvas p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-warm-tint text-warm-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4">{t(`items.${pillar.key}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`items.${pillar.key}.desc`)}
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
