import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Layers, Bot, Boxes, ArrowRight, ShieldCheck, Factory, Wrench } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { HeroBackgroundImage } from "@/components/sections/hero-image";
import { TrustSection } from "@/components/sections/trust";
import { Link } from "@/i18n/navigation";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Company — Cleanuva",
  description:
    "Cleanuva is the AI-native operating layer for solar — a brand of NETRO Sparkle GmbH, based in Germany.",
};

const PILLARS = [
  { key: "platform", icon: Layers },
  { key: "robotics", icon: Bot },
  { key: "solutions", icon: Boxes },
] as const;

const LEGAL_PAGES = [
  { key: "imprint", href: "/company/legal/imprint" },
  { key: "privacy", href: "/company/legal/privacy" },
  { key: "terms", href: "/company/legal/terms" },
  { key: "cookies", href: "/company/legal/cookies" },
] as const;

const MFG_POINTS = [
  { key: "p1", icon: Factory },
  { key: "p2", icon: Wrench },
  { key: "p3", icon: Boxes },
] as const;
const PRESENCE_REGIONS = ["europe", "mea", "nafrica", "na"] as const;
const PRESENCE_MARKETS = ["utility", "commercial", "distributed"] as const;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Company");
  const tf = await getTranslations("Footer.legal");

  return (
    <>
      {/* Hero */}
      <Section className="relative isolate overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <HeroBackgroundImage src="/images/company/company-hero.jpg" />
        </div>
        <Container className="relative z-10 max-w-[820px]">
          <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("lead")}</p>
        </Container>
      </Section>

      {/* About — operator perspective + solar focus */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[760px] space-y-10">
          <div className="space-y-3">
            <h2 className="text-h2 text-ink">{t("about.heading")}</h2>
            <p className="text-body-m text-ink-2">{t("about.body1")}</p>
            <p className="text-body-m text-ink-2">{t("about.body2")}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-h2 text-ink">{t("focus.heading")}</h2>
            <p className="text-body-m text-ink-2">{t("focus.body")}</p>
          </div>
        </Container>
      </Section>

      {/* Vision — Platform + AI Copilot + Robotics */}
      <Section id="vision">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("vision.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-ink">{t("vision.heading")}</h2>
            <p className="mt-4 text-body-l text-ink-2">{t("vision.body")}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map(({ key, icon: Icon }) => (
              <div key={key} className="rounded-lg border border-line bg-canvas p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h4 text-ink">{t(`vision.pillars.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`vision.pillars.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Manufacturing & supply chain */}
      <Section>
        <Container className="max-w-[920px]">
          <Eyebrow accent="warm">{t("manufacturing.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("manufacturing.heading")}</h2>
          <p className="mt-4 max-w-[62ch] text-body-l text-ink-2">{t("manufacturing.body")}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MFG_POINTS.map(({ key, icon: Icon }) => (
              <div key={key} className="rounded-lg border border-line bg-canvas p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-warm-tint text-warm-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h4 text-ink">{t(`manufacturing.points.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`manufacturing.points.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global presence — regions & markets served (no fabricated offices) */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[920px]">
          <Eyebrow accent="cool">{t("presence.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("presence.heading")}</h2>
          <p className="mt-4 max-w-[62ch] text-body-l text-ink-2">{t("presence.body")}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("presence.regionsTitle")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESENCE_REGIONS.map((r) => (
                  <span
                    key={r}
                    className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2"
                  >
                    {t(`presence.regions.${r}`)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("presence.marketsTitle")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESENCE_MARKETS.map((m) => (
                  <span
                    key={m}
                    className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2"
                  >
                    {t(`presence.markets.${m}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Exhibitions & events */}
      <Section>
        <Container className="max-w-[760px]">
          <Eyebrow accent="warm">{t("events.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("events.heading")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("events.body")}</p>
          <p className="mt-3 text-body-s text-ink-3">{t("events.note")}</p>
        </Container>
      </Section>

      {/* Trust layer */}
      <TrustSection />

      {/* Entity · Security · Contact · Legal */}
      <Section tone="light" className="bg-surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-12">
            {/* Entity */}
            <div className="space-y-3">
              <h2 className="text-h2 text-ink">{t("entity.heading")}</h2>
              <p className="text-body-m text-ink-2">
                {t("entity.body", { entity: LEGAL.entity })}
              </p>
              <Button variant="ghostLink" asChild>
                <Link href="/company/legal/imprint">
                  {t("entity.imprintLink")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </div>

            {/* Security pointer */}
            <div id="security" className="space-y-3 scroll-mt-24">
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-verified/10 text-verified">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <h2 className="text-h2 text-ink">{t("security.heading")}</h2>
              <p className="text-body-m text-ink-2">{t("security.body")}</p>
              <Button variant="ghostLink" asChild>
                <Link href="/platform">
                  {t("security.link")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact + Legal */}
          <div className="space-y-12">
            <div id="contact" className="scroll-mt-24 rounded-lg border border-line bg-canvas p-6">
              <h2 className="text-h2 text-ink">{t("contact.heading")}</h2>
              <p className="mt-3 text-body-m text-ink-2">{t("contact.body")}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="warm" asChild>
                  <Link href="/get-pricing">{t("contact.quoteCta")}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/request-demo">{t("contact.demoCta")}</Link>
                </Button>
              </div>
              <p className="mt-4 text-body-s text-ink-3">{t("contact.legalNote")}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-eyebrow text-ink-3">{t("legalHeading")}</h2>
              <ul className="space-y-2">
                {LEGAL_PAGES.map((p) => (
                  <li key={p.key}>
                    <Link
                      href={p.href}
                      className="text-body-m text-ink underline-offset-4 hover:text-cool-text hover:underline"
                    >
                      {tf(p.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
