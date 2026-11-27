"use client";

import React from "react";
import { DEFAULT_CREDENTIAL_MESSAGE } from "@/lib/friendlyError";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0A] text-zinc-100 antialiased">
        <div className="max-w-md w-full rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center space-y-4 shadow-2xl">
          <h2 className="text-xl font-bold tracking-tight">
            Verification Required
          </h2>
          <p className="text-sm text-zinc-400">{DEFAULT_CREDENTIAL_MESSAGE}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
