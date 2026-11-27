"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Database,
  KeyRound,
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
type CredentialGuideKey =
  | "dev-token"
  | "oauth-client"
  | "pull-analytics"
  | "meta-resend-ai";

interface CredentialSetupPlaybook {
  id: CredentialGuideKey;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  whereToGet: string;
  steps: Array<{ heading: string; detail: string }>;
  envKeys: Array<{ key: string; example: string; purpose: string }>;
  verificationCheck: string;
}

const CREDENTIAL_PLAYBOOKS: CredentialSetupPlaybook[] = [
  {
    id: "dev-token",
    tabLabel: "1. Google Developer Token",
    badge: "Google Ads Manager (MCC)",
    title: "How to Obtain Your Google Ads Developer Token & MCC ID",
    subtitle:
      "Every Google Ads API request requires a 10-digit Manager Account (MCC) ID and an approved 20–32 character Developer Token.",
    whereToGet: "ads.google.com → Google Ads Manager Account → Admin → API Center",
    steps: [
      {
        heading: "Create or Open a Google Ads Manager Account (MCC)",
        detail:
          "Sign in at ads.google.com/home/tools/manager-accounts/. Developer Tokens are only issued inside Manager Accounts (never standalone single-advertiser accounts). Copy the 10-digit XXX-XXX-XXXX MCC ID from the top-right bar.",
      },
      {
        heading: "Navigate to Admin (Tools & Settings) → Setup → API Center",
        detail:
          "In the left navigation of your Google Ads Manager Account, open Admin (or the wrench icon Tools & Settings), expand Setup, and click API Center.",
      },
      {
        heading: "Submit the API Access Registration Form",
        detail:
          "Provide your agency website URL, primary engineering/operations email, and select 'Internal / Agency Client Campaign Management' to immediately generate your 22-character Developer Token.",
      },
      {
        heading: "Upgrade Token Level from Test to Explorer / Basic Access",
        detail:
          "Newly generated tokens start at Test Access (works only with Google Ads test accounts). Click 'Apply for Basic Access' right inside API Center to unlock 15,000 live operations/day across production client accounts (or Standard Access for uncapped volume).",
      },
      {
        heading: "Seal Inside OmniPulse Vault (/register or /settings)",
        detail:
          "Paste your 10-digit MCC ID and Developer Token into OmniPulse during onboarding or inside Workspace Settings (/settings). OmniPulse validates format via Zod and encrypts it at rest with AES-256-GCM.",
      },
    ],
    envKeys: [
      {
        key: "GOOGLE_MCC_ID",
        example: "115-593-5025 (or 1155935025)",
        purpose: "Top-level Manager Account used to discover child client accounts",
      },
      {
        key: "GOOGLE_DEVELOPER_TOKEN",
        example: "AB9x_kL29mPq01ZzW8vT4r",
        purpose: "Authenticates agency API quota with Google Ads v17+/v25",
      },
    ],
    verificationCheck:
      "In Agency Console → /settings, verify 'MCC Account ID' displays ***-***-XXXX and 'Developer Token' reads 'Encrypted & Stored'.",
  },
  {
    id: "oauth-client",
    tabLabel: "2. Client ID & Client Secret",
    badge: "Google Cloud Console OAuth 2.0",
    title: "How to Create Google OAuth Client ID & Client Secret",
    subtitle:
      "OAuth 2.0 credentials let OmniPulse exchange short-lived access tokens on demand without ever storing your Google password.",
    whereToGet: "console.cloud.google.com → APIs & Services → Credentials",
    steps: [
      {
        heading: "Create a Google Cloud Project & Enable Google Ads API",
        detail:
          "Open console.cloud.google.com, create a project (e.g. 'OmniPulse Agency Console'), open APIs & Services → Library, search for 'Google Ads API', and click Enable.",
      },
      {
        heading: "Configure the OAuth Consent Screen & Scope",
        detail:
          "Go to APIs & Services → OAuth consent screen. Choose External (or Internal for Google Workspace), enter your agency name and support email, and add scope: https://www.googleapis.com/auth/adwords.",
      },
      {
        heading: "Publish Consent App to Production (Prevent 7-Day Expiry)",
        detail:
          "On the OAuth consent screen, click 'Publish App' to move out of 'Testing' mode—otherwise Google automatically expires OAuth refresh tokens every 7 days.",
      },
      {
        heading: "Create OAuth 2.0 Client ID (Web Application)",
        detail:
          "Open APIs & Services → Credentials → + Create Credentials → OAuth client ID. Select Application type: 'Web application' and name it 'OmniPulse Console'.",
      },
      {
        heading: "Register Authorized Redirect URI & Copy Keys",
        detail:
          "Under Authorized redirect URIs, add https://<your-domain>/api/v1/auth/google/callback (plus http://localhost:4100/api/v1/auth/google/callback for local dev). Click Create, copy GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then click 'Connect Google OAuth' inside /settings.",
      },
    ],
    envKeys: [
      {
        key: "GOOGLE_CLIENT_ID",
        example: "103212666592-...apps.googleusercontent.com",
        purpose: "Identifies your Google Cloud OAuth Web Application",
      },
      {
        key: "GOOGLE_CLIENT_SECRET",
        example: "GOCSPX-rTw1xT-huZacFGo9qrjsy...",
        purpose: "Exchanges authorization codes & refreshes access tokens",
      },
      {
        key: "Callback Redirect URI",
        example: "https://<your-domain>/api/v1/auth/google/callback",
        purpose: "Receives Google's OAuth code and vaults the encrypted refresh token",
      },
    ],
    verificationCheck:
      "Click 'Connect Google OAuth' in /settings, approve Google consent with the email that manages your MCC, and verify status turns 'Connected'.",
  },
  {
    id: "pull-analytics",
    tabLabel: "3. Pull MCC Analytics Guide",
    badge: "3-Tier Telemetry & GAQL Sync",
    title: "How to Sync Child Accounts & Pull Multi-Channel Analytics",
    subtitle:
      "Once your Developer Token and OAuth link are active, pull 30-day rolling hierarchy telemetry across every client account in clicks.",
    whereToGet: "Agency Console → /admin/dashboard • /admin/analytics • /analytics/deep-dive",
    steps: [
      {
        heading: "Trigger MCC Child Account Discovery",
        detail:
          "Open Executive Control Room (/admin/dashboard) or Client Analytics (/admin/analytics) and click 'Sync MCC'. OmniPulse queries customer_client via GAQL, skips manager self-loops, and isolates any suspended child account so active clients always complete.",
      },
      {
        heading: "Select Client Account & Date Window Preset",
        detail:
          "Use the account selector in the header or MCC Hierarchy Matrix to pick any discovered client, then toggle date windows (Today, Last 7 Days, Last 30 Days) mapped consistently across Google GAQL and Meta Insights.",
      },
      {
        heading: "Drill Through the 3-Tier Ad Hierarchy",
        detail:
          "Inspect top-level KPIs in /campaigns, click any campaign to inspect /ad-groups, and drill into /ads (Responsive Search Ads) or /asset-groups (Performance Max) with live status toggles and daily budget micro controls.",
      },
      {
        heading: "Audit Cross-Client Financials in Deep-Dive (Admin Only)",
        detail:
          "Open /analytics/deep-dive to compare blended spend, conversions, ROAS, CPA, CTR, and Impression Share across your entire agency roster—protected behind strict ADMIN-only RBAC.",
      },
      {
        heading: "Ration Read-Only Portals for External Clients",
        detail:
          "Open /admin/clients to allocate a specific ad account or campaign list to a retainer client, then click '1-Click Portal Preview' to verify their exact /portal/analytics view.",
      },
    ],
    envKeys: [
      {
        key: "POST /api/v1/analytics/sync/mcc",
        example: "Full MCC child discovery + 30d metrics",
        purpose: "Populates google_clients, google_campaigns & metric snapshots",
      },
      {
        key: "Nightly 01:00 Auto-Sync",
        example: "Self-rescheduling background sync",
        purpose: "Refreshes rolling 30-day cache & prunes stale snapshot rows",
      },
    ],
    verificationCheck:
      "Verify child accounts populate inside the MCC Hierarchy Matrix and multi-series Quote Value / Spend / Cost-per-Lead charts render.",
  },
  {
    id: "meta-resend-ai",
    tabLabel: "4. Meta, Resend & Gemini Keys",
    badge: "Outreach, Social Ads & Funnels",
    title: "How to Configure Meta Marketing API, Resend Email & Blob/AI Keys",
    subtitle:
      "Complete your full-stack agency environment for paid social campaigns, cold outreach sequences, webhook tracking, and funnel media CDN.",
    whereToGet: "business.facebook.com • resend.com/api-keys • vercel.com/storage/blob",
    steps: [
      {
        heading: "Meta System User Permanent Token & Ad Account ID",
        detail:
          "In Meta Business Settings → Users → System Users, create an Admin System User, assign your Ad Account and Facebook Page with Full Control, and click 'Generate New Token' with ads_management and ads_read scopes.",
      },
      {
        heading: "Verify Sending Domain & Create Resend API Key",
        detail:
          "In resend.com, add and verify your sending domain's DKIM/SPF DNS records, create a Sending API Key (re_...), and set RESEND_FROM_EMAIL to 'Your Agency <outreach@yourdomain.com>'.",
      },
      {
        heading: "Connect Resend Webhook Signing Secret (Svix HMAC)",
        detail:
          "In Resend → Webhooks, register https://<your-domain>/api/v1/webhooks/resend for email.delivered, email.opened, email.clicked, email.bounced, and email.complained events, then copy the whsec_... signing secret.",
      },
      {
        heading: "Optional Gemini BYOK Key & Vercel Blob Token",
        detail:
          "Save a per-tenant Gemini API Key inside /settings (encrypted with AES-256-GCM) for optional AI-assisted copy, and set BLOB_READ_WRITE_TOKEN to host up to 3 persistent funnel images on Vercel Blob CDN.",
      },
    ],
    envKeys: [
      {
        key: "META_PERMANENT_ACCESS_TOKEN / META_AD_ACCOUNT_ID",
        example: "EAA... / act_1234567890",
        purpose: "Powers Meta Campaign → Ad Set → Ad Creative studio & insights",
      },
      {
        key: "RESEND_API_KEY / RESEND_WEBHOOK_SECRET",
        example: "re_... / whsec_...",
        purpose: "Dispatches OTPs, lead alerts, p-limit(2) bursts & Svix events",
      },
      {
        key: "BLOB_READ_WRITE_TOKEN / GEMINI_API_KEY",
        example: "vercel_blob_rw_... / AIzaSy...",
        purpose: "Hosts Scroll-Story funnel visuals & optional AI copy generation",
      },
    ],
    verificationCheck:
      "Send a test outreach email from /admin/outreach and confirm Delivered/Opened events stream into the live webhook timeline.",
  },
];

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
    tagline: "Unrestricted command over operations, vault encryption, team & audit logs.",
    whoFor:
      "Agency founders and technical directors who own the Google Ads MCC, Meta System Token, and workspace governance.",
    defaultLanding: "/admin/dashboard",
    allowed: [
      "Executive Control Room & Cross-Client Deep-Dive Analytics (/analytics/deep-dive)",
      "Zero-Knowledge Credential Vault (MCC ID, Developer Token, Gemini Key & OAuth rotation)",
      "Provisioning Managers (/admin/team), Client Portals & 1-Click Portal Impersonation (/admin/clients)",
      "Immutable Security Audit Logs (/admin/audit-logs) & Self-Hosted Escalation (/admin/contact)",
      "Full CRM Kanban, Won-Deal Client Conversion, Contacts 360°, Tasks, Tickets, Funnels, SEO & Outreach",
    ],
    restricted: ["None — Full root tenant authority (password required to rotate encrypted keys)"],
  },
  MANAGER: {
    title: "Manager (Optional Hands-On Operations Staff)",
    tagline: "Friction-free daily execution across CRM, Funnels, SEO, Outreach & Campaigns.",
    whoFor:
      "Account managers, media buyers, and sales operators running daily client deliverables without needing manual per-item admin allotment.",
    defaultLanding: "/crm/overview",
    allowed: [
      "CRM Operations Home (/crm/overview), Deals Kanban (/crm/deals) & Tasks (/crm/tasks)",
      "Contacts & Leads 360° Drawer (/crm/contacts) with 1-Click Domain SEO Audit Bridge",
      "Client Request Tickets (/crm/tickets) & Public Quote Form Inbox (/admin/leads)",
      "400vh+ Scroll-Story Funnel Studio, Worker-Thread SEO Audits & Resend Cold Outreach",
      "3-Tier Google & Meta Campaign Studio (/campaigns & /campaigns/create)",
    ],
    restricted: [
      "Blocked (403 + Hidden): Google/Meta Developer Tokens, Gemini Key & OAuth Vault (/settings)",
      "Blocked (403 + Hidden): Cross-Client Financial Deep-Dive (/analytics/deep-dive)",
      "Blocked (403 + Hidden): Team Admin & Immutable Audit Logs (/admin/team, /admin/audit-logs)",
    ],
  },
  CLIENT: {
    title: "Client (External Ad-Management Retainer Client)",
    tagline: "Clean, read-only performance transparency plus direct support ticket requests.",
    whoFor:
      "Business owners who hired your marketing agency to manage their Google Ads or Meta Ads campaigns.",
    defaultLanding: "/portal/analytics",
    allowed: [
      "Rationed Google Ads & Meta Campaign KPIs (Spend, Clicks, Conversions, CTR, ROAS)",
      "Time-series performance charts locked strictly to their ClientAdAllocation scope",
      "Submit structured Campaign / Creative / Budget Request Tickets directly to agency staff",
    ],
    restricted: [
      "Zero visibility into other agency clients, internal CRM deals, or MCC hierarchy",
      "Read-only ad scope — cannot mutate bids, budgets, funnels, or outreach lists",
    ],
  },
};

