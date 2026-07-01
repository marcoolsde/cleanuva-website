import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Imprint / Legal Notice | Cleanuva",
  description: "Legal disclosure (Impressum) for NETRO Sparkle GmbH pursuant to § 5 DDG — the legal entity behind the Cleanuva brand.",
};

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.imprint");

  // Values come from the single source (content/legal.ts). Managing director +
  // phone are intentionally omitted until confirmed data exists (they still hold
  // "TODO") — we never render placeholder values. Labels are localized.
  const rows: { label: string; value: string }[] = [
    { label: t("labels.entity"), value: LEGAL.entity },
    { label: t("labels.address"), value: LEGAL.registeredOffice },
    { label: t("labels.court"), value: LEGAL.registerCourt },
    { label: t("labels.hrb"), value: LEGAL.hrb },
    { label: t("labels.vat"), value: LEGAL.vatId },
    { label: t("labels.email"), value: LEGAL.contactEmail },
    { label: t("labels.website"), value: "cleanuva.ai" },
  ];

  return (
    <LegalShell title={t("title")} note={t("note")} sections={t.raw("sections") as LegalSection[]}>
      <div className="mt-8 rounded-lg border border-line bg-surface-sunk p-6">
        <p className="text-eyebrow text-ink-3">{t("providerHeading")}</p>
        <p className="mt-3 text-body-m text-ink-2">{t("brandOf")}</p>
        <dl className="mt-5 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[140px_1fr] gap-4 border-b border-line/60 pb-2 last:border-0"
            >
              <dt className="text-body-s text-ink-3">{row.label}</dt>
              <dd className="text-body-m text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </LegalShell>
  );
}
