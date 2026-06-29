"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Pause, Play } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";

/**
 * Homepage "machine in action" band — a centered large video showcase (no
 * eyebrow/title/subtitle; Hero + RoboticsShowcase already explain the product).
 * Light band, centered ~1040px frame with soft rounding + border/shadow — the
 * SolarCleano-style centered video block, not a full-bleed strip. 16:9 on both
 * mobile and desktop, so the clip is never heavily cropped.
 *
 * Video: existing demo clip — muted (always), looping, inline, autoplay without
 * sound, no native controls, with a custom play/pause toggle. Graceful: a
 * missing/failed mp4 falls back to the poster (or a dark frame) + "coming soon".
 * Honours prefers-reduced-motion (starts paused).
 */
export function HomeRoboticsVideo() {
  const t = useTranslations("HomeVideo");
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);
  const [posterOk, setPosterOk] = React.useState(true);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const v = videoRef.current;
    if (reduce && v) {
      v.pause();
      setPaused(true);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <Section tone="light">
      <Container>
        <div className="relative mx-auto aspect-video w-full max-w-[1180px] overflow-hidden rounded-2xl border border-line bg-abyss shadow-lift">
          {/* Ambient base so nothing ever looks broken. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#15293D_0%,#0A1320_72%)]"
          />

          {/* Poster behind the video: first frame + fallback if the mp4 is gone. */}
          {posterOk ? (
            <Image
              src="/images/robotics/r-series-hero.jpg"
              alt=""
              fill
              sizes="(max-width: 1220px) 100vw, 1180px"
              className="object-cover opacity-90"
              onError={() => setPosterOk(false)}
            />
          ) : null}

          {!failed ? (
            <video
              ref={videoRef}
              src="/videos/robotics/nuvatrack-r-demo.mp4"
              aria-label={t("alt")}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              onPlay={() => setPaused(false)}
              onPause={() => setPaused(true)}
            />
          ) : null}

          {failed ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-body-s text-ink-inv-3">{t("soon")}</span>
            </div>
          ) : null}

          {/* Custom pause/play — bottom-end, unobtrusive; never autoplays sound. */}
          {!failed ? (
            <button
              type="button"
              onClick={toggle}
              aria-label={paused ? t("play") : t("pause")}
              className="absolute bottom-4 end-4 inline-flex size-10 items-center justify-center rounded-full border border-line-inv-strong bg-abyss/45 text-ink-inv backdrop-blur transition-colors hover:bg-abyss/70 focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-0 focus-visible:outline-none"
            >
              {paused ? (
                <Play className="size-4 translate-x-0.5" aria-hidden />
              ) : (
                <Pause className="size-4" aria-hidden />
              )}
            </button>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
