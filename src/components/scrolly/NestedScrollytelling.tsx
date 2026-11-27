"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { Revolver } from "./Revolver";
import { PhaseLayer } from "./scene";
import { AdsPhase } from "./AdsPhase";
import { PortalsPhase } from "./PortalsPhase";
import { SeoPhase } from "./SeoPhase";
import { FunnelsPhase } from "./FunnelsPhase";
import { MailingPhase } from "./MailingPhase";

const SIGNAL_BUS = [
  {
    short: "Ads Engine",
    ingress: "Google MCC + Meta Graph",
    engine: "GAQL & 3-Tier Mutate",
    egress: "Live ROAS & Budget Guard",
  },
  {
    short: "Client Portals",
    ingress: "ClientAdAllocation Scope",
    engine: "CNAME White-Label View",
    egress: "Read-Only Retainer Report",
  },
  {
    short: "SEO Crawler",
    ingress: "Target Domain URL",
    engine: "Worker-Thread DOM Audit",
    egress: "Health Score + sitemap.xml",
  },
  {
    short: "Funnel Studio",
    ingress: "12-Act AST + Blob Media",
    engine: "Deterministic Compiler",
    egress: "Edge-Cached /f/:funnelId",
  },
  {
    short: "Outreach Engine",
    ingress: "Segmented Lead Cohort",
    engine: "p-limit(2) Resend Dispatch",
    egress: "Svix Open/Click Stream",
  },
] as const;

/**
 * PLATFORM SCROLL STORY (Part 1) — Philosophy: "3D Cylindrical Revolver + Live Telemetry Signal Bus"
 * - 3D Y-axis rotating card ring at top paired with interactive SVG product telemetry below
 * - Clickable Signal Bus pill switcher jumps directly to any engine phase along the 500vh track
 */
export function NestedScrollytelling() {
  const trackRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      SIGNAL_BUS.length - 1,
      Math.max(0, Math.floor(v * SIGNAL_BUS.length))
    );
    setPhase((prev) => (prev === idx ? prev : idx));
  });

  const jumpToPhase = (idx: number) => {
    const el = trackRef.current;
    if (!el || typeof window === "undefined") return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const targetProgress = (idx + 0.08) / SIGNAL_BUS.length;
    window.scrollTo({
      top: sectionTop + scrollable * targetProgress,
      behavior: "smooth",
    });
  };

  const activeSignal = SIGNAL_BUS[phase];

  return (
    <section
      ref={trackRef}
      aria-label="Interactive platform telemetry revolver"
      className="relative h-[500vh] bg-zinc-50 dark:bg-[#0A0A0A]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden pt-16 pb-5">
        {/* Ambient radial backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px] dark:bg-indigo-600/15"
        />

        {/* Interactive Signal Bus Header */}
        <div className="z-20 mx-auto flex w-10/12 flex-wrap items-center justify-between gap-2 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white/85 dark:bg-zinc-900/85 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {SIGNAL_BUS.map((item, i) => (
              <button
                key={item.short}
                type="button"
                onClick={() => jumpToPhase(i)}
                className={`rounded-xl px-3 py-1 font-mono text-[11px] transition-all whitespace-nowrap ${
                  i === phase
                    ? "bg-indigo-600 font-bold text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                0{i + 1} · {item.short}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>{activeSignal.ingress}</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-300">
              {activeSignal.engine}
            </span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
            <span className="text-emerald-600 dark:text-emerald-400">
              {activeSignal.egress}
            </span>
          </div>
        </div>

        {/* Top: 3D Revolver (Front card sits at Z=0 with filter:none for razor-sharp text) */}
        <Revolver p={scrollYProgress} />

        {/* Bottom: Live Animated Product Dashboard Viewport */}
        <div className="relative mx-auto h-[68%] w-10/12 overflow-hidden rounded-3xl border border-zinc-300/90 bg-zinc-950 shadow-2xl dark:border-white/15">
          <PhaseLayer p={scrollYProgress} start={0} end={0.2}>
            <AdsPhase p={scrollYProgress} />
          </PhaseLayer>
          <PhaseLayer p={scrollYProgress} start={0.2} end={0.4}>
            <PortalsPhase p={scrollYProgress} />
          </PhaseLayer>
          <PhaseLayer p={scrollYProgress} start={0.4} end={0.6}>
            <SeoPhase p={scrollYProgress} />
          </PhaseLayer>
          <PhaseLayer p={scrollYProgress} start={0.6} end={0.8}>
            <FunnelsPhase p={scrollYProgress} />
          </PhaseLayer>
          <PhaseLayer p={scrollYProgress} start={0.8} end={1}>
            <MailingPhase p={scrollYProgress} />
          </PhaseLayer>
        </div>
      </div>
    </section>
  );
}
