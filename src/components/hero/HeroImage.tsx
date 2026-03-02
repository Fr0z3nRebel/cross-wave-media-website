import Image from "next/image";

export interface HeroImageProps {
  src?: string;
  alt?: string;
}

export function HeroImage({ src, alt = "Digital sanctuary — bridging faith and culture" }: HeroImageProps) {
  return (
    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-lg border border-muted-border bg-card/50 p-4 backdrop-blur-sm lg:min-h-[400px] lg:p-6 dark:border-brand-gold/25 dark:bg-brand-navy/40">
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-background/20 backdrop-blur-[2px]"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent-teal/10 via-transparent to-accent-teal/5 dark:from-brand-gold/10 dark:via-transparent dark:to-brand-gold/5"
          aria-hidden
        />
      )}
    </div>
  );
}
