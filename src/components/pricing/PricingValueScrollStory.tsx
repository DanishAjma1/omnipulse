"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Building2, Coins, Scale, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * PRICING SCROLL STORY — Philosophy: "Panoramic Horizontal Filmstrip + Live Margin Receipt"
 * Vertical scroll drives a continuous horizontal camera pan (`x: 0% -> -75%`) across four
 * side-by-side economic scale stages, while a docked bottom Unit-Economics Ledger recalculates
 * SaaS seat taxes, middleman markups, and retained agency margin in real time.
 */

interface EconomicPanel {
  stage: string;
  scaleBand: string;
  edition: string;
  headline: string;
  summary: string;
  traditionalCost: string;
  omnipulseCost: string;
  retainedAnnual: string;
  lineItems: Array<{ label: string; legacy: string; byok: string }>;
}

const PANELS: EconomicPanel[] = [
  {
    stage: " LEDGER 01 / 04",
    scaleBand: "1 – 5 Ad Accounts • Solo & Local Launch",
    edition: "Starter Edition",
    headline: "Validate Real Client Campaigns Before Spending a Dollar on Software.",
    summary:
      "Traditional marketing stacks charge $300+/month before you land your first retainer. Starter removes subscription gates entirely—connect your own keys and pay zero platform fee.",
    traditionalCost: "$340 / mo",
    omnipulseCost: "$0 Platform Fee",
    retainedAnnual: "$4,080 / yr kept",
    lineItems: [
      { label: "Base workspace license", legacy: "$99 / mo", byok: "$0 (Free BYOK)" },
      { label: "Landing page builder", legacy: "$147 / mo", byok: "Included" },
      { label: "Client reporting portal", legacy: "$94 / mo", byok: "1 Portal Included" },
    ],
  },
  {
    stage: "LEDGER 02 / 04",
    scaleBand: "5 – 25 Retainers • Growing Agency Team",
    edition: "Agency Pro",
    headline: "Add Media Buyers & Unlimited Client Portals With Zero Seat Tax.",
    summary:
      "Most agency platforms penalize headcount growth with $49–$99 per staff login and per-dashboard surcharges. OmniPulse decouples team size and client count from software billing.",
    traditionalCost: "$1,180 / mo",
    omnipulseCost: "$0 Seat Surcharge",
    retainedAnnual: "$14,160 / yr kept",
    lineItems: [
      { label: "5 Operations Manager seats", legacy: "$395 / mo", byok: "$0 Seat Tax" },
      { label: "20 White-label client portals", legacy: "$490 / mo", byok: "Unlimited" },
      { label: "Multi-account MCC sync", legacy: "$295 / mo", byok: "Direct API Quota" },
    ],
  },
  {
    stage: "LEDGER 03 / 04",
    scaleBand: "High-Volume Outreach & Media • Wholesale Pass-Through",
    edition: "Pure BYOK Math",
    headline: "Pay Infrastructure Providers at Face Value—Never 4x Credit Markups.",
    summary:
      "Bundled SaaS tools buy Resend emails and cloud storage for pennies, then resell them to you inside 'credit packs' at 300%–500% markup. BYOK routes straight to your own provider accounts.",
    traditionalCost: "3.8x Credit Markup",
    omnipulseCost: "1.0x Wholesale",
    retainedAnnual: "100% Margin Kept",
    lineItems: [
      { label: "Outbound email volume", legacy: "$0.004 / credit", byok: "Direct Resend rate" },
      { label: "Ad spend percentage cut", legacy: "1.5% – 3% of media", byok: "0.00% Forever" },
      { label: "Funnel media CDN hosting", legacy: "Tiered bandwidth add-on", byok: "Own Vercel Blob" },
    ],
  },
  {
    stage: "LEDGER 04 / 04",
    scaleBand: "50+ Accounts & Holding Groups • Sovereign Cluster",
    edition: "Enterprise & Self-Hosted",
    headline: "Graduate to Dedicated Infrastructure & Contractual SLAs Only When Ready.",
    summary:
      "When compliance requires single-tenant isolation, multi-MCC clustering, or full self-hosted source deployment on your own cloud, Solutions Engineering scopes a fixed custom agreement.",
    traditionalCost: "Opaque % Media",
    omnipulseCost: "Fixed Annual SLA",
    retainedAnnual: "Predictable CapEx",
    lineItems: [
      { label: "Infrastructure tenancy", legacy: "Shared multi-tenant only", byok: "Dedicated / Self-Hosted" },
      { label: "Uptime & response SLA", legacy: "Best-effort ticket queue", byok: "99.99% • 2-Hr Engineering" },
      { label: "Warehouse & CRM pipelines", legacy: "Paid connector middleware", byok: "Bespoke Direct Sync" },
    ],
  },
];

const RECEIPT_METRICS = [
  { accounts: "3 Accounts", seats: "1 Admin", legacyBill: "$340/mo", omniFee: "$0", saved: "$4,080/yr" },
  { accounts: "18 Accounts", seats: "1 Admin + 5 Mgrs", legacyBill: "$1,180/mo", omniFee: "$0", saved: "$14,160/yr" },
  { accounts: "35 Accounts", seats: "Uncapped BYOK", legacyBill: "$2,240/mo", omniFee: "$0 Markup", saved: "$26,880/yr" },
  { accounts: "75+ Multi-MCC", seats: "Enterprise Org", legacyBill: "% of Ad Spend", omniFee: "Custom Fixed", saved: "Zero % Media Tax" },
];

