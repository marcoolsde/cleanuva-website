import * as React from "react";
import { cn } from "@/lib/utils";

type EyebrowAccent = "neutral" | "cool" | "warm";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  accent?: EyebrowAccent;
  as?: React.ElementType;
}

// On light, accent text uses the AA-safe -text tokens; inside an earned-dark
// section the bright accent finally gets full contrast (design-system §1.6).
const accentClasses: Record<EyebrowAccent, string> = {
  neutral: "text-ink-3 dark:text-ink-inv-3",
  cool: "text-cool-text dark:text-cool",
  warm: "text-warm-text dark:text-warm",
};

export function Eyebrow({
  accent = "neutral",
  as: Tag = "p",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={cn("text-eyebrow", accentClasses[accent], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
