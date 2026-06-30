"use server";

import {
  makeDemoSchema,
  makeQuoteSchema,
  makeAccessorySchema,
  type DemoInput,
  type QuoteInput,
  type AccessoryInput,
} from "@/lib/form-schemas";
import { LEGAL } from "@/content/legal";

/**
 * Single lead-delivery path for every public form (demo, quote, accessories).
 * Each lead is tagged with a stable `formType` + `sourcePage` so a downstream
 * Make / Zapier / n8n / CRM can route it. Delivery is a configurable webhook
 * (FORM_WEBHOOK_URL, server-only) — no hard-coded endpoint, no API keys here.
 *
 * Behaviour when FORM_WEBHOOK_URL is NOT set:
 *   • production  → return ok:false (never fake success; the visitor is shown an
 *                   error and asked to email info@cleanuva.de — lead not lost).
 *   • dev / test  → log the payload + return ok:true so the funnel is testable
 *                   locally without configuring a real webhook.
 */

const serverMessages = { required: "Required", email: "Invalid email", consent: "Required" };
const RECIPIENT = LEGAL.contactEmail; // info@cleanuva.de

export type SubmitResult = { ok: true } | { ok: false; error: string };

type LeadMeta = { formType: string; sourcePage: string };

async function deliver(
  meta: LeadMeta,
  data: Record<string, unknown>,
  locale: string,
): Promise<SubmitResult> {
  // Drop empty-string business fields so n8n email templates stay clean
  // (a missing key reads as undefined → `{{$json.body.company || "—"}}`).
  // Protected keys are always set below; booleans (consent), null and numbers
  // are kept untouched.
  const cleaned: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "string" && v.trim() === "") continue;
    cleaned[k] = v;
  }

  const payload = {
    formType: meta.formType,
    sourcePage: meta.sourcePage,
    locale,
    submittedAt: new Date().toISOString(),
    recipient: RECIPIENT,
    ...cleaned,
  };

  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        `[lead] FORM_WEBHOOK_URL missing in production — ${meta.formType} NOT delivered; configure it to enable delivery.`,
      );
      return { ok: false, error: "not_configured" };
    }
    console.info("[lead] no FORM_WEBHOOK_URL (dev); payload:", JSON.stringify(payload));
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

/**
 * Minimal anti-spam shared by all three forms:
 *   • honeypot (hpWebsite) — a real user never fills the hidden field;
 *   • min submit time — a genuine fill takes longer than MIN_SUBMIT_MS.
 * On a hit we DON'T deliver (no n8n, no email) but still return ok:true so a bot
 * can't tell it was blocked and a real user is never shown a scary error. The
 * honeypot / timing fields are never forwarded to n8n.
 */
const MIN_SUBMIT_MS = 1200;

function isSpam(hpWebsite: string | undefined, startedAt: number | undefined): boolean {
  if ((hpWebsite ?? "").trim() !== "") return true; // honeypot filled → bot
  if (typeof startedAt === "number" && Date.now() - startedAt < MIN_SUBMIT_MS) return true; // too fast
  return false;
}

function suppressed(formType: string): SubmitResult {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[lead-spam-filter] suppressed ${formType}`);
  }
  return { ok: true };
}

export async function submitDemo(
  input: DemoInput,
  locale: string,
  startedAt?: number,
): Promise<SubmitResult> {
  const parsed = makeDemoSchema(serverMessages).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { hpWebsite, ...data } = parsed.data;
  if (isSpam(hpWebsite, startedAt)) return suppressed("demo_request");
  return deliver({ formType: "demo_request", sourcePage: "request_demo" }, data, locale);
}

export async function submitQuote(
  input: QuoteInput,
  locale: string,
  startedAt?: number,
): Promise<SubmitResult> {
  const parsed = makeQuoteSchema(serverMessages).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { hpWebsite, ...data } = parsed.data;
  if (isSpam(hpWebsite, startedAt)) return suppressed("quote_request");
  return deliver({ formType: "quote_request", sourcePage: "get_pricing" }, data, locale);
}

export async function submitAccessoryInquiry(
  input: AccessoryInput,
  locale: string,
  startedAt?: number,
): Promise<SubmitResult> {
  const parsed = makeAccessorySchema(serverMessages).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const d = parsed.data;
  if (isSpam(d.hpWebsite, startedAt)) return suppressed("accessories_inquiry");

  // Same delivery path as quote/demo — through deliver() → FORM_WEBHOOK_URL.
  // hpWebsite / startedAt are never included here, so they never reach n8n.
  const data = {
    firstName: d.firstName,
    lastName: d.lastName,
    company: d.company,
    country: d.country,
    email: d.email,
    phone: d.phone,
    inquiryType: d.inquiryType,
    robotModel: d.robotModel,
    accessoryInterest: d.accessoryInterest.trim() || null,
    howHeard: d.hearAbout.trim() || null,
    message: d.message,
    consent: d.consent,
  };

  return deliver({ formType: "accessories_inquiry", sourcePage: "robotics_accessories" }, data, locale);
}
