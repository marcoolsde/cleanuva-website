/**
 * The approved worked ROI / recovered-revenue example (build-plan #4 Outcome
 * Ledger; later shared by #9 ROI Band — THIS is the single source).
 * Labels + text values resolve from the Outcome.* messages namespace; format
 * currency with Intl.NumberFormat(locale, { currency }).
 *
 * Approved sequence: Soiling detected → +4.8% yield → €12,400 recovered →
 * €2,100 cleaning cost → 5.9× ROI → Verified ✓.
 */

export type StepFormat = "percent" | "currency" | "multiplier";
export type StepAccent = "cool" | "warm" | "verified" | "neutral";

interface BaseStep {
  /** Message key under Outcome.steps.* (the small label). */
  key: string;
  accent: StepAccent;
  /** Tints the cell per design-system §4 (Outcome Ledger). */
  variant?: "detect" | "verify";
}

export interface NumberStep extends BaseStep {
  kind: "number";
  value: number;
  format: StepFormat;
  decimals?: number;
  prefix?: string;
}

export interface TextStep extends BaseStep {
  kind: "text";
  /** Message key under Outcome.values.* for the displayed word. */
  valueKey: string;
}

export type LedgerStep = NumberStep | TextStep;

export const OUTCOME_EXAMPLE = {
  currency: "EUR",
  steps: [
    { key: "detected", kind: "text", valueKey: "soiling", accent: "cool", variant: "detect" },
    { key: "yield", kind: "number", value: 4.8, format: "percent", decimals: 1, prefix: "+", accent: "cool", variant: "detect" },
    { key: "recovered", kind: "number", value: 12400, format: "currency", decimals: 0, accent: "warm" },
    { key: "cost", kind: "number", value: 2100, format: "currency", decimals: 0, accent: "neutral" },
    { key: "roi", kind: "number", value: 5.9, format: "multiplier", decimals: 1, accent: "warm" },
    { key: "verified", kind: "text", valueKey: "verified", accent: "verified", variant: "verify" },
  ] satisfies LedgerStep[],
} as const;

export type OutcomeExample = typeof OUTCOME_EXAMPLE;
