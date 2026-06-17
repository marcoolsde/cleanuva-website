"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/primitives/button";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Mock data — a preview, not the real product. Plausible values only.
type NodeStatus = "online" | "warning" | "critical" | "executing";

const MAP_NODES: { x: number; y: number; status: NodeStatus }[] = [
  { x: 18, y: 28, status: "online" },
  { x: 32, y: 62, status: "online" },
  { x: 44, y: 38, status: "warning" },
  { x: 56, y: 70, status: "online" },
  { x: 62, y: 24, status: "executing" },
  { x: 71, y: 52, status: "online" },
  { x: 78, y: 33, status: "critical" },
  { x: 85, y: 66, status: "online" },
  { x: 26, y: 44, status: "online" },
  { x: 50, y: 54, status: "online" },
];

const NODE_COLOR: Record<NodeStatus, string> = {
  online: "bg-status-online",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
  executing: "bg-warm",
};

const WORK_ORDERS = [
  { asset: "DE-NRW-04", status: "executing", actionKey: "dispatch" },
  { asset: "ES-AND-11", status: "queued", actionKey: "rca" },
  { asset: "AE-DXB-02", status: "done", actionKey: "restored" },
  { asset: "DE-BAY-07", status: "queued", actionKey: "underperf" },
] as const;

const WO_ACCENT: Record<string, string> = {
  queued: "border-l-cool",
  executing: "border-l-warm",
  done: "border-l-status-verified",
};

const WO_STATUS_TEXT: Record<string, string> = {
  queued: "text-cool",
  executing: "text-warm",
  done: "text-status-verified",
};

// System log — technical telemetry, reads as machine output.
const LOG = [
  "08:42 · ANALYZE · soiling flagged DE-NRW-04 · String 12",
  "08:43 · EXECUTE · NuvaTrack R dispatched",
  "09:15 · VERIFY · yield restored +4.8% ✓",
  "09:20 · CONNECT · ES-AND-11 inverter alarm correlated",
];

function Sparkline() {
  return (
    <svg viewBox="0 0 120 32" className="h-8 w-full" aria-hidden>
      <polyline
        points="0,24 14,20 28,22 42,14 56,17 70,9 84,12 98,6 120,8"
        fill="none"
        stroke="#22D3C2"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommandCenterPreview() {
  const t = useTranslations("CommandCenter");

  return (
    // Earned dark — the flagship live operational surface (build-plan #10).
    <section className="dark bg-abyss py-20 text-ink-inv md:py-32">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-ink-inv">{t("title")}</h2>
            <p className="mt-3 text-body-m text-ink-inv-2">{t("body")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* Left — portfolio map + telemetry + activity log */}
            <div className="space-y-4">
              <div className="rounded-lg border border-line-inv bg-abyss-1 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-eyebrow text-ink-inv-3">{t("mapTitle")}</span>
                  <span className="inline-flex items-center gap-2 text-caption text-ink-inv-2">
                    <span className="size-2 animate-pulse rounded-full bg-status-online" aria-hidden />
                    {t("live")}
                  </span>
                </div>
                {/* Map */}
                <div
                  className="relative mt-4 h-[260px] overflow-hidden rounded-md border border-line-inv"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                  role="img"
                  aria-label={t("mapAlt")}
                >
                  {MAP_NODES.map((node, i) => (
                    <span
                      key={i}
                      className="absolute"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <span
                        className={cn(
                          "absolute -inset-2 animate-ping rounded-full opacity-60",
                          NODE_COLOR[node.status],
                        )}
                        style={{ animationDelay: `${i * 0.35}s` }}
                        aria-hidden
                      />
                      <span className={cn("relative block size-2.5 rounded-full", NODE_COLOR[node.status])} />
                    </span>
                  ))}
                </div>
                {/* Telemetry sparkline */}
                <div className="mt-4 flex items-end gap-4">
                  <div className="flex-1">
                    <span className="text-caption text-ink-inv-3">{t("telemetryLabel")}</span>
                    <Sparkline />
                  </div>
                  <span className="font-mono text-2xl font-medium text-cool tabular-nums">
                    98.7%
                  </span>
                </div>
              </div>

              {/* Activity log */}
              <div className="rounded-lg border border-line-inv bg-abyss-1 p-5">
                <span className="text-eyebrow text-ink-inv-3">{t("logTitle")}</span>
                <ul className="mt-3 space-y-2">
                  {LOG.map((line) => (
                    <li
                      key={line}
                      className="font-mono text-[12px] leading-relaxed text-ink-inv-2"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — work order rail + on-dark CTA */}
            <div className="flex flex-col gap-4 rounded-lg border border-line-inv bg-abyss-1 p-5">
              <span className="text-eyebrow text-ink-inv-3">{t("woTitle")}</span>
              <ul className="space-y-3">
                {WORK_ORDERS.map((wo) => (
                  <li
                    key={wo.asset}
                    className={cn(
                      "rounded-md border border-line-inv border-l-2 bg-abyss-2 p-3",
                      WO_ACCENT[wo.status],
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[13px] text-ink-inv">{wo.asset}</span>
                      <span className={cn("text-eyebrow", WO_STATUS_TEXT[wo.status])}>
                        {t(`wo.${wo.status}`)}
                      </span>
                    </div>
                    <p className="mt-1 text-body-s text-ink-inv-2">
                      {t(`actions.${wo.actionKey}`)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Verification / proof signal */}
              <div className="mt-1 flex items-center gap-2 rounded-md bg-[#13241B] p-3 text-status-verified">
                <span className="size-2 rounded-full bg-status-verified" aria-hidden />
                <span className="text-body-s">{t("verified")}</span>
              </div>

              <Button variant="onDark" asChild className="mt-auto w-full">
                <Link href="/platform">{t("cta")}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
