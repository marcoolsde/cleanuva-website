import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Cpu, Wrench, GitCompare, Handshake, LifeBuoy, Check, ArrowRight, type LucideIcon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("support", locale);
}

// Each path routes to an existing entry — no new form.
const PATHS: { key: string; Icon: LucideIcon; href: string }[] = [
  { key: "robots", Icon: Bot, href: "/robotics" },
  { key: "platform", Icon: Cpu, href: "/request-demo" },
  { key: "accessories", Icon: Wrench, href: "/robotics/accessories#accessories-inquiry" },
  { key: "compare", Icon: GitCompare, href: "/robotics/compare" },
  { key: "distribution", Icon: Handshake, href: "/distribution-network" },
  { key: "existing", Icon: LifeBuoy, href: "/company" },
];
const PREP = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"] as const;
const LINKS: { key: string; href: string }[] = [
  { key: "robotics", href: "/robotics" },
  { key: "compare", href: "/robotics/compare" },
  { key: "platform", href: "/platform" },
  { key: "solutions", href: "/solutions" },
  { key: "accessories", href: "/robotics/accessories" },
  { key: "distribution", href: "/distribution-network" },
  { key: "company", href: "/company" },
];

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Support.page");

  return (
    <>
      {/* 1. Hero — utilitarian, clear routing */}
      <Section>
        <Container className="max-w-[880px]">
          <Eyebrow accent="warm">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("hero.title")}</h1>
          <p className="mt-5 max-w-[60ch] text-body-l text-ink-2">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/get-pricing">{t("hero.cta.pricing")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/request-demo">{t("hero.cta.demo")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics/accessories#accessories-inquiry">{t("hero.cta.accessories")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 2. Support paths — 6 entry cards */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("paths.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("paths.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PATHS.map(({ key, Icon, href }) => (
              <Link
                key={key}
                href={href}
                className="group flex flex-col rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-cool/50"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-warm/10 text-warm-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h4 text-ink">{t(`paths.items.${key}.title`)}</h3>
                <p className="mt-2 flex-1 text-body-s text-ink-2">{t(`paths.items.${key}.desc`)}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text">
                  {t(`paths.items.${key}.action`)}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Before contacting us — prep checklist */}
      <Section>
        <Container className="max-w-[900px]">
          <Eyebrow accent="cool">{t("prep.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("prep.title")}</h2>
          <p className="mt-3 text-body-l text-ink-2">{t("prep.intro")}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {PREP.map((i) => (
              <li key={i} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`prep.items.${i}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Useful links */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("links.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("links.title")}</h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-canvas px-5 py-4 transition-colors hover:border-cool/50"
              >
                <span className="text-body-m font-medium text-ink">{t(`links.items.${key}`)}</span>
                <ArrowRight className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[680px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <p className="mt-4 text-body-l text-ink-inv-2">{t("finalCta.body")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("finalCta.cta.demo")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/company">{t("finalCta.cta.contact")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/get-pricing">{t("finalCta.cta.pricing")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
