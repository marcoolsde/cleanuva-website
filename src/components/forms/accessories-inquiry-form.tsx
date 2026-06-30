"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";
import { Field, SelectField, FormSuccess, HoneypotField, fieldControl } from "@/components/forms/fields";
import {
  makeAccessorySchema,
  INQUIRY_TYPES,
  INQUIRY_MODELS,
  type AccessoryInput,
} from "@/lib/form-schemas";
import { submitAccessoryInquiry } from "@/lib/form-actions";

// Brand product names are never translated.
const MODEL_NAMES: Record<string, string> = {
  "nuvatrack-r": "NuvaTrack-R",
  "nuvatrack-r-pro": "NuvaTrack-R Pro",
  "nuvatrack-u": "NuvaTrack-U",
  nuvaspan: "NuvaSpan",
};

/**
 * Accessories / contact inquiry form (P1A). Reuses the shared field primitives
 * + the existing server-action delivery mechanism (no new backend). Submits an
 * accessories lead to info@cleanuva.de via the configured webhook.
 */
export function AccessoryInquiryForm() {
  const t = useTranslations("Forms");
  const tA = useTranslations("Forms.Accessory");
  const locale = useLocale();

  const [done, setDone] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(false);
  const [startedAt] = React.useState(() => Date.now());

  const schema = React.useMemo(
    () =>
      makeAccessorySchema({
        required: t("required"),
        email: t("invalidEmail"),
        consent: tA("consentError"),
      }),
    [t, tA],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AccessoryInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      inquiryType: "accessories_quote",
      robotModel: "not_sure",
      accessoryInterest: "",
      hearAbout: "",
      message: "",
      consent: false,
      hpWebsite: "",
    },
  });

  async function onSubmit(values: AccessoryInput) {
    setSubmitFailed(false);
    const res = await submitAccessoryInquiry(values, locale, startedAt);
    if (res.ok) setDone(true);
    else setSubmitFailed(true);
  }

  const inquiryOptions = INQUIRY_TYPES.map((k) => ({ value: k, label: tA(`inquiryTypes.${k}`) }));
  const modelOptions = INQUIRY_MODELS.map((k) => ({
    value: k,
    label: k === "not_sure" ? tA("models.not_sure") : MODEL_NAMES[k],
  }));

  if (done) {
    return <FormSuccess title={tA("successTitle")} body={tA("successBody")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <HoneypotField registration={register("hpWebsite")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={tA("fields.firstName")} htmlFor="firstName" error={errors.firstName?.message}>
          <Input id="firstName" autoComplete="given-name" className={fieldControl} {...register("firstName")} />
        </Field>
        <Field label={tA("fields.lastName")} htmlFor="lastName" error={errors.lastName?.message}>
          <Input id="lastName" autoComplete="family-name" className={fieldControl} {...register("lastName")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={tA("fields.company")} htmlFor="company" error={errors.company?.message}>
          <Input id="company" autoComplete="organization" className={fieldControl} {...register("company")} />
        </Field>
        <Field label={tA("fields.country")} htmlFor="country" error={errors.country?.message}>
          <Input id="country" autoComplete="country-name" className={fieldControl} {...register("country")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={tA("fields.email")} htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" className={fieldControl} {...register("email")} />
        </Field>
        <Field label={tA("fields.phone")} htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" className={fieldControl} {...register("phone")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="inquiryType"
          label={tA("fields.inquiryType")}
          placeholder={t("selectPlaceholder")}
          options={inquiryOptions}
          error={errors.inquiryType?.message}
        />
        <SelectField
          control={control}
          name="robotModel"
          label={tA("fields.robotModel")}
          placeholder={t("selectPlaceholder")}
          options={modelOptions}
          error={errors.robotModel?.message}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={tA("fields.accessoryInterest")}
          htmlFor="accessoryInterest"
          error={errors.accessoryInterest?.message}
          optional
          optionalLabel={t("optional")}
        >
          <Input id="accessoryInterest" className={fieldControl} {...register("accessoryInterest")} />
        </Field>
        <Field
          label={tA("fields.hearAbout")}
          htmlFor="hearAbout"
          error={errors.hearAbout?.message}
          optional
          optionalLabel={t("optional")}
        >
          <Input id="hearAbout" className={fieldControl} {...register("hearAbout")} />
        </Field>
      </div>

      <Field label={tA("fields.message")} htmlFor="message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={4}
          className="rounded-md border-line bg-surface-sunk text-base text-ink"
          {...register("message")}
        />
      </Field>

      <div className="space-y-1.5">
        <label htmlFor="consent" className="flex items-start gap-3 text-body-s text-ink-2">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-cool"
            {...register("consent")}
          />
          <span>
            {tA("consent")}{" "}
            <Link href="/company/legal/privacy" className="text-cool-text underline">
              {tA("privacyPolicy")}
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="text-xs text-destructive" role="alert">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {submitFailed ? (
        <p className="text-sm text-destructive" role="alert">
          {t("errorGeneric")}
        </p>
      ) : null}

      <Button type="submit" variant="warm" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("submitting") : tA("submit")}
      </Button>
    </form>
  );
}
