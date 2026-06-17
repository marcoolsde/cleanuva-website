import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Layers, Bot, FileText, Calculator, Lightbulb, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { HeroBackgroundImage } from "@/components/sections/hero-image";
import { Link } from "@/i18n/navigation";
import { RESOURCE_CATEGORIES, type ResourceCategory } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources — Cleanuva",
  description: "Product brochures, platform and robotics overviews, and economic models for Cleanuva — more coming soon.",
};

const ICONS: Record<ResourceCategory["icon"], typeof Layers> = {
  Layers,
  Bot,
  FileText,
  Calculator,
  Lightbulb,
};

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Resources");

  return (
    <>
      <Section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <HeroBackgroundImage src="/images/hero/resources-hero.jpg" />
        </div>
        <Container className="relative z-10 max-w-[820px]">
          <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("intro")}</p>
        </Container>
      </Section>

      <Section tone="light" className="bg-surface">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon];
              const available = cat.status === "available";
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {!available ? (
                      <span className="rounded-pill border border-line bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-3">
                        {t("soon")}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-4 text-h4 text-ink">{t(`categories.${cat.key}.title`)}</h2>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`categories.${cat.key}.desc`)}
                  </p>
                  {available ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-cool-text">
                      {t("view")}
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </span>
                  ) : null}
                </>
              );

              const base = "flex h-full flex-col rounded-lg border border-line p-6";

              return available && cat.href ? (
                <Link
                  key={cat.key}
                  href={cat.href}
                  className={`${base} group bg-canvas transition-all duration-200 hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none`}
                >
                  {inner}
                </Link>
              ) : (
                <div key={cat.key} className={`${base} bg-canvas/60`}>
                  {inner}
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-body-s text-ink-3">{t("note")}</p>
        </Container>
      </Section>
    </>
  );
}
