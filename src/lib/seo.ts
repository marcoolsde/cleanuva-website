import type { Metadata } from "next";

/**
 * Central SEO config (P10). Production site is https://cleanuva.ai. Only public
 * marketing routes live here — app./api./automation. subdomains, webhooks and
 * internal paths are never referenced. English-primary copy; hreflang alternates
 * cover en / de / zh / ar so each locale gets a correct canonical + language map.
 */

export const SITE_URL = "https://cleanuva.ai";
export const SITE_NAME = "Cleanuva";

export const LOCALES = ["en", "de", "ar", "zh"] as const;
export type SeoLocale = (typeof LOCALES)[number];
const isLocale = (l: string): l is SeoLocale => (LOCALES as readonly string[]).includes(l);

/** Default share image — the optimized homepage hero (no new assets). */
export const DEFAULT_OG_IMAGE = "/images/hero/homepage-hero-daylight.jpg";

// next-intl locale → Open Graph locale code.
const OG_LOCALE: Record<SeoLocale, string> = {
  en: "en_US",
  de: "de_DE",
  ar: "ar_AR",
  zh: "zh_CN",
};

export interface PageSeo {
  /** Locale-less path, e.g. "/robotics"; "" is the home route. */
  path: string;
  title: string;
  description: string;
  /** Public image path; falls back to the homepage hero. */
  ogImage?: string;
}

export const PAGE_SEO = {
  home: { path: "", title: "Cleanuva | Solar cleaning robots and AI operations for PV assets", description: "Cleanuva provides solar cleaning robots and AI-native operations software for PV assets — from remote-controlled cleaning to verified recovery.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
  robotics: { path: "/robotics", title: "Solar Cleaning Robots | Cleanuva Robotics", description: "Explore Cleanuva solar cleaning robots for remote-controlled, AI-assisted, unattended and fixed PV cleaning operations.", ogImage: "/images/robotics/overview-hero.jpg" },
  rSeries: { path: "/robotics/r-series", title: "NuvaTrack-R Series — Solar Cleaning Robots | Cleanuva", description: "NuvaTrack-R and NuvaTrack-R Pro: single-operator solar cleaning robots for dry and wet cleaning, with AI-Assist heading hold, cruise control and camera-assisted operation.", ogImage: "/images/robotics/r-series-hero.jpg" },
  uSeries: { path: "/robotics/u-series", title: "NuvaTrack-U — Unattended Solar Cleaning | Cleanuva", description: "NuvaTrack-U: unattended, site-configured solar panel cleaning for repeatable PV site operations.", ogImage: "/images/robotics/u-series-hero.jpg" },
  nuvaspan: { path: "/robotics/nuvaspan", title: "NuvaSpan — Fixed Solar Cleaning System | Cleanuva", description: "NuvaSpan: a suspended / bridge-type cleaning system for fixed PV installations and project-engineered structures.", ogImage: "/images/robotics/overview-hero.jpg" },
  compare: { path: "/robotics/compare", title: "Compare Solar Cleaning Robots | Cleanuva", description: "Compare NuvaTrack-R, NuvaTrack-R Pro, NuvaTrack-U and NuvaSpan by operation, automation, cleaning mode and deployment.", ogImage: "/images/robotics/r-series-hero.jpg" },
  accessories: { path: "/robotics/accessories", title: "Accessories & Service Parts | Cleanuva Robotics", description: "Brushes, consumables, control accessories and service parts for Cleanuva solar cleaning robots.", ogImage: "/images/robotics/r-series-op-1.jpg" },
  platform: { path: "/platform", title: "AI O&M Platform for Solar Assets | Cleanuva Platform", description: "Detect PV performance losses, recommend actions, execute cleaning or service work and verify recovered value with Cleanuva Platform.", ogImage: "/images/platform/platform-home-screenshot.png" },
  solutions: { path: "/solutions", title: "Solar Cleaning and PV Operations Solutions | Cleanuva", description: "Solutions for PV asset owners, O&M teams, cleaning service operators, EPC teams and distribution partners.", ogImage: "/images/robotics/overview-hero.jpg" },
  distribution: { path: "/distribution-network", title: "Cleanuva Distribution Network | Solar Robotics Partners", description: "Partner with Cleanuva to bring solar cleaning robots, accessories and AI-supported operations to your regional PV market.", ogImage: "/images/robotics/overview-hero.jpg" },
  gallery: { path: "/gallery", title: "Media Gallery | Cleanuva", description: "Robotics, platform and field-operation visuals for solar cleaning and PV operations.", ogImage: "/images/robotics/r-series-op-1.jpg" },
  support: { path: "/support", title: "Support & Sales Assistance | Cleanuva", description: "Find the right Cleanuva contact path for robot sales, the AI O&M platform, accessories, product comparison, distribution and support.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
  company: { path: "/company", title: "About Cleanuva | NETRO Sparkle GmbH", description: "Cleanuva is the solar robotics and AI operations brand of NETRO Sparkle GmbH, based in Germany.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
  getPricing: { path: "/get-pricing", title: "Get Pricing | Cleanuva Solar Cleaning Robots", description: "Request pricing for Cleanuva solar cleaning robots, accessories and AI-supported operations for your PV site.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
  requestDemo: { path: "/request-demo", title: "Request a Demo | Cleanuva", description: "Request a demo of Cleanuva solar cleaning robots and the AI-native operations platform for your PV assets.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
  resources: { path: "/resources", title: "Resources | Cleanuva", description: "Product information and resources for Cleanuva solar cleaning robots and AI-supported PV operations.", ogImage: "/images/hero/homepage-hero-daylight.jpg" },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof PAGE_SEO;

/** Public marketing routes for the sitemap (locale-less; "" = home). */
export const SITEMAP_PATHS: string[] = [
  "", "/robotics", "/robotics/r-series", "/robotics/u-series", "/robotics/nuvaspan",
  "/robotics/compare", "/robotics/accessories", "/platform", "/solutions",
  "/distribution-network", "/gallery", "/support", "/company",
  "/get-pricing", "/request-demo",
];

/** Localized href map for hreflang (+ x-default → English). */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/en${path}`;
  return languages;
}

/** Build a full Metadata object for a core page in the current locale. */
export function pageMetadata(key: PageKey, rawLocale: string): Metadata {
  const locale: SeoLocale = isLocale(rawLocale) ? rawLocale : "en";
  const { path, title, description, ogImage } = PAGE_SEO[key];
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const canonical = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
