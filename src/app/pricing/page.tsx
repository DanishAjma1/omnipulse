"use client";

import React, { useState } from "react";
import { Check, Minus } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PricingCard } from "@/components/ui/PricingCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { InvestmentStory } from "@/components/pricing/InvestmentStory";

const PRICING_TIERS = [
  {
    name: "Starter Plan",
    monthlyPrice: 19,
    annualPrice: 15,
    description:
      "Perfect for Solo Freelancers & New Agencies launching automated Google Ads sync, client portals, and daily outreach.",
    badge: "Solo & New Agencies",
    highlighted: false,
    ctaText: "Get Started with Starter",
    ctaHref: "/register?tier=STARTER",
    ctaSubtext: "Start 7-Day Free Trial",
    features: [
      "Up to 5 Google Ads Client Accounts Sync",
      "Real-Time Google Ads MCC Synchronization",
      "5 White-Labeled Client Portals",
      "Up to 10 AI-Automated Campaign Creations / month",
      "3 AI Technical SEO Audits / day",
      "200 Cold Outreach Emails / day",
      "Up to 3 AI-Generated Funnels / week",
      "Standard Template Library",
      "Community & Email Support",
    ],
  },
  {
    name: "Agency Growth Plan",
    monthlyPrice: 49,
    annualPrice: 39,
    description:
      "Built for Scaling Teams needing 20 client portals, custom domains (clients.youragency.com), and higher daily AI quotas.",
    badge: "Most Popular",
    highlighted: true,
    ctaText: "Scale with Agency Growth",
    ctaHref: "/register?tier=AGENCY_PRO",
    ctaSubtext: "Start 7-Day Free Trial",
    features: [
      "Up to 20 Google Ads Client Accounts Sync",
      "Real-Time Google Ads MCC Synchronization",
      "20 White-Labeled Client Portals",
      "Up to 50 AI-Automated Campaign Creations / month",
      "15 AI Technical SEO Audits / day",
      "1,000 Cold Outreach Emails / day",
      "15 AI-Generated Funnels / week",
      "Custom Domain for Client Portals (clients.youragency.com)",
      "Priority 24/7 Support",
    ],
  },
  {
    name: "Enterprise Scale Plan",
    monthlyPrice: 99,
    annualPrice: 79,
    description:
      "For Established Operations demanding unlimited client accounts, portals, campaigns, funnels, and full white-labeling.",
    badge: "Established Operations",
    highlighted: false,
    ctaText: "Deploy Enterprise Scale",
    ctaHref: "/register?tier=ENTERPRISE",
    features: [
      "Unlimited Google Ads Client Accounts Sync",
      "Real-Time Google Ads MCC Synchronization",
      "Unlimited White-Labeled Client Portals",
      "Unlimited AI-Automated Campaign Creations",
      "50 AI Technical SEO Audits / day",
      "5,000 Cold Outreach Emails / day (Utilizing dedicated Resend API pipelines)",
      "Unlimited AI-Generated Funnels",
      'Complete Platform White-Labeling (Remove "Powered by Omnipulse")',
      "Dedicated Slack/WhatsApp Support Channel",
    ],
  },
];

