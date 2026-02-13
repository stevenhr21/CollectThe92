"use client";

import Link from "next/link";
import { useAlbumProgress } from "@/hooks/useAlbumProgress";
import LeagueTabs from "@/components/LeagueTabs";
import ProgressBar from "@/components/ProgressBar";
import KeylineFrame from "@/components/ui/KeylineFrame";
import Plaque from "@/components/ui/Plaque";
import PremiumButton from "@/components/ui/PremiumButton";
import { THEME_ASSETS } from "@/lib/themeAssets";

export default function HomePage() {
  const { totalVisited, visitedCountByLeague } = useAlbumProgress();
  const total = totalVisited();

  return (
    <div className="relative overflow-hidden bg-[var(--bg-deep-charcoal)]">
      <div
        className="relative papergrain halftone vignette"
        style={{
          minHeight: "calc(100dvh - 52px)",
          background:
            "linear-gradient(145deg, var(--album-green-500) 0%, var(--album-green-700) 55%, #10261d 100%)",
          ["--paper-grain-image" as string]: `url(${THEME_ASSETS.hero.paperGrain})`,
          ["--halftone-image" as string]: `url(${THEME_ASSETS.hero.halftone})`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `url(${THEME_ASSETS.hero.stadiumBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1.2px)",
          }}
        />
        <div
          className="absolute pointer-events-none z-[3]"
          style={{
            inset: "14px",
            border: "1px dashed rgba(255,255,255,0.18)",
            borderRadius: "10px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-10 min-h-[calc(100dvh-52px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-7 items-stretch">
            <KeylineFrame rounded="lg" padding="lg" cornerTicks className="recessed">
              <div className="h-full flex flex-col justify-between gap-5">
                <div>
                  <p className="merlin-subtitle text-white/75 mb-2">The Official</p>
                  <h1 className="merlin-title leading-[0.92] text-[2.5rem] sm:text-[3.7rem] lg:text-[4.2rem] uppercase">
                    <span
                      className="block"
                      style={{
                        color: "var(--gold-light)",
                        textShadow: "2px 2px 0 var(--gold-dark), 3px 3px 0 rgba(0,0,0,0.34)",
                      }}
                    >
                      Collect
                    </span>
                    <span
                      className="block"
                      style={{
                        color: "var(--print-offwhite)",
                        textShadow: "2px 2px 0 rgba(0,0,0,0.38)",
                      }}
                    >
                      The
                    </span>
                    <span
                      className="block"
                      style={{
                        color: "var(--gold-light)",
                        textShadow: "2px 2px 0 var(--gold-dark), 3px 3px 0 rgba(0,0,0,0.34)",
                      }}
                    >
                      92
                    </span>
                  </h1>
                </div>

                <Plaque foil className="w-fit">
                  Stadium Sticker Collection
                </Plaque>

                <div className="rounded-lg border border-white/25 bg-black/25 p-3 sm:p-4 keyline">
                  <div className="flex items-end justify-between gap-3 mb-2">
                    <Plaque className="bg-black/25 text-white/80 border-white/30">
                      {total}/92 Grounds Collected
                    </Plaque>
                    <span className="text-[11px] text-white/65 uppercase tracking-[0.14em]">
                      2025/26 Edition
                    </span>
                  </div>
                  <ProgressBar current={total} total={92} showCount={false} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <PremiumButton href="/album/PL">Open Album</PremiumButton>
                  <Link href="/about" className="grey-button shine-sweep">
                    About
                  </Link>
                </div>
              </div>
            </KeylineFrame>

            <KeylineFrame rounded="lg" padding="lg" variant="league" cornerTicks className="recessed h-full">
              <div className="h-full flex flex-col">
                <div className="mb-3 sm:mb-4">
                  <h2 className="merlin-title text-xl sm:text-2xl text-[var(--print-offwhite)]">
                    Choose Your League
                  </h2>
                </div>
                <LeagueTabs visitedByLeague={visitedCountByLeague} />
              </div>
            </KeylineFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
