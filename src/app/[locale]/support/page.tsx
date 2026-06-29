import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText, Wrench, ShieldCheck, Cpu } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Support — Cleanuva",
  description:
    "Support entry for product information, documentation, service questions and after-sales communication — Cleanuva robotics, accessories and AI-supported PV operations.",
};

const AREAS = [
  { key: "docs", icon: FileText },
  { key: "accessories", icon: Wrench },
  { key: "warranty", icon: ShieldCheck },
  { key: "platform", icon: Cpu },
] as const;
const FAQ = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;
const MATERIALS = ["datasheets", "brochures", "manuals", "certificates"] as const;

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Support");

  return (
    <>
      {/* Hero */}
      <Section>
        <Container className="max-w-[860px]">
          <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("contactSupport")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/robotics/accessories">{t("viewAccessories")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Support areas */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Eyebrow accent="warm">{t("areas.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("areas.heading")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map(({ key, icon: Icon }) => (
              <div key={key} className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-warm-tint text-warm-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h4 text-ink">{t(`areas.cards.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`areas.cards.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-[760px]">
          <Eyebrow accent="cool">{t("faq.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("faq.heading")}</h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQ.map((k) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger className="text-left text-h4">
                  {t(`faq.items.${k}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-body-m text-ink-2">
                  {t(`faq.items.${k}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* Materials — on request only (no fake downloads) */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[760px]">
          <Eyebrow accent="warm">{t("materials.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("materials.heading")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("materials.body")}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {MATERIALS.map((m) => (
              <li key={m} className="flex items-center justify-between gap-4 py-4">
                <span className="text-body-m text-ink">{t(`materials.items.${m}`)}</span>
                <span className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-3">
                  {t("materials.status")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("requestMaterials")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container className="max-w-[640px] text-center">
          <h2 className="text-display-l text-balance text-ink">{t("finalTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("finalBody")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("contactSupport")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/robotics">{t("exploreRobotics")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
