"use client";

import { motion, useTransform } from "framer-motion";
import { Lock } from "lucide-react";
import { DASH_W, useRamp, type Progress } from "./timeline";

/**
 * Browser-style "Client Portal" frame that sits just outside the dashboard box,
 * so fading it in never reflows the dashboard.
 */
export function PortalFrame({ p }: { p: Progress }) {
  const opacity = useRamp(p, 0.77, 0.85);
  const trackBg = useTransform(p, [0.88, 0.94], ["rgb(63,63,70)", "rgb(99,102,241)"]);
  const knobX = useTransform(p, [0.88, 0.94], [0, 18]);
  const liveOpacity = useRamp(p, 0.93, 0.97);

  return (
    <motion.div
      aria-hidden
      style={{ opacity, width: DASH_W + 24 }}
      className="absolute -left-3 -top-[52px] bottom-[-12px] rounded-3xl border border-white/10 bg-zinc-900/80"
    >
      <div className="flex h-11 items-center gap-3 px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-md bg-black/40 py-1 text-[11px] text-zinc-400">
          <Lock className="h-3 w-3" />
          <span className="font-semibold text-zinc-200">Client Portal</span>
          <span className="font-mono">· portal.youragency.com/acme</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-300">
          <span>Share Access</span>
          <motion.div
            style={{ backgroundColor: trackBg }}
            className="flex h-5 w-10 items-center rounded-full p-0.5"
          >
            <motion.div
              style={{ x: knobX }}
              className="h-4 w-4 rounded-full bg-white shadow"
            />
          </motion.div>
          <motion.span style={{ opacity: liveOpacity }} className="text-emerald-300">
            Read-only link live
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
