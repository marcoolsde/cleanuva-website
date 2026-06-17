import { useTranslations } from "next-intl";
import { Cable, Workflow, Brain, FileQuestion } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { FRAGMENTATION_ITEMS, type FragmentationItem } from "@/content/fragmentation";

const ICONS: Record<FragmentationItem["icon"], typeof Cable> = {
  Cable,
  Workflow,
  Brain,
  FileQuestion,
};

/** The fragmentation problem — the opening beat. The enemy is fragmentation. */
export function Fragmentation() {
  const t = useTranslations("Fragmentation");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {FRAGMENTATION_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.key} delay={(i % 2) * 0.06}>
                <div className="flex h-full gap-4 bg-canvas p-7">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-sunk text-ink-3">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h4">{t(`items.${item.key}.title`)}</h3>
                    <p className="mt-1.5 text-body-s text-ink-2">
                      {t(`items.${item.key}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-h3 text-ink">
            {t("leadOut")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
