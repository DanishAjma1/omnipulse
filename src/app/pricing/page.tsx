"use client";

import React, { useState } from "react";
import { Check, Minus } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PricingCard } from "@/components/ui/PricingCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";

const PRICING_TIERS = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Ideal for boutique agencies managing up to 5 client accounts.",
    badge: "Boutique",
    highlighted: false,
    ctaText: "Start 14-Day Free Trial",
    features: [
      "Up to 5 Google & Meta Ad Accounts",
      "Daily Automated Metric Sync",
      "Standard RSA & Display Creator",
      "1 Branded Client Portal",
      "Weekly PDF Report Automation",
      "Email Support (24h SLA)",
    ],
  },
  {
    name: "Agency Pro",
    monthlyPrice: 149,
    annualPrice: 119,
    description:
      "Engineered for high-velocity agencies requiring real-time MCC sync & white-label portals.",
    badge: "Most Popular",
    highlighted: true,
    ctaText: "Start 14-Day Free Trial",
    features: [
      "Unlimited Connected Ad Accounts",
      "Real-Time MCC Synchronization",
      "Performance Max Asset Group Builder",
      "Unlimited White-Labeled Client Portals",
      "Custom CNAME & SSL Mapping",
      "AI SEO & Outreach Sequence Engine",
      "Burst Guard & Rate-Limit Shield",
      "Priority Slack Support Channel",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 499,
    annualPrice: 399,
    description:
      "For large performance agencies and holding groups demanding custom token architecture and custom SLAs.",
    badge: "Enterprise",
    highlighted: false,
    ctaText: "Contact Sales Engineering",
    ctaHref: "/contact",
    features: [
      "Dedicated Enterprise Developer Token",
      "Custom Data Warehouse Ingestion (BigQuery)",
      "Multi-MCC Organization Clustering",
      "Dedicated Solutions Architect",
      "99.99% Guaranteed API Uptime SLA",
      "Custom Security & SOC-2 Audits",
      "24/7 Phone & Emergency On-Call",
    ],
  },
];

const COMPARISON_FEATURES = [
  {
    category: "Campaign & Ad Operations",
    items: [
      {
        name: "Google Ads MCC Real-Time Sync",
        starter: "Daily batch",
        pro: "Real-time (15s)",
        enterprise: "Real-time (Sub-second)",
      },
      {
        name: "Performance Max & Asset Validation",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Responsive Search Ads (RSA) Builder",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Demand Gen & Video Formats",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Automated Target CPA / ROAS Enforcer",
        starter: "Basic",
        pro: "Advanced",
        enterprise: "Autonomous AI Engine",
      },
    ],
  },
  {
    category: "Client Portals & Reporting",
    items: [
      {
        name: "White-Labeled Client Portals",
        starter: "1 Portal",
        pro: "Unlimited",
        enterprise: "Unlimited Multi-Tenant",
      },
      {
        name: "Custom CNAME & SSL Provisioning",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Role-Based Access (Admin / Viewer)",
        starter: "Viewer only",
        pro: true,
        enterprise: true,
      },
      {
        name: "Executive PDF Digest Automation",
        starter: "Weekly",
        pro: "Real-time / Custom",
        enterprise: "Real-time / Custom",
      },
    ],
  },
  {
    category: "SEO & Growth Outreach",
    items: [
      {
        name: "Core Web Vitals & Technical Crawl",
        starter: "50 URLs / mo",
        pro: "5,000 URLs / mo",
        enterprise: "Unlimited Headless",
      },
      {
        name: "Automated Cold Email Sequences",
        starter: false,
        pro: "2,500 sends / mo",
        enterprise: "50,000+ sends / mo",
      },
      {
        name: "Dynamic Landing Page Generator",
        starter: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Security & Support",
    items: [
      {
        name: "Google OAuth 2.0 Token Vault",
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Dedicated Developer Token Routing",
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        name: "Support SLA",
        starter: "24 hours",
        pro: "2 hours (Slack)",
        enterprise: "15 min (Dedicated Architect)",
      },
      {
        name: "Custom SOC-2 / Security Review",
        starter: false,
        pro: false,
        enterprise: true,
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
    question: "Can my clients see our internal ad spend margins or other client data?",
    answer:
      "Never. OmniPulse provides absolute cryptographic tenant isolation. Client portals operate strictly with read-only scoped tokens under your custom domain (e.g. portal.youragency.com), showing only the specific sub-account data and metrics you authorize.",
  },
  {
    id: "faq-4",
    question: "Can I switch plans or cancel at any time?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel your subscription anytime with zero penalty. When switching between monthly and annual plans, your balance is automatically prorated.",
  },
  {
    id: "faq-5",
    question: "What happens during and after the 14-day free trial?",
    answer:
      "During your 14-day trial, you get full access to Agency Pro capabilities. No credit card is charged upfront. At the end of the trial, you can choose the plan that best fits your agency's scale or pause anytime.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <MarketingLayout>
      {/* 1. PRICING HERO */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" className="mb-4">
            Predictable Growth
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Simple, Scalable Pricing Engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Agency Growth
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Transparent plans with zero surprise charges. All plans include full
            API rate-limit protection and our 14-day risk-free trial.
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
            />
          ))}
        </div>
      </AnimatedSection>

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
