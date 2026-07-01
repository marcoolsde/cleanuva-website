import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, ScanEye, Sun, LayoutDashboard, Wrench, CalendarDays, type LucideIcon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { InOperationGallery } from "@/components/robotics/in-operation";
import { Link } from "@/i18n/navigation";
import { type RMedia } from "@/content/compare";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("gallery", locale);
}

const HERO_IMAGE = "/images/robotics/r-series-op-1.jpg";

// Category cards. `soon` = no real assets yet (honest, never faked).
const CATEGORIES: { key: string; Icon: LucideIcon; soon?: boolean }[] = [
  { key: "robots", Icon: Bot },
  { key: "details", Icon: ScanEye },
  { key: "site", Icon: Sun },
  { key: "platform", Icon: LayoutDashboard },
  { key: "accessories", Icon: Wrench },
  { key: "events", Icon: CalendarDays, soon: true },
];

// Featured stills — real, already-compressed assets only.
const FEATURED: { id: string; src: string; cat: string }[] = [
  { id: "op1", src: "/images/robotics/r-series-op-1.jpg", cat: "robots" },
  { id: "op3", src: "/images/robotics/u-series-op-1.jpg", cat: "robots" },
  { id: "op2", src: "/images/robotics/r-series-op-2.jpg", cat: "robots" },
  { id: "rHero", src: "/images/robotics/r-series-hero.jpg", cat: "details" },
  { id: "uHero", src: "/images/robotics/u-series-hero.jpg", cat: "details" },
  { id: "site", src: "/images/robotics/overview-hero.jpg", cat: "site" },
  { id: "platform", src: "/images/platform/platform-home-screenshot.png", cat: "platform" },
  { id: "brushes", src: "/images/accessories/brushes.jpg", cat: "accessories" },
  { id: "motors", src: "/images/accessories/motors.jpg", cat: "accessories" },
];

// In-operation highlight — real demo clips + field stills (reuses the product viewer).
const HIGHLIGHT: RMedia[] = [
  { id: "rVid", type: "video", src: "/videos/robotics/nuvatrack-r-demo.mp4", poster: "/images/robotics/r-series-hero.jpg" },
  { id: "uVid", type: "video", src: "/videos/robotics/nuvatrack-u-demo.mp4", poster: "/images/robotics/u-series-poster.jpg" },
  { id: "rOp", type: "image", src: "/images/robotics/r-series-op-1.jpg" },
  { id: "uOp", type: "image", src: "/images/robotics/u-series-op-1.jpg" },
];

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery.page");

  return (
    <>
      {/* 1. Cinematic hero — real field still */}
      <section className="dark relative isolate flex min-h-[64vh] w-full items-end overflow-hidden bg-abyss text-ink-inv">
        <MediaFrame src={HERO_IMAGE} alt="Cleanuva cleaning robot in the field" priority imageClassName="object-[center_40%]" className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />
        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-xl text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[54ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/robotics">{t("hero.cta.robotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("hero.cta.compare")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/request-demo">{t("hero.cta.demo")}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Media categories */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("categories.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("categories.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ key, Icon, soon }) => (
              <div key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {soon ? (
                    <span className="rounded-pill border border-line px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-ink-3">
                      {t("comingSoon")}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-h4 text-ink">{t(`categories.items.${key}.title`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`categories.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Featured media grid — real stills only */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("featured.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("featured.title")}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-xl border border-line bg-canvas">
                <MediaFrame src={item.src} alt={t(`featured.items.${item.id}`)} sizes="(max-width:1024px) 100vw, 420px" className="aspect-[4/3]" />
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-body-s text-ink">{t(`featured.items.${item.id}`)}</span>
                  <span className="shrink-0 rounded-pill bg-surface-sunk px-2.5 py-0.5 text-[11px] text-ink-3">
                    {t(`categories.items.${item.cat}.title`)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-body-s text-ink-3">{t("featured.note")}</p>
        </Container>
      </Section>

      {/* 4. In operation highlight — reuses the product media viewer */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("highlight.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("highlight.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("highlight.subtitle")}</p>
          </div>
          <div className="mt-10">
            <InOperationGallery media={HIGHLIGHT} tNamespace="Gallery.page.highlight" />
          </div>
        </Container>
      </Section>

      {/* 5. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[720px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <p className="mt-4 text-body-l text-ink-inv-2">{t("finalCta.body")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/company">{t("finalCta.cta.contact")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics">{t("finalCta.cta.robotics")}</Link>
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
