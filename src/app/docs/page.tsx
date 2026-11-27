"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers,
  Lock,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { ConsoleGuideScrollStory } from "@/components/docs/ConsoleGuideScrollStory";

type RoleKey = "ADMIN" | "MANAGER" | "CLIENT";

const ROLE_SIMULATOR: Record<
  RoleKey,
  {
    title: string;
    tagline: string;
    whoFor: string;
    allowed: string[];
    restricted: string[];
    defaultLanding: string;
  }
> = {
  ADMIN: {
    title: "Admin (Agency Owner / Workspace Founder)",
    tagline: "Unrestricted command over operations, vault encryption, billing & team.",
    whoFor:
      "Agency founders and technical directors who own the Google Ads MCC, Meta System Token, and Stripe billing relationship.",
    defaultLanding: "/admin/dashboard",
    allowed: [
      "Executive Control Room & Cross-Client Deep-Dive Analytics (/analytics/deep-dive)",
      "Zero-Knowledge Credential Vault (MCC ID, Developer Token & OAuth rotation)",
      "Payment Methods, Plan Upgrades & Subscription Controls (/settings/billing)",
      "Provisioning Optional Managers & Rationing Client Portal Access (/admin/clients)",
      "All CRM Deals, Contacts 360°, Scroll-Story Funnels, SEO & Resend Outreach",
    ],
    restricted: ["None — Full root tenant authority (password required to rotate keys)"],
  },
  MANAGER: {
    title: "Manager (Optional Hands-On Operations Staff)",
    tagline: "Friction-free daily execution without exposing cards, keys, or deep-dive financials.",
    whoFor:
      "Account managers, media buyers, and sales operators running daily client deliverables without needing manual per-item admin allotment.",
    defaultLanding: "/campaigns (or /crm/overview)",
    allowed: [
      "CRM Deals Kanban, Contacts 360°, Call Notes & Daily Follow-Up Tasks",
      "400vh+ Scroll-Story Funnel Studio & Vercel Blob Media Uploads",
      "Worker-Thread Website SEO Audits & Sitemap XML Generation",
      "Resend Cold Outreach Sequences & Open/Click Activity Timelines",
      "Compulsory Campaign Creation & Operational Status Controls",
    ],
    restricted: [
      "Blocked (403 + Hidden): Payment Methods, Invoices & Subscription Cancellation",
      "Blocked (403 + Hidden): Google/Meta Developer Tokens & OAuth Vault",
      "Blocked (403 + Hidden): Cross-Client Financial Deep-Dive (/analytics/deep-dive)",
    ],
  },
  CLIENT: {
    title: "Client (External Ad-Management Retainer Client)",
    tagline: "Clean, read-only performance transparency scoped strictly to their own ad account.",
    whoFor:
      "Business owners who hired your marketing agency to manage their Google Ads or Meta Ads campaigns.",
    defaultLanding: "/portal/analytics",
    allowed: [
      "Rationed Google Ads & Meta Campaign KPIs (Spend, Clicks, Conversions, CTR, ROAS)",
      "Time-series performance charts for their explicitly granted ClientAdAllocation scope",
      "Shared SEO health summaries & campaign support requests",
    ],
    restricted: [
      "Zero visibility into other agency clients or agency-wide MCC hierarchy",
      "Read-only scope — cannot mutate bids, budgets, funnels, or outreach lists",
    ],
  },
};

interface DocModuleGuide {
  id: string;
  category: "Onboarding" | "Ads & Analytics" | "Growth Tools" | "Security & API";
  title: string;
  route: string;
  summary: string;
  steps: string[];
  proTip: string;
}

