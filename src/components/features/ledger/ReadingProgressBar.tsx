"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReadingProgressBarProps {
  className?: string;
}

export function ReadingProgressBar({ className }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;

      if (max <= 0) {
        setProgress(0);
        return;
      }

      const value = (scrollTop / max) * 100;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-accent-teal"
        style={{ scaleX: progress / 100 }}
        transition={{ type: "spring", stiffness: 160, damping: 25, mass: 0.4 }}
      />
    </div>
  );
}

