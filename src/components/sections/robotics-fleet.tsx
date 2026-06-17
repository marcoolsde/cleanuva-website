import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RoboticsProductHero } from "@/components/sections/robotics-product-hero";
import { Link } from "@/i18n/navigation";
import { ROBOT_FAMILIES } from "@/content/robots";

/**
 * The fleet — three NuvaTrack families, framed as connected execution products
 * (not a standalone hardware catalog). A light intro header precedes the
 * cinematic product heroes. `#fleet` anchors the hero's "Meet the fleet" CTA.
 */
export function RoboticsFleet() {
  const t = useTranslations("Robotics.Fleet");
  const tp = useTranslations("Robotics.product");

  return (
    <div id="fleet">
      <Section tone="light" className="pb-0">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <Eyebrow accent="warm">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1">{t("title")}</h2>
              <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
              <Link
                href="/robotics/compare"
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-warm-text transition-all hover:gap-2.5"
              >
                {tp("compareModels")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {ROBOT_FAMILIES.map((family) => (
        <RoboticsProductHero key={family.id} family={family} />
      ))}
    </div>
  );
}
