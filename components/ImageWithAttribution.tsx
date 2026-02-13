"use client";

import { useMemo, useState } from "react";
import { formatImageCredit, hasImageCreditDetails } from "@/lib/imageCredits";
import type { ImageCredit } from "@/lib/types";

interface ImageWithAttributionProps {
  src: string;
  alt: string;
  credit?: ImageCredit;
  variant?: "thumb" | "detail";
  showAttributionLine?: boolean;
  imageClassName?: string;
  wrapperClassName?: string;
}

export default function ImageWithAttribution({
  src,
  alt,
  credit,
  variant = "detail",
  showAttributionLine = true,
  imageClassName,
  wrapperClassName,
}: ImageWithAttributionProps) {
  const [imgError, setImgError] = useState(false);
  const resolvedCredit = credit ?? null;
  const hasDetails = resolvedCredit ? hasImageCreditDetails(resolvedCredit) : false;

  const showCreditLine = useMemo(() => {
    if (!resolvedCredit) return false;
    if (hasDetails) return true;
    return process.env.NODE_ENV === "development";
  }, [resolvedCredit, hasDetails]);

  const isDevPlaceholder =
    Boolean(resolvedCredit) &&
    !hasDetails &&
    process.env.NODE_ENV === "development";

  return (
    <div className={wrapperClassName}>
      {!imgError && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className={imageClassName ?? "w-full h-full object-cover"}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {showAttributionLine && showCreditLine && (
        <p
          className={[
            "pointer-events-auto text-white/70 break-words",
            variant === "thumb"
              ? "mt-1 text-[10px] leading-snug"
              : "mt-2 text-xs leading-relaxed",
          ].join(" ")}
        >
          <span className="font-semibold text-white/80">Image credit: </span>
          {isDevPlaceholder ? (
            <span className="italic">Image credit (add details)</span>
          ) : (
            resolvedCredit && formatImageCredit(resolvedCredit)
          )}
        </p>
      )}
    </div>
  );
}
