import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { RoboticsProduct } from "@/components/sections/robotics-product";
import { familyBySlug } from "@/content/robots";

// All three product pages (r-series, u-series, nuvaspan) are now dedicated
// sibling routes that take precedence. This dynamic route only serves unknown
// slugs (→ notFound), so it generates no static params.
export function generateStaticParams() {
  return [] as { family: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}): Promise<Metadata> {
  const { family } = await params;
  const f = familyBySlug(family);
  if (!f) return {};
  return {
    title: `${f.name} — Cleanuva Robotics`,
    description: `${f.name}: platform-connected solar-cleaning robot. Real specs, datasheet, and pricing.`,
  };
}

export default async function RoboticsFamilyPage({
  params,
}: {
  params: Promise<{ locale: string; family: string }>;
}) {
  const { locale, family: slug } = await params;
  setRequestLocale(locale);

  const family = familyBySlug(slug);
  if (!family) notFound();

  return <RoboticsProduct family={family} />;
}
