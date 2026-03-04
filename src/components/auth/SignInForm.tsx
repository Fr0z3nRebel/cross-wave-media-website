"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CONFIRM_EMAIL_MESSAGE =
  "Please confirm your email first. Check your inbox (and spam folder) for the confirmation link.";

function isUnconfirmedEmailError(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes("email not confirmed") ||
    lower.includes("email_not_confirmed")
  );
}

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError(
        isUnconfirmedEmailError(signInError.message)
          ? CONFIRM_EMAIL_MESSAGE
          : signInError.message,
      );
      return;
    }

    if (onSuccess) onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="signin-email"
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Email
        </label>
        <Input
          id="signin-email"
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
          htmlFor="signin-password"
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Password
        </label>
        <Input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        <p className="text-[0.7rem] text-muted-foreground">
          By signing in, you agree to hold this space as a{" "}
          <span className="font-medium text-accent-teal dark:text-brand-gold">
            digital sanctuary
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
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

