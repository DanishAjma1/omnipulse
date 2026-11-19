import React from "react";

export type FunnelComponentType =
  | "Hero"
  | "Features"
  | "Testimonials"
  | "Pricing"
  | "CTA"
  | "Footer";

export interface FunnelFeatureItem {
  title: string;
  description: string;
  metric?: string;
  badge?: string;
}

export interface FunnelTestimonialItem {
  quote: string;
  author: string;
  role: string;
  metricBadge?: string;
}

export interface FunnelPricingTier {
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  highlighted?: boolean;
}

export interface FunnelFooterLink {
  label: string;
  url: string;
}

export interface FunnelComponentProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  guarantee?: string;
  className?: string;
  items?: FunnelFeatureItem[];
  testimonials?: FunnelTestimonialItem[];
  tiers?: FunnelPricingTier[];
  links?: FunnelFooterLink[];
  brandName?: string;
  copyright?: string;
}

export interface FunnelComponentNode {
  id: string;
  type: FunnelComponentType;
  props: FunnelComponentProps;
}

export interface FunnelAst {
  theme: {
    templateId: "modern_saas" | "direct_response" | "custom_ai" | "vibrant_dynamic";
    mode: "light" | "dark";
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: "modern" | "editorial" | "technical" | "friendly";
  };
  components: FunnelComponentNode[];
}

function HeroBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <section
      className={
        props.className ||
        "min-h-[65dvh] animate-fade-in-up flex items-center py-20 border-b border-slate-200/40"
      }
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
        <div className="space-y-6 lg:col-span-7">
          {props.eyebrow && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--funnel-secondary)" }}
            >
              {props.eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {props.headline}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed opacity-85 sm:text-xl">
            {props.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {props.ctaLabel && (
              <a
                href={props.ctaUrl || "#"}
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--funnel-primary)" }}
              >
                {props.ctaLabel}
              </a>
            )}
            {props.guarantee && (
              <span className="text-xs font-medium opacity-75">{props.guarantee}</span>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          {props.imageUrl ? (
            <img
              src={props.imageUrl}
              alt={props.imageAlt || props.headline || "Funnel visual"}
              width={640}
              height={460}
              className="h-auto w-full rounded-3xl border border-slate-500/20 object-cover shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            />
          ) : (
            <article className="rounded-3xl border border-slate-500/20 bg-slate-500/5 p-8 backdrop-blur shadow-xl space-y-5">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--funnel-secondary)" }}
              >
                Live Conversion Telemetry
              </p>
              <div className="grid grid-cols-2 gap-4">
                {(props.items ?? []).slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-500/15 bg-slate-500/5 p-4"
                  >
                    <p className="text-xs opacity-70">{item.title}</p>
                    <p
                      className="mt-1 text-2xl font-black"
                      style={{ color: "var(--funnel-primary)" }}
                    >
                      {item.metric || "+100%"}
                    </p>
                    <p className="mt-0.5 text-[11px] opacity-75">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturesBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <section
      className={
        props.className || "min-h-[65dvh] flex items-center py-20 border-b border-slate-200/40"
      }
    >
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="max-w-3xl space-y-3">
          {props.eyebrow && (
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--funnel-primary)" }}
            >
              {props.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{props.headline}</h2>
          {props.subheadline && (
            <p className="text-base leading-relaxed opacity-80">{props.subheadline}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(props.items ?? []).map((item, idx) => (
            <article
              key={idx}
              className="rounded-3xl border border-slate-500/20 bg-slate-500/5 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--funnel-primary)" }}
                >
                  {item.badge || `0${idx + 1}`}
                </span>
                {item.metric && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--funnel-secondary)" }}
                  >
                    {item.metric}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <section
      className={
        props.className || "min-h-[60dvh] flex items-center py-20 border-b border-slate-200/40"
      }
    >
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="max-w-3xl space-y-3">
          {props.eyebrow && (
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--funnel-secondary)" }}
            >
              {props.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{props.headline}</h2>
          {props.subheadline && <p className="text-base opacity-80">{props.subheadline}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(props.testimonials ?? []).map((t, idx) => (
            <blockquote
              key={idx}
              className="rounded-3xl border border-slate-500/20 bg-slate-500/5 p-8 shadow-sm transition-all duration-300 hover:scale-[1.01]"
            >
              {t.metricBadge && (
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--funnel-primary)" }}
                >
                  {t.metricBadge}
                </span>
              )}
              <p className="text-base leading-relaxed">“{t.quote}”</p>
              <footer className="mt-4 text-xs font-semibold opacity-80">
                — {t.author}, <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <section
      className={
        props.className || "min-h-[65dvh] flex items-center py-20 border-b border-slate-200/40"
      }
    >
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          {props.eyebrow && (
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--funnel-primary)" }}
            >
              {props.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{props.headline}</h2>
          {props.subheadline && <p className="text-base opacity-80">{props.subheadline}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {(props.tiers ?? []).map((tier, idx) => (
            <article
              key={idx}
              className={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                tier.highlighted
                  ? "border-2 shadow-2xl bg-slate-500/10"
                  : "border-slate-500/20 bg-slate-500/5 shadow-sm"
              }`}
              style={tier.highlighted ? { borderColor: "var(--funnel-primary)" } : undefined}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  {tier.highlighted && (
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: "var(--funnel-primary)" }}
                    >
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{tier.price}</span>
                  <span className="text-xs opacity-70">{tier.interval}</span>
                </div>
                <p className="text-sm opacity-80">{tier.description}</p>
                <ul className="space-y-2.5 pt-2 text-sm">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span style={{ color: "var(--funnel-primary)" }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href={tier.ctaUrl || "#"}
                  className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:opacity-95"
                  style={{ backgroundColor: "var(--funnel-primary)" }}
                >
                  {tier.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <section className={props.className || "min-h-[55dvh] flex items-center py-20"}>
      <div className="mx-auto max-w-4xl w-full px-6">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl space-y-6"
          style={{ backgroundColor: "var(--funnel-primary)" }}
        >
          {props.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-widest opacity-90">
              {props.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold sm:text-4xl">{props.headline}</h2>
          {props.subheadline && (
            <p className="max-w-2xl mx-auto text-base opacity-90">{props.subheadline}</p>
          )}
          <div className="pt-2">
            <a
              href={props.ctaUrl || "#"}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
            >
              {props.ctaLabel || "Get Started"}
            </a>
          </div>
          {props.guarantee && <p className="text-xs opacity-85">{props.guarantee}</p>}
        </div>
      </div>
    </section>
  );
}

function FooterBlock({ props }: { props: FunnelComponentProps }) {
  return (
    <footer className={props.className || "border-t border-slate-500/20 py-12"}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
        <p className="font-bold">{props.brandName || "OmniPulse Funnel"}</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
          {(props.links ?? []).map((link, idx) => (
            <a key={idx} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        {props.ctaLabel && (
          <a
            href={props.ctaUrl || "#"}
            className="font-semibold underline"
            style={{ color: "var(--funnel-primary)" }}
          >
            {props.ctaLabel}
          </a>
        )}
      </div>
    </footer>
  );
}

export const COMPONENT_MAP: Record<
  FunnelComponentType,
  React.FC<{ props: FunnelComponentProps }>
> = {
  Hero: HeroBlock,
  Features: FeaturesBlock,
  Testimonials: TestimonialsBlock,
  Pricing: PricingBlock,
  CTA: CtaBlock,
  Footer: FooterBlock,
};

export function FunnelAstRenderer({ ast }: { ast: FunnelAst }) {
  const fontFamily =
    ast.theme.fontFamily === "editorial"
      ? "Georgia, Cambria, serif"
      : ast.theme.fontFamily === "technical"
        ? "ui-monospace, SFMono-Regular, Menlo, monospace"
        : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  return (
    <div
      className="min-h-[300dvh] w-full antialiased"
      style={
        {
          "--funnel-primary": ast.theme.primaryColor,
          "--funnel-secondary": ast.theme.secondaryColor,
          "--funnel-bg": ast.theme.backgroundColor,
          backgroundColor: ast.theme.backgroundColor,
          color: ast.theme.mode === "dark" ? "#f8fafc" : "#0f172a",
          fontFamily,
        } as React.CSSProperties
      }
    >
      {ast.components.map((node) => {
        const Component = COMPONENT_MAP[node.type];
        if (!Component) return null;
        return <Component key={node.id} props={node.props} />;
      })}
    </div>
  );
}

export const PREDEFINED_FUNNEL_TEMPLATES: Record<"modern-saas" | "direct-response", FunnelAst> = {
  "modern-saas": {
    theme: {
      templateId: "modern_saas",
      mode: "light",
      primaryColor: "#4f46e5",
      secondaryColor: "#0284c7",
      backgroundColor: "#f8fafc",
      fontFamily: "modern",
    },
    components: [
      {
        id: "hero-1",
        type: "Hero",
        props: {
          eyebrow: "Modern SaaS Engine · Multi-Tenant Agency Analytics",
          headline:
            "Unify Every Client Ad Account & Attribution Stream in One Bento Command Center",
          subheadline:
            "Eliminate manual reporting forever. Sync Google Ads MCC, Meta Ads, and live conversion pipelines in 15 seconds with zero-knowledge security.",
          ctaLabel: "Start 14-Day Free Trial",
          ctaUrl: "/register",
          guarantee: "SOC-2 Type II Certified · 14-Day Guided Onboarding",
          className:
            "min-h-[65dvh] animate-fade-in-up bg-white border-b border-slate-200/80 py-20 text-slate-900",
          items: [
            { title: "Pipeline Velocity", description: "Faster lead-to-close cycle", metric: "3.4x" },
            { title: "Conversion Lift", description: "Verified attribution ROI", metric: "+42.8%" },
          ],
        },
      },
      {
        id: "features-1",
        type: "Features",
        props: {
          eyebrow: "Bento Intelligence Architecture",
          headline: "Engineered around agency clarity & predictable scale",
          subheadline:
            "Replace fragmented spreadsheets with an integrated operating system built for modern growth teams.",
          className: "min-h-[65dvh] bg-slate-50 border-b border-slate-200/80 py-20 text-slate-900",
          items: [
            {
              title: "Unified Telemetry Core",
              description: "Automated multi-touch attribution & pipeline telemetry across Google & Meta.",
              metric: "99.98% Accuracy",
              badge: "01",
            },
            {
              title: "Executive Bento Reporting",
              description: "Zero-latency Bento executive dashboards with real-time ROAS rollups.",
              metric: "<15s Sync",
              badge: "02",
            },
            {
              title: "Automated Guardrails",
              description: "SOC-2 workspace isolation with role-based client portal governance.",
              metric: "Zero-Trust Vault",
              badge: "03",
            },
          ],
        },
      },
      {
        id: "testimonials-1",
        type: "Testimonials",
        props: {
          eyebrow: "Verified Customer Outcomes",
          headline: "Why market leaders standardize on OmniPulse Cloud",
          subheadline: "Real performance benchmarks from scaling agencies.",
          className: "min-h-[60dvh] bg-white border-b border-slate-200/80 py-20 text-slate-900",
          testimonials: [
            {
              quote:
                "Deploying OmniPulse across our client workflows cut manual reporting by 19 hours a week and doubled qualified demo bookings.",
              author: "Elena Rostova",
              role: "VP of Growth, Vertex Cloud",
              metricBadge: "+184% Pipeline ROI",
            },
            {
              quote:
                "The cleanest onboarding we have ever experienced. Every campaign, conversion event, and executive KPI reconciled on day one.",
              author: "Marcus Vance",
              role: "Managing Partner, Apex Digital",
              metricBadge: "3.4x Faster Execution",
            },
          ],
        },
      },
      {
        id: "pricing-1",
        type: "Pricing",
        props: {
          eyebrow: "Transparent Licensing",
          headline: "Flexible tiers built for every stage of growth",
          subheadline: "Start with a 14-day free trial and scale as your conversion volume expands.",
          className: "min-h-[65dvh] bg-slate-50 border-b border-slate-200/80 py-20 text-slate-900",
          tiers: [
            {
              name: "Growth Starter",
              price: "$49",
              interval: "/month",
              description: "Essential automation for lean operators.",
              features: [
                "Up to 5 connected workspaces",
                "Automated daily telemetry sync",
                "Branded executive reporting portal",
              ],
              ctaLabel: "Start 14-Day Free Trial",
              ctaUrl: "/register",
              highlighted: false,
            },
            {
              name: "Agency Pro",
              price: "$149",
              interval: "/month",
              description: "Full multi-tenant scale, custom CNAMEs, and 15-second sync.",
              features: [
                "Unlimited client accounts & portals",
                "Real-time attribution & AI insights",
                "Priority Slack & solutions architect",
              ],
              ctaLabel: "Start 14-Day Free Trial",
              ctaUrl: "/register",
              highlighted: true,
            },
          ],
        },
      },
      {
        id: "cta-1",
        type: "CTA",
        props: {
          eyebrow: "Ready For Immediate Deployment",
          headline: "Launch your agency growth engine with OmniPulse today",
          subheadline: "Provision your isolated multi-tenant workspace in under 60 seconds.",
          ctaLabel: "Start 14-Day Free Trial",
          ctaUrl: "/register",
          guarantee: "14-Day Free Trial · Cancel Anytime in 1 Click",
          className: "min-h-[55dvh] bg-white py-20 text-slate-900",
        },
      },
      {
        id: "footer-1",
        type: "Footer",
        props: {
          brandName: "OmniPulse Cloud",
          ctaLabel: "Start 14-Day Free Trial",
          ctaUrl: "/register",
          links: [
            { label: "Pricing", url: "/pricing" },
            { label: "Services", url: "/services" },
          ],
          className: "border-t border-slate-200 bg-white py-12 text-slate-600",
        },
      },
    ],
  },
  "direct-response": {
    theme: {
      templateId: "direct_response",
      mode: "dark",
      primaryColor: "#10b981",
      secondaryColor: "#06b6d4",
      backgroundColor: "#050814",
      fontFamily: "technical",
    },
    components: [
      {
        id: "hero-1",
        type: "Hero",
        props: {
          eyebrow: "⚡ ATTENTION: VERIFIED HIGH-TICKET CONVERSION SYSTEM",
          headline:
            "Add 45+ Qualified High-Ticket Sales Appointments Every 30 Days — Guaranteed",
          subheadline:
            "Stop burning ad budget on slow, generic agency pages. Deploy our battle-tested direct-response conversion engine in under 10 minutes.",
          ctaLabel: "Claim Free Growth Audit →",
          ctaUrl: "/register",
          guarantee: "✓ 100% Ironclad Performance Guarantee · Limited Partner Spots",
          className:
            "min-h-[65dvh] animate-fade-in-up bg-[#050814] border-b border-emerald-500/20 py-20 text-white",
          items: [
            { title: "Cost Per Lead", description: "Average reduction in wasted spend", metric: "-48%" },
            { title: "Speed To Booking", description: "Direct calendar qualification", metric: "< 60s" },
          ],
        },
      },
      {
        id: "features-1",
        type: "Features",
        props: {
          eyebrow: "STOP LOSING HIGH-INTENT BUYERS",
          headline: "Everything included in your high-velocity conversion sprint",
          subheadline:
            "Most pages bleed 65% of paid clicks because of slow load times and weak offers. Here is how we lock in conversions:",
          className: "min-h-[65dvh] bg-slate-950 border-b border-white/10 py-20 text-white",
          items: [
            {
              title: "High-Urgency Offer Architecture",
              description: "Immediate lead capture engineered for zero page leakage.",
              metric: "+210% CVR",
              badge: "STEP 01",
            },
            {
              title: "Zero-Leakage Lead Capture",
              description: "Battle-tested direct-response copy hierarchy for paid search & social.",
              metric: "100% Tracked",
              badge: "STEP 02",
            },
            {
              title: "Automated Sales Calendar Routing",
              description: "Instant speed-to-lead routing straight into your sales calendar.",
              metric: "24/7 Active",
              badge: "STEP 03",
            },
          ],
        },
      },
      {
        id: "testimonials-1",
        type: "Testimonials",
        props: {
          eyebrow: "DOCUMENTED PARTNER RESULTS",
          headline: "Real operators generating predictable high-ticket pipeline",
          subheadline: "Verified outcomes from teams who switched to this direct-response system.",
          className: "min-h-[60dvh] bg-[#050814] border-b border-white/10 py-20 text-white",
          testimonials: [
            {
              quote:
                "Within 14 days of launching ScaleVelocity, our cost-per-acquisition dropped by 44% while booked calls hit an all-time high.",
              author: "Damon Sterling",
              role: "Founder, Sterling Performance Media",
              metricBadge: "4.6x ROAS in 14 Days",
            },
            {
              quote:
                "Zero fluff—every headline, proof block, and CTA is engineered to convert cold traffic into qualified revenue immediately.",
              author: "Sadia Khan",
              role: "Director of Acquisition, ScaleGrid",
              metricBadge: "45+ Qualified Leads/Mo",
            },
          ],
        },
      },
      {
        id: "pricing-1",
        type: "Pricing",
        props: {
          eyebrow: "CLAIM YOUR DEPLOYMENT SLOT",
          headline: "Lock in your direct-response conversion system",
          subheadline: "Backed by our 100% performance milestone guarantee.",
          className: "min-h-[65dvh] bg-slate-950 border-b border-white/10 py-20 text-white",
          tiers: [
            {
              name: "Fast-Track Sprint",
              price: "$149",
              interval: "/month",
              description: "Complete turnkey conversion funnel + automated lead routing.",
              features: [
                "Full direct-response conversion stack",
                "Instant CRM & calendar webhook sync",
                "100% performance milestone guarantee",
              ],
              ctaLabel: "Claim Free Growth Audit →",
              ctaUrl: "/register",
              highlighted: true,
            },
            {
              name: "Enterprise Scale",
              price: "$499",
              interval: "/month",
              description: "Multi-market clustering & dedicated conversion engineer.",
              features: [
                "Unlimited high-velocity landing funnels",
                "Custom domain CNAME + edge caching",
                "Dedicated 24/7 slack war-room",
              ],
              ctaLabel: "Claim Free Growth Audit →",
              ctaUrl: "/register",
              highlighted: false,
            },
          ],
        },
      },
      {
        id: "cta-1",
        type: "CTA",
        props: {
          eyebrow: "FINAL CALL · LIMITED AVAILABILITY",
          headline: "Claim your high-velocity growth system before your competitors do",
          subheadline: "Deploy in 10 minutes with our 100% risk-free execution guarantee.",
          ctaLabel: "Claim Free Growth Audit →",
          ctaUrl: "/register",
          guarantee: "100% Risk-Free Execution Guarantee · Instant Access",
          className: "min-h-[55dvh] bg-[#050814] py-20 text-white",
        },
      },
      {
        id: "footer-1",
        type: "Footer",
        props: {
          brandName: "ScaleVelocity Pro",
          ctaLabel: "Claim Free Growth Audit →",
          ctaUrl: "/register",
          links: [
            { label: "Pricing", url: "/pricing" },
            { label: "Register", url: "/register" },
          ],
          className: "border-t border-white/10 bg-[#050814] py-12 text-slate-400",
        },
      },
    ],
  },
};
