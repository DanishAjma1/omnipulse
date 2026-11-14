"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { PHASES, RING_STEP, type PhaseMeta, type Progress } from "./phases";

const RADIUS = 300;

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

  // Place on the ring, then undo the ring rotation so the text always faces the camera.
  const transform = useTransform(
    theta,
    (t) => `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-(angle + t)}deg)`
  );

  // 1 when this card is in front, easing to 0 by ~60deg away.
  const active = useTransform(theta, (t) => {
    const d = Math.abs(offsetFromFront(angle, t));
    return Math.min(1, Math.max(0, 1 - (d - 20) / 40));
  });
  const scale = useTransform(active, (a) => 0.9 + 0.2 * a);
  const opacity = useTransform(active, (a) => 0.4 + 0.6 * a);
  const filter = useTransform(active, (a) => `blur(${((1 - a) * 3).toFixed(2)}px)`);
  const boxShadow = useTransform(
    active,
    (a) => `0 0 ${(44 * a).toFixed(1)}px rgba(99,102,241,${(0.55 * a).toFixed(2)})`
  );

  return (
    <motion.div style={{ transform }} className="absolute inset-0">
      <motion.article
        style={{ scale, opacity, filter, boxShadow }}
        className="flex h-full w-full flex-col justify-center rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-zinc-900 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-100"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {phase.eyebrow}
        </p>
        <h3 className="mt-1 text-base font-bold tracking-tight sm:text-lg">{phase.title}</h3>
        <p className="mt-1 hidden text-[11px] leading-snug text-zinc-600 dark:text-zinc-400 sm:block">
          {phase.body}
        </p>
      </motion.article>
    </motion.div>
  );
}

/** Top 30% of the sticky viewport: five text cards on a Y-axis ring. */
export function Revolver({ p }: { p: Progress }) {
  const theta = useTransform(p, ROTATION_INPUT, ROTATION_OUTPUT);

  return (
    <div className="relative flex h-[30%] w-full items-center justify-center [perspective:1000px]">
      <motion.div
        style={{ rotateY: theta, transformStyle: "preserve-3d" }}
        className="relative h-[clamp(96px,16vh,128px)] w-[min(200px,46vw)]"
      >
        {PHASES.map((phase, i) => (
          <RevolverCard key={phase.id} phase={phase} index={i} theta={theta} />
        ))}
      </motion.div>
    </div>
  );
}
