import { defineRouting } from "next-intl/routing";

/**
 * Locale routing (design-system §10.5 + project decision: en/de/ar/zh).
 * Arabic renders RTL; the dir is applied on <html> in [locale]/layout.tsx.
 */
export const routing = defineRouting({
  locales: ["en", "de", "ar", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  ar: "العربية",
  zh: "中文",
};

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  de: "ltr",
  ar: "rtl",
  zh: "ltr",
};
