"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/primitives/button";
import { Field, SelectField, FormSuccess, fieldControl } from "@/components/forms/fields";
import { makeDemoSchema, type DemoInput } from "@/lib/form-schemas";
import { submitDemo } from "@/lib/form-actions";

/**
 * Platform lead funnel (founder clarification #5): lead-gen, not registration.
 * Submits to the `platform-demo` funnel. No account is created.
 */
export function RequestDemoForm() {
  const t = useTranslations("Forms");
  const td = useTranslations("Forms.Demo");
  const locale = useLocale();

  const [done, setDone] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(false);

  const schema = React.useMemo(
    () => makeDemoSchema({ required: t("required"), email: t("invalidEmail") }),
    [t],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DemoInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      portfolio: "",
      region: "",
      goal: "",
      message: "",
    },
  });

  async function onSubmit(values: DemoInput) {
    setSubmitFailed(false);
    const res = await submitDemo(values, locale);
    if (res.ok) setDone(true);
    else setSubmitFailed(true);
  }

  const opt = (ns: string, keys: string[]) =>
    keys.map((k) => ({ value: k, label: td(`${ns}.${k}`) }));

  if (done) {
    return <FormSuccess title={td("successTitle")} body={td("successBody")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={td("fields.name")} htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" className={fieldControl} {...register("name")} />
        </Field>
        <Field label={td("fields.email")} htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" className={fieldControl} {...register("email")} />
        </Field>
      </div>

      <Field label={td("fields.company")} htmlFor="company" error={errors.company?.message}>
        <Input id="company" autoComplete="organization" className={fieldControl} {...register("company")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="role"
          label={td("fields.role")}
          placeholder={t("selectPlaceholder")}
          options={opt("roles", ["owner", "om", "ipp", "epc", "auditor", "other"])}
          error={errors.role?.message}
        />
        <SelectField
          control={control}
          name="portfolio"
          label={td("fields.portfolio")}
          placeholder={t("selectPlaceholder")}
          options={opt("portfolios", ["p1", "p2", "p3", "p4"])}
          error={errors.portfolio?.message}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="region"
          label={td("fields.region")}
          placeholder={t("selectPlaceholder")}
          options={opt("regions", ["eu", "mea", "na"])}
          error={errors.region?.message}
        />
        <SelectField
          control={control}
          name="goal"
          label={td("fields.goal")}
          placeholder={t("selectPlaceholder")}
          options={opt("goals", ["unify", "copilot", "command", "reporting", "robotics", "other"])}
          error={errors.goal?.message}
          optional
          optionalLabel={t("optional")}
        />
      </div>

      <Field
        label={td("fields.message")}
        htmlFor="message"
        error={errors.message?.message}
        optional
        optionalLabel={t("optional")}
      >
        <Textarea id="message" rows={4} className="rounded-md border-line bg-surface-sunk text-base text-ink" {...register("message")} />
      </Field>

      {submitFailed ? (
        <p className="text-sm text-destructive" role="alert">
          {t("errorGeneric")}
        </p>
      ) : null}

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("submitting") : td("submit")}
      </Button>
    </form>
  );
}
