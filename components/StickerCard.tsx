"use client";

import type { Stadium } from "@/lib/types";
import ImageWithAttribution from "@/components/ImageWithAttribution";

interface StickerCardProps {
  stadium: Stadium;
  visited?: boolean;
  justPlaced?: boolean;
}

export default function StickerCard({
  stadium,
  visited = true,
  justPlaced,
}: StickerCardProps) {
  const imageSrc = stadium.image?.src ?? stadium.stickerImage;
  const imageAlt = stadium.image?.alt ?? stadium.stadium;
  const imageCredit = stadium.image?.credit;

  return (
    <div
      className={`sticker-frame sticker-card ${visited ? "sticker-card-collected" : "sticker-card-uncollected"} relative w-full h-full flex flex-col
                  ${justPlaced ? "animate-sticker-settle" : ""}`}
    >
      {/* Green halftone gradient interior */}
      <div className="sticker-interior absolute inset-[2px] rounded-[2px]" />

      {/* Image area */}
      <div className="sticker-photo relative z-[1] flex-1 min-h-0 m-[5px] rounded-sm overflow-hidden border-2 border-white/25">
        {/* Placeholder always behind (club initial + silhouette) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2">
          <svg
            viewBox="0 0 160 50"
            className="w-2/3 max-w-[70px] opacity-[0.10]"
            fill="#FFF"
            aria-hidden="true"
          >
            <rect x="5" y="15" width="15" height="30" rx="2" />
            <rect x="140" y="15" width="15" height="30" rx="2" />
            <rect x="12" y="18" width="136" height="26" rx="3" opacity="0.7" />
            <rect x="25" y="8" width="110" height="12" rx="3" opacity="0.5" />
            <ellipse cx="80" cy="40" rx="30" ry="6" opacity="0.3" />
          </svg>
          <span
            className="text-white/25 font-extrabold leading-tight select-none text-center"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: "clamp(0.7rem, 2vw, 1.1rem)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {stadium.club}
          </span>
        </div>

        {/* Actual stadium image (overlays placeholder if it loads) */}
        <ImageWithAttribution
          src={imageSrc}
          alt={imageAlt}
          credit={imageCredit}
          variant="thumb"
          showAttributionLine={false}
          wrapperClassName="absolute inset-0"
          imageClassName="object-cover"
        />

        {/* Photo vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {!visited && (
          <div className="sticker-watermark" aria-hidden="true">
            <span>92</span>
          </div>
        )}
      </div>

      {/* Printed nameplate bar */}
      <div
        className="sticker-caption relative z-[1] mx-[5px] mb-[5px] px-2 py-[4px] sm:py-[5px] rounded-sm"
      >
        <p
          className="sticker-caption-title text-[9px] sm:text-[11px] font-extrabold leading-tight truncate uppercase tracking-wide"
        >
          {stadium.stadium}
        </p>
        <div className="sticker-caption-meta">
          <span className="truncate">{stadium.club}</span>
          <span className="sticker-caption-badge">92</span>
        </div>
      </div>
    </div>
  );
}
