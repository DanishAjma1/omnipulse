"use client";

import { motion, useTransform } from "framer-motion";
import { useCounterText, useRamp, type Progress } from "./timeline";

const ROWS = [
  { url: "/pricing", ok: true },
  { url: "/services/google-ads", ok: true },
  { url: "/blog/pmax-guide", ok: false },
  { url: "/contact", ok: true },
];

/** SEO audit + ROAS chart (scene 3). Scanner, counter and chart are scroll-bound. */
export function SeoView({ p }: { p: Progress }) {
  const opacity = useRamp(p, 0.5, 0.54);
  const scannerLeft = useTransform(p, [0.52, 0.68], ["0%", "100%"]);
  const scannerOpacity = useTransform(p, [0.52, 0.54, 0.66, 0.69], [0, 1, 1, 0]);
  const score = useCounterText(p, 0.54, 0.68, 98);
  const roas = useCounterText(p, 0.56, 0.7, 4.8, 1);
  const draw = useTransform(p, [0.56, 0.7], [0, 1]);
  const area = useTransform(p, [0.6, 0.72], [0, 0.35]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 p-6">
      <div className="grid h-full grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Site health score
          </p>
          <p className="text-6xl font-extrabold tracking-tight text-white">
            <motion.span>{score}</motion.span>
            <span className="text-2xl text-zinc-500">/100</span>
          </p>
          <div className="mt-2 space-y-2">
            {ROWS.map((r) => (
              <div
                key={r.url}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-[11px]"
              >
                <span className="font-mono text-zinc-300">{r.url}</span>
                <span className={r.ok ? "text-emerald-400" : "text-amber-400"}>
                  {r.ok ? "Passed" : "2 issues"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Blended ROAS
            </p>
            <p className="text-2xl font-bold text-white">
              <motion.span>{roas}</motion.span>x
            </p>
          </div>
          <svg viewBox="0 0 360 160" className="mt-3 h-full w-full" preserveAspectRatio="none">
            {[40, 80, 120].map((y) => (
              <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
            ))}
            <motion.path
              d="M10 140 C60 132 90 112 130 100 S200 72 240 56 S300 26 350 12 L350 160 L10 160 Z"
              fill="#6366f1"
              style={{ opacity: area }}
            />
            <motion.path
              d="M10 140 C60 132 90 112 130 100 S200 72 240 56 S300 26 350 12"
              fill="none"
              stroke="#818cf8"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />
          </svg>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ left: scannerLeft, opacity: scannerOpacity }}
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.55)]"
      />
    </motion.div>
  );
}
