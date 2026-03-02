"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const resolved =
      theme === "system" ? (systemTheme as "light" | "dark" | undefined) : theme;
    const isDark = resolved === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    // Avoid hydration mismatch by rendering nothing until mounted on client
    return null;
  }

  const isDark =
    (theme === "system"
      ? (systemTheme as "light" | "dark" | undefined)
      : theme) === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle color mode"
      className="inline-flex h-9 min-w-[96px] items-center justify-center gap-2 rounded-full border border-muted-border bg-background/80 px-3 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors duration-200 hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/80 focus-visible:ring-offset-background"
    >
      {isDark ? (
        <>
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Vespers</span>
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Lauds</span>
        </>
      )}
    </button>
  );
}


