import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";

// Demoted to a slim trust band (Phase 5A) — keeps the partner/OEM truth so we
// never imply Cleanuva is a hardware manufacturer, without deflating product
// desire with a prominent "we don't make these" section.
const CHIPS = ["partner", "branded", "connected"] as const;

export function RoboticsPartner() {
  const t = useTranslations("Robotics.Partner");

  return (
    <Section tone="light" className="py-14 md:py-16">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[60ch]">
              <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
              <p className="mt-2 text-body-m text-ink-2">{t("line")}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-pill bg-surface-sunk px-3 py-1.5 text-body-s font-medium text-ink-2"
                >
                  {t(`chips.${chip}`)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
