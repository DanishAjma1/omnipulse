"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  CheckCircle2,
  Database,
  KeyRound,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SecurityAct {
  act: string;
  title: string;
  lead: string;
  description: string;
  proofs: string[];
}

const ACTS: SecurityAct[] = [
  {
    act: "ACT 01 // CRYPTOGRAPHIC VAULT",
    title: "AES-256-GCM Zero-Knowledge Credential Storage",
    lead: "Your Google Developer Token & OAuth Refresh Token never rest in plaintext.",
    description:
      "Every credential submitted during onboarding or Settings updates is encrypted immediately using authenticated AES-256-GCM with unique initialization vectors and auth tags. API responses return masked previews only, and rotating keys requires live password re-verification.",
    proofs: [
      "Unique random 12-byte IV + 16-byte GCM authentication tag per secret",
      "On-demand Google OAuth access token exchange — zero background polling",
      "Masked read endpoints (GET /settings/google-credentials)",
    ],
  },
  {
    act: "ACT 02 // BLAST-RADIUS ISOLATION",
    title: "Mathematical Multi-Tenant & Client Scoping",
    lead: "Every query is double-locked by JWT tenantId and ClientAdAllocation.",
    description:
      "Authenticated API routes enforce tenant matching between your signed JWT and live database state before any business logic runs. When external ad clients sign in, enforceClientScope restricts Google and Meta queries strictly to their rationed ad accounts or campaigns.",
    proofs: [
      "Cross-tenant requests rejected with 403 prior to controller execution",
      "Client portals cannot construct free-text queries for unallocated IDs",
      "Composite (tenantId, platform) unique constraints prevent row collisions",
    ],
  },
  {
    act: "ACT 03 // ROLE FIREWALL",
    title: "Granular Admin, Manager & Client Guardrails",
    lead: "Delegate daily operations to Managers without exposing cards or financial deep-dives.",
    description:
      "Add optional Manager accounts for media buyers and account managers. Managers operate CRM pipelines, Scroll-Story Funnels, SEO crawlers, and Outreach freely—while strict middleware blocks Payment Methods, Credential Vaults, and Cross-Client Deep-Dive ledgers.",
    proofs: [
      "ADMIN_ONLY gate on /settings/billing/* and card setup sessions",
      "ADMIN_ONLY gate on /analytics/deep-dive cross-client financial tables",
      "1-click account suspension revokes active sessions immediately",
    ],
  },
  {
    act: "ACT 04 // RUNTIME & WEBHOOK DEFENSE",
    title: "Sandboxed Iframes, Raw-Body HMAC & Rate-Limit Shields",
    lead: "Defense-in-depth across browser previews, webhooks, and outbound APIs.",
    description:
      "Funnel previews render inside isolated sandboxed iframes so custom styles never touch your console DOM. Inbound Stripe and Resend webhooks verify cryptographic signatures against raw request bytes before JSON parsing, while rate limiters shield Google and Meta quotas.",
    proofs: [
      "Svix & Stripe raw-body HMAC verification mounted pre-JSON parser",
      "Strict shared Zod input validation on every REST body & query",
      "Bounded Worker Thread pool isolates heavy SEO crawls from API event loop",
    ],
  },
];

