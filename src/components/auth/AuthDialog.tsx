"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { cn } from "@/lib/utils";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"sign-in" | "sign-up">("sign-in");
  const [signUpSuccessShowing, setSignUpSuccessShowing] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSignUpSuccessShowing(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-muted-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-accent-teal/60 hover:bg-accent-teal/5 hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
            "dark:hover:border-brand-gold/60 dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold",
          )}
        >
          Sign in
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[1.4rem]">
            Welcome to{" "}
            <span className="text-accent-teal dark:text-brand-gold">
              Cross Wave Media
            </span>
          </DialogTitle>
          {!signUpSuccessShowing && (
            <DialogDescription>
              Create a quiet, personalized space for saved resources and prayer
              requests. Sign in or create an account to begin.
            </DialogDescription>
          )}
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(value) =>
            setTab(value as "sign-in" | "sign-up")
          }
          defaultValue="sign-in"
        >
          {!signUpSuccessShowing && (
            <TabsList aria-label="Authentication">
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
              <TabsTrigger value="sign-up">Create account</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="sign-in">
            <SignInForm onSuccess={() => setOpen(false)} />
          </TabsContent>

          <TabsContent value="sign-up">
            <SignUpForm
              onSuccess={() => setOpen(false)}
              onShowSuccess={() => setSignUpSuccessShowing(true)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

