"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Scene } from "./scene";
import type { Progress } from "./phases";

const PATH_1 = "M 328 190 C 378 118, 412 118, 462 190";
const PATH_2 = "M 658 190 C 708 262, 742 262, 792 190";

const NODES = [
  {
    title: "Traffic",
    subtitle: "Google PMax, RSA & Meta",
    metric: "148,920 sessions",
    subMetric: "CTR 6.83% · CPC $1.37",
    x: 132,
    color: "#6366f1",
    range: [0.6, 0.64] as const,
  },
  {
    title: "Lead",
    subtitle: "AI Funnel & Intent Router",
    metric: "19,810 qualified",
    subMetric: "13.3% conv · <80ms webhook",
    x: 462,
    color: "#22d3ee",
    range: [0.64, 0.68] as const,
  },
  {
    title: "Convert",
    subtitle: "Closed Won & Stripe CRM",
    metric: "$412,800 revenue",
    subMetric: "28.4% close · ROAS 5.9x",
    x: 792,
    color: "#10b981",
    range: [0.68, 0.72] as const,
  },
] as const;

const COHORT_ROWS = [
  ["Google PMax — Retail Feed", "68,420", "9,440 (13.8%)", "2,812 (29.8%)", "$95.01", "$214,600", "6.42x"],
  ["Google Search — High Intent RSA", "42,190", "6,118 (14.5%)", "1,890 (30.9%)", "$84.20", "$136,400", "5.88x"],
  ["Demand Gen — Lookalike Video", "24,800", "2,752 (11.1%)", "640 (23.3%)", "$112.40", "$41,200", "4.15x"],
  ["Meta Retargeting — Dynamic Catalog", "13,510", "1,500 (11.1%)", "418 (27.9%)", "$78.90", "$20,600", "5.12x"],
] as const;

function FunnelNode({
  p,
  node,
}: {
  p: Progress;
  node: (typeof NODES)[number];
}) {
  const opacity = useTransform(p, [node.range[0], node.range[1]], [0, 1]);
  const scale = useTransform(p, [node.range[0], node.range[1]], [0.88, 1]);

  return (
    <motion.g style={{ opacity, scale, ...BOX_ORIGIN }}>
      <rect
        x={node.x}
        y="124"
        width="196"
        height="132"
        rx="16"
        fill="#121218"
        stroke={node.color}
        strokeWidth="2"
      />
      <circle cx={node.x + 24} cy="152" r="7" fill={node.color} />
      <text x={node.x + 38} y="157" fill="#fafafa" fontSize="15" fontWeight="800">
        {node.title}
      </text>
      <text x={node.x + 20} y="180" fill="#a1a1aa" fontSize="11">
        {node.subtitle}
      </text>
      <text
        x={node.x + 20}
        y="212"
        fill={node.color}
        fontSize="15"
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
      >
        {node.metric}
      </text>
      <text
        x={node.x + 20}
        y="234"
        fill="#d4d4d8"
        fontSize="10.5"
        fontFamily="ui-monospace, monospace"
      >
        {node.subMetric}
      </text>
    </motion.g>
  );
}

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
      r="6.5"
      fill={color}
      style={{
        opacity,
        offsetDistance,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
    />
  );
}

