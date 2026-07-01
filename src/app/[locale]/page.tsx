import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Layers, Radar, Play, BadgeCheck, Sparkles, Check, ArrowRight, type LucideIcon } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { MediaFrame } from "@/components/robotics/media-frame";
import { Link } from "@/i18n/navigation";
import { OVERVIEW_MODELS } from "@/content/compare";

const HERO_IMAGE = "/images/hero/homepage-hero-daylight.jpg";

// Detect → Execute → Verify → Prove. Cool = platform sees/proves; warm = robots execute.
const LOOP: { key: string; Icon: LucideIcon; accent: string }[] = [
  { key: "detect", Icon: Radar, accent: "text-cool-text" },
  { key: "execute", Icon: Play, accent: "text-warm-text" },
  { key: "verify", Icon: BadgeCheck, accent: "text-cool-text" },
  { key: "prove", Icon: Sparkles, accent: "text-status-online" },
];
const AUDIENCE = ["owners", "om", "cleaning", "epc", "partners"] as const;
const PROOF = ["beforeafter", "kwh", "trail", "verification", "evidence"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      {/* 1. Hero — robotics-first: the product is the thesis, bright + clear */}
      <section className="dark relative isolate flex min-h-[80vh] w-full items-end overflow-hidden bg-abyss text-ink-inv">
        <MediaFrame src={HERO_IMAGE} alt="Cleanuva solar cleaning robot on a PV array in daylight" priority sizes="100vw" imageClassName="object-[center_55%]" className="absolute inset-0" />
        {/* Light, localized scrim: left column stays readable, the robot on the right stays bright */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/80 via-abyss/30 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-abyss/60 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-abyss/40 to-transparent" />

        <Container className="relative z-10 w-full pb-14 pt-36 md:pb-20">
          <p className="text-eyebrow text-warm">Cleanuva Robotics</p>
          <h1 className="mt-3 max-w-[16ch] text-display-xl text-balance text-ink-inv">{t("hero.title")}</h1>
          <p className="mt-4 max-w-[52ch] text-body-l text-ink-inv-2">{t("hero.subtitle")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="warm" asChild>
              <Link href="/robotics">{t("cta.viewRobotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("cta.compareRobots")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/get-pricing">{t("cta.getPricing")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/platform">{t("cta.explorePlatform")}</Link>
            </Button>
          </div>

          {/* Four operating modes → the range of the robot line */}
          <dl className="mt-12 grid max-w-[880px] grid-cols-2 overflow-hidden rounded-xl border border-line-inv-strong sm:grid-cols-4">
            {OVERVIEW_MODELS.map((m, i) => (
              <div key={m.id} className={"bg-white/5 px-5 py-4 backdrop-blur" + (i > 0 ? " border-line-inv-strong sm:border-s" : "")}>
                <dd className="text-h4 font-medium text-ink-inv">{t(`hero.modes.${m.i18nKey}`)}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink-inv-3">{m.name}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Product matrix — the robots come first */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{t("matrix.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("matrix.title")}</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OVERVIEW_MODELS.map((m) => (
              <Link
                key={m.id}
                href={m.viewHref}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas transition-colors hover:border-warm/50"
              >
                <MediaFrame src={m.image} alt={m.name} sizes="(max-width:640px) 100vw, 320px" className="aspect-[16/10]" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-h4 text-ink">{m.name}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{t(`matrix.items.${m.i18nKey}`)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-body-s font-medium text-cool-text">
                    {t("cta.viewModel")}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/robotics/compare">{t("cta.compareRobots")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/get-pricing">{t("cta.getPricing")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 3. Choose by operation model */}
      <Section>
        <Container className="max-w-[940px]">
          <Eyebrow accent="warm">{t("chooseOp.eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-h1 text-balance text-ink">{t("chooseOp.title")}</h2>
          <p className="mt-3 text-body-l text-ink-2">{t("chooseOp.intro")}</p>
          <ul className="mt-8">
            {OVERVIEW_MODELS.map((m) => (
              <li key={m.id} className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex flex-wrap items-center gap-3 text-body-l text-ink">
                  <span className="text-ink-2">{t(`chooseOp.items.${m.i18nKey}.need`)}</span>
                  <ArrowRight className="size-4 shrink-0 text-ink-3 rtl:-scale-x-100" aria-hidden />
                  <span className="font-medium text-warm-text">{m.name}</span>
                </p>
                <Button variant="ghostLink" asChild>
                  <Link href={m.viewHref}>{t("cta.view")}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Robotics + Platform — platform as the enhancer, robots primary */}
      <Section tone="dark">
        <Container>
          <div className="max-w-[64ch]">
            <Eyebrow accent="cool">{t("lines.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink-inv">{t("lines.title")}</h2>
            <p className="mt-4 text-h2 text-balance text-ink-inv-2">{t("lines.triad")}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-warm/40 bg-warm/10 p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-warm/20 text-warm">
                <Bot className="size-5" aria-hidden />
              </span>
              <span className="mt-4 text-eyebrow text-warm">{t("lines.robotics.tag")}</span>
              <p className="mt-2 flex-1 text-body-m text-ink-inv-2">{t("lines.robotics.desc")}</p>
              <div className="mt-6">
                <Button variant="warm" asChild>
                  <Link href="/robotics">{t("cta.viewRobotics")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl border border-cool/40 bg-cool/10 p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-cool/20 text-cool">
                <Layers className="size-5" aria-hidden />
              </span>
              <span className="mt-4 text-eyebrow text-cool">{t("lines.platform.tag")}</span>
              <p className="mt-2 flex-1 text-body-m text-ink-inv-2">{t("lines.platform.desc")}</p>
              <div className="mt-6">
                <Button variant="glass" asChild>
                  <Link href="/platform">{t("cta.explorePlatform")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Operating loop — Detect → Execute → Verify → Prove */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[62ch]">
            <Eyebrow accent="warm">{t("loop.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("loop.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("loop.intro")}</p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map(({ key, Icon, accent }, i) => (
              <li key={key} className="flex flex-col rounded-xl border border-line bg-canvas p-6">
                <div className="flex items-center justify-between">
                  <span className={"font-mono text-body-s " + accent}>{`0${i + 1}`}</span>
                  <Icon className={"size-5 " + accent} aria-hidden />
                </div>
                <h3 className="mt-4 text-h4 text-ink">{t(`loop.steps.${key}.name`)}</h3>
                <p className="mt-2 text-body-s text-ink-2">{t(`loop.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. Solutions by customer type */}
      <Section>
        <Container>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("solutions.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("solutions.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((a) => (
              <div key={a} className="flex items-start gap-3 rounded-xl border border-line bg-canvas p-6">
                <Check className="mt-0.5 size-5 shrink-0 text-warm-text" aria-hidden />
                <div>
                  <h3 className="text-h4 text-ink">{t(`solutions.items.${a}.name`)}</h3>
                  <p className="mt-1.5 text-body-s text-ink-2">{t(`solutions.items.${a}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/solutions">{t("cta.viewSolutions")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/distribution-network">{t("cta.distribution")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 7. Platform proof / reporting */}
      <Section tone="light" className="bg-surface">
        <Container>
          <div className="max-w-[62ch]">
            <Eyebrow accent="cool">{t("proof.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance text-ink">{t("proof.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("proof.intro")}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="rounded-2xl border border-line bg-canvas p-6">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow text-ink-3">{t("proof.panel.title")}</span>
                <span className="rounded-pill border border-line px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-ink-3">{t("proof.panel.tag")}</span>
              </div>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-body-s text-ink-2"><span>{t("proof.panel.before")}</span><span className="font-mono">94.2%</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunk"><div className="h-full rounded-full bg-status-warning" style={{ width: "94.2%" }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-body-s text-ink-2"><span>{t("proof.panel.after")}</span><span className="font-mono">98.7%</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunk"><div className="h-full rounded-full bg-status-online" style={{ width: "98.7%" }} /></div>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-4">
                  <span className="text-body-s text-ink-3">{t("proof.panel.recovery")}</span>
                  <span className="font-mono text-h4 text-cool-text">≈ +4.5 pp</span>
                </div>
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-3">
              {PROOF.map((p) => (
                <li key={p} className="flex items-start gap-3 border-t border-line pt-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-cool-text" aria-hidden />
                  <span className="text-body-m text-ink">{t(`proof.items.${p}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-body-s text-ink-3">{t("proof.disclaimer")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/platform">{t("cta.explorePlatform")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/request-demo">{t("cta.requestDemo")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8. Distribution / partner band */}
      <Section>
        <Container className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[62ch]">
            <h2 className="text-h1 text-balance text-ink">{t("partner.title")}</h2>
            <p className="mt-3 text-body-l text-ink-2">{t("partner.body")}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button variant="warm" asChild>
              <Link href="/distribution-network">{t("cta.distribution")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/company">{t("cta.contact")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="dark">
        <Container className="max-w-[760px] text-center">
          <h2 className="text-display-l text-balance text-ink-inv">{t("finalCta.title")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="warm" asChild>
              <Link href="/robotics">{t("cta.viewRobotics")}</Link>
            </Button>
            <Button variant="glass" asChild>
              <Link href="/robotics/compare">{t("cta.compareRobots")}</Link>
            </Button>
            <Button variant="ghostLink" asChild>
              <Link href="/get-pricing">{t("cta.getPricing")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
