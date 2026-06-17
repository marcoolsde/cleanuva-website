import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "light" | "dark";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * `dark` is the single gate for the earned-dark rule. A section may be dark
   * ONLY if it renders the Loop, the Command Center / telemetry, AI-analysis
   * data, or the Verify proof moment (design-system §10.6). Components never set
   * their own page background — they inherit it from here.
   */
  tone?: SectionTone;
  as?: React.ElementType;
}

export function Section({
  tone = "light",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      // Adding `.dark` scopes shadcn + brand `dark:` utilities to this band only.
      className={cn(
        "py-20 md:py-32",
        tone === "dark"
          ? "dark bg-abyss text-ink-inv"
          : "bg-canvas text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
