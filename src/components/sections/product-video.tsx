"use client";

import * as React from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/**
 * Product demo video (RP-3 → brand-background style). Plays like an ambient
 * brand clip: autoplay, muted (always), looping, inline, no native controls —
 * with a small custom Pause/Play toggle. Graceful: a missing/failed mp4 keeps
 * the poster (or a dark frame) and a "coming soon" note — never a broken player
 * or broken image. Respects prefers-reduced-motion (starts paused on poster).
 */
export function ProductVideo({
  src,
  poster,
  alt,
  playLabel,
  pauseLabel,
  soonLabel,
}: {
  src: string;
  poster?: string;
  alt: string;
  playLabel: string;
  pauseLabel: string;
  soonLabel: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);
  const [posterOk, setPosterOk] = React.useState(true);
  const [paused, setPaused] = React.useState(false);

  // Honour reduced-motion: don't auto-run; leave it on the poster with a play
  // affordance the user can trigger.
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
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line-inv bg-abyss">
      {/* Ambient base — always present so nothing ever looks broken. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#15293D_0%,#0A1320_72%)]"
      />

      {/* Poster sits behind the video: visible before first frame and if the
          video is missing/failed. Hidden gracefully if the poster is missing. */}
      {poster && posterOk ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          onError={() => setPosterOk(false)}
        />
      ) : null}

      {!failed ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={alt}
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
          <span className="text-body-s text-ink-inv-3">{soonLabel}</span>
        </div>
      ) : null}

      {/* Custom pause/play — bottom-end, unobtrusive; never autoplays sound. */}
      {!failed ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? playLabel : pauseLabel}
          className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full border border-line-inv-strong bg-abyss/45 text-ink-inv backdrop-blur transition-colors hover:bg-abyss/70 focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-0 focus-visible:outline-none"
        >
          {paused ? (
            <Play className="size-4 translate-x-0.5" aria-hidden />
          ) : (
            <Pause className="size-4" aria-hidden />
          )}
        </button>
      ) : null}
    </div>
  );
}
