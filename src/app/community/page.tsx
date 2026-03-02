"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PrayerRequest } from "@/types";
import { PrayerCard } from "@/components/features/community/PrayerCard";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: "prayer-1",
    content:
      "Praying for wisdom and courage to follow Jesus faithfully in a polarized workplace.",
    authorName: "Daniel K.",
    isAnonymized: false,
    supportCount: 18,
    tags: ["Wisdom", "Vocation"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prayer-2",
    content:
      "Asking the Lord to comfort a close friend walking through grief and uncertainty this year.",
    authorName: "Anonymous",
    isAnonymized: true,
    supportCount: 32,
    tags: ["Comfort", "Grief"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prayer-3",
    content:
      "Seeking clarity about how to serve my local church and neighborhood with the gifts God has given.",
    authorName: "Maria",
    isAnonymized: false,
    supportCount: 9,
    tags: ["Calling", "Church"],
    createdAt: new Date().toISOString(),
  },
];

export default function CommunityPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(INITIAL_PRAYERS);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedRequest = request.trim();
    const trimmedName = name.trim();

    if (!trimmedRequest) return;

    const next: PrayerRequest = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      content: trimmedRequest,
      authorName: isAnonymous ? "Anonymous" : trimmedName || "Anonymous",
      isAnonymized: isAnonymous || !trimmedName,
      supportCount: 0,
      tags: [],
      createdAt: new Date().toISOString(),
    };

    setPrayers((prev) => [next, ...prev]);
    setName("");
    setRequest("");
    setIsAnonymous(false);
  }

  return (
    <section
      className="bg-background py-12 text-foreground"
      aria-label="Community Prayer Wall"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-teal dark:text-brand-gold/80">
            Community
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A quiet wall for{" "}
            <span className="text-accent-teal dark:text-brand-gold">
              stories &amp; prayers
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Share what you&apos;re carrying and join others in prayer. Each
            click of{" "}
            <span className="font-medium text-accent-teal dark:text-brand-gold">
              &ldquo;I Prayed for This&rdquo;
            </span>{" "}
            is a small, steady witness that you are not alone.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:items-start">
          <div className="space-y-5">
            <AnimatePresence>
              {prayers.map((prayer) => (
                <PrayerCard key={prayer.id} request={prayer} />
              ))}
            </AnimatePresence>
          </div>

          <aside
            className={cn(
              "relative overflow-hidden rounded-3xl border border-muted-border bg-card/95 p-6 shadow-xl backdrop-blur-xl",
              "dark:border-brand-gold/25 dark:bg-brand-navy/80 dark:shadow-[0_18px_45px_rgba(15,23,42,0.9)]",
            )}
            aria-label="Submit a prayer request"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.2),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.2),transparent_60%),radial-gradient(circle_at_bottom,_rgba(250,204,21,0.12),transparent_55%)]"
            />

            <div className="relative space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-teal dark:text-brand-gold/90">
                  The Prayer Wall
                </p>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Submit a request
                </h2>
                <p className="text-xs text-muted-foreground">
                  Your words are held with care. Share as much or as little
                  detail as you&apos;d like, and choose whether to include your
                  name.
                </p>
              </div>

              <figure className="rounded-2xl border border-muted-border bg-muted p-4 text-xs text-muted-foreground dark:border-brand-gold/20 dark:bg-brand-navy/70 dark:text-brand-paper/85">
                <blockquote className="italic">
                  &ldquo;The prayer of a righteous person is powerful and
                  effective.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-accent-teal dark:text-brand-gold/85">
                  James 5:16
                </figcaption>
              </figure>

              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex w-full items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2.5 text-sm font-medium text-accent-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)] transition-colors hover:bg-accent-teal/20 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-brand-gold/60 dark:bg-brand-gold/10 dark:text-brand-paper dark:shadow-[0_0_0_1px_rgba(250,204,21,0.25)] dark:hover:bg-brand-gold/20 dark:focus-visible:ring-brand-gold"
                  >
                    Submit Request
                  </motion.button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit a prayer request</DialogTitle>
                    <DialogDescription>
                      Share a request or story for the Cross Wave community to
                      pray over. You can remain anonymous if you prefer.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label
                        htmlFor="prayer-name"
                        className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Name (optional)
                      </label>
                      <input
                        id="prayer-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="First name or initials"
                        className="w-full rounded-lg border border-input bg-background/90 px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold dark:focus-visible:ring-offset-background"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="prayer-request"
                        className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Prayer request
                      </label>
                      <textarea
                        id="prayer-request"
                        value={request}
                        onChange={(event) => setRequest(event.target.value)}
                        placeholder="Share a few sentences about what you’re asking God to do."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-input bg-background/90 px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold dark:focus-visible:ring-offset-background"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-xl border border-muted-border bg-muted px-3 py-3 dark:border-brand-gold/20 dark:bg-brand-navy/60">
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          Post as anonymous
                        </p>
                        <p className="text-[0.7rem] text-muted-foreground">
                          Your request will still be visible, but your name
                          will not be shown on the wall.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isAnonymous}
                        onClick={() => setIsAnonymous((prev) => !prev)}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full border border-muted-border bg-background transition-colors",
                          isAnonymous
                            ? "border-accent-teal bg-accent-teal/90 dark:border-brand-gold dark:bg-brand-gold/90"
                            : "",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 rounded-full bg-brand-paper shadow-sm transition-transform",
                            isAnonymous ? "translate-x-5" : "translate-x-1",
                          )}
                        />
                      </button>
                    </div>

                    <DialogFooter className="pt-2">
                      <DialogClose asChild>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2.5 text-sm font-medium text-accent-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)] transition-colors hover:bg-accent-teal/20 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:shadow-[0_18px_45px_rgba(250,204,21,0.35)] dark:hover:bg-brand-gold dark:focus-visible:ring-brand-gold"
                        >
                          Send to the wall
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

