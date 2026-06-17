/**
 * Vision / roadmap items (build-plan homepage [08]). Forward-looking only —
 * the UI must signal "on the roadmap", not "shipping today". Titles + copy
 * resolve from the Vision.* messages namespace; icons are lucide names.
 */

export interface RoadmapItem {
  /** Message key under Vision.items.* */
  key: string;
  icon: "Radar" | "Thermometer" | "ScanSearch" | "Layers" | "Bot";
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  { key: "drone", icon: "Radar" },
  { key: "thermal", icon: "Thermometer" },
  { key: "defect", icon: "ScanSearch" },
  { key: "twin", icon: "Layers" },
  { key: "agents", icon: "Bot" },
];