function SecurityActLayer({
  progress,
  index,
  total,
  item,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  item: SecurityAct;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const fadeIn = start + seg * 0.16;
  const fadeOut = start + seg * 0.84;
  const end = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, 0.01, fadeOut, end]
      : index === total - 1
        ? [start, fadeIn, 0.99, 1]
        : [start, fadeIn, fadeOut, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    index === 0 ? [1, 1, 1, 0.96] : [0.96, 1, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
    >
      <div className="lg:col-span-6 space-y-4">
        <span className="inline-block px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          {item.act}
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base font-semibold text-indigo-300">
          {item.lead}
        </p>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {item.description}
        </p>
        <ul className="space-y-2 pt-2">
          {item.proofs.map((proof) => (
            <li
              key={proof}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{proof}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Visual Architecture Schematic */}
      <div className="lg:col-span-6">
        <div className="rounded-2xl border border-zinc-800 bg-[#0b0d13] p-6 shadow-2xl font-mono text-xs space-y-4">
          {index === 0 && (
            <>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" /> Input:
                  Developer Token
                </span>
                <span className="text-zinc-300">AB9x_kL29mPq01ZzW8vT4r</span>
              </div>
              <div className="text-center text-emerald-400 text-[11px] py-1">
                ↓ AES-256-GCM Encrypt (IV + 128-bit Auth Tag) ↓
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> PostgreSQL ad_credentials
                  </span>
                  <span>ENCRYPTED</span>
                </div>
                <p className="text-[11px] text-emerald-200/80 break-all">
                  enc:v1:8f3c91a0d4e2...:b7190e44c21a...:99a01f7c4d8e2b11...
                </p>
              </div>
            </>
          )}

          {index === 1 && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                <p className="text-indigo-300 font-bold flex items-center gap-2">
                  <Database className="w-4 h-4" /> Tenant A (UUID: 7f9c...001)
                </p>
                <p className="text-zinc-400 text-[11px] mt-1">
                  Client #1 Allocation → Account 441-892-1102 ONLY
                </p>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 flex items-center justify-between">
                <span>Attempted Query: ?adAccountId=999-000-1111</span>
                <span className="font-bold px-2 py-0.5 rounded bg-rose-500/20">
                  403 BLOCKED
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                <span>Authorized Query: ?adAccountId=441-892-1102</span>
                <span className="font-bold px-2 py-0.5 rounded bg-emerald-500/20">
                  200 RATIONED
                </span>
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="space-y-2.5">
              {[
                {
                  endpoint: "POST /api/v1/funnels (Create Scroll Funnel)",
                  mgr: "ALLOWED",
                  ok: true,
                },
                {
                  endpoint: "POST /api/v1/outreach/campaigns/:id/send",
                  mgr: "ALLOWED",
                  ok: true,
                },
                {
                  endpoint: "GET /api/v1/analytics/deep-dive",
                  mgr: "ADMIN ONLY (403)",
                  ok: false,
                },
                {
                  endpoint: "POST /api/v1/settings/billing/payment-method",
                  mgr: "ADMIN ONLY (403)",
                  ok: false,
                },
              ].map((row) => (
                <div
                  key={row.endpoint}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2"
                >
                  <span className="text-zinc-300 truncate">{row.endpoint}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      row.ok
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}
                  >
                    {row.mgr}
                  </span>
                </div>
              ))}
            </div>
          )}

          {index === 3 && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-cyan-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Svix &amp; Stripe Raw-Body
                  HMAC
                </span>
                <span className="text-emerald-400">VERIFIED</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-indigo-300 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Funnel Preview Sandbox Iframe
                </span>
                <span className="text-emerald-400">CSS/DOM ISOLATED</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-amber-300">
                  API Burst Rate-Limit &amp; p-limit(2)
                </span>
                <span className="text-emerald-400">QUOTA SAFE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ZeroKnowledgeScrollStory() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const barWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={trackRef}
      aria-label="Zero-Knowledge Security Scroll Story"
      className="relative h-[420vh] bg-zinc-950 text-white border-y border-zinc-800"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/12 blur-[130px]"
        />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="success" dot>
              420vh Packet-to-Vault Security Walkthrough
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              AES-256-GCM • Tenant Isolation • Role Firewall • HMAC Webhooks
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ width: barWidth }}
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500"
            />
          </div>
        </div>

        <div className="relative max-w-7xl w-full mx-auto flex-1 my-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            {ACTS.map((item, idx) => (
              <SecurityActLayer
                key={item.act}
                progress={scrollYProgress}
                index={idx}
                total={ACTS.length}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
