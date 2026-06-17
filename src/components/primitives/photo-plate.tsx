"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Chip } from "./chip";

interface PhotoPlateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Real image path under /public (e.g. "/images/robotics/r-series-hero.jpg").
   * If present AND the file loads, an optimized next/image is shown; if the
   * file is missing (or fails to load) the `scene` gradient is kept — so the
   * site never shows a broken image. Swap = overwrite the same-named file.
   */
  src?: string;
  alt: string;
  /** Scene hint, e.g. "plant-golden-hour" — drives the fallback gradient mood. */
  scene?: string;
  /** Optional annotation surfaced via <Chip> (mockup builds only). */
  chip?: string;
  /** Aspect ratio utility, e.g. "aspect-[16/10]". */
  ratio?: string;
  /** Fill the positioned parent (no aspect ratio) — for full-bleed heroes. */
  fill?: boolean;
}

// Gradient scenes are the standing fallback — kept whenever no real image is
// present yet. Real photography simply loads on top when the file exists.
const sceneGradient: Record<string, string> = {
  "plant-golden-hour":
    "bg-[linear-gradient(135deg,#FFE7BD_0%,#FFB347_55%,#9A5200_100%)]",
  "robot-in-operation":
    "bg-[linear-gradient(135deg,#FFF2DF_0%,#FFC76B_60%,#C77B1A_100%)]",
  "operator-tablet":
    "bg-[linear-gradient(135deg,#E2F7F4_0%,#22D3C2_60%,#0A7468_100%)]",
  "product-ui":
    "bg-[linear-gradient(135deg,#1F2A33_0%,#0E1419_70%)] text-ink-inv",
  "drone-thermal":
    "bg-[linear-gradient(135deg,#1B2A4A_0%,#5B2A6B_55%,#FFB347_100%)] text-ink-inv",
  "robot-dusk":
    "bg-[linear-gradient(135deg,#2A2140_0%,#7A3B5E_45%,#FF9E2C_100%)] text-ink-inv",
  "plant-utility":
    "bg-[linear-gradient(120deg,#243042_0%,#C98A3A_55%,#FFC76B_100%)] text-ink-inv",
};

export function PhotoPlate({
  src,
  alt,
  scene = "plant-golden-hour",
  chip,
  ratio = "aspect-[16/10]",
  fill = false,
  className,
  ...props
}: PhotoPlateProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Try the real image when a src is set and it hasn't failed; otherwise the
  // gradient + scene label stand in (identical to the pre-wiring look).
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "relative w-full rounded-lg",
        !fill && ratio,
        // Gradient is always the base layer; a loaded image simply covers it.
        sceneGradient[scene] ?? sceneGradient["plant-golden-hour"],
        className,
      )}
      {...props}
    >
      {/* Standing placeholder: gradient label, shown until a real image loads. */}
      {!showImage || !loaded ? (
        <span
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end p-4 font-mono text-[11px] uppercase tracking-wider opacity-70"
        >
          {scene}
        </span>
      ) : null}

      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      {chip ? (
        <div className="absolute left-3 top-3">
          <Chip accent="cool">{chip}</Chip>
        </div>
      ) : null}
    </div>
  );
}
