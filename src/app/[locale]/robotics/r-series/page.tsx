import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { ProductSubnav } from "@/components/robotics/product-subnav";
import { ProductDemoMedia } from "@/components/robotics/product-demo-media";
import { InOperationGallery } from "@/components/robotics/in-operation";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";
import { familyBySlug } from "@/content/robots";
import { COMPARE_MATRIX, R_SERIES_MEDIA, R_DEMO_MEDIA } from "@/content/compare";

export const metadata: Metadata = {
  title: "NuvaTrack-R Series — Cleanuva Robotics",
  description:
    "NuvaTrack-R Series: single-operator solar panel cleaning robots for dry and wet cleaning. NuvaTrack-R (remote) and NuvaTrack-R Pro (AI-Assist with heading hold, cruise control and camera-assisted operation).",
};

const HERO_STATS = ["s1", "s2", "s3", "s4"] as const;
const HOW_STEPS = ["s1", "s2", "s3", "s4", "s5"] as const;
const CLEAN_POINTS = ["p1", "p2", "p3", "p4", "p5"] as const;
const R_FEATURES = ["aiAssist", "headingHold", "cruiseControl", "cameraAssist"] as const;
const SPEC_KEYS = [
  "dimensions", "weight", "speed", "cleaningCapacity", "climbing", "cleaning",
  "battery", "autonomy", "charging", "remote", "waterFlow", "brush", "brushSpeed", "warranty",
] as const;

