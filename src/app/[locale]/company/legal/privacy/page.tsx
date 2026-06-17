import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy — Cleanuva",
  description: "How NETRO Sparkle GmbH processes personal data on the Cleanuva website.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.privacy");

  return (
    <LegalShell title={t("title")} note={t("note")} sections={t.raw("sections") as LegalSection[]} />
  );
}
