/**
 * Robot families (Cleanuva Robotics product line). Three NuvaTrack/NuvaSpan
 * families, each a connected execution product. Used by: the overview fleet
 * (cinematic teasers), the per-family product pages (/robotics/[slug]), and the
 * compare page.
 *
 * RP-0: ALL metric/spec VALUES below are sourced from the real product
 * datasheets (NuvaTrack R-Series / U-Series / NuvaSpan Series, 2026-06). No
 * invented MWp/day, uptime %, or "auto-charging dock" figures. Brand/model names
 * are fixed (not localized); spec LABELS and marketing copy resolve from the
 * Robotics.* messages namespace.
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
  /** Real product image under /public; PhotoPlate keeps the scene gradient if absent. */
  image: string;
  /** Demo video under /public/videos; ProductVideo shows the poster if absent. */
  video: string;
  /** Datasheet PDF under /public/downloads; button degrades to "Request datasheet" if absent. */
  datasheet: string;
  /** Headline performance metrics (4) shown big on the product page — datasheet-sourced. */
  metrics: RobotSpec[];
  /** Full technical specifications — datasheet-sourced. */
  specs: RobotSpec[];
  /** /get-pricing deep link (commercial path). */
  pricingHref: string;
}

export const ROBOT_FAMILIES: RobotFamily[] = [
  {
    id: "nuvatrack-r",
    slug: "r-series",
    name: "NuvaTrack-R",
    key: "rSeries",
    accent: "warm",
    theme: "day",
    scene: "robot-in-operation",
    image: "/images/robotics/r-series-hero.jpg",
    video: "/videos/robotics/nuvatrack-r-demo.mp4",
    datasheet: "/downloads/robotics/nuvatrack-r-series-datasheet.pdf",
    // Datasheet: 2000 m²/h · up to 60 m/min · 20° climb · single operator
    metrics: [
      { key: "cleaningCapacity", value: "2,000 m²/h" },
      { key: "speed", value: "60 m/min" },
      { key: "climbing", value: "20°" },
      { key: "operators", value: "1" },
    ],
    specs: [
      { key: "dimensions", value: "600 × 530 × 220 mm" },
      { key: "weight", value: "42 kg" },
      { key: "speed", value: "Up to 60 m/min" },
      { key: "cleaningCapacity", value: "2,000 m²/h" },
      { key: "climbing", value: "20°" },
      { key: "cleaning", value: "Dry & wet (dual-mode)" },
      { key: "battery", value: "2 × Li-ion 36 V / 15 Ah" },
      { key: "autonomy", value: "3 h" },
      { key: "charging", value: "1.5 h" },
      { key: "remote", value: "2.4 GHz · 200 m" },
      { key: "waterFlow", value: "9.6 L/min" },
      { key: "brush", value: "1,132 / 1,420 mm · Ø200 mm" },
      { key: "brushSpeed", value: "330 rpm" },
      { key: "warranty", value: "12 months" },
      { key: "connectivity", value: "Platform-connected" },
    ],
    pricingHref: "/get-pricing?model=nuvatrack-r",
  },
  {
    id: "nuvatrack-u",
    slug: "u-series",
    name: "NuvaTrack-U",
    key: "uSeries",
    accent: "warm",
    theme: "dusk",
    scene: "robot-dusk",
    image: "/images/robotics/u-series-hero.jpg",
    video: "/videos/robotics/nuvatrack-u-demo.mp4",
    datasheet: "/downloads/robotics/nuvatrack-u-series-datasheet.pdf",
    // Datasheet: 600 m²/h · 30 m/min · 10° climb · IP65 · true unattended · 4 h
    metrics: [
      { key: "cleaningCapacity", value: "600 m²/h" },
      { key: "autonomy", value: "4 h" },
      { key: "ip", value: "IP65" },
      { key: "climbing", value: "10°" },
    ],
    specs: [
      { key: "dimensions", value: "600 × 490 × 220 mm" },
      { key: "weight", value: "38 kg" },
      { key: "speed", value: "30 m/min" },
      { key: "cleaningCapacity", value: "600 m²/h" },
      { key: "climbing", value: "10°" },
      { key: "cleaning", value: "Dry, fully automatic" },
      { key: "operation", value: "True unattended" },
      { key: "battery", value: "Li-ion 36 V / 15 Ah" },
      { key: "autonomy", value: "4 h" },
      { key: "charging", value: "3 h · solar" },
      { key: "ip", value: "IP65" },
      { key: "brush", value: "1,132 / 1,420 mm · Ø200 mm" },
      { key: "brushSpeed", value: "330 rpm" },
      { key: "warranty", value: "12 months" },
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
    // No dedicated NuvaSpan shot yet — reuse the real overview plant photo (the
    // same stand-in used by the NuvaSpan page + Compare). video is a future slot.
    image: "/images/robotics/overview-hero.jpg",
    video: "/videos/robotics/nuvaspan-demo.mp4",
    datasheet: "/downloads/robotics/nuvaspan-series-datasheet.pdf",
    // Datasheet: 4000 m²/h · 18 m/min · 25° climb · 45° module tilt · suspended/bridge
    metrics: [
      { key: "cleaningCapacity", value: "4,000 m²/h" },
      { key: "climbing", value: "25°" },
      { key: "moduleTilt", value: "45°" },
      { key: "weight", value: "48–80 kg" },
    ],
    specs: [
      { key: "dimensions", value: "4,923 × 540 × 562 mm" },
      { key: "weight", value: "48–80 kg" },
      { key: "speed", value: "18 m/min" },
      { key: "cleaningCapacity", value: "4,000 m²/h" },
      { key: "climbing", value: "25°" },
      { key: "moduleTilt", value: "45°" },
      { key: "obstacle", value: "50 mm step / offset" },
      { key: "cleaning", value: "Water-free dry" },
      { key: "architecture", value: "Suspended / bridge" },
      { key: "power", value: "Solar self-powered" },
      { key: "autonomy", value: "2 h" },
      { key: "warranty", value: "12 months" },
      { key: "connectivity", value: "Platform-connected" },
    ],
    pricingHref: "/get-pricing?model=nuvaspan",
  },
];

/** Per-family copy iterators (keys live under Robotics.families.<key>.*). */
export const FEATURE_KEYS = ["f1", "f2", "f3", "f4"] as const;
export const DEPLOYMENT_KEYS = ["d1", "d2"] as const;

export function familyBySlug(slug: string): RobotFamily | undefined {
  return ROBOT_FAMILIES.find((f) => f.slug === slug);
}
