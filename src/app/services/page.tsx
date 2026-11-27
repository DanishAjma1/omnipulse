"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  BarChart2,
  Globe2,
  Send,
  CheckCircle2,
  ArrowRight,
  Database,
  Share2,
  Workflow,
  Search,
  Zap,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BentoCard } from "@/components/ui/BentoCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NestedScrollytelling } from "@/components/scrolly/NestedScrollytelling";
import { FunnelStudioShowcaseStory } from "@/components/services/FunnelStudioShowcaseStory";

export default function ServicesPage() {
  const [activeMetricTab, setActiveMetricTab] = useState<"pmax" | "rsa" | "demand">("pmax");

  return (
    <MarketingLayout>
      {/* 1. SERVICES HERO */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Badge variant="brand" dot>
              White-Labeling • Local Lead Automation • Enterprise Telemetry
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Marketing Infrastructure Engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Agencies, Local Growth &amp; Global Brands
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Launch white-label client portals to scale your agency, run
            hands-off local ads for automated lead generation, and guarantee
            absolute data ownership with real-time CRM syncing and deep
            multi-channel analytics.
          </motion.p>
        </div>
      </section>

      {/* 1a. TARGETED PERSONA WORKFLOWS */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Badge variant="success">For Marketing Agencies</Badge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              White-Labeling &amp; Client Portal Scaling
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Give every client a custom-domain client portal with scoped sub-account visibility, automated PDF reporting, and centralized Google Ads MCC management as your retainer roster scales.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Badge variant="brand">For Local Businesses</Badge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Hands-Off Local Ads &amp; Lead Generation
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Launch geo-targeted Search and Performance Max campaigns with automated lead generation funnels, daily spend guardrails, and turnkey call and form capture—zero ad manager complexity required.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Badge variant="neutral">For Global Clients &amp; Brands</Badge>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Absolute Data Ownership &amp; CRM Syncing
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Retain 100% ownership of your first-party ad warehouse, developer tokens encrypted via AES-256-GCM, bidirectional HubSpot/CRM syncing, and deep 3-tier attribution analytics.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 1b. STICKY NESTED SCROLLYTELLING */}
      <NestedScrollytelling />

      {/* 2. BENTO GRID (MASONRY / BENTO LAYOUT FOR 4 FEATURES) */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FEATURE 1: Google Ads Engine (w/ Mock Chart) - Span 12 or 7 */}
          <BentoCard
            className="lg:col-span-7 flex flex-col justify-between"
            icon={<Cpu className="w-5 h-5" />}
            badge={<Badge variant="brand">Core Infrastructure</Badge>}
            title="Google Ads Engine & MCC Controller"
            description="Autonomous synchronization with Google Ads MCC. Manages Performance Max brand guidelines, Responsive Search Ads (RSA), and standard shopping partitions with zero field mask errors."
            footer={
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" /> Google Ads API v18/v25
                </span>
                <span>Sub-millisecond query cache</span>
                <span>Automatic Token Refresh</span>
              </div>
            }
          >
            {/* Interactive Multi-Series Chart & Google Ads Table */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#171717] border border-zinc-800 text-zinc-100 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveMetricTab("pmax")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "pmax"
                        ? "bg-[#1a73e8] text-white font-semibold"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Performance Max
                  </button>
                  <button
                    onClick={() => setActiveMetricTab("rsa")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "rsa"
                        ? "bg-[#1a73e8] text-white font-semibold"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Search (RSA)
                  </button>
                  <button
                    onClick={() => setActiveMetricTab("demand")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "demand"
                        ? "bg-[#1a73e8] text-white font-semibold"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Demand Gen
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Quote Val
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Spend
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Cost/Lead
                  </span>
                </div>
              </div>

              {/* Heavy Multi-Series Chart with Daily Variance */}
              <div className="h-40 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 520 140"
                  preserveAspectRatio="none"
                >
                  {[25, 55, 85, 115].map((y) => (
                    <line
                      key={y}
                      x1="32"
                      x2="495"
                      y1={y}
                      y2={y}
                      stroke="#2d2e32"
                      strokeDasharray="2 2"
                    />
                  ))}
                  <text x="26" y="28" fill="#9aa0a6" fontSize="9" textAnchor="end">$6K</text>
                  <text x="26" y="58" fill="#9aa0a6" fontSize="9" textAnchor="end">$4K</text>
                  <text x="26" y="88" fill="#9aa0a6" fontSize="9" textAnchor="end">$2K</text>
                  <text x="26" y="118" fill="#9aa0a6" fontSize="9" textAnchor="end">$0</text>

                  {/* Series 1: Quote Value (Blue) */}
                  <polyline
                    fill="none"
                    stroke="#4285f4"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    points={
                      activeMetricTab === "pmax"
                        ? "36,112 62,108 88,74 114,76 140,94 166,22 192,108 218,105 244,112 270,34 296,72 322,106 348,62 374,78 400,78 426,108 452,92 488,40"
                        : activeMetricTab === "rsa"
                        ? "36,96 62,64 88,82 114,48 140,72 166,54 192,88 218,42 244,68 270,52 296,30 322,64 348,46 374,58 400,34 426,52 452,38 488,28"
                        : "36,108 62,92 88,86 114,62 140,78 166,44 192,66 218,84 244,50 270,68 296,42 322,58 348,74 374,48 400,62 426,44 452,54 488,36"
                    }
                  />
                  {/* Series 2: Total Spend (Emerald) */}
                  <polyline
                    fill="none"
                    stroke="#34a853"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    points={
                      activeMetricTab === "pmax"
                        ? "36,98 62,82 88,42 114,48 140,56 166,49 192,72 218,112 244,112 270,58 296,72 322,80 348,80 374,95 400,112 426,110 452,84 488,68"
                        : activeMetricTab === "rsa"
                        ? "36,104 62,90 88,96 114,76 140,84 166,78 192,94 218,70 244,82 270,74 296,62 322,80 348,72 374,78 400,66 426,74 452,68 488,60"
                        : "36,112 62,104 88,98 114,88 140,94 166,76 192,84 218,92 244,78 270,86 296,72 322,80 348,88 374,74 400,82 426,72 452,76 488,68"
                    }
                  />
                  {/* Series 3: Cost per Quotable Lead (Rose) */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    points={
                      activeMetricTab === "pmax"
                        ? "36,58 62,16 88,82 114,84 140,78 166,96 192,32 218,112 244,112 270,95 296,92 322,68 348,100 374,104 400,112 426,112 452,102 488,88"
                        : activeMetricTab === "rsa"
                        ? "36,72 62,88 88,64 114,92 140,78 166,96 192,68 218,94 244,86 270,92 296,98 322,82 348,94 374,88 400,98 426,90 452,96 488,102"
                        : "36,68 62,74 88,58 114,82 140,66 166,88 192,74 218,62 244,86 270,78 296,90 322,76 348,68 374,88 400,78 426,92 452,84 488,94"
                    }
                  />
                  {/* Series 4: Cost per Lead (Amber) */}
                  <polyline
                    fill="none"
                    stroke="#fbbc04"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    points="36,60 62,94 88,102 114,105 140,98 166,106 192,105 218,112 244,110 270,103 296,107 322,106 348,103 374,107 400,112 426,112 452,108 488,104"
                  />
                </svg>
              </div>

              {/* Google Ads Console Style Mini Table */}
              <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-[#1f2024]">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="border-b border-zinc-800 bg-[#171717] text-zinc-400">
                    <tr>
                      <th className="py-2 px-3">Ad group</th>
                      <th className="py-2 px-2">Status</th>
                      <th className="py-2 px-2">Type</th>
                      <th className="py-2 px-2 text-right">Impr.</th>
                      <th className="py-2 px-2 text-right">CTR</th>
                      <th className="py-2 px-2 text-right">Cost</th>
                      <th className="py-2 px-3 text-right">Conv. rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-medium">● UM - INTL PMAX</td>
                      <td className="py-2 px-2 text-emerald-400">Eligible</td>
                      <td className="py-2 px-2 text-zinc-400">PMax Asset</td>
                      <td className="py-2 px-2 text-right">238,600</td>
                      <td className="py-2 px-2 text-right">7.85%</td>
                      <td className="py-2 px-2 text-right">$14,280</td>
                      <td className="py-2 px-3 text-right text-emerald-400">9.42%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-medium">● BAKU PACKAGES</td>
                      <td className="py-2 px-2 text-rose-400 underline decoration-dotted">Paused</td>
                      <td className="py-2 px-2 text-zinc-400">Standard</td>
                      <td className="py-2 px-2 text-right">148,920</td>
                      <td className="py-2 px-2 text-right">6.42%</td>
                      <td className="py-2 px-2 text-right">$8,410</td>
                      <td className="py-2 px-3 text-right text-emerald-400">8.14%</td>
                    </tr>
                    <tr className="bg-[#171717] font-bold text-white">
                      <td className="py-2 px-3" colSpan={3}>Total: Campaign (Active &amp; Paused)</td>
                      <td className="py-2 px-2 text-right">387,520</td>
                      <td className="py-2 px-2 text-right">7.30%</td>
                      <td className="py-2 px-2 text-right">$22,690</td>
                      <td className="py-2 px-3 text-right text-emerald-400">8.93%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </BentoCard>

          {/* FEATURE 2: Client Portal Management - Span 5 */}
          <BentoCard
            className="lg:col-span-5 flex flex-col justify-between"
            icon={<BarChart2 className="w-5 h-5" />}
            badge={<Badge variant="success">White-Label Agency Portals</Badge>}
            title="White-Label Client Portals & Scaling"
            description="Scale your marketing agency with white-labeled client portals served under your custom CNAME domain, backed by isolated tenant access and zero backend exposure."
            footer={
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Custom CNAME + SSL automated setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Read-only client view tokens
                </li>
              </ul>
            }
          >
            <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-amber-400 text-slate-900 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-xs font-extrabold text-slate-900">Google Ads Report</span>
                  <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">
                    Value &amp; Spend ▾
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">Monthly · Nov 2025</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 mr-1" />
                  <span className="font-extrabold text-slate-900">$19.26K</span>
                  <p className="text-[10px] text-slate-500">Quote Value</p>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                  <span className="font-extrabold text-slate-900">$27.55K</span>
                  <p className="text-[10px] text-slate-500">Total Spend</p>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-1" />
                  <span className="font-extrabold text-slate-900">$95.01</span>
                  <p className="text-[10px] text-slate-500">Cost / Lead</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                  <p className="text-[10px] font-semibold text-slate-500">Impr. Share</p>
                  <p className="text-sm font-extrabold text-slate-900">80%</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">↑ 50%</span>
                </div>
                <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                  <p className="text-[10px] font-semibold text-slate-500">CTR</p>
                  <p className="text-sm font-extrabold text-slate-900">5.72%</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">↑ 33%</span>
                </div>
                <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                  <p className="text-[10px] font-semibold text-slate-500">Avg CPC</p>
                  <p className="text-sm font-extrabold text-slate-900">$1.37</p>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1 rounded">↓ 8%</span>
                </div>
                <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                  <p className="text-[10px] font-semibold text-slate-500">CPM</p>
                  <p className="text-sm font-extrabold text-slate-900">$7.56</p>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1 rounded">↑ 22%</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* FEATURE 3: SEO Auditing Hub - Span 5 */}
          <BentoCard
            className="lg:col-span-5 flex flex-col justify-between"
            icon={<Globe2 className="w-5 h-5" />}
            badge={<Badge variant="neutral">Automated</Badge>}
            title="SEO Auditing Hub"
            description="Continuous asynchronous crawlers monitor Core Web Vitals, SERP changes, and competitor backlink shifts."
            footer={
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Asynchronous worker task queue
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Lighthouse & Schema markup validation
                </li>
              </ul>
            }
          >
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">HEALTH AUDIT</span>
                <span className="text-emerald-500 font-bold">SCORE: 96/100</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">LCP (Largest Contentful Paint)</span>
                  <span className="font-mono text-emerald-500">1.1s (Good)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">CLS (Cumulative Layout Shift)</span>
                  <span className="font-mono text-emerald-500">0.01 (Good)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Indexed Keywords</span>
                  <span className="font-mono text-indigo-400">2,410 tracked</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* FEATURE 4: Outreach & Funnels - Span 7 */}
          <BentoCard
            className="lg:col-span-7 flex flex-col justify-between"
            icon={<Send className="w-5 h-5" />}
            badge={<Badge variant="brand">Automated Lead Generation</Badge>}
            title="Hands-Off Local Ads, Outreach & CRM Funnels"
            description="Combine automated lead generation funnels and hands-off local ad targeting with Resend cold outreach bursts and instant bidirectional CRM syncing."
            footer={
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" /> DKIM / SPF / DMARC verified
                </span>
                <span>Webhooks & CRM Ingestion</span>
              </div>
            }
          >
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-500">
                <span>ACTIVE SEQUENCE: B2B E-COMMERCE ACCELERATOR</span>
                <span className="text-indigo-400">Step 3 of 4</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <p className="font-semibold text-zinc-900 dark:text-white mb-1">
                  Subject: Quick question about your Google Ads ROAS pMax
                </p>
                <p className="text-zinc-500 text-[11px] line-clamp-2">
                  &ldquo;Hi Sarah, noticed your team launched new retail campaigns. Our audit surfaced 3 high-impact brand guideline asset opportunities...&rdquo;
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <span className="text-zinc-500">Sent</span>
                  <p className="font-bold text-zinc-900 dark:text-white">1,420</p>
                </div>
                <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <span className="text-zinc-500">Open Rate</span>
                  <p className="font-bold text-emerald-500">71.2%</p>
                </div>
                <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <span className="text-zinc-500">Replies</span>
                  <p className="font-bold text-indigo-400">18.6%</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </AnimatedSection>

      {/* 2b. 360VH SCROLL-STORY FUNNEL STUDIO SHOWCASE */}
      <FunnelStudioShowcaseStory />

      {/* 3. INTEGRATIONS (VISUAL NODE-BASED ECOSYSTEM DIAGRAM) */}
      <AnimatedSection
        id="integrations"
        spacing="py-32"
        className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#0c0c0e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="brand" className="mb-3">
              Ecosystem Topology
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Visual Node-Based Ecosystem
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              OmniPulse Core acts as the centralized coordinator, brokering
              secure traffic between ad networks, CRMs, web crawlers, and client
              warehouses.
            </p>
          </div>

          {/* Node Diagram Container */}
          <div className="relative max-w-5xl mx-auto p-6 sm:p-12 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Top Row: External Source Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12 sm:mb-16">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:border-indigo-500/50 transition-colors">
                  <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 mb-2">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Google Ads MCC
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Developer Token • OAuth 2.0
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                    Bidirectional Sync
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:border-cyan-500/50 transition-colors">
                  <div className="inline-flex p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 mb-2">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Meta Marketing API
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Graph API • Webhooks
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                    Campaign Pacing
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:border-purple-500/50 transition-colors">
                  <div className="inline-flex p-2.5 rounded-xl bg-purple-500/10 text-purple-500 mb-2">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    CRM & HubSpot Sync
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Bidirectional Pipelines
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
                    Lead Attribution
                  </span>
                </div>
              </div>

              {/* Connecting Lines / Visual SVG */}
              <div className="hidden sm:block w-full h-12 relative -my-4 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line
                    x1="18%"
                    y1="0"
                    x2="50%"
                    y2="100%"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-40 animate-pulse"
                  />
                  <line
                    x1="50%"
                    y1="0"
                    x2="50%"
                    y2="100%"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-40 animate-pulse"
                  />
                  <line
                    x1="82%"
                    y1="0"
                    x2="50%"
                    y2="100%"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-40 animate-pulse"
                  />
                </svg>
              </div>

              {/* Central Engine Node */}
              <div className="relative my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-zinc-900 to-indigo-900/60 border-2 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.25)] text-center max-w-md w-full">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white mb-3 shadow-lg shadow-indigo-600/40">
                  <Zap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  OmniPulse Core Engine
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  High-Throughput Dispatcher & Rate-Limit Controller
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-emerald-400 border border-emerald-500/30">
                    ● 14ms Latency
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Zero Burst Collisions
                  </span>
                </div>
              </div>

              {/* Lower Connecting Lines */}
              <div className="hidden sm:block w-full h-12 relative -my-4 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line
                    x1="50%"
                    y1="0"
                    x2="25%"
                    y2="100%"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-40"
                  />
                  <line
                    x1="50%"
                    y1="0"
                    x2="75%"
                    y2="100%"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-40"
                  />
                </svg>
              </div>

              {/* Bottom Row: Consumer Output Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-12 sm:mt-16">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:border-indigo-500/50 transition-colors">
                  <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 mb-2">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Web Crawlers & Headless SEO
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Puppeteer & Chromium Async Queue
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:border-emerald-500/50 transition-colors">
                  <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 mb-2">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    White-Label Portals & Resend SMTP
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Client Access Tokens • Dynamic Digests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-zinc-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Connect Your Stack in Under 5 Minutes
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            No complex infrastructure deployments. Connect your Google Ads MCC
            and launch your first client portal today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="primary" size="lg" href="/register">
              Launch Free Workspace
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" href="/pricing">
              Compare Editions
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
