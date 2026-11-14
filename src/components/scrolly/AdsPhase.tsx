"use client";

import { motion, useTransform } from "framer-motion";
import { BOX_ORIGIN, Cursor, Scene } from "./scene";
import type { Progress } from "./phases";

const AD_GROUP_ROWS = [
  {
    name: "BAKU - INTL PACKAGES",
    statusTop: "Eligible",
    statusSub: "Learning (2 days left)",
    eligible: true,
    type: "PMax Asset",
    impr: "148,920",
    ctr: "6.42%",
    cost: "PKR 42,810",
    brand: "OmniPulse Travel",
    loc: "UAE, UK, PK",
    clicks: "9,560",
    convRate: "8.14%",
    convVal: "PKR 312,400",
  },
  {
    name: "BAKU",
    statusTop: "Not eligible",
    statusSub: "Campaign is paused",
    eligible: false,
    type: "Standard",
    impr: "19,410",
    ctr: "4.18%",
    cost: "PKR 8,120",
    brand: "—",
    loc: "Baku, Azerbaijan",
    clicks: "811",
    convRate: "5.20%",
    convVal: "PKR 44,900",
  },
  {
    name: "all in 1",
    statusTop: "Not eligible",
    statusSub: "Campaign is paused",
    eligible: false,
    type: "Standard",
    impr: "11,280",
    ctr: "3.91%",
    cost: "PKR 4,650",
    brand: "—",
    loc: "All territories",
    clicks: "441",
    convRate: "4.65%",
    convVal: "PKR 21,800",
  },
  {
    name: "UMRAH - EXECUTIVE TIER",
    statusTop: "Eligible",
    statusSub: "Target ROAS 480%",
    eligible: true,
    type: "Standard",
    impr: "238,600",
    ctr: "7.85%",
    cost: "PKR 96,400",
    brand: "Trodden Deluxe",
    loc: "GCC, PK, UK",
    clicks: "18,730",
    convRate: "9.42%",
    convVal: "PKR 618,900",
  },
  {
    name: "EUROPE VISA - SEARCH RSA",
    statusTop: "Eligible",
    statusSub: "Max Conversions",
    eligible: true,
    type: "Standard",
    impr: "84,115",
    ctr: "5.64%",
    cost: "PKR 31,220",
    brand: "—",
    loc: "Schengen, UK",
    clicks: "4,744",
    convRate: "6.88%",
    convVal: "PKR 169,500",
  },
] as const;

const FIELDS = [
  { label: "Campaign & Asset Group", value: "UM - INTERNATIONAL · PMax", y: 206, a: 0.08, b: 0.105 },
  { label: "Daily Budget & Bidding", value: "PKR 25,000/day · tROAS 450%", y: 274, a: 0.105, b: 0.125 },
  { label: "Audience & Brand Signals", value: "High-Intent Travelers + Merchant Feed", y: 342, a: 0.125, b: 0.145 },
] as const;

// Multi-series daily performance lines inside the Google Ads overview strip (sharp daily peaks)
const PMAX_SERIES =
  "M252 178 L278 164 L304 128 L330 146 L356 112 L382 152 L408 106 L434 138 L460 118 L486 160 L512 104 L538 124 L564 114 L590 142 L616 108 L642 132 L668 98 L694 122 L720 105 L746 115";
const SEARCH_SERIES =
  "M252 184 L278 142 L304 166 L330 154 L356 132 L382 118 L408 158 L434 172 L460 135 L486 126 L512 148 L538 162 L564 134 L590 128 L616 150 L642 140 L668 126 L694 138 L720 122 L746 130";
const DEMAND_SERIES =
  "M252 190 L278 182 L304 174 L330 160 L356 178 L382 164 L408 144 L434 184 L460 170 L486 152 L512 176 L538 168 L564 156 L590 174 L616 162 L642 170 L668 152 L694 164 L720 148 L746 156";

function AutoFillField({
  p,
  field,
  index,
}: {
  p: Progress;
  field: (typeof FIELDS)[number];
  index: number;
}) {
  const width = useTransform(p, [field.a, field.b], [0, 310]);
  const id = `ads-fill-v2-${index}`;
  return (
    <g>
      <text x="768" y={field.y - 8} fill="#9aa0a6" fontSize="11" fontWeight="500">
        {field.label}
      </text>
      <rect x="768" y={field.y} width="324" height="36" rx="6" fill="#202124" stroke="#5f6368" />
      <clipPath id={id}>
        <motion.rect x="776" y={field.y} width={width} height="36" />
      </clipPath>
      <text
        x="780"
        y={field.y + 23}
        fill="#e8eaed"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        clipPath={`url(#${id})`}
      >
        {field.value}
      </text>
    </g>
  );
}

