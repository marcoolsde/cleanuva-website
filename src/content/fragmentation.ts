/**
 * The fragmentation problem (positioning-v1 §1.3) — the enemy is fragmentation,
 * not dirt. Four levels of fragmentation that the operating layer resolves.
 * Copy resolves from the Fragmentation.* messages namespace.
 */

export interface FragmentationItem {
  /** Message key under Fragmentation.items.* */
  key: string;
  icon: "Cable" | "Workflow" | "Brain" | "FileQuestion";
}

export const FRAGMENTATION_ITEMS: FragmentationItem[] = [
  { key: "systems", icon: "Cable" },
  { key: "workflows", icon: "Workflow" },
  { key: "intelligence", icon: "Brain" },
  { key: "accountability", icon: "FileQuestion" },
];
