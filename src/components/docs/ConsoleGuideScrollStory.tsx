"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  Check,
  Copy,
  FileCode2,
  GitBranch,
  KeyRound,
  Layers,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * DOCS SCROLL STORY — Philosophy: "Natural-Scroll Engineering Blueprint + Sticky Live HTTP Inspector"
 * Unlike Marketing/Pricing/Platform locked viewports, technical documentation lets operators
 * read at their own vertical scroll pace on the left while a pinned protocol inspector on the
 * right morphs live request headers, middleware pipelines, and JSON response envelopes via
 * viewport intersection (`onViewportEnter`) or direct click selection.
 */

interface SpecSection {
  id: string;
  specCode: string;
  method: "POST" | "PUT" | "GET" | "MIDDLEWARE";
  endpoint: string;
  status: string;
  latency: string;
  title: string;
  rationale: string;
  parameters: Array<{ name: string; type: string; rule: string }>;
  pipeline: [string, string, string];
  requestSnippet: string;
  responseSnippet: string;
}

const SPECS: SpecSection[] = [
  {
    id: "spec-envelope",
    specCode: "SPEC 01 // DETERMINISTIC REST CONTRACT",
    method: "POST",
    endpoint: "/api/v1/onboarding/otp/verify",
    status: "200 OK",
    latency: "18ms",
    title: "Unified JSON Envelope & Pre-Controller Zod Parsing",
    rationale:
      "Every endpoint across `/api/v1` enforces a single four-key response shape (`success`, `message`, `error`, `data`). Request bodies, URL params, and query strings are validated with shared `@agency/config` Zod schemas before controller code executes.",
    parameters: [
      { name: "email", type: "string", rule: "Trimmed, RFC-5322 email <= 254 chars" },
      { name: "code", type: "string", rule: "6-digit numeric OTP (/^\\d{6}$/)" },
      { name: "envelope", type: "ApiEnvelope<T>", rule: "Guaranteed on 2xx, 4xx, and 5xx" },
    ],
    pipeline: ["Zod Schema Gate", "OTP Hash Compare", "Signed Token Mint"],
    requestSnippet: `POST /api/v1/onboarding/otp/verify HTTP/1.1
Content-Type: application/json

{
  "email": "ops@northstar.agency",
  "code": "482910"
}`,
    responseSnippet: `{
  "success": true,
  "message": "Email verified",
  "error": null,
  "data": {
    "verified": true,
    "email": "ops@northstar.agency",
    "verificationToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`,
  },
  {
    id: "spec-vault",
    specCode: "SPEC 02 // AUTHENTICATED ENCRYPTION AT REST",
    method: "PUT",
    endpoint: "/api/v1/settings/google-credentials",
    status: "200 OK",
    latency: "42ms",
    title: "AES-256-GCM Ciphertext Envelope & Masked Reads",
    rationale:
      "Plaintext API credentials never touch disk or outbound read DTOs. On write, the server verifies the operator's current password via bcrypt, generates a fresh 12-byte random IV, seals the secret with AES-256-GCM, and stores `iv:authTag:ciphertext`.",
    parameters: [
      { name: "currentPassword", type: "string", rule: "Re-authenticated before key rotation" },
      { name: "mccId", type: "string", rule: "10-digit Google Manager ID (XXX-XXX-XXXX)" },
      { name: "developerToken", type: "string", rule: "20–32 URL-safe chars, masked on GET" },
    ],
    pipeline: ["Bcrypt Re-Auth", "12B IV + GCM Seal", "Zero-Plaintext DTO"],
    requestSnippet: `PUT /api/v1/settings/google-credentials HTTP/1.1
Authorization: Bearer <admin_jwt>

{
  "currentPassword": "••••••••••••",
  "mccId": "441-892-1102",
  "developerToken": "AB9x_kL29mPq01ZzW8vT4r"
}`,
    responseSnippet: `{
  "success": true,
  "message": "Credentials rotated",
  "error": null,
  "data": {
    "mccIdMasked": "***-***-1102",
    "hasDeveloperToken": true,
    "hasOAuthRefreshToken": true,
    "status": "ACTIVE"
  }
}`,
  },
  {
    id: "spec-webhooks",
    specCode: "SPEC 03 // RAW-BODY CRYPTOGRAPHIC WEBHOOKS",
    method: "POST",
    endpoint: "/api/v1/webhooks/resend",
    status: "200 OK",
    latency: "11ms",
    title: "Pre-JSON Raw Buffer HMAC & Replay Window Guard",
    rationale:
      "Webhook routes mount `express.raw({ type: 'application/json' })` ahead of the global JSON body parser so byte-exact signatures never break on whitespace normalization. Timestamps outside a 300-second window are rejected with `401`.",
    parameters: [
      { name: "svix-id", type: "header", rule: "Unique message identifier signed in payload" },
      { name: "svix-timestamp", type: "header", rule: "Unix epoch seconds (±300s tolerance)" },
      { name: "svix-signature", type: "header", rule: "Constant-time timingSafeEqual v1 HMAC" },
    ],
    pipeline: ["express.raw() Bytes", "HMAC-SHA256 Verify", "PG Atomic Tx"],
    requestSnippet: `POST /api/v1/webhooks/resend HTTP/1.1
svix-id: msg_2pL9xQv81kZ
svix-timestamp: 1764230400
svix-signature: v1,g0hM9r2Jw8Pq...=

{"type":"email.opened","data":{"email_id":"re_91a","tags":[{"name":"tenantId","value":"t_01"}]}}`,
    responseSnippet: `{
  "success": true,
  "message": "OK",
  "error": null,
  "data": {
    "received": true
  }
}`,
  },
  {
    id: "spec-workers",
    specCode: "SPEC 04 // ASYNCHRONOUS WORKER-THREAD DISPATCH",
    method: "POST",
    endpoint: "/api/v1/seo/audit",
    status: "202 Accepted",
    latency: "24ms",
    title: "Non-Blocking Crawl Queue & XML Sitemap Artifact",
    rationale:
      "DOM crawling and Lighthouse heuristics run inside a bounded Node `worker_threads` pool (`Math.max(1, cpus - 1)`), keeping the Express event loop responsive. Clients poll report state and stream standards-compliant `sitemap.xml` directly from PostgreSQL.",
    parameters: [
      { name: "url", type: "string", rule: "Normalized http/https origin target" },
      { name: "maxPages", type: "number", rule: "Bounded crawl budget per audit run" },
      { name: "sitemap.xml", type: "GET", rule: "Served verbatim with application/xml" },
    ],
    pipeline: ["202 Report Row", "Worker Pool Crawl", "XML Sitemap Persist"],
    requestSnippet: `POST /api/v1/seo/audit HTTP/1.1
Authorization: Bearer <staff_jwt>

{
  "url": "https://acme-dental.example",
  "maxPages": 25
}`,
    responseSnippet: `{
  "success": true,
  "message": "Audit queued",
  "error": null,
  "data": {
    "reportId": "seo_01J9X7K2M",
    "status": "RUNNING",
    "sitemapEndpoint": "/api/v1/seo/reports/seo_01J9X7K2M/sitemap.xml"
  }
}`,
  },
  {
    id: "spec-scoping",
    specCode: "SPEC 05 // QUERY-REWRITING ACCESS MIDDLEWARE",
    method: "MIDDLEWARE",
    endpoint: "GET /api/v1/campaigns?platform=GOOGLE",
    status: "200 / 403",
    latency: "9ms",
    title: "JWT Tenant Lock & Mathematical ClientAdAllocation Scope",
    rationale:
      "Every protected route executes `authenticate → enforceTenantIsolation`. When `role === 'CLIENT'`, `enforceClientScope` resolves `ClientAdAllocation` rows from PostgreSQL and injects `req.clientScope.campaignIds` straight into the upstream GAQL/Graph predicate.",
    parameters: [
      { name: "req.tenantId", type: "UUID", rule: "Verified against active DB tenant record" },
      { name: "campaignIds: null", type: "Scope", rule: "Full allocated ad-account visibility" },
      { name: "campaignIds: string[]", type: "Scope", rule: "Restricted to listed campaign IDs only" },
    ],
    pipeline: ["JWT Signature", "Tenant DB Match", "ClientAdAllocation"],
    requestSnippet: `GET /api/v1/campaigns?platform=GOOGLE&adAccountId=4418921102
Authorization: Bearer <client_portal_jwt>

// Middleware resolution:
// req.user = { role: "CLIENT", tenantId: "t_01" }
// req.clientScope = { adAccountId: "4418921102", campaignIds: ["cmp_881", "cmp_884"] }`,
    responseSnippet: `{
  "success": true,
  "message": "OK",
  "error": null,
  "data": {
    "scope": "RATIONED_CAMPAIGNS",
    "items": [
      { "id": "cmp_881", "name": "Brand Search — US", "roas": 5.42 },
      { "id": "cmp_884", "name": "PMax Lead Gen", "roas": 4.18 }
    ]
  }
}`,
  },
];

