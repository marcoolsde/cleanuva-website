/**
 * Accessories catalogue (P1A) — config-only, JSON-serializable, NO JSX. Built so
 * a future admin/CMS (app.cleanuva.ai/admin) can take ownership of this content:
 * every model, category, image path, compatibility and order lives here, and the
 * components only render. NO SKUs, prices, stock, certifications or invented specs.
 *
 * Display strings resolve from the Robotics.accessories.* message namespace via
 * the *Key fields (titleKey / descriptionKey / typeKey / noteKey / inquiryLabelKey).
 * Product names (NuvaTrack-R, NuvaTrack-R Pro, NuvaTrack-U, NuvaSpan) are brand names — never
 * translated — so they stay as literal strings here.
 *
 * NOTE: these are the model labels used by the Accessories page only. Product
 * detail pages and the Compare page are NOT touched in this phase, and NuvaTrack-R Pro
 * has no detail page yet (so nothing here links to one).
 */

export type AccessoryModelId = "nuvatrack-r" | "nuvatrack-r-pro" | "nuvatrack-u" | "nuvaspan";

export interface AccessoryModel {
  id: AccessoryModelId;
  /** Brand product name — never translated. */
  name: string;
  shortName: string;
  /** Robotics.accessories.models.<id>.type */
  typeKey: string;
  /** Robotics.accessories.models.<id>.note */
  noteKey: string;
}

export const ACCESSORY_MODELS: AccessoryModel[] = [
  { id: "nuvatrack-r", name: "NuvaTrack-R", shortName: "NuvaTrack-R", typeKey: "models.nuvatrack-r.type", noteKey: "models.nuvatrack-r.note" },
  { id: "nuvatrack-r-pro", name: "NuvaTrack-R Pro", shortName: "NuvaTrack-R Pro", typeKey: "models.nuvatrack-r-pro.type", noteKey: "models.nuvatrack-r-pro.note" },
  { id: "nuvatrack-u", name: "NuvaTrack-U", shortName: "NuvaTrack-U", typeKey: "models.nuvatrack-u.type", noteKey: "models.nuvatrack-u.note" },
  { id: "nuvaspan", name: "NuvaSpan", shortName: "NuvaSpan", typeKey: "models.nuvaspan.type", noteKey: "models.nuvaspan.note" },
];

export type AccessoryCategory =
  | "consumable"
  | "power"
  | "control"
  | "fluid"
  | "structural"
  | "service";

/** Lucide icon name used for the graceful image fallback (string, not JSX). */
export type AccessoryIcon =
  | "Brush"
  | "BatteryCharging"
  | "PlugZap"
  | "Gamepad2"
  | "Droplets"
  | "Cog"
  | "Waves"
  | "Wrench";

export interface AccessoryItem {
  id: string;
  icon: AccessoryIcon;
  /** Robotics.accessories.items.<id>.title / .desc */
  titleKey: string;
  descriptionKey: string;
  /** Replaceable image path; a missing file degrades to a branded placeholder. */
  image: string;
  category: AccessoryCategory;
  compatibleModels: AccessoryModelId[];
  /** Config-only tags for future filtering/CMS — not rendered. */
  useCases: string[];
  /** Plain option chips (e.g. lengths "50 m" / "100 m"); literal, not translated. */
  options?: string[];
  /** Optional badge message key (reserved for future use). */
  optionalBadgeKey?: string;
  /** Robotics.accessories.<key> for the per-card inquiry link. */
  inquiryLabelKey: string;
}

const ALL_MODELS: AccessoryModelId[] = ["nuvatrack-r", "nuvatrack-r-pro", "nuvatrack-u", "nuvaspan"];

export const ACCESSORY_ITEMS: AccessoryItem[] = [
  {
    id: "brushes",
    icon: "Brush",
    titleKey: "items.brushes.title",
    descriptionKey: "items.brushes.desc",
    image: "/images/accessories/brushes.jpg",
    category: "consumable",
    compatibleModels: ALL_MODELS,
    useCases: ["cleaning-performance", "maintenance"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "batteries",
    icon: "BatteryCharging",
    titleKey: "items.batteries.title",
    descriptionKey: "items.batteries.desc",
    image: "/images/accessories/batteries.jpg",
    category: "power",
    compatibleModels: ALL_MODELS,
    useCases: ["runtime", "power"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "chargers",
    icon: "PlugZap",
    titleKey: "items.chargers.title",
    descriptionKey: "items.chargers.desc",
    image: "/images/accessories/chargers.jpg",
    category: "power",
    compatibleModels: ALL_MODELS,
    useCases: ["power", "deployment"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "remote-controllers",
    icon: "Gamepad2",
    titleKey: "items.remote-controllers.title",
    descriptionKey: "items.remote-controllers.desc",
    image: "/images/accessories/remote-controllers.jpg",
    category: "control",
    // Remote controllers are for the remote-controlled models only.
    compatibleModels: ["nuvatrack-r", "nuvatrack-r-pro"],
    useCases: ["control", "operation"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "water-system",
    icon: "Droplets",
    titleKey: "items.water-system.title",
    descriptionKey: "items.water-system.desc",
    image: "/images/accessories/water-system.jpg",
    category: "fluid",
    compatibleModels: ALL_MODELS,
    useCases: ["cleaning-performance"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "motors",
    icon: "Cog",
    titleKey: "items.motors.title",
    descriptionKey: "items.motors.desc",
    image: "/images/accessories/motors.jpg",
    category: "service",
    compatibleModels: ALL_MODELS,
    useCases: ["maintenance", "service", "replacement"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "water-hose",
    icon: "Waves",
    titleKey: "items.water-hose.title",
    descriptionKey: "items.water-hose.desc",
    image: "/images/accessories/water-hose.jpg",
    category: "fluid",
    // Hose for wet-cleaning / water-supply setups — not the suspended system.
    compatibleModels: ["nuvatrack-r", "nuvatrack-r-pro", "nuvatrack-u"],
    useCases: ["wet-cleaning", "water-supply"],
    options: ["50 m", "100 m"],
    inquiryLabelKey: "requestDetails",
  },
  {
    id: "service-kits",
    icon: "Wrench",
    titleKey: "items.service-kits.title",
    descriptionKey: "items.service-kits.desc",
    image: "/images/accessories/service-kits.jpg",
    category: "service",
    compatibleModels: ALL_MODELS,
    useCases: ["maintenance", "service"],
    inquiryLabelKey: "requestDetails",
  },
];
