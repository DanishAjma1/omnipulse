"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { InvestmentNode, type InvestmentNodeProps } from "./InvestmentNode";
import {
  NeuralVisual,
  RdVisual,
  ServerVisual,
  ShieldVisual,
} from "./investmentVisuals";

type NodeData = Omit<InvestmentNodeProps, "dotRef">;

const NODES: NodeData[] = [
  {
    side: "left",
    eyebrow: "01 · Zero-Knowledge Vault",
    title: "AES-256-GCM Credential Security",
    lead: "First-Party Key Ownership.",
    body: "Every Google Ads Developer Token, OAuth Refresh Token, and API secret is encrypted at rest inside your isolated tenant—with zero middleman token pooling.",
    visual: <ShieldVisual />,
  },
  {
    side: "right",
    eyebrow: "02 · Multi-Network Ad Ops",
    title: "Google MCC & Meta 3-Tier Studio",
    lead: "99.99% Sync Reliability.",
    body: "Discover child accounts across your MCC, synchronize rolling 30-day telemetry at 01:00 nightly, and launch Search RSAs, PMax Asset Groups, and Meta Ad Sets from one console.",
    visual: <ServerVisual />,
  },
  {
    side: "left",
    eyebrow: "03 · Conversion Architecture",
    title: "400vh+ Scroll-Story Funnel Studio",
    lead: "Deterministic Speed.",
    body: "Build long-form landing pages using Obsidian Command, Swiss Daylight Studio, and Velocity Matrix HUD templates—with 12 removable acts and 3 persistent Vercel Blob media slots.",
    visual: <RdVisual />,
  },
  {
    side: "right",
    eyebrow: "04 · Async Compute Pool",
    title: "Worker-Thread SEO & Resend Outreach",
    lead: "Proof-First Pipeline.",
    body: "Execute non-blocking Chromium/Cheerio site crawls, export drop-in XML sitemaps, and trigger p-limit(2) Resend cold outreach bursts backed by Svix HMAC webhooks.",
    visual: <NeuralVisual />,
  },
  {
    side: "left",
    eyebrow: "05 · Team Firewall",
    title: "Admin, Manager & Client Governance",
    lead: "Safe Operational Delegation.",
    body: "Add optional Manager logins for day-to-day campaigns, funnels, and outreach while strictly blocking access to sensitive settings, vaults, and cross-client financial deep-dives.",
    visual: <ShieldVisual />,
  },
  {
    side: "right",
    eyebrow: "06 · Retainer Multiplier",
    title: "Rationed White-Label Client Portals",
    lead: "Long-Term Client Trust.",
    body: "Grant every external Google or Meta ad client a clean, read-only reporting portal locked mathematically to their ClientAdAllocation scope.",
    visual: <ServerVisual />,
  },
];

/** Scroll-drawn pipeline with six architectural value nodes. */
export function InvestmentStory() {
  const list = useRef<HTMLDivElement>(null);
  const lastDot = useRef<HTMLDivElement>(null);
  const [lineH, setLineH] = useState(0);

  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 70%", "end 65%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const listEl = list.current;
    if (!listEl) return;
    const measure = () => {
      const dot = lastDot.current;
      if (!dot) return;
      const d = dot.getBoundingClientRect();
      const l = listEl.getBoundingClientRect();
      setLineH(d.top + d.height / 2 - l.top);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(listEl);
    return () => ro.disconnect();
  }, []);

  return (
    <section aria-labelledby="investment-title" className="relative w-full py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Badge variant="brand" className="mb-3">
            6-Pillar Architecture Pipeline
          </Badge>
          <h2
            id="investment-title"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            What Powers Every OmniPulse Workspace.
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Scroll down the spine to see how every engine inside the Agency
            Console compounds your team&apos;s output without adding headcount.
          </p>
        </div>

        <div ref={list} className="relative space-y-12 md:space-y-16">
          <svg
            aria-hidden
            width="4"
            height={lineH}
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-4 top-0 w-1 -translate-x-1/2 overflow-visible md:left-1/2"
          >
            <defs>
              <linearGradient
                id="pipelineGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path
              d="M2 0 V100"
              fill="none"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className="stroke-zinc-200 dark:stroke-white/10"
            />
            <motion.path
              d="M2 0 V100"
              fill="none"
              stroke="url(#pipelineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength,
                filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
              }}
            />
          </svg>

          {NODES.map((n, i) => (
            <InvestmentNode
              key={n.title}
              {...n}
              dotRef={i === NODES.length - 1 ? lastDot : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
