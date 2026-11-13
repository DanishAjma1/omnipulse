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
                Omni<span className="text-indigo-600 dark:text-indigo-400">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              The high-velocity operations engine for multi-channel performance agencies. Automate MCC synchronization, white-labeled client intelligence, and programmatic growth.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • 99.99% API SLA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Google Ads Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Client Portal System
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  AI SEO & Outreach
                </Link>
              </li>
              <li>
                <Link
                  href="/services#integrations"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  API & Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/pricing"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Developer Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  System Status
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Enterprise
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Sales Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  SOC-2 Type II Verified
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 OmniPulse Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-200">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-200">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-200">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
