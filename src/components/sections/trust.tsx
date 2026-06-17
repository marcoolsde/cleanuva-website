import { useTranslations } from "next-intl";
import {
  Building2,
  Sun,
  Boxes,
  Languages,
  Globe,
  Handshake,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { TRUST_SIGNALS, TRUST_STRIP_KEYS, type TrustSignal } from "@/content/trust";

const ICONS: Record<TrustSignal["icon"], typeof Building2> = {
  Building2,
  Sun,
  Boxes,
  Languages,
  Globe,
  Handshake,
  ShieldCheck,
  MessageSquare,
};

/**
 * Full trust grid (Company page). Truthful signals + an honest status note.
 */
export function TrustSection() {
  const t = useTranslations("Trust");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-ink">{t("heading")}</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_SIGNALS.map((signal, i) => {
            const Icon = ICONS[signal.icon];
            return (
              <Reveal key={signal.key} delay={(i % 4) * 0.05} className="h-full">
                <div className="h-full rounded-lg border border-line bg-canvas p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4 text-ink">{t(`signals.${signal.key}.label`)}</h3>
                  <p className="mt-2 text-body-s text-ink-2">{t(`signals.${signal.key}.desc`)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 max-w-[72ch] text-body-s text-ink-3">{t("status")}</p>
      </Container>
    </Section>
  );
}

/**
 * Slim trust strip (Homepage). A quiet row of key signals — no boast.
 */
export function TrustStrip() {
  const t = useTranslations("Trust");

  return (
    <Section tone="light" className="border-y border-line bg-surface py-12 md:py-14">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST_STRIP_KEYS.map((key) => {
            const signal = TRUST_SIGNALS.find((s) => s.key === key)!;
            const Icon = ICONS[signal.icon];
            return (
              <li key={key} className="inline-flex items-center gap-2 text-body-s text-ink-2">
                <Icon className="size-4 text-cool-text" aria-hidden />
                {t(`signals.${key}.label`)}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