/** Phase 1 [0.00 - 0.20]: Full Google Ads dark interface (Ad groups table + multi-series chart + PMax drawer). */
export function AdsPhase({ p }: { p: Progress }) {
  const createPress = useTransform(p, [0.045, 0.05, 0.055], [1, 0.9, 1]);
  const deployPress = useTransform(p, [0.15, 0.155, 0.16], [1, 0.94, 1]);

  const panelX = useTransform(p, [0.05, 0.08], [1120, 748]);
  const panelWidth = useTransform(p, [0.05, 0.08], [0, 372]);
  const panelContent = useTransform(p, [0.065, 0.085], [0, 1]);

  const toastOpacity = useTransform(p, [0.16, 0.168], [0, 1]);
  const toastY = useTransform(p, [0.16, 0.17], [16, 0]);

  return (
    <Scene label="Google Ads Ad Groups console table and multi-series campaign chart">
      {/* Main Google Ads dark canvas */}
      <rect width="1120" height="620" rx="14" fill="#171717" />

      {/* TOP BAR (Google Ads global bar) */}
      <rect x="0" y="0" width="1120" height="44" fill="#202124" />
      <line x1="0" x2="1120" y1="44" y2="44" stroke="#3c4043" />
      {/* Hamburger + Google Ads triangle badge */}
      <rect x="16" y="16" width="14" height="2" fill="#9aa0a6" />
      <rect x="16" y="21" width="14" height="2" fill="#9aa0a6" />
      <rect x="16" y="26" width="14" height="2" fill="#9aa0a6" />
      <polygon points="48,30 56,14 62,14 54,30" fill="#4285f4" />
      <polygon points="56,14 64,30 58,30 53,20" fill="#fbbc04" />
      <circle cx="50" cy="29" r="3" fill="#34a853" />
      <text x="72" y="27" fill="#e8eaed" fontSize="14" fontWeight="600">
        Google Ads
      </text>

      {/* Search bar */}
      <rect x="176" y="8" width="286" height="28" rx="6" fill="#303134" />
      <text x="194" y="26" fill="#9aa0a6" fontSize="11">
        🔍 &quot;What are my top performing campaigns?&quot;
      </text>

      {/* Right account info */}
      <text x="742" y="26" fill="#9aa0a6" fontSize="11">
        Appearance · Refresh · Help · Ask Advisor
      </text>
      <text x="960" y="20" fill="#e8eaed" fontSize="10" fontWeight="600">
        192-459-4129 Trodden Travel
      </text>
      <text x="960" y="33" fill="#9aa0a6" fontSize="9.5" fontFamily="ui-monospace, monospace">
        mcc-sync@omnipulse.io
      </text>
      <circle cx="1096" cy="22" r="12" fill="#8ab4f8" />
      <text x="1096" y="26" fill="#202124" fontSize="11" fontWeight="700" textAnchor="middle">
        D
      </text>

      {/* FAR-LEFT ICON RAIL */}
      <rect x="0" y="44" width="58" height="576" fill="#171717" />
      {/* Create + button */}
      <circle cx="29" cy="74" r="16" fill="#202124" stroke="#3c4043" />
      <path d="M29 66 V82 M21 74 H37" stroke="#8ab4f8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="29" y="102" fill="#9aa0a6" fontSize="9" textAnchor="middle">
        Create
      </text>

      {/* Active rail item: Campaigns */}
      <rect x="9" y="114" width="40" height="24" rx="12" fill="#1a73e8" />
      <circle cx="29" cy="126" r="5" fill="#ffffff" />
      <text x="29" y="150" fill="#8ab4f8" fontSize="9" fontWeight="600" textAnchor="middle">
        Campaigns
      </text>

      {["Goals", "Tools", "Billing", "Admin"].map((item, i) => (
        <g key={item}>
          <circle cx="29" cy={180 + i * 48} r="5" fill="#5f6368" />
          <text x="29" y={198 + i * 48} fill="#9aa0a6" fontSize="9" textAnchor="middle">
            {item}
          </text>
        </g>
      ))}

      {/* INNER LEFT SUB-NAVIGATION (Matching Screenshot 1) */}
      <rect x="58" y="44" width="164" height="576" fill="#171717" />
      <line x1="222" x2="222" y1="44" y2="620" stroke="#303134" />
      <text x="74" y="76" fill="#e8eaed" fontSize="11.5" fontWeight="500">
        Overview
      </text>
      <text x="74" y="104" fill="#e8eaed" fontSize="11.5" fontWeight="500">
        Recommendations
      </text>
      <text x="74" y="132" fill="#e8eaed" fontSize="11.5" fontWeight="500">
        Insights and reports ▾
      </text>

      {/* Expanded Campaigns container */}
      <rect x="64" y="148" width="148" height="156" rx="12" fill="#0f0f10" />
      <text x="76" y="170" fill="#8ab4f8" fontSize="11.5" fontWeight="600">
        Campaigns ▴
      </text>
      <text x="84" y="196" fill="#e8eaed" fontSize="11">
        Campaigns
      </text>
      {/* Active blue pill: Ad groups */}
      <rect x="72" y="208" width="132" height="30" rx="15" fill="#1a73e8" />
      <text x="88" y="227" fill="#ffffff" fontSize="11.5" fontWeight="600">
        Ad groups
      </text>
      <text x="84" y="256" fill="#e8eaed" fontSize="11">
        Ads
      </text>
      <text x="84" y="284" fill="#e8eaed" fontSize="11">
        Experiments
      </text>

      <text x="74" y="330" fill="#e8eaed" fontSize="11.5">
        Assets ▾
      </text>
      <text x="74" y="358" fill="#e8eaed" fontSize="11.5">
        Audiences, keywords ▾
      </text>
      <text x="74" y="386" fill="#e8eaed" fontSize="11.5">
        Change history
      </text>

      {/* MAIN WORKSPACE HEADER */}
      <text x="240" y="66" fill="#9aa0a6" fontSize="10.5">
        ● Enabled    Type: Search &amp; PMax    Budget: PKR 25,000.00/day    ⚙ Campaign settings
      </text>
      <line x1="222" x2="1120" y1="76" y2="76" stroke="#303134" />

      <text x="240" y="103" fill="#e8eaed" fontSize="18" fontWeight="600">
        Ad groups
      </text>
      <rect x="336" y="84" width="154" height="28" rx="6" fill="#202124" stroke="#3c4043" />
      <text x="346" y="95" fill="#9aa0a6" fontSize="8.5">
        Campaign
      </text>
      <text x="346" y="107" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        🔍 UM - INTERNATIONAL
      </text>

      {/* Date Range Picker */}
      <text x="752" y="102" fill="#9aa0a6" fontSize="10.5">
        Last 30 days
      </text>
      <rect x="822" y="84" width="152" height="28" rx="6" fill="#202124" stroke="#3c4043" />
      <text x="834" y="102" fill="#e8eaed" fontSize="10.5">
        Oct 13 – Nov 11, 2026 ▾
      </text>
      <text x="986" y="102" fill="#8ab4f8" fontSize="10.5" fontWeight="600">
        ‹   ›   Show last 30 days
      </text>

      {/* MULTI-SERIES PERFORMANCE COMPARISON CHART STRIP */}
      <rect x="236" y="120" width="868" height="82" rx="8" fill="#202124" stroke="#303134" />
      <text x="252" y="138" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Segmented Ad Group Telemetry (30-Day Daily Variance)
      </text>
      {/* Series Legend */}
      <circle cx="556" cy="134" r="4" fill="#4285f4" />
      <text x="565" y="138" fill="#e8eaed" fontSize="10">
        PMax Retail ($18.4K)
      </text>
      <circle cx="678" cy="134" r="4" fill="#f43f5e" />
      <text x="687" y="138" fill="#e8eaed" fontSize="10">
        Search RSA ($11.2K)
      </text>
      <circle cx="800" cy="134" r="4" fill="#34a853" />
      <text x="809" y="138" fill="#e8eaed" fontSize="10">
        Demand Gen ($6.8K)
      </text>

      {/* Chart grid + 3 sharp differentiated series */}
      {[150, 170, 190].map((y) => (
        <line key={y} x1="252" x2="752" y1={y} y2={y} stroke="#303134" strokeDasharray="2 2" />
      ))}
      <path d={PMAX_SERIES} fill="none" stroke="#4285f4" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={SEARCH_SERIES} fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
      <path d={DEMAND_SERIES} fill="none" stroke="#34a853" strokeWidth="2" strokeLinejoin="round" />

      {/* Right KPI summary inside chart strip */}
      <line x1="772" x2="772" y1="128" y2="194" stroke="#303134" />
      <text x="788" y="146" fill="#9aa0a6" fontSize="9.5">
        TOTAL IMPRESSIONS
      </text>
      <text x="788" y="164" fill="#e8eaed" fontSize="15" fontWeight="700" fontFamily="ui-monospace, monospace">
        502,325
      </text>
      <text x="788" y="182" fill="#34a853" fontSize="9.5" fontFamily="ui-monospace, monospace">
        ▲ +38.4% vs prior 30d
      </text>

      <text x="944" y="146" fill="#9aa0a6" fontSize="9.5">
        BLENDED CONV. VALUE
      </text>
      <text x="944" y="164" fill="#8ab4f8" fontSize="15" fontWeight="700" fontFamily="ui-monospace, monospace">
        PKR 1.16M
      </text>
      <text x="944" y="182" fill="#34a853" fontSize="9.5" fontFamily="ui-monospace, monospace">
        ROAS 6.38x · 0 API errors
      </text>

      {/* ACTION TOOLBAR (Blue + circle, Add filter, Search/Segment/Columns/Reports/Download/Expand) */}
      <rect x="236" y="210" width="868" height="40" fill="#202124" stroke="#3c4043" />
      <motion.g style={{ scale: createPress, ...BOX_ORIGIN }}>
        <circle cx="258" cy="230" r="13" fill="#1a73e8" />
        <path d="M258 223 V237 M251 230 H265" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      </motion.g>
      <text x="282" y="234" fill="#9aa0a6" fontSize="12">
        ▽   Add filter
      </text>

      {/* Right toolbar actions */}
      {[
        ["🔍", "Search", 756],
        ["☰", "Segment", 806],
        ["▤", "Columns", 860],
        ["📊", "Reports", 914],
        ["⬇", "Download", 966],
        ["⛶", "Expand", 1024],
        ["⋮", "More", 1072],
      ].map(([icon, label, x]) => (
        <g key={label}>
          <text x={Number(x)} y="226" fill="#9aa0a6" fontSize="10" textAnchor="middle">
            {icon}
          </text>
          <text x={Number(x)} y="241" fill="#9aa0a6" fontSize="9" textAnchor="middle">
            {label}
          </text>
        </g>
      ))}

      {/* GOOGLE ADS DATA TABLE HEADER */}
      <rect x="236" y="250" width="868" height="32" fill="#1b1b1f" stroke="#3c4043" />
      <rect x="248" y="260" width="11" height="11" rx="2" fill="none" stroke="#9aa0a6" />
      <circle cx="272" cy="265.5" r="4" fill="#5f6368" />
      <text x="286" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Ad group
      </text>
      <text x="436" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Status
      </text>
      <text x="556" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Ad group type
      </text>
      <text x="668" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        Impr.
      </text>
      <text x="722" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        CTR
      </text>
      <text x="802" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        Cost
      </text>
      <text x="818" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Brand Inclusions
      </text>
      <text x="980" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        ↓ Clicks
      </text>
      <text x="1042" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        Conv. rate
      </text>
      <text x="1096" y="270" fill="#e8eaed" fontSize="10.5" fontWeight="600" textAnchor="end">
        Value
      </text>

      {/* TABLE ROWS */}
      {AD_GROUP_ROWS.map((row, idx) => {
        const y = 282 + idx * 46;
        return (
          <g key={row.name}>
            <rect x="236" y={y} width="868" height="46" fill={idx % 2 === 0 ? "#171717" : "#1c1d20"} stroke="#303134" />
            <rect x="248" y={y + 17} width="11" height="11" rx="2" fill="none" stroke="#9aa0a6" />
            <circle cx="272" cy={y + 22.5} r="4.5" fill="#34a853" />
            <text x="286" y={y + 26} fill="#8ab4f8" fontSize="11" fontWeight="500">
              {row.name}
            </text>

            {/* Status cell (with red dotted underline for paused just like Screenshot 1) */}
            <text
              x="436"
              y={y + 19}
              fill={row.eligible ? "#34a853" : "#f28b82"}
              fontSize="10.5"
              fontWeight="600"
            >
              {row.statusTop}
            </text>
            <text x="436" y={y + 33} fill="#9aa0a6" fontSize="9.5">
              {row.statusSub}
            </text>
            {!row.eligible && (
              <line
                x1="436"
                x2="518"
                y1={y + 36}
                y2={y + 36}
                stroke="#f28b82"
                strokeDasharray="2 2"
              />
            )}

            <text x="556" y={y + 26} fill="#e8eaed" fontSize="10.5">
              {row.type}
            </text>
            <text x="668" y={y + 26} fill="#e8eaed" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.impr}
            </text>
            <text x="722" y={y + 26} fill="#e8eaed" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.ctr}
            </text>
            <text x="802" y={y + 26} fill="#e8eaed" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.cost}
            </text>
            <text x="818" y={y + 26} fill="#9aa0a6" fontSize="10">
              {row.brand}
            </text>
            <text x="980" y={y + 26} fill="#e8eaed" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.clicks}
            </text>
            <text x="1042" y={y + 26} fill="#e8eaed" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.convRate}
            </text>
            <text x="1096" y={y + 26} fill="#34a853" fontSize="10.5" fontFamily="ui-monospace, monospace" textAnchor="end">
              {row.convVal}
            </text>
          </g>
        );
      })}

      {/* SUMMARY TOTAL ROWS (Matching Screenshot 1) */}
      <rect x="236" y="512" width="868" height="34" fill="#202124" stroke="#3c4043" />
      <text x="286" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        Total: All but removed ad groups in your campaign  ⓘ
      </text>
      <text x="668" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        502,325
      </text>
      <text x="722" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        6.83%
      </text>
      <text x="802" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        PKR 183,200
      </text>
      <text x="980" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        34,286
      </text>
      <text x="1042" y="533" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        8.41%
      </text>
      <text x="1096" y="533" fill="#34a853" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        PKR 1.16M
      </text>

      <rect x="236" y="546" width="868" height="34" fill="#202124" stroke="#3c4043" />
      <text x="266" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="600">
        ⌄   Total: Campaign  ⓘ
      </text>
      <text x="668" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        502,325
      </text>
      <text x="722" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        6.83%
      </text>
      <text x="802" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        PKR 183,200
      </text>
      <text x="980" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        34,286
      </text>
      <text x="1042" y="567" fill="#e8eaed" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        8.41%
      </text>
      <text x="1096" y="567" fill="#34a853" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" textAnchor="end">
        PKR 1.16M
      </text>

      {/* SLIDE-OVER PMAX CREATION DRAWER */}
      <clipPath id="ads-panel-clip">
        <motion.rect x={panelX} y="44" width={panelWidth} height="576" />
      </clipPath>
      <g clipPath="url(#ads-panel-clip)">
        <rect x="748" y="44" width="372" height="576" fill="#202124" stroke="#5f6368" />
        <motion.g style={{ opacity: panelContent }}>
          <rect x="748" y="44" width="372" height="52" fill="#28292c" />
          <text x="768" y="75" fill="#e8eaed" fontSize="14" fontWeight="700">
            Create Performance Max Asset Group
          </text>
          <text x="768" y="124" fill="#8ab4f8" fontSize="11" fontFamily="ui-monospace, monospace">
            API Route: AssetGroupService · Mutate
          </text>
          <text x="768" y="146" fill="#9aa0a6" fontSize="11">
            Auto-populating verified MCC parameters...
          </text>

          {FIELDS.map((field, i) => (
            <AutoFillField key={field.label} p={p} field={field} index={i} />
          ))}

          <motion.g style={{ scale: deployPress, ...BOX_ORIGIN }}>
            <rect x="768" y="416" width="324" height="42" rx="8" fill="#1a73e8" />
            <text x="930" y="442" fill="#ffffff" fontSize="13" fontWeight="600" textAnchor="middle">
              Deploy to Google Ads API
            </text>
          </motion.g>
        </motion.g>
      </g>

      {/* DEPLOYED TOAST */}
      <motion.g style={{ opacity: toastOpacity, y: toastY }}>
        <rect x="420" y="556" width="300" height="46" rx="10" fill="#0d3b26" stroke="#34a853" strokeWidth="1.5" />
        <circle cx="446" cy="579" r="10" fill="#34a853" />
        <path d="M441 579 L445 583 L452 574" fill="none" stroke="#0d3b26" strokeWidth="2.2" strokeLinecap="round" />
        <text x="466" y="584" fill="#81c995" fontSize="12.5" fontWeight="700">
          Deployed · AssetGroup synced (14ms)
        </text>
      </motion.g>

      <Cursor
        p={p}
        x={[
          [0, 0.045, 0.14, 0.16],
          [640, 258, 258, 920],
        ]}
        y={[
          [0, 0.045, 0.14, 0.16],
          [520, 230, 230, 438],
        ]}
      />
    </Scene>
  );
}
