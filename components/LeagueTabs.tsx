"use client";

import Link from "next/link";
import { LEAGUE_META, LEAGUE_ORDER, type League } from "@/lib/types";
import { THEME_ASSETS } from "@/lib/themeAssets";
import KeylineFrame from "@/components/ui/KeylineFrame";
import PrintedMeter from "@/components/ui/PrintedMeter";

interface LeagueTabsProps {
  visitedByLeague: (league: League) => number;
}

export default function LeagueTabs({ visitedByLeague }: LeagueTabsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 flex-1">
      {LEAGUE_ORDER.map((league) => {
        const meta = LEAGUE_META[league];
        const visited = visitedByLeague(league);
        return (
          <Link
            key={league}
            href={`/album/${league}`}
            className="group block transition-transform duration-200 hover:-translate-y-0.5 flex-1"
          >
            <KeylineFrame
              variant="league"
              padding="md"
              rounded="md"
              cornerTicks
              className="recessed h-full transition-[filter,box-shadow] duration-200 group-hover:brightness-[1.03]"
            >
              <div
                className="rounded-md p-2.5 sm:p-3 h-full flex flex-col justify-center"
                style={{
                  background: `linear-gradient(155deg, ${meta.colorDark} 0%, ${meta.color} 54%, ${meta.colorLight} 100%)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-6 h-6 rounded-full border border-white/40 keyline shrink-0"
                      style={{
                        background:
                          `url(${THEME_ASSETS.leagueIcons[league]}) center / 65% no-repeat, ` +
                          "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(0,0,0,0.22))",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="text-[0.92rem] sm:text-[1rem] font-extrabold tracking-tight uppercase leading-tight"
                      style={{
                        fontFamily: "var(--font-display), Impact, sans-serif",
                        color: "#f9f3e8",
                        textShadow: "1px 1px 0 rgba(0,0,0,0.35)",
                      }}
                    >
                      {meta.name}
                    </div>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.13em] text-white/70">
                    {visited}/{meta.total} collected
                  </p>
                </div>
                <PrintedMeter current={visited} total={meta.total} />
              </div>
            </KeylineFrame>
          </Link>
        );
      })}
    </div>
  );
}
