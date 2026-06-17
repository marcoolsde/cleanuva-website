import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/content/faq";

/**
 * Platform FAQ (Phase C3). Lightweight objection-handling (max 5, short
 * answers) — not documentation. Section inside the Platform page; no new route.
 */
export function PlatformFaq() {
  const t = useTranslations("Platform.Faq");

  return (
    <Section tone="light" className="bg-surface">
      <Container className="max-w-[760px]">
        <Reveal>
          <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1">{t("title")}</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQ_ITEMS.map((key) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="text-left text-h4">
                  {t(`items.${key}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-body-m text-ink-2">
                  {t(`items.${key}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
