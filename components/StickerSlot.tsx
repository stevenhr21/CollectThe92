"use client";

import { useState, useCallback } from "react";
import type { Stadium } from "@/lib/types";
import { formatImageCredit, hasImageCreditDetails } from "@/lib/imageCredits";
import StickerCard from "./StickerCard";
import StadiumModal from "./StadiumModal";
import FactFile from "@/components/ui/FactFile";

interface StickerSlotProps {
  stadium: Stadium;
  slotNumber: number;
  visited: boolean;
  onToggle: () => void;
}

export default function StickerSlot({
  stadium,
  slotNumber,
  visited,
  onToggle,
}: StickerSlotProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [justPlaced, setJustPlaced] = useState(false);
  const [creditPinned, setCreditPinned] = useState(false);
  const [creditHovered, setCreditHovered] = useState(false);

  const credit = stadium.image?.credit;
  const hasCreditDetails = credit ? hasImageCreditDetails(credit) : false;
  const showCreditPlaceholder =
    Boolean(credit) &&
    !hasCreditDetails &&
    process.env.NODE_ENV === "development";
  const showCreditControl = hasCreditDetails || showCreditPlaceholder;
  const showCreditPanel = showCreditControl && (creditPinned || creditHovered);

  const handleToggle = useCallback(() => {
    if (!visited) {
      setJustPlaced(true);
      setTimeout(() => setJustPlaced(false), 450);
    }
    onToggle();
  }, [visited, onToggle]);

  return (
    <>
      <div className="relative w-full h-full min-h-0">
        <button
          onClick={() => setModalOpen(true)}
          className={`flex flex-col w-full h-full min-h-0 text-left transition-all duration-200
                    outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 focus-visible:ring-offset-2
                    group
                    ${visited ? "hover:-translate-y-1 hover:z-10" : ""}`}
          aria-label={`${stadium.stadium} – ${stadium.club}${
            visited ? " (collected)" : " (not collected)"
          }`}
        >
          {/* Sticker frame container – stretches to fill */}
          <div
            className={`slot-shell relative w-full flex-1 min-h-0 ${
              visited ? "" : "slot-shell-empty-guide"
            }`}
          >
            {/* Slot number badge */}
            <span
              className="absolute -top-2 -left-2 z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                        rounded-full text-[9px] sm:text-[10px] font-extrabold shadow-lg slot-number-marker"
            >
              {slotNumber}
            </span>

            {/* Sticker – greyed out when uncollected, full color when collected */}
            <div
              className={`w-full h-full transition-all duration-500
                        ${visited ? "sticker-collected" : "sticker-uncollected"}
                        ${visited ? "group-hover:sticker-glow" : "group-hover:brightness-[0.55]"}`}
            >
              <StickerCard stadium={stadium} justPlaced={justPlaced} />
            </div>

            {/* Collected shine overlay */}
            {visited && <div className="sticker-shine-overlay" />}
          </div>

          <div className="relative mt-1.5 w-full flex-shrink-0">
            <FactFile
              className="w-full pr-7"
              compact
              title={stadium.club}
              items={[
                { label: "City", value: stadium.city },
                { label: "Cap", value: stadium.capacity.toLocaleString() },
                { label: "Opened", value: String(stadium.opened) },
              ]}
            />
          </div>
        </button>

        {showCreditControl && credit && (
          <div
            className="absolute right-2 top-[calc(100%-58px)] z-30"
            onMouseEnter={() => setCreditHovered(true)}
            onMouseLeave={() => setCreditHovered(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCreditPinned((prev) => !prev);
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold
                         border border-[rgba(255,255,255,0.25)] bg-black/50 text-[var(--gold-light)]
                         hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
              aria-label={`View image credit for ${stadium.stadium}`}
              aria-expanded={showCreditPanel}
            >
              ©
            </button>

            {showCreditPanel && (
              <div
                className="absolute right-0 bottom-full mb-1 w-60 sm:w-72 rounded-md border border-white/20 bg-[#171411]/95 p-2.5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/80 break-words">
                  <span className="font-semibold text-white/90">Image credit: </span>
                  {showCreditPlaceholder ? (
                    <span className="italic">Image credit (add details)</span>
                  ) : (
                    formatImageCredit(credit)
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {modalOpen && (
        <StadiumModal
          stadium={stadium}
          isVisited={visited}
          onToggle={handleToggle}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
