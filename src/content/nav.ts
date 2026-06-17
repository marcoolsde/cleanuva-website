/**
 * Navigation, footer IA, and business regions (build-plan Part C).
 * Items carry stable structure (keys + locale-agnostic hrefs); visible labels
 * are resolved from messages (Nav.* / Footer.*) so the IA is i18n-ready.
 * Hrefs are locale-agnostic — pass them through next-intl's <Link> which adds
 * the active locale prefix.
 */

export interface NavItem {
  /** Message key under the Nav namespace. */
  key: string;
  href: string;
}

export const NAV: NavItem[] = [
  { key: "platform", href: "/platform" },
  { key: "robotics", href: "/robotics" },
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

export const FOOTER_COLUMNS: FooterColumn[] = [
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
    key: "robotics",
    links: [
      { key: "rSeries", href: "/robotics#r-series" },
      { key: "uSeries", href: "/robotics#u-series" },
      { key: "nuvaSpan", href: "/robotics#nuvaspan" },
      { key: "pricing", href: "/get-pricing" },
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
