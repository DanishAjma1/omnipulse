"use client";

import { motion, useTransform } from "framer-motion";
import { Scene } from "./scene";
import type { Progress } from "./phases";

const RING_RADIUS = 56;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

const AUDIT_ROWS = [
  {
    url: "/collections/luxury-umrah-2026",
    http: "200 OK",
    ok: true,
    lcp: "1.12s",
    cls: "0.01",
    inp: "64ms",
    schema: "Product + FAQ",
    status: "Indexed",
  },
  {
    url: "/packages/baku-holiday-deals",
    http: "200 OK",
    ok: true,
    lcp: "1.38s",
    cls: "0.02",
    inp: "78ms",
    schema: "OfferCatalog",
    status: "Indexed",
  },
  {
    url: "/pricing/enterprise-mcc",
    http: "200 OK",
    ok: false,
    lcp: "2.64s",
    cls: "0.09",
    inp: "142ms",
    schema: "Missing Canonical",
    status: "Warning",
  },
  {
    url: "/blog/google-ads-pmax-script",
    http: "200 OK",
    ok: true,
    lcp: "0.94s",
    cls: "0.00",
    inp: "48ms",
    schema: "Article + Breadcrumb",
    status: "Indexed",
  },
  {
    url: "/lp/schengen-express-visa",
    http: "301 → 200",
    ok: false,
    lcp: "2.89s",
    cls: "0.14",
    inp: "168ms",
    schema: "Uncompressed Hero",
    status: "Action Req",
  },
  {
    url: "/services/white-label-portals",
    http: "200 OK",
    ok: true,
    lcp: "1.08s",
    cls: "0.01",
    inp: "52ms",
    schema: "SoftwareApp",
    status: "Indexed",
  },
] as const;

const TASKS = [
  {
    title: "Add self-referencing canonical on /pricing/enterprise-mcc",
    tag: "P1 · High",
    impact: "+14% organic impr.",
    color: "#f43f5e",
    start: 0.47,
    end: 0.51,
  },
  {
    title: "Convert /lp/schengen-express-visa hero PNG to AVIF (<110KB)",
    tag: "P2 · LCP",
    impact: "-1.4s paint time",
    color: "#f59e0b",
    start: 0.5,
    end: 0.54,
  },
  {
    title: "JSON-LD OfferCatalog & FAQPage validated across 252 URLs",
    tag: "Verified",
    impact: "Rich snippets live",
    color: "#10b981",
    start: 0.53,
    end: 0.57,
  },
] as const;

// Multi-series crawl & CWV trend lines
const ORGANIC_CLICKS =
  "M732 318 L754 306 L776 284 L798 296 L820 264 L842 272 L864 246 L886 258 L908 232 L930 244 L952 218 L974 228 L996 202 L1018 210 L1040 190 L1062 184";
const CRAWL_ERRORS =
  "M732 238 L754 252 L776 244 L798 274 L820 268 L842 292 L864 288 L886 308 L908 302 L930 318 L952 315 L974 326 L996 324 L1018 330 L1040 328 L1062 332";

function TaskCard({
  p,
  task,
  index,
}: {
  p: Progress;
  task: (typeof TASKS)[number];
  index: number;
}) {
  const x = useTransform(p, [task.start, task.end], [90, 0]);
  const opacity = useTransform(p, [task.start, task.end], [0, 1]);
  const y = 390 + index * 66;

  return (
    <motion.g style={{ x, opacity }}>
      <rect x="708" y={y} width="384" height="56" rx="10" fill="#14141a" stroke="#27272a" />
      <circle cx="728" cy={y + 22} r="5" fill={task.color} />
      <text x="742" y={y + 25} fill="#f4f4f5" fontSize="11" fontWeight="600">
        {task.title}
      </text>
      <text x="742" y={y + 43} fill="#a1a1aa" fontSize="10" fontFamily="ui-monospace, monospace">
        Impact: {task.impact}
      </text>
      <text
        x="1076"
        y={y + 32}
        fill={task.color}
        fontSize="10"
        fontWeight="700"
        fontFamily="ui-monospace, monospace"
        textAnchor="end"
      >
        {task.tag}
      </text>
    </motion.g>
  );
}

