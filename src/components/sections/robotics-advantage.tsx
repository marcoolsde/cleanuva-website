import { useTranslations } from "next-intl";
import { CalendarClock, Crosshair, BadgeCheck } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";

// Platform-connection as the ADVANTAGE (not a leash): a connected robot knows
// when to clean, where it pays, and proves the result — vs blind hardware.
const ITEMS = [
  { key: "knowsWhen", icon: CalendarClock },
  { key: "cleansWhere", icon: Crosshair },
  { key: "provesIt", icon: BadgeCheck },
] as const;

export function RoboticsAdvantage() {
  const t = useTranslations("Robotics.Advantage");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4">{t(`items.${item.key}.title`)}</h3>
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
