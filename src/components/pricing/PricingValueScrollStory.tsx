"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * PRICING story — "Stack convergence".
 * Identity: five separate tool chips drift into one OmniPulse core while cost
 * counters (tools, seat fees, markup, card required) tick down as you scroll.
 * (Docs = terminal walkthrough, Platform = 3D revolver — intentionally different.)
 */

interface ValueChapter {
  act: string;
  title: string;
  subtitle: string;
  points: string[];
}

const VALUE_CHAPTERS: ValueChapter[] = [
  {
    act: "01 · CONSOLIDATE",
    title: "Five disconnected subscriptions become one workspace",
    subtitle:
      "Cold email, landing pages, technical SEO crawls, campaign dashboards and client portals usually mean five logins and five invoices. OmniPulse unifies them.",
    points: [
      "Resend + Svix webhooks replace standalone outreach sequencers",
      "400vh+ Scroll-Story Funnel Studio replaces external page builders",
      "Rationed client portals replace manual reporting",
    ],
  },
  {
    act: "02 · BRING YOUR OWN KEYS",
    title: "Your keys, your quota — no seat tax, no markup",
    subtitle:
      "Connect your own Google Ads Developer Token, Meta token, Resend API and Vercel Blob storage, encrypted with AES-256-GCM. Grow your team and client roster without per-seat penalties.",
    points: [
      "Optional Manager accounts without per-user fees",
      "Client analytics portals without per-dashboard surcharges",
      "Direct provider API routing, no middleman throttling",
    ],
  },
  {
    act: "03 · EVERYTHING UNLOCKED",
    title: "Every production engine is available from day one",
    subtitle:
      "Local lead-gen, 50+ MCC child accounts or multi-market brand telemetry — each console studio is built to ship immediately.",
    points: [
      "3-tier Google Search RSA, PMax & Meta Campaign Studio",
      "Obsidian Command, Swiss Daylight & Velocity HUD funnel templates",
      "Worker-thread SEO audits with instant XML sitemap export",
    ],
  },
  {
    act: "04 · ZERO FRICTION",
    title: "Start today — no credit card, no billing lock-in",
    subtitle:
      "Verify your email with a 6-digit OTP, vault your MCC credentials and launch in minutes. Need self-hosted scale? Talk to Solutions Engineering.",
    points: [
      "2-step Email OTP + encrypted vault onboarding (/register)",
      "No checkout wall and no surprise billing cycles",
      "Dedicated Solutions Engineering for custom self-hosted scale",
    ],
  },
];

const CHIPS = [
  { label: "Cold Email Tool", x: -300, y: -70 },
  { label: "Funnel Builder", x: 300, y: -70 },
  { label: "SEO Crawler", x: -230, y: 80 },
  { label: "Reporting Portal", x: 230, y: 80 },
  { label: "Per-Seat Licences", x: 0, y: -125 },
];

function Chip({
  progress,
  label,
  x,
  y,
}: {
  progress: MotionValue<number>;
  label: string;
  x: number;
  y: number;
}) {
  const tx = useTransform(progress, [0.02, 0.3], [x, 0]);
  const ty = useTransform(progress, [0.02, 0.3], [y, 0]);
  const opacity = useTransform(progress, [0, 0.22, 0.32], [1, 1, 0]);
  const scale = useTransform(progress, [0.02, 0.32], [1, 0.4]);
  return (
    <motion.span
      style={{ x: tx, y: ty, opacity, scale }}
      className="absolute rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 font-mono text-[11px] text-rose-200 line-through decoration-rose-400/70"
    >
      {label}
    </motion.span>
  );
}

function Counter({
  progress,
  label,
  from,
  to,
  prefix = "",
  suffix = "",
}: {
  progress: MotionValue<number>;
  label: string;
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const value = useTransform(progress, [0.02, 0.32], [from, to]);
  const [shown, setShown] = useState(from);
  useMotionValueEvent(value, "change", (v) => setShown(Math.round(v)));
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-center">
      <p className="font-mono text-2xl font-extrabold text-white sm:text-3xl">
        {prefix}
        {shown}
        {suffix}
      </p>
      <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function ChapterCopy({
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
  const fadeIn = start + seg * 0.18;
  const fadeOut = start + seg * 0.82;
  const end = (index + 1) * seg;
  const first = index === 0;
  const last = index === total - 1;

  const opacity = useTransform(
    progress,
    first ? [0, 0.01, fadeOut, end] : last ? [start, fadeIn, 0.99, 1] : [start, fadeIn, fadeOut, end],
    first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, fadeIn, fadeOut, end], first ? [0, 0, 0, -20] : [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 mx-auto flex max-w-3xl flex-col items-center gap-3 text-center"
    >
      <span className="rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1 font-mono text-[11px] font-bold text-indigo-300">
        {chapter.act}
      </span>
      <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        {chapter.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">{chapter.subtitle}</p>
      <ul className="mt-1 flex flex-col gap-1.5 text-left text-xs text-zinc-200 sm:text-sm">
        {chapter.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PricingValueScrollStory() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });
  const coreScale = useTransform(smooth, [0.02, 0.32], [0.85, 1.12]);
  const coreGlow = useTransform(smooth, [0.02, 0.32], [0.15, 0.55]);
  const barWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={trackRef}
      aria-label="Workspace economics and BYOK value scroll story"
      className="relative h-[420vh] border-y border-zinc-800 bg-zinc-950 text-white"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-20 pb-6">
        <div className="mx-auto w-full max-w-5xl space-y-3 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="brand" dot>
              Where your agency spend goes
            </Badge>
            <span className="font-mono text-xs text-zinc-400">
              Zero subscription gate · 100% BYOK ownership
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              style={{ width: barWidth }}
              className="h-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400"
            />
          </div>
        </div>

        {/* Convergence stage */}
        <div className="relative mx-auto mt-4 flex h-[34%] w-full max-w-5xl items-center justify-center">
          {CHIPS.map((c) => (
            <Chip key={c.label} progress={smooth} {...c} />
          ))}
          <motion.div
            style={{ scale: coreScale }}
            className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-indigo-400/50 bg-indigo-500/20 font-mono text-xs font-bold text-indigo-100"
          >
            <motion.span
              aria-hidden
              style={{ opacity: coreGlow }}
              className="absolute inset-0 -z-10 rounded-3xl bg-indigo-500 blur-2xl"
            />
            OmniPulse
          </motion.div>
        </div>

        {/* Counters */}
        <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6">
          <Counter progress={smooth} label="Tools in your stack" from={5} to={1} />
          <Counter progress={smooth} label="Per-seat fees" from={100} to={0} suffix="%" />
          <Counter progress={smooth} label="API markup" from={100} to={0} suffix="%" />
          <Counter progress={smooth} label="Cards required" from={1} to={0} />
        </div>

        {/* Chapter copy */}
        <div className="relative mx-auto mt-5 w-full max-w-5xl flex-1 px-4 sm:px-6">
          {VALUE_CHAPTERS.map((ch, idx) => (
            <ChapterCopy
              key={ch.act}
              progress={scrollYProgress}
              index={idx}
              total={VALUE_CHAPTERS.length}
              chapter={ch}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
