import { useTranslations } from "next-intl";
import { Cloud, Server, Combine, Check } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { DEPLOYMENT_MODELS, type DeploymentModel } from "@/content/deployment";

const ICONS: Record<DeploymentModel["icon"], typeof Cloud> = {
  Cloud,
  Server,
  Combine,
};

/** Deployment (build-plan P5) — three business options, equal weight. */
export function Deployment() {
  const t = useTranslations("Platform.Deployment");

  return (
    <Section tone="light" className="bg-surface">
      <Container>
        <Reveal>
          <div className="max-w-[60ch]">
            <Eyebrow accent="cool">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h1">{t("title")}</h2>
            <p className="mt-3 measure text-body-m text-ink-2">{t("body")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPLOYMENT_MODELS.map((model, i) => {
            const Icon = ICONS[model.icon];
            const points = t.raw(`models.${model.key}.points`) as string[];
            return (
              <Reveal key={model.key} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-canvas p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-cool-tint text-cool-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-h4">{t(`models.${model.key}.title`)}</h3>
                  <p className="mt-1 text-loop text-cool-text">
                    {t(`models.${model.key}.tagline`)}
                  </p>

                  <ul className="mt-5 flex-1 space-y-3">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-body-s text-ink-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-cool-text" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-line pt-4 text-caption text-ink-3">
                    {t(`models.${model.key}.bestFor`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
