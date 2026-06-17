import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { RoboticsCompare } from "@/components/sections/robotics-compare";

export const metadata: Metadata = {
  title: "Compare NuvaTrack models — Cleanuva Robotics",
  description:
    "Compare the NuvaTrack R-Series, U-Series, and NuvaSpan — coverage, operation mode, and best-fit deployment.",
};

export default async function RoboticsComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RoboticsCompare />;
}
