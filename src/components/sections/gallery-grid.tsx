"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/primitives/container";
import { PhotoPlate } from "@/components/primitives/photo-plate";
import { cn } from "@/lib/utils";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryCategory } from "@/content/gallery";

/**
 * Gallery grid (P2B) — lightweight front-end category filter (no DB/CMS). Images
 * use PhotoPlate (gradient fallback on missing). Videos use native controls,
 * muted, playsInline, preload="metadata" and NO autoplay (no multi-video jank);
 * a missing file degrades to a "coming soon" placeholder. State defaults to
 * "all" so SSR and first client render match.
 */
export function GalleryGrid() {
  const t = useTranslations("Gallery");
  const [cat, setCat] = React.useState<GalleryCategory | "all">("all");

  const items = cat === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === cat);

  return (
    <Container>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("filters.all")}>
        <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
          {t("filters.all")}
        </FilterChip>
        {GALLERY_CATEGORIES.map((c) => (
          <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>
            {t(`filters.${c}`)}
          </FilterChip>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.id}
            className="flex flex-col overflow-hidden rounded-lg border border-line bg-canvas"
          >
            {item.type === "video" ? (
              <GalleryVideo
                src={item.src}
                poster={item.poster}
                label={t(item.titleKey)}
                soon={t("videoSoon")}
              />
            ) : (
              <PhotoPlate ratio="aspect-[4/3]" src={item.src} alt={t(item.titleKey)} className="rounded-none" />
            )}
            <figcaption className="px-4 py-3 text-body-s text-ink-2">{t(item.titleKey)}</figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}

function GalleryVideo({
  src,
  poster,
  label,
  soon,
}: {
  src: string;
  poster?: string;
  label: string;
  soon: string;
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-abyss">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#15293D_0%,#0A1320_72%)]"
      />
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-body-s text-ink-inv-3">{soon}</span>
        </div>
      ) : (
        <video
          src={src}
          poster={poster}
          aria-label={label}
          controls
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-pill border px-3.5 py-1.5 text-body-s font-medium transition-colors",
        active
          ? "border-cool bg-cool-tint text-cool-text"
          : "border-line bg-canvas text-ink-2 hover:bg-surface-sunk hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
