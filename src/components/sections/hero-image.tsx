"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Homepage Hero background image (Phase IMG-2). Wiring only — drops a real photo
 * into the hero's back layer when the file exists; if it's missing or fails to
 * load it renders NOTHING, so the existing CSS/SVG scene shows through unchanged.
 * It sits below the data layer / robot / scrims / copy (those stay on top).
 */
export function HeroBackgroundImage({ src, alt = "" }: { src: string; alt?: string }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className={
        "object-cover transition-opacity duration-700 " +
        (loaded ? "opacity-100" : "opacity-0")
      }
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
