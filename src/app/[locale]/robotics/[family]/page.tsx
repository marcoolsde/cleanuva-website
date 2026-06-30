import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { RoboticsProduct } from "@/components/sections/robotics-product";
import { ROBOT_FAMILIES, familyBySlug } from "@/content/robots";

// Static product pages: /robotics/u-series, /robotics/nuvaspan.
// /robotics/r-series and /robotics/compare are dedicated sibling routes that take
// precedence — r-series is excluded here so the dedicated P4R-1 page renders.
export function generateStaticParams() {
  return ROBOT_FAMILIES.filter((f) => f.slug !== "r-series").map((f) => ({ family: f.slug }));
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
