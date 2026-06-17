"use client";

import { useTranslations } from "next-intl";
import { Bot, BadgeCheck, ArrowRight } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

type Status = "online" | "warning" | "critical" | "executing";

const STATUS_DOT: Record<Status, string> = {
  online: "bg-status-online",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
  executing: "bg-warm",
};

const MAP_NODES: { x: number; y: number; status: Status }[] = [
  { x: 14, y: 30, status: "online" }, { x: 22, y: 58, status: "online" },
  { x: 28, y: 40, status: "warning" }, { x: 33, y: 70, status: "online" },
  { x: 40, y: 26, status: "online" }, { x: 45, y: 52, status: "critical" },
  { x: 52, y: 66, status: "online" }, { x: 56, y: 36, status: "executing" },
  { x: 63, y: 58, status: "online" }, { x: 69, y: 30, status: "online" },
  { x: 74, y: 64, status: "online" }, { x: 80, y: 44, status: "online" },
  { x: 86, y: 28, status: "online" }, { x: 90, y: 60, status: "online" },
];

const PLANTS: { asset: string; region: string; status: Status; yield: string }[] = [
  { asset: "DE-NRW-04", region: "EU", status: "warning", yield: "96.2%" },
  { asset: "ES-AND-11", region: "EU", status: "critical", yield: "91.4%" },
  { asset: "AE-DXB-02", region: "MEA", status: "online", yield: "99.1%" },
  { asset: "DE-BAY-07", region: "EU", status: "online", yield: "98.8%" },
  { asset: "US-TX-15", region: "NA", status: "online", yield: "99.0%" },
];

const ALARMS = [
  { sev: "critical" as const, asset: "ES-AND-11", key: "a1", time: "09:02" },
  { sev: "warning" as const, asset: "DE-NRW-04", key: "a2", time: "08:41" },
  { sev: "warning" as const, asset: "US-TX-15", key: "a3", time: "07:55" },
];

