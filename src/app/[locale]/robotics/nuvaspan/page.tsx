import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { ProductSubnav } from "@/components/robotics/product-subnav";
import { ProductDemoMedia } from "@/components/robotics/product-demo-media";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";
import { familyBySlug } from "@/content/robots";
import { NUVASPAN_DEMO_MEDIA } from "@/content/compare";

export const metadata: Metadata = {
  title: "NuvaSpan — Cleanuva Robotics",
  description:
    "NuvaSpan: a project-engineered, suspended / bridge-type cleaning system for fixed PV installations and specific structures, with low routine manual intervention.",
};

// NuvaSpan has no dedicated product photo yet — hero + media reuse the real
// overview plant shot (a clear stand-in, never a colour placeholder).
const HERO_IMAGE = "/images/robotics/overview-hero.jpg";

const HERO_STATS = ["s1", "s2", "s3", "s4"] as const;
const USE_CASES = ["b1", "b2", "b3", "b4", "b5"] as const;
const SYSTEM = ["s1", "s2", "s3", "s4", "s5"] as const;
const PROJECT = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;
const TECH_SEL = [
  "systemType", "installType", "cleaningMode", "automation", "operator",
  "bestFit", "projectReq", "config", "service",
] as const;
const SPEC_KEYS = [
  "dimensions", "weight", "speed", "cleaningCapacity", "climbing", "moduleTilt",
  "obstacle", "cleaning", "architecture", "power", "autonomy", "warranty",
] as const;

export default async function NuvaSpanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Robotics.nuvaspanPage");
  const ts = await getTranslations("Robotics.specs");
  const tCta = await getTranslations("Cta");

  const family = familyBySlug("nuvaspan")!;
  const specByKey = Object.fromEntries(family.specs.map((s) => [s.key, s.value]));

  return (
    <>
      {/* 1. Cinematic hero */}
      <section
        id="overview"
        className="dark relative isolate flex min-h-[78vh] w-full items-end overflow-hidden bg-abyss text-ink-inv scroll-mt-20"
      >
        <MediaFrame src={HERO_IMAGE} alt="Utility-scale PV site" priority imageClassName="object-[center_45%]" className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />

        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-xl text-balance text-ink-inv">NuvaSpan</h1>
          <p className="mt-4 max-w-[50ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[60ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/get-pricing?model=nuvaspan">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("cta.compare")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/request-demo">{t("cta.talk")}</Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-[860px] grid-cols-2 overflow-hidden rounded-xl border border-line-inv-strong sm:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <div key={s} className={"bg-white/5 px-5 py-4 backdrop-blur" + (i > 0 ? " border-line-inv-strong sm:border-s" : "")}>
                <dd className="text-h4 font-medium text-ink-inv">{t(`hero.stats.${s}.value`)}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">{t(`hero.stats.${s}.label`)}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Sticky product subnav */}
      <ProductSubnav
        name="NuvaSpan"
        pricingHref="/get-pricing?model=nuvaspan"
        pricingLabel={t("subnav.pricing")}
        links={[
          { label: t("subnav.overview"), href: "#overview", anchor: true },
          { label: t("subnav.system"), href: "#system", anchor: true },
          { label: t("subnav.requirements"), href: "#requirements", anchor: true },
          { label: t("subnav.compare"), href: "/robotics/compare" },
        ]}
      />

      {/* 3. Large product demo media (real still now; clip drops in later) */}
      <ProductDemoMedia
        title={t("demo.title")}
        subtitle={t("demo.subtitle")}
        note={t("demo.note")}
        alt={t("media.caption")}
        media={NUVASPAN_DEMO_MEDIA}
      />

      {/* 4. When to choose */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[900px]">
          <Eyebrow accent="warm">{t("useCases.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("useCases.title")}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {USE_CASES.map((b) => (
              <li key={b} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`useCases.${b}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. System concept */}
      <Section id="system" className="scroll-mt-[120px]">
        <Container>
          <Eyebrow accent="cool">{t("system.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("system.title")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SYSTEM.map((s) => (
              <div key={s} className="rounded-lg border border-line bg-canvas p-6">
                <p className="text-body-m text-ink">{t(`system.${s}`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Project requirements */}
      <Section id="requirements" tone="light" className="scroll-mt-[120px] bg-surface">
        <Container className="max-w-[900px]">
          <Eyebrow accent="warm">{t("project.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("project.title")}</h2>
          <p className="mt-3 max-w-[60ch] text-body-l text-ink-2">{t("project.note")}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {PROJECT.map((p) => (
              <li key={p} className="flex items-start gap-3 border-t border-line pt-4">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cool" />
                <span className="text-body-m text-ink">{t(`project.${p}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6. Technical data */}
      <Section>
        <Container>
          <Eyebrow accent="neutral">{t("tech.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("tech.title")}</h2>

          <h3 className="mt-10 text-h3 text-ink">{t("tech.selTitle")}</h3>
          <dl className="mt-5 grid gap-x-14 sm:grid-cols-2">
            {TECH_SEL.map((k) => (
              <div key={k} className="flex items-center justify-between gap-6 border-b border-line py-4">
                <dt className="text-body-m text-ink-2">{t(`tech.sel.${k}.label`)}</dt>
                <dd className="text-end text-body-m text-ink">{t(`tech.sel.${k}.value`)}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 text-h3 text-ink">{t("tech.specsTitle")}</h3>
          <dl className="mt-5 grid gap-x-14 sm:grid-cols-2">
            {SPEC_KEYS.map((k) =>
              specByKey[k] ? (
                <div key={k} className="flex items-center justify-between gap-6 border-b border-line py-4">
                  <dt className="text-body-m text-ink-2">{ts(k)}</dt>
                  <dd className="font-mono text-body-m text-ink">{specByKey[k]}</dd>
                </div>
              ) : null,
            )}
          </dl>
          <p className="mt-6 text-body-s text-ink-3">{t("tech.note")}</p>
        </Container>
      </Section>

      {/* 7. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[720px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/get-pricing?model=nuvaspan">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("cta.compare")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/request-demo">{t("cta.consultation")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
