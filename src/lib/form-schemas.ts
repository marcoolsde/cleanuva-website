import { z } from "zod";

/**
 * Single source of truth for the shape of the two public lead funnels.
 * Built as factories so the client form can inject localized error messages
 * (via next-intl) while the server action re-validates with default messages.
 * No PII storage, no auth — these forms only produce an RFQ / demo lead.
 */

type Messages = { required: string; email: string };

export function makeDemoSchema(m: Messages) {
  return z.object({
    name: z.string().min(1, m.required),
    email: z.string().min(1, m.required).email(m.email),
    company: z.string().min(1, m.required),
    role: z.string().min(1, m.required),
    portfolio: z.string().min(1, m.required),
    region: z.string().min(1, m.required),
    goal: z.string(),
    message: z.string(),
  });
}

export type DemoInput = z.infer<ReturnType<typeof makeDemoSchema>>;

export function makeQuoteSchema(m: Messages) {
  return z.object({
    model: z.string().min(1, m.required),
    battery: z.string().min(1, m.required),
    brush: z.string().min(1, m.required),
    warranty: z.string().min(1, m.required),
    units: z.string(),
    region: z.string().min(1, m.required),
    name: z.string().min(1, m.required),
    email: z.string().min(1, m.required).email(m.email),
    company: z.string().min(1, m.required),
    message: z.string(),
  });
}

export type QuoteInput = z.infer<ReturnType<typeof makeQuoteSchema>>;

/** Inquiry-type enum — values double as the downstream routing tag. */
export const INQUIRY_TYPES = [
  "accessories_quote",
  "after_sales",
  "technical_support",
  "general_inquiry",
] as const;

/** Robot-model values for the accessories inquiry (no link to any product page). */
export const INQUIRY_MODELS = ["not_sure", "nuvatrack-r", "nuvatrack-r-pro", "nuvatrack-u", "nuvaspan"] as const;

type ConsentMessages = Messages & { consent: string };

/**
 * Accessories / contact inquiry (P1A). A general support-style lead from the
 * /robotics/accessories page. Reuses the same delivery mechanism as the other
 * funnels — no new backend. accessoryInterest / hearAbout are optional.
 */
export function makeAccessorySchema(m: ConsentMessages) {
  return z.object({
    firstName: z.string().min(1, m.required),
    lastName: z.string().min(1, m.required),
    company: z.string().min(1, m.required),
    country: z.string().min(1, m.required),
    email: z.string().min(1, m.required).email(m.email),
    phone: z.string().min(1, m.required),
    inquiryType: z.enum(INQUIRY_TYPES),
    robotModel: z.enum(INQUIRY_MODELS),
    accessoryInterest: z.string(),
    hearAbout: z.string(),
    message: z.string().min(1, m.required),
    consent: z.boolean().refine((v) => v === true, { message: m.consent }),
  });
}

export type AccessoryInput = z.infer<ReturnType<typeof makeAccessorySchema>>;
