"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { loop } from "@/lib/motion";

/**
 * The Loop — the brand's signature asset (design-system §3).
 * One component, four render modes:
 *   - full       Connect→Analyze→Inspect→Execute→Verify (homepage centerpiece)
 *   - strip      slim horizontal 5-node current (connective tissue)
 *   - intel-arc  Connect→Analyze→Inspect (Platform page)
 *   - exec-arc   Execute→Verify (Robotics page)
 * Decorative: marked role="img" with a label; the current flows cool → warm.
 */
export type LoopMode = "full" | "strip" | "intel-arc" | "exec-arc";

interface LoopSVGProps {
  mode?: LoopMode;
  animate?: boolean;
  className?: string;
}

const NODES = [
  { verb: "CONNECT", color: "#7FD8D0" }, // cool @ 60%
  { verb: "ANALYZE", color: "#22D3C2" }, // peak cool
  { verb: "INSPECT", color: "#5FE0B0" }, // mid-current
  { verb: "EXECUTE", color: "#FFB347" }, // peak warm
  { verb: "VERIFY", color: "#3FD17A" }, // settles to verified
] as const;

function nodesForMode(mode: LoopMode) {
  if (mode === "intel-arc") return NODES.slice(0, 3);
  if (mode === "exec-arc") return NODES.slice(3, 5);
  return NODES;
}

export function LoopSVG({
  mode = "strip",
  animate = true,
  className,
}: LoopSVGProps) {
  const reduce = useReducedMotion();
  const flowing = animate && !reduce;
  const gradientId = React.useId();
  const nodes = nodesForMode(mode);
  const label = `The Loop: ${nodes.map((n) => n.verb.toLowerCase()).join(" → ")}`;

  // The traveling current: a short dash sweeping cool → warm along the path.
  const comet = flowing
    ? {
        strokeDasharray: "0.14 0.86",
        animate: { strokeDashoffset: [1, 0] as number[] },
        transition: {
          duration: mode === "full" ? loop.ambient : loop.ambient * 0.7,
          ease: "linear" as const,
          repeat: Infinity,
        },
      }
    : null;

  if (mode === "full") {
    // Elliptical loop with the five nodes spaced evenly around it.
    const cx = 200;
    const cy = 110;
    const rx = 150;
    const ry = 80;
    return (
      <svg
        viewBox="0 0 400 220"
        role="img"
        aria-label={label}
        className={cn("h-auto w-full", className)}
      >
        <Defs id={gradientId} />
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={1.5}
        />
        <motion.ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={`url(#current-${gradientId})`}
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          {...(comet ?? {})}
        />
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + rx * Math.cos(angle);
          const y = cy + ry * Math.sin(angle);
          return <LoopNode key={node.verb} x={x} y={y} color={node.color} verb={node.verb} />;
        })}
      </svg>
    );
  }

  // Horizontal arrangement (strip / intel-arc / exec-arc).
  const width = 400;
  const y = 40;
  const padX = 40;
  const span = width - padX * 2;
  const step = nodes.length > 1 ? span / (nodes.length - 1) : 0;

  return (
    <svg
      viewBox={`0 0 ${width} 80`}
      role="img"
      aria-label={label}
      className={cn("h-auto w-full", className)}
    >
      <Defs id={gradientId} />
      <line
        x1={padX}
        y1={y}
        x2={width - padX}
        y2={y}
        stroke="currentColor"
        strokeOpacity={0.12}
        strokeWidth={1.5}
      />
      <motion.line
        x1={padX}
        y1={y}
        x2={width - padX}
        y2={y}
        stroke={`url(#current-${gradientId})`}
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        {...(comet ?? {})}
      />
      {nodes.map((node, i) => (
        <LoopNode
          key={node.verb}
          x={padX + step * i}
          y={y}
          color={node.color}
          verb={node.verb}
        />
      ))}
    </svg>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`current-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22D3C2" />
        <stop offset="38%" stopColor="#5FE0B0" />
        <stop offset="72%" stopColor="#FFC76B" />
        <stop offset="100%" stopColor="#FF9E2C" />
      </linearGradient>
    </defs>
  );
}

function LoopNode({
  x,
  y,
  color,
  verb,
}: {
  x: number;
  y: number;
  color: string;
  verb: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={color} />
      <circle cx={x} cy={y} r={11} fill="none" stroke={color} strokeOpacity={0.3} strokeWidth={1.5} />
      <title>{verb}</title>
    </g>
  );
}
