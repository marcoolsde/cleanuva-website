import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";

/**
 * Closing dual-path conversion band (build-plan #11). One of only two places
 * (with the header) where Demo + Pricing sit together — Demo still leads
 * visually (primary ink vs warm).
 */
export function FinalCta() {
  const t = useTranslations("FinalCta");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[40ch] text-center">
            {/* Single Current accent stroke */}
            <span
              aria-hidden
              className="mx-auto block h-[3px] w-[120px] rounded-pill bg-[image:var(--current)]"
            />
            <h2 className="mt-6 text-display-l text-balance">{t("title")}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-ink-2">
              {t("body")}
            </p>
            {/* Robotics-first (P0B): robot quote leads; demo is secondary. */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="warm" asChild>
                <Link href="/get-pricing">{tCta("getQuote")}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/request-demo">{tCta("requestDemo")}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
