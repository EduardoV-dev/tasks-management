"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegistrationError, registerAccount } from "../api/register-account";
import { setAccessToken } from "../lib/access-token";
import { type RegistrationValues, registrationSchema } from "../model/registration-schema";

const inputClassName =
  "mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive";

export function RegisterForm() {
  const router = useRouter();
  const errorId = useId();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const registration = useMutation({
    mutationFn: registerAccount,
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof RegistrationError && error.isDuplicateEmail) {
        setError("email", { message: error.message });
        return;
      }

      setError("root", { message: "We could not create your account. Please try again." });
    },
  });

  function submit(values: RegistrationValues) {
    registration.mutate(values);
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(submit)}>
      {errors.root?.message ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert">
          {errors.root.message}
        </p>
      ) : null}
      <Field label="Name" error={errors.name?.message} id="name">
        <input
          autoComplete="name"
          className={inputClassName}
          id="name"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
      </Field>
      <Field label="Email" error={errors.email?.message} id="email">
        <input
          autoComplete="email"
          className={inputClassName}
          id="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>
      <Field label="Password" error={errors.password?.message} id="password">
        <input
          autoComplete="new-password"
          className={inputClassName}
          id="password"
          type="password"
          aria-describedby={`${errorId}-password-rules`}
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        <p className="mt-2 text-xs text-muted-foreground" id={`${errorId}-password-rules`}>
          Use 8-128 characters with uppercase, lowercase, and a number.
        </p>
      </Field>
      <Field label="Confirm password" error={errors.confirmPassword?.message} id="confirm-password">
        <input
          autoComplete="new-password"
          className={inputClassName}
          id="confirm-password"
          type="password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
      </Field>
      <Button className="h-11 w-full" disabled={registration.isPending} type="submit">
        {registration.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

function Field({
  children,
  error,
  id,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
