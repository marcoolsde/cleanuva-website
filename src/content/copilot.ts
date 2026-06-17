/**
 * AI Copilot — the customer-facing differentiator. Marketing message is outcome-
 * led: it learns from the customer's operational history and verified outcomes to
 * deliver faster diagnosis, better decisions, and higher recovery. Copy resolves
 * from the Copilot.* messages namespace. (No internal-architecture framing.)
 */

/** Message keys under Copilot.sources.* — real operational sources, shown as credibility. */
export const KNOWLEDGE_SOURCES = [
  "manuals",
  "faults",
  "inspections",
  "thermal",
  "workOrders",
  "history",
] as const;
