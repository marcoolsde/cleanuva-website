import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";
import { ROBOT_FAMILIES } from "@/content/robots";

type ShowcaseCard = {
  id: string;
  name: string;
  tagline: string;
  bestFit: string;
  alt: string;
  image: string;
  scene: string;
  viewHref: string;
  quoteHref: string;
};

/**
 * Homepage Robotics-first showcase. The four unified products: NuvaTrack-R, NuvaTrack-R Pro
 * (an upgrade config of NuvaTrack-R — anchors to the r-series page, no separate
 * route), NuvaTrack-U and NuvaSpan. Reuses the existing family data + copy; the Pro
 * card uses Robotics.home.pro.* (no fabricated specs/prices).
 */
export function RoboticsShowcase() {
  const t = useTranslations("Robotics");
  const th = useTranslations("Robotics.home");
  const tCta = useTranslations("Cta");

  const byId = (id: string) => ROBOT_FAMILIES.find((f) => f.id === id)!;
  const rSeries = byId("nuvatrack-r");
  const nuvaU = byId("nuvatrack-u");
  const nuvaspan = byId("nuvaspan");

  const familyCard = (f: (typeof ROBOT_FAMILIES)[number]): ShowcaseCard => ({
    id: f.id,
    name: f.name,
    tagline: t(`families.${f.key}.tagline`),
    bestFit: t(`families.${f.key}.bestFit`),
    alt: t(`families.${f.key}.alt`),
    image: f.image,
    scene: f.scene,
    viewHref: `/robotics/${f.slug}`,
    quoteHref: f.pricingHref,
  });

  const cards: ShowcaseCard[] = [
    familyCard(rSeries),
    {
      id: "nuvatrack-r-pro",
      name: "NuvaTrack-R Pro",
      tagline: th("pro.tagline"),
      bestFit: th("pro.bestFit"),
      alt: th("pro.alt"),
      image: rSeries.image,
      scene: rSeries.scene,
      viewHref: "/robotics/r-series#nuvatrack-r-pro",
      quoteHref: "/get-pricing?model=nuvatrack-r-pro",
    },
    familyCard(nuvaU),
    familyCard(nuvaspan),
  ];

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="warm">{th("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-balance">{th("title")}</h2>
            <p className="mt-4 text-body-l text-ink-2">{th("intro")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={(i % 4) * 0.06} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-canvas">
                <PhotoPlate
                  ratio="aspect-[16/10]"
                  src={card.image}
                  scene={card.scene}
                  alt={card.alt}
                  className="rounded-none"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h4">{card.name}</h3>
                  <p className="mt-1 text-loop text-warm-text">{card.tagline}</p>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">{card.bestFit}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="warm" size="sm" asChild>
                      <Link href={card.viewHref}>{th("viewModel")}</Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={card.quoteHref}>{tCta("getQuote")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
