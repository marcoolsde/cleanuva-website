import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Brand CTA button (design-system §2.6). One dominant CTA per section; never two
 * equal-weight buttons except in the header and final CTA band. Labels are
 * sentence case — all-caps is reserved for mono labels.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-sans text-[15px] font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary "Request a demo" — solid ink on light, solid cool on dark.
        primary:
          "bg-ink text-surface hover:shadow-s2 dark:bg-cool dark:text-abyss dark:hover:shadow-glow-cool",
        // "Get robotics pricing" — warm execution motion.
        warm: "bg-warm text-ink hover:shadow-s2 dark:hover:shadow-glow-warm",
        // Outline secondary on light surfaces.
        secondary:
          "border border-ink text-ink bg-transparent hover:bg-surface-sunk dark:border-line-inv-strong dark:text-ink-inv dark:hover:bg-abyss-2",
        // Primary action placed directly on a dark band.
        onDark: "bg-cool text-abyss hover:shadow-glow-cool",
        // Glass action over dark photography / spec bars.
        glass:
          "border border-line-inv-strong bg-white/10 text-ink-inv backdrop-blur hover:bg-white/15",
        // Tertiary text link with an animated cool underline.
        ghostLink:
          "bg-transparent px-0 text-ink underline-offset-4 hover:text-cool-text hover:underline dark:text-ink-inv dark:hover:text-cool",
      },
      size: {
        default: "h-[52px] px-6",
        sm: "h-[48px] px-5 text-sm",
        icon: "size-[52px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
