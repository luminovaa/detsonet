"use client";

import {
  FormControl,
  FormDescription,
  FormField as FormFieldPrimitive,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

import { ReactNode } from "react";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "date";
  selectOptions?: { value: string; label: string }[];
  children?: ReactNode;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  placeholder,
  description,
  disabled = false,
  className = "",
  type = "text",
  selectOptions = [],
  children,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldPrimitive
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                disabled={disabled}
                className="rounded-3xl"
                {...field}
              />
            ) : type === "select" ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
              >
                <FormControl>
                  <SelectTrigger className="rounded-3xl">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-3xl">
                  {selectOptions.map((option) => (
                    <SelectItem className="rounded-3xl" key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : children ? (
              children
            ) : (
              <Input
                className="rounded-3xl"
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          {description && <FormDescription className="text-xs ml">* {description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}