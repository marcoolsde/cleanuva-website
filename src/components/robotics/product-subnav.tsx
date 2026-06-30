import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

export type SubnavLink = { label: string; href: string; anchor?: boolean };

/**
 * Product-level sticky subnav shared across robotics product pages (Tesla-style
 * product nav). Sticks just below the global header (h-72px), never covers it.
 * Pure CSS sticky + in-page anchors (smooth via scroll-mt on targets), no client
 * JS. Mobile: horizontal scroll. Presentational — the page resolves labels.
 */
export function ProductSubnav({
  name,
  suffix,
  links,
  pricingHref,
  pricingLabel,
}: {
  name: string;
  suffix?: string;
  links: SubnavLink[];
  pricingHref: string;
  pricingLabel: string;
}) {
  return (
    <div className="sticky top-[71px] z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <span className="shrink-0 text-[15px] font-semibold tracking-[-0.015em] text-ink">
          {name}
          {suffix ? <span className="text-ink-3"> {suffix}</span> : null}
        </span>
        <nav aria-label="Product" className="flex items-center gap-5 overflow-x-auto whitespace-nowrap">
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
            <Link href={pricingHref}>{pricingLabel}</Link>
          </Button>
        </nav>
      </Container>
    </div>
  );
}