export function PricingValueScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stageIdx, setStageIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  // Pan horizontally across 4 full-width panels (0% -> -75% of a 400% wide filmstrip)
  const xPercent = useTransform(smooth, [0.04, 0.96], ["0%", "-75%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PANELS.length - 1, Math.max(0, Math.floor(v * PANELS.length)));
    setStageIdx((prev) => (prev === idx ? prev : idx));
  });

  const activeReceipt = RECEIPT_METRICS[stageIdx] ?? RECEIPT_METRICS[0];
  const icons = [Coins, Users, Scale, Building2];

  return (
    <section
      ref={sectionRef}
      aria-label="Horizontal unit economics and scale cost ledger"
      className="relative h-[380vh] border-y border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#0d1016] text-zinc-900 dark:text-zinc-100"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-6">
        {/* Top Editorial Economics Header */}
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <Badge variant="success" dot>
              Panoramic Unit-Economics Filmstrip
            </Badge>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
              How Your Bill Behaves From 1 Client to 75+ Accounts
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {PANELS.map((p, idx) => (
              <span
                key={p.edition}
                className={`rounded-full border px-3 py-1 transition-all ${
                  idx === stageIdx
                    ? "border-emerald-500 bg-emerald-500/15 font-bold text-emerald-700 dark:text-emerald-300"
                    : "border-zinc-300 dark:border-zinc-800 text-zinc-500 hidden sm:inline-block"
                }`}
              >
                0{idx + 1} · {p.edition}
              </span>
            ))}
          </div>
        </div>

        {/* Center: Horizontal Sliding Filmstrip (400% width) */}
        <div className="relative flex-1 flex items-center overflow-hidden my-3">
          <motion.div
            style={{ x: xPercent }}
            className="flex w-[400%] shrink-0 items-stretch"
          >
            {PANELS.map((panel, idx) => {
              const Icon = icons[idx] ?? TrendingUp;
              return (
                <div
                  key={panel.stage}
                  className="w-1/4 shrink-0 px-4 sm:px-8 lg:px-14 flex items-center"
                >
                  <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-3xl border border-zinc-300/90 dark:border-zinc-800 bg-white dark:bg-[#131720] p-6 sm:p-9 shadow-xl lg:grid-cols-12 lg:items-center">
                    {/* Left: Economic Thesis */}
                    <div className="space-y-4 lg:col-span-6">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 font-bold text-indigo-600 dark:text-indigo-300">
                          <Icon className="h-3.5 w-3.5" />
                          {panel.stage.trim()}
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {panel.scaleBand}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug text-zinc-900 dark:text-white">
                        {panel.headline}
                      </h3>

                      <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {panel.summary}
                      </p>

                      {/* Side-by-side Cost Pill Callout */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-3">
                          <p className="font-mono text-[10px] uppercase text-rose-600 dark:text-rose-400">
                            Fragmented SaaS
                          </p>
                          <p className="mt-1 font-mono text-sm sm:text-base font-bold text-rose-600 dark:text-rose-300 line-through">
                            {panel.traditionalCost}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-3">
                          <p className="font-mono text-[10px] uppercase text-emerald-700 dark:text-emerald-300">
                            OmniPulse
                          </p>
                          <p className="mt-1 font-mono text-sm sm:text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                            {panel.omnipulseCost}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3">
                          <p className="font-mono text-[10px] uppercase text-indigo-600 dark:text-indigo-300">
                            Net Impact
                          </p>
                          <p className="mt-1 font-mono text-sm sm:text-base font-extrabold text-indigo-700 dark:text-indigo-200">
                            {panel.retainedAnnual}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Line-by-Line Cost Comparison Receipt */}
                    <div className="lg:col-span-6">
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0b0e14] p-5 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          <span>Cost Line Item</span>
                          <span>Legacy vs. {panel.edition}</span>
                        </div>
                        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
                          {panel.lineItems.map((item) => (
                            <div
                              key={item.label}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3.5"
                            >
                              <span className="font-sans font-medium text-zinc-800 dark:text-zinc-200">
                                {item.label}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-rose-500/80 line-through text-[11px]">
                                  {item.legacy}
                                </span>
                                <ArrowRight className="h-3 w-3 text-zinc-400" />
                                <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-bold text-emerald-700 dark:text-emerald-300">
                                  {item.byok}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Docked Bottom Live Margin Receipt Bar */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-5 py-3.5 font-mono text-xs backdrop-blur-md">
            <div>
              <span className="text-[10px] uppercase text-zinc-500">Roster Scale</span>
              <p className="font-bold text-zinc-900 dark:text-white">{activeReceipt.accounts}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500">Team Footprint</span>
              <p className="font-bold text-zinc-900 dark:text-white">{activeReceipt.seats}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500">Typical Stack Bill</span>
              <p className="font-bold text-rose-500 line-through">{activeReceipt.legacyBill}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500">OmniPulse Markup</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">{activeReceipt.omniFee}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase text-zinc-500">Margin Retained</span>
              <p className="font-extrabold text-indigo-600 dark:text-indigo-300">{activeReceipt.saved}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
