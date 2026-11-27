"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PricingCard } from "@/components/ui/PricingCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { InvestmentStory } from "@/components/pricing/InvestmentStory";
import { PricingValueScrollStory } from "@/components/pricing/PricingValueScrollStory";

const WORKSPACE_EDITIONS = [
  {
    name: "Starter (Local & Solo)",
    priceLabel: "Free BYOK",
    priceSubtext: "No credit card or subscription checkout required",
    description:
      "Built for local businesses and solo operators launching hands-off local ads, SEO audits, and scroll-story lead funnels.",
    badge: "Local Businesses",
    highlighted: false,
    ctaText: "Launch Starter Workspace",
    ctaHref: "/register",
    features: [
      "Up to 5 Google & Meta Ad Accounts",
      "3-Tier Search & PMax Campaign Studio",
      "400vh+ Scroll-Story Funnel Studio (3 Blob Slots)",
      "Worker-Thread SEO Crawler & XML Sitemaps",
      "1 Rationed Client Reporting Portal",
      "AES-256-GCM Encrypted BYOK Token Vault",
    ],
  },
  {
    name: "Agency Pro",
    priceLabel: "Early Access",
    priceSubtext: "Included free during BYOK launch • Zero seat tax",
    description:
      "Engineered for scaling marketing agencies running multi-MCC client rosters, optional Manager staff, and white-label portals.",
    badge: "Marketing Agencies",
    highlighted: true,
    ctaText: "Deploy Agency Workspace",
    ctaHref: "/register",
    features: [
      "Multi-Account Google Ads MCC Hierarchy Sync",
      "Unlimited Rationed Client Analytics Portals",
      "Optional Manager Role (Sensitive Surfaces Blocked)",
      "All 3 Distinct 400vh+ Scroll-Story Funnel Templates",
      "Unified Resend Cold Outreach + Svix Webhooks",
      "Nightly 01:00 Auto-Sync & Rate-Limit Shield",
      "Custom CNAME White-Label Portal Ready",
    ],
  },
  {
    name: "Enterprise & Self-Hosted",
    priceLabel: "Custom",
    priceSubtext: "Dedicated cluster, custom quotas & solutions SLA",
    description:
      "For global brands and holding companies demanding uncapped multi-MCC clustering, custom integrations, and dedicated SLAs.",
    badge: "Global Brands",
    highlighted: false,
    ctaText: "Contact Solutions Engineering",
    ctaHref: "/contact",
    features: [
      "Uncapped Multi-MCC & Sub-Account Quotas",
      "Dedicated Single-Tenant or Self-Hosted Deployment",
      "Bidirectional CRM & Data Warehouse Pipelines",
      "Deep 3-Tier Cross-Market Attribution Ledger",
      "Custom Webhook & Security Architecture Review",
      "99.99% Uptime SLA & 2-Hour Engineering Response",
    ],
  },
];

