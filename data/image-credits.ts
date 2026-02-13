/**
 * Image credits for stadium photos.
 *
 * Add an entry keyed by the stadium ID (e.g. "arsenal", "man-utd").
 * Only fill in the fields you have — everything else defaults to null / false.
 *
 * Fields:
 *   title        – image title (e.g. "Emirates Stadium, London")
 *   authorName   – photographer / creator name
 *   authorUrl    – link to the author's profile
 *   sourceName   – where the image is hosted (defaults to "Wikimedia Commons" in display)
 *   sourceUrl    – direct link to the image page
 *   licenseName  – short licence name (e.g. "CC BY-SA 4.0")
 *   licenseUrl   – link to the licence text
 *   modified     – true if the image was cropped / edited (default: false)
 *   notes        – any extra info (e.g. "Cropped from original")
 */

export interface ImageCreditEntry {
  title?: string;
  authorName?: string;
  authorUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  licenseName?: string;
  licenseUrl?: string;
  modified?: boolean;
  notes?: string;
}

const imageCredits: Record<string, ImageCreditEntry> = {
  // ─── Premier League ──────────────────────────────────────────
  arsenal: {
    title: "Emirates Stadium, London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Emirates_Stadium_arsenal.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: true,
    notes: "Cropped from original",
  },

  aston_villa: {
    title: "Villa Park, Birmingham",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Birmingham_aston_villa_park_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: true,
    notes: "Cropped from original",
  },

  bournemouth: {
    title: "Vitality Stadium, Bournemouth",
    authorName: "Mr Ignavy",
    authorUrl: "https://www.geograph.org.uk/profile/18677",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:East_Stand_-_Vitality_Stadium_-_geograph.org.uk_-_7604192.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: true,
    notes: "Cropped from original",
  },

  brentford: {
    title: "Gtech Community Stadium, London",
    authorName: "AndyScott",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:AndyScott&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brentford_Community_Stadium_2020.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: true,
    notes: "Cropped from original",
  },

  // ─── Championship ────────────────────────────────────────────

  // ─── League One ──────────────────────────────────────────────

  // ─── League Two ──────────────────────────────────────────────
};

export default imageCredits;
