"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

export const ORBIT_RADIUS = 400;

interface OrbitCardProps {
  /** Base angle on the orbit (0/90/180/270). */
  angle: number;
  /** Scene rotateY in degrees (the same MotionValue that rotates the scene). */
  theta: MotionValue<number>;
  title: string;
  body: string;
  eyebrow: string;
  visual: ReactNode;
}

/** Signed shortest angular distance (-180..180) from the camera-facing slot. */
function offsetFromFront(angle: number, theta: number) {
  return ((((angle + theta) % 360) + 540) % 360) - 180;
}

export function OrbitCard({ angle, theta, title, body, eyebrow, visual }: OrbitCardProps) {
  // rotateY(angle) translateZ(R) places the card on the ring; the trailing
  // rotateY(-(angle + theta)) = scene counter-rotation + undoing its own base
  // angle, so the card always faces the camera.
  const transform = useTransform(
    theta,
    (t) => `rotateY(${angle}deg) translateZ(${ORBIT_RADIUS}px) rotateY(${-(angle + t)}deg)`
  );

  // 1 when the card is the front/active one, easing to 0 beyond ~70deg.
  const active = useTransform(theta, (t) => {
    const d = Math.abs(offsetFromFront(angle, t));
    return Math.min(1, Math.max(0, 1 - (d - 20) / 50));
  });
  const opacity = useTransform(active, (a) => 0.4 + 0.6 * a);
  const filter = useTransform(active, (a) => `blur(${((1 - a) * 3).toFixed(2)}px)`);

  return (
    <motion.div
      style={{ transform }}
      className="absolute inset-0 [backface-visibility:hidden]"
    >
      <motion.article
        style={{ opacity, filter }}
        className="group flex h-full w-full flex-col justify-between rounded-3xl border border-zinc-200 bg-white/80 p-6 text-zinc-900 shadow-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:scale-105 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/25 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-100"
      >
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>
        </div>
        <div className="mt-4 h-24 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-black/30">
          {visual}
        </div>
      </motion.article>
    </motion.div>
  );
}
