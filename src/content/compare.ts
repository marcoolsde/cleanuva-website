/**
 * Robotics compare + R-Series page config (P4R-1). Config-only; brand/model names
 * are literal (never translated). Comparison cells are booleans → rendered as
 * Yes / — via comparePage.val.*. No fabricated numeric specs here: the boolean
 * matrix only states feature presence; real numbers come from robots.ts specs.
 *
 * NuvaTrack-R Pro is an AI-Assist configuration of the R-Series (no separate
 * route) — it links to the R-Series page anchor + its own get-pricing model.
 */

export type CompareModelId = "nuvatrack-r" | "nuvatrack-r-pro" | "nuvatrack-u" | "nuvaspan";

export interface CompareModel {
  id: CompareModelId;
  name: string;
  image: string;
  viewHref: string;
  pricingHref: string;
}

// Images use only real assets; NuvaTrack-R Pro reuses the R-Series photo and
// NuvaSpan uses the overview photo until dedicated shots exist (no missing files,
// no warm placeholder).
export const COMPARE_MODELS: CompareModel[] = [
  { id: "nuvatrack-r", name: "NuvaTrack-R", image: "/images/robotics/r-series-hero.jpg", viewHref: "/robotics/r-series", pricingHref: "/get-pricing?model=nuvatrack-r" },
  { id: "nuvatrack-r-pro", name: "NuvaTrack-R Pro", image: "/images/robotics/r-series-hero.jpg", viewHref: "/robotics/r-series#nuvatrack-r-pro", pricingHref: "/get-pricing?model=nuvatrack-r-pro" },
  { id: "nuvatrack-u", name: "NuvaTrack-U", image: "/images/robotics/u-series-hero.jpg", viewHref: "/robotics/u-series", pricingHref: "/get-pricing?model=nuvatrack-u" },
  { id: "nuvaspan", name: "NuvaSpan", image: "/images/robotics/overview-hero.jpg", viewHref: "/robotics/nuvaspan", pricingHref: "/get-pricing?model=nuvaspan" },
];

/** Key decision metrics (text values resolve from comparePage.metrics.<id>.<field>). */
export const METRIC_FIELDS = ["automation", "operator", "cleaning", "bestFit", "deployment"] as const;

/** Detailed comparison groups → rows (labels from comparePage.rows.<row>). */
export const COMPARE_GROUPS = [
  { key: "operation", rows: ["manualSteering", "remoteControl", "singleOperator", "unattended"] },
  { key: "automation", rows: ["aiAssist", "headingHold", "cruiseControl"] },
  { key: "cleaning", rows: ["dryCleaning", "wetCleaning"] },
  { key: "deployment", rows: ["portable", "fixedInstall", "suspended"] },
  { key: "visibility", rows: ["cameraAssist"] },
  { key: "commercial", rows: ["accessories", "quoteRequired"] },
] as const;

export const COMPARE_MATRIX: Record<CompareModelId, Record<string, boolean>> = {
  "nuvatrack-r": { manualSteering: true, remoteControl: true, singleOperator: true, unattended: false, aiAssist: false, headingHold: false, cruiseControl: false, dryCleaning: true, wetCleaning: true, portable: true, fixedInstall: false, suspended: false, cameraAssist: false, accessories: true, quoteRequired: true },
  "nuvatrack-r-pro": { manualSteering: true, remoteControl: true, singleOperator: true, unattended: false, aiAssist: true, headingHold: true, cruiseControl: true, dryCleaning: true, wetCleaning: true, portable: true, fixedInstall: false, suspended: false, cameraAssist: true, accessories: true, quoteRequired: true },
  "nuvatrack-u": { manualSteering: false, remoteControl: false, singleOperator: false, unattended: true, aiAssist: true, headingHold: false, cruiseControl: false, dryCleaning: true, wetCleaning: false, portable: true, fixedInstall: false, suspended: false, cameraAssist: false, accessories: true, quoteRequired: true },
  "nuvaspan": { manualSteering: false, remoteControl: false, singleOperator: false, unattended: true, aiAssist: false, headingHold: false, cruiseControl: false, dryCleaning: true, wetCleaning: false, portable: false, fixedInstall: true, suspended: true, cameraAssist: false, accessories: true, quoteRequired: true },
};

/** "Which model should I choose?" recommendation cards (text from comparePage.choose.<id>). */
export const CHOOSE_MODELS: CompareModelId[] = ["nuvatrack-r", "nuvatrack-r-pro", "nuvatrack-u", "nuvaspan"];

/** R-Series "In operation" media (graceful: missing file → placeholder). */
export interface RMedia {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
}
export const R_SERIES_MEDIA: RMedia[] = [
  { id: "vid", type: "video", src: "/videos/robotics/nuvatrack-r-demo.mp4", poster: "/images/robotics/r-series-hero.jpg" },
  { id: "hero", type: "image", src: "/images/robotics/r-series-hero.jpg" },
  { id: "op1", type: "image", src: "/images/robotics/r-series-op-1.jpg" },
  { id: "op2", type: "image", src: "/images/robotics/r-series-op-2.jpg" },
];

/** R vs R Pro technical comparison (two columns). Numeric values literal; the
 *  differentiators (operation/heading/cruise/camera) are the key contrast. */
export const R_TECH_ROWS: { key: string; r: string; pro: string }[] = [
  { key: "operationMode", r: "Remote-controlled", pro: "AI-Assist" },
  { key: "steering", r: "Manual", pro: "Manual + heading hold" },
  { key: "headingHold", r: "—", pro: "Yes" },
  { key: "cruiseControl", r: "—", pro: "Yes" },
  { key: "cameraAssist", r: "—", pro: "Yes" },
  { key: "cleaningMode", r: "Dry / wet", pro: "Dry / wet" },
  { key: "brushWidth", r: "1,132 / 1,420 mm", pro: "1,132 / 1,420 mm" },
  { key: "speed", r: "Up to 60 m/min", pro: "Up to 60 m/min" },
  { key: "cleaningCapacity", r: "2,000 m²/h", pro: "2,000 m²/h" },
  { key: "warranty", r: "12 months", pro: "12 months" },
];
