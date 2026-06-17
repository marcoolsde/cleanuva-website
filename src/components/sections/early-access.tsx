import { useTranslations } from "next-intl";
import { FileSpreadsheet, FileText, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

/**
 * CSV Sandbox / Inspection-PDF Analysis (Phase C3). Early Access capability
 * demonstration. Value/use-case only — no validation, onboarding, format, or
 * compatibility detail. CTA routes to Request Demo.
 */
const USE_CASES = [
  { key: "csv", icon: FileSpreadsheet },
  { key: "pdf", icon: FileText },
] as const;

export function EarlyAccess() {
  const t = useTranslations("Platform.EarlyAccess");

  return (
    <Section tone="light">
      <Container>
        <div className="rounded-xl border border-line bg-surface p-8 md:p-12">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-cool/30 bg-cool-tint px-2.5 py-1 text-[11px] font-medium text-cool-text">
              <span className="size-1.5 rounded-full bg-cool" aria-hidden />
              {t("badge")}
            </span>
            <h2 className="mt-4 max-w-[20ch] text-h1 text-balance">{t("title")}</h2>
            <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {USE_CASES.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4">{t(`useCases.${key}.title`)}</h3>
                  <p className="mt-2 text-body-s text-ink-2">{t(`useCases.${key}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/request-demo">
                  {t("cta")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
              <p className="text-caption text-ink-3">{t("note")}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
