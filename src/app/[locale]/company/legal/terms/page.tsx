import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Use | Cleanuva",
  description: "Website terms of use for Cleanuva — general international business information; product availability and terms depend on country, project configuration and a separate agreement.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.terms");

  return (
    <LegalShell title={t("title")} note={t("note")} sections={t.raw("sections") as LegalSection[]} />
  );
}
