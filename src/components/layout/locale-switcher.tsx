"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Common");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function selectLocale(locale: Locale) {
    if (locale === activeLocale) return;
    // Keep the user on the same route, swapping only the locale prefix.
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("selectLanguage")}
        disabled={isPending}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-ink-2 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none",
          className,
        )}
      >
        <Globe className="size-4" aria-hidden />
        <span className="uppercase">{activeLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() => selectLocale(locale)}
            className="flex items-center justify-between gap-6"
          >
            <span>{localeLabels[locale]}</span>
            {locale === activeLocale ? (
              <Check className="size-4 text-cool-text" aria-hidden />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
