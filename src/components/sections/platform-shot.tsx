"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Drop a real screenshot at this path to replace the fallback card automatically.
const SCREENSHOT = "/images/platform/platform-home-screenshot.png";
const ROWS = ["row1", "row2", "row3"] as const;

/**
 * PlatformOverview right column — a platform-screenshot frame. Renders the real
 * screenshot when it exists at SCREENSHOT; on a missing/404 file it gracefully
 * falls back to the illustrative dark Command Center card (status labels only,
 * no invented metrics). To swap in the real UI, just add the PNG at the path
 * above — no code change needed.
 */
export function PlatformShot() {
  const t = useTranslations("PlatformOverview");
  const [imgOk, setImgOk] = React.useState(true);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-abyss shadow-lift">
      {/* Fallback dark Command Center card — always behind; shown if the
          screenshot is absent. */}
      <div className="dark absolute inset-0 flex flex-col p-5 text-ink-inv">
        <div className="flex items-center justify-between">
          <span className="text-loop text-ink-inv-2">{t("card.title")}</span>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-status-verified">
            <span className="size-1.5 rounded-full bg-status-verified" aria-hidden />
            {t("card.live")}
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          {ROWS.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
            >
              <span className="text-body-s text-ink-inv-2">{t(`card.${r}.label`)}</span>
              <span className="text-body-s font-medium text-ink-inv">{t(`card.${r}.value`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real platform screenshot (replaceable). On top when present; removed on
          404 so the fallback card shows through. */}
      {imgOk ? (
        <Image
          src={SCREENSHOT}
          alt={t("shotAlt")}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-top"
          onError={() => setImgOk(false)}
        />
      ) : null}
    </div>
  );
}