export default async function RSeriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Robotics.rSeriesPage");
  const tc = await getTranslations("Robotics.comparePage");
  const ts = await getTranslations("Robotics.specs");
  const tp = await getTranslations("Robotics.product");
  const tCta = await getTranslations("Cta");

  const family = familyBySlug("r-series")!;
  const specByKey = Object.fromEntries(family.specs.map((s) => [s.key, s.value]));

  return (
    <>
      {/* 1. Cinematic product hero — real photo, dark scrim, model name owns the frame */}
      <section
        id="overview"
        className="dark relative isolate flex min-h-[80vh] w-full items-end overflow-hidden bg-abyss text-ink-inv scroll-mt-20"
      >
        <MediaFrame
          src={family.image}
          alt="NuvaTrack-R Series solar-cleaning robot"
          priority
          imageClassName="object-[center_35%]"
          className="absolute inset-0"
        />
        {/* Lighter scrim: product stays visible up top, copy readable at the base */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/45 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />

        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-xl text-balance text-ink-inv">NuvaTrack-R Series</h1>
          <p className="mt-4 max-w-[48ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/get-pricing?model=nuvatrack-r-pro">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("finalCta.compare")}</Link>
            </Button>
          </div>

          {/* Tesla-style hairline stat strip */}
          <dl className="mt-12 grid max-w-[820px] grid-cols-2 overflow-hidden rounded-xl border border-line-inv-strong sm:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <div
                key={s}
                className={
                  "bg-white/5 px-5 py-4 backdrop-blur" +
                  (i > 0 ? " border-line-inv-strong sm:border-s" : "")
                }
              >
                <dd className="text-h3 font-medium text-ink-inv">{t(`hero.stats.${s}.value`)}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">
                  {t(`hero.stats.${s}.label`)}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Sticky product subnav */}
      <ProductSubnav
        name="NuvaTrack-R"
        suffix="Series"
        pricingHref="/get-pricing?model=nuvatrack-r-pro"
        pricingLabel={t("subnav.pricing")}
        links={[
          { label: t("subnav.overview"), href: "#overview", anchor: true },
          { label: t("subnav.models"), href: "#models", anchor: true },
          { label: t("subnav.compare"), href: "/robotics/compare" },
          { label: t("subnav.accessories"), href: "/robotics/accessories" },
          { label: t("subnav.ask"), href: "/request-demo" },
        ]}
      />

      {/* 3. Choose your model — a buying decision, Pro elevated */}
      <Section id="models" tone="light" className="scroll-mt-[120px] bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("choose.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("choose.title")}</h2>
          </div>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            {/* NuvaTrack-R */}
            <div id="nuvatrack-r" className="flex h-full scroll-mt-[120px] flex-col overflow-hidden rounded-2xl border border-line bg-canvas">
              <MediaFrame src={family.image} alt="NuvaTrack-R" sizes="(max-width:1024px) 100vw, 560px" className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-7">
                <span className="text-eyebrow text-ink-3">{t("choose.r.badge")}</span>
                <h3 className="mt-1.5 text-h2 text-ink">NuvaTrack-R</h3>
                <p className="mt-2 text-body-m text-ink-2">{t("choose.r.tagline")}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {["b1", "b2", "b3", "b4"].map((b) => (
                    <li key={b} className="flex gap-2.5 text-body-s text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden />
                      {t(`choose.r.${b}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="secondary" asChild>
                    <Link href="/get-pricing?model=nuvatrack-r">{tCta("getPricing")}</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* NuvaTrack-R Pro — elevated */}
            <div id="nuvatrack-r-pro" className="flex h-full scroll-mt-[120px] flex-col overflow-hidden rounded-2xl border border-cool/60 bg-canvas shadow-lift ring-1 ring-cool/30 lg:-mt-3">
              <div aria-hidden className="h-1 w-full bg-[image:var(--current)]" />
              <MediaFrame src={family.image} alt="NuvaTrack-R Pro" sizes="(max-width:1024px) 100vw, 560px" className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-cool-tint px-2.5 py-0.5 text-[12px] font-medium text-cool-text">
                  {t("choose.pro.badge")}
                </span>
                <h3 className="mt-2 text-h2 text-ink">NuvaTrack-R Pro</h3>
                <p className="mt-2 text-body-m text-ink-2">{t("choose.pro.tagline")}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {["b1", "b2", "b3", "b4", "b5"].map((b) => (
                    <li key={b} className="flex gap-2.5 text-body-s text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-cool-text" aria-hidden />
                      {t(`choose.pro.${b}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="warm" asChild>
                    <Link href="/get-pricing?model=nuvatrack-r-pro">{tCta("getPricing")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Full-bleed demo media — shared product media block, no eyebrow label */}
      <ProductDemoMedia
        title={t("demo.title")}
        subtitle={t("demo.subtitle")}
        titleClassName="md:whitespace-nowrap"
        alt={t("demo.title")}
        media={R_DEMO_MEDIA}
        videoLabels={{ play: tp("videoPlay"), pause: tp("videoPause"), soon: tp("videoSoon") }}
      />

      {/* 5. How it works */}
      <Section>
        <Container>
          <Eyebrow accent="cool">{t("how.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("how.title")}</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {HOW_STEPS.map((s, i) => (
              <li key={s} className="flex flex-col bg-canvas p-6">
                <span className="font-mono text-body-s text-warm-text">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-body-m text-ink">{t(`how.${s}`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. Cleaning system */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[900px]">
          <Eyebrow accent="warm">{t("cleaning.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("cleaning.title")}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {CLEAN_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`cleaning.${p}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Technical data */}
      <Section>
        <Container>
          <Eyebrow accent="neutral">{t("tech.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("tech.title")}</h2>

          {/* R vs R Pro differentiators */}
          <div className="mt-10 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-surface-sunk/40">
                  <th className="w-[44%] px-5 py-3.5 text-eyebrow text-ink-3">{t("tech.featuresTitle")}</th>
                  <th className="px-5 py-3.5 text-h4">NuvaTrack-R</th>
                  <th className="px-5 py-3.5 text-h4 text-cool-text">NuvaTrack-R Pro</th>
                </tr>
              </thead>
              <tbody>
                {R_FEATURES.map((row, i) => (
                  <tr key={row} className={i % 2 ? "bg-surface-sunk/25" : ""}>
                    <th className="px-5 py-4 text-body-m font-normal text-ink-2">{tc(`rows.${row}`)}</th>
                    <td className="px-5 py-4 text-body-m text-ink-3">
                      {COMPARE_MATRIX["nuvatrack-r"][row] ? tc("val.yes") : tc("val.no")}
                    </td>
                    <td className="px-5 py-4 text-body-m font-medium text-cool-text">
                      {COMPARE_MATRIX["nuvatrack-r-pro"][row] ? tc("val.yes") : tc("val.no")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Full base specifications */}
          <h3 className="mt-12 text-h3 text-ink">{t("tech.specsTitle")}</h3>
          <dl className="mt-6 grid gap-x-14 sm:grid-cols-2">
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

      {/* 8. In operation gallery */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Eyebrow accent="cool">{t("inOp.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("inOp.title")}</h2>
          <p className="mt-3 max-w-[60ch] text-body-l text-ink-2">{t("inOp.subtitle")}</p>
          <div className="mt-10">
            <InOperationGallery media={R_SERIES_MEDIA} tNamespace="Robotics.rSeriesPage.inOp" />
          </div>
        </Container>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[680px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/get-pricing?model=nuvatrack-r-pro">{tCta("getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("finalCta.compare")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics/accessories">{t("finalCta.accessories")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
