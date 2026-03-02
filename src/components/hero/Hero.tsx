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
        <div className="grid min-h-[70vh] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
      <ScriptureToWorldMarquee />
      <WaveDivider fill="background" placement="bottom" />
    </section>
  );
}
