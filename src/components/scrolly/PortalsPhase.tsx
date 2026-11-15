"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Cursor, Scene, TypedText } from "./scene";
import type { Progress } from "./phases";

// 30-day sharp multi-series coordinates matching Screenshot 2 ("Google Ads Report")
// Chart X spans x=104 (day 1) to x=1016 (day 30), step = 31.4px per day.
// Chart Y spans y=396 ($0) up to y=216 ($6.00K / $1.50K).
const RED_LINE =
  "M104 314 L135 234 L167 344 L198 347 L230 338 L261 368 L293 272 L324 396 L356 396 L387 368 L418 364 L450 326 L481 376 L513 381 L544 396 L576 396 L607 396 L638 396 L1016 396";

const BLUE_LINE =
  "M104 396 L135 396 L167 354 L198 354 L230 375 L261 268 L293 390 L324 387 L356 396 L387 290 L418 338 L450 390 L481 334 L513 354 L544 354 L576 394 L607 382 L638 394 L670 396 L1016 396";

const GREEN_LINE =
  "M104 375 L135 352 L167 291 L198 299 L230 310 L261 301 L293 334 L324 394 L356 396 L387 316 L418 334 L450 344 L481 344 L513 366 L544 396 L576 394 L607 358 L638 394 L670 396 L1016 396";

const AMBER_LINE =
  "M104 316 L135 366 L167 379 L198 384 L230 375 L261 385 L293 384 L324 396 L356 392 L387 382 L418 388 L450 387 L481 382 L513 387 L544 396 L576 396 L607 390 L638 396 L1016 396";

const TOP_TABS = [
  "Summary",
  "Channels",
  "Keywords",
  "Pages",
  "Google Ads",
  "Call Tracking",
  "Sales Handling",
] as const;

const METRIC_DOTS = [
  { color: "#4f46e5", val: "$19.26K", label: "Total Quote Value", x: 64 },
  { color: "#c084fc", val: "$0", label: "Total Sales Value", x: 204 },
  { color: "#4ade80", val: "$27.55K", label: "Total Spend", x: 326 },
  { color: "#facc15", val: "$95.01", label: "Cost per Lead", x: 452 },
  { color: "#f43f5e", val: "$290.02", label: "Cost per Quotable Lead", x: 576 },
] as const;

const BOTTOM_CARDS = [
  { title: "Impression Share", value: "80%", delta: "↑ 50%", up: true, x: 38 },
  { title: "Click-Through Rate", value: "5.72%", delta: "↑ 33%", up: true, x: 300 },
  { title: "Cost Per Click", value: "$1.37", delta: "↓ 8%", up: false, x: 562 },
  { title: "CPM", value: "$7.56", delta: "↑ 22%", up: false, x: 824 },
] as const;

