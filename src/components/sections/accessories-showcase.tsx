"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { cn } from "@/lib/utils";
import {
  ACCESSORY_MODELS,
  ACCESSORY_ITEMS,
  type AccessoryModelId,
} from "@/content/accessories";
import { AccessoryImage } from "@/components/sections/accessory-image";

/**
 * Accessories selector + showcase grid (P1A). Client-only filter: choosing a
 * model narrows the cards to items compatible with it. State defaults to "all"
 * so the server and first client render match (no hydration mismatch). Content
 * + compatibility come from src/content/accessories.ts.
 */
export function AccessoriesShowcase() {
  const t = useTranslations("Robotics.accessories");
  const [model, setModel] = React.useState<AccessoryModelId | "all">("all");

  const items =
    model === "all"
      ? ACCESSORY_ITEMS
      : ACCESSORY_ITEMS.filter((i) => i.compatibleModels.includes(model));

  const shortName = (id: AccessoryModelId) =>
    ACCESSORY_MODELS.find((m) => m.id === id)?.shortName ?? id;

  return (
    <Container>
      {/* Model selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <span className="text-eyebrow text-ink-3">{t("selectorLabel")}</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t("selectorLabel")}>
          <FilterChip active={model === "all"} onClick={() => setModel("all")}>
            {t("all")}
          </FilterChip>
          {ACCESSORY_MODELS.map((m) => (
            <FilterChip key={m.id} active={model === m.id} onClick={() => setModel(m.id)}>
              {m.shortName}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Showcase grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-canvas transition-shadow hover:shadow-lift"
            >
              <AccessoryImage src={item.image} alt={t(item.titleKey)} icon={item.icon} />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-h4 text-ink">{t(item.titleKey)}</h3>
                <p className="mt-2 flex-1 text-body-s text-ink-2">{t(item.descriptionKey)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.compatibleModels.map((id) => (
                    <span
                      key={id}
                      className="rounded-pill border border-line bg-surface px-2.5 py-0.5 text-[12px] text-ink-2"
                    >
                      {shortName(id)}
                    </span>
                  ))}
                </div>
                {item.options && item.options.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.options.map((opt) => (
                      <span
                        key={opt}
                        className="rounded-pill bg-cool-tint px-2.5 py-0.5 text-[12px] font-medium text-cool-text"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                ) : null}
                <a
                  href="#accessories-inquiry"
                  className="mt-5 inline-flex items-center gap-1 text-body-s font-medium text-cool-text transition-colors hover:text-ink"
                >
                  {t(item.inquiryLabelKey)}
                  <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Container>
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
