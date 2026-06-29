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
  funnel: "platform-demo" | "robotics-rfq" | "accessories-inquiry",
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

/** Public support inbox for accessories / general inquiries. */
const ACCESSORY_RECIPIENT = LEGAL.contactEmail; // info@cleanuva.de

/**
 * Notification template for the accessories inquiry — ready for a future email
 * service / admin (app.cleanuva.ai/admin). Today it is only logged alongside
 * the payload; WIRING POINT: send `subject` + `text` to ACCESSORY_RECIPIENT from
 * a transactional email service (or have the webhook/CRM do it).
 *
 *   Subject: [Cleanuva Website] Accessories inquiry — {inquiryType} — {company}
 */
function formatAccessoryEmail(lead: AccessoryLead) {
  const subject = `[Cleanuva Website] Accessories inquiry — ${lead.inquiryType} — ${lead.company}`;
  const text = [
    `Inquiry type: ${lead.inquiryType}`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Company: ${lead.company}`,
    `Country: ${lead.country}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Robot model: ${lead.robotModel}`,
    `Accessory interest: ${lead.accessoryInterest ?? "—"}`,
    `How heard: ${lead.hearAbout ?? "—"}`,
    `Message: ${lead.message}`,
    `Page source: ${lead.page}`,
    `Locale: ${lead.locale}`,
    `Submitted at: ${lead.submittedAt}`,
  ].join("\n");
  return { to: ACCESSORY_RECIPIENT, subject, text };
}

type AccessoryLead = {
  source: "website";
  page: "robotics_accessories";
  recipient: string;
  inquiryType: AccessoryInput["inquiryType"];
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  robotModel: AccessoryInput["robotModel"];
  accessoryInterest: string | null;
  hearAbout: string | null;
  message: string;
  consent: boolean;
  locale: string;
  submittedAt: string;
};

export async function submitAccessoryInquiry(
  input: AccessoryInput,
  locale: string,
): Promise<SubmitResult> {
  const parsed = makeAccessorySchema({ ...serverMessages, consent: "Required" }).safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const d = parsed.data;

  // Future-admin-ready payload (flat fields keyed for app.cleanuva.ai/admin).
  const lead: AccessoryLead = {
    source: "website",
    page: "robotics_accessories",
    recipient: ACCESSORY_RECIPIENT,
    inquiryType: d.inquiryType,
    firstName: d.firstName,
    lastName: d.lastName,
    company: d.company,
    country: d.country,
    email: d.email,
    phone: d.phone,
    robotModel: d.robotModel,
    accessoryInterest: d.accessoryInterest.trim() || null,
    hearAbout: d.hearAbout.trim() || null,
    message: d.message,
    consent: d.consent,
    locale,
    submittedAt: new Date().toISOString(),
  };

  // Email template is prepared now; actual send happens once an email service
  // or webhook/CRM is wired (no real mail is sent yet).
  console.info("[accessories-inquiry] email:", JSON.stringify(formatAccessoryEmail(lead)));

  // Production safety: never fake success when there is nowhere to deliver the
  // lead. Without FORM_WEBHOOK_URL in production we fail loudly so the visitor is
  // told to email us instead of silently losing the inquiry. (Dev/test still
  // logs + succeeds via deliver() so the funnel is testable locally.)
  if (process.env.NODE_ENV === "production" && !process.env.FORM_WEBHOOK_URL) {
    console.error(
      "[accessories-inquiry] FORM_WEBHOOK_URL missing in production — inquiry NOT delivered; configure it to enable delivery.",
    );
    return { ok: false, error: "not_configured" };
  }

  return deliver("accessories-inquiry", lead, locale);
}
