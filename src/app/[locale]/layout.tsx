import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Geist_Mono, Noto_Sans_Arabic, Noto_Sans_SC } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing, localeDir, type Locale } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

// Free, production-ready stand-ins for the licensed Söhne / Söhne Mono, plus
// script-specific fallbacks (design-system §2.1 + project decision):
//   Latin → Inter · mono → Geist Mono · Arabic → Noto Sans Arabic · CJK → Noto Sans SC.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// CJK is large; load it lazily and only on zh pages (no preload).
const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Cleanuva — Autonomous Solar Asset Operations",
  description:
    "From detection to done. And proven. The operating system and robotics for solar asset operations.",
  // Brand favicon / app icon. Falls back to src/app/favicon.ico until the PNG
  // is added; once present it becomes the declared icon. Swap = same-name file.
  icons: {
    icon: "/images/brand/cleanuva-icon.png",
    shortcut: "/images/brand/cleanuva-icon.png",
    apple: "/images/brand/cleanuva-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const messages = await getMessages();

  // Apply only the script fonts this locale needs (others skip the download).
  const fontVars = [
    inter.variable,
    geistMono.variable,
    locale === "ar" && notoArabic.variable,
    locale === "zh" && notoSC.variable,
  ]
    .filter(Boolean)
    .join(" ");

  // Light is the document default; dark is earned per-section (no global toggle).
  return (
    <html
      lang={locale}
      dir={localeDir[locale as Locale]}
      className={`${fontVars} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink font-sans">
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
