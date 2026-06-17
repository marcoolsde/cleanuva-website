/**
 * Proof-band headline metrics (build-plan homepage [06] / design-system §6).
 * Illustrative placeholder figures — clearly flagged in the UI until real case
 * studies land. Render with <MetricStat> (count-up, mono numerals); labels
 * resolve from the Proof.* messages namespace.
 */

export interface ProofMetric {
  /** Message key under Proof.items.* */
  key: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: "neutral" | "cool" | "warm" | "verified";
}

export const PROOF_METRICS: ProofMetric[] = [
  { key: "revenueRecovered", value: 4.2, prefix: "€", suffix: "M", decimals: 1, accent: "warm" },
  { key: "yieldUplift", value: 6.8, prefix: "+", suffix: "%", decimals: 1, accent: "cool" },
  { key: "truckRolls", value: 38, prefix: "−", suffix: "%", accent: "verified" },
  { key: "plantsManaged", value: 120, suffix: "+", accent: "neutral" },
];
