/**
 * The three-layer operating model (positioning-v1 §Part 2) — the narrative
 * backbone: Operational Intelligence → Coordination → Accountability. Replaces
 * the old two-pillar framing. Copy resolves from OperatingModel.* messages.
 */

export interface OperatingLayer {
  /** Message key under OperatingModel.layers.* */
  key: string;
  accent: "cool" | "verified";
  icon: "BrainCircuit" | "Network" | "BadgeCheck";
}

export const OPERATING_LAYERS: OperatingLayer[] = [
  { key: "intelligence", accent: "cool", icon: "BrainCircuit" },
  { key: "coordination", accent: "cool", icon: "Network" },
  { key: "accountability", accent: "verified", icon: "BadgeCheck" },
];
