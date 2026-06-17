import { useTranslations } from "next-intl";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { LoopSVG } from "@/components/loop/loop-svg";

// Intelligence arc = the cool half of the loop only (Connect → Analyze →
// Inspect). No Execute/Verify here — Robotics is not the protagonist on Platform.
const STAGES = [
  { key: "connect", color: "#7FD8D0" },
  { key: "analyze", color: "#22D3C2" },
  { key: "inspect", color: "#5FE0B0" },
] as const;

/** Intelligence arc (build-plan P2), cool-dominant. */
export function IntelArc() {
  const t = useTranslations("Platform.IntelArc");

  return (
    <Section tone="light" id="intelligence">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[60ch] text-center">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-3 text-body-m text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        {/* The arc on a cool-tinted panel — crisp current on light (no glow). */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-lg border border-line bg-cool-tint/40 px-6 py-10 text-cool-text">
            <LoopSVG mode="intel-arc" className="mx-auto max-w-[680px]" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.key} delay={i * 0.08}>
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                    aria-hidden
                  />
                  <span className="text-loop text-cool-text">
                    {t(`stages.${stage.key}.title`)}
                  </span>
                </div>
                <p className="mt-2 text-body-s text-ink-2">
                  {t(`stages.${stage.key}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
