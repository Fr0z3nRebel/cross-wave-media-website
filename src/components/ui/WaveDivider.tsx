"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * WaveDivider — decorative SVG representing "living water" and "cross-currents".
 * Marked as decorative for screen readers per PRD A11y requirements.
 *
 * Organic, non-symmetrical wave with a subtle breathing animation.
 * Absolutely positioned to sit between sections without gaps.
 */
const VIEWBOX = { w: 1200, h: 120 };

// Organic, non-symmetrical wave — varied amplitudes & wavelengths.
// Two path variants for breathing: subtle vertical undulation of control points.
const WAVE_REST =
  "M0,52 C110,18 220,88 360,45 C500,5 600,85 740,38 C860,8 960,78 1100,48 C1160,35 1180,58 1200,55 L1200,120 L0,120 Z";

const WAVE_BREATH =
  "M0,58 C110,12 220,94 360,38 C500,0 600,92 740,32 C860,2 960,88 1100,42 C1160,28 1180,52 1200,48 L1200,120 L0,120 Z";

export interface WaveDividerProps {
  /** Fill color — use "background" for theme-aware, or "brand-paper" / "brand-navy" */
  fill?: "background" | "brand-paper" | "brand-navy" | string;
  /** Additional CSS classes */
  className?: string;
  /** Placement: "bottom" (default) anchors to bottom, "top" anchors to top */
  placement?: "bottom" | "top";
}

export function WaveDivider({
  fill = "brand-paper",
  className,
  placement = "bottom",
}: WaveDividerProps) {
  const fillClass =
    fill === "background"
      ? "fill-background"
      : fill === "brand-paper"
        ? "fill-brand-paper"
        : fill === "brand-navy"
          ? "fill-brand-navy"
          : undefined;

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-0 h-16 w-full overflow-visible",
        placement === "bottom" ? "bottom-0 translate-y-full" : "top-0 -translate-y-full",
        className
      )}
      aria-hidden
    >
      <svg
        aria-hidden="true"
        role="img"
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={WAVE_REST}
          className={fillClass}
          fill={fillClass ? undefined : fill}
          initial={false}
          animate={{
            d: [WAVE_REST, WAVE_BREATH, WAVE_REST],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
}
