"use client";

import { motion, useTransform } from "framer-motion";
import { useRamp, useRampOut, type Progress } from "./timeline";

const TILE_STYLES = [
  "from-indigo-500/40 to-cyan-500/30",
  "from-fuchsia-500/40 to-indigo-500/30",
  "from-emerald-500/40 to-cyan-500/30",
  "from-amber-500/40 to-rose-500/30",
];

function Tile({ p, index }: { p: Progress; index: number }) {
  const start = 0.4 + index * 0.0075;
  const opacity = useRamp(p, start, start + 0.02);
  const scale = useTransform(p, [start, start + 0.02], [0.85, 1]);
  const square = index % 3 === 2;
  return (
    <motion.div
      style={{ opacity, scale }}
      className={`relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${
        TILE_STYLES[index % TILE_STYLES.length]
      }`}
    >
      <svg viewBox="0 0 80 60" className="absolute inset-0 h-full w-full">
        <circle cx="58" cy="16" r="6" fill="rgba(255,255,255,0.35)" />
        <path d="M0 60 L24 28 L40 46 L54 32 L80 60 Z" fill="rgba(255,255,255,0.22)" />
      </svg>
      <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-[8px] text-zinc-200">
        {square ? "1:1" : "1.91:1"}
      </span>
    </motion.div>
  );
}

/** Empty state (scene 1) crossfading into the uploaded asset grid (scene 2). */
export function AssetsView({ p }: { p: Progress }) {
  const emptyOpacity = useRampOut(p, 0.33, 0.37);
  const gridOpacity = useTransform(p, [0.37, 0.4, 0.49, 0.52], [0, 1, 1, 0]);

  return (
    <>
      <motion.div
        style={{ opacity: emptyOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
      >
        <div className="h-12 w-12 rounded-2xl border border-dashed border-white/15" />
        <p className="text-sm font-medium text-zinc-300">No clients connected</p>
        <p className="text-xs text-zinc-500">
          Connect a Google Ads account to start managing campaigns.
        </p>
        <div className="mt-4 w-[70%] space-y-2">
          {[1, 0.7, 0.45].map((w) => (
            <div
              key={w}
              className="h-3 rounded bg-white/[0.04]"
              style={{ width: `${w * 100}%` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Asset library · 12 uploaded</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
            Synced to asset group
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Tile key={i} p={p} index={i} />
          ))}
        </div>
      </motion.div>
    </>
  );
}
