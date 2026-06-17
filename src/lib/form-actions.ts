"use server";

import {
  makeDemoSchema,
  makeQuoteSchema,
  type DemoInput,
  type QuoteInput,
} from "@/lib/form-schemas";

/**
 * Two conceptually separate commercial funnels (founder clarification #5):
 *   platform-demo  → AI Platform sales process
 *   robotics-rfq   → Robotics quotation process
 * Even though one team handles both today, the payload tags the funnel so the
 * downstream routing stays distinct.
 *
 * Delivery is a configurable webhook (FORM_WEBHOOK_URL, server-only). With no
 * endpoint set we log and succeed gracefully so the funnel is never blocked.
 * Live CRM / quotation-system integration is a deliberate follow-up task.
 */

const serverMessages = { required: "Required", email: "Invalid email" };

export type SubmitResult = { ok: true } | { ok: false; error: string };

async function deliver(
  funnel: "platform-demo" | "robotics-rfq",
  data: unknown,
  locale: string,
): Promise<SubmitResult> {
  const payload = {
    funnel,
    locale,
    submittedAt: new Date().toISOString(),
    data,
  };

  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) {
    // No endpoint configured yet — keep the funnel working in dev/preview.
    console.info("[lead] no FORM_WEBHOOK_URL set; payload:", JSON.stringify(payload));
    return { ok: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: "submit_failed" };
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function submitDemo(input: DemoInput, locale: string): Promise<SubmitResult> {
  const parsed = makeDemoSchema(serverMessages).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  return deliver("platform-demo", parsed.data, locale);
}

export async function submitQuote(input: QuoteInput, locale: string): Promise<SubmitResult> {
  const parsed = makeQuoteSchema(serverMessages).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  return deliver("robotics-rfq", parsed.data, locale);
}
