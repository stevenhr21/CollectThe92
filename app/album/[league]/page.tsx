"use client";

import { useParams, useRouter } from "next/navigation";
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
import MobileAlbumView from "@/components/MobileAlbumView";
import ProgressBar from "@/components/ProgressBar";
import Plaque from "@/components/ui/Plaque";
import PrintedMeter from "@/components/ui/PrintedMeter";
import ShieldMark from "@/components/ui/ShieldMark";
import TabStrip from "@/components/ui/TabStrip";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AlbumPage() {
  const params = useParams();
  const leagueParam = (params.league as string)?.toUpperCase() as League;

  const router = useRouter();
  const isValidLeague = LEAGUE_ORDER.includes(leagueParam);
  const league = isValidLeague ? leagueParam : "PL";
  const meta = LEAGUE_META[league];

  const {
    isVisited,
    toggleVisited,
    getFixtures,
    addFixture,
    removeFixture,
    visitedCountByLeague,
    totalVisited,
  } = useAlbumProgress();
  const isMobile = useIsMobile();

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
  const totalCollected = totalVisited();
  const collectedLeagues = LEAGUE_ORDER.filter(
    (l) => visitedCountByLeague(l) > 0
  ).length;

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
    <div className="album-shell min-h-[calc(100dvh-52px)] px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
      <div className="max-w-[1500px] mx-auto flex flex-col gap-2 sm:gap-3">
      <div
        className="league-banner halftone papergrain relative overflow-hidden flex-shrink-0 keyline"
        style={{
          background: `linear-gradient(135deg, ${meta.colorLight} 0%, ${meta.color} 50%, ${meta.colorDark} 100%)`,
          ["--league-accent" as string]: meta.color,
          ["--league-accent-light" as string]: meta.colorLight,
        }}
      >
        <div className="relative z-10 px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ShieldMark className="league-banner-shield hidden sm:inline-flex" />
            <div className="min-w-0">
            <h1
              className="league-banner-title text-2xl sm:text-4xl lg:text-5xl leading-none truncate"
              style={{
                fontFamily: "var(--font-display), Impact, sans-serif",
                textTransform: "uppercase",
              }}
            >
              {meta.name}
            </h1>
            <p className="league-banner-subtitle text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-1">
              Official Sticker Collection - 2025/26
            </p>
            </div>
          </div>
          <div className="league-banner-progress w-36 sm:w-64">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <Plaque className="text-[9px] px-2.5 py-1">
                {visited}/{meta.total} collected
              </Plaque>
              <ShieldMark className="league-banner-92" />
            </div>
            <ProgressBar current={visited} total={meta.total} showCount={false} />
          </div>
        </div>
      </div>

      <div className="album-toolbar flex flex-wrap items-center justify-between gap-1.5 flex-shrink-0">
        {isMobile ? (
          <select
            value={league}
            onChange={(e) => {
              router.push(`/album/${e.target.value}`);
            }}
            className="mobile-league-select"
            aria-label="Select league"
            style={{
              background: `linear-gradient(180deg, ${meta.colorLight} 0%, ${meta.color} 100%)`,
            }}
          >
            {LEAGUE_ORDER.map((l) => (
              <option key={l} value={l}>
                {LEAGUE_META[l].name}
              </option>
            ))}
          </select>
        ) : (
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
        )}

        {!isMobile && (
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
        )}
      </div>

      {isMobile ? (
        <div className="mobile-album-page flex-1 min-h-0 overflow-y-auto">
          <MobileAlbumView
            stadiums={stadiums}
            isVisited={isVisited}
            onToggle={handleToggle}
            getFixtures={getFixtures}
            onAddFixture={addFixture}
            onRemoveFixture={removeFixture}
          />
        </div>
      ) : (
        <div className="album-spread-wrap flex-1 min-h-[680px] album-spread-viewport" style={{ perspective: "1400px" }}>
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
              getFixtures={getFixtures}
              onAddFixture={addFixture}
              onRemoveFixture={removeFixture}
              visitedCount={visited}
              totalCount={meta.total}
            />
          </div>
        </div>
      )}

      <div className="collector-bottom-row">
        <div className="swap-note" aria-label="Sticker swap callout">
          <div className="swap-pack">
            <ShieldMark />
            <span>{meta.name.split(" ")[0]}</span>
          </div>
          <div>
            <p className="swap-note-title">Need stickers?</p>
            <p className="swap-note-copy">
              Visit the swap page to trade with other collectors
            </p>
          </div>
        </div>

        <section className="progress-plaque" aria-label="Your progress">
          <p className="progress-plaque-title">Your Progress</p>
          <div className="progress-plaque-rule" />
          <div className="progress-plaque-grid">
            <div className="progress-plaque-stat">
              <span className="progress-plaque-icon">ALB</span>
              <span className="progress-plaque-label">Collected</span>
              <strong>{visited}/{meta.total}</strong>
            </div>
            <div className="progress-plaque-stat">
              <span className="progress-plaque-icon">CUP</span>
              <span className="progress-plaque-label">Leagues</span>
              <strong>{collectedLeagues}/4</strong>
            </div>
            <div className="progress-plaque-stat">
              <span className="progress-plaque-icon">STD</span>
              <span className="progress-plaque-label">Stadiums</span>
              <strong>{totalCollected}/92</strong>
            </div>
          </div>
          <PrintedMeter current={totalCollected} total={92} className="mt-3" />
        </section>
      </div>
      </div>
    </div>
  );
}
