"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useAlbumProgress } from "@/hooks/useAlbumProgress";
import { stadiumsByLeague } from "@/lib/stadiums";
import {
  LEAGUE_META,
  LEAGUE_ORDER,
  SLOTS_PER_SPREAD,
  type League,
} from "@/lib/types";
import AlbumSpread from "@/components/AlbumSpread";
import ProgressBar from "@/components/ProgressBar";
import Plaque from "@/components/ui/Plaque";
import TabStrip from "@/components/ui/TabStrip";

export default function AlbumPage() {
  const params = useParams();
  const leagueParam = (params.league as string)?.toUpperCase() as League;

  const isValidLeague = LEAGUE_ORDER.includes(leagueParam);
  const league = isValidLeague ? leagueParam : "PL";
  const meta = LEAGUE_META[league];

  const { isVisited, toggleVisited, visitedCountByLeague } = useAlbumProgress();

  const stadiums = useMemo(() => stadiumsByLeague(league), [league]);
  const totalSpreads = Math.ceil(stadiums.length / SLOTS_PER_SPREAD);

  const [spreadByLeague, setSpreadByLeague] = useState<
    Partial<Record<League, number>>
  >({});
  const [pageTurnDirection, setPageTurnDirection] = useState<
    "left" | "right" | null
  >(null);
  const currentSpread = spreadByLeague[league] ?? 0;

  const setCurrentSpread = useCallback(
    (next: number | ((prev: number) => number), direction?: "left" | "right") => {
      if (direction != null) setPageTurnDirection(direction);
      setSpreadByLeague((prev) => {
        const current = prev[league] ?? 0;
        const resolved = typeof next === "function" ? next(current) : next;
        return {
          ...prev,
          [league]: resolved,
        };
      });
    },
    [league]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSpread((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCurrentSpread, totalSpreads]);

  const spreadStadiums = useMemo(() => {
    const start = currentSpread * SLOTS_PER_SPREAD;
    return stadiums.slice(start, start + SLOTS_PER_SPREAD);
  }, [stadiums, currentSpread]);

  const handleToggle = useCallback(
    (id: string) => toggleVisited(id),
    [toggleVisited]
  );

  const visited = visitedCountByLeague(league);

  if (!isValidLeague) {
    return (
      <div className="text-center py-20">
        <h1
          className="text-2xl"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            color: "var(--gold)",
          }}
        >
          League not found
        </h1>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-bold underline"
          style={{ color: "var(--gold)" }}
        >
          Go home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-3 lg:px-4 h-[calc(100dvh-52px)] flex flex-col gap-2 py-2">
      <div
        className="halftone papergrain relative rounded-md overflow-hidden flex-shrink-0 keyline"
        style={{
          background: `linear-gradient(135deg, ${meta.colorLight} 0%, ${meta.color} 50%, ${meta.colorDark} 100%)`,
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: `0 3px 10px rgba(0,0,0,0.35)`,
        }}
      >
        <div className="relative z-10 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
          <div>
            <h1
              className="text-lg sm:text-xl leading-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-display), Impact, sans-serif",
                textTransform: "uppercase",
                color: "#FFF",
                textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
                letterSpacing: "0.03em",
              }}
            >
              {meta.name}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 mt-1">
              Official Sticker Collection - 2025/26
            </p>
          </div>
          <div className="w-44 sm:w-56">
            <ProgressBar current={visited} total={meta.total} showCount={false} />
            <div className="flex justify-end mt-1.5">
              <Plaque foil className="text-[9px] px-2.5 py-1">
                {visited}/{meta.total}
              </Plaque>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1.5 flex-shrink-0">
        <TabStrip
          activeId={league}
          tabs={LEAGUE_ORDER.map((l) => ({
            id: l,
            label: LEAGUE_META[l].name,
            href: `/album/${l}`,
            background: `linear-gradient(180deg, ${LEAGUE_META[l].colorLight} 0%, ${LEAGUE_META[l].color} 100%)`,
            borderColor: "rgba(255,255,255,0.35)",
            textColor: "#fff5df",
            shadowColor:
              l === league ? "rgba(0, 0, 0, 0.42)" : "rgba(0, 0, 0, 0.28)",
          }))}
        />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setCurrentSpread((p) => Math.max(0, p - 1), "left")
            }
            disabled={currentSpread <= 0}
            className="spread-nav-btn"
            aria-label="Previous spread"
          >
            ◀
          </button>
          <select
            value={currentSpread}
            onChange={(e) => {
              const next = Number(e.target.value);
              setCurrentSpread(
                next,
                next > currentSpread ? "right" : next < currentSpread ? "left" : undefined
              );
            }}
            className="spread-nav-select"
            aria-label="Jump to spread"
          >
            {Array.from({ length: totalSpreads }, (_, i) => (
              <option key={i} value={i}>
                Spread {i + 1} / {totalSpreads}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              setCurrentSpread(
                (p) => Math.min(totalSpreads - 1, p + 1),
                "right"
              )
            }
            disabled={currentSpread >= totalSpreads - 1}
            className="spread-nav-btn"
            aria-label="Next spread"
          >
            ▶
          </button>
        </div>
      </div>

      {/* ===== ALBUM SPREAD – fills remaining viewport height ===== */}
      <div className="flex-1 min-h-0 album-spread-viewport" style={{ perspective: "1400px" }}>
        <div
          key={`${league}-${currentSpread}`}
          className={`w-full h-full min-h-0 ${pageTurnDirection === "right" ? "animate-page-turn-right" : pageTurnDirection === "left" ? "animate-page-turn-left" : "animate-page-flip"}`}
        >
            <AlbumSpread
            stadiums={spreadStadiums}
            startIndex={currentSpread * SLOTS_PER_SPREAD}
            league={league}
            spreadNumber={currentSpread}
            isVisited={isVisited}
            onToggle={handleToggle}
            visitedCount={visited}
            totalCount={meta.total}
          />
        </div>
      </div>
    </div>
  );
}
