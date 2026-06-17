/**
 * Trust layer (v1.1-D). Truthful credibility signals only — no customers,
 * logos, certifications, awards, or claimed deployments. Copy resolves from the
 * Trust.* messages namespace; icons are lucide names resolved in the component.
 */

export interface TrustSignal {
  /** Message key under Trust.signals.* */
  key: string;
  icon: "Building2" | "Sun" | "Boxes" | "Languages" | "Globe" | "Handshake" | "ShieldCheck" | "MessageSquare";
}

export const TRUST_SIGNALS: TrustSignal[] = [
  { key: "germany", icon: "Building2" },
  { key: "solar", icon: "Sun" },
  { key: "maturity", icon: "Boxes" },
  { key: "multilang", icon: "Languages" },
  { key: "markets", icon: "Globe" },
  { key: "partners", icon: "Handshake" },
  { key: "gdpr", icon: "ShieldCheck" },
  { key: "contact", icon: "MessageSquare" },
];

/** Compact subset for the homepage strip. */
export const TRUST_STRIP_KEYS = ["germany", "solar", "multilang", "markets", "gdpr"] as const;
