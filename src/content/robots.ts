/**
 * Robot families (build-plan #8). Three NuvaTrack families, each a connected
 * execution product. Used by: the overview fleet (cinematic teasers), the
 * per-family product pages (/robotics/[slug]), and the compare page.
 *
 * Brand/model names are fixed (not localized). Spec/metric VALUES are mono
 * technical strings (also not localized). Spec LABELS and all marketing copy
 * resolve from the Robotics.* messages namespace:
 *   - shared labels  → Robotics.specs.* / Robotics.product.*
 *   - per family     → Robotics.families.<key>.*  (tagline, positioning,
 *                       autonomy.a1–a3, deployment.d1–d2)
 */

export interface RobotSpec {
  /** Message key under Robotics.specs.* for the label. */
  key: string;
  value: string;
}

export interface RobotFamily {
  id: "nuvatrack-r" | "nuvatrack-u" | "nuvaspan";
  /** URL slug: /robotics/<slug> */
  slug: "r-series" | "u-series" | "nuvaspan";
  name: string;
  /** Message key under Robotics.families.<key>.* */
  key: string;
  accent: "warm";
  theme: "day" | "dusk";
  scene: string;
  /**
   * Real product image under /public. If the file is absent, PhotoPlate keeps
   * the `scene` gradient. To swap: overwrite the same-named file + rebuild.
   */
  image: string;
  /** Headline performance metrics (4) shown big on the product page. */
  metrics: RobotSpec[];
  /** Full technical specifications. */
  specs: RobotSpec[];
  /** /get-pricing deep link (commercial path). */
  pricingHref: string;
}

export const ROBOT_FAMILIES: RobotFamily[] = [
  {
    id: "nuvatrack-r",
    slug: "r-series",
    name: "NuvaTrack R-Series",
    key: "rSeries",
    accent: "warm",
    theme: "day",
    scene: "robot-in-operation",
    image: "/images/robotics/r-series-hero.jpg",
    metrics: [
      { key: "coverage", value: "1.2 MWp/day" },
      { key: "operators", value: "1" },
      { key: "water", value: "0 L" },
      { key: "uptime", value: "99.2%" },
    ],
    specs: [
      { key: "coverage", value: "1.2 MWp/day" },
      { key: "operators", value: "1 operator" },
      { key: "cleaning", value: "Dry, brush-based" },
      { key: "navigation", value: "Row-guided" },
      { key: "power", value: "Swappable battery" },
      { key: "connectivity", value: "Platform-connected" },
    ],
    pricingHref: "/get-pricing?model=nuvatrack-r",
  },
  {
    id: "nuvatrack-u",
    slug: "u-series",
    name: "NuvaTrack U-Series",
    key: "uSeries",
    accent: "warm",
    theme: "dusk",
    scene: "robot-dusk",
    image: "/images/robotics/u-series-hero.jpg",
    metrics: [
      { key: "coverage", value: "2.8 MWp/night" },
      { key: "autonomy", value: "Full" },
      { key: "water", value: "0 L" },
      { key: "uptime", value: "99.5%" },
    ],
    specs: [
      { key: "coverage", value: "2.8 MWp/night" },
      { key: "operators", value: "Autonomous" },
      { key: "cleaning", value: "Dry, brush-based" },
      { key: "navigation", value: "Autonomous" },
      { key: "power", value: "Auto-charging dock" },
      { key: "connectivity", value: "Platform-connected" },
    ],
    pricingHref: "/get-pricing?model=nuvatrack-u",
  },
  {
    id: "nuvaspan",
    slug: "nuvaspan",
    name: "NuvaSpan",
    key: "nuvaSpan",
    accent: "warm",
    theme: "day",
    scene: "plant-utility",
    image: "/images/robotics/nuvaspan-hero.jpg",
    metrics: [
      { key: "coverage", value: "6.0 MWp/night" },
      { key: "siteType", value: "Utility" },
      { key: "water", value: "0 L" },
      { key: "uptime", value: "99.6%" },
    ],
    specs: [
      { key: "coverage", value: "6.0 MWp/night" },
      { key: "operators", value: "Autonomous" },
      { key: "cleaning", value: "Wide-span, dry" },
      { key: "navigation", value: "Autonomous" },
      { key: "power", value: "Auto-charging" },
      { key: "connectivity", value: "Platform-connected" },
    ],
    pricingHref: "/get-pricing?model=nuvaspan",
  },
];

/** Per-family copy iterators (keys live under Robotics.families.<key>.*). */
export const AUTONOMY_KEYS = ["a1", "a2", "a3"] as const;
export const DEPLOYMENT_KEYS = ["d1", "d2"] as const;
/** Shared configuration highlights (Robotics.product.config.*). */
export const CONFIG_KEYS = ["batteries", "brushes", "warranty", "logistics"] as const;

export function familyBySlug(slug: string): RobotFamily | undefined {
  return ROBOT_FAMILIES.find((f) => f.slug === slug);
}
