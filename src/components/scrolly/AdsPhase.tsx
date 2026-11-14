"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Cursor, Scene } from "./scene";
import type { Progress } from "./phases";

const FIELDS = [
  { label: "Campaign name", value: "Spring Sale - PMax", y: 112, a: 0.08, b: 0.1 },
  { label: "Daily budget", value: "$150.00 / day", y: 176, a: 0.1, b: 0.12 },
  { label: "Merchant feed", value: "ACME-US (4,812 items)", y: 240, a: 0.12, b: 0.14 },
] as const;

const ROWS = [
  ["Brand Search", "Enabled", "$1,284"],
  ["Shopping - US", "Enabled", "$3,902"],
  ["Retargeting", "Paused", "$642"],
  ["Demand Gen", "Enabled", "$2,110"],
] as const;

function AutoFillField({
  p,
  field,
  index,
}: {
  p: Progress;
  field: (typeof FIELDS)[number];
  index: number;
}) {
  // The value is revealed left-to-right by widening a clip rectangle.
  const width = useTransform(p, [field.a, field.b], [0, 240]);
  const id = `ads-fill-${index}`;
  return (
    <g>
      <text x="520" y={field.y - 8} fill="#a1a1aa" fontSize="10">
        {field.label}
      </text>
      <rect x="520" y={field.y} width="250" height="32" rx="8" fill="#18181b" stroke="#3f3f46" />
      <clipPath id={id}>
        <motion.rect x="528" y={field.y} width={width} height="32" />
      </clipPath>
      <text
        x="530"
        y={field.y + 20}
        fill="#e4e4e7"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        clipPath={`url(#${id})`}
      >
        {field.value}
      </text>
    </g>
  );
}

/** Phase 1 [0.00 - 0.20]: Google Ads clone, create a PMax campaign and deploy it. */
export function AdsPhase({ p }: { p: Progress }) {
  const createPress = useTransform(p, [0.045, 0.05, 0.055], [1, 0.92, 1]);
  const deployPress = useTransform(p, [0.15, 0.155, 0.16], [1, 0.94, 1]);

  // Sidebar expands from the right edge.
  const panelX = useTransform(p, [0.05, 0.08], [800, 500]);
  const panelWidth = useTransform(p, [0.05, 0.08], [0, 300]);
  const panelContent = useTransform(p, [0.065, 0.085], [0, 1]);

  const toastOpacity = useTransform(p, [0.16, 0.168], [0, 1]);
  const toastY = useTransform(p, [0.16, 0.17], [18, 0]);

  return (
    <Scene label="Google Ads style dashboard creating and deploying a Performance Max campaign">
      <rect width="800" height="450" rx="16" fill="#09090b" />

      {/* left nav */}
      <rect x="0" y="0" width="110" height="450" rx="16" fill="#0f0f13" />
      {["Overview", "Campaigns", "Assets", "Reports"].map((item, i) => (
        <g key={item}>
          <rect
            x="14"
            y={58 + i * 34}
            width="82"
            height="24"
            rx="6"
            fill={i === 1 ? "#312e81" : "transparent"}
          />
          <text x="24" y={74 + i * 34} fill={i === 1 ? "#c7d2fe" : "#71717a"} fontSize="11">
            {item}
          </text>
        </g>
      ))}
      <circle cx="30" cy="30" r="8" fill="#6366f1" />
      <text x="44" y="34" fill="#e4e4e7" fontSize="11" fontWeight="600">
        OmniPulse
      </text>

      {/* header + create button */}
      <text x="134" y="46" fill="#fafafa" fontSize="15" fontWeight="600">
        Campaigns
      </text>
      <motion.g style={{ scale: createPress, ...BOX_ORIGIN }}>
        <rect x="560" y="26" width="150" height="32" rx="8" fill="#4f46e5" />
        <text x="635" y="46" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle">
          + Create PMax
        </text>
      </motion.g>

      {/* campaign table */}
      <rect x="134" y="76" width="340" height="30" rx="8" fill="#18181b" />
      {["Campaign", "Status", "Spend"].map((h, i) => (
        <text key={h} x={146 + i * 118} y="95" fill="#71717a" fontSize="10">
          {h}
        </text>
      ))}
      {ROWS.map(([name, status, spend], i) => (
        <g key={name}>
          <rect x="134" y={116 + i * 44} width="340" height="36" rx="8" fill="#101014" />
          <text x="146" y={138 + i * 44} fill="#e4e4e7" fontSize="11">
            {name}
          </text>
          <circle cx="264" cy={134 + i * 44} r="3.5" fill={status === "Enabled" ? "#10b981" : "#f59e0b"} />
          <text x="274" y={138 + i * 44} fill="#a1a1aa" fontSize="10">
            {status}
          </text>
          <text x="382" y={138 + i * 44} fill="#e4e4e7" fontSize="11" fontFamily="ui-monospace, monospace">
            {spend}
          </text>
        </g>
      ))}

      {/* expanding creation panel */}
      <clipPath id="ads-panel-clip">
        <motion.rect x={panelX} y="70" width={panelWidth} height="380" />
      </clipPath>
      <g clipPath="url(#ads-panel-clip)">
        <rect x="500" y="70" width="300" height="380" fill="#0f0f13" stroke="#27272a" />
        <motion.g style={{ opacity: panelContent }}>
          <text x="520" y="96" fill="#fafafa" fontSize="13" fontWeight="600">
            New Performance Max
          </text>
          {FIELDS.map((field, i) => (
            <AutoFillField key={field.label} p={p} field={field} index={i} />
          ))}
          <motion.g style={{ scale: deployPress, ...BOX_ORIGIN }}>
            <rect x="520" y="312" width="250" height="40" rx="10" fill="#4f46e5" />
            <text x="645" y="337" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle">
              Deploy campaign
            </text>
          </motion.g>
        </motion.g>
      </g>

      {/* success toast */}
      <motion.g style={{ opacity: toastOpacity, y: toastY }}>
        <rect x="250" y="384" width="220" height="44" rx="12" fill="#052e1b" stroke="#10b981" />
        <circle cx="274" cy="406" r="9" fill="#10b981" />
        <path d="M269 406 L273 410 L280 402" fill="none" stroke="#052e1b" strokeWidth="2" strokeLinecap="round" />
        <text x="292" y="410" fill="#6ee7b7" fontSize="12" fontWeight="600">
          Deployed to Google Ads
        </text>
      </motion.g>

      <Cursor
        p={p}
        x={[
          [0, 0.045, 0.14, 0.16],
          [780, 640, 640, 650],
        ]}
        y={[
          [0, 0.045, 0.14, 0.16],
          [440, 46, 46, 336],
        ]}
      />
    </Scene>
  );
}
