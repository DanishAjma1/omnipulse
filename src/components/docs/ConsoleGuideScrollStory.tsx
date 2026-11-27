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
  CheckCircle2,
  Cpu,
  Globe2,
  KeyRound,
  Lock,
  MailCheck,
  Send,
  ShieldCheck,
  Sliders,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface GuideChapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  highlights: string[];
  accent: string;
}

const CHAPTERS: GuideChapter[] = [
  {
    id: "vault-onboarding",
    step: "01",
    title: "Email OTP & Zero-Knowledge BYOK Vault",
    subtitle:
      "Verify ownership via 6-digit Resend OTP, validate your 10-digit Google Ads MCC ID and Developer Token with strict Zod rules, and encrypt every secret at rest with AES-256-GCM.",
    routeBadge: "POST /api/v1/onboarding/register",
    highlights: [
      "Zero plain-text token exposure in UI or logs",
      "Strict XXX-XXX-XXXX MCC & 20–32 char token checks",
      "Password-verified credential rotation in Settings",
    ],
    accent: "from-indigo-500 to-cyan-400",
  },
  {
    id: "mcc-hierarchy",
    step: "02",
    title: "MCC Child Discovery & 3-Tier Telemetry",
    subtitle:
      "Synchronize every child Google Ads account under your Manager Account with automatic self-loop exclusion and drill cleanly from Campaign → Ad Group → Ad / PMax Asset Group.",
    routeBadge: "POST /api/v1/analytics/sync/mcc",
    highlights: [
      "Rolling 30-day multi-network metric snapshots",
      "Nightly 01:00 self-rescheduling telemetry sync",
      "Segmented device, CTR, ROAS & Impression Share",
    ],
    accent: "from-cyan-400 to-emerald-400",
  },
  {
    id: "campaign-studio",
    step: "03",
    title: "Unified Google & Meta Campaign Studio",
    subtitle:
      "Launch Google Search RSAs, Performance Max Asset Groups, and Meta Campaign → Ad Set → Ad hierarchies from one guided interface—without touching five native ad managers.",
    routeBadge: "console.omnipulse.io/campaigns/create",
    highlights: [
      "Enforces Meta 3-tier & Google PMax asset rules",
      "1-click pause/enable & daily budget micro controls",
      "Safe status=REMOVED soft-deletion compliance",
    ],
    accent: "from-emerald-400 to-indigo-500",
  },
  {
    id: "funnel-studio",
    step: "04",
    title: "400vh+ Scroll-Story Funnel Studio & Blob CDN",
    subtitle:
      "Pick from 3 bespoke architectures (Obsidian Command, Swiss Daylight Studio, Velocity Matrix HUD), click any element inside the isolated iframe to edit, and host up to 3 visuals on Vercel Blob.",
    routeBadge: "console.omnipulse.io/admin/funnels",
    highlights: [
      "Editor · Split Live · Full 400vh Preview modes",
      "12 equal-spaced removable sections + Nav/Footer links",
      "Deterministic zero-AI compilation + live SERP audit",
    ],
    accent: "from-amber-400 to-rose-500",
  },
  {
    id: "seo-outreach",
    step: "05",
    title: "Worker-Thread SEO Crawler & Resend Outreach",
    subtitle:
      "Dispatch non-blocking Chromium/Cheerio crawls across bounded CPU worker pools, export instant XML sitemaps, and trigger Svix-verified Resend outreach sequences.",
    routeBadge: "POST /api/v1/seo/audit • /outreach",
    highlights: [
      "CPU-safe worker thread pool (max cores − 1)",
      "Idempotent (campaignId, contactId) burst protection",
      "Live Delivered → Opened → Clicked webhook stream",
    ],
    accent: "from-purple-500 to-indigo-400",
  },
  {
    id: "rbac-portals",
    step: "06",
    title: "Admin, Manager & Rationed Client Governance",
    subtitle:
      "Run hands-on as Admin, empower Managers on daily operations while blocking Billing & Deep-Dive financials, and grant Clients strictly rationed read-only ad portals.",
    routeBadge: "enforceClientScope • ROLE_GROUPS",
    highlights: [
      "Managers blocked from Cards, Vault & Deep-Dive",
      "Client blast-radius locked to ClientAdAllocation",
      "Visual account dropdowns—zero raw ID copy-paste",
    ],
    accent: "from-emerald-400 to-cyan-500",
  },
];

