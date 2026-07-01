import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalShell, type LegalSection } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Cookie Policy | Cleanuva",
  description: "Cleanuva uses only technically necessary cookies or storage where required — no advertising or analytics cookies at this time.",
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.cookies");

  return (
    <LegalShell title={t("title")} note={t("note")} sections={t.raw("sections") as LegalSection[]} />
  );
}
