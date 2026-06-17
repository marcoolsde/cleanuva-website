"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { NAV } from "@/content/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function BrandMark() {
  const t = useTranslations("Common");
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {/* 22px brand circle carrying the Current gradient (design-system §brand). */}
      <span
        aria-hidden
        className="size-[22px] rounded-full bg-[image:var(--current)]"
      />
      <span className="text-[19px] font-semibold tracking-[-0.01em] text-ink">
        {t("brand")}
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const tNav = useTranslations("Nav");
  const tCta = useTranslations("Cta");
  const tCommon = useTranslations("Common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Always light, translucent; hairline appears only after scroll.
        "sticky top-0 z-50 bg-canvas/82 backdrop-blur transition-shadow",
        scrolled && "border-b border-line",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <BrandMark />

        {/* Center nav — hidden below lg, available in the drawer on mobile. */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "border-b-2 py-1 text-[15px] font-medium transition-colors",
                  active
                    ? "border-cool text-ink"
                    : "border-transparent text-ink-2 hover:text-ink",
                )}
              >
                {tNav(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Button variant="secondary" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/get-pricing">{tCta("getRoboticsPricing")}</Link>
          </Button>
          <Button variant="primary" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/request-demo">{tCta("requestDemo")}</Link>
          </Button>

          {/* Mobile drawer */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={tCommon("openMenu")}
              className="inline-flex size-10 items-center justify-center rounded-md text-ink hover:bg-surface-sunk focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>{tCommon("menu")}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-[17px] font-medium transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-cool-tint text-cool-text"
                        : "text-ink hover:bg-surface-sunk",
                    )}
                  >
                    {tNav(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 px-4">
                <Button variant="primary" asChild>
                  <Link href="/request-demo" onClick={() => setOpen(false)}>
                    {tCta("requestDemo")}
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/get-pricing" onClick={() => setOpen(false)}>
                    {tCta("getRoboticsPricing")}
                  </Link>
                </Button>
                <div className="pt-2">
                  <LocaleSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
