import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "neutral" | "success" | "outline";
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "brand",
  dot = false,
  className,
}: BadgeProps) {
  const variantStyles = {
    brand:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    neutral:
      "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    outline:
      "bg-transparent text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800",
  };

  const dotColors = {
    brand: "bg-indigo-500 animate-pulse",
    neutral: "bg-zinc-400",
    success: "bg-emerald-500 animate-pulse",
    outline: "bg-zinc-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
