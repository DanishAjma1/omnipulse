"use client";

import { motion, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { BuilderPanel } from "./BuilderPanel";
import { AssetsView } from "./AssetsView";
import { SeoView } from "./SeoView";
import { Cursor } from "./Cursor";
import { DASH_H, DASH_W, useRamp, useRampOut, type Progress } from "./timeline";

function Header({ p }: { p: Progress }) {
  const campaignsTitle = useRampOut(p, 0.49, 0.51);
  const seoTitle = useRamp(p, 0.49, 0.51);
  const btnOpacity = useTransform(p, [0.12, 0.2, 0.5, 0.53], [0, 1, 1, 0]);
  const btnScale = useTransform(p, [0.31, 0.32, 0.33], [1, 0.94, 1]);
  const btnBg = useTransform(
    p,
    [0.31, 0.34],
    ["rgb(79,70,229)", "rgb(16,185,129)"]
  );
  const crawl = useTransform(p, [0.5, 0.53, 0.7, 0.72], [0, 1, 1, 0]);

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-6">
      <div className="relative h-5 w-48">
        <motion.p
          style={{ opacity: campaignsTitle }}
          className="absolute inset-0 text-sm font-semibold text-white"
        >
          Acme Store · Campaigns
        </motion.p>
        <motion.p
          style={{ opacity: seoTitle }}
          className="absolute inset-0 text-sm font-semibold text-white"
        >
          Acme Store · SEO Auditing
        </motion.p>
      </div>

      <div className="relative flex items-center">
        <motion.span
          style={{ opacity: crawl }}
          className="absolute right-0 whitespace-nowrap rounded-full bg-cyan-500/15 px-3 py-1 text-[11px] text-cyan-300"
        >
          ● Crawler running
        </motion.span>
        <motion.button
          tabIndex={-1}
          style={{ opacity: btnOpacity, scale: btnScale, backgroundColor: btnBg }}
          className="flex h-9 w-[210px] items-center justify-center gap-2 rounded-lg text-xs font-semibold text-white shadow-lg shadow-indigo-900/40"
        >
          <Plus className="h-3.5 w-3.5" /> Create Performance Max
        </motion.button>
      </div>
    </header>
  );
}

/** Fixed-size (DASH_W x DASH_H) dark console. Everything inside is driven by `p`. */
export function DashboardMock({ p }: { p: Progress }) {
  return (
    <div
      className="relative flex overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] text-zinc-100 shadow-2xl"
      style={{ width: DASH_W, height: DASH_H }}
    >
      <DashboardSidebar p={p} />
      <BuilderPanel p={p} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header p={p} />
        <div className="relative min-w-0 flex-1">
          <AssetsView p={p} />
          <SeoView p={p} />
        </div>
      </div>
      <Cursor p={p} />
    </div>
  );
}
