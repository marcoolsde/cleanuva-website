import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Wrench, Cpu, Building2, Check, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Distribution Network — Cleanuva",
  description:
    "Become a Cleanuva distribution partner — bring cost-efficient solar cleaning robotics and AI-supported operations to PV owners, EPCs and service companies in your market.",
};

const WHY = [
  { key: "c1", icon: Bot },
  { key: "c2", icon: Wrench },
  { key: "c3", icon: Cpu },
  { key: "c4", icon: Building2 },
] as const;
const PROFILES = ["p1", "p2", "p3", "p4"] as const;
const SUPPORT = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;
const REGIONS = ["europe", "mea", "nafrica", "intl"] as const;
const MTYPES = ["utility", "commercial", "distributed", "service"] as const;
const STEPS = ["s1", "s2", "s3", "s4"] as const;

export default async function DistributionNetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Distribution");

  return (
    <>
      {/* 1. Hero */}
      <Section>
        <Container className="max-w-[860px]">
          <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3 text-display-l text-balance text-ink">{t("title")}</h1>
          <p className="mt-5 text-body-l text-ink-2">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("becomePartner")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/get-pricing">{t("talkToUs")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 2. Why partner */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <Eyebrow accent="warm">{t("why.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance text-ink">{t("why.heading")}</h2>
              <p className="mt-4 text-body-l text-ink-2">{t("why.body")}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={(i % 4) * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-warm-tint text-warm-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4 text-ink">{t(`why.cards.${key}.title`)}</h3>
                  <p className="mt-2 text-body-s text-ink-2">{t(`why.cards.${key}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Partner profiles */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="cool">{t("profiles.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance text-ink">{t("profiles.heading")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PROFILES.map((p, i) => (
              <Reveal key={p} delay={(i % 2) * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                  <h3 className="text-h4 text-ink">{t(`profiles.items.${p}.title`)}</h3>
                  <p className="mt-2 text-body-s text-ink-2">{t(`profiles.items.${p}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. What we can support */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[900px]">
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="warm">{t("support.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance text-ink">{t("support.heading")}</h2>
              <p className="mt-4 text-body-l text-ink-2">{t("support.body")}</p>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {SUPPORT.map((s) => (
              <li key={s} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`support.items.${s}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. Target markets */}
      <Section>
        <Container className="max-w-[900px]">
          <Eyebrow accent="cool">{t("markets.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("markets.heading")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("markets.regionsTitle")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <span
                    key={r}
                    className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2"
                  >
                    {t(`markets.regions.${r}`)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("markets.marketsTitle")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {MTYPES.map((m) => (
                  <span
                    key={m}
                    className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2"
                  >
                    {t(`markets.types.${m}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Partner process */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="warm">{t("process.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance text-ink">{t("process.heading")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s} delay={(i % 4) * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                  <span className="text-loop text-warm-text">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-h4 text-ink">{t(`process.steps.${s}`)}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Final CTA */}
      <Section>
        <Container className="max-w-[640px] text-center">
          <h2 className="text-display-l text-balance text-ink">{t("finalTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("finalBody")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("becomePartner")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/robotics">
                {t("exploreRobotics")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
