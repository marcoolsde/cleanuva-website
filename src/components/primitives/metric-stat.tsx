"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/lib/motion";

type MetricAccent = "neutral" | "cool" | "warm" | "verified";
type MetricFormat = "plain" | "currency" | "percent" | "multiplier";

interface MetricStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: MetricAccent;
  /** "currency" uses Intl.NumberFormat(locale, { currency }); others use prefix/suffix. */
  format?: MetricFormat;
  locale?: string;
  currency?: string;
  /** Visual size of the number. */
  size?: "md" | "lg";
  className?: string;
}

const accentClasses: Record<MetricAccent, string> = {
  neutral: "text-ink dark:text-ink-inv",
  cool: "text-cool-text dark:text-cool",
  warm: "text-warm-text dark:text-warm",
  verified: "text-status-verified",
};

export function MetricStat({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  accent = "neutral",
  format = "plain",
  locale = "en",
  currency = "EUR",
  size = "lg",
  className,
}: MetricStatProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const numRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();

  const currencyFmt = React.useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, currency, decimals],
  );

  const render = React.useCallback(
    (n: number) => {
      if (format === "currency") return currencyFmt.format(n);
      const num = n.toFixed(decimals);
      const unit = format === "percent" ? "%" : format === "multiplier" ? "×" : suffix;
      return `${prefix}${num}${unit}`;
    },
    [format, currencyFmt, decimals, prefix, suffix],
  );

  React.useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    if (reduce || !inView) {
      el.textContent = render(reduce ? value : 0);
      return;
    }

    const controls = animate(0, value, {
      duration: dur.cinematic,
      ease: ease.entrance,
      onUpdate: (n) => {
        el.textContent = render(n);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, render]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-mono font-medium tabular-nums",
          size === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
          accentClasses[accent],
        )}
      >
        <span ref={numRef}>{render(0)}</span>
      </span>
      <span className="text-eyebrow text-ink-3 dark:text-ink-inv-3">{label}</span>
    </div>
  );
}
