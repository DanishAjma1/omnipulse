export type FriendlyErrorContext =
  | "send_otp"
  | "verify_otp"
  | "register"
  | "contact"
  | "card"
  | "general";

export const DEFAULT_CREDENTIAL_MESSAGE =
  "Please check your credentials — are they valid?";

export class UserFriendlyError extends Error {
  constructor(message: string = DEFAULT_CREDENTIAL_MESSAGE) {
    super(message);
    this.name = "UserFriendlyError";
  }
}

function extractRawText(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const rec = error as Record<string, unknown>;
    if (typeof rec.message === "string") return rec.message;
    if (typeof rec.error === "string") return rec.error;
    if (
      rec.error &&
      typeof rec.error === "object" &&
      typeof (rec.error as Record<string, unknown>).message === "string"
    ) {
      return String((rec.error as Record<string, unknown>).message);
    }
  }
  return "";
}

/**
 * Strictly maps any backend, provider, network, or runtime error to a static,
 * user-safe credential check message. Raw error logs, HTTP status codes,
 * stack traces, and provider diagnostics are never returned to the UI.
 */
export function toFriendlyCredentialMessage(
  error: unknown,
  context: FriendlyErrorContext = "general",
  status?: number
): string {
  if (error instanceof UserFriendlyError) {
    return error.message;
  }

  const raw = extractRawText(error);

  if (status === 409 || /already\s+(exists|registered)/i.test(raw)) {
    return "This email is already registered. Please check your credentials — are they valid?";
  }

  if (status === 429 || /too\s+many|rate[\s_-]?limit/i.test(raw)) {
    return "Too many attempts. Please wait a moment and check your credentials — are they valid?";
  }

  if (context === "verify_otp") {
    return "Invalid or expired verification code. Please check your credentials — are they valid?";
  }

  if (context === "send_otp") {
    return "Unable to send verification code. Please check your email and credentials — are they valid?";
  }

  if (context === "card") {
    return "Unable to verify payment details. Please check your credentials — are they valid?";
  }

  if (context === "contact") {
    return "Unable to submit your inquiry right now. Please check your details — are they valid?";
  }

  if (/verification\s+(token|session)|re-?verify/i.test(raw)) {
    return "Email verification expired. Please re-verify your email and check your credentials — are they valid?";
  }

  return DEFAULT_CREDENTIAL_MESSAGE;
}
