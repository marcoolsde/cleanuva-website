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
