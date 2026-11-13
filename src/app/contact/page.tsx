"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  Code2,
  Send,
  CheckCircle2,
  Loader2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Google Ads MCC Migration",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const ticketId = `OMNI-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket(ticketId);
      setToastMessage("Message received! Solutions team will respond shortly.");
      setFormData({
        name: "",
        email: "",
        subject: "Google Ads MCC Migration",
        message: "",
      });
    }, 1000);
  };

  return (
    <MarketingLayout>
      {/* 1. CONTACT HERO */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" className="mb-4">
            Direct Line
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
            We&apos;re Here to Help You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Scale.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Technical questions about our Google Ads engine, custom enterprise
            integrations, or white-label client portals? Our solutions engineering
            team responds within 2 hours.
          </p>
        </div>
      </section>

      {/* 2. 2-COLUMN LAYOUT */}
      <AnimatedSection spacing="py-24" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Support, Sales, HQ, Hours, API Docs link (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Contact Channels
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Reach out to our specialized engineering desks or schedule a
                live technical walkthrough.
              </p>
            </div>

            <div className="space-y-6">
              {/* Support Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Technical Support
                  </h4>
                  <a
                    href="mailto:support@omnipulse.io"
                    className="text-base font-semibold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    support@omnipulse.io
                  </a>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    For active workspaces, bug reports, and API questions
                  </p>
                </div>
              </div>

              {/* Sales Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Enterprise Sales
                  </h4>
                  <a
                    href="mailto:sales@omnipulse.io"
                    className="text-base font-semibold text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    sales@omnipulse.io
                  </a>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    For multi-MCC holding companies and custom SLAs
                  </p>
                </div>
              </div>

              {/* HQ Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Global Headquarters
                  </h4>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    548 Market St, Suite 39201
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    San Francisco, CA 94104, United States
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Operating Hours
                  </h4>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Monday – Friday: 24/5 Global Coverage
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Weekend critical PagerDuty emergency response for Enterprise
                  </p>
                </div>
              </div>

              {/* Subtle "API Docs" Link Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/20 via-zinc-900/80 to-zinc-900/80 border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                        OmniPulse Developer Documentation
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Explore endpoints, rate limits, and client schemas
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/services#integrations"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    API Docs
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form with Loading/Success Toast States (Span 7) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 shadow-xl relative">
              {/* Toast Notification */}
              {toastMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {toastMessage} Ticket reference:{" "}
                      <strong className="font-mono">{submittedTicket}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setToastMessage(null)}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Send a Message to Solutions Engineering
              </h3>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                Fill in the details below and an engineer will reply directly to
                your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 text-sm bg-zinc-50/50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@agency.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 text-sm bg-zinc-50/50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Subject / Discussion Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 text-sm bg-zinc-50/50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Google Ads MCC Migration">
                      Google Ads MCC Migration & Token Setup
                    </option>
                    <option value="Enterprise Custom Token SLA">
                      Enterprise Custom Token & Data Warehouse SLA
                    </option>
                    <option value="White-Label Portal Setup">
                      White-Label Client Portal & CNAME Customization
                    </option>
                    <option value="Technical Integration / API">
                      Technical Integration & Rate-Limit Questions
                    </option>
                    <option value="Other">Other Strategic Inquiries</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your agency's client count, monthly ad spend, and any specific technical requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 text-sm bg-zinc-50/50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 justify-center text-sm font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting to Engineering...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </MarketingLayout>
  );
}
