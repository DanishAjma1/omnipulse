"use client";

import { motion, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRamp, type Progress } from "./timeline";

const FIELDS = [
  { label: "Campaign name", value: "Summer Launch — PMax" },
  { label: "Daily budget", value: "$150.00" },
  { label: "Final URL", value: "https://acme-store.com" },
  { label: "Bidding strategy", value: "Maximize conversion value" },
  { label: "Business name", value: "Acme Store" },
];

function Field({
  p,
  index,
  label,
  value,
}: {
  p: Progress;
  index: number;
  label: string;
  value: string;
}) {
  const start = 0.345 + index * 0.02;
  const opacity = useRamp(p, start, start + 0.025);
  const y = useTransform(p, [start, start + 0.025], [10, 0]);
  return (
    <motion.div style={{ opacity, y }} className="space-y-1">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-200">
        {value}
      </div>
    </motion.div>
  );
}

/** Nested sidebar: width/opacity expand after the "Create Performance Max" click. */
export function BuilderPanel({ p }: { p: Progress }) {
  const width = useTransform(p, [0.31, 0.38, 0.5, 0.55], [0, 300, 300, 0]);
  const opacity = useTransform(p, [0.31, 0.36, 0.5, 0.53], [0, 1, 1, 0]);

  return (
    <motion.aside
      style={{ width, opacity }}
      className="shrink-0 overflow-hidden border-r border-white/5 bg-[#0e0e11]"
    >
      <div className="w-[300px] space-y-4 p-5">
        <div>
          <p className="text-sm font-semibold text-white">
            New Performance Max campaign
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-indigo-300">
            <Sparkles className="h-3 w-3" /> Auto-filled from client profile
          </p>
        </div>
        {FIELDS.map((f, i) => (
          <Field key={f.label} p={p} index={i} {...f} />
        ))}
      </div>
    </motion.aside>
  );
}
