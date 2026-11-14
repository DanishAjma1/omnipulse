"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Revolver } from "./Revolver";
import { PhaseLayer } from "./scene";
import { AdsPhase } from "./AdsPhase";
import { PortalsPhase } from "./PortalsPhase";
import { SeoPhase } from "./SeoPhase";
import { FunnelsPhase } from "./FunnelsPhase";
import { MailingPhase } from "./MailingPhase";

/**
 * Sticky Nested Scrollytelling:
 * - Master Track: <section className="h-[500vh]"> mapped to scrollYProgress (0..1)
 * - Sticky Viewport: top 30% 3D 5-card Revolver (72deg spacing) + bottom 70% w-10/12 Storyboard modal
 */
export function NestedScrollytelling() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
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

        {/* Top 30%: 3D Revolver */}
        <Revolver p={scrollYProgress} />

        {/* Bottom 70%: Storyboard Modal with strict w-10/12 constraint */}
        <div className="relative mx-auto h-[70%] w-10/12 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/70">
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
