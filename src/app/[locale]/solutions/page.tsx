import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrendingUp, Factory, FileSearch, HardHat, Wrench } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { HeroBackgroundImage } from "@/components/sections/hero-image";
import { Link } from "@/i18n/navigation";
import { SOLUTION_ROLES, type SolutionRole } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions — Cleanuva",
  description:
    "Cleanuva for the people who run solar: self-operated asset owners, independent O&M providers, financial owners and IPPs, EPC contractors, and technical auditors.",
};

const ICONS: Record<SolutionRole["icon"], typeof TrendingUp> = {
  TrendingUp,
  Factory,
  FileSearch,
  HardHat,
  Wrench,
};

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Solutions");
  const tp = await getTranslations("Solutions.page");

  return (
    <>
      <Section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <HeroBackgroundImage src="/images/hero/solutions-hero.jpg" />
        </div>
        <Container className="relative z-10 max-w-[820px]">
          <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{tp("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{tp("intro")}</p>
        </Container>
      </Section>

      <Section tone="light" className="bg-surface">
        <Container className="space-y-5">
          {SOLUTION_ROLES.map((role) => {
            const Icon = ICONS[role.icon];
            return (
              <div
                key={role.key}
                id={role.key}
                className="scroll-mt-24 rounded-lg border border-line bg-canvas p-6 md:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-h3 text-ink">{t(`roles.${role.key}.title`)}</h2>
                    <p className="text-body-l text-ink">{t(`roles.${role.key}.outcome`)}</p>
                    <p className="text-body-m text-ink-2">{t(`roles.${role.key}.help`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[680px] text-center">
          <h2 className="text-h1 text-balance text-ink">{tp("ctaTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{tp("ctaBody")}</p>
          <div className="mt-8 flex justify-center">
            <Button variant="primary" asChild>
              <Link href="/request-demo">{tp("cta")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
