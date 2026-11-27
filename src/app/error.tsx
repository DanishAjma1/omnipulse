"use client";

import React from "react";
import { ShieldAlert, RotateCcw } from "lucide-react";
import { DEFAULT_CREDENTIAL_MESSAGE } from "@/lib/friendlyError";

export default function ErrorBoundaryPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100">
      <div className="max-w-md w-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-8 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          Verification Required
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {DEFAULT_CREDENTIAL_MESSAGE}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
