import * as React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: "cool" | "warm" | "neutral";
}

/**
 * Mockup-only annotation tag. Renders ONLY when NEXT_PUBLIC_SHOW_CHIPS === "1",
 * so it is stripped from production builds (set the env to 0/unset for prod).
 */
export function Chip({
  accent = "neutral",
  className,
  children,
  ...props
}: ChipProps) {
  if (process.env.NEXT_PUBLIC_SHOW_CHIPS !== "1") return null;

  const accentClasses = {
    neutral: "bg-ink/80 text-surface",
    cool: "bg-cool-tint text-cool-text",
    warm: "bg-warm-tint text-warm-text",
  }[accent];

  return (
    <span
      data-chip
      className={cn(
        "pointer-events-none inline-flex items-center rounded-pill px-2.5 py-1 text-[11px] font-medium tracking-wide backdrop-blur",
        accentClasses,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
