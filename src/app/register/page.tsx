"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StripeCardCapture } from "@/components/onboarding/StripeCardCapture";
import {
  DEFAULT_ONBOARDING_DRAFT,
  ONBOARDING_STORAGE_KEY,
  ONBOARDING_TIERS,
  postOnboardingApi,
  type OnboardingDraft,
  type PlanTier,
  type StripeSetupSession,
} from "@/lib/onboarding";
import {
  extractFieldErrors,
  onboardingStep2Schema,
  otpSendFormSchema,
  otpVerifyFormSchema,
} from "@/lib/validation";

function loadSavedDraft(): OnboardingDraft {
  if (typeof window === "undefined") return DEFAULT_ONBOARDING_DRAFT;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return DEFAULT_ONBOARDING_DRAFT;
    const parsed = JSON.parse(raw) as Partial<OnboardingDraft>;
    return { ...DEFAULT_ONBOARDING_DRAFT, ...parsed };
  } catch {
    return DEFAULT_ONBOARDING_DRAFT;
  }
}

export default function RegisterPage() {
  const [draft, setDraft] = useState<OnboardingDraft>(DEFAULT_ONBOARDING_DRAFT);

  const [otpCode, setOtpCode] = useState("");
  const [devOtpPreview, setDevOtpPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const [stripeSession, setStripeSession] = useState<StripeSetupSession | null>(null);
  const [completionInfo, setCompletionInfo] = useState<{
    consoleLoginUrl: string;
    tenantName: string;
  } | null>(null);

  useEffect(() => {
    const saved = loadSavedDraft();
    if (saved.email || saved.step > 1 || saved.verificationToken) {
      queueMicrotask(() => {
        setDraft(saved);
      });
    }
  }, []);

  const updateDraft = (patch: Partial<OnboardingDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota failures
      }
      return next;
    });
    setBannerError(null);
  };

  // Step 1A: Send 6-digit email OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setFieldErrors({});

    const parsed = otpSendFormSchema.safeParse({ email: draft.email });
    if (!parsed.success) {
      setFieldErrors(extractFieldErrors(parsed.error));
      return;
    }

    setBusyAction("send_otp");
    try {
      const res = await postOnboardingApi<{
        sent: boolean;
        email: string;
        expiresInSeconds: number;
        deliveredViaEmail: boolean;
        devOtpPreview?: string;
      }>("/onboarding/otp/send", { email: parsed.data.email });

      setDevOtpPreview(res.devOtpPreview ?? null);
      updateDraft({
        email: res.email,
        otpSent: true,
        otpVerified: false,
        verificationToken: "",
      });
    } catch (err) {
      setBannerError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setBusyAction(null);
    }
  };

  // Step 1B: Verify 6-digit OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setFieldErrors({});

    const parsed = otpVerifyFormSchema.safeParse({
      email: draft.email,
      code: otpCode,
    });
    if (!parsed.success) {
      const nextErrors = extractFieldErrors(parsed.error);
      setFieldErrors({ otpCode: nextErrors.code || nextErrors.email || "Enter the 6-digit verification code" });
      return;
    }

    setBusyAction("verify_otp");
    try {
      const res = await postOnboardingApi<{
        verified: boolean;
        email: string;
        verificationToken: string;
      }>("/onboarding/otp/verify", {
        email: parsed.data.email,
        code: parsed.data.code,
      });

      updateDraft({
        email: res.email,
        otpVerified: true,
        verificationToken: res.verificationToken,
        step: 2,
      });
    } catch (err) {
      setBannerError(err instanceof Error ? err.message : "Invalid verification code");
    } finally {
      setBusyAction(null);
    }
  };

  // Step 2: Persist profile + encrypted-in-flight credentials into localStorage and proceed to Step 3
  const handleSaveCredentialsStep = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setFieldErrors({});

    const parsed = onboardingStep2Schema.safeParse({
      fullName: draft.fullName,
      companyName: draft.companyName,
      password: draft.password,
      confirmPassword: draft.confirmPassword,
      mccId: draft.mccId,
      developerToken: draft.developerToken,
    });

    if (!parsed.success) {
      setFieldErrors(extractFieldErrors(parsed.error));
      return;
    }

    updateDraft({ step: 3 });
  };

  // Step 3A: Initialize Stripe customer & SetupIntent session for chosen tier
  const handleStartStripeCheckout = async (tier: PlanTier = draft.planTier) => {
    const step2Check = onboardingStep2Schema.safeParse({
      fullName: draft.fullName,
      companyName: draft.companyName,
      password: draft.password,
      confirmPassword: draft.confirmPassword,
      mccId: draft.mccId,
      developerToken: draft.developerToken,
    });
    if (!step2Check.success) {
      setFieldErrors(extractFieldErrors(step2Check.error));
      setBannerError(
        step2Check.error.issues[0]?.message ?? "Review your workspace credentials in Step 2 before payment."
      );
      updateDraft({ step: 2 });
      return;
    }
    setBannerError(null);
    setBusyAction("create_setup");
    try {
      const session = await postOnboardingApi<StripeSetupSession>(
        "/onboarding/stripe/create-setup",
        {
          email: draft.email.trim(),
          fullName: draft.fullName.trim(),
          companyName: draft.companyName.trim(),
          planTier: tier,
          verificationToken: draft.verificationToken,
        }
      );
      setStripeSession(session);
    } catch (err) {
      setBannerError(err instanceof Error ? err.message : "Unable to initialize Stripe checkout");
    } finally {
      setBusyAction(null);
    }
  };

  // Step 3B: Only after Stripe card authorization completes, submit full localStorage payload to backend
  const handleFinalizeRegistration = async (auth: {
    customerId: string;
    setupIntentId: string;
  }) => {
    setBannerError(null);
    setBusyAction("register");
    try {
      const latestDraft = loadSavedDraft();
      const source = latestDraft.verificationToken ? latestDraft : draft;

      const result = await postOnboardingApi<{
        token: string;
        tenant: { name: string };
        consoleLoginUrl: string;
      }>("/onboarding/register", {
        email: source.email.trim(),
        verificationToken: source.verificationToken,
        fullName: source.fullName.trim(),
        companyName: source.companyName.trim(),
        password: source.password,
        mccId: source.mccId.trim(),
        developerToken: source.developerToken.trim(),
        planTier: source.planTier,
        stripeCustomerId: auth.customerId,
        stripeSetupIntentId: auth.setupIntentId,
      });

      window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      setCompletionInfo({
        consoleLoginUrl: result.consoleLoginUrl || "http://localhost:5173/login",
        tenantName: result.tenant.name,
      });

      window.setTimeout(() => {
        window.location.assign(result.consoleLoginUrl || "http://localhost:5173/login");
      }, 1500);
    } catch (err) {
      setBannerError(err instanceof Error ? err.message : "Workspace provisioning failed");
    } finally {
      setBusyAction(null);
    }
  };

  const stepsMeta = [
    { num: 1 as const, label: "Email OTP" },
    { num: 2 as const, label: "Credentials" },
    { num: 3 as const, label: "Plan & Stripe" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100">
      {/* LEFT STATIC PANE */}
      <div className="w-full lg:w-[44%] bg-gradient-to-br from-indigo-950 via-zinc-950 to-[#0A0A0A] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/40 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Omni<span className="text-indigo-400">Pulse</span>
            </span>
          </Link>

          <div className="space-y-3">
            <Badge
              variant="brand"
              dot
              className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
            >
              Multi-Tenant SaaS Onboarding
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Launch Your Isolated Agency Workspace.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Your Google Ads Developer Token &amp; OAuth credentials are encrypted
              with AES-256-GCM at rest and strictly bound to your organization tenant.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Dedicated tenant isolation at the database & API boundary",
              "AES-256-GCM encrypted Google Ads Developer Token vault",
              "14-day full-platform free trial — cancel anytime before billing",
              "Direct console provisioning after Stripe card authorization",
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-10 pt-6 border-t border-zinc-800 flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/80 border">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Zero-Knowledge Credential Vault</p>
              <p className="text-zinc-400">Stripe PCI-DSS + AES-256-GCM Encryption</p>
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* RIGHT WIZARD PANE */}
      <div className="w-full lg:w-[56%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-xl space-y-7">
          {completionInfo ? (
            <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {completionInfo.tenantName} Is Live!
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Your 14-day trial is active and Google Ads credentials are encrypted.
                Redirecting you to the Agency Console login...
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  href={completionInfo.consoleLoginUrl}
                  className="w-full justify-center"
                >
                  Open Agency Console Login
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Stepper Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Create Your Workspace
                  </h2>
                  <Link
                    href="http://localhost:5173/login"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Console Sign In &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {stepsMeta.map((s) => {
                    const active = draft.step === s.num;
                    const done = draft.step > s.num;
                    return (
                      <div
                        key={s.num}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                          active
                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-500 dark:text-indigo-300"
                            : done
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                              : "border-zinc-200 dark:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/15 text-[11px]">
                          {done ? <Check className="w-3 h-3" /> : s.num}
                        </span>
                        <span className="truncate">{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {bannerError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-500 dark:text-rose-300">
                  {bannerError}
                </div>
              )}

              {/* STEP 1: EMAIL OTP VERIFICATION */}
              {draft.step === 1 && (
                <div className="space-y-5">
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Work Email Address
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="email"
                          value={draft.email}
                          onChange={(e) => updateDraft({ email: e.target.value })}
                          placeholder="founder@agency.com"
                          className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={busyAction === "send_otp"}
                          className="justify-center whitespace-nowrap"
                        >
                          {busyAction === "send_otp" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MailCheck className="w-4 h-4" />
                          )}
                          {draft.otpSent ? "Resend Code" : "Send 6-Digit Code"}
                        </Button>
                      </div>
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.email}</p>
                      )}
                    </div>
                  </form>

                  {draft.otpSent && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-950/60">
                      {devOtpPreview && (
                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-300">
                          Development preview OTP code: <strong className="font-mono tracking-widest">{devOtpPreview}</strong>
                        </div>
                      )}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                          Enter 6-Digit OTP Sent to {draft.email}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="123456"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-lg tracking-[0.4em] text-center focus:border-indigo-500 focus:outline-none"
                        />
                        {fieldErrors.otpCode && (
                          <p className="mt-1 text-xs text-rose-500">{fieldErrors.otpCode}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={busyAction === "verify_otp"}
                        className="w-full justify-center"
                      >
                        {busyAction === "verify_otp" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            Verify Email &amp; Continue
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              )}

              {/* STEP 2: USER PROFILE & GOOGLE ADS CREDENTIALS */}
              {draft.step === 2 && (
                <form onSubmit={handleSaveCredentialsStep} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={draft.fullName}
                        onChange={(e) => updateDraft({ fullName: e.target.value })}
                        placeholder="Jane Founder"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.fullName && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Agency / Workspace Name
                      </label>
                      <input
                        type="text"
                        value={draft.companyName}
                        onChange={(e) => updateDraft({ companyName: e.target.value })}
                        placeholder="Apex Growth Partners"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.companyName && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={draft.password}
                          onChange={(e) => updateDraft({ password: e.target.value })}
                          placeholder="Min 8 chars, upper & number"
                          className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={draft.confirmPassword}
                        onChange={(e) => updateDraft({ confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.confirmPassword && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-zinc-50 dark:bg-zinc-950/60">
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                      <KeyRound className="w-4 h-4" />
                      Google Ads API Tenant Configuration
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                        Google Ads MCC Account ID
                      </label>
                      <input
                        type="text"
                        value={draft.mccId}
                        onChange={(e) => updateDraft({ mccId: e.target.value })}
                        placeholder="123-456-7890"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.mccId && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.mccId}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                        Google Ads Developer Token
                      </label>
                      <input
                        type="password"
                        value={draft.developerToken}
                        onChange={(e) => updateDraft({ developerToken: e.target.value })}
                        placeholder="Your Google Ads API developer token"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.developerToken && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.developerToken}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => updateDraft({ step: 1 })}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-1 justify-center">
                      Continue to Plan &amp; Billing
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 3: PLAN SELECTION & STRIPE CHECKOUT */}
              {draft.step === 3 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-3 gap-3">
                    {ONBOARDING_TIERS.map((tier) => {
                      const selected = draft.planTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            updateDraft({ planTier: tier.id });
                            setStripeSession(null);
                          }}
                          className={`text-left rounded-2xl border p-4 transition-all ${
                            selected
                              ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-sm font-bold">{tier.name}</span>
                            {tier.badge && (
                              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-2xl font-extrabold">
                            ${tier.monthlyPrice}
                            <span className="text-xs font-normal text-zinc-500">/mo</span>
                          </p>
                          <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                            {tier.tagline}
                          </p>
                          <ul className="mt-3 space-y-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                            {tier.highlights.map((h) => (
                              <li key={h} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>

                  {!stripeSession ? (
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => updateDraft({ step: 2 })}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        disabled={busyAction === "create_setup"}
                        onClick={() => handleStartStripeCheckout(draft.planTier)}
                        className="flex-1 justify-center"
                      >
                        {busyAction === "create_setup" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Preparing Stripe Checkout...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            Continue to Stripe Card Authorization
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-950/60">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">
                          Payment Method ({draft.planTier.replace("_", " ")})
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setStripeSession(null);
                            updateDraft({ step: 2 });
                          }}
                          className="text-xs text-zinc-400 hover:text-zinc-200"
                        >
                          Edit Credentials
                        </button>
                      </div>

                      <StripeCardCapture
                        session={stripeSession}
                        email={draft.email}
                        fullName={draft.fullName}
                        isProvisioning={busyAction === "register"}
                        onAuthorized={handleFinalizeRegistration}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