const COMPARISON_FEATURES = [
  {
    category: "Campaign & Ad Operations",
    items: [
      {
        name: "Google Ads Client Accounts Sync",
        starter: "Up to 5 Clients",
        pro: "Up to 20 Clients",
        enterprise: "Unlimited",
      },
      {
        name: "Google Ads MCC Real-Time Sync",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "AI-Automated Campaign Creations",
        starter: "10 / month",
        pro: "50 / month",
        enterprise: "Unlimited",
      },
      {
        name: "Performance Max & RSA Bulk Orchestration",
        starter: true,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Client Portals & White-Labeling",
    items: [
      {
        name: "White-Labeled Client Portals",
        starter: "5 Portals",
        pro: "20 Portals",
        enterprise: "Unlimited",
      },
      {
        name: "Custom Domain (clients.youragency.com)",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Remove "Powered by Omnipulse" Branding',
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "SEO, Outreach & AI Funnels",
    items: [
      {
        name: "AI Technical SEO Audits",
        starter: "3 / day",
        pro: "15 / day",
        enterprise: "50 / day",
      },
      {
        name: "Cold Outreach Emails",
        starter: "200 / day",
        pro: "1,000 / day",
        enterprise: "5,000 / day (Dedicated Resend)",
      },
      {
        name: "AI-Generated Funnels",
        starter: "3 / week",
        pro: "15 / week",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "Support & Onboarding",
    items: [
      {
        name: "Support Channel",
        starter: "Community & Email",
        pro: "Priority 24/7 Support",
        enterprise: "Dedicated Slack/WhatsApp",
      },
    ],
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Do I need my own Google Ads Developer Token to use OmniPulse?",
    answer:
      "No! OmniPulse comes pre-configured with enterprise-grade Google Ads developer token routing. You simply authenticate via Google OAuth and your accounts sync automatically. Enterprise tier clients also have the option to attach their own custom tokens if desired.",
  },
  {
    id: "faq-2",
    question: "How does OmniPulse prevent Google Ads API rate-limit errors?",
    answer:
      "Our core dispatcher uses an asynchronous token-bucket rate limiter that paces mutation requests and queues read queries. By caching non-volatile metrics locally and using selective field masks, we eliminate the 'TOO_MANY_REQUESTS' or 'RESOURCE_EXHAUSTED' errors common with standard scripts.",
  },
  {
    id: "faq-3",
    question: "Can my agency white-label client portals on custom domains while scaling?",
    answer:
      "Yes. OmniPulse provides cryptographic multi-tenant isolation paired with full white-labeling. On Agency Pro and Enterprise, you can connect custom CNAME domains (e.g. insights.youragency.com) with automatic SSL while exposing only the specific client campaigns you authorize.",
  },
  {
    id: "faq-4",
    question: "How do global brands maintain absolute data ownership and CRM syncing?",
    answer:
      "Global organizations bring their own encrypted Google Ads Developer Token and OAuth credentials protected by AES-256-GCM at rest. Combined with bidirectional CRM syncing and BigQuery telemetry exports, you maintain complete data ownership and deep attribution visibility.",
  },
  {
    id: "faq-5",
    question: "What happens during and after the 7-day Starter free trial?",
    answer:
      "Every workspace begins with a 7-day free trial defaulting to the Starter package—ideal for testing automated local lead generation and campaign orchestration. Before billing cycles end, you can upgrade, downgrade with automatic proration, or cancel cleanly inside Settings.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <MarketingLayout>
      {/* 1. PRICING HERO */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" className="mb-4">
            Local Businesses • Agencies • Global Brands
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Transparent Pricing Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Agencies, Local Leads &amp; Global Scale
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Start with a 7-day free trial on Starter for hands-off local ads,
            upgrade to Agency Pro for white-label client portals, or deploy
            Enterprise with full CRM syncing and absolute data ownership.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-10 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                !isAnnual
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS (3-COL) */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.name}
              name={tier.name}
              monthlyPrice={tier.monthlyPrice}
              annualPrice={tier.annualPrice}
              isAnnual={isAnnual}
              description={tier.description}
              features={tier.features}
              highlighted={tier.highlighted}
              badge={tier.badge}
              ctaText={tier.ctaText}
              ctaHref={tier.ctaHref}
              ctaSubtext={tier.ctaSubtext}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* 2b. INVESTMENT STORY */}
      <InvestmentStory />

      {/* 3. COMPARISON FEATURE CHECKLIST TABLE */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            In-Depth Evaluation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Comprehensive Feature Matrix
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Compare capabilities across tiers to find the exact infrastructure
            fit for your team.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] shadow-md">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/75 dark:bg-zinc-950/75">
                <th className="p-6 font-semibold text-zinc-900 dark:text-zinc-100 min-w-[260px]">
                  Feature Checklist
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

      {/* 4. FAQ ACCORDION */}
      <AnimatedSection spacing="py-24" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="neutral" className="mb-3">
            Common Inquiries
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Everything you need to know about our developer token routing,
            syncing, and licensing.
          </p>
        </div>

        <Accordion items={FAQ_ITEMS} />
      </AnimatedSection>
    </MarketingLayout>
  );
}
