"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  MailCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_ONBOARDING_DRAFT,
  ONBOARDING_STORAGE_KEY,
  postOnboardingApi,
  type OnboardingDraft,
} from "@/lib/onboarding";

const step2Schema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().trim().min(2, "Agency / workspace name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter")
      .regex(/[0-9]/, "Include at least one number")
      .regex(/[^A-Za-z0-9\s]/, "Include at least one special character"),
    confirmPassword: z.string(),
    mccId: z
      .string()
      .trim()
      .regex(
        /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/,
        "Google Ads MCC ID must be exactly 10 digits (XXX-XXX-XXXX or XXXXXXXXXX)"
      ),
    developerToken: z
      .string()
      .trim()
      .min(20, "Google Ads Developer Token must be 20 to 32 characters")
      .max(32, "Google Ads Developer Token must be 20 to 32 characters")
      .regex(
        /^[A-Za-z0-9_-]{20,32}$/,
        "Developer Token must use only letters, numbers, hyphens, or underscores"
      )
      .refine(
        (v) => /[A-Za-z]/.test(v),
        "Developer Token must include alphabetic characters"
      ),
    geminiApiKey: z
      .string()
      .trim()
      .min(16, "Gemini API Key must be between 16 and 128 characters")
      .max(128, "Gemini API Key must be between 16 and 128 characters")
      .regex(
        /^[A-Za-z0-9_-]{16,128}$/,
        "Gemini API Key must contain only letters, numbers, hyphens, or underscores"
      ),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function loadSavedDraft(): OnboardingDraft {
  if (typeof window === "undefined") return DEFAULT_ONBOARDING_DRAFT;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return DEFAULT_ONBOARDING_DRAFT;
    const parsed = JSON.parse(raw) as Partial<OnboardingDraft>;
    const normalizedStep: 1 | 2 = parsed.step === 2 ? 2 : 1;
    return { ...DEFAULT_ONBOARDING_DRAFT, ...parsed, step: normalizedStep };
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

  // Step 1A: Send 6-digit email OTP via Resend
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setFieldErrors({});

    const parsed = z
      .string()
      .email("Enter a valid work email address")
      .safeParse(draft.email.trim());
    if (!parsed.success) {
      setFieldErrors({ email: parsed.error.issues[0]?.message || "Invalid email" });
      return;
    }

    setDevOtpPreview(null);
    setBusyAction("send_otp");
    try {
      const res = await postOnboardingApi<{
        sent: boolean;
        email: string;
        expiresInSeconds: number;
        deliveredViaEmail: boolean;
        provider?: "resend" | null;
        devOtpPreview?: string;
      }>("/onboarding/otp/send", { email: parsed.data });

      // Only expose the hint if Resend is NOT configured; never display a hint when Resend sent the email.
      setDevOtpPreview(!res.deliveredViaEmail && res.devOtpPreview ? res.devOtpPreview : null);
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

    if (!/^\d{6}$/.test(otpCode.trim())) {
      setFieldErrors({ otpCode: "Enter the 6-digit verification code" });
      return;
    }

    setBusyAction("verify_otp");
    try {
      const res = await postOnboardingApi<{
        verified: boolean;
        email: string;
        verificationToken: string;
      }>("/onboarding/otp/verify", {
        email: draft.email.trim(),
        code: otpCode.trim(),
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

  // Step 2: Validate BYOK credentials (MCC ID, Developer Token, Gemini API Key) & provision free multi-tenant workspace
  const handleCompleteByokRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError(null);
    setFieldErrors({});

    const parsed = step2Schema.safeParse({
      fullName: draft.fullName,
      companyName: draft.companyName,
      password: draft.password,
      confirmPassword: draft.confirmPassword,
      mccId: draft.mccId,
      developerToken: draft.developerToken,
      geminiApiKey: draft.geminiApiKey,
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setBusyAction("register");
    try {
      const result = await postOnboardingApi<{
        token: string;
        tenant: { name: string };
        consoleLoginUrl: string;
      }>("/onboarding/register", {
        email: draft.email.trim(),
        verificationToken: draft.verificationToken,
        fullName: parsed.data.fullName,
        companyName: parsed.data.companyName,
        password: parsed.data.password,
        mccId: parsed.data.mccId,
        developerToken: parsed.data.developerToken,
        geminiApiKey: parsed.data.geminiApiKey,
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
    { num: 1 as const, label: "1. Email OTP (Resend)" },
    { num: 2 as const, label: "2. BYOK Credentials" },
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
              Free BYOK Multi-Tenant SaaS
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Launch Your Isolated Agency Workspace — Free Forever.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Bring your own Google Ads Developer Token, MCC Account ID, and Google
              Gemini API Key. All credentials are encrypted with AES-256-GCM at rest
              and strictly scoped to your tenant.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "100% Free BYOK Workspace — No credit card or Stripe subscription required",
              "AES-256-GCM encrypted Google Ads Developer Token & Gemini API Key vault",
              "Includes 5 Google Ads clients, 5 live funnels/month, 5 SEO websites/week",
              "Want uncapped capacity or self-hosted ownership? Contact Support to Take Full Control",
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
              <p className="text-zinc-400">AES-256-GCM Encryption · Strict Tenant Isolation</p>
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
                Your BYOK Google Ads and Gemini API keys are encrypted at rest.
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
                    Create Your Free Workspace
                  </h2>
                  <Link
                    href="http://localhost:5173/login"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Console Sign In &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {stepsMeta.map((s) => {
                    const active = draft.step === s.num;
                    const done = draft.step > s.num;
                    return (
                      <div
                        key={s.num}
                        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors ${
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
                    <form
                      onSubmit={handleVerifyOtp}
                      className="space-y-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-950/60"
                    >
                      {devOtpPreview ? (
                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-300">
                          Resend is not configured — verification code hint:{" "}
                          <strong className="font-mono tracking-widest">{devOtpPreview}</strong>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
                          Verification code sent to{" "}
                          <strong className="font-mono">{draft.email}</strong>. Check your inbox
                          for the 6-digit code.
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
                          onChange={(e) =>
                            setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
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

              {/* STEP 2: USER PROFILE & BYOK CREDENTIALS (MCC ID, DEVELOPER TOKEN, GEMINI API KEY) */}
              {draft.step === 2 && (
                <form onSubmit={handleCompleteByokRegistration} className="space-y-4">
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
                          placeholder="Min 8 chars, upper, number & symbol"
                          className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
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
                      BYOK API Credentials (AES-256-GCM Encrypted at Rest)
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
                        placeholder="20–32 char Google Ads API developer token"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.developerToken && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.developerToken}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Google Gemini API Key</span>
                      </label>
                      <input
                        type="password"
                        value={draft.geminiApiKey}
                        onChange={(e) => updateDraft({ geminiApiKey: e.target.value })}
                        placeholder="AIzaSy... (your Google AI Studio Gemini API Key)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      {fieldErrors.geminiApiKey && (
                        <p className="mt-1 text-xs text-rose-500">{fieldErrors.geminiApiKey}</p>
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
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={busyAction === "register"}
                      className="flex-1 justify-center"
                    >
                      {busyAction === "register" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Encrypting &amp; Provisioning Workspace...
                        </>
                      ) : (
                        <>
                          Launch Free Workspace
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
