import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { ProductVideo } from "@/components/sections/product-video";
import { DatasheetButton } from "@/components/sections/datasheet-button";
import { Link } from "@/i18n/navigation";
import { type RobotFamily, FEATURE_KEYS, DEPLOYMENT_KEYS } from "@/content/robots";

/**
 * Cleanuva Robotics product page (RP-3). Eight sections — banner, demo video,
 * summary, key features, technical data, deployment, datasheet, final CTA.
 * Premium-restrained Cleanuva language; all specs are datasheet-sourced (RP-0).
 */
export function RoboticsProduct({ family }: { family: RobotFamily }) {
  const t = useTranslations("Robotics");
  const tp = useTranslations("Robotics.product");
  const tf = useTranslations(`Robotics.families.${family.key}`);
  const tpro = useTranslations("Robotics.proBlock");
  const tCta = useTranslations("Cta");

  // NuvaR Pro lives as an upgrade configuration on the NuvaR (r-series) page —
  // no separate route. The #nuvar / #nuvar-pro anchors back the header dropdown.
  const isRSeries = family.id === "nuvatrack-r";

  return (
    <>
      {/* 1. Hero banner */}
      <section
        id={isRSeries ? "nuvatrack-r" : undefined}
        className="dark relative isolate flex min-h-[560px] w-full items-end overflow-hidden scroll-mt-20 text-ink-inv md:min-h-[80vh]"
      >
        <PhotoPlate fill src={family.image} scene={family.scene} alt={tf("alt")} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/35 to-abyss/10" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-abyss/55 to-transparent" />
        <Container className="relative z-10 pt-28 pb-16 md:pb-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow accent="warm">{family.name}</Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-line-inv-strong bg-white/10 px-2.5 py-1 text-[11px] font-medium text-ink-inv backdrop-blur">
                <span className="size-1.5 rounded-full bg-cool" aria-hidden />
                {t("platformConnected")}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-[20ch] text-display-l text-balance text-ink-inv">{tf("tagline")}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[54ch] text-body-l text-ink-inv-2">{tf("positioning")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/request-demo">{tCta("requestDemo")}</Link>
              </Button>
              <Button variant="warm" asChild>
                <Link href={family.pricingHref}>{tCta("getPricing")}</Link>
              </Button>
              <DatasheetButton
                href={family.datasheet}
                downloadLabel={tp("downloadDatasheet")}
                requestLabel={tp("requestDatasheet")}
                variant="glass"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Demo video */}
      <Section tone="light">
        <Container>
          <Reveal>
            <Eyebrow accent="warm">{tp("sections.video")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6">
              <ProductVideo
                src={family.video}
                poster={family.image}
                alt={tf("alt")}
                playLabel={tp("videoPlay")}
                pauseLabel={tp("videoPause")}
                soonLabel={tp("videoSoon")}
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Product summary */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <Eyebrow accent="neutral">{tp("sections.summary")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance">{tp("summaryTitle")}</h2>
              <p className="mt-4 text-body-l text-ink-2">{tf("line")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
              {family.metrics.map((m) => (
                <div key={m.key}>
                  <dd className="font-mono text-4xl font-medium text-ink md:text-5xl">{m.value}</dd>
                  <dt className="mt-1 text-eyebrow text-ink-3">{t(`specs.${m.key}`)}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-body-s text-ink-3">
              <span className="text-ink-2">{tp("bestForLabel")}</span> {tf("bestFit")}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 3b. NuvaR or NuvaR Pro? — r-series only; NuvaR Pro upgrade configuration. */}
      {isRSeries ? (
        <Section tone="light" id="nuvatrack-r-pro" className="scroll-mt-20 bg-surface">
          <Container className="max-w-[1000px]">
            <Reveal>
              <div className="max-w-[60ch]">
                <Eyebrow accent="warm">{tpro("eyebrow")}</Eyebrow>
                <h2 className="mt-3 text-h1 text-balance">{tpro("title")}</h2>
                <p className="mt-4 text-body-l text-ink-2">{tpro("intro")}</p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-line bg-canvas p-7">
                  <h3 className="text-h3 text-ink">{tpro("nuvar.title")}</h3>
                  <p className="mt-2 flex-1 text-body-m text-ink-2">{tpro("nuvar.desc")}</p>
                  <div className="mt-5">
                    <Button variant="warm" asChild>
                      <Link href="/get-pricing?model=nuvatrack-r">{tCta("getQuote")}</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-cool/40 bg-cool-tint/30 p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-h3 text-ink">{tpro("nuvarPro.title")}</h3>
                    <span className="rounded-pill bg-cool-tint px-2.5 py-0.5 text-[12px] font-medium text-cool-text">
                      {tpro("upgradeBadge")}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-body-m text-ink-2">{tpro("nuvarPro.desc")}</p>
                  <div className="mt-5">
                    <Button variant="secondary" asChild>
                      <Link href="/get-pricing?model=nuvatrack-r-pro">{tpro("proCta")}</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 4. Key features */}
      <Section tone="light">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="warm">{tp("sections.features")}</Eyebrow>
              <h2 className="mt-3 text-h1">{tp("featuresTitle")}</h2>
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {FEATURE_KEYS.map((k, i) => (
              <Reveal key={k} delay={(i % 2) * 0.06}>
                <li className="flex gap-3 border-t border-line pt-4 text-body-m text-ink">
                  <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                  {tf(`features.${k}`)}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. Technical specifications */}
      <Section tone="light" className="bg-surface">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <Eyebrow accent="neutral">{tp("sections.specs")}</Eyebrow>
              <h2 className="mt-3 text-h2">{tp("specsTitle")}</h2>
              <p className="mt-3 text-body-s text-ink-3">{tp("specsNote")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="divide-y divide-line border-t border-line">
              {family.specs.map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="text-body-s text-ink-2">{t(`specs.${s.key}`)}</dt>
                  <dd className="font-mono text-body-s text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 6. Deployment & use cases */}
      <Section tone="light">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="neutral">{tp("sections.useCases")}</Eyebrow>
              <h2 className="mt-3 text-h1">{tp("deploymentTitle")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DEPLOYMENT_KEYS.map((k, i) => (
              <Reveal key={k} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                  <h3 className="text-h4">{tf(`deployment.${k}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{tf(`deployment.${k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6b. In operation — lightweight, replaceable media gallery. First tile is
           the real hero asset; the others are future slots (graceful gradient
           placeholders until real photos drop in — never a broken image). */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="max-w-[60ch]">
              <Eyebrow accent="warm">{tp("mediaEyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1">{tp("mediaTitle")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              family.image,
              `/images/robotics/${family.slug}-op-1.jpg`,
              `/images/robotics/${family.slug}-op-2.jpg`,
            ].map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <PhotoPlate ratio="aspect-[4/3]" src={src} scene={family.scene} alt={tf("alt")} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Datasheet download */}
      <Section tone="light" id="datasheet">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-xl border border-line bg-canvas p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[52ch]">
                <Eyebrow accent="neutral">{tp("sections.datasheet")}</Eyebrow>
                <h2 className="mt-3 text-h2">{tp("datasheetTitle")}</h2>
                <p className="mt-2 text-body-m text-ink-2">{tp("datasheetBody")}</p>
              </div>
              <DatasheetButton
                href={family.datasheet}
                downloadLabel={tp("downloadDatasheet")}
                requestLabel={tp("requestDatasheet")}
                variant="primary"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7b. Accessories & service parts — entry to the Accessories page (no
           parts table / prices / SKUs here; just the cross-sell entry). */}
      <Section tone="light" className="bg-surface">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-xl border border-line bg-canvas p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-[60ch]">
                <Eyebrow accent="warm">{tp("accessoriesEyebrow")}</Eyebrow>
                <h2 className="mt-2 text-h2">{tp("accessoriesTitle")}</h2>
                <p className="mt-3 text-body-m text-ink-2">{tp("accessoriesBody")}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button variant="warm" asChild>
                  <Link href="/robotics/accessories">{tp("accessoriesView")}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/robotics/accessories#accessories-inquiry">
                    {tp("accessoriesParts")}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. Final CTA */}
      <Section tone="light">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[46ch] text-center">
              <span aria-hidden className="mx-auto block h-[3px] w-[120px] rounded-pill bg-[image:var(--current)]" />
              <h2 className="mt-6 text-display-l text-balance">{tp("ctaTitle")}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-ink-2">{tp("ctaBody")}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button variant="warm" asChild>
                  <Link href={family.pricingHref}>{tCta("getPricing")}</Link>
                </Button>
                <Button variant="primary" asChild>
                  <Link href="/request-demo">{tCta("requestDemo")}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/robotics/compare">{tp("compareModels")}</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
