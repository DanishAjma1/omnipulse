"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function BentoCard({
  title,
  description,
  badge,
  icon,
  headerAction,
  footer,
  children,
  className,
  glow = true,
  ...props
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden",
        "bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-850",
        "shadow-sm transition-all duration-300",
        glow &&
          "hover:border-indigo-500/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.14)] dark:hover:border-indigo-500/40",
        className
      )}
      {...props}
    >
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial from-indigo-500/10 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col gap-4">
        {(badge || icon || headerAction) && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-indigo-600 dark:text-indigo-400 border border-zinc-200/80 dark:border-zinc-700/60 shadow-xs">
                  {icon}
                </div>
              )}
              {badge}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}

        {(title || description) && (
          <div className="space-y-1.5">
            {title && (
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {children && <div className="mt-2">{children}</div>}
      </div>

      {footer && (
        <div className="relative z-10 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
