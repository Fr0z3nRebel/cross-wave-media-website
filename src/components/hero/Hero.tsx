import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";
import { ScriptureToWorldMarquee } from "./ScriptureToWorldMarquee";
import { WaveDivider } from "@/components/ui/WaveDivider";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-background"
      aria-label="Hero"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-0 grid-cols-1 items-center gap-6 py-12 lg:grid-cols-2 lg:gap-8">
          <HeroContent />
          <div className="px-4 lg:px-8">
            <HeroImage src="/prophecy-news-cross-at-sunrise.webp" />
          </div>
        </div>
        <div className="mt-8 mb-4">
          <ScriptureToWorldMarquee />
        </div>
      </div>
      <WaveDivider fill="background" placement="bottom" />
    </section>
  );
}
