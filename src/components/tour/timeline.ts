import { MotionValue, useTransform } from "framer-motion";

export type Progress = MotionValue<number>;

/** Design-space size (px) of the dashboard mockup. It is scaled to fit the viewport. */
export const DASH_W = 1100;
export const DASH_H = 680;

/** Scene boundaries on the scrollYProgress timeline. */
export const SCENES = {
  s1: [0, 0.25],
  s2: [0.25, 0.5],
  s3: [0.5, 0.75],
  s4: [0.75, 1],
} as const;

/** 0 -> 1 between a and b (clamped). */
export function useRamp(p: Progress, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1]);
}

/** 1 -> 0 between a and b (clamped). */
export function useRampOut(p: Progress, a: number, b: number) {
  return useTransform(p, [a, b], [1, 0]);
}

/** Fade in a->b, hold, fade out c->d. */
export function useWindow(p: Progress, a: number, b: number, c: number, d: number) {
  return useTransform(p, [a, b, c, d], [0, 1, 1, 0]);
}

/** Numeric counter rendered as text; usable directly as a motion child. */
export function useCounterText(
  p: Progress,
  a: number,
  b: number,
  max: number,
  decimals = 0
) {
  const value = useTransform(p, [a, b], [0, max]);
  return useTransform(value, (v) => v.toFixed(decimals));
}