/** Phase 4 [0.60 - 0.80]: 3 funnel nodes, bezier connecting lines, flowing traffic dots, and multi-channel attribution table. */
export function FunnelsPhase({ p }: { p: Progress }) {
  const line1 = useTransform(p, [0.64, 0.71], [0, 1]);
  const line2 = useTransform(p, [0.68, 0.75], [0, 1]);
  const tableOpacity = useTransform(p, [0.66, 0.72], [0, 1]);

  return (
    <Scene label="AI Funnel attribution pipeline and multi-channel cohort conversion table">
      <rect width="1120" height="620" rx="14" fill="#09090b" />

      {/* Header */}
      <text x="44" y="54" fill="#fafafa" fontSize="18" fontWeight="800">
        AI Funnel Sequencer &amp; Multi-Touch Attribution
      </text>
      <text x="44" y="76" fill="#a1a1aa" fontSize="11.5">
        Real-time click-to-close telemetry across Google Ads, Meta &amp; AI landing page variants
      </text>
      <rect x="896" y="34" width="180" height="30" rx="8" fill="#18181f" stroke="#27272a" />
      <text x="986" y="53" fill="#22d3ee" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="middle">
        ● 4,812 Active Sessions
      </text>

      {/* Guide & animated bezier connecting lines */}
      <path d={PATH_1} fill="none" stroke="#27272a" strokeWidth="3.5" strokeDasharray="6 6" />
      <path d={PATH_2} fill="none" stroke="#27272a" strokeWidth="3.5" strokeDasharray="6 6" />

      <motion.path
        d={PATH_1}
        fill="none"
        stroke="#6366f1"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ pathLength: line1, filter: "drop-shadow(0 0 8px rgba(99,102,241,0.75))" }}
      />
      <motion.path
        d={PATH_2}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ pathLength: line2, filter: "drop-shadow(0 0 8px rgba(34,211,238,0.75))" }}
      />

      {/* Flowing traffic circles along bezier paths */}
      <FlowDot
        p={p}
        start={0.66}
        end={0.76}
        curve={[
          [328, 190],
          [378, 118],
          [412, 118],
          [462, 190],
        ]}
        color="#818cf8"
      />
      <FlowDot
        p={p}
        start={0.69}
        end={0.785}
        curve={[
          [328, 190],
          [378, 118],
          [412, 118],
          [462, 190],
        ]}
        color="#a5b4fc"
      />
      <FlowDot
        p={p}
        start={0.7}
        end={0.79}
        curve={[
          [658, 190],
          [708, 262],
          [742, 262],
          [792, 190],
        ]}
        color="#22d3ee"
      />
      <FlowDot
        p={p}
        start={0.725}
        end={0.798}
        curve={[
          [658, 190],
          [708, 262],
          [742, 262],
          [792, 190],
        ]}
        color="#34d399"
      />

      {/* 3 Funnel Stage Nodes */}
      {NODES.map((node) => (
        <FunnelNode key={node.title} p={p} node={node} />
      ))}

      {/* BOTTOM: Multi-Channel Funnel Attribution Table */}
      <motion.g style={{ opacity: tableOpacity }}>
        <rect x="44" y="294" width="1032" height="296" rx="12" fill="#0f0f14" stroke="#27272a" />
        <rect x="44" y="294" width="1032" height="38" rx="12" fill="#18181f" />
        <text x="64" y="318" fill="#e4e4e7" fontSize="11.5" fontWeight="700">
          Source / Funnel Variant
        </text>
        <text x="410" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          Traffic
        </text>
        <text x="560" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          Qualified Leads
        </text>
        <text x="720" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          Converted
        </text>
        <text x="840" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          Cost / Lead
        </text>
        <text x="960" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          Pipeline Value
        </text>
        <text x="1056" y="318" fill="#a1a1aa" fontSize="11" fontWeight="700" textAnchor="end">
          ROAS
        </text>

        {COHORT_ROWS.map((row, idx) => {
          const y = 336 + idx * 50;
          return (
            <g key={row[0]}>
              <rect
                x="56"
                y={y}
                width="1008"
                height="42"
                rx="8"
                fill={idx % 2 === 0 ? "#121217" : "#16161d"}
                stroke="#27272a"
              />
              <circle cx="76" cy={y + 21} r="4.5" fill={idx === 0 ? "#6366f1" : idx === 1 ? "#22d3ee" : "#10b981"} />
              <text x="90" y={y + 25} fill="#f4f4f5" fontSize="11.5" fontWeight="600">
                {row[0]}
              </text>
              <text x="410" y={y + 25} fill="#e4e4e7" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[1]}
              </text>
              <text x="560" y={y + 25} fill="#22d3ee" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[2]}
              </text>
              <text x="720" y={y + 25} fill="#10b981" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[3]}
              </text>
              <text x="840" y={y + 25} fill="#facc15" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[4]}
              </text>
              <text x="960" y={y + 25} fill="#fafafa" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[5]}
              </text>
              <text x="1056" y={y + 25} fill="#4ade80" fontSize="11.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
                {row[6]}
              </text>
            </g>
          );
        })}

        {/* Total Summary Row */}
        <text x="68" y="566" fill="#a1a1aa" fontSize="11" fontWeight="700">
          Total Multi-Touch Funnel Attribution (30 Days)
        </text>
        <text x="410" y="566" fill="#fafafa" fontSize="11.5" fontWeight="800" fontFamily="ui-monospace, monospace" textAnchor="end">
          148,920
        </text>
        <text x="560" y="566" fill="#22d3ee" fontSize="11.5" fontWeight="800" fontFamily="ui-monospace, monospace" textAnchor="end">
          19,810 (13.3%)
        </text>
        <text x="720" y="566" fill="#10b981" fontSize="11.5" fontWeight="800" fontFamily="ui-monospace, monospace" textAnchor="end">
          5,760 (29.1%)
        </text>
        <text x="960" y="566" fill="#fafafa" fontSize="11.5" fontWeight="800" fontFamily="ui-monospace, monospace" textAnchor="end">
          $412,800
        </text>
        <text x="1056" y="566" fill="#4ade80" fontSize="12" fontWeight="800" fontFamily="ui-monospace, monospace" textAnchor="end">
          5.92x
        </text>
      </motion.g>
    </Scene>
  );
}
