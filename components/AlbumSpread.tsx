"use client";

import type { Stadium, League } from "@/lib/types";
import { SLOTS_PER_PAGE, LEAGUE_META } from "@/lib/types";
import Page from "./Page";
import StickerSlot from "./StickerSlot";

interface AlbumSpreadProps {
  stadiums: Stadium[];
  startIndex: number;
  league: League;
  spreadNumber: number;
  visitedCount: number;
  totalCount: number;
  isVisited: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export default function AlbumSpread({
  stadiums,
  startIndex,
  league,
  spreadNumber,
  visitedCount,
  totalCount,
  isVisited,
  onToggle,
}: AlbumSpreadProps) {
  const meta = LEAGUE_META[league];
  const leftPage = stadiums.slice(0, SLOTS_PER_PAGE);
  const rightPage = stadiums.slice(SLOTS_PER_PAGE);

  const renderSlots = (items: Stadium[], offset: number) => (
    <div className="grid grid-cols-2 grid-rows-2 gap-x-2.5 gap-y-2 sm:gap-x-3 sm:gap-y-2.5 h-full">
      {items.map((stadium, i) => (
        <StickerSlot
          key={stadium.id}
          stadium={stadium}
          slotNumber={startIndex + offset + i + 1}
          visited={isVisited(stadium.id)}
          onToggle={() => onToggle(stadium.id)}
        />
      ))}
      {/* Decorative "special" slots for partial pages */}
      {Array.from({ length: SLOTS_PER_PAGE - items.length }).map((_, i) => (
        <div key={`empty-${i}`} className="flex flex-col min-h-0">
          <div
            className="slot-shell slot-shell-empty-guide relative flex-1 min-h-0 rounded-md flex items-center justify-center"
            style={{
              border: "1px dashed rgba(255,255,255,0.22)",
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <span
              className="text-xl"
              style={{ color: "rgba(218,165,32,0.2)" }}
            >
              ★
            </span>
          </div>
          <div className="sticker-info-box mt-1.5" style={{ opacity: 0.3 }}>
            <p
              className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-center"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Special Sticker
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const leftPageNum = spreadNumber * 2 + 1;
  const rightPageNum = spreadNumber * 2 + 2;

  return (
    <div className="flex flex-col md:flex-row gap-0 w-full h-full">
      {/* Left page */}
      <div className="flex-1 min-w-0 md:min-h-0">
        <Page
          side="left"
          pageColor={meta.pageBg}
          pageColorLight={meta.pageBgLight}
          pageNumber={leftPageNum}
          leagueName={meta.name}
          spreadNumber={spreadNumber + 1}
          visitedCount={visitedCount}
          totalCount={totalCount}
        >
          {renderSlots(leftPage, 0)}
        </Page>
      </div>

      {/* Spine / gutter */}
      <div className="hidden md:block w-3 album-spine flex-shrink-0" />

      {/* Mobile gutter */}
      <div
        className="md:hidden h-2.5 mx-3 rounded"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, #1A1714 50%, rgba(0,0,0,0.6) 100%)",
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.5)",
        }}
      />

      {/* Right page */}
      <div className="flex-1 min-w-0 md:min-h-0">
        <Page
          side="right"
          pageColor={meta.pageBg}
          pageColorLight={meta.pageBgLight}
          pageNumber={rightPageNum}
          leagueName={meta.name}
          spreadNumber={spreadNumber + 1}
          visitedCount={visitedCount}
          totalCount={totalCount}
        >
          {renderSlots(rightPage, SLOTS_PER_PAGE)}
        </Page>
      </div>
    </div>
  );
}