/** Phase 3 [0.40 - 0.60]: Full technical SEO crawl table, scanner sweep, 0->95 ring, and CWV telemetry. */
export function SeoPhase({ p }: { p: Progress }) {
  // Horizontal scanner line sweeps top-to-bottom across the crawl table (y: 120 -> 560).
  const scanY = useTransform(p, [0.41, 0.56], [120, 560]);
  const scanOpacity = useTransform(p, [0.405, 0.42, 0.56, 0.58], [0, 1, 1, 0]);

  // Circular progress ring fills 0 -> 95%
  const dashOffset = useTransform(p, [0.42, 0.56], [RING_CIRC, RING_CIRC * (1 - 0.95)]);
  const scoreValue = useTransform(p, [0.42, 0.56], [0, 95]);
  const scoreText = useTransform(scoreValue, (v) => `${Math.round(v)}`);

  return (
    <Scene label="Technical SEO Audit crawl table, Core Web Vitals telemetry, and 95 health score">
      <rect width="1120" height="620" rx="14" fill="#09090b" />

      {/* LEFT PANEL: Wireframe Browser & Live Page-Level Technical Crawl Table */}
      <rect x="24" y="24" width="664" height="572" rx="14" fill="#0f0f14" stroke="#27272a" />
      <rect x="24" y="24" width="664" height="42" rx="14" fill="#18181f" />
      <circle cx="48" cy="45" r="5.5" fill="#f43f5e" />
      <circle cx="66" cy="45" r="5.5" fill="#f59e0b" />
      <circle cx="84" cy="45" r="5.5" fill="#10b981" />
      <rect x="108" y="33" width="360" height="24" rx="6" fill="#09090b" stroke="#27272a" />
      <text x="122" y="49" fill="#a1a1aa" fontSize="11" fontFamily="ui-monospace, monospace">
        https://acmetravel.com · Worker Thread Crawl (258 URLs)
      </text>
      <rect x="556" y="34" width="114" height="22" rx="11" fill="#042f2e" stroke="#14b8a6" />
      <text x="613" y="49" fill="#5eead4" fontSize="10" fontWeight="700" textAnchor="middle">
        ● CRAWLER ACTIVE
      </text>

      {/* Summary KPI strip inside browser */}
      {[
        ["Pages Crawled", "258 / 258", "#e4e4e7", 42],
        ["Avg LCP Paint", "1.18s (Good)", "#10b981", 202],
        ["Valid Schema", "98.4% (254)", "#818cf8", 362],
        ["Broken Links", "0 Detected", "#22d3ee", 522],
      ].map(([label, val, color, x]) => (
        <g key={label}>
          <rect x={Number(x)} y="80" width="146" height="54" rx="10" fill="#14141a" stroke="#27272a" />
          <text x={Number(x) + 14} y="100" fill="#71717a" fontSize="9.5" fontWeight="600">
            {label}
          </text>
          <text
            x={Number(x) + 14}
            y="122"
            fill={String(color)}
            fontSize="13.5"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
          >
            {val}
          </text>
        </g>
      ))}

      {/* Technical SEO Table Header */}
      <rect x="42" y="148" width="628" height="32" rx="6" fill="#18181f" stroke="#27272a" />
      <text x="56" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        URL Path
      </text>
      <text x="272" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        HTTP
      </text>
      <text x="344" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        LCP
      </text>
      <text x="400" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        CLS
      </text>
      <text x="450" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        INP
      </text>
      <text x="506" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700">
        Structured Data
      </text>
      <text x="656" y="168" fill="#a1a1aa" fontSize="10.5" fontWeight="700" textAnchor="end">
        Status
      </text>

      {/* Table Rows */}
      {AUDIT_ROWS.map((row, idx) => {
        const y = 184 + idx * 62;
        return (
          <g key={row.url}>
            <rect
              x="42"
              y={y}
              width="628"
              height="54"
              rx="8"
              fill={idx % 2 === 0 ? "#121217" : "#15151c"}
              stroke="#27272a"
            />
            <text x="56" y={y + 31} fill="#e4e4e7" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600">
              {row.url}
            </text>
            <text x="272" y={y + 31} fill={row.ok ? "#10b981" : "#f59e0b"} fontSize="10.5" fontFamily="ui-monospace, monospace">
              {row.http}
            </text>
            <text x="344" y={y + 31} fill={row.ok ? "#e4e4e7" : "#f43f5e"} fontSize="10.5" fontFamily="ui-monospace, monospace">
              {row.lcp}
            </text>
            <text x="400" y={y + 31} fill="#e4e4e7" fontSize="10.5" fontFamily="ui-monospace, monospace">
              {row.cls}
            </text>
            <text x="450" y={y + 31} fill="#a1a1aa" fontSize="10.5" fontFamily="ui-monospace, monospace">
              {row.inp}
            </text>
            <text x="506" y={y + 31} fill={row.ok ? "#a5b4fc" : "#fbbf24"} fontSize="10.5">
              {row.schema}
            </text>
            <rect
              x="600"
              y={y + 16}
              width="58"
              height="22"
              rx="6"
              fill={row.ok ? "#052e16" : "#450a0a"}
            />
            <text
              x="629"
              y={y + 31}
              fill={row.ok ? "#4ade80" : "#fda4af"}
              fontSize="9.5"
              fontWeight="700"
              textAnchor="middle"
            >
              {row.status}
            </text>
          </g>
        );
      })}

      {/* Glowing horizontal scanner line sweeping top-to-bottom */}
      <defs>
        <linearGradient id="seo-scan-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <motion.g style={{ y: scanY, opacity: scanOpacity }}>
        <rect x="30" y="-22" width="652" height="22" fill="url(#seo-scan-glow)" />
        <line
          x1="30"
          x2="682"
          y1="0"
          y2="0"
          stroke="#22d3ee"
          strokeWidth="2.8"
          style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.95))" }}
        />
      </motion.g>

      {/* RIGHT TOP: Circular SEO Health Ring (0 -> 95) */}
      <rect x="708" y="24" width="384" height="156" rx="14" fill="#0f0f14" stroke="#27272a" />
      <g transform="translate(786, 102)">
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
            filter: "drop-shadow(0 0 8px rgba(16,185,129,0.65))",
          }}
        />
        <motion.text
          x="0"
          y="8"
          textAnchor="middle"
          fill="#fafafa"
          fontSize="26"
          fontWeight="800"
          fontFamily="ui-monospace, monospace"
        >
          {scoreText}
        </motion.text>
      </g>
      <text x="868" y="76" fill="#fafafa" fontSize="16" fontWeight="700">
        Technical Audit Score
      </text>
      <text x="868" y="100" fill="#a1a1aa" fontSize="11.5">
        258 URLs · 0 server 5xx errors
      </text>
      <text x="868" y="124" fill="#10b981" fontSize="11.5" fontWeight="600" fontFamily="ui-monospace, monospace">
        ✓ Core Web Vitals: 96.2% Pass
      </text>
      <text x="868" y="146" fill="#818cf8" fontSize="11" fontFamily="ui-monospace, monospace">
        ✓ Sitemap &amp; Robots.txt synced
      </text>

      {/* RIGHT MIDDLE: Multi-Series Organic Impressions vs Crawl Anomalies Chart */}
      <rect x="708" y="194" width="384" height="178" rx="14" fill="#0f0f14" stroke="#27272a" />
      <text x="728" y="220" fill="#fafafa" fontSize="12.5" fontWeight="700">
        Organic Clicks vs. Crawl Anomalies (30d)
      </text>
      <circle cx="964" cy="216" r="4" fill="#10b981" />
      <text x="973" y="220" fill="#a1a1aa" fontSize="10">
        Clicks
      </text>
      <circle cx="1022" cy="216" r="4" fill="#f43f5e" />
      <text x="1031" y="220" fill="#a1a1aa" fontSize="10">
        Issues
      </text>

      {[248, 288, 328].map((y) => (
        <line key={y} x1="728" x2="1072" y1={y} y2={y} stroke="#27272a" strokeDasharray="3 3" />
      ))}
      <path d={ORGANIC_CLICKS} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={CRAWL_ERRORS} fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeLinejoin="round" />
      <text x="728" y="354" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace">
        Day 1
      </text>
      <text x="1072" y="354" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace" textAnchor="end">
        Day 30 (+64% clicks)
      </text>

      {/* RIGHT BOTTOM: Sliding Remediation Task Cards */}
      {TASKS.map((task, i) => (
        <TaskCard key={task.title} p={p} task={task} index={i} />
      ))}
    </Scene>
  );
}
