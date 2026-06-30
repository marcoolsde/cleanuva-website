"use client";

import * as React from "react";
import Image from "next/image";
import {
  Brush, BatteryCharging, PlugZap, Gamepad2, Droplets, Cog, Waves, Wrench, Recycle, Package,
  type LucideIcon,
} from "lucide-react";

/**
 * Accessory card image — a horizontal rectangular frame that shows the WHOLE
 * product image (object-contain, never cropped or stretched). Square photos sit
 * centered with whitespace at the sides; the image is inset (padded) inside the
 * frame. On a missing/404 file it degrades to a branded placeholder with the
 * category glyph — never a broken image. Drop a real photo at the item's `image`
 * path to replace it automatically (no code change).
 *
 * Takes the icon by NAME (string) — not a component — so server components can
 * render it without passing a function across the client boundary.
 */
const ICONS: Record<string, LucideIcon> = {
  Brush, BatteryCharging, PlugZap, Gamepad2, Droplets, Cog, Waves, Wrench, Recycle, Package,
};

export function AccessoryImage({
  src,
  alt,
  icon,
}: {
  src: string;
  alt: string;
  icon: string;
}) {
  const [ok, setOk] = React.useState(true);
  const Icon = ICONS[icon] ?? Package;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line bg-surface">
      {/* Branded placeholder behind: shown until/if the real image loads. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-sunk via-canvas to-surface"
      >
        <Icon className="size-9 text-ink-3" strokeWidth={1.5} />
      </div>

      {/* Inset wrapper = padding; the image is contained inside it (full, no crop). */}
      {ok ? (
        <div className="absolute inset-4 sm:inset-5">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 320px"
            className="object-contain"
            onError={() => setOk(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
