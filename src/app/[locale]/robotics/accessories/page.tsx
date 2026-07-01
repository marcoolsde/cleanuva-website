import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { AccessoryImage } from "@/components/sections/accessory-image";
import { AccessoryInquiryForm } from "@/components/forms/accessories-inquiry-form";
import { Link } from "@/i18n/navigation";
import { ACCESSORY_MODELS } from "@/content/accessories";
import { LEGAL } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("accessories", locale);
}

const HERO_IMAGE = "/images/robotics/r-series-op-1.jpg";

// Six accessory buckets — each maps to a real photo (graceful icon fallback) and
// stays conservative on availability (model-dependent, confirmed with Cleanuva).
const CATEGORIES: { id: string; icon: string; image: string }[] = [
  { id: "brushes", icon: "Brush", image: "/images/accessories/brushes.jpg" },
  { id: "consumables", icon: "Recycle", image: "/images/accessories/water-system.jpg" },
  { id: "control", icon: "Gamepad2", image: "/images/accessories/remote-controllers.jpg" },
  { id: "power", icon: "BatteryCharging", image: "/images/accessories/batteries.jpg" },
  { id: "service", icon: "Cog", image: "/images/accessories/motors.jpg" },
  { id: "support", icon: "Wrench", image: "/images/accessories/service-kits.jpg" },
];

const CHECKLIST = ["i1", "i2", "i3", "i4", "i5", "i6", "i7"] as const;
const COMPAT_POINTS = ["point1", "point2", "point3"] as const;

export default async function AccessoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Robotics.accessories");
  const tA = await getTranslations("Forms.Accessory");

  return (
    <>
      {/* 1. Cinematic parts-page hero — real robot detail, not a contact page */}
      <section className="dark relative isolate flex min-h-[70vh] w-full items-end overflow-hidden bg-abyss text-ink-inv">
        <MediaFrame
          src={HERO_IMAGE}
          alt="Cleanuva cleaning robot in the field"
          priority
          imageClassName="object-[center_40%]"
          className="absolute inset-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />

        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-l text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[52ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[60ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <a href="#accessories-inquiry">{t("cta.sendInquiry")}</a>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("cta.compareRobots")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/support">{t("cta.contactSupport")}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Accessory categories — real photos, conservative availability */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("categories.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("categories.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("categories.intro")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ id, icon, image }) => (
              <article key={id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas">
                <AccessoryImage src={image} alt={t(`categories.items.${id}.title`)} icon={icon} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 text-ink">{t(`categories.items.${id}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{t(`categories.items.${id}.desc`)}</p>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-ink-3">{t(`categories.items.${id}.note`)}</p>
                  <a
                    href="#accessories-inquiry"
                    className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text underline-offset-4 hover:underline"
                  >
                    {t("cta.addToInquiry")}
                    <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Choose by robot model */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("chooseModel.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("chooseModel.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("chooseModel.intro")}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACCESSORY_MODELS.map((m) => (
              <div key={m.id} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <span className="text-eyebrow text-ink-3">{t(m.typeKey)}</span>
                <h3 className="mt-1.5 text-h3 text-ink">{m.name}</h3>
                <p className="mt-2 flex-1 text-body-s text-ink-2">{t(m.noteKey)}</p>
                <a
                  href="#accessories-inquiry"
                  className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text underline-offset-4 hover:underline"
                >
                  {t("cta.startInquiry")}
                  <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
                </a>
              </div>
            ))}
            {/* Not sure yet — encourage an inquiry without a chosen model */}
            <div className="flex flex-col rounded-xl border border-cool/50 bg-cool-tint/40 p-6">
              <span className="text-eyebrow text-cool-text">{t("chooseModel.notSure.badge")}</span>
              <h3 className="mt-1.5 text-h3 text-ink">{t("chooseModel.notSure.name")}</h3>
              <p className="mt-2 flex-1 text-body-s text-ink-2">{t("chooseModel.notSure.note")}</p>
              <a
                href="#accessories-inquiry"
                className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text underline-offset-4 hover:underline"
              >
                {t("cta.startInquiry")}
                <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. What to include in your inquiry — lead-quality checklist */}
      <Section tone="light" className="bg-surface">
        <Container className="max-w-[900px]">
          <Eyebrow accent="warm">{t("checklist.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("checklist.title")}</h2>
          <p className="mt-3 text-body-l text-ink-2">{t("checklist.intro")}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {CHECKLIST.map((i) => (
              <li key={i} className="flex items-start gap-3 border-t border-line pt-4">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <span className="text-body-m text-ink">{t(`checklist.${i}`)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-body-s text-ink-3">{t("checklist.photoNote")}</p>
        </Container>
      </Section>

      {/* 5. Compatibility note — professional, not alarming */}
      <Section>
        <Container className="max-w-[760px]">
          <Eyebrow accent="cool">{t("compatEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h2 text-balance text-ink">{t("compatTitle")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{t("compatLead")}</p>
          <ul className="mt-6 space-y-3">
            {COMPAT_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cool" />
                <span className="text-body text-ink-2">{t(`compat.${p}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6. Accessories inquiry form — unchanged logic, anchor for all page CTAs */}
      <Section id="accessories-inquiry" tone="light" className="scroll-mt-24 bg-surface">
        <Container className="max-w-[760px]">
          <Eyebrow accent="warm">{t("inquiryEyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{tA("title")}</h2>
          <p className="mt-4 text-body-l text-ink-2">{tA("subtitle", { email: LEGAL.contactEmail })}</p>
          <div className="mt-10 rounded-2xl border border-line bg-canvas p-6 sm:p-8">
            <AccessoryInquiryForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
