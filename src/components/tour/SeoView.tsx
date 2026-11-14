"use client";

import { motion, useTransform } from "framer-motion";
import { useCounterText, useRamp, type Progress } from "./timeline";

const ROWS = [
  { url: "/collections/umrah-packages", lcp: "1.1s", status: "Indexed", ok: true },
  { url: "/services/google-ads-pmax", lcp: "1.2s", status: "Indexed", ok: true },
  { url: "/pricing/enterprise-mcc", lcp: "2.6s", status: "Canonical Warn", ok: false },
  { url: "/lp/baku-holidays-2026", lcp: "0.9s", status: "Indexed", ok: true },
  { url: "/contact/agency-desk", lcp: "1.0s", status: "Indexed", ok: true },
];

const SERIES_QUOTE =
  "M28 118 L52 118 L76 88 L100 88 L124 104 L148 24 L172 112 L196 110 L220 118 L244 38 L268 74 L292 112 L316 70 L340 86 L364 86 L388 114 L412 104 L436 48";
const SERIES_SPEND =
  "M28 102 L52 86 L76 42 L100 48 L124 56 L148 49 L172 74 L196 116 L220 118 L244 60 L268 74 L292 82 L316 82 L340 96 L364 118 L388 116 L412 88 L436 72";
const SERIES_CPL =
  "M28 58 L52 16 L76 82 L100 84 L124 78 L148 98 L172 32 L196 118 L220 118 L244 98 L268 94 L292 68 L316 104 L340 108 L364 118 L388 118 L412 108 L436 92";

/** SEO audit table + multi-series Google Ads Report chart (scene 3). */
export function SeoView({ p }: { p: Progress }) {
  const opacity = useRamp(p, 0.5, 0.54);
  const scannerLeft = useTransform(p, [0.52, 0.68], ["0%", "100%"]);
  const scannerOpacity = useTransform(p, [0.52, 0.54, 0.66, 0.69], [0, 1, 1, 0]);
  const score = useCounterText(p, 0.54, 0.68, 98);
  const roas = useCounterText(p, 0.56, 0.7, 4.8, 1);
  const draw = useTransform(p, [0.55, 0.7], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 p-5">
      <div className="grid h-full grid-cols-5 gap-4">
        {/* Left: Technical Crawl Table */}
        <div className="col-span-2 flex flex-col justify-between rounded-xl border border-white/10 bg-[#121217] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Technical SEO Score
              </p>
              <p className="text-4xl font-extrabold tracking-tight text-white">
                <motion.span>{score}</motion.span>
                <span className="text-lg text-zinc-500">/100</span>
              </p>
            </div>
            <span className="rounded-md bg-emerald-500/15 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-400">
              258 URLs Crawled
            </span>
          </div>

          <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-left font-mono text-[10px]">
              <thead className="bg-white/5 text-zinc-400">
                <tr>
                  <th className="px-2.5 py-1.5">URL Path</th>
                  <th className="px-2 py-1.5 text-right">LCP</th>
                  <th className="px-2.5 py-1.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-200">
                {ROWS.map((r) => (
                  <tr key={r.url}>
                    <td className="truncate px-2.5 py-1.5">{r.url}</td>
                    <td className="px-2 py-1.5 text-right text-zinc-400">{r.lcp}</td>
                    <td
                      className={`px-2.5 py-1.5 text-right font-semibold ${
                        r.ok ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {r.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: White Google Ads Report Multi-Series Card */}
        <div className="col-span-3 flex flex-col justify-between rounded-xl border-2 border-amber-400 bg-white p-4 text-slate-900 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-extrabold text-slate-900">
                Google Ads Report ·{" "}
                <span className="text-rose-600">Value &amp; Spend ▾</span>
              </p>
              <div className="mt-1 flex items-center gap-3 text-[10px] font-semibold text-slate-600">
                <span>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  $19.26K Quote
                </span>
                <span>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  $27.55K Spend
                </span>
                <span>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />
                  $290.02 Cost/Lead
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400">Blended ROAS</span>
              <p className="text-xl font-extrabold text-indigo-600">
                <motion.span>{roas}</motion.span>x
              </p>
            </div>
          </div>

          <svg viewBox="0 0 450 130" className="my-1 h-32 w-full" preserveAspectRatio="none">
            {[28, 58, 88, 118].map((y) => (
              <line key={y} x1="24" x2="440" y1={y} y2={y} stroke="#e2e8f0" />
            ))}
            <text x="20" y="31" fill="#64748b" fontSize="8" textAnchor="end">$6K</text>
            <text x="20" y="61" fill="#64748b" fontSize="8" textAnchor="end">$4K</text>
            <text x="20" y="91" fill="#64748b" fontSize="8" textAnchor="end">$2K</text>
            <text x="20" y="121" fill="#64748b" fontSize="8" textAnchor="end">$0</text>

            <motion.path
              d={SERIES_SPEND}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.2"
              strokeLinejoin="round"
              style={{ pathLength: draw }}
            />
            <motion.path
              d={SERIES_QUOTE}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.4"
              strokeLinejoin="round"
              style={{ pathLength: draw }}
            />
            <motion.path
              d={SERIES_CPL}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.2"
              strokeLinejoin="round"
              style={{ pathLength: draw }}
            />
          </svg>

          <div className="grid grid-cols-4 gap-2 pt-1 text-left">
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1">
              <p className="text-[9px] font-semibold text-slate-500">Impr. Share</p>
              <p className="text-xs font-extrabold text-slate-900">
                80% <span className="text-[9px] text-emerald-600">↑50%</span>
              </p>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1">
              <p className="text-[9px] font-semibold text-slate-500">CTR</p>
              <p className="text-xs font-extrabold text-slate-900">
                5.72% <span className="text-[9px] text-emerald-600">↑33%</span>
              </p>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1">
              <p className="text-[9px] font-semibold text-slate-500">Cost / Click</p>
              <p className="text-xs font-extrabold text-slate-900">
                $1.37 <span className="text-[9px] text-rose-600">↓8%</span>
              </p>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1">
              <p className="text-[9px] font-semibold text-slate-500">CPM</p>
              <p className="text-xs font-extrabold text-slate-900">
                $7.56 <span className="text-[9px] text-rose-600">↑22%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ left: scannerLeft, opacity: scannerOpacity }}
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.55)]"
      />
    </motion.div>
  );
}
