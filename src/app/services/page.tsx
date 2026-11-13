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
              Engine Architecture
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Everything You Need to Scale,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Unified.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Eliminate fragmented tools. OmniPulse bridges advertising APIs,
            white-label client reporting, programmatic SEO crawling, and outreach
            funnels into a single performant operating system.
          </motion.p>
        </div>
      </section>

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
            {/* Interactive Mock Chart & Metric switcher */}
            <div className="mt-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveMetricTab("pmax")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "pmax"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Performance Max
                  </button>
                  <button
                    onClick={() => setActiveMetricTab("rsa")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "rsa"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Search (RSA)
                  </button>
                  <button
                    onClick={() => setActiveMetricTab("demand")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeMetricTab === "demand"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Demand Gen
                  </button>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> ROAS 4.9x
                </span>
              </div>

              {/* Mock Chart Area */}
              <div className="h-36 w-full relative flex items-end pt-2">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="pmaxGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={
                      activeMetricTab === "pmax"
                        ? "M0,100 C60,80 120,40 180,60 C240,80 300,20 400,10 L400,120 L0,120 Z"
                        : activeMetricTab === "rsa"
                        ? "M0,90 C80,60 160,50 240,40 C320,30 360,20 400,15 L400,120 L0,120 Z"
                        : "M0,110 C70,100 140,80 210,50 C280,30 350,40 400,25 L400,120 L0,120 Z"
                    }
                    fill="url(#pmaxGradient)"
                    className="transition-all duration-500"
                  />
                  <path
                    d={
                      activeMetricTab === "pmax"
                        ? "M0,100 C60,80 120,40 180,60 C240,80 300,20 400,10"
                        : activeMetricTab === "rsa"
                        ? "M0,90 C80,60 160,50 240,40 C320,30 360,20 400,15"
                        : "M0,110 C70,100 140,80 210,50 C280,30 350,40 400,25"
                    }
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-zinc-500">Impressions</span>
                  <p className="font-bold text-white">418,209</p>
                </div>
                <div>
                  <span className="text-zinc-500">Conv Rate</span>
                  <p className="font-bold text-emerald-400">7.82%</p>
                </div>
                <div>
                  <span className="text-zinc-500">Target CPA</span>
                  <p className="font-bold text-indigo-400">$16.40</p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* FEATURE 2: Client Portal Management - Span 5 */}
          <BentoCard
            className="lg:col-span-5 flex flex-col justify-between"
            icon={<BarChart2 className="w-5 h-5" />}
            badge={<Badge variant="success">White-Label</Badge>}
            title="Client Portal Management"
            description="Empower your clients with their own secure branded analytics console. Zero agency backend exposure."
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
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-500">
                <span>PORTAL CONFIGURATION</span>
                <span className="text-emerald-500">ACTIVE</span>
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-700 dark:text-zinc-300">
                  insights.apexmarketing.com
                </span>
                <Badge variant="neutral" className="text-[10px]">
                  CNAME
                </Badge>
              </div>
              <div className="text-[11px] text-zinc-500 flex items-center justify-between">
                <span>Permissions: Executive View</span>
                <span className="text-indigo-400">No Raw API Keys</span>
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
            badge={<Badge variant="brand">Growth Automation</Badge>}
            title="Outreach & Dynamic Funnels"
            description="Programmatic lead enrichment coupled with AI personalized outreach and high-converting dynamic landing page generation."
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
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" href="/pricing">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
