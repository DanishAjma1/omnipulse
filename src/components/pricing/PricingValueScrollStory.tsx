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
  KeyRound,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ValueChapter {
  act: string;
  title: string;
  subtitle: string;
  highlightBadge: string;
  points: string[];
}

const VALUE_CHAPTERS: ValueChapter[] = [
  {
    act: "CHAPTER 01 // STACK CONSOLIDATION",
    title: "Eliminate Five Disconnected SaaS Subscriptions Overnight",
    subtitle:
      "Most agencies bleed budget stitching together separate tools for cold email, landing pages, technical SEO crawls, campaign dashboards, and client portals. OmniPulse unifies every workflow in one cohesive workspace.",
    highlightBadge: "5 Tools → 1 Unified Workspace",
    points: [
      "Replaces standalone cold outreach sequencers with Resend + Svix webhooks",
      "Replaces external page builders with 400vh+ Scroll-Story Funnel Studio",
      "Replaces manual reporting tools with rationed ClientAdAllocation portals",
    ],
  },
  {
    act: "CHAPTER 02 // PURE BYOK ARCHITECTURE",
    title: "Bring Your Own Keys—Zero Seat Tax or Middleman Markup",
    subtitle:
      "Connect your own Google Ads Developer Token, Meta System Token, Resend API, and Vercel Blob storage encrypted with AES-256-GCM. Scale your team and client roster without artificial per-seat or per-contact penalties.",
    highlightBadge: "100% Credential & Data Ownership",
    points: [
      "Add optional Manager accounts without per-user seat fees",
      "Provision client analytics portals without per-dashboard surcharges",
      "Direct API routing with zero middleman token throttling",
    ],
  },
  {
    act: "CHAPTER 03 // FULL-CAPABILITY ACCESS",
    title: "Every Production Engine Unlocked From Day One",
    subtitle:
      "Whether you operate local lead-generation campaigns, manage 50+ MCC child accounts as an agency, or govern multi-market brand telemetry, every core console studio is engineered to ship immediately.",
    highlightBadge: "MCC · Funnels · SEO · Outreach · RBAC",
    points: [
      "3-Tier Google Search RSA, Performance Max & Meta Campaign Studio",
      "Obsidian Command, Swiss Daylight & Velocity HUD 400vh+ funnel templates",
      "Bounded Worker-Thread SEO audits with instant XML sitemap export",
    ],
  },
  {
    act: "CHAPTER 04 // ZERO SUBSCRIPTION FRICTION",
    title: "Deploy Today Without Credit Cards or Billing Lock-In",
    subtitle:
      "We removed payment gates and forced trial auto-charges so your team can validate real campaign workflows hands-on. Verify your email via 6-digit OTP, vault your MCC credentials, and launch in under 5 minutes.",
    highlightBadge: "No Card Required • Instant Provisioning",
    points: [
      "2-Step Email OTP + Encrypted Vault onboarding (/register)",
      "Zero surprise billing cycles or checkout walls",
      "Dedicated Solutions Engineering for custom self-hosted scale",
    ],
  },
];

function ValueSlide({
  progress,
  index,
  total,
  chapter,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  chapter: ValueChapter;
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
    index === 0 ? [0, 0, 0, -24] : [26, 0, 0, -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12"
    >
      {/* Left Narrative */}
      <div className="lg:col-span-6 space-y-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {chapter.act}
          </span>
          <span className="px-3 py-1 rounded-full font-mono text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            {chapter.highlightBadge}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {chapter.title}
        </h3>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {chapter.subtitle}
        </p>

        <ul className="space-y-2.5 pt-2">
          {chapter.points.map((pt) => (
            <li
              key={pt}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Interactive Value Visual */}
      <div className="lg:col-span-6">
        <div className="rounded-3xl border border-zinc-800 bg-[#0b0d13] p-6 sm:p-7 shadow-2xl font-mono text-xs space-y-4">
          {index === 0 && (
            <div className="space-y-2.5">
              <p className="text-zinc-400 text-[11px] uppercase tracking-wider pb-1 border-b border-zinc-800">
                Legacy Fragmented Agency Stack vs. OmniPulse
              </p>
              {[
                { tool: "Cold Email Sequencer", status: "Consolidated" },
                { tool: "Landing Funnel Builder", status: "Consolidated" },
                { tool: "Technical SEO Crawler", status: "Consolidated" },
                { tool: "MCC Reporting Portals", status: "Consolidated" },
              ].map((row) => (
                <div
                  key={row.tool}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
                >
                  <span className="text-zinc-300 line-through decoration-rose-500/70">
                    {row.tool}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ✓ {row.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {index === 1 && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
                <span className="flex items-center gap-2 text-indigo-300 font-bold">
                  <KeyRound className="w-4 h-4" /> BYOK Encrypted Connections
                </span>
                <span className="text-emerald-400">$0 Markup</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">GOOGLE &amp; META</p>
                  <p className="text-white font-bold mt-1">Direct API Quota</p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">RESEND &amp; BLOB</p>
                  <p className="text-white font-bold mt-1">Own Reputation</p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">MANAGER SEATS</p>
                  <p className="text-emerald-400 font-bold mt-1">No Seat Tax</p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">CLIENT PORTALS</p>
                  <p className="text-emerald-400 font-bold mt-1">
                    Rationed Access
                  </p>
                </div>
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="space-y-3">
              {[
                {
                  icon: Cpu,
                  name: "Google MCC + 3-Tier Ad Studio",
                  detail: "Search · PMax · Demand Gen · Meta",
                },
                {
                  icon: Layers,
                  name: "400vh+ Scroll-Story Funnel Studio",
                  detail: "3 Distinct Navbars · 12 Removable Acts · Blob CDN",
                },
                {
                  icon: Sparkles,
                  name: "Worker-Thread SEO + Resend Outreach",
                  detail: "Async Crawls · XML Sitemap · Svix Webhooks",
                },
              ].map(({ icon: Icon, name, detail }) => (
                <div
                  key={name}
                  className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3"
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">{name}</p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {index === 3 && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Instant Early-Access
                    Onboarding
                  </span>
                  <span>ACTIVE</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Step 1: Verify 6-digit Email OTP → Step 2: Encrypt MCC &amp;
                  Developer Token → Direct Console Launch.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">CREDIT CARD</p>
                  <p className="text-emerald-400 font-bold mt-0.5">
                    Not Required
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-zinc-500 text-[10px]">AUTO-CHARGE</p>
                  <p className="text-emerald-400 font-bold mt-0.5">Disabled</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PricingValueScrollStory() {
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
  const barWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={trackRef}
      aria-label="Workspace economics and BYOK value scroll story"
      className="relative h-[420vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[130px]"
        />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="brand" dot>
              420vh Platform Value &amp; BYOK Economics Story
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              Zero Subscription Gate • 100% BYOK Ownership
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width: barWidth }}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        <div className="relative max-w-7xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {VALUE_CHAPTERS.map((ch, idx) => (
              <ValueSlide
                key={ch.act}
                progress={scrollYProgress}
                index={idx}
                total={VALUE_CHAPTERS.length}
                chapter={ch}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
