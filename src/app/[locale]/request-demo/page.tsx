import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { RequestDemoForm } from "@/components/forms/request-demo-form";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("requestDemo", locale);
}

// Platform lead funnel (v1.1-A). Lead-gen, not registration.
export default async function RequestDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Forms.Demo");

  return (
    <Section>
      <Container className="max-w-[720px]">
        <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
        <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
        <p className="mt-4 max-w-[54ch] text-body-l text-ink-2">{t("subtitle")}</p>
        <div className="mt-10">
          <RequestDemoForm />
        </div>
      </Container>
    </Section>
  );
}
