import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { AccessoriesShowcase } from "@/components/sections/accessories-showcase";
import { AccessoryInquiryForm } from "@/components/forms/accessories-inquiry-form";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Accessories & service parts — Cleanuva Robotics",
  description:
    "Compatible accessories and service parts for Cleanuva cleaning robots — brushes, motors, batteries, chargers, water hoses and maintenance kits. Select your robot model and request the right parts.",
};

const COMPAT_POINTS = ["point1", "point2", "point3"] as const;

export default async function AccessoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Robotics.accessories");
  const tA = await getTranslations("Forms.Accessory");

  return (
    <>
      {/* Hero — CTAs scroll to the on-page inquiry form (not /get-pricing). */}
      <Section>
        <Container className="max-w-[860px]">
          <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("intro")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="warm" asChild>
              <a href="#accessories-inquiry">{t("requestQuote")}</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#accessories-inquiry">{t("contactSupport")}</a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Model selector + showcase grid */}
      <Section tone="light" className="bg-surface">
        <AccessoriesShowcase />
      </Section>

      {/* Compatibility note */}
      <Section>
        <Container className="max-w-[760px]">
          <Eyebrow accent="cool">{t("compatEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h2 text-balance text-ink">{t("compatTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("compatLead")}</p>
          <ul className="mt-6 space-y-3">
            {COMPAT_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cool" />
                <span className="text-body text-ink-2">{t(`compat.${p}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Inquiry form — anchor target for the page CTAs. */}
      <Section
        id="accessories-inquiry"
        tone="light"
        className="scroll-mt-24 bg-surface"
      >
        <Container className="max-w-[760px]">
          <Eyebrow accent="warm">{t("inquiryEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{tA("title")}</h2>
          <p className="mt-4 text-body-l text-ink-2">
            {tA("subtitle", { email: LEGAL.contactEmail })}
          </p>
          <div className="mt-10 rounded-2xl border border-line bg-canvas p-6 sm:p-8">
            <AccessoryInquiryForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
