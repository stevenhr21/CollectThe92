"use client";

import { useState, useCallback } from "react";
import type { Stadium, FixtureInfo } from "@/lib/types";
import StickerCard from "./StickerCard";
import StadiumModal from "./StadiumModal";
import FactFile from "@/components/ui/FactFile";

interface MobileAlbumViewProps {
  stadiums: Stadium[];
  isVisited: (id: string) => boolean;
  onToggle: (id: string) => void;
  getFixtures: (stadiumId: string) => FixtureInfo[];
  onAddFixture: (stadiumId: string, fixture: FixtureInfo) => void;
  onRemoveFixture: (stadiumId: string, fixtureId: string) => void;
}

export default function MobileAlbumView({
  stadiums,
  isVisited,
  onToggle,
  getFixtures,
  onAddFixture,
  onRemoveFixture,
}: MobileAlbumViewProps) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [justPlaced, setJustPlaced] = useState(false);

  const stadium = stadiums[index];
  if (!stadium) return null;

  const visited = isVisited(stadium.id);
  const total = stadiums.length;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total]);

  const handleToggle = useCallback(() => {
    if (!visited) {
      setJustPlaced(true);
      setTimeout(() => setJustPlaced(false), 450);
    }
    onToggle(stadium.id);
  }, [visited, onToggle, stadium.id]);

  const handleMarkVisited = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 h-full min-h-0">
        {/* Team selector dropdown */}
        <div className="flex items-center justify-between gap-2 flex-shrink-0">
          <button
            onClick={goPrev}
            disabled={index <= 0}
            className="mobile-sticker-nav-btn"
            aria-label="Previous sticker"
          >
            ◀
          </button>

          <select
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            className="mobile-team-select flex-1 min-w-0"
            aria-label="Select team"
          >
            {stadiums.map((s, i) => (
              <option key={s.id} value={i}>
                {s.club} – {s.stadium}
              </option>
            ))}
          </select>

          <button
            onClick={goNext}
            disabled={index >= total - 1}
            className="mobile-sticker-nav-btn"
            aria-label="Next sticker"
          >
            ▶
          </button>
        </div>

        {/* Sticker card area */}
        <button
          onClick={() => setModalOpen(true)}
          className="mobile-sticker-frame relative flex-shrink-0 mx-auto outline-none
                     focus-visible:ring-4 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
          aria-label={`${stadium.stadium} – ${stadium.club}${visited ? " (collected)" : " (not collected)"}`}
        >
          <div
            className={`w-full h-full transition-all duration-500
                        ${visited ? "sticker-collected" : "sticker-uncollected"}`}
          >
            <StickerCard stadium={stadium} justPlaced={justPlaced} />
          </div>

          {visited && <div className="sticker-shine-overlay" />}
        </button>

        {/* Fact file */}
        <div className="flex-shrink-0 px-1">
          <FactFile
            title={stadium.club}
            items={[
              { label: "City", value: stadium.city },
              { label: "Cap", value: stadium.capacity.toLocaleString() },
              { label: "Opened", value: String(stadium.opened) },
            ]}
          />
        </div>

        {/* Collect button */}
        <div className="flex-shrink-0 px-1 pb-1">
          <button
            onClick={visited ? () => setModalOpen(true) : handleMarkVisited}
            className={`mobile-collect-btn w-full ${
              visited ? "mobile-collect-btn-collected" : "mobile-collect-btn-uncollected"
            }`}
          >
            {visited ? "✓ Collected" : "Mark as Visited ✓"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <StadiumModal
          stadium={stadium}
          isVisited={visited}
          onToggle={handleToggle}
          onClose={() => setModalOpen(false)}
          fixtures={getFixtures(stadium.id)}
          onAddFixture={(fixture) => onAddFixture(stadium.id, fixture)}
          onRemoveFixture={(fixtureId) => onRemoveFixture(stadium.id, fixtureId)}
        />
      )}
    </>
  );
}