const COMPARISON_FEATURES = [
  {
    category: "Campaign & MCC Ad Operations",
    items: [
      {
        name: "Google Ads MCC Hierarchy Sync",
        starter: "Up to 5 accounts",
        pro: "Full MCC Roster",
        enterprise: "Multi-MCC Cluster",
      },
      {
        name: "3-Tier Campaign → Ad Group → RSA / PMax Studio",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Meta Campaign → Ad Set → Creative Studio",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Nightly 01:00 Automated Telemetry Refresh",
        starter: true,
        pro: true,
        enterprise: "Custom Cadence",
      },
    ],
  },
  {
    category: "400vh+ Funnels, SEO & Outreach",
    items: [
      {
        name: "400vh+ Scroll-Story Templates (12 Removable Acts)",
        starter: "3 Templates",
        pro: "Unlimited Funnels",
        enterprise: "Unlimited + Custom",
      },
      {
        name: "Vercel Blob CDN Image Hosting (Max 3 / Funnel)",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Worker-Thread Technical SEO Crawler & Sitemap XML",
        starter: "50 URLs / run",
        pro: "High-Throughput",
        enterprise: "Uncapped Headless",
      },
      {
        name: "Resend Cold Outreach + Svix Webhook Timeline",
        starter: "BYOK Domain",
        pro: "Burst p-limit(2)",
        enterprise: "Dedicated IP Pool",
      },
    ],
  },
  {
    category: "Team Roles, Portals & Zero-Knowledge Security",
    items: [
      {
        name: "AES-256-GCM Encrypted BYOK Token Vault",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Optional Manager Role (Vault & Deep-Dive Blocked)",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Rationed Client Portals (ClientAdAllocation)",
        starter: "1 Portal",
        pro: "Unlimited",
        enterprise: "Unlimited CNAME",
      },
      {
        name: "Credit Card or Subscription Gate Required",
        starter: "None",
        pro: "None",
        enterprise: "Custom Agreement",
      },
    ],
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Is a credit card or subscription workflow required to launch?",
    answer:
      "No. You can launch your OmniPulse workspace right now with zero credit card capture and zero subscription checkout steps. Simply verify your email via 6-digit OTP on /register and connect your encrypted BYOK credentials.",
  },
  {
    id: "faq-2",
    question: "How does Bring-Your-Own-Key (BYOK) keep costs predictable?",
    answer:
      "Instead of marking up your ad spend, email volume, or team seats, OmniPulse connects directly to your own Google Ads Developer Token, Meta System Token, Resend API key, and Vercel Blob store—encrypted at rest with AES-256-GCM.",
  },
  {
    id: "faq-3",
    question: "Can I invite Managers without exposing sensitive client financials?",
    answer:
      "Yes. Agency Pro and Enterprise support optional Manager accounts that can run daily campaigns, 400vh+ Scroll-Story Funnels, SEO crawls, and Outreach—while strict server-side RBAC blocks access to credential vaults and cross-client financial deep-dives.",
  },
  {
    id: "faq-4",
    question: "How do Client Portals protect my agency's other accounts?",
    answer:
      "When you create a Client login in /admin/clients, you grant explicit ClientAdAllocation scopes (one ad account or specific campaigns). Every client analytics request runs enforceClientScope before querying Google or Meta.",
  },
  {
    id: "faq-5",
    question: "When should we contact Solutions Engineering for Enterprise?",
    answer:
      "Reach out via /contact if your organization manages multiple top-level Google Ads MCCs, needs custom self-hosted white-label deployment, or requires bespoke data warehouse pipelines.",
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout>
      {/* 1. WORKSPACE EDITIONS HERO */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="success" dot className="mb-4">
            Zero Credit Card Gate • Instant BYOK Workspace Provisioning
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Workspace Editions Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
              Agencies, Local Growth &amp; Global Brands
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Deploy the complete OmniPulse Agency Console with your own encrypted
            API credentials—no subscription checkout walls, no per-seat taxes,
            and zero surprise trial auto-charges.
          </p>
        </div>
      </section>

      {/* 2. EDITION CARDS (3-COL, ZERO SUBSCRIPTION CHECKOUT) */}
      <AnimatedSection
        spacing="py-24"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {WORKSPACE_EDITIONS.map((tier) => (
            <PricingCard
              key={tier.name}
              name={tier.name}
              priceLabel={tier.priceLabel}
              priceSubtext={tier.priceSubtext}
              description={tier.description}
              features={tier.features}
              highlighted={tier.highlighted}
              badge={tier.badge}
              ctaText={tier.ctaText}
              ctaHref={tier.ctaHref}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* 3. NEW 420VH STICKY PLATFORM VALUE & BYOK ECONOMICS SCROLL STORY */}
      <PricingValueScrollStory />

      {/* 4. ENHANCED 6-PILLAR SCROLL-DRAWN ARCHITECTURE PIPELINE */}
      <InvestmentStory />

      {/* 5. COMPREHENSIVE EDITION MATRIX */}
      <AnimatedSection
        spacing="py-24"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            Capability Breakdown
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Complete Edition Matrix
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Every console capability compared transparently across Local,
            Agency, and Enterprise deployments.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] shadow-md">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/75 dark:bg-zinc-950/75">
                <th className="p-6 font-semibold text-zinc-900 dark:text-zinc-100 min-w-[260px]">
                  Console Capability
                </th>
                <th className="p-6 font-semibold text-zinc-900 dark:text-zinc-100 text-center min-w-[140px]">
                  Starter
                </th>
                <th className="p-6 font-bold text-indigo-600 dark:text-indigo-400 text-center min-w-[160px] bg-indigo-50/40 dark:bg-indigo-950/20">
                  Agency Pro
                </th>
                <th className="p-6 font-semibold text-zinc-900 dark:text-zinc-100 text-center min-w-[160px]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((category) => (
                <React.Fragment key={category.category}>
                  <tr className="border-t border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-900/40 font-semibold text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                    <td colSpan={4} className="px-6 py-3">
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item) => (
                    <tr
                      key={item.name}
                      className="border-b border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-zinc-800 dark:text-zinc-200">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof item.starter === "boolean" ? (
                          item.starter ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-zinc-400 dark:text-zinc-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                            {item.starter}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-indigo-50/20 dark:bg-indigo-950/10">
                        {typeof item.pro === "boolean" ? (
                          item.pro ? (
                            <Check className="w-4 h-4 text-indigo-500 mx-auto stroke-[2.5]" />
                          ) : (
                            <Minus className="w-4 h-4 text-zinc-400 dark:text-zinc-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold font-mono text-xs">
                            {item.pro}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof item.enterprise === "boolean" ? (
                          item.enterprise ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-zinc-400 dark:text-zinc-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-zinc-900 dark:text-zinc-100 font-mono text-xs font-semibold">
                            {item.enterprise}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* 6. FAQ ACCORDION */}
      <AnimatedSection
        spacing="py-24"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <Badge variant="neutral" className="mb-3">
            Common Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Answers on BYOK onboarding, role boundaries, and workspace scaling.
          </p>
        </div>

        <Accordion items={FAQ_ITEMS} />
      </AnimatedSection>
    </MarketingLayout>
  );
}
