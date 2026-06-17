import * as React from "react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";

export type LegalSection = { heading: string; body: string };

/**
 * Shared layout for the four legal pages (v1.1-B). Understated, prose-width,
 * always light. Section bodies render `whitespace-pre-line` so message strings
 * can use "\n" for short breaks. The optional `children` slot carries the
 * Imprint provider block above the prose sections.
 */
export function LegalShell({
  title,
  note,
  sections,
  children,
}: {
  title: string;
  note?: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <Section>
      <Container className="max-w-[760px]">
        <h1 className="text-display-l text-balance text-ink">{title}</h1>
        {note ? <p className="mt-4 text-body-s text-ink-3">{note}</p> : null}

        {children}

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-lg font-medium text-ink">{s.heading}</h2>
              <p className="whitespace-pre-line text-body-m text-ink-2">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
