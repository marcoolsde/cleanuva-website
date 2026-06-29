"use client";

import * as React from "react";

import { Link } from "@/i18n/navigation";

/**
 * Footer brand mark — a swappable icon image + the fixed wordmark "CLEANUVA"
 * (always uppercase, never translated). Drop a real icon at the path below to
 * replace it; on a missing/404 file it falls back to the original gradient
 * circle so the footer never breaks. Mirrors the Header BrandMark fallback.
 */
export function FooterBrand() {
  const [iconFailed, setIconFailed] = React.useState(false);

  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      {iconFailed ? (
        <span aria-hidden className="size-[22px] rounded-full bg-[image:var(--current)]" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- swappable brand icon of unknown aspect; falls back to the gradient mark on error
        <img
          src="/images/brand/cleanuva-icon.png"
          alt=""
          aria-hidden
          className="size-[22px] object-contain"
          onError={() => setIconFailed(true)}
        />
      )}
      <span className="text-[19px] font-semibold tracking-[-0.01em]">CLEANUVA</span>
    </Link>
  );
}
