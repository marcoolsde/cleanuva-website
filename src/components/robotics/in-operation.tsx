"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

import { MediaFrame } from "@/components/robotics/media-frame";
import { cn } from "@/lib/utils";
import { type RMedia } from "@/content/compare";

/**
 * In-operation media gallery — large main viewer + thumbnail rail (Tesla-style
 * media selection), supporting image and video items from a `media` array. Video
 * uses native controls, muted, playsInline, preload="metadata", NO autoplay; a
 * missing file falls back to its poster / a neutral dark frame (never orange).
 * Captions resolve from `<tNamespace>.media.<id>`.
 */
export function InOperationGallery({
  media,
  tNamespace,
}: {
  media: RMedia[];
  tNamespace: string;
}) {
  const t = useTranslations(tNamespace);
  const [active, setActive] = React.useState(0);
  const [failed, setFailed] = React.useState<Record<string, boolean>>({});
  const item = media[active];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_124px]">
      {/* Main viewer */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line">
        {item.type === "video" && !failed[item.id] ? (
          <video
            key={item.id}
            src={item.src}
            poster={item.poster}
            aria-label={t(`media.${item.id}`)}
            controls
            muted
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 h-full w-full bg-abyss",
              // Vertical clips are contained (centered in the dark 16:9 frame) so
              // they are never heavily cropped; landscape clips fill the frame.
              item.vertical ? "object-contain" : "object-cover",
            )}
            onError={() => setFailed((f) => ({ ...f, [item.id]: true }))}
          />
        ) : (
          <MediaFrame
            src={item.poster ?? item.src}
            alt={t(`media.${item.id}`)}
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="absolute inset-0"
            label={t(`media.${item.id}`)}
          />
        )}
      </div>

      {/* Thumbnail rail */}
      <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:pb-0">
        {media.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={t(`media.${m.id}`)}
            aria-pressed={i === active}
            className={cn(
              "relative aspect-video w-[116px] shrink-0 overflow-hidden rounded-lg border transition-all lg:w-full",
              i === active
                ? "border-cool ring-2 ring-cool/40"
                : "border-line opacity-80 hover:opacity-100",
            )}
          >
            <MediaFrame src={m.poster ?? m.src} alt={t(`media.${m.id}`)} sizes="140px" className="absolute inset-0" />
            {m.type === "video" ? (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-abyss/55 text-ink-inv backdrop-blur">
                  <Play className="size-3.5 translate-x-px" aria-hidden />
                </span>
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
