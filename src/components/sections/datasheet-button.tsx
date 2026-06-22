"use client";

import * as React from "react";
import { Download, FileText } from "lucide-react";

import { Button, type ButtonProps } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

/**
 * Datasheet download (RP-3), graceful. HEAD-checks the PDF on mount: if present
 * → a real download button; if absent (or while checking) → "Request datasheet"
 * routing to Request a demo. Never a broken/404 link; auto-upgrades once the PDF
 * is dropped at its path.
 */
export function DatasheetButton({
  href,
  downloadLabel,
  requestLabel,
  variant = "secondary",
  className,
}: {
  href: string;
  downloadLabel: string;
  requestLabel: string;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const [available, setAvailable] = React.useState(false);

  React.useEffect(() => {
    let on = true;
    fetch(href, { method: "HEAD" })
      .then((r) => on && setAvailable(r.ok))
      .catch(() => on && setAvailable(false));
    return () => {
      on = false;
    };
  }, [href]);

  if (available) {
    return (
      <Button variant={variant} asChild className={className}>
        <a href={href} download>
          <Download className="size-4" aria-hidden />
          {downloadLabel}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} asChild className={className}>
      <Link href="/request-demo">
        <FileText className="size-4" aria-hidden />
        {requestLabel}
      </Link>
    </Button>
  );
}
