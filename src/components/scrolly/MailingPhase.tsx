"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_BOTTOM, BOX_ORIGIN, Scene } from "./scene";
import type { Progress } from "./phases";

const LEADS = [
  ["sarah@vortex.io", "VP Growth", "Queued"],
  ["liam@northstar.co", "CMO", "Sent"],
  ["elena@kinetix.ai", "Founder", "Replied"],
  ["noah@scaleops.dev", "Head of Demand", "Sent"],
] as const;

const TEMPLATE_LINES = [
  { width: 240, y: 128, start: 0.84, end: 0.88 },
  { width: 270, y: 148, start: 0.86, end: 0.9 },
  { width: 196, y: 168, start: 0.88, end: 0.92 },
] as const;

const BARS = [
  { label: "Mon", h: 48, x: 468 },
  { label: "Tue", h: 74, x: 526 },
  { label: "Wed", h: 96, x: 584 },
  { label: "Thu", h: 124, x: 642 },
  { label: "Fri", h: 148, x: 700 },
] as const;

function TemplateLine({
  p,
  line,
}: {
  p: Progress;
  line: (typeof TEMPLATE_LINES)[number];
}) {
  const width = useTransform(p, [line.start, line.end], [0, line.width]);
  return <motion.rect x="454" y={line.y} width={width} height="10" rx="5" fill="#6366f1" />;
}

function PaperPlane({
  p,
  start,
  end,
  originX,
  originY,
}: {
  p: Progress;
  start: number;
  end: number;
  originX: number;
  originY: number;
}) {
  const x = useTransform(p, [start, end], [originX, originX + 260]);
  const y = useTransform(p, [start, end], [originY, originY - 220]);
  const opacity = useTransform(p, [start, start + 0.015, end - 0.015, end], [0, 1, 1, 0]);

  return (
    <motion.g style={{ x, y, opacity }}>
      <path
        d="M0 12 L26 0 L18 24 L11 15 L0 12 Z M26 0 L11 15"
        fill="#22d3ee"
        stroke="#09090b"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

function ReplyBar({
  p,
  bar,
  index,
}: {
  p: Progress;
  bar: (typeof BARS)[number];
  index: number;
}) {
  const start = 0.9 + index * 0.012;
  const end = start + 0.04;
  const scaleY = useTransform(p, [start, end], [0, 1]);

  return (
    <g>
      <motion.rect
        x={bar.x}
        y={386 - bar.h}
        width="34"
        height={bar.h}
        rx="6"
        fill="#10b981"
        style={{ scaleY, ...BOX_BOTTOM }}
      />
      <text x={bar.x + 17} y="404" fill="#71717a" fontSize="10" textAnchor="middle">
        {bar.label}
      </text>
    </g>
  );
}

/** Phase 5 [0.80 - 1.00]: leads table, AI sparkle template, paper planes, and reply bar chart. */
export function MailingPhase({ p }: { p: Progress }) {
  const sparkleOpacity = useTransform(p, [0.815, 0.845], [0, 1]);
  const sparkleScale = useTransform(p, [0.815, 0.845], [0.5, 1]);

  return (
    <Scene label="Cold mailing leads table, AI email composer, paper airplanes, and reply chart">
      <rect width="800" height="450" rx="16" fill="#09090b" />

      {/* Left: Leads Table */}
      <rect x="32" y="36" width="376" height="378" rx="14" fill="#0f0f13" stroke="#27272a" />
      <text x="54" y="68" fill="#fafafa" fontSize="14" fontWeight="600">
        Outreach Leads (1,420)
      </text>
      <rect x="52" y="84" width="336" height="28" rx="6" fill="#18181b" />
      <text x="64" y="102" fill="#71717a" fontSize="10">
        Contact
      </text>
      <text x="214" y="102" fill="#71717a" fontSize="10">
        Role
      </text>
      <text x="326" y="102" fill="#71717a" fontSize="10">
        Status
      </text>

      {LEADS.map(([email, role, status], i) => (
        <g key={email}>
          <rect x="52" y={122 + i * 64} width="336" height="50" rx="10" fill="#14141a" stroke="#27272a" />
          <text x="66" y={151 + i * 64} fill="#e4e4e7" fontSize="11" fontFamily="ui-monospace, monospace">
            {email}
          </text>
          <text x="214" y={151 + i * 64} fill="#a1a1aa" fontSize="10">
            {role}
          </text>
          <text
            x="326"
            y={151 + i * 64}
            fill={status === "Replied" ? "#10b981" : status === "Sent" ? "#22d3ee" : "#a1a1aa"}
            fontSize="10"
            fontWeight="600"
          >
            {status}
          </text>
        </g>
      ))}

      {/* Right top: AI Template Composer */}
      <rect x="432" y="36" width="336" height="168" rx="14" fill="#0f0f13" stroke="#27272a" />
      <text x="454" y="68" fill="#fafafa" fontSize="13" fontWeight="600">
        AI Sequence Personalizer
      </text>
      <text x="454" y="104" fill="#a1a1aa" fontSize="10" fontFamily="ui-monospace, monospace">
        Subject: Scaling {"{{company}}"} paid search ROAS
      </text>

      {TEMPLATE_LINES.map((line, i) => (
        <TemplateLine key={i} p={p} line={line} />
      ))}

      {/* AI Sparkle badge */}
      <motion.g style={{ opacity: sparkleOpacity, scale: sparkleScale, ...BOX_ORIGIN }}>
        <circle cx="728" cy="64" r="18" fill="#312e81" stroke="#818cf8" />
        <path
          d="M728 52 L731 61 L740 64 L731 67 L728 76 L725 67 L716 64 L725 61 Z"
          fill="#c7d2fe"
        />
      </motion.g>

      {/* Right bottom: Reply Rate Bar Chart */}
      <rect x="432" y="220" width="336" height="194" rx="14" fill="#0f0f13" stroke="#27272a" />
      <text x="454" y="248" fill="#fafafa" fontSize="13" fontWeight="600">
        Positive Replies (41.8% Open)
      </text>
      <line x1="454" x2="748" y1="386" y2="386" stroke="#27272a" />

      {BARS.map((bar, i) => (
        <ReplyBar key={bar.label} p={p} bar={bar} index={i} />
      ))}

      {/* Paper airplanes launching diagonally off-screen */}
      <PaperPlane p={p} start={0.89} end={0.96} originX={580} originY={150} />
      <PaperPlane p={p} start={0.915} end={0.985} originX={620} originY={175} />
    </Scene>
  );
}
