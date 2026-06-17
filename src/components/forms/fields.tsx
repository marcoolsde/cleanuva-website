"use client";

import * as React from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import { CheckCircle2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** Shared confirmation panel shown after a successful submit. */
export function FormSuccess({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="flex flex-col items-start gap-3 rounded-lg border border-verified/30 bg-verified/5 p-6"
      role="status"
    >
      <CheckCircle2 className="size-7 text-verified" aria-hidden />
      <h2 className="text-display-s text-ink">{title}</h2>
      <p className="text-body-l text-ink-2">{body}</p>
    </div>
  );
}

/** A labelled control row with an accessible error message. */
export function Field({
  label,
  htmlFor,
  error,
  optional,
  optionalLabel,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-baseline gap-2 text-sm font-medium text-ink"
      >
        {label}
        {optional && optionalLabel ? (
          <span className="text-xs font-normal text-ink-3">{optionalLabel}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Tall input styling shared across both funnels. */
export const fieldControl =
  "h-[52px] rounded-md border-line bg-surface-sunk text-base text-ink";

type Option = { value: string; label: string };

/** RHF-controlled shadcn Select wrapped in a Field. */
export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  error,
  optional,
  optionalLabel,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options: Option[];
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
}) {
  return (
    <Field label={label} htmlFor={name} error={error} optional={optional} optionalLabel={optionalLabel}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger
              id={name}
              aria-invalid={!!error}
              className={cn(fieldControl, "w-full data-[size=default]:h-[52px]")}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}
