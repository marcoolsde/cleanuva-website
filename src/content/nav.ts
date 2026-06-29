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
  { key: "resources", href: "/resources" },
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
      { key: "monitoring", href: "/platform#intelligence" },
      { key: "diagnosis", href: "/platform#copilot" },
      { key: "commandCenter", href: "/platform#command-center" },
      { key: "roi", href: "/platform#proof" },
    ],
  },
  {
    key: "solutions",
    links: [
      { key: "owners", href: "/solutions#owners" },
      { key: "om", href: "/solutions#om" },
      { key: "ipps", href: "/solutions#ipps" },
      { key: "epc", href: "/solutions#epc" },
      { key: "auditor", href: "/solutions#auditor" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "about", href: "/company" },
      { key: "vision", href: "/company#vision" },
      { key: "security", href: "/company#security" },
      { key: "contact", href: "/company#contact" },
    ],
  },
];

/** Business regions used by forms (RegionField) — distinct from UI locales. */
export const REGIONS = ["EU", "MEA", "NA"] as const;
export type Region = (typeof REGIONS)[number];
