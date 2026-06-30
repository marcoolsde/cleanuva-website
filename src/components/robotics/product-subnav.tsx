import { getTranslations } from "next-intl/server";

import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

/**
 * Product-level sticky subnav for the R-Series page (Tesla-style product nav).
 * Sticks just below the global header (h-72px), never covers it. Pure CSS sticky
 * + in-page anchors (smooth via scroll-mt on targets) — no client JS. Mobile:
 * horizontal scroll. This carries the product-context actions so the global
 * header stays untouched.
 */
export async function ProductSubnav() {
  const t = await getTranslations("Robotics.rSeriesPage.subnav");

  const links = [
    { label: t("overview"), href: "#overview", anchor: true },
    { label: t("models"), href: "#models", anchor: true },
    { label: t("compare"), href: "/robotics/compare" },
    { label: t("accessories"), href: "/robotics/accessories" },
    { label: t("ask"), href: "/request-demo" },
  ];

  return (
    <div className="sticky top-[71px] z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <span className="shrink-0 text-[15px] font-semibold tracking-[-0.015em] text-ink">
          NuvaTrack-R <span className="text-ink-3">Series</span>
        </span>
        <nav
          aria-label="Product"
          className="flex items-center gap-5 overflow-x-auto whitespace-nowrap"
        >
          {links.map((l) =>
            l.anchor ? (
              <a
                key={l.href}
                href={l.href}
                className="text-body-s font-medium text-ink-2 underline-offset-[6px] transition-colors hover:text-ink hover:underline"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-body-s font-medium text-ink-2 underline-offset-[6px] transition-colors hover:text-ink hover:underline"
              >
                {l.label}
              </Link>
            ),
          )}
          <Button variant="warm" size="sm" asChild className="ms-1 shrink-0">
            <Link href="/get-pricing?model=nuvatrack-r-pro">{t("pricing")}</Link>
          </Button>
        </nav>
      </Container>
    </div>
  );
}
