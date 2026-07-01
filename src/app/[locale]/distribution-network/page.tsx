import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2, Droplet, Wrench, ShieldCheck, Handshake, Check, ArrowRight, type LucideIcon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Distribution & partners — Cleanuva",
  description:
    "Partner with Cleanuva to bring solar cleaning robots, accessories and AI-supported operations to your market — a serious regional partner network for distributors, cleaning service companies, O&M providers, EPCs and service partners.",
};

const HERO_IMAGE = "/images/robotics/overview-hero.jpg";

const STRIP = ["a", "b", "c", "d"] as const;
const PARTNERS: { key: string; Icon: LucideIcon }[] = [
  { key: "distributors", Icon: Building2 },
  { key: "cleaning", Icon: Droplet },
  { key: "om", Icon: Wrench },
  { key: "epc", Icon: ShieldCheck },
  { key: "regional", Icon: Handshake },
];
// Robotics offers carry the warm accent; the platform story carries cool — the
// same colour code used across Robotics / Platform / Solutions.
const OFFER: { key: string; accent: "warm" | "cool" }[] = [
  { key: "robots", accent: "warm" },
  { key: "unattended", accent: "warm" },
  { key: "fixed", accent: "warm" },
  { key: "accessories", accent: "warm" },
  { key: "platform", accent: "cool" },
  { key: "verification", accent: "cool" },
];
const SUPPORT = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const STEPS = ["s1", "s2", "s3", "s4", "s5"] as const;
const REGIONS = ["r1", "r2", "r3", "r4", "r5"] as const;
const MARKETS = ["m1", "m2", "m3", "m4"] as const;

export default async function DistributionNetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Distribution.page");

  return (
    <>
      {/* 1. Cinematic partner hero — a regional PV site, not a single product */}
      <section className="dark relative isolate flex min-h-[72vh] w-full items-end overflow-hidden bg-abyss text-ink-inv">
        <MediaFrame src={HERO_IMAGE} alt="Utility-scale PV site" priority imageClassName="object-[center_45%]" className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />

        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 max-w-[22ch] text-display-l text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[54ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[64ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/request-demo">{t("hero.cta.partner")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics">{t("hero.cta.robotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("hero.cta.compare")}</Link>
            </Button>
          </div>

          {/* What you'd represent — hairline preview strip */}
          <dl className="mt-12 grid max-w-[920px] grid-cols-2 overflow-hidden rounded-xl border border-line-inv-strong sm:grid-cols-4">
            {STRIP.map((s, i) => (
              <div key={s} className={"bg-white/5 px-5 py-4 backdrop-blur" + (i > 0 ? " border-line-inv-strong sm:border-s" : "")}>
                <dd className="text-h4 font-medium text-ink-inv">{t(`hero.strip.${s}.label`)}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">{t(`hero.strip.${s}.cap`)}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Who we work with */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("partners.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("partners.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map(({ key, Icon }) => (
              <div key={key} className="flex h-full flex-col rounded-xl border border-line bg-canvas p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-warm/10 text-warm-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h4 text-ink">{t(`partners.items.${key}.role`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`partners.items.${key}.line`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. What partners can offer */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("offer.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("offer.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFER.map(({ key, accent }) => (
              <div key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <span
                  aria-hidden
                  className={"h-1 w-10 rounded-full " + (accent === "warm" ? "bg-warm" : "bg-cool")}
                />
                <h3 className="mt-4 text-h4 text-ink">{t(`offer.items.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`offer.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[72ch] text-body-s text-ink-3">{t("offer.note")}</p>
        </Container>
      </Section>

      {/* 4. Partner support from Cleanuva */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[940px]">
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("support.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("support.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("support.intro")}</p>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {SUPPORT.map((s) => (
              <li key={s} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`support.items.${s}`)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-body-s text-ink-3">{t("support.note")}</p>
        </Container>
      </Section>

      {/* 5. How cooperation can start */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("process.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("process.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("process.intro")}</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-col bg-canvas p-6">
                <span className="font-mono text-body-s text-warm-text">{`0${i + 1}`}</span>
                <p className="mt-3 text-body-s text-ink">{t(`process.steps.${s}`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. Regional opportunity */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[940px]">
          <Eyebrow accent="warm">{t("region.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("region.title")}</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("region.regionsLabel")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <span key={r} className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2">
                    {t(`region.regions.${r}`)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-eyebrow text-ink-3">{t("region.marketsLabel")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {MARKETS.map((m) => (
                  <span key={m} className="rounded-pill border border-line bg-canvas px-3 py-1 text-body-s text-ink-2">
                    {t(`region.markets.${m}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-body-s text-ink-3">{t("region.note")}</p>
        </Container>
      </Section>

      {/* 7. Partner inquiry CTA — existing contact entries, no new form */}
      <Section tone="dark">
        <Container className="max-w-[760px] text-center">
          <p className="text-eyebrow text-warm">{t("inquiry.eyebrow")}</p>
          <h2 className="mt-3 text-display-l text-balance text-ink-inv">{t("inquiry.title")}</h2>
          <p className="mt-4 text-body-l text-ink-inv-2">{t("inquiry.body")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/company">{t("inquiry.cta.contact")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/request-demo">{t("inquiry.cta.discuss")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics">
                {t("inquiry.cta.portfolio")}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