const METHOD_BADGE: Record<SpecSection["method"], string> = {
  POST: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  PUT: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  GET: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  MIDDLEWARE: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
};

export function ConsoleGuideScrollStory() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tab, setTab] = useState<"request" | "response">("response");
  const [copied, setCopied] = useState(false);

  const activeSpec = SPECS[activeIdx] ?? SPECS[0];

  const copyActiveSnippet = () => {
    const text =
      tab === "request" ? activeSpec.requestSnippet : activeSpec.responseSnippet;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <section
      aria-label="Engineering protocol and request lifecycle reference"
      className="relative border-y border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/90 dark:bg-[#0c0f17] py-24"
    >
      {/* Subtle architectural blueprint grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18] [background-image:linear-gradient(to_right,#94a3b822_1px,transparent_1px),linear-gradient(to_bottom,#94a3b822_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blueprint Masthead */}
        <div className="mb-14 flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="brand" dot>
              Protocol &amp; Middleware Specification
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Read the Request Lifecycle as Code.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Scroll naturally through the five architectural specifications on
              the left. The pinned protocol inspector on the right updates live
              with the exact HTTP headers, middleware gates, and JSON envelope.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5">
              <FileCode2 className="h-3.5 w-3.5 text-indigo-500" />
              Base: /api/v1
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5">
              <Braces className="h-3.5 w-3.5 text-emerald-500" />
              Shared Zod AST
            </span>
          </div>
        </div>

        {/* Split Editorial Blueprint: Left Natural Scroll, Right Sticky Inspector */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Natural-scroll engineering spec sheets */}
          <div className="space-y-12 lg:col-span-6 lg:space-y-20 lg:pb-24">
            {SPECS.map((spec, idx) => {
              const isCurrent = idx === activeIdx;
              const Icons = [Braces, KeyRound, Webhook, Layers, ShieldCheck];
              const SpecIcon = Icons[idx] ?? GitBranch;

              return (
                <motion.article
                  key={spec.id}
                  onViewportEnter={() => setActiveIdx(idx)}
                  viewport={{ margin: "-38% 0px -38% 0px", amount: 0.2 }}
                  onClick={() => setActiveIdx(idx)}
                  className={`cursor-pointer rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                    isCurrent
                      ? "border-indigo-500/70 bg-white dark:bg-[#111623] shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/30"
                      : "border-zinc-200/90 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                      <SpecIcon className="h-4 w-4" />
                      {spec.specCode}
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${METHOD_BADGE[spec.method]}`}
                    >
                      {spec.method}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {spec.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {spec.rationale}
                  </p>

                  {/* Parameter Contract Table */}
                  <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                    <div className="border-b border-zinc-200 dark:border-zinc-800 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Contract Fields &amp; Invariants
                    </div>
                    <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                      {spec.parameters.map((param) => (
                        <div
                          key={param.name}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-3.5 py-2.5 text-xs"
                        >
                          <div className="flex items-center gap-2 font-mono">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                              {param.name}
                            </span>
                            <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] text-indigo-600 dark:text-indigo-300">
                              {param.type}
                            </span>
                          </div>
                          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                            {param.rule}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* RIGHT: Sticky Live HTTP & Schema Inspector */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#090c12] text-zinc-100 shadow-2xl">
              {/* Inspector Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-[#0f131d] px-4 py-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-300">
                    {activeSpec.method}
                  </span>
                  <code className="truncate font-mono text-xs text-zinc-200">
                    {activeSpec.endpoint}
                  </code>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-300 font-semibold">
                    {activeSpec.status}
                  </span>
                  <span className="text-zinc-500">{activeSpec.latency}</span>
                </div>
              </div>

              {/* 3-Step Middleware Pipeline Strip */}
              <div className="grid grid-cols-3 gap-2 border-b border-zinc-800/90 bg-zinc-950/70 px-4 py-3 font-mono text-[11px]">
                {activeSpec.pipeline.map((gate, i) => (
                  <div
                    key={gate}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-zinc-300"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/25 text-[9px] font-bold text-indigo-300">
                      {i + 1}
                    </span>
                    <span className="truncate">{gate}</span>
                  </div>
                ))}
              </div>

              {/* Payload Tabs + Copy Button */}
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 bg-[#0b0f18]">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTab("request")}
                    className={`rounded-lg px-3 py-1 font-mono text-xs transition-colors ${
                      tab === "request"
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    HTTP Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("response")}
                    className={`rounded-lg px-3 py-1 font-mono text-xs transition-colors ${
                      tab === "response"
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    JSON Envelope
                  </button>
                </div>

                <button
                  type="button"
                  onClick={copyActiveSnippet}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-zinc-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Animated Code Pane */}
              <div className="min-h-[260px] p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={`${activeSpec.id}-${tab}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-emerald-200/95 whitespace-pre-wrap"
                  >
                    {tab === "request"
                      ? activeSpec.requestSnippet
                      : activeSpec.responseSnippet}
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Spec Jump Footer */}
              <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0f131d] px-4 py-2.5 font-mono text-[11px] text-zinc-400">
                <span>
                  Active Spec {activeIdx + 1} of {SPECS.length}
                </span>
                <div className="flex gap-1.5">
                  {SPECS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Inspect ${s.title}`}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeIdx
                          ? "w-6 bg-indigo-400"
                          : "w-2 bg-zinc-700 hover:bg-zinc-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
