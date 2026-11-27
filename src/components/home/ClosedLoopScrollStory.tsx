"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe2,
  Layers,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface LoopStage {
  tag: string;
  replaces: string;
  title: string;
  body: string;
  metrics: Array<{ label: string; value: string }>;
}

const STAGES: LoopStage[] = [
  {
    tag: "STAGE 01 // PROOF-FIRST OUTREACH",
    replaces: "Replaces Apollo.io + Standalone SEO Crawlers",
    title: "Win Replies with Live Technical SEO Audits—Not Generic Spam",
    body: "Before sending a single cold email, crawl the prospect's domain with our Worker-Thread SEO Engine, generate their health score and XML sitemap, and dispatch personalized Resend sequences verified via Svix webhooks.",
    metrics: [
      { label: "Avg Open Rate", value: "68.4%" },
      { label: "Crawl Concurrency", value: "Worker Pool" },
      { label: "Burst Safety", value: "p-limit(2)" },
    ],
  },
  {
    tag: "STAGE 02 // SCROLL-STORY CONVERSION",
    replaces: "Replaces ClickFunnels + Unbounce",
    title: "Convert Clicks on 400vh+ Scroll-Story Funnels Hosted on Vercel Blob",
    body: "Deploy Obsidian Command, Swiss Daylight Studio, or Velocity Matrix HUD templates in seconds—complete with distinct navbars, 12 equal-spaced removable chapters, sandboxed live editing, and zero AI wait time.",
    metrics: [
      { label: "Scroll Depth", value: "400vh+" },
      { label: "Removable Acts", value: "12 Sections" },
      { label: "Media CDN", value: "Vercel Blob" },
    ],
  },
  {
    tag: "STAGE 03 // 3-TIER AD EXECUTION",
    replaces: "Replaces Fragmented Ad Tabs + Manual Spreadsheets",
    title: "Orchestrate Google MCC, Search RSAs, PMax & Meta from One Surface",
    body: "Synchronize child accounts across your Google Ads Manager Account and launch compliant Campaign → Ad Group → Ad / Asset Group hierarchies with daily spend guardrails and instant pause switches.",
    metrics: [
      { label: "Hierarchy Depth", value: "3-Tier Sync" },
      { label: "API Standard", value: "Google v17+" },
      { label: "Nightly Refresh", value: "01:00 Auto" },
    ],
  },
  {
    tag: "STAGE 04 // RETENTION & ROLE GOVERNANCE",
    replaces: "Replaces AgencyAnalytics + Expensive Per-Seat CRMs",
    title: "Empower Managers Safely & Retain Clients with Rationed Portals",
    body: "Let optional Managers run daily campaigns, funnels, and outreach while blocking Billing Cards, API Keys, and Deep-Dive ledgers—and give every external ad client a clean, strictly rationed reporting portal.",
    metrics: [
      { label: "Role Tiers", value: "Admin · Mgr · Client" },
      { label: "Token Vault", value: "AES-256-GCM" },
      { label: "Per-Seat Tax", value: "$0 BYOK" },
    ],
  },
];

function StageCard({
  progress,
  index,
  total,
  stage,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  stage: LoopStage;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const fadeIn = start + seg * 0.16;
  const fadeOut = start + seg * 0.84;
  const end = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, 0.01, fadeOut, end]
      : index === total - 1
        ? [start, fadeIn, 0.99, 1]
        : [start, fadeIn, fadeOut, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    index === 0 ? [0, 0, 0, -22] : [26, 0, 0, -22]
  );

  const icons = [Globe2, Layers, Cpu, ShieldCheck];
  const StageIcon = icons[index] ?? Sparkles;

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12"
    >
      <div className="lg:col-span-7 space-y-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {stage.tag}
          </span>
          <span className="px-3 py-1 rounded-full font-mono text-[11px] bg-rose-500/10 text-rose-300 border border-rose-500/25">
            {stage.replaces}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {stage.title}
        </h3>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          {stage.body}
        </p>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {stage.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800"
            >
              <p className="text-[11px] font-mono text-zinc-500 uppercase">
                {m.label}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0d13] p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <StageIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> UNIFIED IN OMNIPULSE
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              {
                name: "1. Technical SEO + Resend Outreach",
                active: index >= 0,
                icon: Send,
              },
              {
                name: "2. 400vh+ Scroll-Story Funnel Capture",
                active: index >= 1,
                icon: Sparkles,
              },
              {
                name: "3. Google MCC & Meta 3-Tier Execution",
                active: index >= 2,
                icon: BarChart3,
              },
              {
                name: "4. Role Firewall & Client Portal Retention",
                active: index >= 3,
                icon: ShieldCheck,
              },
            ].map((stepItem) => {
              const Icon = stepItem.icon;
              return (
                <div
                  key={stepItem.name}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    stepItem.active
                      ? "bg-indigo-950/35 border-indigo-500/40 text-white"
                      : "bg-zinc-900/50 border-zinc-800/70 text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    {stepItem.name}
                  </span>
                  <span className="text-[10px]">
                    {stepItem.active ? "ACTIVE" : "NEXT"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClosedLoopScrollStory() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const width = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={trackRef}
      aria-label="Closed-loop agency consolidation scroll story"
      className="relative h-[380vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/12 blur-[130px]"
        />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="brand" dot>
              Closed-Loop Growth Story • Stop Paying for 5 Disconnected Tools
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              Audit → Outreach → Funnel → Ads → Client Portal
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width }}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        <div className="relative max-w-7xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {STAGES.map((stage, idx) => (
              <StageCard
                key={stage.tag}
                progress={scrollYProgress}
                index={idx}
                total={STAGES.length}
                stage={stage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