interface DocModuleGuide {
  id: string;
  category:
    | "Credentials & Setup"
    | "Ads & Analytics"
    | "CRM & Leads"
    | "Growth Studio"
    | "Governance & Portals";
  title: string;
  route: string;
  summary: string;
  steps: string[];
  proTip: string;
}

const MODULE_GUIDES: DocModuleGuide[] = [
  {
    id: "quickstart",
    category: "Credentials & Setup",
    title: "1. Two-Step Free BYOK Workspace Provisioning",
    route: "/register → /settings",
    summary:
      "Launch an isolated multi-tenant workspace in under 3 minutes with verified email ownership and encrypted API keys.",
    steps: [
      "Enter your work email on /register to receive a 6-digit verification code via Resend.",
      "Submit your agency name, strong password, 10-digit Google Ads MCC ID, and 20–32 character Developer Token.",
      "Open /settings inside the Agency Console and click 'Connect Google OAuth' to link your encrypted refresh token.",
    ],
    proTip:
      "All secrets are sealed immediately with AES-256-GCM. Rotating credentials later requires re-entering your current account password.",
  },
  {
    id: "oauth-vault-rotation",
    category: "Credentials & Setup",
    title: "2. Rotating Developer Tokens, OAuth & Gemini API Keys",
    route: "/settings",
    summary:
      "Manage Google Ads MCC IDs, Developer Tokens, OAuth refresh tokens, and optional BYOK Gemini keys in a zero-knowledge vault.",
    steps: [
      "Open /settings to inspect masked status indicators (raw tokens are never returned in API responses).",
      "Enter replacement MCC ID, Google Developer Token, or Gemini API Key and authorize with your current console password.",
      "If Google OAuth ever expires or is revoked, click 'Reconnect Google OAuth' to complete a fresh consent handshake.",
    ],
    proTip:
      "Every credential update is recorded in /admin/audit-logs with actor identity and timestamp—without ever logging secret values.",
  },
  {
    id: "mcc-sync",
    category: "Ads & Analytics",
    title: "3. Pulling MCC Analytics, 3-Tier Drilldown & Deep-Dive",
    route: "/admin/dashboard • /admin/analytics • /analytics/deep-dive",
    summary:
      "Discover every child client account under your MCC and pull normalized performance telemetry from Campaign down to individual Ads.",
    steps: [
      "Click 'Sync MCC' on /admin/dashboard to discover all non-manager child accounts via Google Ads GAQL.",
      "Pick any client account and date preset (Today, Last 7 Days, Last 30 Days) to inspect multi-series spend, conversion, and ROAS charts.",
      "Drill from /campaigns → /ad-groups → /ads or /asset-groups, or open /analytics/deep-dive for cross-client financial comparison.",
    ],
    proTip:
      "OmniPulse runs a self-rescheduling 01:00 nightly sync and isolates per-client errors so one suspended account never blocks the rest of your MCC.",
  },
  {
    id: "campaign-studio",
    category: "Ads & Analytics",
    title: "4. Multi-Network Campaign Studio (Search RSA, PMax & Meta)",
    route: "/campaigns/create",
    summary:
      "Launch compliant Google Search, Performance Max, Demand Gen, and Meta 3-tier ad structures from a single guided workflow.",
    steps: [
      "Select target client account and network: Google Ads (Search, PMax, Demand Gen) or Meta Marketing API.",
      "Configure daily budget guardrails, bidding strategy (Maximize Conversions, Target CPA, Target ROAS), and geo/language targeting.",
      "Build Ad Groups + Responsive Search Ads (up to 15 headlines & 4 descriptions) or PMax Asset Groups and publish live.",
    ],
    proTip:
      "Archiving a Google campaign sets status=REMOVED in strict compliance with Google Ads API rules—preserving historical spend ledgers.",
  },
  {
    id: "crm-kanban",
    category: "CRM & Leads",
    title: "5. CRM Operations Home & Kanban Deals Pipeline",
    route: "/crm/overview • /crm/deals",
    summary:
      "Track every agency prospect from initial inbound inquiry to signed retainer on an interactive Kanban board with 1-click client conversion.",
    steps: [
      "Open /crm/overview to monitor open pipeline value, deal stage velocity, overdue tasks, and recent team activity.",
      "Move deals across NEW → QUALIFIED → PROPOSAL → NEGOTIATION → WON / LOST in /crm/deals (automatically logging STAGE_CHANGE events).",
      "Click 'Convert Won Deal to Client' on any WON card to atomically create their CrmCompany, CLIENT portal login, and Google/Meta ad allocation.",
    ],
    proTip:
      "Converting a Won Deal automatically emails or surfaces onboarding credentials so a new retainer client gets portal access in seconds.",
  },
  {
    id: "crm-contacts-360",
    category: "CRM & Leads",
    title: "6. Contacts & Leads 360° Drawer + 1-Click SEO Audit Bridge",
    route: "/crm/contacts",
    summary:
      "Inspect a complete 360° timeline for every lead—combining notes, deals, tasks, outreach events, and instant domain SEO audits.",
    steps: [
      "Click any contact in /crm/contacts to slide open their Contact 360° Drawer with full company and deal context.",
      "Log call notes, meeting summaries, or follow-up tasks directly onto the contact's chronological activity stream.",
      "Click 'Run Domain SEO Audit' inside the drawer—OmniPulse infers the business domain from their work email and attaches a live crawl report.",
    ],
    proTip:
      "Running a 1-click SEO Audit from Contact 360° gives sales reps concrete Core Web Vitals and metadata proof before jumping on a discovery call.",
  },
  {
    id: "crm-tasks-tickets",
    category: "CRM & Leads",
    title: "7. Daily Follow-Up Tasks & Retainer Client Request Tickets",
    route: "/crm/tasks • /crm/tickets",
    summary:
      "Keep account managers on schedule with prioritized task queues and a structured support desk for active retainer clients.",
    steps: [
      "Assign due-dated follow-up tasks linked to contacts or deals in /crm/tasks and filter by priority or completion status.",
      "Retainer clients submit campaign, creative, or budget requests straight from their /portal/analytics dashboard.",
      "Staff triage tickets through OPEN → IN_PROGRESS → RESOLVED inside /crm/tickets and post official replies back to the client.",
    ],
    proTip:
      "Replacing scattered WhatsApp/Slack client pings with /crm/tickets keeps every retainer change request auditable and timestamped.",
  },
  {
    id: "leads-inbox-capture",
    category: "CRM & Leads",
    title: "8. Public Quote Form Inbox & Funnel-to-CRM Auto-Capture",
    route: "/admin/leads • /request-quote • /f/:slug",
    summary:
      "Capture high-intent inbound leads from both the multi-file quote request form and published Scroll-Story Funnels straight into CRM.",
    steps: [
      "Share /request-quote for custom web/agency project inquiries—prospects attach up to 5 brief files protected by dedicated rate limiters.",
      "Review submissions, download attachments, and update status inside /admin/leads (with instant Resend email alerts to your inbox).",
      "Every lead form submitted on a published /f/:slug Scroll-Story Funnel automatically upserts a CRM Contact and opens a NEW Kanban Deal.",
    ],
    proTip:
      "Zero Zapier webhooks required—funnel conversions appear immediately in /crm/deals and /crm/contacts with source attribution.",
  },
  {
    id: "funnel-studio",
    category: "Growth Studio",
    title: "9. 400vh+ Scroll-Story Funnel Studio & Vercel Blob CDN",
    route: "/admin/funnels",
    summary:
      "Design long-form, high-converting scroll-story landing pages across three bespoke visual architectures with live click-to-edit preview.",
    steps: [
      "Choose Obsidian Command (dark B2B), Swiss Daylight Studio (ivory editorial), or Velocity Matrix HUD (emerald direct-response).",
      "Switch between Editor, Split Live, and Full 400vh Preview; click any section inside the sandboxed iframe to edit copy, CTAs, or nav/footer links.",
      "Remove or restore any of the 12 acts, upload up to 3 persistent images to Vercel Blob CDN, check the live SERP preview, and publish.",
    ],
    proTip:
      "Click 'Apply Theme' anytime to swap the entire typography, navbar, and surface architecture without losing your copy or uploaded Blob images.",
  },
  {
    id: "seo-engine",
    category: "Growth Studio",
    title: "10. Worker-Thread Technical SEO Crawler & XML Sitemaps",
    route: "/admin/seo",
    summary:
      "Crawl prospect or client domains on isolated CPU worker threads to score metadata, headings, links, and generate drop-in XML sitemaps.",
    steps: [
      "Enter any target URL and page crawl budget in /admin/seo and click Start Audit.",
      "A bounded Node.js Worker Thread pool crawls pages asynchronously so API latency never spikes.",
      "Open the report drawer to inspect per-page health scores (0–100), export CSV diagnostics, or download standards-compliant sitemap.xml.",
    ],
    proTip:
      "Raw XML sitemaps are persisted in PostgreSQL and served directly at GET /api/v1/seo/reports/:id/sitemap.xml.",
  },
  {
    id: "outreach-webhooks",
    category: "Growth Studio",
    title: "11. Resend Cold Outreach, p-limit(2) Bursts & Svix Webhooks",
    route: "/admin/outreach",
    summary:
      "Run personalized merge-tag email sequences with automatic concurrency throttling, daily quota caps, and real-time webhook attribution.",
    steps: [
      "Import contacts via CSV or paste list in /admin/outreach and craft HTML templates using {{name}} and {{company}} variables.",
      "Dispatch campaigns through our p-limit(2) burst queue with automatic daily send guardrails and RFC 8058 one-click unsubscribe headers.",
      "Track Sent → Delivered → Opened → Clicked → Bounced events live via cryptographic Svix HMAC webhooks.",
    ],
    proTip:
      "Hard bounces and spam complaints automatically suppress the contact across your tenant so sender reputation stays protected.",
  },
  {
    id: "rbac-portals",
    category: "Governance & Portals",
    title: "12. Rationed Client Portals & 1-Click Admin Impersonation",
    route: "/admin/clients → /portal/analytics",
    summary:
      "Provision read-only analytics portals mathematically locked to each client's allocated ad accounts or specific campaigns.",
    steps: [
      "Open /admin/clients, create a Client login, and select their permitted Google Ads or Meta account/campaign scope from visual dropdowns.",
      "Click '1-Click Portal Preview' as Admin to inspect the exact scoped dashboard the client will see.",
      "Suspend or reinstate client portal access instantly with one toggle—revoking access on the very next API request.",
    ],
    proTip:
      "enforceClientScope injects permitted campaignIds directly into downstream Google/Meta queries—preventing cross-client ID enumeration.",
  },
  {
    id: "team-audit-logs",
    category: "Governance & Portals",
    title: "13. Team Managers, Role Guardrails & Immutable Audit Logs",
    route: "/admin/team • /admin/audit-logs • /admin/contact",
    summary:
      "Delegate day-to-day execution to Manager staff safely while maintaining a complete cryptographic audit trail of sensitive actions.",
    steps: [
      "Invite media buyers and account managers as MANAGER users in /admin/team—they get immediate access to CRM, Funnels, SEO, Outreach, and Campaigns.",
      "Server-side RBAC automatically blocks Managers from /settings (API Vault), /analytics/deep-dive, and /admin/team.",
      "Inspect /admin/audit-logs to review chronological records of credential rotations, team changes, deal conversions, and portal previews, or use /admin/contact for dedicated self-hosted deployment.",
    ],
    proTip:
      "Audit log entries are append-only and scoped per tenant—giving agency owners enterprise-grade operational accountability.",
  },
];

