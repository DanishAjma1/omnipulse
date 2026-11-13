"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OrbitCard } from "./OrbitCard";
import { FunnelVisual, LockVisual, RadarVisual, RoasChart } from "./orbitVisuals";

const CARDS = [
  {
    angle: 0,
    eyebrow: "01 · Advertising",
    title: "Google Ads Engine",
    body: "Real-time Campaign, AdGroup, and Asset manipulation via API.",
    visual: <RoasChart />,
  },
  {
    angle: 90,
    eyebrow: "02 · Reporting",
    title: "White-Labeled Portals",
    body: "Secure, real-time read-only analytics for your clients.",
    visual: <LockVisual />,
  },
  {
    angle: 180,
    eyebrow: "03 · Organic",
    title: "SEO Auditing Hub",
    body: "Deep web-crawling, technical scoring, and automated task generation.",
    visual: <RadarVisual />,
  },
  {
    angle: 270,
    eyebrow: "04 · Growth",
    title: "AI Funnels & Outreach",
    body: "Automated email sequencing and CRM routing.",
    visual: <FunnelVisual />,
  },
];

/**
 * 300vh scroll track + sticky viewport. Scene rotateY is bound to scroll
 * progress; each card counter-rotates to stay facing the camera.
 */
export function ServiceOrbit() {
  const track = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  // Negative direction so cards arrive in order 01 -> 02 -> 03 -> 04.
  const theta = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={track}
      aria-label="Platform services"
      className="relative h-[300vh] bg-zinc-50 dark:bg-[#0A0A0A]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden pt-16 [perspective:1000px]">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[360px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-600/15"
        />
        <motion.div
          style={{ rotateY: theta }}
          className="relative h-[330px] w-[min(260px,52vw)] [transform-style:preserve-3d]"
        >
          {CARDS.map((c) => (
            <OrbitCard key={c.title} theta={theta} {...c} />
          ))}
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
        >
          Scroll to rotate
        </motion.p>
      </div>
    </section>
  );
}
