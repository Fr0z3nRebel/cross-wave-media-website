"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CONFIRM_EMAIL_MESSAGE =
  "Please confirm your email first. Check your inbox (and spam folder) for the confirmation link.";

function isUnconfirmedEmailError(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes("email not confirmed") ||
    lower.includes("email_not_confirmed") ||
    (lower.includes("user") && lower.includes("already") && lower.includes("registered"))
  );
}

interface SignUpFormProps {
  onSuccess?: () => void;
  onShowSuccess?: () => void;
}

export function SignUpForm({ onSuccess, onShowSuccess }: SignUpFormProps) {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastResendAt, setLastResendAt] = useState<number | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const resendCooldownMs = 60_000;
  const [tick, setTick] = useState(0);
  const canResend =
    lastResendAt === null ||
    Date.now() - lastResendAt >= resendCooldownMs;
  const resendSecondsLeft =
    lastResendAt !== null && !canResend
      ? Math.ceil((resendCooldownMs - (Date.now() - lastResendAt)) / 1000)
      : 0;

  useEffect(() => {
    if (lastResendAt === null || canResend) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [lastResendAt, canResend]);

  async function handleResend() {
    if (!canResend || resendLoading || !email) return;
    setResendLoading(true);
    setResendSuccess(false);
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });
    setResendLoading(false);
    if (resendError) {
      setError(resendError.message);
      return;
    }
    setLastResendAt(Date.now());
    setResendSuccess(true);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    setSubmitting(false);

    if (signUpError) {
      setError(
        isUnconfirmedEmailError(signUpError.message)
          ? CONFIRM_EMAIL_MESSAGE
          : signUpError.message,
      );
      return;
    }

    setMessage(
      "Check your email to confirm your address and finish creating your account.",
    );
    setLastResendAt(Date.now());
    onShowSuccess?.();
  }

  if (message) {
    return (
      <div className="space-y-4">
        <p className="font-heading text-lg font-semibold text-foreground">
          Thank you for joining!
        </p>
        <p className="text-sm text-foreground">
          We&apos;ve sent a confirmation link to your email. Click it to
          activate your account, then sign in.
        </p>
        <p className="text-xs text-muted-foreground">
          If you don&apos;t see it, check your spam folder.
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          className={cn(
            "w-full rounded-full border border-muted-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent-teal/40 hover:text-accent-teal disabled:cursor-not-allowed disabled:opacity-60",
            "dark:hover:border-brand-gold/40 dark:hover:text-brand-gold",
          )}
        >
          {resendLoading
            ? "Sending…"
            : canResend
              ? "Resend confirmation email"
              : `Resend in ${resendSecondsLeft}s`}
        </button>
        {resendSuccess && (
          <p className="text-xs text-accent-teal dark:text-brand-gold">
            Confirmation email sent again.
          </p>
        )}

        {onSuccess && (
          <button
            type="button"
            onClick={onSuccess}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2.5 text-sm font-medium text-accent-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)] transition-colors hover:bg-accent-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
              "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:focus-visible:ring-brand-gold",
            )}
          >
            Got it
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="signup-email"
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="signup-password"
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Password
        </label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
        />
      </div>

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        <p className="text-[0.7rem] text-muted-foreground">
          We&apos;ll send a brief confirmation email to{" "}
          <span className="font-medium text-accent-teal dark:text-brand-gold">
            complete your account
          </span>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2.5 text-sm font-medium text-accent-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)] transition-colors hover:bg-accent-teal/20 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
          "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:shadow-[0_18px_45px_rgba(250,204,21,0.35)] dark:hover:bg-brand-gold dark:focus-visible:ring-brand-gold",
        )}
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

