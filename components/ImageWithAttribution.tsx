"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
  sizes?: string;
}

export default function ImageWithAttribution({
  src,
  alt,
  credit,
  variant = "detail",
  showAttributionLine = true,
  imageClassName,
  wrapperClassName,
  sizes = "(max-width: 640px) 70vw, 25vw",
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
    <div className={wrapperClassName ?? "relative"}>
      {!imgError && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName ?? "object-cover"}
          loading="eager"
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
