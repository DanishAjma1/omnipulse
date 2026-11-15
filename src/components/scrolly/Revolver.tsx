"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { PHASES, RING_STEP, type PhaseMeta, type Progress } from "./phases";

const RADIUS = 260;

// Rotation holds on each card, then swings to the next one around the phase
// boundaries (0.2 / 0.4 / 0.6 / 0.8). Every input stays inside [0, 1].
const ROTATION_INPUT = [0, 0.17, 0.23, 0.37, 0.43, 0.57, 0.63, 0.77, 0.83, 1];
const ROTATION_OUTPUT = [0, 0, -72, -72, -144, -144, -216, -216, -288, -288];

/** Signed shortest angular distance (-180..180) from the camera-facing slot. */
function offsetFromFront(angle: number, theta: number) {
  return ((((angle + theta) % 360) + 540) % 360) - 180;
}

function RevolverCard({
  phase,
  index,
  theta,
}: {
  phase: PhaseMeta;
  index: number;
  theta: MotionValue<number>;
}) {
  const angle = index * RING_STEP;

  // Parent ring is shifted back by -RADIUS, so the active front card sits at Z = 0
  // (exact 1:1 pixel ratio — zero perspective magnification blur).
  const transform = useTransform(
    theta,
    (t) =>
      `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-(angle + t)}deg)`
  );

  // 1 when this card is in front, easing to 0 by ~55deg away.
  const active = useTransform(theta, (t) => {
    const d = Math.abs(offsetFromFront(angle, t));
    return Math.min(1, Math.max(0, 1 - (d - 14) / 42));
  });

  const opacity = useTransform(active, (a) => (a > 0.88 ? 1 : 0.38 + 0.55 * a));
  // CRITICAL: return "none" when active so the browser completely disables the CSS filter
  // rasterization pipeline on the front card and renders text at native subpixel sharpness.
  const filter = useTransform(active, (a) =>
    a > 0.88 ? "none" : `blur(${((1 - a) * 2.4).toFixed(2)}px)`
  );
  const borderColor = useTransform(active, (a) =>
    a > 0.88 ? "rgba(99, 102, 241, 0.85)" : "rgba(161, 161, 170, 0.22)"
  );
  const boxShadow = useTransform(active, (a) =>
    a > 0.88
      ? "0 0 0 1px rgba(99,102,241,0.5), 0 14px 36px -6px rgba(79,70,229,0.45)"
      : "0 4px 12px rgba(0,0,0,0.12)"
  );

  return (
    <motion.div
      style={{ transform, zIndex: useTransform(active, (a) => Math.round(a * 20)) }}
      className="absolute inset-0 [backface-visibility:hidden]"
    >
      <motion.article
        style={{ opacity, filter, borderColor, boxShadow }}
        className="flex h-full w-full flex-col justify-center rounded-2xl border-2 bg-white px-5 py-3 text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {phase.eyebrow}
          </p>
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
        </div>
        <h3 className="mt-1 text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
          {phase.title}
        </h3>
        <p className="mt-1 hidden text-xs font-medium leading-snug text-zinc-600 dark:text-zinc-300 sm:block">
          {phase.body}
        </p>
      </motion.article>
    </motion.div>
  );
}

/** Top 26% of the sticky viewport: five razor-sharp cards on a Y-axis ring. */
export function Revolver({ p }: { p: Progress }) {
  const theta = useTransform(p, ROTATION_INPUT, ROTATION_OUTPUT);
  const ringTransform = useTransform(
    theta,
    (t) => `translateZ(-${RADIUS}px) rotateY(${t}deg)`
  );

  return (
    <div className="relative flex h-[25%] w-full items-center justify-center [perspective:1400px]">
      <motion.div
        style={{ transform: ringTransform, transformStyle: "preserve-3d" }}
        className="relative h-[108px] w-[min(272px,62vw)] sm:h-[118px]"
      >
        {PHASES.map((phase, i) => (
          <RevolverCard key={phase.id} phase={phase} index={i} theta={theta} />
        ))}
      </motion.div>
    </div>
  );
}
