/**
 * Connected execution layers (positioning-v1 §3.4 / §3.5). The platform commands
 * execution; robots/drones/crews connect in as options — robotics is the
 * flagship and a first-class commercial offering, but one layer, not the
 * identity. Copy resolves from the Execution.* messages namespace.
 */

export interface ExecutionLayer {
  /** Message key under Execution.layers.* */
  key: string;
  status: "now" | "future";
  accent: "warm" | "cool" | "neutral";
  icon: "Bot" | "Radar" | "HardHat";
  /** Internal link (robotics is first-class + commercial). */
  href?: string;
  /** Whether to surface a primary CTA (robotics). */
  cta?: boolean;
}

export const EXECUTION_LAYERS: ExecutionLayer[] = [
  { key: "robotics", status: "now", accent: "warm", icon: "Bot", href: "/robotics", cta: true },
  { key: "drones", status: "future", accent: "cool", icon: "Radar" },
  { key: "crews", status: "now", accent: "neutral", icon: "HardHat" },
];
