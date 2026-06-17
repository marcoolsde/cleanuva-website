import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PlatformHero } from "@/components/sections/platform-hero";
import { IntelArc } from "@/components/sections/intel-arc";
import { AiCopilot } from "@/components/sections/ai-copilot";
import { CapabilityRows } from "@/components/sections/capability-rows";
import { CommandCenter } from "@/components/sections/command-center";
import { WorksWithData } from "@/components/sections/works-with-data";
import { EarlyAccess } from "@/components/sections/early-access";
import { Deployment } from "@/components/sections/deployment";
import { SecurityTrust } from "@/components/sections/security-trust";
import { RoiBand } from "@/components/sections/roi-band";
import { PlatformFaq } from "@/components/sections/platform-faq";
import { PlatformCta } from "@/components/sections/platform-cta";

export const metadata: Metadata = {
  title: "Platform — Cleanuva",
  description:
    "The AI-native operating layer for solar: operational intelligence, coordination, and accountability — with an AI Copilot grounded in your plant's own knowledge.",
};

// Platform page (Phase 3) — organized by the three-layer operating model:
//   Intelligence (Hero → arc → Copilot → capabilities) → Coordination (Command
//   Center) → Accountability (proof). The ROI band is demoted to the closing
//   accountability/proof beat (positioning-v1: proof is the closing movement).
export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PlatformHero />
      <IntelArc />
      <AiCopilot id="copilot" />
      <CapabilityRows />
      <CommandCenter />
      <WorksWithData />
      <EarlyAccess />
      <Deployment />
      <SecurityTrust />
      <RoiBand />
      <PlatformFaq />
      <PlatformCta />
    </>
  );
}
