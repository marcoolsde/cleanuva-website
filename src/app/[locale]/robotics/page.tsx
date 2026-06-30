import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";
import { OVERVIEW_MODELS } from "@/content/compare";

export const metadata: Metadata = {
  title: "Cleanuva Robotics — solar cleaning robots",
  description:
    "Cleanuva Robotics: NuvaTrack-R (remote), NuvaTrack-R Pro (AI-Assist), NuvaTrack-U (unattended) and NuvaSpan (fixed / suspended). Compare models, see pricing and accessories.",
};

const HERO_IMAGE = "/images/robotics/overview-hero.jpg";

const PLATFORM_STEPS = ["s1", "s2", "s3"] as const;
const ACCESSORY_ITEMS = ["a1", "a2", "a3", "a4", "a5"] as const;

export default async function RoboticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Robotics.overview");

  return (
    <>
      {/* 1. Index hero — the product line, stated up front over a real site */}
      <section className="dark relative isolate flex min-h-[78vh] w-full items-end overflow-hidden bg-abyss text-ink-inv">
        <MediaFrame
          src={HERO_IMAGE}
          alt="Utility-scale PV site cleaned by Cleanuva Robotics"
          priority
          imageClassName="object-[center_45%]"
          className="absolute inset-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/45 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />

        <Container className="relative z-10 w-full pb-12 pt-36 md:pb-16">
          <p className="text-eyebrow text-warm">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-display-xl text-balance text-ink-inv">Cleanuva Robotics</h1>
          <p className="mt-4 max-w-[52ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>
          <p className="mt-3 max-w-[64ch] text-body-m text-ink-inv-3">{t("hero.support")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/robotics/compare">{t("cta.compareModels")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/get-pricing">{t("cta.getPricing")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/accessories">{t("cta.viewAccessories")}</Link>
            </Button>
          </div>

          {/* Operation-spectrum strip — the four modes, each tied to its model */}
          <dl className="mt-12 grid max-w-[920px] grid-cols-2 overflow-hidden rounded-xl border border-line-inv-strong sm:grid-cols-4">
            {OVERVIEW_MODELS.map((m, i) => (
              <div
                key={m.id}
                className={"bg-white/5 px-5 py-4 backdrop-blur" + (i > 0 ? " border-line-inv-strong sm:border-s" : "")}
              >
                <dd className="text-h4 font-medium text-ink-inv">{t(`hero.modes.${m.i18nKey}`)}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">{m.name}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Product family cards */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("cards.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("cards.title")}</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {OVERVIEW_MODELS.map((m) => (
              <div key={m.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-canvas">
                <MediaFrame src={m.image} alt={m.name} sizes="(max-width:640px) 100vw, 560px" className="aspect-[16/9]" />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-h2 text-ink">{m.name}</h3>
                  <p className="mt-2 text-body-m text-ink-2">{t(`cards.${m.i18nKey}.tagline`)}</p>
                  <p className="mt-3 flex items-start gap-2 text-body-s text-ink-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-warm-text" aria-hidden />
                    {t(`cards.${m.i18nKey}.fit`)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="secondary" asChild>
                      <Link href={m.viewHref}>{t("cta.viewProduct")}</Link>
                    </Button>
                    <Button variant="ghostLink" asChild>
                      <Link href={m.pricingHref}>{t("cta.getPricing")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Choose by operation model — need → model */}
      <Section>
        <Container className="max-w-[940px]">
          <Eyebrow accent="cool">{t("choose.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("choose.title")}</h2>
          <ul className="mt-8">
            {OVERVIEW_MODELS.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="flex items-center gap-3 text-body-l text-ink">
                  <span className="text-ink-2">{t(`choose.${m.i18nKey}.need`)}</span>
                  <ArrowRight className="size-4 shrink-0 text-ink-3" aria-hidden />
                  <span className="font-medium text-warm-text">{m.name}</span>
                </p>
                <Link
                  href={m.viewHref}
                  className="text-body-s font-medium text-cool-text underline-offset-4 hover:underline"
                >
                  {t("cta.viewModel")}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button variant="secondary" asChild>
              <Link href="/robotics/compare">{t("cta.compareAll")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. Automation ladder — signature: each model adds automation over the last */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="warm">{t("ladder.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("ladder.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("ladder.intro")}</p>
          </div>

          {/* Rising rail: 4 rungs stepping up as automation increases */}
          <ol className="mt-12 grid gap-x-4 gap-y-6 lg:grid-cols-4 lg:items-end">
            {OVERVIEW_MODELS.map((m, i) => (
              <li key={m.id} style={{ ["--rung" as string]: `${(3 - i) * 1.75}rem` }} className="lg:pt-[var(--rung)]">
                <div className="relative flex flex-col rounded-xl border border-line bg-canvas p-6">
                  {/* rung number + connector */}
                  <span className="font-mono text-body-s text-warm-text">{`0${i + 1}`}</span>
                  <span aria-hidden className="mt-3 h-1 w-10 rounded-full bg-[image:var(--current)]" />
                  <h3 className="mt-4 text-h3 text-ink">{t(`ladder.${m.i18nKey}.level`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{t(`ladder.${m.i18nKey}.role`)}</p>
                  <Link
                    href={m.viewHref}
                    className="mt-5 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text underline-offset-4 hover:underline"
                  >
                    {m.name}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5. Robotics + platform connection — kept after the product line, not first */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("platform.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("platform.title")}</h2>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {PLATFORM_STEPS.map((s, i) => (
              <li key={s} className="flex flex-col bg-canvas p-6">
                <span className="font-mono text-body-s text-warm-text">{`0${i + 1}`}</span>
                <h3 className="mt-3 text-h4 text-ink">{t(`platform.${s}.label`)}</h3>
                <p className="mt-2 text-body-m text-ink-2">{t(`platform.${s}.body`)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/platform">{t("cta.explorePlatform")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/request-demo">{t("cta.requestDemo")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. Accessories and service */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("accessories.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("accessories.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("accessories.intro")}</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {ACCESSORY_ITEMS.map((a) => (
              <li
                key={a}
                className="inline-flex items-center gap-2 rounded-pill border border-line bg-canvas px-4 py-2 text-body-s text-ink"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-cool" />
                {t(`accessories.${a}`)}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/robotics/accessories">{t("cta.viewAccessories")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/robotics/accessories#accessories-inquiry">{t("cta.askService")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 7. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[720px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/robotics/compare">{t("cta.compareModels")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/get-pricing">{t("cta.getPricing")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/request-demo">{t("cta.talk")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
