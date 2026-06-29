import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { Link } from "@/i18n/navigation";
import { ROBOT_FAMILIES } from "@/content/robots";

/**
 * Homepage Robotics-first showcase (P0B). Brings the three Cleanuva Robotics
 * product lines up right after the Hero — compact product cards reusing the
 * existing family data + copy (tagline, best-fit). No fabricated specs/prices.
 */
export function RoboticsShowcase() {
  const t = useTranslations("Robotics");
  const th = useTranslations("Robotics.home");
  const tCta = useTranslations("Cta");

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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ROBOT_FAMILIES.map((family, i) => (
            <Reveal key={family.id} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-canvas">
                <PhotoPlate
                  ratio="aspect-[16/10]"
                  src={family.image}
                  scene={family.scene}
                  alt={t(`families.${family.key}.alt`)}
                  className="rounded-none"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h4">{family.name}</h3>
                  <p className="mt-1 text-loop text-warm-text">
                    {t(`families.${family.key}.tagline`)}
                  </p>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`families.${family.key}.bestFit`)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="warm" size="sm" asChild>
                      <Link href={`/robotics/${family.slug}`}>{th("viewModel")}</Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={family.pricingHref}>{tCta("getQuote")}</Link>
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
