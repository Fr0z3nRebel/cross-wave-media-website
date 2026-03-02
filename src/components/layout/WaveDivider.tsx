/**
 * WaveDivider — decorative SVG representing "living water" and "cross-currents".
 * Marked as decorative for screen readers per PRD A11y requirements.
 */
export function WaveDivider() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-full text-muted-border"
      preserveAspectRatio="none"
    >
      <path
        d="M0 40 Q150 0 300 40 T600 40 T900 40 T1200 40 L1200 80 L0 80 Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M0 50 Q200 10 400 50 T800 50 T1200 50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
