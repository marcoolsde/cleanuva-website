"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, ChevronDown } from "lucide-react";

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
  const [logoFailed, setLogoFailed] = React.useState(false);
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {logoFailed ? (
        // Fallback (image missing): the original gradient mark + wordmark.
        <>
          <span
            aria-hidden
            className="size-[22px] rounded-full bg-[image:var(--current)]"
          />
          <span className="text-[19px] font-semibold tracking-[-0.01em] text-ink">
            {t("brand")}
          </span>
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- swappable logo of unknown aspect; scale by height, fall back to text on error
        <img
          src="/images/brand/cleanuva-logo.png"
          alt={t("brand")}
          className="h-[26px] w-auto md:h-[30px]"
          onError={() => setLogoFailed(true)}
        />
      )}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const tNav = useTranslations("Nav");
  const tRobo = useTranslations("Nav.roboticsMenu");
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

  const linkCls = (active: boolean) =>
    cn(
      "border-b-2 py-1 text-[15px] font-medium transition-colors",
      active ? "border-cool text-ink" : "border-transparent text-ink-2 hover:text-ink",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-canvas/82 backdrop-blur transition-shadow",
        scrolled && "border-b border-line",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <BrandMark />

        {/* Center nav — hidden below lg, available in the drawer on mobile. */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);

            if (item.children) {
              return (
                <div key={item.key} className="group relative">
                  <Link href={item.href} className={cn(linkCls(active), "inline-flex items-center gap-1")}>
                    {tNav(item.key)}
                    <ChevronDown
                      className="size-3.5 text-ink-3 transition-transform group-hover:rotate-180"
                      aria-hidden
                    />
                  </Link>
                  {/* Hover/focus panel — pt bridges the gap so it stays open on the way down. */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[296px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-xl border border-line bg-canvas p-2 shadow-lift">
                      {item.children.map((c) => {
                        const isCompare = c.key === "compare";
                        return (
                          <Link
                            key={c.key}
                            href={c.href}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-sunk focus-visible:bg-surface-sunk focus-visible:outline-none",
                              isCompare && "mt-1 border-t border-line pt-3",
                            )}
                          >
                            <span className="block text-[15px] font-medium text-ink">
                              {tRobo(`${c.key}.name`)}
                            </span>
                            <span className="mt-0.5 block text-[13px] text-ink-3">
                              {tRobo(`${c.key}.desc`)}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.key} href={item.href} className={linkCls(active)}>
                {tNav(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          {/* Robotics-first: primary action = robot quote; demo is secondary. */}
          <Button variant="secondary" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/request-demo">{tCta("requestDemo")}</Link>
          </Button>
          <Button variant="primary" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/get-pricing">{tCta("getQuote")}</Link>
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
                  <div key={item.key}>
                    <Link
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
                    {item.children ? (
                      <div className="ms-3 mt-1 flex flex-col gap-0.5 border-s border-line ps-3">
                        {item.children.map((c) => (
                          <Link
                            key={c.key}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-3 py-2 text-[15px] text-ink-2 transition-colors hover:bg-surface-sunk hover:text-ink"
                          >
                            {tRobo(`${c.key}.name`)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 px-4">
                <Button variant="primary" asChild>
                  <Link href="/get-pricing" onClick={() => setOpen(false)}>
                    {tCta("getQuote")}
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/request-demo" onClick={() => setOpen(false)}>
                    {tCta("requestDemo")}
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
