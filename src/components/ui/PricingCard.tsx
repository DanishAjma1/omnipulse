"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  isAnnual: boolean;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function PricingCard({
  name,
  monthlyPrice,
  annualPrice,
  isAnnual,
  description,
  features,
  highlighted = false,
  badge,
  ctaText = "Get Started",
  ctaHref = "/register",
  className,
}: PricingCardProps) {
  const price = isAnnual ? annualPrice : monthlyPrice;

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300",
        highlighted
          ? "bg-gradient-to-b from-indigo-950/30 via-zinc-900 to-zinc-950 border-2 border-indigo-500/80 shadow-[0_0_45px_rgba(99,102,241,0.22)] lg:-translate-y-2 dark:from-indigo-950/40"
          : "bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-3.5 h-3.5" />
            {badge || "Most Popular"}
          </span>
        </div>
      )}

      <div>
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {name}
          </h3>
          {!highlighted && badge && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 min-h-[40px]">
          {description}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            ${price}
          </span>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            / month
          </span>
        </div>
        {isAnnual && (
          <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            Billed annually (save 20%)
          </p>
        )}

        <div className="my-8 h-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            What&apos;s included
          </p>
          <ul className="space-y-3 text-sm">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                <div
                  className={cn(
                    "mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0",
                    highlighted
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4">
        <Button
          variant={highlighted ? "primary" : "secondary"}
          size="lg"
          href={ctaHref}
          className="w-full justify-center"
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
}
