import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { KNOWLEDGE_SOURCES } from "@/content/copilot";

function CopilotPanel() {
  const t = useTranslations("Copilot.convo");
  return (
    // Earned dark — a live, grounded operating intelligence.
    <div className="dark rounded-lg border border-line-inv bg-abyss p-5 text-ink-inv shadow-glow-cool">
      <div className="flex items-center gap-2 border-b border-line-inv pb-3">
        <Sparkles className="size-4 text-cool" aria-hidden />
        <span className="text-eyebrow text-cool">Copilot</span>
        <span className="ms-auto inline-flex items-center gap-1.5 text-caption text-ink-inv-2">
          <span className="size-2 animate-pulse rounded-full bg-status-online" aria-hidden />
          live
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {/* Operator question */}
        <div className="ms-auto max-w-[85%] rounded-lg rounded-tr-sm bg-abyss-2 p-3">
          <span className="text-eyebrow text-ink-inv-3">{t("userLabel")}</span>
          <p className="mt-1 text-body-s text-ink-inv">{t("user")}</p>
        </div>
        {/* Copilot answer, grounded + source-cited */}
        <div className="me-auto max-w-[92%] rounded-lg rounded-tl-sm border-l-2 border-l-cool bg-abyss-1 p-3">
          <span className="text-eyebrow text-cool">{t("copilotLabel")}</span>
          <p className="mt-1 text-body-s text-ink-inv">{t("copilot")}</p>
          <p className="mt-2 font-mono text-[11px] text-ink-inv-3">{t("source")}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded bg-cool/15 px-2.5 py-1 text-[12px] font-medium text-cool">
            {t("action")}
            <ArrowRight className="size-3 rtl:rotate-180" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * AI Copilot — the differentiating heart (positioning-v1 §3.3). Its moat is the
 * grounded Operational Knowledge corpus, not the model. Advisory, source-cited,
 * human-in-the-loop.
 */
export function AiCopilot({ id }: { id?: string } = {}) {
  const t = useTranslations("Copilot");

  return (
    <Section tone="light" id={id}>
      <Container>
        <Reveal>
          <div className="max-w-[62ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-4 measure text-body-l text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Operational Knowledge — the grounded corpus */}
          <Reveal>
            <div className="rounded-lg border border-line bg-surface p-7">
              <span className="text-eyebrow text-ink-3">{t("knowledgeLabel")}</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {KNOWLEDGE_SOURCES.map((src) => (
                  <li
                    key={src}
                    className="rounded-pill bg-surface-sunk px-3 py-1.5 text-body-s text-ink-2"
                  >
                    {t(`sources.${src}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-body-s text-ink-3">{t("note")}</p>
            </div>
          </Reveal>

          {/* The Copilot, grounded in that corpus */}
          <Reveal delay={0.1}>
            <CopilotPanel />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