function ChapterSlide({
  progress,
  index,
  total,
  chapter,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  chapter: GuideChapter;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const fadeInEnd = start + seg * 0.16;
  const fadeOutStart = start + seg * 0.84;
  const end = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, 0.01, fadeOutStart, end]
      : index === total - 1
        ? [start, fadeInEnd, 0.99, 1]
        : [start, fadeInEnd, fadeOutStart, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    index === 0 ? [0, 0, 0, -24] : [28, 0, 0, -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
    >
      {/* Left Narrative */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${chapter.accent} text-xs font-mono font-extrabold text-zinc-950 shadow-lg`}
          >
            {chapter.step}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
            {chapter.routeBadge}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {chapter.title}
        </h3>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {chapter.subtitle}
        </p>

        <ul className="space-y-2.5 pt-2">
          {chapter.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Interactive Console Stage */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-zinc-800 bg-[#0d0e12] shadow-2xl overflow-hidden">
          <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-zinc-300">
                STEP {chapter.step} // CONSOLE LIVE VIEW
              </span>
            </div>
            <span className="text-emerald-400">● VERIFIED</span>
          </div>

          <div className="p-5 sm:p-7 min-h-[290px] flex flex-col justify-between bg-gradient-to-b from-zinc-950 to-[#090b10]">
            {index === 0 && (
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
                      <MailCheck className="w-4 h-4" />
                      <span>STEP 1 · EMAIL OTP</span>
                    </div>
                    <p className="text-zinc-200 font-semibold">
                      founder@apexagency.io
                    </p>
                    <p className="text-emerald-400 mt-1">
                      ✓ 6-Digit Resend OTP Verified
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
                      <KeyRound className="w-4 h-4" />
                      <span>STEP 2 · ZOD + VAULT</span>
                    </div>
                    <p className="text-zinc-200">MCC: 918-204-1190</p>
                    <p className="text-zinc-400 mt-1">
                      Dev Token: ••••••••••••••••9X2A
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-emerald-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> AES-256-GCM Ciphertext Stored
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
                    0 Plaintext Keys
                  </span>
                </div>
              </div>
            )}

            {index === 1 && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="w-4 h-4" /> MCC #918-204-1190 HIERARCHY
                  </span>
                  <span>3-Tier Sync Active</span>
                </div>
                {[
                  {
                    client: "Apex HVAC Local (#441-892-1102)",
                    campaigns: "6 Search + PMax",
                    roas: "5.4x ROAS",
                  },
                  {
                    client: "Maison Atelier E-Com (#772-104-9981)",
                    campaigns: "11 PMax + Shopping",
                    roas: "4.9x ROAS",
                  },
                  {
                    client: "Northbridge SaaS (#309-551-7820)",
                    campaigns: "4 RSA + Demand Gen",
                    roas: "3.8x ROAS",
                  },
                ].map((row) => (
                  <div
                    key={row.client}
                    className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-white font-semibold">{row.client}</p>
                      <p className="text-zinc-500 text-[11px]">
                        {row.campaigns} → Ad Groups → Ads
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {row.roas}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {index === 2 && (
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                    <p className="text-[10px] text-zinc-400">TIER 1</p>
                    <p className="font-bold mt-0.5 text-white">Campaign</p>
                    <p className="text-[10px] mt-1">Search · PMax · Meta</p>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    <p className="text-[10px] text-zinc-400">TIER 2</p>
                    <p className="font-bold mt-0.5 text-white">
                      Ad / Asset Group
                    </p>
                    <p className="text-[10px] mt-1">Geo & Bid Ceilings</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    <p className="text-[10px] text-zinc-400">TIER 3</p>
                    <p className="font-bold mt-0.5 text-white">RSA / Creative</p>
                    <p className="text-[10px] mt-1">15 Headlines + URLs</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-300 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" /> Daily
                    Budget Guardrail: $250.00 / day
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    PUBLISHED
                  </span>
                </div>
              </div>
            )}

            {index === 3 && (
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    {
                      name: "Obsidian Command",
                      nav: "Frosted Split Pill",
                      bg: "bg-[#090d16] border-indigo-500/40 text-white",
                    },
                    {
                      name: "Swiss Daylight",
                      nav: "2-Tier Masthead",
                      bg: "bg-[#faf7f2] border-amber-500/50 text-stone-900",
                    },
                    {
                      name: "Velocity HUD",
                      nav: "Floating Capsule",
                      bg: "bg-[#030712] border-emerald-500/40 text-emerald-300",
                    },
                  ].map((tpl) => (
                    <div
                      key={tpl.name}
                      className={`p-3 rounded-xl border ${tpl.bg}`}
                    >
                      <p className="font-bold truncate">{tpl.name}</p>
                      <p className="text-[10px] opacity-75 mt-1">{tpl.nav}</p>
                      <p className="text-[10px] font-semibold mt-2">
                        400vh+ · 12 Acts
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Click-to-Edit
                    Iframe Sandbox + Vercel Blob (3/3 Slots)
                  </span>
                  <span className="text-cyan-400">Zero AI Latency</span>
                </div>
              </div>
            )}

            {index === 4 && (
              <div className="space-y-3.5 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-purple-400">
                    <Globe2 className="w-4 h-4" /> SEO Worker Pool (50 Pages
                    Crawled)
                  </span>
                  <span className="text-emerald-400 font-bold">
                    96 / 100 · sitemap.xml ready
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-indigo-300">
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Resend p-limit(2) Burst +
                      Svix HMAC
                    </span>
                    <span className="text-emerald-400">99.2% Delivered</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                      <p className="text-zinc-500 text-[10px]">SENT</p>
                      <p className="text-white font-bold">2,480</p>
                    </div>
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                      <p className="text-zinc-500 text-[10px]">OPENED</p>
                      <p className="text-cyan-400 font-bold">68.4%</p>
                    </div>
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                      <p className="text-zinc-500 text-[10px]">CLICKED</p>
                      <p className="text-emerald-400 font-bold">19.1%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {index === 5 && (
              <div className="space-y-3 font-mono text-xs">
                {[
                  {
                    role: "ADMIN (Agency Owner)",
                    scope:
                      "Full Console + Billing Cards + Zero-Knowledge Vault + Deep-Dive",
                    badge: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10",
                  },
                  {
                    role: "MANAGER (Optional Ops Staff)",
                    scope:
                      "CRM, Funnels, SEO, Outreach & Campaigns • Blocked from Cards & Deep-Dive",
                    badge: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
                  },
                  {
                    role: "CLIENT (Ad Account Owner)",
                    scope:
                      "Strictly Rationed Google/Meta Campaign Portal (ClientAdAllocation)",
                    badge:
                      "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
                  },
                ].map((r) => (
                  <div
                    key={r.role}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-white font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        {r.role}
                      </p>
                      <p className="text-zinc-400 text-[11px] mt-0.5">
                        {r.scope}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[10px] shrink-0 ${r.badge}`}
                    >
                      ENFORCED
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                Scroll to advance chapters ({index + 1} / {total})
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Interactive
                Console Architecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ConsoleGuideScrollStory() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={trackRef}
      aria-label="Step-by-step Agency Console scroll story"
      className="relative h-[480vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        {/* Ambient backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[130px]"
        />

        {/* Top Chapter Header + Progress Bar */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="brand" dot>
              480vh Interactive Console Walkthrough
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              6 Core Modules • Scroll to Inspect Every Workflow
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
            />
          </div>

          <div className="hidden md:grid grid-cols-6 gap-2 text-[11px] font-mono text-zinc-500">
            {CHAPTERS.map((ch) => (
              <div key={ch.id} className="truncate">
                <span className="text-indigo-400 font-bold">{ch.step}.</span>{" "}
                {ch.title.split("&")[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Center Morphing Stage */}
        <div className="relative max-w-7xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800/90 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {CHAPTERS.map((chapter, idx) => (
              <ChapterSlide
                key={chapter.id}
                progress={scrollYProgress}
                index={idx}
                total={CHAPTERS.length}
                chapter={chapter}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
