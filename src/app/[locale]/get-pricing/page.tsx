import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { GetPricingForm } from "@/components/forms/get-pricing-form";

export const metadata: Metadata = {
  title: "Get pricing — Cleanuva Robotics",
  description:
    "Configure your autonomous cleaning robot and request a tailored quote. Model, configuration, options — straight to our team. No account needed.",
};

// Robotics RFQ funnel (v1.1-A). Simple Model → Configuration → Options → RFQ.
export default async function GetPricingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ model?: string }>;
}) {
  const { locale } = await params;
  const { model } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Forms.Quote");

  return (
    <Section>
      <Container className="max-w-[960px]">
        <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
        <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
        <p className="mt-4 max-w-[54ch] text-body-l text-ink-2">{t("subtitle")}</p>
        <div className="mt-10">
          <GetPricingForm initialModel={model} />
        </div>
      </Container>
    </Section>
  );
}
