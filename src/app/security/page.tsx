"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Database,
  KeyRound,
  Lock,
  Minus,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { ZeroKnowledgeScrollStory } from "@/components/security/ZeroKnowledgeScrollStory";

const RBAC_MATRIX = [
  {
    capability: "Zero-Knowledge API Token Vault (MCC & Dev Token)",
    admin: "Full + Password Gate",
    manager: false,
    client: false,
  },
  {
    capability: "Billing, Payment Methods & Subscription Plans",
    admin: "Full Control",
    manager: false,
    client: false,
  },
  {
    capability: "Cross-Client Financial Deep-Dive (/analytics/deep-dive)",
    admin: "Full Ledger",
    manager: false,
    client: false,
  },
  {
    capability: "CRM Pipeline, Leads, Notes & Follow-Up Tasks",
    admin: "Full Access",
    manager: "Hands-On Ops",
    client: false,
  },
  {
    capability: "400vh+ Scroll-Story Funnel Studio & Vercel Blob",
    admin: "Full Access",
    manager: "Hands-On Ops",
    client: false,
  },
  {
    capability: "Worker-Thread SEO Crawler & Sitemap XML Export",
    admin: "Full Access",
    manager: "Hands-On Ops",
    client: "Shared Reports",
  },
  {
    capability: "Resend Cold Outreach & Webhook Event Stream",
    admin: "Full Access",
    manager: "Hands-On Ops",
    client: false,
  },
  {
    capability: "Rationed Ad Account Analytics (/portal/analytics)",
    admin: "Preview Any Client",
    manager: "Compulsory Status",
    client: "Own Account Only",
  },
];

export default function SecurityPage() {
  return (
    <MarketingLayout>
      {/* 1. HERO */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] h-[360px] bg-emerald-500/15 dark:bg-emerald-600/15 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="success" dot className="mb-5">
            Zero-Knowledge Vault • Strict Tenant Isolation • SOC-2 Ready Controls
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Enterprise Security Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 dark:from-emerald-400 dark:via-cyan-300 dark:to-indigo-400">
              Absolute Data Ownership
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            When you connect a high-spend Google Ads Manager Account or client
            CRM list, trust is non-negotiable. Inspect how OmniPulse encrypts
            every token, isolates every tenant, and enforces strict role
            boundaries.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/register">
              Deploy Encrypted Workspace
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" href="/docs">
              Read Operator Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. 420VH ZERO-KNOWLEDGE SCROLL STORY */}
      <ZeroKnowledgeScrollStory />

      {/* 3. ADMIN / MANAGER / CLIENT SECURITY MATRIX */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" className="mb-3">
            Least-Privilege Governance
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Three-Role Access Boundary Matrix
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Give your team complete day-to-day velocity while keeping payment
            methods, API developer keys, and cross-client financial ledgers
            strictly locked to Admin owners.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] shadow-xl">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-xs font-mono uppercase text-zinc-500">
              <tr>
                <th className="py-4 px-6">Console Surface / Capability</th>
                <th className="py-4 px-4 text-indigo-600 dark:text-indigo-400">
                  Admin (Owner)
                </th>
                <th className="py-4 px-4 text-cyan-600 dark:text-cyan-400">
                  Manager (Optional Staff)
                </th>
                <th className="py-4 px-6 text-emerald-600 dark:text-emerald-400">
                  Client (Ad Account Owner)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {RBAC_MATRIX.map((row) => (
                <tr key={row.capability}>
                  <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">
                    {row.capability}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4" /> {row.admin}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {row.manager ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                        <Check className="w-4 h-4" /> {row.manager}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-rose-500">
                        <Minus className="w-4 h-4" /> Blocked (403)
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {row.client ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" /> {row.client}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
                        <Minus className="w-4 h-4" /> Isolated
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* 4. SYSTEM STATUS, PRIVACY & DATA GOVERNANCE */}
      <AnimatedSection
        id="status"
        spacing="py-24"
        className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/60 dark:bg-[#0c0c0e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard
              icon={<Zap className="w-5 h-5" />}
              badge={<Badge variant="success" dot>99.99% SLA</Badge>}
              title="Live Subsystem Status"
              description="Real-time operational health across API gateways, MCC sync schedulers, SEO worker pools, and webhook listeners."
            >
              <div className="mt-3 space-y-2 font-mono text-xs">
                {[
                  "Express v1 API & Zod Gateway",
                  "Google Ads & Meta Sync Engine",
                  "Resend & Stripe HMAC Webhooks",
                  "Funnel Sandbox & Vercel Blob CDN",
                ].map((svc) => (
                  <div
                    key={svc}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {svc}
                    </span>
                    <span className="text-emerald-500 font-bold">
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard
              id="privacy"
              icon={<KeyRound className="w-5 h-5" />}
              badge={<Badge variant="brand">Privacy Commitment</Badge>}
              title="First-Party Data Privacy"
              description="Your client lists, campaign metrics, and API credentials belong 100% to your workspace—never resold, pooled, or used to train external models."
            >
              <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Immediate hard-delete cascades on funnel &amp; lead removal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  1-click unsubscribe enforcement across all Resend sends
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  GDPR &amp; CCPA export-ready CSV reporting
                </li>
              </ul>
            </BentoCard>

            <BentoCard
              id="terms"
              icon={<Database className="w-5 h-5" />}
              badge={<Badge variant="neutral">Terms &amp; BYOK</Badge>}
              title="Transparent Platform Terms"
              description="Bring your own Google Ads Developer Token, Meta System Token, and Resend domain with zero vendor lock-in or hidden seat taxes."
            >
              <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  Export sitemaps, leads, and campaign reports anytime
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  Revoke OAuth or rotate tokens instantaneously in Settings
                </li>
              </ul>
            </BentoCard>
          </div>
        </div>
      </AnimatedSection>
    </MarketingLayout>
  );
}
