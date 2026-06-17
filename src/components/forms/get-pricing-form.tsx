"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/primitives/button";
import { Field, SelectField, FormSuccess, fieldControl } from "@/components/forms/fields";
import { makeQuoteSchema, type QuoteInput } from "@/lib/form-schemas";
import { submitQuote } from "@/lib/form-actions";

const MODELS = ["nuvatrack-r", "nuvatrack-u", "nuvaspan"] as const;

/**
 * Robotics RFQ funnel (founder clarifications #4–#5): a deliberately simple
 * Tesla/Apple-style flow — Model → Configuration → Options → RFQ. No account,
 * no pricing shown, no engineering/fleet/ROI logic (that lives in the internal
 * sales workflow). Submits to the `robotics-rfq` funnel.
 */
export function GetPricingForm({ initialModel }: { initialModel?: string }) {
  const t = useTranslations("Forms");
  const tq = useTranslations("Forms.Quote");
  const locale = useLocale();

  const [done, setDone] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(false);

  const schema = React.useMemo(
    () => makeQuoteSchema({ required: t("required"), email: t("invalidEmail") }),
    [t],
  );

  const validInitial = initialModel && (MODELS as readonly string[]).includes(initialModel) ? initialModel : "";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      model: validInitial,
      battery: "",
      brush: "",
      warranty: "",
      units: "",
      region: "",
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const watched = useWatch({ control });

  async function onSubmit(values: QuoteInput) {
    setSubmitFailed(false);
    const res = await submitQuote(values, locale);
    if (res.ok) setDone(true);
    else setSubmitFailed(true);
  }

  const opt = (ns: string, keys: string[]) =>
    keys.map((k) => ({ value: k, label: tq(`${ns}.${k}`) }));

  if (done) {
    return <FormSuccess title={tq("successTitle")} body={tq("successBody")} />;
  }

  // Live configuration summary (Apple-style), labels only — no price.
  const summaryRows: { label: string; value: string }[] = [
    { label: tq("fields.model"), value: watched.model ? tq(`models.${watched.model}`) : "—" },
    { label: tq("fields.battery"), value: watched.battery ? tq(`battery.${watched.battery}`) : "—" },
    { label: tq("fields.brush"), value: watched.brush ? tq(`brush.${watched.brush}`) : "—" },
    { label: tq("fields.warranty"), value: watched.warranty ? tq(`warranty.${watched.warranty}`) : "—" },
    { label: tq("fields.units"), value: watched.units ? tq(`units.${watched.units}`) : "—" },
    { label: tq("fields.region"), value: watched.region ? tq(`regions.${watched.region}`) : "—" },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* Step 1 — Model */}
        <fieldset className="space-y-5">
          <legend className="text-eyebrow text-cool-text">{tq("sections.model")}</legend>
          <SelectField
            control={control}
            name="model"
            label={tq("fields.model")}
            placeholder={t("selectPlaceholder")}
            options={MODELS.map((m) => ({ value: m, label: tq(`models.${m}`) }))}
            error={errors.model?.message}
          />
        </fieldset>

        {/* Step 2 — Configuration */}
        <fieldset className="space-y-5">
          <legend className="text-eyebrow text-cool-text">{tq("sections.config")}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              control={control}
              name="battery"
              label={tq("fields.battery")}
              placeholder={t("selectPlaceholder")}
              options={opt("battery", ["standard", "extended"])}
              error={errors.battery?.message}
            />
            <SelectField
              control={control}
              name="brush"
              label={tq("fields.brush")}
              placeholder={t("selectPlaceholder")}
              options={opt("brush", ["standard", "abrasion"])}
              error={errors.brush?.message}
            />
            <SelectField
              control={control}
              name="warranty"
              label={tq("fields.warranty")}
              placeholder={t("selectPlaceholder")}
              options={opt("warranty", ["standard", "extended", "premium"])}
              error={errors.warranty?.message}
            />
            <SelectField
              control={control}
              name="units"
              label={tq("fields.units")}
              placeholder={t("selectPlaceholder")}
              options={opt("units", ["u1", "u2", "u3", "u4"])}
              error={errors.units?.message}
              optional
              optionalLabel={t("optional")}
            />
          </div>
          <SelectField
            control={control}
            name="region"
            label={tq("fields.region")}
            placeholder={t("selectPlaceholder")}
            options={opt("regions", ["eu", "mea", "na"])}
            error={errors.region?.message}
          />
        </fieldset>

        {/* Step 3 — Contact */}
        <fieldset className="space-y-5">
          <legend className="text-eyebrow text-cool-text">{tq("sections.contact")}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={tq("fields.name")} htmlFor="q-name" error={errors.name?.message}>
              <Input id="q-name" autoComplete="name" className={fieldControl} {...register("name")} />
            </Field>
            <Field label={tq("fields.email")} htmlFor="q-email" error={errors.email?.message}>
              <Input id="q-email" type="email" autoComplete="email" className={fieldControl} {...register("email")} />
            </Field>
          </div>
          <Field label={tq("fields.company")} htmlFor="q-company" error={errors.company?.message}>
            <Input id="q-company" autoComplete="organization" className={fieldControl} {...register("company")} />
          </Field>
          <Field
            label={tq("fields.message")}
            htmlFor="q-message"
            error={errors.message?.message}
            optional
            optionalLabel={t("optional")}
          >
            <Textarea id="q-message" rows={4} className="rounded-md border-line bg-surface-sunk text-base text-ink" {...register("message")} />
          </Field>
        </fieldset>

        {submitFailed ? (
          <p className="text-sm text-destructive" role="alert">
            {t("errorGeneric")}
          </p>
        ) : null}

        <Button type="submit" variant="warm" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? t("submitting") : tq("submit")}
        </Button>
      </form>

      {/* Sticky configuration summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-lg border border-line bg-surface-sunk p-6">
          <p className="text-eyebrow text-ink-3">{tq("summaryTitle")}</p>
          <dl className="mt-4 space-y-3">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2 last:border-0">
                <dt className="text-sm text-ink-3">{row.label}</dt>
                <dd className="text-right text-sm font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
