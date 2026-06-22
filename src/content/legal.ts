/**
 * Legal entity constants (build-plan Part C + design-system §11 / footer).
 *
 * Brand = Cleanuva. Legal entity = NETRO Sparkle GmbH (Germany).
 * The footer MUST render the literal line: "Cleanuva is a brand of NETRO Sparkle GmbH."
 * (localized per locale via the Legal.* messages; English is the canonical literal).
 *
 * Registration data confirmed by the founder (2026-06-16). Two fields remain
 * TODO (managing director / Geschäftsführer, and phone) — DO NOT invent them.
 */
export const LEGAL = {
  brand: "Cleanuva",
  entity: "NETRO Sparkle GmbH",
  copyrightYear: 2026,

  // Confirmed registration data:
  registeredOffice: "Römerstraße 54, 40667 Meerbusch, Germany", // registered office / Sitz
  registerCourt: "Amtsgericht Neuss", // Handelsregister / Amtsgericht
  hrb: "HRB 22958", // HRB number
  vatId: "DE362154837", // USt-IdNr. / VAT ID
  contactEmail: "info@cleanuva.de", // Kontakt E-Mail

  // TODO — still required before launch (do not invent):
  managingDirectors: ["TODO"], // Geschäftsführer — not yet provided
  phone: "TODO", // Telefon — not yet provided
} as const;

export type Legal = typeof LEGAL;
