import type { RegistrationValues } from "../model/registration-schema";

type RegistrationResponse = { accessToken: string };

export class RegistrationError extends Error {
  constructor(
    message: string,
    readonly isDuplicateEmail = false,
  ) {
    super(message);
  }
}

export async function registerAccount({ name, email, password }: RegistrationValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
  });

  if (response.ok) {
    return (await response.json()) as RegistrationResponse;
  }

  if (response.status === 409) {
    throw new RegistrationError("An account already exists for this email address.", true);
  }

  throw new RegistrationError("We could not create your account. Please try again.");
}
