"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { InvestmentNode, type InvestmentNodeProps } from "./InvestmentNode";
import { NeuralVisual, RdVisual, ServerVisual, ShieldVisual } from "./investmentVisuals";

type NodeData = Omit<InvestmentNodeProps, "dotRef">;

const NODES: NodeData[] = [
  {
    side: "left",
    eyebrow: "The Foundation",
    title: "Enterprise Infrastructure",
    lead: "Rock-Solid Reliability.",
    body: "Your subscription maintains dedicated data pipelines to the Google Ads API and Custom CRM architectures, ensuring 99.99% uptime and zero latency during heavy client reporting.",
    visual: <ServerVisual />,
  },
  {
    side: "right",
    eyebrow: "The Brain",
    title: "AI Compute & Crawling",
    lead: "Raw Processing Power.",
    body: "We route a portion of your tier directly into heavy-duty compute tasks—powering the AI funnel sequencers and executing deep-crawling SEO audits across your clients' domains.",
    visual: <NeuralVisual />,
  },
  {
    side: "left",
    eyebrow: "The Edge",
    title: "Continuous R&D",
    lead: "Future-Proofing Your Agency.",
    body: "We actively reinvest into feature development. When Google Ads updates an algorithm or changes an API endpoint, our engineers have already patched it. You get a platform that evolves daily.",
    visual: <RdVisual />,
  },
  {
    side: "right",
    eyebrow: "The Multiplier",
    title: "Client Retention",
    lead: "Your ROI.",
    body: "Ultimately, your investment buys time and trust. By offering white-labeled, password-protected portals and real-time ROAS charts, you secure long-term retainers and scale without hiring overhead.",
    visual: <ShieldVisual />,
  },
];

/** Scroll-drawn pipeline with four bento value nodes. */
export function InvestmentStory() {
  const list = useRef<HTMLDivElement>(null);
  const lastDot = useRef<HTMLDivElement>(null);
  const [lineH, setLineH] = useState(0);

  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 70%", "end 65%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Stop the pipeline exactly at the centre of the final node's dot.
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
          <h2
            id="investment-title"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            The Anatomy of Your Investment.
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            You aren&apos;t buying software. You&apos;re funding your agency&apos;s growth engine.
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
              <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22d3ee" />
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
              style={{ pathLength, filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))" }}
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
