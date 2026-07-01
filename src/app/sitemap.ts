import type { MetadataRoute } from "next";

import { SITE_URL, LOCALES, SITEMAP_PATHS, languageAlternates } from "@/lib/seo";

/**
 * Public sitemap (P10). Locale-prefixed marketing routes only (localePrefix is
 * "always", so there is no unprefixed business page). Each entry carries hreflang
 * alternates. Never includes app./api./automation. subdomains, webhooks or
 * internal paths.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SITEMAP_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path))
        .filter(([key]) => key !== "x-default")
        .map(([key, href]) => [key, `${SITE_URL}${href}`]),
    );
    const isHome = path === "";

    return LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (isHome ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: isHome ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
