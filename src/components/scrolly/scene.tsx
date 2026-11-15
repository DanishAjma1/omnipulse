"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import type { Progress } from "./phases";

/** Keeps SVG transforms centred on the element's own box. */
export const BOX_ORIGIN = {
  transformBox: "fill-box",
  transformOrigin: "center",
} as const;

export const BOX_BOTTOM = {
  transformBox: "fill-box",
  transformOrigin: "bottom",
} as const;

/**
 * Layer opacity for one phase. Phases crossfade inside the last / first 0.02 of
 * their windows. All inputs stay within [0, 1] so scroll-linked animations are valid.
 */
export function usePhaseOpacity(p: Progress, start: number, end: number) {
  const first = start === 0;
  const last = end === 1;
  const input = first
    ? [0, end - 0.02, end]
    : last
      ? [start - 0.02, start, 1]
      : [start - 0.02, start, end - 0.02, end];
  const output = first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0];
  return useTransform(p, input, output);
}

export function PhaseLayer({
  p,
  start,
  end,
  children,
}: {
  p: Progress;
  start: number;
  end: number;
  children: ReactNode;
}) {
  const opacity = usePhaseOpacity(p, start, end);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 p-2 sm:p-4">
      {children}
    </motion.div>
  );
}

/** High-density 1120x620 drawing surface for crisp tables and multi-series charts. */
export function Scene({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 1120 620"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className="h-full w-full select-none"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

export function Cursor({
  p,
  x,
  y,
}: {
  p: Progress;
  x: [number[], number[]];
  y: [number[], number[]];
}) {
  const cx = useTransform(p, x[0], x[1]);
  const cy = useTransform(p, y[0], y[1]);
  return (
    <motion.g style={{ x: cx, y: cy }}>
      <path
        d="M0 0 L0 20 L5.5 15.5 L10 24 L13.5 22 L9 14 L17 14 Z"
        fill="#ffffff"
        stroke="#09090b"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

function TypedChar({ p, char, a, b }: { p: Progress; char: string; a: number; b: number }) {
  const opacity = useTransform(p, [a, b], [0, 1]);
  return <motion.tspan style={{ opacity }}>{char === " " ? "\u00a0" : char}</motion.tspan>;
}

/** Staggered character reveal across [start, end]. */
export function TypedText({
  p,
  text,
  x,
  y,
  start,
  end,
  fill = "#e4e4e7",
  size = 13,
}: {
  p: Progress;
  text: string;
  x: number;
  y: number;
  start: number;
  end: number;
  fill?: string;
  size?: number;
}) {
  const chars = text.split("");
  const step = (end - start - 0.002) / chars.length;
  return (
    <text x={x} y={y} fill={fill} fontSize={size} fontFamily="ui-monospace, monospace">
      {chars.map((char, i) => (
        <TypedChar
          key={`${char}-${i}`}
          p={p}
          char={char}
          a={start + step * i}
          b={start + step * i + 0.002}
        />
      ))}
    </text>
  );
}
