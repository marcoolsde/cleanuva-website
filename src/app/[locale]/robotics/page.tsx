import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { RoboticsHero } from "@/components/sections/robotics-hero";
import { RoboticsAutonomy } from "@/components/sections/robotics-autonomy";
import { RoboticsAdvantage } from "@/components/sections/robotics-advantage";
import { RoboticsFleet } from "@/components/sections/robotics-fleet";
import { RoboticsPartner } from "@/components/sections/robotics-partner";
import { RoboticsCta } from "@/components/sections/robotics-cta";

export const metadata: Metadata = {
  title: "Robotics — Cleanuva",
  description:
    "Solar cleaning robots: NuvaTrack-R, NuvaTrack-R Pro, NuvaTrack-U and NuvaSpan — dispatched, scheduled and verified by the Cleanuva platform.",
};

// Robotics overview (Phase 5A) — product-led and autonomy-forward:
//   Hero (autonomy vision) → Autonomy (the core narrative) → Advantage (platform
//   connection as the edge) → the Fleet → slim partner/trust note → CTA.
export default async function RoboticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RoboticsHero />
      <RoboticsAutonomy />
      <RoboticsAdvantage />
      <RoboticsFleet />
      <RoboticsPartner />
      <RoboticsCta />
    </>
  );
}
