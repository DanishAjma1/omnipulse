import { z } from "zod";

/**
 * Google Ads MCC Account ID must be strictly 10 digits:
 * either XXXXXXXXXX or XXX-XXX-XXXX.
 */
export const GOOGLE_MCC_ID_REGEX = /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/;

export const googleMccIdSchema = z
  .string()
  .trim()
  .regex(
    GOOGLE_MCC_ID_REGEX,
    "Google Ads MCC ID must be exactly 10 digits (XXX-XXX-XXXX or XXXXXXXXXX)"
  );

/**
 * Official Google Ads API Developer Token constraints:
 * 20-32 URL-safe alphanumeric characters ([A-Za-z0-9_-]) with alphabetic diversity.
 */
export const GOOGLE_DEVELOPER_TOKEN_REGEX = /^[A-Za-z0-9_-]{20,32}$/;

export const googleDeveloperTokenSchema = z
  .string()
  .trim()
  .min(20, "Google Ads Developer Token must be 20 to 32 characters")
  .max(32, "Google Ads Developer Token must be 20 to 32 characters")
  .regex(
    GOOGLE_DEVELOPER_TOKEN_REGEX,
    "Developer Token may only contain letters, numbers, hyphens, or underscores"
  )
  .refine(
    (value) => /[A-Za-z]/.test(value),
    "Developer Token must include alphabetic characters matching Google Ads API format"
  );

export const strictEmailSchema = z
  .string()
  .trim()
  .email("Enter a valid work email address")
  .max(254, "Email address must not exceed 254 characters");

export const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9\s]/, "Password must contain at least one special character");

export const httpUrlSchema = z
  .string()
  .trim()
  .max(2048, "URL must not exceed 2048 characters")
  .url("Enter a valid URL (e.g. https://example.com)")
  .refine(
    (value) => /^https?:\/\//i.test(value),
    "URL must start with http:// or https://"
  );

export const otpSendFormSchema = z.object({
  email: strictEmailSchema,
});

export const otpVerifyFormSchema = z.object({
  email: strictEmailSchema,
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code"),
});

export const onboardingStep2Schema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(120),
    companyName: z
      .string()
      .trim()
      .min(2, "Agency / workspace name is required")
      .max(120),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    mccId: googleMccIdSchema,
    developerToken: googleDeveloperTokenSchema,
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Your name must be at least 2 characters")
    .max(120, "Name must not exceed 120 characters"),
  email: strictEmailSchema,
  subject: z.string().trim().min(2, "Select a discussion topic").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Please include at least 10 characters describing your inquiry")
    .max(5000, "Message must not exceed 5000 characters"),
});

export function extractFieldErrors(error: z.ZodError): Record<string, string> {
  const nextErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : "_form";
    if (!nextErrors[key]) {
      nextErrors[key] = issue.message;
    }
  }
  return nextErrors;
}
