"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_BOTTOM, BOX_ORIGIN, Scene } from "./scene";
import type { Progress } from "./phases";

const LEADS = [
  ["sarah@vortex.io", "Vortex Media", "VP Growth", "Step 3 · Opened 2x", "Replied", "#10b981"],
  ["liam@northstar.co", "Northstar Retail", "CMO", "Step 2 · Link Clicked", "Booked Call", "#10b981"],
  ["elena@kinetix.ai", "Kinetix AI", "Founder", "Step 4 · Breakup", "Replied", "#10b981"],
  ["noah@scaleops.dev", "ScaleOps Cloud", "Head of Demand", "Step 2 · Follow-up", "Sent (99.4%)", "#22d3ee"],
  ["amira@zenithlux.ae", "Zenith Luxury", "Performance Dir.", "Step 3 · Case Study", "Opened", "#818cf8"],
  ["david@meridian.uk", "Meridian Group", "Managing Partner", "Step 1 · Audit Hook", "Queued", "#a1a1aa"],
  ["chloe@elevatehq.com", "Elevate Commerce", "Paid Search Lead", "Step 3 · ROAS Pitch", "Replied", "#10b981"],
] as const;

const TEMPLATE_LINES = [
  { width: 340, y: 128, start: 0.835, end: 0.875, color: "#6366f1" },
  { width: 380, y: 150, start: 0.855, end: 0.895, color: "#818cf8" },
  { width: 290, y: 172, start: 0.875, end: 0.915, color: "#22d3ee" },
] as const;

const BARS = [
  { label: "W1", sent: 95, opened: 68, replied: 26, x: 660 },
  { label: "W2", sent: 118, opened: 86, replied: 38, x: 734 },
  { label: "W3", sent: 142, opened: 108, replied: 52, x: 808 },
  { label: "W4", sent: 164, opened: 128, replied: 68, x: 882 },
  { label: "W5", sent: 186, opened: 148, replied: 84, x: 956 },
  { label: "W6", sent: 204, opened: 166, replied: 98, x: 1030 },
] as const;

