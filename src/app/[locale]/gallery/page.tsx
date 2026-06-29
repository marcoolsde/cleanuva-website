import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Gallery — Cleanuva",
  description:
    "A growing visual library of Cleanuva robotics, solar cleaning applications, field operation and exhibition moments.",
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery");

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
              <Link href="/robotics">{t("exploreRobotics")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/request-demo">{t("talkToUs")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Categories + media grid */}
      <Section tone="light" className="bg-surface">
        <GalleryGrid />
      </Section>

      {/* Final CTA */}
      <Section>
        <Container className="max-w-[640px] text-center">
          <h2 className="text-display-l text-balance text-ink">{t("finalTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("finalBody")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("requestMaterials")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/distribution-network">{t("becomePartner")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
