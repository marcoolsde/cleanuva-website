import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";

/**
 * Platform page closing CTA (build-plan P8). Ends with confidence and clarity,
 * not hype — Demo primary, "See the Command Center" secondary.
 */
export function PlatformCta() {
  const t = useTranslations("Platform.Cta");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[44ch] text-center">
            <span
              aria-hidden
              className="mx-auto block h-[3px] w-[120px] rounded-pill bg-[image:var(--current)]"
            />
            <h2 className="mt-6 text-display-l text-balance">{t("title")}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-ink-2">
              {t("body")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/request-demo">{tCta("requestDemo")}</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/platform#command-center">{tCta("seeCommandCenter")}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
