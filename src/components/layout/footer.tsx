import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOOTER_COLUMNS } from "@/content/nav";
import { LEGAL } from "@/content/legal";

const LEGAL_LINKS = [
  { key: "imprint", href: "/company/legal/imprint" },
  { key: "privacy", href: "/company/legal/privacy" },
  { key: "terms", href: "/company/legal/terms" },
  { key: "cookies", href: "/company/legal/cookies" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tCommon = useTranslations("Common");

  return (
    // Always light (design-system §6 [11]); brand seam + legal.
    <footer className="border-t border-line bg-surface text-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        {/* Tier 1 — brand + IA columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-[22px] rounded-full bg-[image:var(--current)]"
              />
              <span className="text-[19px] font-semibold tracking-[-0.01em]">
                {tCommon("brand")}
              </span>
            </Link>
            <p className="mt-4 max-w-[28ch] text-body-s text-ink-2">
              {t("tagline")}
            </p>
            {/* Brand-architecture micro-line — names the three product lines on every page */}
            <p className="mt-3 text-caption text-ink-3">
              {t("brandLine")}
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.key}>
              <h2 className="text-eyebrow text-ink-3">
                {t(`columns.${column.key}`)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-body-s text-ink-2 transition-colors hover:text-ink"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tier 2 — legal strip (must name NETRO Sparkle GmbH) */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-caption text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            {t("legal.copyright", { year: LEGAL.copyrightYear })}{" "}
            {t("legal.brandOf")}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-ink"
                >
                  {t(`legal.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
