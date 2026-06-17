import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Globe,
  KeyRound,
  FileClock,
  BadgeCheck,
  Plug,
  Lock,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { SECURITY_ITEMS, type SecurityItem } from "@/content/security";

const ICONS: Record<SecurityItem["icon"], typeof ShieldCheck> = {
  ShieldCheck,
  Globe,
  KeyRound,
  FileClock,
  BadgeCheck,
  Plug,
  Lock,
};

/**
 * Security & trust (build-plan P6). Understated and concrete — the controls
 * IPPs, owners, utilities, and enterprise O&M ask about, described plainly.
 */
export function SecurityTrust() {
  const t = useTranslations("Platform.Security");

  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.key} delay={(i % 3) * 0.05}>
                <div className="flex h-full gap-4 bg-canvas p-6">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-sunk text-ink-2">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h4">{t(`items.${item.key}.title`)}</h3>
                    <p className="mt-1.5 text-body-s text-ink-2">
                      {t(`items.${item.key}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
