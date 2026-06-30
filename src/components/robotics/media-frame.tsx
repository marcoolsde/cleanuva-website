"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Neutral product media frame. Shows the real image (object-cover); on a
 * missing/404 file it keeps a calm dark-steel gradient (never a warm/orange
 * placeholder). Used for the R-Series hero, gallery and compare cards so the
 * pages stay premium even before every photo is supplied.
 */
export function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Extra classes on the <Image> (e.g. object-position framing). */
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional centered caption shown only when the image is unavailable. */
  label?: string;
}) {
  const [ok, setOk] = React.useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,#1b2633_0%,#0b0f14_78%)]",
        className,
      )}
    >
      {ok ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          onError={() => setOk(false)}
        />
      ) : label ? (
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-ink-inv-3">
          {label}
        </span>
      ) : null}
    </div>
  );
}