function TemplateLine({
  p,
  line,
}: {
  p: Progress;
  line: (typeof TEMPLATE_LINES)[number];
}) {
  const width = useTransform(p, [line.start, line.end], [0, line.width]);
  return <motion.rect x="646" y={line.y} width={width} height="11" rx="5.5" fill={line.color} />;
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
  const x = useTransform(p, [start, end], [originX, originX + 310]);
  const y = useTransform(p, [start, end], [originY, originY - 240]);
  const opacity = useTransform(p, [start, start + 0.015, end - 0.015, end], [0, 1, 1, 0]);

  return (
    <motion.g style={{ x, y, opacity }}>
      <path
        d="M0 14 L30 0 L21 28 L13 17 L0 14 Z M30 0 L13 17"
        fill="#22d3ee"
        stroke="#09090b"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

function MultiBarGroup({
  p,
  bar,
  index,
}: {
  p: Progress;
  bar: (typeof BARS)[number];
  index: number;
}) {
  const start = 0.885 + index * 0.012;
  const end = start + 0.04;
  const scaleY = useTransform(p, [start, end], [0, 1]);

  return (
    <g>
      {/* Sent bar */}
      <motion.rect
        x={bar.x}
        y={548 - bar.sent}
        width="14"
        height={bar.sent}
        rx="3"
        fill="#3f3f46"
        style={{ scaleY, ...BOX_BOTTOM }}
      />
      {/* Opened bar */}
      <motion.rect
        x={bar.x + 16}
        y={548 - bar.opened}
        width="14"
        height={bar.opened}
        rx="3"
        fill="#6366f1"
        style={{ scaleY, ...BOX_BOTTOM }}
      />
      {/* Replied bar */}
      <motion.rect
        x={bar.x + 32}
        y={548 - bar.replied}
        width="14"
        height={bar.replied}
        rx="3"
        fill="#10b981"
        style={{ scaleY, ...BOX_BOTTOM }}
      />
      <text x={bar.x + 23} y="568" fill="#a1a1aa" fontSize="10.5" fontWeight="600" textAnchor="middle">
        {bar.label}
      </text>
    </g>
  );
}

/** Phase 5 [0.80 - 1.00]: High-density leads table, AI sparkle template, paper planes, and grouped bar chart. */
export function MailingPhase({ p }: { p: Progress }) {
  const sparkleOpacity = useTransform(p, [0.815, 0.845], [0, 1]);
  const sparkleScale = useTransform(p, [0.815, 0.845], [0.5, 1]);

  return (
    <Scene label="Cold mailing leads table, AI sequence personalizer, paper airplanes, and reply chart">
      <rect width="1120" height="620" rx="14" fill="#09090b" />

      {/* LEFT PANEL: Full Outreach Sequence & Deliverability Table */}
      <rect x="24" y="24" width="584" height="572" rx="14" fill="#0f0f14" stroke="#27272a" />
      <text x="46" y="56" fill="#fafafa" fontSize="16" fontWeight="800">
        Outreach Prospects &amp; Sequence Telemetry (1,420 Enriched)
      </text>
      <text x="46" y="76" fill="#10b981" fontSize="11" fontFamily="ui-monospace, monospace">
        ✓ DKIM / SPF / DMARC Verified · 99.4% Inbox Placement
      </text>

      {/* Table Header */}
      <rect x="42" y="92" width="548" height="32" rx="6" fill="#18181f" stroke="#27272a" />
      <text x="56" y="112" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        Prospect Email
      </text>
      <text x="218" y="112" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        Company &amp; Role
      </text>
      <text x="382" y="112" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        Sequence Step
      </text>
      <text x="576" y="112" fill="#a1a1aa" fontSize="10.5" fontWeight="700" textAnchor="end">
        Status
      </text>

      {LEADS.map(([email, company, role, step, status, color], idx) => {
        const y = 132 + idx * 62;
        return (
          <g key={email}>
            <rect
              x="42"
              y={y}
              width="548"
              height="52"
              rx="8"
              fill={idx % 2 === 0 ? "#121217" : "#15151c"}
              stroke="#27272a"
            />
            <text x="56" y={y + 24} fill="#f4f4f5" fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace">
              {email}
            </text>
            <text x="56" y={y + 40} fill="#71717a" fontSize="9.5" fontFamily="ui-monospace, monospace">
              Resend ID: msg_{2941 + idx * 17}
            </text>
            <text x="218" y={y + 24} fill="#e4e4e7" fontSize="11" fontWeight="600">
              {company}
            </text>
            <text x="218" y={y + 40} fill="#a1a1aa" fontSize="10">
              {role}
            </text>
            <text x="382" y={y + 31} fill="#a5b4fc" fontSize="10.5" fontFamily="ui-monospace, monospace">
              {step}
            </text>
            <text
              x="576"
              y={y + 31}
              fill={color}
              fontSize="11"
              fontWeight="700"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              {status}
            </text>
          </g>
        );
      })}

      {/* RIGHT TOP: AI Sequence Personalizer */}
      <rect x="624" y="24" width="472" height="206" rx="14" fill="#0f0f14" stroke="#27272a" />
      <text x="646" y="58" fill="#fafafa" fontSize="15" fontWeight="700">
        AI Sequence Personalizer
      </text>
      <text x="646" y="80" fill="#a1a1aa" fontSize="11">
        Injecting live Google Ads &amp; SEO audit findings per prospect
      </text>
      <text x="646" y="108" fill="#e4e4e7" fontSize="11.5" fontFamily="ui-monospace, monospace">
        Subject: Scaling {"{{company}}"} PMax ROAS + 3 LCP fixes
      </text>

      {TEMPLATE_LINES.map((line, i) => (
        <TemplateLine key={i} p={p} line={line} />
      ))}

      <text x="646" y="208" fill="#10b981" fontSize="10.5" fontFamily="ui-monospace, monospace">
        ✓ Idempotent key: (campaignId, contactId) · 0 duplicate sends
      </text>

      {/* AI Sparkle Badge */}
      <motion.g style={{ opacity: sparkleOpacity, scale: sparkleScale, ...BOX_ORIGIN }}>
        <circle cx="1052" cy="60" r="22" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
        <path
          d="M1052 45 L1056 56 L1067 60 L1056 64 L1052 75 L1048 64 L1037 60 L1048 56 Z"
          fill="#c7d2fe"
        />
      </motion.g>

      {/* RIGHT BOTTOM: Multi-Series Grouped Bar Chart (Sent vs Opened vs Replied) */}
      <rect x="624" y="246" width="472" height="350" rx="14" fill="#0f0f14" stroke="#27272a" />
      <text x="646" y="278" fill="#fafafa" fontSize="14.5" fontWeight="700">
        Weekly Cohort Performance (71.2% Open · 18.6% Reply)
      </text>
      {/* Legend */}
      <rect x="646" y="294" width="10" height="10" rx="2" fill="#3f3f46" />
      <text x="662" y="303" fill="#a1a1aa" fontSize="10.5">
        Delivered
      </text>
      <rect x="730" y="294" width="10" height="10" rx="2" fill="#6366f1" />
      <text x="746" y="303" fill="#a1a1aa" fontSize="10.5">
        Opened (71.2%)
      </text>
      <rect x="844" y="294" width="10" height="10" rx="2" fill="#10b981" />
      <text x="860" y="303" fill="#a1a1aa" fontSize="10.5">
        Positive Reply (18.6%)
      </text>

      {[368, 428, 488, 548].map((y) => (
        <line key={y} x1="646" x2="1080" y1={y} y2={y} stroke="#27272a" strokeDasharray="3 3" />
      ))}

      {BARS.map((bar, i) => (
        <MultiBarGroup key={bar.label} p={p} bar={bar} index={i} />
      ))}

      {/* Paper airplanes launching diagonally off-screen */}
      <PaperPlane p={p} start={0.89} end={0.96} originX={760} originY={160} />
      <PaperPlane p={p} start={0.915} end={0.985} originX={820} originY={185} />
    </Scene>
  );
}
