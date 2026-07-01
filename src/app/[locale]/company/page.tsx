import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Layers, Boxes, ShieldCheck, ArrowRight, Check, type LucideIcon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "About Cleanuva — a brand of NETRO Sparkle GmbH",
  description:
    "Cleanuva is a solar robotics and AI operations brand of NETRO Sparkle GmbH, based in Germany — bringing field-ready cleaning robots and an AI-native operations platform to PV teams.",
};

const BUILD: { key: string; Icon: LucideIcon; href: string }[] = [
  { key: "robotics", Icon: Bot, href: "/robotics" },
  { key: "platform", Icon: Layers, href: "/platform" },
  { key: "solutions", Icon: Boxes, href: "/solutions" },
];
const PRINCIPLES = ["p1", "p2", "p3", "p4", "p5"] as const;
const LEGAL_PAGES = [
  { key: "imprint", href: "/company/legal/imprint" },
  { key: "privacy", href: "/company/legal/privacy" },
  { key: "terms", href: "/company/legal/terms" },
  { key: "cookies", href: "/company/legal/cookies" },
] as const;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Company.page");
  const tf = await getTranslations("Footer.legal");

  const INFO: { label: string; value: string; href?: string }[] = [
    { label: t("info.labels.entity"), value: LEGAL.entity },
    { label: t("info.labels.office"), value: LEGAL.registeredOffice },
    { label: t("info.labels.court"), value: LEGAL.registerCourt },
    { label: t("info.labels.hrb"), value: LEGAL.hrb },
    { label: t("info.labels.vat"), value: LEGAL.vatId },
    { label: t("info.labels.website"), value: "www.cleanuva.ai", href: "https://www.cleanuva.ai" },
    { label: t("info.labels.email"), value: LEGAL.contactEmail, href: `mailto:${LEGAL.contactEmail}` },
  ];

  return (
    <>
      {/* 1. Brand hero — system look, no photo */}
      <section className="dark relative isolate overflow-hidden bg-abyss text-ink-inv">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#15293D_0%,#0A1320_60%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(80%_80%_at_35%_0%,black,transparent)]" />
        <Container className="relative z-10 pt-36 pb-16 lg:pb-20">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-xl text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[52ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[64ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/robotics">{t("hero.cta.robotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/platform">{t("hero.cta.platform")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <a href="#company-info">{t("hero.cta.contact")}</a>
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Brand ↔ legal entity — parity, no ambiguity */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[62ch]">
            <Eyebrow accent="cool">{t("brand.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("brand.title")}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-cool/40 bg-cool-tint/40 p-7">
              <span className="text-eyebrow text-cool-text">{t("brand.brandTag")}</span>
              <h3 className="mt-2 text-h2 text-ink">Cleanuva</h3>
              <p className="mt-2 text-body-m text-ink-2">{t("brand.brandBody")}</p>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-7">
              <span className="text-eyebrow text-ink-3">{t("brand.entityTag")}</span>
              <h3 className="mt-2 text-h2 text-ink">NETRO Sparkle GmbH</h3>
              <p className="mt-2 text-body-m text-ink-2">{t("brand.entityBody")}</p>
            </div>
          </div>
          <p className="mt-6 max-w-[72ch] text-body-s text-ink-3">{t("brand.note")}</p>
        </Container>
      </Section>

      {/* 3. What we build */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("build.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("build.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BUILD.map(({ key, Icon, href }) => (
              <Link
                key={key}
                href={href}
                className="group flex flex-col rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-cool/50"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h3 text-ink">{t(`build.items.${key}.title`)}</h3>
                <p className="mt-2 flex-1 text-body-s text-ink-2">{t(`build.items.${key}.desc`)}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text">
                  {t("build.learnMore")}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Operating principles */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[900px]">
          <Eyebrow accent="cool">{t("principles.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("principles.title")}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`principles.items.${p}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. Company information + legal */}
      <Section id="company-info" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow accent="neutral">{t("info.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("info.title")}</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {INFO.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-body-s uppercase tracking-[0.08em] text-ink-3">{row.label}</dt>
                  <dd className="text-body-m text-ink sm:text-end">
                    {row.href ? (
                      <a href={row.href} className="text-cool-text underline-offset-4 hover:underline">{row.value}</a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <Button variant="ghostLink" asChild className="mt-6">
              <Link href="/company/legal/imprint">
                {t("info.imprintLink")}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-line bg-canvas p-7">
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-verified/10 text-verified">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-h4 text-ink">{t("info.legalHeading")}</h3>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_PAGES.map((p) => (
                <li key={p.key}>
                  <Link href={p.href} className="text-body-m text-ink underline-offset-4 hover:text-cool-text hover:underline">
                    {tf(p.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 6. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[720px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/support">{t("finalCta.cta.contact")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/request-demo">{t("finalCta.cta.demo")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/distribution-network">{t("finalCta.cta.distribution")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
