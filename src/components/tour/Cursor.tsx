"use client";

import { motion, useTransform } from "framer-motion";
import type { Progress } from "./timeline";

/** SVG cursor whose position/press state is bound to scroll progress (design-space px). */
export function Cursor({ p }: { p: Progress }) {
  const stops = [0, 0.2, 0.25, 0.31, 0.42, 0.46, 0.5, 0.6];
  const x = useTransform(p, stops, [1180, 600, 600, 971, 520, 520, 32, 700]);
  const y = useTransform(p, stops, [760, 380, 380, 28, 420, 420, 140, 520]);
  const opacity = useTransform(p, [0, 0.02, 0.58, 0.62], [0, 1, 1, 0]);
  const press = useTransform(
    p,
    [0.31, 0.32, 0.33, 0.49, 0.5, 0.51],
    [1, 0.78, 1, 1, 0.78, 1]
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-40"
      style={{ x, y, opacity }}
    >
      <motion.svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        style={{ scale: press, transformOrigin: "2px 2px" }}
        className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
      >
        <path
          d="M3 2 L3 18.5 L7.6 14.6 L10.6 21.4 L13.2 20.2 L10.3 13.6 L16.4 13.2 Z"
          fill="#ffffff"
          stroke="#09090b"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
