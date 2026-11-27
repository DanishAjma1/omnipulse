import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#080808] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Omni
                <span className="text-indigo-600 dark:text-indigo-400">
                  Pulse
                </span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              The closed-loop revenue and ad-operations platform for agencies,
              local businesses, and global brands. Unify Google Ads MCC,
              400vh+ Scroll-Story Funnels, Worker-Thread SEO, Resend Outreach,
              and White-Label Client Portals.
            </p>
            <Link
              href="/security#status"
              className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 pt-2 transition-colors"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • 99.99% API SLA</span>
            </Link>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Google Ads MCC &amp; Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/services#crm-suite"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  CRM, Kanban &amp; Leads 360°
                </Link>
              </li>
              <li>
                <Link
                  href="/services#funnels"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  400vh+ Funnel Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/docs#seo-engine"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  SEO Crawler &amp; Outreach
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Docs &amp; Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/docs#credentials-guide"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Developer Token &amp; OAuth Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs#credentials-guide"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Pull MCC Analytics Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs#crm-kanban"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  CRM, Kanban &amp; Tickets Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs#role-simulator"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Admin · Manager · Client Roles
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Enterprise */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Security &amp; Plans
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/security"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Zero-Knowledge Security
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Pricing &amp; Tiers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Solutions Engineering
                </Link>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  AES-256-GCM Encrypted
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 OmniPulse Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/security#privacy"
              className="hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/security#terms"
              className="hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Security Architecture
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
