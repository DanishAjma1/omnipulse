"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  Cpu,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductTour } from "@/components/tour/ProductTour";

const CLIENT_LOGOS = [
  { name: "Vanguard Media", metric: "+182% ROAS" },
  { name: "Horizon Scale", metric: "48 Clients" },
  { name: "Nexus Performance", metric: "$4.2M Paced" },
  { name: "Synthetix Labs", metric: "Zero Latency" },
  { name: "Apex Media Group", metric: "SOC-2 Ready" },
  { name: "Pulse Ventures", metric: "Full Automation" },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-cyan-500/10 dark:bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Badge variant="brand" dot>
              OmniPulse 2.0 • Autonomous Multi-Channel Operations
            </Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-5xl mx-auto leading-[1.1] sm:leading-[1.1]"
          >
            Take Absolute Control of Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-300">
              Marketing Operations
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Unify Google Ads MCC orchestration, Meta campaigns, programmatic SEO
            auditing, and white-labeled client reporting into one high-velocity
            intelligence console.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" href="/register">
              Start Free 14-Day Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" href="/services">
              Explore Platform Capabilities
              <ExternalLink className="w-4 h-4 opacity-70" />
            </Button>
          </motion.div>

          {/* Below Fold: Glowing High-Fidelity UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 sm:mt-20 relative max-w-6xl mx-auto"
          >
            {/* Glowing boundary backlight */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 rounded-3xl blur-xl opacity-30 dark:opacity-40 animate-pulse" />

            <div className="relative rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden text-left text-zinc-100">
              {/* App Chrome */}
              <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-zinc-500 hidden sm:inline">
                    console.omnipulse.io/mcc/hierarchy-matrix
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SYNC • 14ms
                  </span>
                  <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                    MCC #918-204-1190
                  </span>
                </div>
              </div>

              {/* Console Dashboard Inner */}
              <div className="p-4 sm:p-6 lg:p-8 bg-zinc-950 space-y-6">
                {/* Metric Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <p className="text-xs font-mono text-zinc-400 uppercase">
                      Spend Managed (MTD)
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white tracking-tight">
                      $1,428,950
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <TrendingUp className="w-3 h-3" /> +24.8% vs last mo
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <p className="text-xs font-mono text-zinc-400 uppercase">
                      Blended Target ROAS
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white tracking-tight">
                      4.82x
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <Sparkles className="w-3 h-3" /> +0.62x above target
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <p className="text-xs font-mono text-zinc-400 uppercase">
                      Active Client Accounts
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white tracking-tight">
                      48 Linked
                    </p>
                    <span className="text-xs text-indigo-400 flex items-center gap-1 mt-1 font-mono">
                      100% Rate-limit safe
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <p className="text-xs font-mono text-zinc-400 uppercase">
                      Campaign Optimizations
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white tracking-tight">
                      1,842 / day
                    </p>
                    <span className="text-xs text-cyan-400 flex items-center gap-1 mt-1 font-mono">
                      Autonomous execution
                    </span>
                  </div>
                </div>

                {/* Simulated Chart & Pacing Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pacing Visualizer */}
                  <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-200">
                          Cross-Network Performance Curve
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Google Search, PMax, Demand Gen & Meta Spend vs. Revenue
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          Revenue
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          Spend
                        </span>
                      </div>
                    </div>

                    {/* Multi-Series Differentiated Daily Performance Chart */}
                    <div className="h-44 w-full relative flex items-end">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 520 150"
                        preserveAspectRatio="none"
                      >
                        {[25, 60, 95, 130].map((y) => (
                          <line
                            key={y}
                            x1="34"
                            x2="508"
                            y1={y}
                            y2={y}
                            stroke="#27272a"
                            strokeDasharray="2 2"
                          />
                        ))}
                        <text x="28" y="28" fill="#71717a" fontSize="9" textAnchor="end">$6.0K</text>
                        <text x="28" y="63" fill="#71717a" fontSize="9" textAnchor="end">$4.0K</text>
                        <text x="28" y="98" fill="#71717a" fontSize="9" textAnchor="end">$2.0K</text>
                        <text x="28" y="133" fill="#71717a" fontSize="9" textAnchor="end">$0</text>

                        {/* Quote Value (Indigo) */}
                        <polyline
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                          points="38,126 66,124 94,84 122,86 150,108 178,24 206,120 234,118 262,126 290,38 318,82 346,120 374,70 402,88 430,88 458,122 482,98 506,42"
                        />
                        {/* Spend (Emerald) */}
                        <polyline
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2.2"
                          strokeLinejoin="round"
                          points="38,112 66,94 94,48 122,54 150,64 178,56 206,82 234,126 262,126 290,66 318,82 346,90 374,90 402,108 430,126 458,124 482,92 506,74"
                        />
                        {/* Cost per Quotable Lead (Rose) */}
                        <polyline
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2.2"
                          strokeLinejoin="round"
                          points="38,66 66,18 94,92 122,95 150,88 178,112 206,36 234,126 262,126 290,108 318,104 346,76 374,114 402,118 430,126 458,126 482,112 506,96"
                        />
                        {/* Cost per Lead (Amber) */}
                        <polyline
                          fill="none"
                          stroke="#facc15"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                          points="38,68 66,108 94,118 122,121 150,114 178,122 206,120 234,126 262,124 290,116 318,121 346,120 374,116 402,121 430,126 458,126 482,120 506,115"
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
                      <span>Nov 01</span>
                      <span>Nov 07</span>
                      <span>Nov 14</span>
                      <span>Nov 21</span>
                      <span>Today (Real-time)</span>
                    </div>
                  </div>

                  {/* Active Engine Health */}
                  <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-300">
                          Account Health & Rules
                        </span>
                        <Zap className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Target CPA Guard</span>
                          <span className="text-emerald-400 font-mono">
                            Enforced ($18.40)
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[85%]" />
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-zinc-400">PMax Asset Hygiene</span>
                          <span className="text-indigo-400 font-mono">
                            Excellent (15/15)
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[100%]" />
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-zinc-400">Rate Limit Pacing</span>
                          <span className="text-cyan-400 font-mono">
                            0.2% Quota used
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full w-[18%]" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                      <span>Zero manual spreadsheets</span>
                      <span className="text-indigo-400 font-mono">Automated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BANNER */}
      <section className="py-12 border-y border-zinc-200 dark:border-white/10 bg-zinc-50/60 dark:bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-8">
            Trusted by top-tier performance agencies & modern growth consultancies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-center"
              >
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {client.name}
                </span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                  {client.metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. STICKY PRODUCT TOUR (scroll-bound) */}
      <ProductTour />

      {/* 3. FEATURES (3-COL GRID) */}
      <AnimatedSection spacing="py-32" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            Core Engine
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Engineered for Autonomous Agency Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Three interconnected layers designed to replace brittle point tools
            with enterprise-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Ads Sync */}
          <BentoCard
            icon={<Cpu className="w-5 h-5" />}
            badge={<Badge variant="brand">Real-Time Sync</Badge>}
            title="1. Multi-Account Ads Sync"
            description="Direct integration with Google Ads MCC and Meta Marketing API. Pulls live and cached metrics without hitting API rate limits or leaky burst buffers."
            footer={
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Full MCC client tree traversal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Asset Groups, RSAs & Listing Groups
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Instant campaign pause / launch controls
                </li>
              </ul>
            }
          >
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
                POST /api/v1/analytics/mcc/sync
              </div>
              <div className="text-zinc-500">
                ↳ 48 child accounts synced (0 errors)
              </div>
              <div className="text-emerald-600 dark:text-emerald-400">
                ✓ PMax, Search, Demand Gen validated
              </div>
            </div>
          </BentoCard>

          {/* Feature 2: Client Reporting */}
          <BentoCard
            icon={<BarChart3 className="w-5 h-5" />}
            badge={<Badge variant="success">White-Labeled</Badge>}
            title="2. Client Reporting Matrix"
            description="Generate customized, white-labeled reporting portals for your clients with granular role-based permissions and zero data leakage."
            footer={
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Custom domain & CNAME mapping
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Automated PDF & executive summaries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Client hierarchy drill-down views
                </li>
              </ul>
            }
          >
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <div className="flex justify-between items-center text-zinc-500">
                <span>Client Access Portal</span>
                <span className="text-emerald-500">Active</span>
              </div>
              <div className="text-zinc-900 dark:text-zinc-100 font-bold">
                portal.clientagency.com
              </div>
              <div className="text-xs text-zinc-500">
                Encrypted token authentication
              </div>
            </div>
          </BentoCard>

          {/* Feature 3: AI SEO & Outreach */}
          <BentoCard
            icon={<Globe className="w-5 h-5" />}
            badge={<Badge variant="neutral">Programmatic</Badge>}
            title="3. AI SEO & Outreach"
            description="Combine programmatic keyword clustering, Core Web Vitals telemetry, and personalized cold email outreach funnels in a single pipeline."
            footer={
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Asynchronous SEO audit worker queues
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Multi-turn outreach sequencing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Conversion-ready dynamic landing pages
                </li>
              </ul>
            }
          >
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <div className="text-cyan-600 dark:text-cyan-400 font-semibold">
                SEO Audit Score: 98/100
              </div>
              <div className="text-zinc-500">
                ↳ 142 High-intent keyword targets
              </div>
              <div className="text-indigo-600 dark:text-indigo-400">
                Outreach Open Rate: 68.4%
              </div>
            </div>
          </BentoCard>
        </div>
      </AnimatedSection>

      {/* 4. DEEP DIVE (ZIG-ZAG LAYOUT) */}
      <AnimatedSection spacing="py-24" className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Row 1: CRM & Ads Manipulation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="brand">Granular Controls</Badge>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Live Campaign & Ad Group Manipulation from One Surface
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Never log into five different Google Ads accounts again. Create
                Responsive Search Ads, set asset groups for Performance Max,
                adjust default CPC bids, and apply automated safety ceilings
                without API friction.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-1">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                      Strict Type Safety
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Form attributes and child entities are conditionally
                      routed to official Google Ads services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-1">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                      Instant Kill Switches
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Pause bleeding ad sets or adjust daily budget micros with
                      one click across all linked accounts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" href="/services">
                  View All Services & Formats
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Visual Card Mockup: Google Ads Ad Groups Console Table */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#171717] border border-zinc-800 shadow-2xl space-y-3 text-zinc-100">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a73e8] text-white font-bold text-sm">
                    +
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white">Ad groups</span>
                    <span className="ml-2 text-[11px] font-mono px-2 py-0.5 rounded bg-[#202124] border border-zinc-700 text-zinc-300">
                      🔍 UM - INTERNATIONAL
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Oct 13 – Nov 11, 2026
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#202124]">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="border-b border-zinc-700/80 bg-[#1b1b1f] text-zinc-300">
                    <tr>
                      <th className="py-2.5 px-3">Ad group</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2">Type</th>
                      <th className="py-2.5 px-2 text-right">Impr.</th>
                      <th className="py-2.5 px-2 text-right">CTR</th>
                      <th className="py-2.5 px-2 text-right">Cost</th>
                      <th className="py-2.5 px-3 text-right">Conv. rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-200">
                    <tr>
                      <td className="py-2.5 px-3 text-blue-400 font-semibold">● UMRAH - DELUXE</td>
                      <td className="py-2.5 px-2 text-emerald-400">Eligible</td>
                      <td className="py-2.5 px-2 text-zinc-400">PMax Asset</td>
                      <td className="py-2.5 px-2 text-right">238,600</td>
                      <td className="py-2.5 px-2 text-right">7.85%</td>
                      <td className="py-2.5 px-2 text-right">PKR 96,400</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">9.42%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-blue-400 font-semibold">● BAKU</td>
                      <td className="py-2.5 px-2 text-rose-400 underline decoration-dotted">
                        Not eligible (Paused)
                      </td>
                      <td className="py-2.5 px-2 text-zinc-400">Standard</td>
                      <td className="py-2.5 px-2 text-right">19,410</td>
                      <td className="py-2.5 px-2 text-right">4.18%</td>
                      <td className="py-2.5 px-2 text-right">PKR 8,120</td>
                      <td className="py-2.5 px-3 text-right">5.20%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-blue-400 font-semibold">● all in 1</td>
                      <td className="py-2.5 px-2 text-rose-400 underline decoration-dotted">
                        Not eligible (Paused)
                      </td>
                      <td className="py-2.5 px-2 text-zinc-400">Standard</td>
                      <td className="py-2.5 px-2 text-right">11,280</td>
                      <td className="py-2.5 px-2 text-right">3.91%</td>
                      <td className="py-2.5 px-2 text-right">PKR 4,650</td>
                      <td className="py-2.5 px-3 text-right">4.65%</td>
                    </tr>
                    <tr className="bg-[#171717] font-bold text-white">
                      <td className="py-2.5 px-3" colSpan={3}>⌄ Total: Campaign</td>
                      <td className="py-2.5 px-2 text-right">269,290</td>
                      <td className="py-2.5 px-2 text-right">7.42%</td>
                      <td className="py-2.5 px-2 text-right">PKR 109,170</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">8.91%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Row 2: White-labeled Analytics Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Card Mockup (Left) - White Google Ads Executive Report */}
            <div className="order-2 lg:order-1 p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-400 shadow-xl space-y-4 text-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900">
                    Google Ads Report
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-600">
                    Value &amp; Spend ▾
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 border border-slate-200 rounded px-2 py-0.5">
                  📅 Monthly · Nov 2025
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-left text-xs">
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
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1" />
                  <span className="font-extrabold text-slate-900">$95.01</span>
                  <p className="text-[10px] text-slate-500">Cost / Lead</p>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-1" />
                  <span className="font-extrabold text-slate-900">$290.02</span>
                  <p className="text-[10px] text-slate-500">Cost / Quotable</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] font-semibold text-slate-500">Impression Share</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">80%</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    ↑ 50%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] font-semibold text-slate-500">Click-Through Rate</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">5.72%</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    ↑ 33%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] font-semibold text-slate-500">Cost Per Click</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">$1.37</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                    ↓ 8%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <p className="text-[10px] font-semibold text-slate-500">CPM</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">$7.56</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                    ↑ 22%
                  </span>
                </div>
              </div>
            </div>

            {/* Text & Specs (Right) */}
            <div className="order-1 lg:order-2 space-y-6">
              <Badge variant="success">Client Retention</Badge>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                White-Labeled Client Portals with Custom Domain Mapping
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Give your clients transparent, beautifully formatted dashboards
                under your own domain. Control exactly which metrics and
                campaigns they see while automating weekly progress digests.
              </p>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Automatic SSL provisioning for custom domains
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Granular role permissions: Admin, Manager, Viewer
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  One-click executive PDF report export
                </li>
              </ul>
              <div className="pt-2">
                <Button variant="primary" href="/register">
                  Deploy Your First Portal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. CTA SECTION */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-zinc-950 text-white">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="brand" className="mb-4">
            Get Started in Minutes
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Ready to Take Absolute Control of Your Marketing Operations?
          </h2>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Join hundreds of high-growth agencies using OmniPulse to run unified
            campaigns with zero API headaches and zero spreadsheets.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/register"
              className="text-base px-8 py-4"
            >
              Register Now — 14 Days Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/pricing"
              className="text-base px-8 py-4"
            >
              Compare Plans
            </Button>
          </div>
          <p className="mt-4 text-xs text-zinc-500 font-mono">
            No credit card required • Instant Google OAuth • Cancel anytime
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
