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
    eyebrow: "01 · Zero Checkout Gate",
    title: "No Credit Card Capture or Day-8 Trial Traps",
    lead: "Evaluate on Live Accounts First.",
    body: "Provision your production workspace with email verification alone. There are no expiring 7-day trial timers, no pre-authorized cards on file, and zero surprise recurring charges.",
    visual: <ShieldVisual />,
  },
  {
    side: "right",
    eyebrow: "02 · Zero Media Tax",
    title: "0.00% Percentage Cut on Managed Ad Spend",
    lead: "Keep Every Basis Point of Retainer Margin.",
    body: "Whether your clients spend $3,000/month locally or $2,000,000/month across global markets, OmniPulse never charges a percentage of ad spend or throttles API sync frequency.",
    visual: <ServerVisual />,
  },
  {
    side: "left",
    eyebrow: "03 · Elastic Headcount",
    title: "Unrestricted Staff & Client Portal Scaling",
    lead: "Grow Operations Without Renegotiating Licenses.",
    body: "Onboard new media buyers as Managers and issue read-only reporting portals to every retainer client without triggering seat upgrades or per-client add-on invoices.",
    visual: <RdVisual />,
  },
  {
    side: "right",
    eyebrow: "04 · Sovereign Exit Rights",
    title: "Complete Data Portability & Self-Hosted Option",
    lead: "Zero Vendor Lock-In by Design.",
    body: "Your API keys, CRM contacts, XML sitemaps, and campaign structures belong to you—with a direct path to dedicated single-tenant or self-hosted source ownership whenever compliance demands it.",
    visual: <NeuralVisual />,
  },
];

/** Scroll-drawn commercial commitment spine on the Pricing page. */
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
            Commercial Fair-Billing Charter
          </Badge>
          <h2
            id="investment-title"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            Four Commercial Guarantees in Writing.
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Scroll the commitment spine to see how OmniPulse protects your
            agency&apos;s unit economics as your client roster compounds.
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
