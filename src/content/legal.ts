/**
 * Legal entity constants (build-plan Part C + design-system §11 / footer).
 *
 * Brand = Cleanuva. Legal entity = NETRO Sparkle GmbH (Germany).
 * The footer MUST render the literal line: "Cleanuva is a brand of NETRO Sparkle GmbH."
 * (localized per locale via the Legal.* messages; English is the canonical literal).
 *
 * ⚠️ The fields below are UNKNOWN and must be filled with real registration data
 * before launch. DO NOT invent them. Build the Imprint/Privacy/Terms pages
 * (Step 12) against these constants.
 */
export const LEGAL = {
  brand: "Cleanuva",
  entity: "NETRO Sparkle GmbH",
  copyrightYear: 2026,

  // TODO — fill before launch (do not invent):
  registeredOffice: "TODO", // registered office / Sitz
  registerCourt: "TODO", // Handelsregister / Amtsgericht
  hrb: "TODO", // HRB number
  managingDirectors: ["TODO"], // Geschäftsführer
  vatId: "TODO", // USt-IdNr. / VAT ID
  contactEmail: "TODO", // Kontakt E-Mail
  phone: "TODO", // Telefon
} as const;

export type Legal = typeof LEGAL;
