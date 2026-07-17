import Link from "next/link";

import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 p-4 sm:p-8">
      <section className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground">
          Tasks Management
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/login">
            Log in
          </Link>
        </p>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
