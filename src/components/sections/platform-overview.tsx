import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { PlatformShot } from "@/components/sections/platform-shot";
import { Link } from "@/i18n/navigation";

const BULLETS = ["coordinate", "diagnose", "verify"] as const;

/**
 * Single homepage Platform overview (P0C) — replaces the former multi-section
 * platform run. Left: positioning + 3 bullets + "Explore platform". Right: a
 * compact dark Command Center card (illustrative status only, no metrics). The
 * Platform page itself is unchanged; this is just the entry point.
 */
export function PlatformOverview() {
  const t = useTranslations("PlatformOverview");
  const tCta = useTranslations("Cta");

  return (
    <Section tone="light">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-h1 text-balance">{t("title")}</h2>
              <p className="mt-4 text-body-l text-ink-2">{t("body")}</p>
              <ul className="mt-6 space-y-3">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-cool-tint text-cool-text">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-body text-ink">{t(`bullets.${b}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="secondary" asChild>
                  <Link href="/platform">{tCta("explorePlatform")}</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PlatformShot />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