const WORK = [
  { asset: "DE-NRW-04", status: "executing" as const, key: "w1" },
  { asset: "ES-AND-11", status: "queued" as const, key: "w2" },
  { asset: "AE-DXB-02", status: "done" as const, key: "w3" },
];

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

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-4", className)}>
      <span className="text-eyebrow text-ink-inv-3">{title}</span>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function CommandCenter() {
  const t = useTranslations("Platform.Command");

  const kpis = [
    { value: "118/120", label: t("kpi.sitesOnline") },
    { value: "2,410", label: t("kpi.mwp") },
    { value: "7", label: t("kpi.alarms") },
    { value: "98.7%", label: t("kpi.yield") },
  ];

  return (
    <section id="command-center" className="dark bg-abyss py-20 text-ink-inv md:py-32">
      <Container>
        <Reveal>
          <div className="max-w-[62ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1 text-ink-inv">{t("title")}</h2>
            <p className="mt-3 text-body-m text-ink-inv-2">{t("body")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-xl border border-line-inv bg-abyss-1 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
            {/* Console title bar */}
            <div className="flex items-center justify-between gap-3 border-b border-line-inv bg-abyss-2 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-status-critical/80" />
                  <span className="size-2.5 rounded-full bg-status-warning/80" />
                  <span className="size-2.5 rounded-full bg-status-online/80" />
                </span>
                <span className="font-mono text-[12px] text-ink-inv-2">
                  {t("consoleTitle")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden gap-1 sm:flex">
                  {["EU", "MEA", "NA"].map((r, i) => (
                    <span
                      key={r}
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-[11px]",
                        i === 0
                          ? "bg-cool/15 text-cool"
                          : "text-ink-inv-3",
                      )}
                    >
                      {r}
                    </span>
                  ))}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-inv-2">
                  <span className="size-2 animate-pulse rounded-full bg-status-online" aria-hidden />
                  {t("live")}
                </span>
              </div>
            </div>

            {/* KPI overview strip */}
            <div className="grid grid-cols-2 border-b border-line-inv md:grid-cols-4">
              {kpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={cn(
                    "p-4",
                    i < 3 && "border-line-inv md:border-r",
                    i === 0 && "border-r",
                    i === 1 && "border-r md:border-r",
                    i < 2 && "border-b md:border-b-0",
                  )}
                >
                  <div className="font-mono text-2xl font-medium tabular-nums text-ink-inv">
                    {kpi.value}
                  </div>
                  <div className="mt-1 text-eyebrow text-ink-inv-3">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Console body */}
            <div className="grid lg:grid-cols-[1.6fr_1fr]">
              {/* Left — portfolio map + plant status */}
              <div className="border-line-inv lg:border-r">
                <Panel title={t("panels.portfolio")} className="border-b border-line-inv">
                  <div
                    className="relative h-[260px] overflow-hidden rounded-md border border-line-inv"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                    role="img"
                    aria-label={t("panels.portfolio")}
                  >
                    {(["EU", "MEA", "NA"] as const).map((r, i) => (
                      <span
                        key={r}
                        className="absolute font-mono text-[10px] text-ink-inv-3"
                        style={{ left: `${18 + i * 30}%`, top: "8%" }}
                      >
                        {r}
                      </span>
                    ))}
                    {MAP_NODES.map((node, i) => (
                      <span
                        key={i}
                        className="absolute"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        <span
                          className={cn(
                            "absolute -inset-2 animate-ping rounded-full opacity-60",
                            STATUS_DOT[node.status],
                          )}
                          style={{ animationDelay: `${i * 0.28}s` }}
                          aria-hidden
                        />
                        <span className={cn("relative block size-2.5 rounded-full", STATUS_DOT[node.status])} />
                      </span>
                    ))}
                  </div>
                </Panel>

                <Panel title={t("panels.plants")}>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-eyebrow text-ink-inv-3">
                        <th className="pb-2 font-medium">{t("cols.asset")}</th>
                        <th className="pb-2 font-medium">{t("cols.region")}</th>
                        <th className="pb-2 font-medium">{t("cols.status")}</th>
                        <th className="pb-2 text-right font-medium">{t("cols.yield")}</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-[13px]">
                      {PLANTS.map((p) => (
                        <tr key={p.asset} className="border-t border-line-inv">
                          <td className="py-2 text-ink-inv">{p.asset}</td>
                          <td className="py-2 text-ink-inv-2">{p.region}</td>
                          <td className="py-2">
                            <span className="inline-flex items-center gap-1.5 text-ink-inv-2">
                              <span className={cn("size-2 rounded-full", STATUS_DOT[p.status])} aria-hidden />
                              {t(`status.${p.status}`)}
                            </span>
                          </td>
                          <td className="py-2 text-right tabular-nums text-ink-inv">{p.yield}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              </div>

              {/* Right — alarms, AI recs, work & dispatch, verification */}
              <div className="divide-y divide-line-inv">
                <Panel title={t("panels.alarms")}>
                  <ul className="space-y-2.5">
                    {ALARMS.map((al) => (
                      <li key={al.key} className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            "mt-1 size-2 shrink-0 rounded-full",
                            al.sev === "critical" ? "bg-status-critical" : "bg-status-warning",
                          )}
                          aria-hidden
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[12px] text-ink-inv">{al.asset}</span>
                            <span className="font-mono text-[11px] text-ink-inv-3">{al.time}</span>
                          </div>
                          <p className="text-body-s text-ink-inv-2">{t(`alarms.${al.key}`)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title={t("panels.recommendations")}>
                  <ul className="space-y-3">
                    {(["r1", "r2"] as const).map((r) => (
                      <li
                        key={r}
                        className="rounded-md border border-line-inv border-l-2 border-l-cool bg-abyss-2 p-3"
                      >
                        <p className="text-body-s font-medium text-ink-inv">{t(`rec.${r}Title`)}</p>
                        <p className="mt-1 text-caption text-ink-inv-2">{t(`rec.${r}Desc`)}</p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="font-mono text-[12px] text-cool">{t(`rec.${r}Impact`)}</span>
                          <span className="inline-flex items-center gap-1 rounded bg-cool/15 px-2 py-1 text-[12px] font-medium text-cool">
                            {t(r === "r1" ? "rec.apply" : "rec.review")}
                            <ArrowRight className="size-3 rtl:rotate-180" aria-hidden />
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title={t("panels.work")}>
                  <ul className="space-y-2.5">
                    {WORK.map((wo) => (
                      <li
                        key={wo.key}
                        className={cn(
                          "rounded-md border border-line-inv border-l-2 bg-abyss-2 p-2.5",
                          WO_ACCENT[wo.status],
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[12px] text-ink-inv">{wo.asset}</span>
                          <span className={cn("text-eyebrow", WO_STATUS_TEXT[wo.status])}>
                            {t(`wo.${wo.status}`)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-caption text-ink-inv-2">{t(`woItems.${wo.key}`)}</p>
                      </li>
                    ))}
                  </ul>
                  {/* Robot dispatch status */}
                  <div className="mt-3 flex items-center gap-2.5 rounded-md bg-warm/10 p-2.5 text-warm">
                    <Bot className="size-4 shrink-0" aria-hidden />
                    <span className="flex-1 font-mono text-[12px]">{t("dispatch.label")}</span>
                    <span className="font-mono text-[12px]">{t("dispatch.eta")}</span>
                  </div>
                </Panel>

                {/* Verification status */}
                <div className="flex items-center gap-2.5 bg-[#13241B] p-4 text-status-verified">
                  <BadgeCheck className="size-4 shrink-0" aria-hidden />
                  <span className="text-body-s">{t("verification")}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
