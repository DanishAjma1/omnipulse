"use client";

import { motion, useTransform } from "framer-motion";
import { Scene } from "./scene";
import type { Progress } from "./phases";

const RING_RADIUS = 54;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

const TASKS = [
  { title: "Missing canonical on /pricing", tag: "High", color: "#f43f5e", start: 0.48, end: 0.52 },
  { title: "LCP hero image > 2.5s", tag: "Medium", color: "#f59e0b", start: 0.51, end: 0.55 },
  { title: "JSON-LD schema validated", tag: "Passed", color: "#10b981", start: 0.54, end: 0.58 },
] as const;

function TaskRow({
  p,
  task,
  index,
}: {
  p: Progress;
  task: (typeof TASKS)[number];
  index: number;
}) {
  const x = useTransform(p, [task.start, task.end], [80, 0]);
  const opacity = useTransform(p, [task.start, task.end], [0, 1]);
  const y = 212 + index * 58;

  return (
    <motion.g style={{ x, opacity }}>
      <rect x="470" y={y} width="290" height="46" rx="10" fill="#121217" stroke="#27272a" />
      <circle cx="490" cy={y + 23} r="5" fill={task.color} />
      <text x="504" y={y + 27} fill="#e4e4e7" fontSize="11" fontWeight="500">
        {task.title}
      </text>
      <text
        x="744"
        y={y + 27}
        fill={task.color}
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        textAnchor="end"
      >
        {task.tag}
      </text>
    </motion.g>
  );
}

/** Phase 3 [0.40 - 0.60]: wireframe browser scan, 0->95 score ring, and sliding task cards. */
export function SeoPhase({ p }: { p: Progress }) {
  // Horizontal scanner sweeps top-to-bottom across the browser frame (y: 82 -> 384).
  const scanY = useTransform(p, [0.41, 0.56], [82, 384]);
  const scanOpacity = useTransform(p, [0.405, 0.42, 0.56, 0.58], [0, 1, 1, 0]);

  // Circular progress ring fills 0 -> 95% of circumference.
  const dashOffset = useTransform(p, [0.42, 0.56], [RING_CIRC, RING_CIRC * (1 - 0.95)]);
  const scoreValue = useTransform(p, [0.42, 0.56], [0, 95]);
  const scoreText = useTransform(scoreValue, (v) => `${Math.round(v)}`);

  return (
    <Scene label="SEO auditing scanner sweeping a browser wireframe and scoring 95">
      <rect width="800" height="450" rx="16" fill="#09090b" />

      {/* Left: Wireframe Browser */}
      <rect x="36" y="36" width="404" height="378" rx="14" fill="#0f0f13" stroke="#27272a" />
      {/* Browser chrome */}
      <rect x="36" y="36" width="404" height="38" rx="14" fill="#18181b" />
      <circle cx="58" cy="55" r="5" fill="#f43f5e" />
      <circle cx="74" cy="55" r="5" fill="#f59e0b" />
      <circle cx="90" cy="55" r="5" fill="#10b981" />
      <rect x="114" y="45" width="240" height="20" rx="6" fill="#09090b" />
      <text x="126" y="59" fill="#a1a1aa" fontSize="10" fontFamily="ui-monospace, monospace">
        https://acme.co/landing
      </text>

      {/* Wireframe blocks inside browser */}
      <rect x="58" y="94" width="140" height="16" rx="4" fill="#27272a" />
      <rect x="58" y="120" width="360" height="84" rx="10" fill="#14141a" stroke="#27272a" />
      <rect x="74" y="138" width="210" height="14" rx="4" fill="#3f3f46" />
      <rect x="74" y="160" width="160" height="10" rx="3" fill="#27272a" />
      <rect x="74" y="180" width="84" height="14" rx="4" fill="#4f46e5" />

      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect
            x={58 + col * 124}
            y="222"
            width="112"
            height="92"
            rx="8"
            fill="#14141a"
            stroke="#27272a"
          />
          <rect x={70 + col * 124} y="238" width="64" height="10" rx="3" fill="#3f3f46" />
          <rect x={70 + col * 124} y="256" width="88" height="8" rx="3" fill="#27272a" />
          <rect x={70 + col * 124} y="270" width="76" height="8" rx="3" fill="#27272a" />
        </g>
      ))}

      <rect x="58" y="330" width="360" height="58" rx="8" fill="#14141a" stroke="#27272a" />
      <rect x="74" y="346" width="190" height="10" rx="3" fill="#3f3f46" />
      <rect x="74" y="364" width="280" height="8" rx="3" fill="#27272a" />

      {/* Glowing horizontal scanner line */}
      <motion.g style={{ y: scanY, opacity: scanOpacity }}>
        <rect x="40" y="-18" width="396" height="18" fill="url(#seo-scan-glow)" />
        <line
          x1="40"
          x2="436"
          y1="0"
          y2="0"
          stroke="#22d3ee"
          strokeWidth="2.5"
          style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.95))" }}
        />
      </motion.g>

      <defs>
        <linearGradient id="seo-scan-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* Right top: Circular SEO health ring (0 -> 95) */}
      <rect x="470" y="36" width="290" height="156" rx="14" fill="#0f0f13" stroke="#27272a" />
      <g transform="translate(548, 114)">
        <circle r={RING_RADIUS} fill="none" stroke="#27272a" strokeWidth="10" />
        <motion.circle
          r={RING_RADIUS}
          fill="none"
          stroke="#10b981"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={RING_CIRC}
          transform="rotate(-90)"
          style={{
            strokeDashoffset: dashOffset,
            filter: "drop-shadow(0 0 6px rgba(16,185,129,0.65))",
          }}
        />
        <motion.text
          x="0"
          y="7"
          textAnchor="middle"
          fill="#fafafa"
          fontSize="24"
          fontWeight="700"
          fontFamily="ui-monospace, monospace"
        >
          {scoreText}
        </motion.text>
      </g>
      <text x="626" y="96" fill="#fafafa" fontSize="14" fontWeight="600">
        Technical Score
      </text>
      <text x="626" y="116" fill="#a1a1aa" fontSize="11">
        258 pages crawled
      </text>
      <text x="626" y="138" fill="#10b981" fontSize="11" fontFamily="ui-monospace, monospace">
        Core Web Vitals: Pass
      </text>

      {/* Right bottom: Sliding task cards */}
      {TASKS.map((task, i) => (
        <TaskRow key={task.title} p={p} task={task} index={i} />
      ))}
    </Scene>
  );
}
