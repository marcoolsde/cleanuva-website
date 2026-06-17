import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { LoopSVG } from "@/components/loop/loop-svg";

// Node colors mirror LoopSVG (design-system §3): cool → mid → warm → verified.
const VERBS = [
  { key: "connect", color: "#7FD8D0" },
  { key: "analyze", color: "#22D3C2" },
  { key: "inspect", color: "#5FE0B0" },
  { key: "execute", color: "#FFB347" },
  { key: "verify", color: "#3FD17A" },
] as const;

/**
 * Earned-dark band #1 — the Loop as connective tissue between the two pillars,
 * NOT the centerpiece. Slim (py-16/20), supportive. Dark = "the system is alive"
 * via the flowing current + dotted operational grid (build-plan #6).
 */
export function LoopStrip() {
  const t = useTranslations("Loop");

  return (
    <section
      id="loop"
      className="dark relative overflow-hidden bg-abyss py-16 text-ink-inv md:py-20"
    >
      {/* Faint dotted operational grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-[60ch] text-center">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h2 text-ink-inv">{t("title")}</h2>
            <p className="mt-3 text-body-s text-ink-inv-2">{t("body")}</p>
          </div>
        </Reveal>

        {/* Pillar end-tags the loop connects */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-eyebrow text-cool">
            <span className="size-2 rounded-full bg-cool" aria-hidden />
            {t("platformTag")}
          </span>
          <span className="inline-flex items-center gap-2 text-eyebrow text-warm">
            {t("roboticsTag")}
            <span className="size-2 rounded-full bg-warm" aria-hidden />
          </span>
        </div>

        {/* The current — flowing cool → warm */}
        <div className="mt-2">
          <LoopSVG mode="strip" className="h-[90px]" />
        </div>

        {/* Stage verbs, aligned beneath the nodes */}
        <ul className="mt-1 grid grid-cols-5">
          {VERBS.map((verb) => (
            <li
              key={verb.key}
              className="text-loop text-center"
              style={{ color: verb.color }}
            >
              {t(`verbs.${verb.key}`)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
