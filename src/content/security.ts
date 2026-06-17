/**
 * Security & trust items (build-plan P6). Plain-language controls for IPPs,
 * asset owners, utilities, and enterprise O&M — no buzzwords. Copy resolves
 * from the Platform.Security.* messages namespace.
 */

export interface SecurityItem {
  /** Message key under Platform.Security.items.* */
  key: string;
  icon:
    | "ShieldCheck"
    | "Globe"
    | "KeyRound"
    | "FileClock"
    | "BadgeCheck"
    | "Plug"
    | "Lock";
}

export const SECURITY_ITEMS: SecurityItem[] = [
  { key: "gdpr", icon: "ShieldCheck" },
  { key: "residency", icon: "Globe" },
  { key: "rbac", icon: "KeyRound" },
  { key: "audit", icon: "FileClock" },
  { key: "verification", icon: "BadgeCheck" },
  { key: "api", icon: "Plug" },
  { key: "posture", icon: "Lock" },
];
