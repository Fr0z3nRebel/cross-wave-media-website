"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        },
      ) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
}

const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip Turnstile on localhost — it often fails or isn't configured for local dev
    if (isLocalDev) {
      onToken("");
      return;
    }

    if (!containerRef.current) return;

    function render() {
      if (!window.turnstile || !containerRef.current) return;

      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!siteKey) {
        onToken("");
        return;
      }

      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => {
          onToken(token);
        },
      });
    }

    if (window.turnstile) {
      render();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      render();
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [onToken]);

  return (
    <div
      ref={containerRef}
      className="mt-1"
    />
  );
}