const MODULE_GUIDES: DocModuleGuide[] = [
  {
    id: "quickstart",
    category: "Onboarding",
    title: "1. Two-Step Free BYOK Workspace Setup",
    route: "/register → /settings",
    summary:
      "Create your isolated agency tenant in under 3 minutes with verified email ownership and encrypted API keys.",
    steps: [
      "Enter your work email on /register to receive a 6-digit verification code via Resend.",
      "Provide your 10-digit Google Ads MCC ID (XXX-XXX-XXXX) and 20–32 character Developer Token.",
      "Connect Google OAuth in Settings (/settings) so on-demand access tokens refresh automatically without background polling.",
    ],
    proTip:
      "All secrets are encrypted immediately with AES-256-GCM. Rotating credentials later requires re-entering your current account password.",
  },
  {
    id: "mcc-sync",
    category: "Ads & Analytics",
    title: "2. Google Ads MCC Sync & 3-Tier Reporting",
    route: "/admin/dashboard • /campaigns • /ad-groups • /ads",
    summary:
      "Discover every child client account under your MCC and inspect normalized metrics from Campaign down to individual Ads.",
    steps: [
      "Click Sync MCC on the Control Room dashboard to discover all non-manager child accounts (excluding self-MCC loops).",
      "Drill down from /campaigns into /ad-groups, /ads, or /asset-groups for Performance Max.",
      "Switch date presets (Today, Last 7 Days, Last 30 Days) in the top header—mapped natively to both Google GAQL and Meta Insights.",
    ],
    proTip:
      "OmniPulse automatically runs a self-rescheduling 01:00 nightly sync and prunes rolling cache rows older than 30 days.",
  },
  {
    id: "campaign-studio",
    category: "Ads & Analytics",
    title: "3. Campaign Studio (Search, PMax & Meta)",
    route: "/campaigns/create",
    summary:
      "Launch compliant multi-network ad structures without switching browser tabs or fighting raw API field masks.",
    steps: [
      "Choose Google Ads (Search, Performance Max, Smart, Demand Gen) or Meta Ads.",
      "Configure daily budgets, bidding strategy (Maximize Conversions, Target CPA, Target ROAS), and geo targeting.",
      "Attach Ad Groups + Responsive Search Ads (up to 15 headlines) or PMax Asset Groups in one guided flow.",
    ],
    proTip:
      "Deleting a Google campaign sets status to REMOVED in compliance with Google Ads API v17+ rules—preserving historical spend integrity.",
  },
  {
    id: "funnel-studio",
    category: "Growth Tools",
    title: "4. 400vh+ Scroll-Story Funnel Studio & Vercel Blob",
    route: "/admin/funnels",
    summary:
      "Build high-converting, long-form scroll-story landing pages with zero AI wait time and complete visual editing.",
    steps: [
      "Pick one of 3 distinct 400vh+ templates: Obsidian Command (frosted pill nav), Swiss Daylight Studio (editorial masthead), or Velocity Matrix HUD (floating capsule nav).",
      "Toggle between Editor, Split Live, and Full 400vh Preview modes; click any block or Edit pill inside the sandboxed iframe to jump straight to its inspector tab.",
      "Customize Navbar & Footer links, remove or restore any of the 12 equal-spaced acts, and upload up to 3 persistent images per template to Vercel Blob CDN.",
    ],
    proTip:
      "Use 'Apply Theme' to switch the entire Navbar, Hero, and color architecture live while keeping all your headlines, links, and uploaded Blob images intact.",
  },
  {
    id: "seo-engine",
    category: "Growth Tools",
    title: "5. Worker-Thread Technical SEO Crawler & Sitemap Generator",
    route: "/admin/seo",
    summary:
      "Audit prospect or client websites asynchronously for broken metadata, heading structure, and Core Web Vitals.",
    steps: [
      "Enter any target domain and max page budget (up to 50+ pages) and click Start Audit.",
      "A bounded Node.js Worker Thread pool crawls pages in the background so API latency never spikes.",
      "Inspect per-page SEO scores in the slide-over drawer and export CSV reports or drop-in sitemap.xml files in one click.",
    ],
    proTip:
      "Pair an SEO Audit score with Cold Outreach to send prospects undeniable proof of missing revenue opportunities before pitching.",
  },
  {
    id: "outreach-webhooks",
    category: "Growth Tools",
    title: "6. Unified Resend Cold Outreach & Webhook Telemetry",
    route: "/admin/outreach",
    summary:
      "Import prospect lists, personalize merge-tag sequences, and track every open, click, bounce, and unsubscribe live.",
    steps: [
      "Bulk-import contacts via CSV or paste list, then compose an HTML campaign with {{name}} and {{company}} merge tags.",
      "Launch burst sends paced safely through p-limit(2) concurrency so domain reputation stays protected.",
      "Monitor the live Svix-verified Resend webhook stream as prospects receive, open, and click your links.",
    ],
    proTip:
      "EmailSend records are idempotent on (campaignId, contactId)—re-triggering a campaign never double-emails a prospect and automatically skips unsubscribed contacts.",
  },
  {
    id: "rbac-portals",
    category: "Security & API",
    title: "7. Client Portals & Multi-Role Access Rationing",
    route: "/admin/clients → /portal/analytics",
    summary:
      "Give every retainer client a dedicated login locked strictly to their own Google or Meta ad accounts.",
    steps: [
      "Create a Client login in /admin/clients and grant account-wide (campaignId = null) or single-campaign visibility.",
      "Every client read endpoint runs enforceClientScope before touching Google/Meta—preventing cross-client data leaks.",
      "Add optional Manager accounts for internal staff so your team can run campaigns, funnels, and outreach without accessing Billing or API keys.",
    ],
    proTip:
      "Suspend or reinstate any client or staff login instantly with a single toggle—revoking JWT access on the very next request.",
  },
  {
    id: "api-webhooks",
    category: "Security & API",
    title: "8. Webhook Signatures & API Envelope Reference",
    route: "/api/v1/*",
    summary:
      "Standardized JSON envelopes, Zod request parsing, and raw-body HMAC verification for Stripe and Resend.",
    steps: [
      "All REST endpoints return { success, message, error, data } under /api/v1.",
      "Configure Resend webhooks to POST /api/v1/webhooks/resend (verified via Svix raw-body HMAC).",
      "Configure Stripe billing webhooks to POST /api/v1/billing/webhooks/stripe prior to express.json() middleware.",
    ],
    proTip:
      "Public published funnels resolve dynamically via GET /api/v1/funnels/public/:funnelId and render with full JSON-LD & OpenGraph SEO tags.",
  },
];

