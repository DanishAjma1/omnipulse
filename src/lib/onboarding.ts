export interface OnboardingDraft {
  step: 1 | 2;
  email: string;
  otpSent: boolean;
  otpVerified: boolean;
  verificationToken: string;
  fullName: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  mccId: string;
  developerToken: string;
  geminiApiKey: string;
}

export const DEFAULT_ONBOARDING_DRAFT: OnboardingDraft = {
  step: 1,
  email: "",
  otpSent: false,
  otpVerified: false,
  verificationToken: "",
  fullName: "",
  companyName: "",
  password: "",
  confirmPassword: "",
  mccId: "",
  developerToken: "",
  geminiApiKey: "",
};

export const ONBOARDING_STORAGE_KEY = "omnipulse_onboarding_v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4100/api/v1";

export async function postOnboardingApi<T>(
  path: string,
  payload: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await res.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    data?: T;
  } | null;

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }

  return json.data as T;
}
