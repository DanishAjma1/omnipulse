"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Scene } from "./scene";
import type { Progress } from "./phases";

const PATH_1 = "M 230 225 C 275 140, 295 140, 340 225";
const PATH_2 = "M 460 225 C 505 310, 525 310, 570 225";

const NODES = [
  {
    title: "Traffic",
    subtitle: "Google & Meta Ads",
    metric: "48.2k visits",
    x: 110,
    color: "#6366f1",
    range: [0.6, 0.64] as const,
  },
  {
    title: "Lead",
    subtitle: "AI Funnel Capture",
    metric: "6,410 qualified",
    x: 340,
    color: "#22d3ee",
    range: [0.64, 0.68] as const,
  },
  {
    title: "Convert",
    subtitle: "Closed Won CRM",
    metric: "$142k pipeline",
    x: 570,
    color: "#10b981",
    range: [0.68, 0.72] as const,
  },
] as const;

function FunnelNode({
  p,
  node,
}: {
  p: Progress;
  node: (typeof NODES)[number];
}) {
  const opacity = useTransform(p, [node.range[0], node.range[1]], [0, 1]);
  const scale = useTransform(p, [node.range[0], node.range[1]], [0.86, 1]);

  return (
    <motion.g style={{ opacity, scale, ...BOX_ORIGIN }}>
      <rect
        x={node.x}
        y="165"
        width="120"
        height="120"
        rx="20"
        fill="#101015"
        stroke={node.color}
        strokeWidth="2"
      />
      <circle cx={node.x + 28} cy="196" r="8" fill={node.color} />
      <text x={node.x + 18} y="228" fill="#fafafa" fontSize="15" fontWeight="700">
        {node.title}
      </text>
      <text x={node.x + 18} y="246" fill="#a1a1aa" fontSize="10">
        {node.subtitle}
      </text>
      <text
        x={node.x + 18}
        y="268"
        fill={node.color}
        fontSize="11"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
      >
        {node.metric}
      </text>
    </motion.g>
  );
}

/**Cubic bezier evaluation so SVG circle pulses travel cleanly along the curve in all browsers.*/
function cubicPoint(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): [number, number] {
  const u = 1 - t;
  const x =
    u * u * u * p0[0] +
    3 * u * u * t * p1[0] +
    3 * u * t * t * p2[0] +
    t * t * t * p3[0];
  const y =
    u * u * u * p0[1] +
    3 * u * u * t * p1[1] +
    3 * u * t * t * p2[1] +
    t * t * t * p3[1];
  return [x, y];
}

function FlowDot({
  p,
  start,
  end,
  curve,
  color,
}: {
  p: Progress;
  start: number;
  end: number;
  curve: [[number, number], [number, number], [number, number], [number, number]];
  color: string;
}) {
  const t = useTransform(p, [start, end], [0, 1]);
  const cx = useTransform(t, (v) => cubicPoint(v, curve[0], curve[1], curve[2], curve[3])[0]);
  const cy = useTransform(t, (v) => cubicPoint(v, curve[0], curve[1], curve[2], curve[3])[1]);
  const offsetDistance = useTransform(t, (v) => `${(v * 100).toFixed(1)}%`);
  const opacity = useTransform(p, [start, start + 0.01, end - 0.01, end], [0, 1, 1, 0]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="6"
      fill={color}
      style={{
        opacity,
        offsetDistance,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
    />
  );
}

/** Phase 4 [0.60 - 0.80]: 3 funnel nodes, bezier connecting lines, and flowing traffic circles. */
export function FunnelsPhase({ p }: { p: Progress }) {
  const line1 = useTransform(p, [0.65, 0.72], [0, 1]);
  const line2 = useTransform(p, [0.69, 0.76], [0, 1]);

  return (
    <Scene label="AI funnel connecting Traffic, Lead, and Convert nodes with live flow">
      <rect width="800" height="450" rx="16" fill="#09090b" />

      <text x="400" y="68" fill="#fafafa" fontSize="16" fontWeight="700" textAnchor="middle">
        Autonomous Funnel Sequencer
      </text>
      <text x="400" y="90" fill="#a1a1aa" fontSize="11" textAnchor="middle">
        Real-time attribution &amp; automated lead routing
      </text>

      {/* Background guide bezier paths */}
      <path d={PATH_1} fill="none" stroke="#27272a" strokeWidth="3" strokeDasharray="5 5" />
      <path d={PATH_2} fill="none" stroke="#27272a" strokeWidth="3" strokeDasharray="5 5" />

      {/* Animated bezier connecting paths */}
      <motion.path
        d={PATH_1}
        fill="none"
        stroke="#6366f1"
        strokeWidth="3.5"
        strokeLinecap="round"
        style={{ pathLength: line1, filter: "drop-shadow(0 0 8px rgba(99,102,241,0.75))" }}
      />
      <motion.path
        d={PATH_2}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3.5"
        strokeLinecap="round"
        style={{ pathLength: line2, filter: "drop-shadow(0 0 8px rgba(34,211,238,0.75))" }}
      />

      {/* Flowing traffic circles along the bezier paths */}
      <FlowDot
        p={p}
        start={0.67}
        end={0.77}
        curve={[
          [230, 225],
          [275, 140],
          [295, 140],
          [340, 225],
        ]}
        color="#818cf8"
      />
      <FlowDot
        p={p}
        start={0.7}
        end={0.79}
        curve={[
          [230, 225],
          [275, 140],
          [295, 140],
          [340, 225],
        ]}
        color="#a5b4fc"
      />
      <FlowDot
        p={p}
        start={0.71}
        end={0.795}
        curve={[
          [460, 225],
          [505, 310],
          [525, 310],
          [570, 225],
        ]}
        color="#22d3ee"
      />
      <FlowDot
        p={p}
        start={0.735}
        end={0.8}
        curve={[
          [460, 225],
          [505, 310],
          [525, 310],
          [570, 225],
        ]}
        color="#34d399"
      />

      {/* 3 Funnel stage nodes */}
      {NODES.map((node) => (
        <FunnelNode key={node.title} p={p} node={node} />
      ))}

      {/* Bottom conversion summary bar */}
      <rect x="190" y="348" width="420" height="44" rx="12" fill="#101015" stroke="#27272a" />
      <text x="400" y="375" fill="#e4e4e7" fontSize="12" fontFamily="ui-monospace, monospace" textAnchor="middle">
        13.3% Visitor → Lead · 28.4% Lead → Customer
      </text>
    </Scene>
  );
}
