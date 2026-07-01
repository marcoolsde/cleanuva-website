/**
 * Navigation, footer IA, and business regions (build-plan Part C).
 * Items carry stable structure (keys + locale-agnostic hrefs); visible labels
 * are resolved from messages (Nav.* / Footer.*) so the IA is i18n-ready.
 * Hrefs are locale-agnostic — pass them through next-intl's <Link> which adds
 * the active locale prefix.
 */

export interface NavChild {
  /** Message key under Nav.roboticsMenu.* (name + desc). */
  key: string;
  href: string;
}

export interface NavItem {
  /** Message key under the Nav namespace. */
  key: string;
  href: string;
  /** Optional product submenu (Robotics dropdown). */
  children?: NavChild[];
}

// Robotics-first (P0A). Distribution Network / Gallery / Support are NOT added
// yet — their pages don't exist (no dead nav). Resources stays until P2 Support.
export const NAV: NavItem[] = [
  {
    key: "robotics",
    href: "/robotics",
    children: [
      // Unified product names (P1B). NuvaR Pro is an upgrade config on the NuvaR
      // (r-series) page — anchor, not a separate route (no dead link).
      { key: "nuvar", href: "/robotics/r-series#nuvatrack-r" },
      { key: "nuvarPro", href: "/robotics/r-series#nuvatrack-r-pro" },
      { key: "nuvaU", href: "/robotics/u-series" },
      { key: "nuvaSpan", href: "/robotics/nuvaspan" },
      { key: "compare", href: "/robotics/compare" },
      { key: "accessories", href: "/robotics/accessories" },
    ],
  },
  { key: "platform", href: "/platform" },
  { key: "solutions", href: "/solutions" },
  { key: "distribution", href: "/distribution-network" },
  { key: "gallery", href: "/gallery" },
  // Resources demoted from the top nav (kept as a page + footer link) to make
  // room for Support without crowding. Support is the customer-facing entry.
  { key: "support", href: "/support" },
  { key: "company", href: "/company" },
];

export interface FooterLink {
  /** Message key under Footer.links.* */
  key: string;
  href: string;
}

export interface FooterColumn {
  /** Message key under Footer.columns.* */
  key: string;
  links: FooterLink[];
}

// Robotics-first (P0A) — robotics column leads; no Distribution/Gallery/Support yet.
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    key: "robotics",
    links: [
      { key: "nuvar", href: "/robotics/r-series" },
      { key: "nuvarPro", href: "/robotics/r-series#nuvatrack-r-pro" },
      { key: "nuvaU", href: "/robotics/u-series" },
      { key: "nuvaSpan", href: "/robotics/nuvaspan" },
      { key: "accessories", href: "/robotics/accessories" },
      { key: "pricing", href: "/get-pricing" },
    ],
  },
  {
    key: "platform",
    links: [
      { key: "monitoring", href: "/platform" },
      { key: "diagnosis", href: "/platform" },
      { key: "commandCenter", href: "/platform#operating-loop" },
      { key: "roi", href: "/platform" },
    ],
  },
  {
    key: "solutions",
    links: [
      { key: "owners", href: "/solutions#solution-paths" },
      { key: "om", href: "/solutions#solution-paths" },
      { key: "ipps", href: "/solutions#solution-paths" },
      { key: "epc", href: "/solutions#solution-paths" },
      { key: "auditor", href: "/solutions#solution-paths" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "about", href: "/company" },
      { key: "distribution", href: "/distribution-network" },
      { key: "gallery", href: "/gallery" },
      { key: "support", href: "/support" },
      { key: "vision", href: "/company" },
      { key: "security", href: "/company#company-info" },
      { key: "contact", href: "/company#contact" },
    ],
  },
];

/** Business regions used by forms (RegionField) — distinct from UI locales. */
export const REGIONS = ["EU", "MEA", "NA"] as const;
export type Region = (typeof REGIONS)[number];
