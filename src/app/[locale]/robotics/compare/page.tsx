import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { RoboticsCompare } from "@/components/sections/robotics-compare";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("compare", locale);
}

export default async function RoboticsComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RoboticsCompare />;
}
