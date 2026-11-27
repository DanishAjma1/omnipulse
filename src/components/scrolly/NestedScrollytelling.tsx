"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Revolver } from "./Revolver";
import { PhaseLayer } from "./scene";
import { AdsPhase } from "./AdsPhase";
import { PortalsPhase } from "./PortalsPhase";
import { SeoPhase } from "./SeoPhase";
import { FunnelsPhase } from "./FunnelsPhase";
import { MailingPhase } from "./MailingPhase";

const PHASE_LABELS = ["Ads", "Portals", "SEO", "Funnels", "Mailing"] as const;

/**
 * Sticky Nested Scrollytelling (PLATFORM story — "Service architecture tour"):
 * - Master Track: <section className="h-[500vh]"> mapped to scrollYProgress (0..1)
 * - Sticky Viewport: top 3D 5-card Revolver (72deg spacing) + bottom w-10/12 Storyboard modal
 * - Phase HUD: side rail showing which of the five services is currently on stage
 */
export function NestedScrollytelling() {
  const trackRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PHASE_LABELS.length - 1, Math.max(0, Math.floor(v * PHASE_LABELS.length)));
    setPhase((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section
      ref={trackRef}
      aria-label="Interactive service architecture tour"
      className="relative h-[500vh] bg-zinc-50 dark:bg-[#0A0A0A]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden pt-12 pb-6">
        {/* Ambient radial backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px] dark:bg-indigo-600/15"
        />

        {/* Phase HUD */}
        <ol
          aria-label="Service phases"
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
        >
          {PHASE_LABELS.map((label, i) => (
            <li
              key={label}
              className={`flex items-center justify-end gap-2 font-mono text-[11px] transition-colors ${
                i === phase ? "font-bold text-indigo-500 dark:text-indigo-300" : "text-zinc-400 dark:text-zinc-600"
              }`}
            >
              {label}
              <span
                className={`h-2.5 w-2.5 rounded-full border transition-all ${
                  i === phase
                    ? "scale-125 border-indigo-500 bg-indigo-500"
                    : i < phase
                      ? "border-emerald-500 bg-emerald-500/60"
                      : "border-zinc-400 dark:border-zinc-700"
                }`}
              />
            </li>
          ))}
        </ol>


        {/* Top: 3D Revolver (Front card sits at Z=0 with filter:none for razor-sharp text) */}
        <Revolver p={scrollYProgress} />

        {/* Bottom: Storyboard Modal with strict w-10/12 constraint */}
        <div className="relative mx-auto h-[74%] w-10/12 overflow-hidden rounded-3xl border border-zinc-300/90 bg-zinc-950 shadow-2xl dark:border-white/15">
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
