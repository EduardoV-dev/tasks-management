"use client";

import Link from "next/link";

import { getAccessToken } from "@/features/auth/lib/access-token";

export default function Home() {
  const accessToken = getAccessToken();

  return (
    <main className="grid min-h-screen place-items-center bg-background p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Tasks Management</h1>
        <p className="text-muted-foreground">
          {accessToken ? "Your dashboard is ready." : "Create an account to get started."}
        </p>
        {accessToken ? null : (
          <Link
            className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
            href="/register">
            Get started
          </Link>
        )}
      </div>
    </main>
  );
}
