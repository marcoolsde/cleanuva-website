import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { DATA_SOURCE_CATEGORIES, VENDOR_EXAMPLES } from "@/content/adapters";

/**
 * Works With Your Existing Data (Phase C3). Capability/value framing. Hierarchy:
 * operational-data CATEGORIES are primary; vendor names are a secondary,
 * de-emphasized example line — never an integrations/certification/partner grid.
 */
export function WorksWithData() {
  const t = useTranslations("Platform.WorksWithData");

  const vendors = VENDOR_EXAMPLES.map((v) => t(`vendors.${v}`)).join(", ");

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

        <Reveal delay={0.1}>
          {/* Primary: operational-data categories */}
          <p className="mt-10 text-eyebrow text-ink-3">{t("sourcesHeading")}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {DATA_SOURCE_CATEGORIES.map((key) => (
              <li
                key={key}
                className="inline-flex items-center gap-2.5 rounded-lg border border-line bg-canvas px-4 py-3 text-body-m font-medium text-ink"
              >
                <Check className="size-4 shrink-0 text-cool-text" aria-hidden />
                {t(`categories.${key}`)}
              </li>
            ))}
          </ul>

          {/* Secondary: example monitoring platforms (de-emphasized) */}
          <p className="mt-5 text-caption text-ink-3">
            {t("vendorsLabel")}: {vendors}.
          </p>
          <p className="mt-2 text-caption text-ink-3">{t("foot")}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
