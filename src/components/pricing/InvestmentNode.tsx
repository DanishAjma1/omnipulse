"use client";

import type { Ref, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InvestmentNodeProps {
  side: "left" | "right";
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  visual: ReactNode;
  dotRef?: Ref<HTMLDivElement>;
}

/** One bento node anchored to the pipeline; reveals once, when comfortably in view. */
export function InvestmentNode({ side, eyebrow, title, lead, body, visual, dotRef }: InvestmentNodeProps) {
  const left = side === "left";
  return (
    <div className="relative grid md:grid-cols-2">
      {/* Pipeline dot + connector */}
      <motion.div
        ref={dotRef}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.4 }}
        className="absolute left-4 top-10 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_14px_3px_rgba(34,211,238,0.7)] dark:border-[#0A0A0A] md:left-1/2"
      />
      <div
        aria-hidden
        className={cn(
          "absolute left-4 top-[45px] h-px w-8 bg-gradient-to-r from-blue-500 to-cyan-400 md:w-14",
          left ? "md:left-auto md:right-1/2 md:bg-gradient-to-l" : "md:left-1/2"
        )}
      />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "ml-12 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-[scale,background-color,border-color,box-shadow] duration-300 sm:p-8",
          "hover:scale-[1.02] hover:border-cyan-400/60 hover:bg-zinc-50 hover:shadow-[0_0_32px_rgba(34,211,238,0.15)]",
          "dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/5",
          left ? "md:col-start-1 md:ml-0 md:mr-14" : "md:col-start-2 md:ml-14"
        )}
      >
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 shrink-0 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-black/40">
            {visual}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              {eyebrow}
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{lead}</strong>{" "}
          {body}
        </p>
      </motion.article>
    </div>
  );
}
