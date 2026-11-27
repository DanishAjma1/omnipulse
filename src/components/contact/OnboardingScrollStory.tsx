"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CheckCircle2, KeyRound, MailCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const ONBOARDING_STEPS = [
  {
    minute: "MINUTE 00:00 → 01:00",
    title: "Instant Email OTP & Tenant Provisioning",
    description:
      "Verify your work email with a 6-digit Resend code. OmniPulse provisions an isolated PostgreSQL tenant with strict role-based boundaries in milliseconds.",
    checklist: [
      "Zero infrastructure setup or DevOps scripts",
      "Isolated tenant UUID created automatically",
      "Ready for solo founders or multi-manager teams",
    ],
  },
  {
    minute: "MINUTE 01:00 → 03:00",
    title: "Zero-Knowledge MCC & Developer Token Vault",
    description:
      "Connect your 10-digit Google Ads MCC ID, Developer Token, and OAuth consent. Every secret is encrypted immediately at rest via AES-256-GCM.",
    checklist: [
      "Strict Zod format validation prevents typo errors",
      "On-demand Google OAuth token refresh",
      "Full first-party data & credential ownership",
    ],
  },
  {
    minute: "MINUTE 03:00 → 05:00",
    title: "Child Accounts Synced & First Client Portal Live",
    description:
      "Discover every child Google Ads account under your MCC, launch your first 400vh+ Scroll-Story Funnel, and grant rationed portal logins to clients.",
    checklist: [
      "3-Tier Campaign → Ad Group → Ad visibility",
      "White-label client portals scoped via ClientAdAllocation",
      "2-hour engineering SLA if you need custom migration help",
    ],
  },
];

function MilestoneSlide({
  progress,
  index,
  total,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  step: (typeof ONBOARDING_STEPS)[number];
}) {
  const seg = 1 / total;
  const start = index * seg;
  const fadeIn = start + seg * 0.18;
  const fadeOut = start + seg * 0.82;
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

  const icons = [MailCheck, KeyRound, Zap];
  const Icon = icons[index] ?? Zap;

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex flex-col justify-center p-6 sm:p-12 max-w-4xl mx-auto text-center items-center space-y-5"
    >
      <div className="h-14 w-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
        <Icon className="w-7 h-7" />
      </div>

      <span className="px-3.5 py-1 rounded-full font-mono text-xs font-bold bg-zinc-900 border border-zinc-700 text-cyan-400">
        {step.minute}
      </span>

      <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
        {step.title}
      </h3>

      <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
        {step.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-3 text-left">
        {step.checklist.map((c) => (
          <div
            key={c}
            className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-2 text-xs text-zinc-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function OnboardingScrollStory() {
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
      aria-label="5-minute onboarding scroll story"
      className="relative h-[300vh] bg-zinc-950 text-white border-t border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="success" dot>
              5-Minute Deployment Timeline
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              Self-Serve Onboarding or White-Glove Solutions Migration
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width: barWidth }}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        <div className="relative max-w-5xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {ONBOARDING_STEPS.map((step, idx) => (
              <MilestoneSlide
                key={step.minute}
                progress={scrollYProgress}
                index={idx}
                total={ONBOARDING_STEPS.length}
                step={step}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
