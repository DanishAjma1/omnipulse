"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Cursor, Scene, TypedText } from "./scene";
import type { Progress } from "./phases";

const ROAS_PATH = "M70 330 C140 320 170 270 230 255 S320 200 380 170 S470 120 520 110 S600 80 650 70";

/** Phase 2 [0.20 - 0.40]: login screen, then the client dashboard with a drawn ROAS line. */
export function PortalsPhase({ p }: { p: Progress }) {
  const loginScale = useTransform(p, [0.285, 0.3], [1, 0]);
  const loginOpacity = useTransform(p, [0.285, 0.3], [1, 0]);
  const loginPress = useTransform(p, [0.275, 0.28, 0.285], [1, 0.94, 1]);

  const dashScale = useTransform(p, [0.295, 0.32], [0, 1]);
  const dashOpacity = useTransform(p, [0.295, 0.31], [0, 1]);
  const roasDraw = useTransform(p, [0.31, 0.37], [0, 1]);
  const roasLabel = useTransform(p, [0.36, 0.375], [0, 1]);
  const cursorGone = useTransform(p, [0.285, 0.29], [1, 0]);

  const cursorX = useTransform(p, [0.2, 0.27], [120, 400]);
  const cursorY = useTransform(p, [0.2, 0.27], [60, 316]);

  return (
    <Scene label="Client portal login followed by a ROAS analytics dashboard">
      <rect width="800" height="450" rx="16" fill="#09090b" />

      {/* login screen */}
      <motion.g style={{ scale: loginScale, opacity: loginOpacity, ...BOX_ORIGIN }}>
        <rect x="250" y="80" width="300" height="290" rx="20" fill="#101014" stroke="#27272a" />
        <circle cx="400" cy="122" r="16" fill="#6366f1" />
        <text x="400" y="164" fill="#fafafa" fontSize="15" fontWeight="600" textAnchor="middle">
          Acme Client Portal
        </text>

        <text x="278" y="196" fill="#a1a1aa" fontSize="10">
          Email
        </text>
        <rect x="278" y="202" width="244" height="32" rx="8" fill="#18181b" stroke="#3f3f46" />
        <TypedText p={p} text="maya@acme.co" x={288} y={223} start={0.21} end={0.24} />

        <text x="278" y="258" fill="#a1a1aa" fontSize="10">
          Password
        </text>
        <rect x="278" y="264" width="244" height="32" rx="8" fill="#18181b" stroke="#3f3f46" />
        <TypedText p={p} text="••••••••••" x={288} y={286} start={0.24} end={0.265} />

        <motion.g style={{ scale: loginPress, ...BOX_ORIGIN }}>
          <rect x="278" y="316" width="244" height="36" rx="10" fill="#4f46e5" />
          <text x="400" y="339" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle">
            Login
          </text>
        </motion.g>
      </motion.g>

      {/* dashboard */}
      <motion.g style={{ scale: dashScale, opacity: dashOpacity, ...BOX_ORIGIN }}>
        <rect x="30" y="30" width="740" height="390" rx="18" fill="#0f0f13" stroke="#27272a" />
        <text x="56" y="64" fill="#fafafa" fontSize="14" fontWeight="600">
          Acme Co - Performance
        </text>
        <rect x="640" y="46" width="106" height="24" rx="12" fill="#064e3b" />
        <text x="693" y="62" fill="#6ee7b7" fontSize="10" textAnchor="middle">
          Read-only access
        </text>

        {[
          ["Spend", "$12.4k"],
          ["Conversions", "842"],
          ["ROAS", "4.8x"],
        ].map(([label, value], i) => (
          <g key={label}>
            <rect x={56 + i * 238} y="88" width="218" height="58" rx="12" fill="#18181b" />
            <text x={72 + i * 238} y="110" fill="#71717a" fontSize="10">
              {label}
            </text>
            <text x={72 + i * 238} y="134" fill="#fafafa" fontSize="18" fontWeight="600">
              {value}
            </text>
          </g>
        ))}

        <rect x="56" y="164" width="688" height="232" rx="14" fill="#101014" />
        {[200, 250, 300, 350].map((y) => (
          <line key={y} x1="56" x2="744" y1={y} y2={y} stroke="#27272a" />
        ))}
        <motion.path
          d={ROAS_PATH}
          fill="none"
          stroke="#818cf8"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: roasDraw, filter: "drop-shadow(0 0 6px rgba(129,140,248,0.8))" }}
        />
        <motion.g style={{ opacity: roasLabel }}>
          <circle cx="650" cy="70" r="5" fill="#a5b4fc" />
          <text x="618" y="196" fill="#a5b4fc" fontSize="12" fontWeight="600">
            ROAS 4.8x
          </text>
        </motion.g>
      </motion.g>

      <motion.g style={{ opacity: cursorGone }}>
        <motion.g style={{ x: cursorX, y: cursorY }}>
          <path
            d="M0 0 L0 18 L5 14 L9 22 L12 20.5 L8 13 L15 13 Z"
            fill="#ffffff"
            stroke="#09090b"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    </Scene>
  );
}

// Re-exported so scene helpers stay tree-shakable if the cursor is swapped later.
export { Cursor };
