"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CheckCircle2, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface FunnelShowcaseItem {
  id: string;
  name: string;
  badge: string;
  navbarStyle: string;
  heroStyle: string;
  footerStyle: string;
  heightLabel: string;
  palette: [string, string, string];
  summary: string;
  surfacePreview: {
    bg: string;
    text: string;
    border: string;
    accent: string;
    eyebrow: string;
    headline: string;
  };
}

const TEMPLATES: FunnelShowcaseItem[] = [
  {
    id: "modern_saas",
    name: "Template 01 · Obsidian Command",
    badge: "Enterprise Dark",
    navbarStyle: "Frosted Split Pill Bar + 2px Scroll Progress",
    heroStyle: "Asymmetric 7/5 Telemetry Hero",
    footerStyle: "4-Column Command Manifesto Footer",
    heightLabel: "460vh+ · 12 Removable Acts",
    palette: ["#090d16", "#6366f1", "#06b6d4"],
    summary:
      "Engineered for B2B agencies and SaaS offers. Features alternating obsidian bands, frosted pill navigation, live comparison matrices, and 3 persistent Vercel Blob visual slots.",
    surfacePreview: {
      bg: "bg-[#090d16]",
      text: "text-slate-100",
      border: "border-indigo-500/40",
      accent: "bg-indigo-600 text-white",
      eyebrow: "ACT 01 · UNIFIED ATTRIBUTION",
      headline: "Turn Fragmented Paid Clicks Into Compounding Enterprise Pipeline",
    },
  },
  {
    id: "vibrant_dynamic",
    name: "Template 02 · Swiss Daylight Studio",
    badge: "Editorial Light",
    navbarStyle: "Two-Tier Magazine Masthead + Hairline Rules",
    heroStyle: "50/50 Split-Screen Magazine Cover",
    footerStyle: "Oversized Serif Wordmark Ledger",
    heightLabel: "440vh+ · 12 Removable Acts",
    palette: ["#faf7f2", "#ea580c", "#0f766e"],
    summary:
      "Warm ivory paper editorial architecture inspired by print monographs. Pairs high-contrast serif headlines with stone-framed lookbooks, editable anchor links, and instant click-to-edit studio tabs.",
    surfacePreview: {
      bg: "bg-[#faf7f2]",
      text: "text-stone-900",
      border: "border-stone-300",
      accent: "bg-orange-600 text-white",
      eyebrow: "EDITION 01 · CURATED BRIEF",
      headline: "Editorial Conviction That Converts Discerning Buyers Into Retainers",
    },
  },
  {
    id: "direct_response",
    name: "Template 03 · Velocity Matrix HUD",
    badge: "Conversion Cockpit",
    navbarStyle: "Detached Floating Capsule HUD + Live Pulse",
    heroStyle: "Centered High-Velocity Command Deck",
    footerStyle: "Compact Floating Glass Conversion Dock",
    heightLabel: "450vh+ · 12 Removable Acts",
    palette: ["#030712", "#10b981", "#06b6d4"],
    summary:
      "High-urgency direct-response cockpit with neon emerald telemetry frames, monospace KPI proof strips, deliverable value stacks, and zero-AI deterministic rendering.",
    surfacePreview: {
      bg: "bg-[#030712]",
      text: "text-emerald-50",
      border: "border-emerald-500/40",
      accent: "bg-emerald-500 text-slate-950",
      eyebrow: "⚡ STAGE 01 · DIRECT OFFER",
      headline: "Add 45+ Qualified Sales Appointments Every 30 Days Without Ad Waste",
    },
  },
];

