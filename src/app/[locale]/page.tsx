import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { RoboticsShowcase } from "@/components/sections/robotics-showcase";
import { HomeRoboticsVideo } from "@/components/sections/home-robotics-video";
import { PlatformOverview } from "@/components/sections/platform-overview";
import { SolutionsRoles } from "@/components/sections/solutions-roles";
import { FinalCta } from "@/components/sections/final-cta";

// Homepage (robotics-first, simplified). Equipment-company narrative, lean:
// hero (robots + AI platform) → product lines → machine in action (centered
// video) → ONE platform overview → who it's for → convert. The heavier
// explainer/proof sections (Fragmentation, OperatingModel, LoopStrip, AiCopilot,
// CommandCenterPreview, ConnectedExecution, OutcomeLedger, ProofMetrics,
// ProofImpact, VisionRoadmap, TrustStrip) are kept as components but no longer
// rendered here, to cut homepage density.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <RoboticsShowcase />
      <HomeRoboticsVideo />
      <PlatformOverview />
      <SolutionsRoles />
      <FinalCta />
    </>
  );
}
