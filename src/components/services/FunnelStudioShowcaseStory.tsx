"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Badge } from "@/components/ui/Badge";

/**
 * PLATFORM SCROLL STORY (Part 2) — Philosophy: "3D Tactile Stacked Browser-Deck Peel"
 * Three physical browser windows sit layered in 3D depth on a drafting stage.
 * As you scroll through each window's segment:
 *  1) Its inner 12-act landing page scrolls vertically inside the browser frame
 *  2) The entire browser card lifts and peels upward in 3D perspective, scaling the next
 *     design system forward from the stack underneath.
 */

interface DeckBrowserTheme {
  id: "modern_saas" | "vibrant_dynamic" | "direct_response";
  url: string;
  label: string;
  archetype: string;
  chromeBg: string;
  chromeBorder: string;
  pageBg: string;
  pageText: string;
  accentPill: string;
  heroTitle: string;
  heroSub: string;
  kpis: Array<{ v: string; l: string }>;
  acts: Array<{ tag: string; heading: string; note: string }>;
  footerCta: string;
}

const DECK: DeckBrowserTheme[] = [
  {
    id: "modern_saas",
    url: "https://omnipulse.app/f/obsidian-b2b-pipeline",
    label: "Architecture I · Obsidian Command",
    archetype: "B2B SaaS & Enterprise Retainers",
    chromeBg: "bg-[#0c111d] text-slate-300",
    chromeBorder: "border-indigo-500/45",
    pageBg: "bg-[#070b14]",
    pageText: "text-slate-100",
    accentPill: "bg-indigo-600 text-white",
    heroTitle: "Turn Paid Search Demand Into Predictable SQL Pipeline.",
    heroSub:
      "Frosted split-pill navigation, asymmetric telemetry hero, and dark obsidian contrast bands.",
    kpis: [
      { v: "4.8x", l: "Blended ROAS" },
      { v: "38%", l: "Lower Cost / SQL" },
      { v: "14d", l: "Launch Velocity" },
    ],
    acts: [
      {
        tag: "ACT 04 · DIAGNOSTIC MATRIX",
        heading: "Why Last-Click Funnels Leak High-Intent Buyers",
        note: "Side-by-side comparison grid + Blob visual slot #2",
      },
      {
        tag: "ACT 08 · MECHANISM TIMELINE",
        heading: "90-Day Attribution & Creative Sprint Roadmap",
        note: "3-milestone execution cards with live anchor jump",
      },
    ],
    footerCta: "Schedule Executive Pipeline Audit →",
  },
  {
    id: "vibrant_dynamic",
    url: "https://omnipulse.app/f/swiss-editorial-brief",
    label: "Architecture II · Swiss Daylight Studio",
    archetype: "Editorial Advisory & Boutique Studios",
    chromeBg: "bg-[#efeae1] text-stone-700",
    chromeBorder: "border-stone-400/80",
    pageBg: "bg-[#faf7f2]",
    pageText: "text-stone-900",
    accentPill: "bg-orange-600 text-white",
    heroTitle: "Editorial Authority That Converts Cold Traffic Into Retainers.",
    heroSub:
      "Warm ivory monograph paper, hairline editorial rules, serif masthead, and lookbook frames.",
    kpis: [
      { v: "62%", l: "Scroll Completion" },
      { v: "3.1x", l: "Booked Briefings" },
      { v: "0.9s", l: "Edge FCP" },
    ],
    acts: [
      {
        tag: "EDITION II · CASE MONOGRAPH",
        heading: "Curated Portfolio Proof Without Generic SaaS Templates",
        note: "Stone-bordered gallery + serif pull-quotes",
      },
      {
        tag: "EDITION III · TRANSPARENT SCOPE",
        heading: "Fixed-Deliverable Sprints & Direct Founder Access",
        note: "Two-column print ledger + FAQ accordion",
      },
    ],
    footerCta: "Request Private Studio Dossier →",
  },
  {
    id: "direct_response",
    url: "https://omnipulse.app/f/velocity-matrix-offer",
    label: "Architecture III · Velocity Matrix HUD",
    archetype: "High-Velocity Local & Direct Response",
    chromeBg: "bg-[#04100d] text-emerald-200",
    chromeBorder: "border-emerald-500/50",
    pageBg: "bg-[#020806]",
    pageText: "text-emerald-50",
    accentPill: "bg-emerald-400 text-slate-950 font-extrabold",
    heroTitle: "Book 40+ Qualified Local Estimates in 30 Days—Guaranteed.",
    heroSub:
      "Floating capsule HUD, live emerald pulse indicator, value-stack deliverables, and urgency dock.",
    kpis: [
      { v: "$21.40", l: "Avg Lead CPL" },
      { v: "91/100", l: "SERP Speed" },
      { v: "24/7", l: "CRM Auto-Capture" },
    ],
    acts: [
      {
        tag: "STAGE 05 · VALUE STACK",
        heading: "Everything Included in Your Geo-Fenced Launch Pack",
        note: "Itemized deliverable checklist + risk-reversal seal",
      },
      {
        tag: "STAGE 11 · INSTANT LEAD CAPTURE",
        heading: "Direct CRM Kanban & Deal Creation on Every Submission",
        note: "Zero webhook glue — writes straight to CRM pipeline",
      },
    ],
    footerCta: "Claim Territory Availability Check →",
  },
];

