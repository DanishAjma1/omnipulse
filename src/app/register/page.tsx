"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import {
  Activity,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Strict Zod schema for client-side registration validation
const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .email("Please provide a valid work email address")
    .refine(
      (val) => !val.endsWith("@gmail.com") && !val.endsWith("@yahoo.com"),
      {
        message:
          "Please use your official company or agency work email (e.g. name@agency.com)",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  companyType: z.enum(
    [
      "PERFORMANCE_AGENCY",
      "ECOMMERCE_BRAND",
      "SAAS_SCALEUP",
      "CONSULTANCY",
    ],
    { message: "Please select your company type" }
  ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({
    fullName: "",
    email: "",
    password: "",
    companyType: undefined,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Valid payload - simulate loading and success
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 overflow-y-auto lg:overflow-hidden">
      {/* LEFT STATIC PANE (50%) */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-950 via-zinc-950 to-[#0A0A0A] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 relative overflow-hidden shrink-0">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/40 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Omni<span className="text-indigo-400">Pulse</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="space-y-3">
            <Badge variant="brand" dot className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              Enterprise Access
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Unify Your Agency&apos;s Marketing Operations.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Launch your 14-day full platform trial. No developer token friction,
              no rate limit errors, and zero credit card required.
            </p>
          </div>

          {/* Feature Bullet List */}
          <div className="space-y-3 pt-2">
            {[
              "Instant Google Ads MCC & Meta token sync",
              "White-labeled client reporting portals with CNAME mapping",
              "Asynchronous SEO audit worker queues & keyword discovery",
              "Zero rate-limit burst protection & token bucket guard",
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

        {/* Testimonial & OAuth Badge */}
        <div className="relative z-10 mt-12 space-y-6 pt-6 border-t border-zinc-800">
          <blockquote className="space-y-2">
            <p className="text-sm italic text-zinc-300 leading-relaxed">
              &ldquo;OmniPulse cut our campaign setup and client reporting overhead
              by 73% in the first quarter alone. Our client retention has never
              been higher.&rdquo;
            </p>
            <footer className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="font-semibold text-white">Sarah Lin</span>
              <span>•</span>
              <span>Head of Performance at Apex Growth</span>
            </footer>
          </blockquote>

          {/* Secure Google OAuth badge */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Secure Google OAuth</p>
                <p className="text-zinc-400">
                  Verified Google Partner App • 256-bit AES
                </p>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* RIGHT INTERACTIVE PANE (50%) */}
      <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {isSuccess ? (
            <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Workspace Initialized!
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Welcome to OmniPulse, <strong>{formData.fullName}</strong>. We&apos;ve
                created your sandbox and sent a verification link to{" "}
                <strong>{formData.email}</strong>.
              </p>
              <div className="pt-4">
                <Button variant="primary" size="lg" href="/" className="w-full justify-center">
                  Continue to Workspace Console
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Create Your Organization
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Already have an active workspace?{" "}
                  <Link
                    href="/"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    Log in here
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    placeholder="e.g. Danish Butt"
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors focus:outline-none ${
                      errors.fullName
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-indigo-500"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="name@agency.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors focus:outline-none ${
                      errors.email
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-indigo-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password || ""}
                      onChange={handleChange}
                      placeholder="Min. 8 chars, 1 uppercase, 1 number"
                      className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors focus:outline-none ${
                        errors.password
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-zinc-300 dark:border-zinc-800 focus:border-indigo-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
                  )}
                </div>

                {/* Company Type Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Company / Organization Type
                  </label>
                  <select
                    name="companyType"
                    value={formData.companyType || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors focus:outline-none ${
                      errors.companyType
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-indigo-500"
                    }`}
                  >
                    <option value="" disabled>
                      Select your organization model...
                    </option>
                    <option value="PERFORMANCE_AGENCY">
                      Performance Marketing Agency (Multi-Client)
                    </option>
                    <option value="ECOMMERCE_BRAND">
                      E-Commerce / Direct-to-Consumer Brand
                    </option>
                    <option value="SAAS_SCALEUP">
                      SaaS / B2B Scaleup
                    </option>
                    <option value="CONSULTANCY">
                      Growth Consultancy / Solopreneur
                    </option>
                  </select>
                  {errors.companyType && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.companyType}
                    </p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={Boolean(formData.acceptTerms)}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      I agree to the{" "}
                      <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 underline">
                        Privacy Policy
                      </Link>
                      , including developer token API governance.
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center text-sm font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Validating Credentials...
                      </>
                    ) : (
                      <>
                        Register Organization
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