function TemplateSlide({
  progress,
  index,
  total,
  item,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  item: FunnelShowcaseItem;
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

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
    >
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Badge variant="brand">{item.badge}</Badge>
          <span className="font-mono text-xs text-emerald-400">
            {item.heightLabel}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          {item.name}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed">{item.summary}</p>

        <div className="space-y-2 pt-1 font-mono text-xs text-zinc-300">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Navbar:</strong> {item.navbarStyle}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Hero:</strong> {item.heroStyle}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Footer:</strong> {item.footerStyle}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs font-mono text-zinc-500">Palette:</span>
          {item.palette.map((hex) => (
            <span
              key={hex}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300"
            >
              <span
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: hex }}
              />
              {hex}
            </span>
          ))}
        </div>
      </div>

      {/* Live Sandboxed Template Frame Mock */}
      <div className="lg:col-span-7">
        <div
          className={`rounded-2xl border-2 ${item.surfacePreview.border} ${item.surfacePreview.bg} ${item.surfacePreview.text} shadow-2xl overflow-hidden`}
        >
          {/* Distinct Navbar Preview */}
          {item.id === "vibrant_dynamic" ? (
            <div className="border-b-2 border-stone-300 px-5 py-2.5 space-y-1.5">
              <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-stone-500 border-b border-stone-300 pb-1">
                <span>SWISS EDITORIAL EDITION</span>
                <span>VOL. 01 · 440VH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-base">
                  Daylight Studio
                </span>
                <div className="hidden sm:flex gap-4 text-[10px] font-bold uppercase tracking-wider">
                  <span>Outcomes</span>
                  <span>Process</span>
                  <span>FAQ</span>
                </div>
                <span className="px-3 py-1 text-[10px] font-bold uppercase bg-orange-600 text-white">
                  Book Briefing
                </span>
              </div>
            </div>
          ) : item.id === "direct_response" ? (
            <div className="p-3">
              <div className="mx-auto rounded-full border border-emerald-500/40 bg-[#050c18] px-4 py-2 flex items-center justify-between text-xs font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Velocity Matrix
                </span>
                <span className="hidden sm:inline text-[10px] text-emerald-300">
                  Outcomes · Proof · Stack · FAQ
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                  Claim Audit →
                </span>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-800 px-5 py-3 flex items-center justify-between text-xs">
              <span className="font-extrabold">Obsidian Command</span>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300">
                Outcomes · Mechanism · Proof · FAQ
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-bold">
                Book Audit
              </span>
            </div>
          )}

          {/* Hero Preview Body */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-75">
                {item.surfacePreview.eyebrow}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-600 text-white">
                Click any block to edit
              </span>
            </div>

            <h4 className="text-xl sm:text-3xl font-black leading-tight">
              {item.surfacePreview.headline}
            </h4>

            <div className="grid grid-cols-3 gap-2.5 pt-1 font-mono text-[11px]">
              <div className="p-3 rounded-xl border border-current/15">
                <p className="opacity-60 text-[10px]">BLOB SLOT 1</p>
                <p className="font-bold mt-0.5">Hero Visual</p>
              </div>
              <div className="p-3 rounded-xl border border-current/15">
                <p className="opacity-60 text-[10px]">BLOB SLOT 2</p>
                <p className="font-bold mt-0.5">Act V Reveal</p>
              </div>
              <div className="p-3 rounded-xl border border-current/15">
                <p className="opacity-60 text-[10px]">BLOB SLOT 3</p>
                <p className="font-bold mt-0.5">Act VII Proof</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] font-mono opacity-75">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> 12 Equal-Spaced Sections
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Editable Nav &amp; Footer
                Links
              </span>
            </div>
          </div>
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
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const barWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="funnels"
      ref={trackRef}
      aria-label="400vh Scroll-Story Funnel Studio Showcase"
      className="relative h-[360vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="brand" dot>
              Scroll-Story Funnel Studio • 3 Distinct 400vh+ Architectures
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              Click-to-Edit Iframe • Max 3 Vercel Blob Images • Zero AI Needed
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width: barWidth }}
              className="h-full bg-gradient-to-r from-indigo-500 via-amber-400 to-emerald-400"
            />
          </div>
        </div>

        <div className="relative max-w-7xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {TEMPLATES.map((tpl, idx) => (
              <TemplateSlide
                key={tpl.id}
                progress={scrollYProgress}
                index={idx}
                total={TEMPLATES.length}
                item={tpl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
