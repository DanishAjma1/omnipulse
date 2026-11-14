"use client";

import React, { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { StripeSetupSession } from "@/lib/onboarding";

interface StripeCardCaptureProps {
  session: StripeSetupSession;
  email: string;
  fullName: string;
  isProvisioning: boolean;
  onAuthorized: (result: { customerId: string; setupIntentId: string }) => Promise<void>;
}

function LiveStripeCardForm({
  session,
  email,
  fullName,
  isProvisioning,
  onAuthorized,
}: StripeCardCaptureProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !session.clientSecret) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setConfirming(true);
    setCardError(null);

    try {
      const result = await stripe.confirmCardSetup(session.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: fullName, email },
        },
      });

      if (result.error) {
        setCardError(result.error.message || "Card verification failed");
        return;
      }

      if (result.setupIntent?.status !== "succeeded") {
        setCardError("Additional authentication required — please verify card");
        return;
      }

      await onAuthorized({
        customerId: session.customerId,
        setupIntentId: session.setupIntentId,
      });
    } catch (err) {
      setCardError(
        err instanceof Error ? err.message : "Failed to complete payment setup"
      );
    } finally {
      setConfirming(false);
    }
  };

  const busy = confirming || isProvisioning;

  return (
    <form onSubmit={handleConfirm} className="space-y-4">
      <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3.5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#e4e4e7",
                "::placeholder": { color: "#71717a" },
              },
              invalid: { color: "#fb7185" },
            },
          }}
        />
      </div>

      {cardError && <p className="text-xs text-rose-500">{cardError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={busy || !stripe}
        className="w-full justify-center text-sm font-semibold"
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Authorizing Card & Creating Workspace...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Start {session.trialDays}-Day Free Trial
          </>
        )}
      </Button>
    </form>
  );
}

function SandboxCardForm({
  session,
  fullName,
  isProvisioning,
  onAuthorized,
}: StripeCardCaptureProps) {
  const [cardHolder, setCardHolder] = useState(fullName);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (!cardHolder.trim() || digits.length < 12 || !/^\d{2}\/\d{2}$/.test(expiry) || cvc.trim().length < 3) {
      setError("Enter a valid cardholder name, 12–16 digit card number, MM/YY expiry, and 3–4 digit CVC.");
      return;
    }
    setError(null);
    await onAuthorized({
      customerId: session.customerId,
      setupIntentId: session.setupIntentId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2.5 text-xs text-indigo-300">
        <span className="flex items-center gap-2 font-medium">
          <CreditCard className="w-4 h-4" />
          Stripe Sandbox Checkout (${0}.00 charged for {session.trialDays} days)
        </span>
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Name on card"
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
          Card Number
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={19}
          value={cardNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
            setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 "));
          }}
          placeholder="4242 4242 4242 4242"
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
            Expiry (MM/YY)
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={expiry}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
              setExpiry(raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw);
            }}
            placeholder="12/28"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
            CVC
          </label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="424"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-xs text-rose-500">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isProvisioning}
        className="w-full justify-center text-sm font-semibold"
      >
        {isProvisioning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Provisioning Multi-Tenant Workspace...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Authorize Card & Start {session.trialDays}-Day Free Trial
          </>
        )}
      </Button>
    </form>
  );
}

export function StripeCardCapture(props: StripeCardCaptureProps) {
  const stripePromise = useMemo(
    () =>
      props.session.mode === "stripe" && props.session.publishableKey
        ? loadStripe(props.session.publishableKey)
        : null,
    [props.session.mode, props.session.publishableKey]
  );

  if (props.session.mode === "stripe" && stripePromise && props.session.clientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: props.session.clientSecret }}
      >
        <LiveStripeCardForm {...props} />
      </Elements>
    );
  }

  return <SandboxCardForm {...props} />;
}