export default function DocsPage() {
  const [activeCredTab, setActiveCredTab] =
    useState<CredentialGuideKey>("dev-token");
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
        `${mod.title} ${mod.summary} ${mod.route} ${mod.steps.join(" ")} ${mod.proTip}`
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const roleInfo = ROLE_SIMULATOR[selectedRole];
  const activePlaybook =
    CREDENTIAL_PLAYBOOKS.find((p) => p.id === activeCredTab) ??
    CREDENTIAL_PLAYBOOKS[0];

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
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" dot className="mb-5">
            Complete Credentials, Analytics, CRM &amp; Feature Documentation
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            From API Keys to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
              Full-Stack Agency Execution
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Step-by-step guides on obtaining your Google Ads Developer Token,
            creating OAuth Client IDs &amp; Secrets, pulling 3-tier MCC
            analytics, and operating CRM Kanban, Leads 360°, Funnels, SEO, and
            Resend Outreach.
          </p>

          {/* Quick Jump Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { label: "Developer Token Guide", href: "#credentials-guide" },
              { label: "OAuth Client ID & Secret", href: "#credentials-guide" },
              { label: "Pull Analytics Guide", href: "#mcc-sync" },
              { label: "CRM, Kanban & Leads 360°", href: "#crm-kanban" },
              { label: "Funnels, SEO & Outreach", href: "#funnel-studio" },
              { label: "Roles & Audit Logs", href: "#role-simulator" },
            ].map((pill) => (
              <a
                key={pill.label}
                href={pill.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500 transition-colors"
              >
                {pill.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STEP-BY-STEP CREDENTIALS & ANALYTICS PULL MASTERCLASS */}
      <AnimatedSection
        id="credentials-guide"
        spacing="py-24"
        className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#0b0d13]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="success" dot className="mb-3">
              Step-by-Step Credential &amp; Analytics Playbooks
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              How to Get Your Keys &amp; Pull Live Telemetry
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Select any guide below for exact click-by-click instructions inside
              Google Ads Manager, Google Cloud Console, Meta Business Suite,
              Resend, and OmniPulse.
            </p>
          </div>

          {/* 4-Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CREDENTIAL_PLAYBOOKS.map((item) => {
              const active = item.id === activeCredTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveCredTab(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                    active
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50"
                  }`}
                >
                  {item.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Active Playbook Card */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141d] p-6 sm:p-10 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="space-y-2 max-w-3xl">
                <Badge variant="brand">{activePlaybook.badge}</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                  {activePlaybook.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  {activePlaybook.subtitle}
                </p>
              </div>
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                <span className="text-zinc-400 block text-[10px] uppercase">
                  Console Path
                </span>
                {activePlaybook.whereToGet}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Numbered Steps */}
              <ol className="lg:col-span-7 space-y-4">
                {activePlaybook.steps.map((s, idx) => (
                  <li
                    key={s.heading}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                        {s.heading}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Right: Key Reference + Verification Box */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-2xl border border-zinc-800 bg-[#090c12] p-5 text-zinc-100 space-y-3.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold pb-2 border-b border-zinc-800">
                    <KeyRound className="w-4 h-4" />
                    Required Keys &amp; Endpoints
                  </div>
                  {activePlaybook.envKeys.map((item) => (
                    <div
                      key={item.key}
                      className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-emerald-300 font-bold break-all">
                          {item.key}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.key)}
                          className="text-zinc-400 hover:text-white shrink-0"
                          title="Copy key name"
                        >
                          {copiedEndpoint === item.key ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-zinc-400 text-[11px]">
                        Format: <span className="text-zinc-200">{item.example}</span>
                      </p>
                      <p className="text-zinc-500 font-sans text-[11px]">
                        {item.purpose}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1.5">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Verification Check
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                    {activePlaybook.verificationCheck}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. PROTOCOL & REQUEST LIFECYCLE BLUEPRINT SCROLL STORY */}
      <ConsoleGuideScrollStory />

      {/* 4. INTERACTIVE 3-ROLE PERMISSION SIMULATOR */}
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
            Click any role below to inspect what Admins, optional Managers, and
            external Ad Clients can access across CRM, Campaigns, Funnels, and
            Portals.
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

      {/* 5. SEARCHABLE 13-MODULE CONSOLE PLAYBOOK */}
      <AnimatedSection
        spacing="py-24"
        className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#0c0c0e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Badge variant="brand" className="mb-3">
                All 13 Console Modules Documented
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
                placeholder="Search CRM, Kanban, leads, token, SEO…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "All",
              "Credentials & Setup",
              "Ads & Analytics",
              "CRM & Leads",
              "Growth Studio",
              "Governance & Portals",
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

      {/* 6. DEVELOPER & ARCHITECTURE SUMMARY */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="brand">Technical Stack &amp; Reliability</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Want to Inspect Our Encryption &amp; Tenant Isolation Model?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore our dedicated Security &amp; Architecture page to see how
              AES-256-GCM token encryption, PostgreSQL tenant scoping, immutable
              audit logs, and Svix webhook verification protect every client.
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
              { icon: Layers, label: "CRM + Funnels", val: "Kanban + 400vh AST" },
              { icon: Mail, label: "Outreach", val: "Resend + Svix HMAC" },
              { icon: BarChart3, label: "Ads API", val: "Google v17+ & Meta" },
              { icon: Database, label: "Isolation", val: "Strict tenantId" },
              { icon: Code2, label: "Audit Trail", val: "Immutable Logs" },
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
