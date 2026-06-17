/**
 * Platform capabilities (build-plan #7 / P3), organized by the three-layer
 * operating model (positioning-v1 §Part 2): Intelligence → Coordination →
 * Accountability. Every block opens with the OUTCOME (business value) — no
 * API/protocol/engineering language. Copy + proof lines resolve from the
 * Platform.Capabilities.* messages namespace.
 */

export type OperatingModelLayer =
  | "intelligence"
  | "coordination"
  | "accountability";

export type CapabilityAccent = "cool" | "warm" | "verified";

export interface Capability {
  /** Message key under Platform.Capabilities.items.* */
  key: string;
  layer: OperatingModelLayer;
  accent: CapabilityAccent;
  /** lucide-react icon name. */
  icon:
    | "Activity"
    | "Stethoscope"
    | "LineChart"
    | "Network"
    | "ClipboardList"
    | "Bot"
    | "BadgeCheck"
    | "FileText";
}

export const PLATFORM_CAPABILITIES: Capability[] = [
  // Operational Intelligence — know the truth of the asset (cool)
  { key: "telemetry", layer: "intelligence", accent: "cool", icon: "Activity" },
  { key: "diagnosis", layer: "intelligence", accent: "cool", icon: "Stethoscope" },
  { key: "correlation", layer: "intelligence", accent: "cool", icon: "Network" },
  { key: "analytics", layer: "intelligence", accent: "cool", icon: "LineChart" },
  // Operational Coordination — orchestrate the response (warm)
  { key: "workOrders", layer: "coordination", accent: "warm", icon: "ClipboardList" },
  { key: "dispatch", layer: "coordination", accent: "warm", icon: "Bot" },
  // Operational Accountability — prove and report (verified)
  { key: "verification", layer: "accountability", accent: "verified", icon: "BadgeCheck" },
  { key: "reporting", layer: "accountability", accent: "verified", icon: "FileText" },
];

/** Layer order for grouped rendering. */
export const CAPABILITY_LAYERS: OperatingModelLayer[] = [
  "intelligence",
  "coordination",
  "accountability",
];