/** Phase 2 [0.20 - 0.40]: Client portal login -> White "Google Ads Report" (Screenshot 2). */
export function PortalsPhase({ p }: { p: Progress }) {
  const loginScale = useTransform(p, [0.265, 0.285], [1, 0]);
  const loginOpacity = useTransform(p, [0.265, 0.28], [1, 0]);
  const loginPress = useTransform(p, [0.255, 0.26, 0.265], [1, 0.94, 1]);

  const dashScale = useTransform(p, [0.275, 0.305], [0.92, 1]);
  const dashOpacity = useTransform(p, [0.275, 0.295], [0, 1]);
  const drawLines = useTransform(p, [0.295, 0.375], [0, 1]);
  const cursorGone = useTransform(p, [0.265, 0.275], [1, 0]);

  const cursorX = useTransform(p, [0.2, 0.255], [220, 560]);
  const cursorY = useTransform(p, [0.2, 0.255], [120, 424]);

  return (
    <Scene label="White-label Google Ads Report with multi-series Value and Spend trends">
      <rect width="1120" height="620" rx="14" fill="#09090b" />

      {/* STEP 1: CLIENT PORTAL LOGIN SCREEN */}
      <motion.g style={{ scale: loginScale, opacity: loginOpacity, ...BOX_ORIGIN }}>
        <rect x="370" y="108" width="380" height="370" rx="22" fill="#101014" stroke="#27272a" strokeWidth="1.5" />
        <circle cx="560" cy="158" r="20" fill="#4f46e5" />
        <text x="560" y="206" fill="#fafafa" fontSize="18" fontWeight="700" textAnchor="middle">
          Executive Client Portal
        </text>
        <text x="560" y="226" fill="#a1a1aa" fontSize="11" textAnchor="middle">
          insights.acmemarketing.com · Read-Only CNAME
        </text>

        <text x="406" y="262" fill="#a1a1aa" fontSize="11" fontWeight="500">
          Work Email
        </text>
        <rect x="406" y="270" width="308" height="38" rx="8" fill="#18181b" stroke="#3f3f46" />
        <TypedText p={p} text="maya@acmecorp.com" x={420} y={294} start={0.205} end={0.232} size={13} />

        <text x="406" y="334" fill="#a1a1aa" fontSize="11" fontWeight="500">
          Access Token / Password
        </text>
        <rect x="406" y="342" width="308" height="38" rx="8" fill="#18181b" stroke="#3f3f46" />
        <TypedText p={p} text="••••••••••••" x={420} y={366} start={0.232} end={0.252} size={14} />

        <motion.g style={{ scale: loginPress, ...BOX_ORIGIN }}>
          <rect x="406" y="402" width="308" height="42" rx="10" fill="#4f46e5" />
          <text x="560" y="428" fill="#ffffff" fontSize="13" fontWeight="700" textAnchor="middle">
            Login to Google Ads Report
          </text>
        </motion.g>
      </motion.g>

      {/* STEP 2: WHITE GOOGLE ADS REPORT (Exact match to Screenshot 2) */}
      <motion.g style={{ scale: dashScale, opacity: dashOpacity, ...BOX_ORIGIN }}>
        <rect x="12" y="10" width="1096" height="600" rx="14" fill="#ffffff" stroke="#e4e4e7" />

        {/* Top Navigation Bar */}
        <line x1="12" x2="1108" y1="54" y2="54" stroke="#f1f5f9" strokeWidth="1.5" />
        {TOP_TABS.map((tab, i) => {
          const x = 44 + i * 92;
          const active = tab === "Google Ads";
          return (
            <g key={tab}>
              {active && (
                <>
                  <rect x={x - 12} y="16" width="90" height="32" rx="6" fill="#ede9fe" />
                  <line x1={x - 12} x2={x + 78} y1="53" y2="53" stroke="#6d28d9" strokeWidth="2.5" />
                </>
              )}
              <text
                x={x + 33}
                y="36"
                fill={active ? "#6d28d9" : "#64748b"}
                fontSize="11.5"
                fontWeight={active ? "700" : "600"}
                textAnchor="middle"
              >
                {tab}
              </text>
            </g>
          );
        })}

        {/* Monthly / Date selectors on top right */}
        <rect x="854" y="18" width="96" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1" />
        <text x="902" y="36" fill="#1e293b" fontSize="11" fontWeight="600" textAnchor="middle">
          📅 Monthly ▾
        </text>
        <rect x="958" y="18" width="124" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1" />
        <text x="1020" y="36" fill="#1e293b" fontSize="11" fontWeight="600" textAnchor="middle">
          November 2025 ▾
        </text>

        {/* Report Title */}
        <text x="38" y="96" fill="#1e293b" fontSize="24" fontWeight="800">
          Google Ads Report
        </text>
        <circle cx="1068" cy="88" r="14" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="1068" y="93" fill="#334155" fontSize="13" fontWeight="700" textAnchor="middle">
          ≺
        </text>

        {/* GOLD-BORDERED PERFORMANCE TRENDS CARD */}
        <rect
          x="38"
          y="116"
          width="1044"
          height="334"
          rx="14"
          fill="#ffffff"
          stroke="#facc15"
          strokeWidth="3.5"
        />

        <text x="64" y="148" fill="#334155" fontSize="13" fontWeight="700">
          Performance Trends by
        </text>
        <rect x="208" y="131" width="108" height="24" rx="5" fill="#fff1f2" />
        <text x="262" y="147" fill="#e11d48" fontSize="12.5" fontWeight="700" textAnchor="middle">
          Value &amp; Spend ▾
        </text>
        <line x1="212" x2="312" y1="156" y2="156" stroke="#fda4af" strokeDasharray="3 2" />

        {/* 5 Inline KPI Callouts with Colored Dots */}
        {METRIC_DOTS.map((m) => (
          <g key={m.label}>
            <circle cx={m.x} cy="182" r="4.5" fill={m.color} />
            <text x={m.x + 12} y="187" fill="#1e293b" fontSize="16" fontWeight="800">
              {m.val}
            </text>
            <text x={m.x + 12} y="203" fill="#64748b" fontSize="10.5" fontWeight="500">
              {m.label}
            </text>
          </g>
        ))}

        {/* Dual Y-Axis Labels & Gridlines */}
        {[
          { y: 236, left: "$6.00K", right: "$1.50K" },
          { y: 289, left: "$4.00K", right: "$1.00K" },
          { y: 342, left: "$2.00K", right: "$500" },
          { y: 396, left: "$0", right: "$0" },
        ].map((row) => (
          <g key={row.y}>
            <text x="90" y={row.y + 4} fill="#64748b" fontSize="10" fontWeight="600" textAnchor="end">
              {row.left}
            </text>
            <line x1="100" x2="1020" y1={row.y} y2={row.y} stroke="#e2e8f0" strokeWidth="1" />
            <text x="1030" y={row.y + 4} fill="#64748b" fontSize="10" fontWeight="600">
              {row.right}
            </text>
          </g>
        ))}

        {/* 4 Sharp Differentiated Multi-Colored Trend Lines */}
        <motion.path
          d={AMBER_LINE}
          fill="none"
          stroke="#facc15"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ pathLength: drawLines }}
        />
        <motion.path
          d={GREEN_LINE}
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ pathLength: drawLines }}
        />
        <motion.path
          d={BLUE_LINE}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ pathLength: drawLines }}
        />
        <motion.path
          d={RED_LINE}
          fill="none"
          stroke="#e11d48"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ pathLength: drawLines }}
        />

        {/* 30 Day X-Axis Labels (1 .. 30) */}
        {Array.from({ length: 30 }).map((_, idx) => {
          const x = Math.round(104 + idx * 31.4);
          return (
            <text
              key={idx}
              x={x}
              y="416"
              fill="#475569"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
            >
              {idx + 1}
            </text>
          );
        })}

        {/* BOTTOM 4 KPI CARDS (Impression Share 80%, CTR 5.72%, CPC $1.37, CPM $7.56) */}
        {BOTTOM_CARDS.map((card) => (
          <g key={card.title}>
            <rect
              x={card.x}
              y="468"
              width="248"
              height="122"
              rx="10"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            <text x={card.x + 22} y="498" fill="#334155" fontSize="13" fontWeight="700">
              {card.title}
            </text>
            <text x={card.x + 22} y="542" fill="#0f172a" fontSize="30" fontWeight="800">
              {card.value}
            </text>
            <rect
              x={card.x + 22}
              y="556"
              width="54"
              height="20"
              rx="5"
              fill={card.up ? "#dcfce7" : "#ffe4e6"}
            />
            <text
              x={card.x + 49}
              y="570"
              fill={card.up ? "#15803d" : "#be123c"}
              fontSize="10.5"
              fontWeight="700"
              textAnchor="middle"
            >
              {card.delta}
            </text>
          </g>
        ))}
      </motion.g>

      {/* Animated SVG Cursor for Login */}
      <motion.g style={{ opacity: cursorGone }}>
        <motion.g style={{ x: cursorX, y: cursorY }}>
          <path
            d="M0 0 L0 20 L5.5 15.5 L10 24 L13.5 22 L9 14 L17 14 Z"
            fill="#ffffff"
            stroke="#09090b"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    </Scene>
  );
}

export { Cursor };
