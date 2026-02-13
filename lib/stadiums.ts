import stadiumsJson from "@/data/stadiums.json";
import imageCredits from "@/data/image-credits";
import type { Stadium, League, ImageCredit } from "./types";

const EMPTY_IMAGE_CREDIT: ImageCredit = {
  title: null,
  authorName: null,
  authorUrl: null,
  sourceName: null,
  sourceUrl: null,
  licenseName: null,
  licenseUrl: null,
  modified: false,
  notes: null,
};

function normalizeStadium(stadium: Stadium): Stadium {
  const entry = imageCredits[stadium.id];

  return {
    ...stadium,
    image: {
      src: stadium.image?.src ?? stadium.stickerImage,
      alt: stadium.image?.alt ?? stadium.stadium,
      credit: entry
        ? {
            title: entry.title ?? null,
            authorName: entry.authorName ?? null,
            authorUrl: entry.authorUrl ?? null,
            sourceName: entry.sourceName ?? null,
            sourceUrl: entry.sourceUrl ?? null,
            licenseName: entry.licenseName ?? null,
            licenseUrl: entry.licenseUrl ?? null,
            modified: entry.modified ?? false,
            notes: entry.notes ?? null,
          }
        : { ...EMPTY_IMAGE_CREDIT },
    },
  };
}

export const allStadiums: Stadium[] = (stadiumsJson as Stadium[])
  .map(normalizeStadium)
  .sort((a, b) => a.club.localeCompare(b.club));

export function stadiumsByLeague(league: League): Stadium[] {
  return allStadiums.filter((s) => s.league === league);
}

export function getStadium(id: string): Stadium | undefined {
  return allStadiums.find((s) => s.id === id);
}

export function stadiumsWithImageCredits(): Stadium[] {
  return allStadiums;
}
