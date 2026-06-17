import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";

/**
 * Robotics closing CTA — commercial and on-positioning: robotics is strongest
 * connected to the platform. Get pricing (warm, primary) + See the platform.
 */
export function RoboticsCta() {
  const t = useTranslations("Robotics.Cta");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[46ch] text-center">
            <span
              aria-hidden
              className="mx-auto block h-[3px] w-[120px] rounded-pill bg-[image:var(--current)]"
            />
            <h2 className="mt-6 text-display-l text-balance">{t("title")}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-ink-2">
              {t("body")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="warm" asChild>
                <Link href="/get-pricing">{tCta("getPricing")}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/platform">{t("seePlatform")}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
