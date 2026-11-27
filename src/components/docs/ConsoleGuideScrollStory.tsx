"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * DOCS story — "Guided console walkthrough".
 * Identity: a left-hand table of contents that fills as you read, driving a
 * terminal-style window on the right that "executes" each module step by step.
 * (Pricing = convergence animation, Platform = 3D revolver — intentionally different.)
 */

interface GuideChapter {
  id: string;
  step: string;
  title: string;
  short: string;
  subtitle: string;
  method: string;
  route: string;
  logs: string[];
  result: string;
  accent: string;
}

const CHAPTERS: GuideChapter[] = [
  {
    id: "vault-onboarding",
    step: "01",
    title: "Email OTP & Zero-Knowledge BYOK Vault",
    short: "Onboarding & Vault",
    subtitle:
      "Verify ownership via a 6-digit Resend OTP, validate your 10-digit Google Ads MCC ID and Developer Token with strict Zod rules, and encrypt every secret at rest with AES-256-GCM.",
    method: "POST",
    route: "/api/v1/onboarding/register",
    logs: [
      "Zero plain-text token exposure in UI or logs",
      "Strict XXX-XXX-XXXX MCC & 20–32 char token checks",
      "Password-verified credential rotation in Settings",
    ],
    result: "201 Created · tenant vault sealed (AES-256-GCM)",
    accent: "text-indigo-300",
  },
  {
    id: "mcc-hierarchy",
    step: "02",
    title: "MCC Child Discovery & 3-Tier Telemetry",
    short: "MCC Telemetry",
    subtitle:
      "Synchronize every child Google Ads account under your Manager Account with automatic self-loop exclusion and drill cleanly from Campaign → Ad Group → Ad / PMax Asset Group.",
    method: "POST",
    route: "/api/v1/analytics/sync/mcc",
    logs: [
      "Rolling 30-day multi-network metric snapshots",
      "Nightly 01:00 self-rescheduling telemetry sync",
      "Segmented device, CTR, ROAS & Impression Share",
    ],
    result: "200 OK · child accounts synced",
    accent: "text-cyan-300",
  },
  {
    id: "campaign-studio",
    step: "03",
    title: "Unified Google & Meta Campaign Studio",
    short: "Campaign Studio",
    subtitle:
      "Launch Google Search RSAs, Performance Max Asset Groups, and Meta Campaign → Ad Set → Ad hierarchies from one guided interface—without touching five native ad managers.",
    method: "GET",
    route: "console.omnipulse.io/campaigns/create",
    logs: [
      "Enforces Meta 3-tier & Google PMax asset rules",
      "1-click pause/enable & daily budget micro controls",
      "Safe status=REMOVED soft-deletion compliance",
    ],
    result: "200 OK · campaign hierarchy validated",
    accent: "text-emerald-300",
  },
  {
    id: "funnel-studio",
    step: "04",
    title: "400vh+ Scroll-Story Funnel Studio & Blob CDN",
    short: "Funnel Studio",
    subtitle:
      "Pick from 3 bespoke architectures (Obsidian Command, Swiss Daylight Studio, Velocity Matrix HUD), click any element inside the isolated iframe to edit, and host up to 3 visuals on Vercel Blob.",
    method: "GET",
    route: "console.omnipulse.io/admin/funnels",
    logs: [
      "Editor · Split Live · Full 400vh Preview modes",
      "12 equal-spaced removable sections + Nav/Footer links",
      "Deterministic zero-AI compilation + live SERP audit",
    ],
    result: "200 OK · funnel published to /f/:funnelId",
    accent: "text-amber-300",
  },
  {
    id: "seo-outreach",
    step: "05",
    title: "Worker-Thread SEO Crawler & Resend Outreach",
    short: "SEO & Outreach",
    subtitle:
      "Dispatch non-blocking Chromium/Cheerio crawls across bounded CPU worker pools, export instant XML sitemaps, and trigger Svix-verified Resend outreach sequences.",
    method: "POST",
    route: "/api/v1/seo/audit  ·  /api/v1/outreach",
    logs: [
      "CPU-safe worker thread pool (max cores − 1)",
      "Idempotent (campaignId, contactId) burst protection",
      "Live Delivered → Opened → Clicked webhook stream",
    ],
    result: "202 Accepted · crawl queued, webhooks armed",
    accent: "text-purple-300",
  },
  {
    id: "rbac-portals",
    step: "06",
    title: "Admin, Manager & Rationed Client Governance",
    short: "Roles & Portals",
    subtitle:
      "Run hands-on as Admin, empower Managers on daily operations while blocking credential vaults and deep-dive financials, and grant Clients strictly rationed read-only ad portals.",
    method: "AUTH",
    route: "enforceClientScope · ROLE_GROUPS",
    logs: [
      "Managers blocked from Vault & Deep-Dive financials",
      "Client blast-radius locked to ClientAdAllocation",
      "Visual account dropdowns—zero raw ID copy-paste",
    ],
    result: "403 for out-of-scope · 200 for allocated campaigns",
    accent: "text-teal-300",
  },
];

export function ConsoleGuideScrollStory() {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const railFill = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v * CHAPTERS.length)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const chapter = CHAPTERS[active];

  return (
    <section
      ref={trackRef}
      aria-label="Step-by-step Agency Console documentation walkthrough"
      className="relative h-[480vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-20 pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-[420px] w-[520px] rounded-full bg-indigo-600/15 blur-[130px]"
        />

        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" dot>
            Interactive Console Walkthrough
          </Badge>
          <span className="text-xs font-mono text-zinc-400">
            Module {chapter.step} / 0{CHAPTERS.length}
          </span>
        </div>

        <div className="mx-auto mt-5 grid min-h-0 w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left: table of contents rail */}
          <nav
            aria-label="Walkthrough modules"
            className="relative hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-center"
          >
            <div className="absolute bottom-6 left-[11px] top-6 w-px bg-zinc-800" />
            <motion.div
              style={{ height: railFill }}
              className="absolute left-[11px] top-6 w-px bg-gradient-to-b from-indigo-400 via-cyan-400 to-emerald-400"
            />
            <ol className="relative space-y-4">
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={c.id} className="flex items-center gap-4">
                    <span
                      className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono font-bold transition-colors ${
                        isActive
                          ? "border-indigo-400 bg-indigo-500 text-white"
                          : isDone
                            ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300"
                            : "border-zinc-700 bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      {isDone ? "✓" : c.step}
                    </span>
                    <span
                      className={`text-sm transition-colors ${
                        isActive ? "font-semibold text-white" : "text-zinc-500"
                      }`}
                    >
                      {c.short}
                    </span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Right: terminal window */}
          <div className="min-h-0 lg:col-span-8">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d13] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/70 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                  <Terminal className="h-3 w-3" /> omnipulse — module {chapter.step}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-1 flex-col justify-center gap-5 overflow-y-auto p-6 sm:p-9"
                >
                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {chapter.subtitle}
                  </p>

                  <div className="space-y-2 rounded-xl border border-zinc-800 bg-black/40 p-4 font-mono text-xs sm:text-[13px]">
                    <p className="text-zinc-300">
                      <span className="text-emerald-400">$</span>{" "}
                      <span className={chapter.accent}>{chapter.method}</span> {chapter.route}
                    </p>
                    {chapter.logs.map((line, i) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.12 }}
                        className="flex items-start gap-2 text-zinc-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        {line}
                      </motion.p>
                    ))}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="border-t border-zinc-800 pt-2 text-emerald-300"
                    >
                      → {chapter.result}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
