import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { Fragmentation } from "@/components/sections/fragmentation";
import { OperatingModel } from "@/components/sections/operating-model";
import { LoopStrip } from "@/components/sections/loop-strip";
import { AiCopilot } from "@/components/sections/ai-copilot";
import { CommandCenterPreview } from "@/components/sections/command-center-preview";
import { ConnectedExecution } from "@/components/sections/connected-execution";
import { OutcomeLedger } from "@/components/sections/outcome-ledger";
import { ProofMetrics } from "@/components/sections/proof-metrics";
import { SolutionsRoles } from "@/components/sections/solutions-roles";
import { VisionRoadmap } from "@/components/sections/vision-roadmap";
import { TrustStrip } from "@/components/sections/trust";
import { FinalCta } from "@/components/sections/final-cta";

// Homepage (Phase 2B re-architecture) — story per positioning-v1 §Part 5:
//   problem → unifying idea (hero) → operating model → depth → proof & trajectory.
// Dark bands (Hero, LoopStrip, CommandCenter) are separated by light sections.
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
      <Fragmentation />
      <OperatingModel />
      <LoopStrip />
      <AiCopilot />
      <CommandCenterPreview />
      <ConnectedExecution />
      <OutcomeLedger />
      <ProofMetrics />
      <SolutionsRoles />
      <VisionRoadmap />
      <TrustStrip />
      <FinalCta />
    </>
  );
}