export default function DocsPage() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>("ADMIN");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MODULE_GUIDES.filter((mod) => {
      const matchesCat =
        activeCategory === "All" || mod.category === activeCategory;
      const matchesQuery =
        !q ||
        `${mod.title} ${mod.summary} ${mod.route} ${mod.steps.join(" ")}`
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const roleInfo = ROLE_SIMULATOR[selectedRole];

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
      setCopiedEndpoint(text);
      setTimeout(() => setCopiedEndpoint(null), 1800);
    }
  };

  return (
    <MarketingLayout>
      {/* 1. DOCS HERO */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" dot className="mb-5">
            Agency Console Documentation &amp; Interactive Playbook
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Everything Your Team Needs to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
              Command OmniPulse
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Written for both non-technical agency operators and solutions
            engineers. Scroll through our interactive 6-stage Console Guide
            below, test role permissions, or jump directly to any module
            reference.
          </p>

          {/* Quick Jump Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { label: "1. BYOK Setup", href: "#quickstart" },
              { label: "2. MCC Sync", href: "#mcc-sync" },
              { label: "3. Campaign Studio", href: "#campaign-studio" },
              { label: "4. 400vh+ Funnels", href: "#funnel-studio" },
              { label: "5. SEO & Outreach", href: "#seo-engine" },
              { label: "6. Roles & Portals", href: "#role-simulator" },
            ].map((pill) => (
              <a
                key={pill.href}
                href={pill.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500 transition-colors"
              >
                {pill.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 480VH STICKY INTERACTIVE CONSOLE GUIDE SCROLL STORY */}
      <ConsoleGuideScrollStory />

      {/* 3. INTERACTIVE 3-ROLE PERMISSION SIMULATOR */}
      <AnimatedSection
        id="role-simulator"
        spacing="py-24"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="success" className="mb-3">
            Non-Technical Role Clarity
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Interactive Role &amp; Access Simulator
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Click any role below to inspect exactly what **Admins**, optional
            **Managers**, and external **Ad Clients** can see and do inside the
            Agency Console.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 gap-1.5">
            {(["ADMIN", "MANAGER", "CLIENT"] as RoleKey[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRole === r
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {r === "ADMIN"
                  ? "Admin (Owner)"
                  : r === "MANAGER"
                    ? "Manager (Staff)"
                    : "Client (Portal)"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-10 shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {roleInfo.title}
              </h3>
              <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {roleInfo.tagline}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
                {roleInfo.whoFor}
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl font-mono text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              Home Route: {roleInfo.defaultLanding}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ✓ Hands-On Capabilities Granted
              </h4>
              <ul className="space-y-2.5">
                {roleInfo.allowed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                🔒 Security Guardrails &amp; Blocked Surfaces
              </h4>
              <ul className="space-y-2.5">
                {roleInfo.restricted.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <Lock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. SEARCHABLE 8-MODULE CONSOLE PLAYBOOK */}
      <AnimatedSection
        spacing="py-24"
        className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#0c0c0e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Badge variant="brand" className="mb-3">
                Complete Feature Reference
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Module-by-Module Operator Guide
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search funnels, MCC, SEO, Resend…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "All",
              "Onboarding",
              "Ads & Analytics",
              "Growth Tools",
              "Security & API",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredModules.map((mod) => (
              <BentoCard
                key={mod.id}
                id={mod.id}
                icon={<BookOpen className="w-5 h-5" />}
                badge={<Badge variant="neutral">{mod.category}</Badge>}
                headerAction={
                  <button
                    type="button"
                    onClick={() => handleCopy(mod.route)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-indigo-500 flex items-center gap-1"
                    title="Copy route path"
                  >
                    {copiedEndpoint === mod.route ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" /> Copied
                      </>
                    ) : (
                      mod.route
                    )}
                  </button>
                }
                title={mod.title}
                description={mod.summary}
                footer={
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Operator Tip:</strong> {mod.proTip}
                    </span>
                  </div>
                }
              >
                <ol className="mt-3 space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {mod.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </BentoCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. DEVELOPER & ARCHITECTURE SUMMARY */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="brand">Technical Stack &amp; Reliability</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Want to Inspect Our Encryption &amp; Tenant Isolation Model?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore our dedicated Security &amp; Architecture scroll story to
              see how AES-256-GCM token encryption, PostgreSQL tenant scoping,
              and Svix webhook verification protect every client account.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="primary" href="/security">
                Explore Security Architecture
                <ShieldCheck className="w-4 h-4" />
              </Button>
              <Button variant="secondary" href="/register">
                Launch Your Workspace
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 font-mono text-xs">
            {[
              { icon: Lock, label: "Vault Cipher", val: "AES-256-GCM" },
              { icon: Cpu, label: "SEO Queue", val: "Worker Threads" },
              { icon: Layers, label: "Funnel Engine", val: "400vh+ AST + Blob" },
              { icon: Mail, label: "Outreach", val: "Resend + Svix HMAC" },
              { icon: BarChart3, label: "Ads API", val: "Google v17+ & Meta" },
              { icon: Database, label: "Isolation", val: "Strict tenantId" },
              { icon: Code2, label: "Validation", val: "Shared Zod Schemas" },
              { icon: Zap, label: "Sync SLA", val: "99.99% Uptime" },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1"
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                <p className="text-zinc-500 text-[10px] uppercase">{label}</p>
                <p className="text-white font-bold">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </MarketingLayout>
  );
}
