import type { MetadataRoute } from "next";

import { SITE_URL, LOCALES, SITEMAP_PATHS, LEGAL_PATHS, languageAlternates } from "@/lib/seo";

/**
 * Public sitemap (P10 + P12). Locale-prefixed marketing routes only (localePrefix
 * is "always", so there is no unprefixed business page). Legal / compliance pages
 * are included at low priority. Each entry carries hreflang alternates. Never
 * includes app./api./automation. subdomains, webhooks or internal paths.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (path: string, kind: "home" | "core" | "legal") => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path))
        .filter(([key]) => key !== "x-default")
        .map(([key, href]) => [key, `${SITE_URL}${href}`]),
    );
    return LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (kind === "home" ? "weekly" : kind === "legal" ? "yearly" : "monthly") as
        | "weekly"
        | "monthly"
        | "yearly",
      priority: kind === "home" ? 1 : kind === "legal" ? 0.3 : 0.7,
      alternates: { languages },
    }));
  };

  return [
    ...SITEMAP_PATHS.flatMap((path) => entry(path, path === "" ? "home" : "core")),
    ...LEGAL_PATHS.flatMap((path) => entry(path, "legal")),
  ];
}