function BrowserCardWrapper({
  progress,
  index,
  total,
  theme,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  theme: DeckBrowserTheme;
}) {
  const seg = 1 / total;
  const segStart = index * seg;
  const innerScrollEnd = segStart + seg * 0.68;
  const peelEnd = (index + 1) * seg;
  const isLast = index === total - 1;

  // Before this card's turn, it sits scaled down & slightly lower in the physical stack.
  // During its turn, it sits full size at y=0 while its inner page scrolls.
  // At the end of its turn (except the last card), it peels upward & tilts back.
  const prevStart = Math.max(0, (index - 1) * seg + seg * 0.68);

  const scale = useTransform(
    progress,
    index === 0
      ? [0, innerScrollEnd, peelEnd]
      : [0, prevStart, segStart, innerScrollEnd, peelEnd],
    index === 0
      ? [1, 1, 0.94]
      : isLast
        ? [1 - index * 0.05, 1 - 0.05, 1, 1, 1]
        : [1 - index * 0.05, 0.95, 1, 1, 0.94]
  );

  const y = useTransform(
    progress,
    index === 0
      ? [0, innerScrollEnd, peelEnd]
      : [0, prevStart, segStart, innerScrollEnd, peelEnd],
    index === 0
      ? ["0%", "0%", "-115%"]
      : isLast
        ? [`${index * 26}px`, "26px", "0px", "0px", "0px"]
        : [`${index * 26}px`, "26px", "0px", "0px", "-115%"]
  );

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, innerScrollEnd, peelEnd]
      : [0, segStart - 0.05, segStart, innerScrollEnd, peelEnd],
    index === 0
      ? [1, 1, 0]
      : isLast
        ? [0.55, 0.85, 1, 1, 1]
        : [0.45, 0.85, 1, 1, 0]
  );

  // Scroll the miniature landing page inside the active browser viewport!
  const innerPageY = useTransform(
    progress,
    [segStart + 0.03, isLast ? 0.96 : innerScrollEnd],
    ["0%", "-42%"]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: (total - index) * 10,
      }}
      className="absolute inset-x-0 mx-auto w-full max-w-5xl will-change-transform"
    >
      <div
        className={`overflow-hidden rounded-3xl border-2 ${theme.chromeBorder} shadow-[0_30px_90px_-20px_rgba(0,0,0,0.65)]`}
      >
        {/* Browser Window Chrome */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b border-current/10 px-4 py-3 ${theme.chromeBg}`}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs font-bold">
              {theme.label}
            </span>
          </div>

          <div className="hidden md:block rounded-lg bg-black/15 px-3 py-1 font-mono text-[11px] opacity-80">
            {theme.url}
          </div>

          <span className="rounded-full border border-current/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold">
            {theme.archetype}
          </span>
        </div>

        {/* Browser Viewport (Clips the scrolling miniature 400vh page inside) */}
        <div
          className={`relative h-[400px] sm:h-[440px] overflow-hidden ${theme.pageBg} ${theme.pageText}`}
        >
          <motion.div style={{ y: innerPageY }} className="p-6 sm:p-10 space-y-8">
            {/* Simulated Page Hero */}
            <div className="space-y-4 border-b border-current/10 pb-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                  LIVE SANDBOXED IFRAME • CLICK ANY ELEMENT TO EDIT
                </span>
                <span className={`rounded-full px-3 py-1 text-[10px] font-mono ${theme.accentPill}`}>
                  12 Removable Acts
                </span>
              </div>

              <h3
                className={`text-2xl sm:text-4xl font-black leading-tight ${
                  theme.id === "vibrant_dynamic" ? "font-serif" : ""
                }`}
              >
                {theme.heroTitle}
              </h3>

              <p className="max-w-2xl text-xs sm:text-sm opacity-75">
                {theme.heroSub}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {theme.kpis.map((k) => (
                  <div
                    key={k.l}
                    className="rounded-2xl border border-current/15 p-3.5"
                  >
                    <p className="font-mono text-lg sm:text-2xl font-extrabold">
                      {k.v}
                    </p>
                    <p className="font-mono text-[10px] uppercase opacity-65">
                      {k.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Mid-Funnel Acts (Scrolled into view before card peels!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {theme.acts.map((act) => (
                <div
                  key={act.tag}
                  className="rounded-2xl border border-current/15 p-5 space-y-2"
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-65">
                    {act.tag}
                  </p>
                  <h4 className="text-base sm:text-lg font-bold leading-snug">
                    {act.heading}
                  </h4>
                  <p className="text-xs opacity-70">{act.note}</p>
                </div>
              ))}
            </div>

            {/* Simulated Conversion Dock Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-current/20 p-5">
              <div>
                <p className="font-mono text-[10px] uppercase opacity-65">
                  ACT 12 · CONVERSION &amp; CRM INGESTION
                </p>
                <p className="text-sm font-bold mt-0.5">
                  3 Vercel Blob Visual Slots • Auto JSON-LD &amp; OpenGraph SEO
                </p>
              </div>
              <span className={`rounded-xl px-4 py-2 text-xs font-bold ${theme.accentPill}`}>
                {theme.footerCta}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function FunnelStudioShowcaseStory() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section
      id="funnels"
      ref={trackRef}
      aria-label="Stacked 3D Funnel Architecture Deck"
      className="relative h-[380vh] border-y border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-100 via-white to-zinc-100 dark:from-[#0b0d13] dark:via-[#080a0f] dark:to-[#0b0d13]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16 pb-6">
        <div className="mx-auto mb-6 w-full max-w-5xl px-4 sm:px-6 text-center">
          <Badge variant="brand">
            3D Funnel Studio Drafting Deck
          </Badge>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Watch Each Landing Architecture Scroll, Then Peel Away.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Switch themes live in the studio without losing a single headline, link, or uploaded Blob image.
          </p>
        </div>

        {/* 3D Layered Browser Stack */}
        <div className="relative mx-auto h-[460px] sm:h-[500px] w-full max-w-5xl px-4 sm:px-6 [perspective:1600px]">
          {DECK.map((theme, idx) => (
            <BrowserCardWrapper
              key={theme.id}
              progress={smooth}
              index={idx}
              total={DECK.length}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
