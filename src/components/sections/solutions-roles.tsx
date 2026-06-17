import { useTranslations } from "next-intl";
import { TrendingUp, Factory, FileSearch, HardHat, Wrench, ArrowRight } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Link } from "@/i18n/navigation";
import { SOLUTION_ROLES, type SolutionRole } from "@/content/solutions";

const ICONS: Record<SolutionRole["icon"], typeof TrendingUp> = {
  TrendingUp,
  Factory,
  FileSearch,
  HardHat,
  Wrench,
};

/** Self-segmentation tiles (build-plan [07]) — each opens with the outcome. */
export function SolutionsRoles() {
  const t = useTranslations("Solutions");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="neutral">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_ROLES.map((role, i) => {
            const Icon = ICONS[role.icon];
            return (
              <Reveal key={role.key} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={role.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-canvas p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-cool focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4">{t(`roles.${role.key}.title`)}</h3>
                  <p className="mt-2 flex-1 text-body-s text-ink-2">
                    {t(`roles.${role.key}.outcome`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-cool-text transition-all group-hover:gap-2.5">
                    {t("learnMore")}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
