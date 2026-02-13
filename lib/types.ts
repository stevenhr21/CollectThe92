export type League = "PL" | "CH" | "L1" | "L2";

export interface ImageCredit {
  title: string | null;
  authorName: string | null;
  authorUrl: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  licenseName: string | null;
  licenseUrl: string | null;
  modified: boolean;
  notes: string | null;
}

export interface StadiumImage {
  src: string;
  alt?: string;
  credit?: ImageCredit;
}

export interface Stadium {
  id: string;
  club: string;
  stadium: string;
  league: League;
  city: string;
  capacity: number;
  opened: number;
  lat: number;
  lng: number;
  stickerImage: string;
  image?: StadiumImage;
  stickerType?: "custom" | "photo";
  notes?: string;
}

export interface AlbumProgress {
  version: 1;
  visited: Record<string, boolean>;
  updatedAt: string;
}

export const LEAGUE_META: Record<
  League,
  {
    name: string;
    color: string;
    colorLight: string;
    colorDark: string;
    pageBg: string;
    pageBgLight: string;
    total: number;
  }
> = {
  PL: {
    name: "Premier League",
    color: "#5B1F8E",
    colorLight: "#8B4FC6",
    colorDark: "#2E0D4A",
    pageBg: "#4A1275",
    pageBgLight: "#6B2FA0",
    total: 20,
  },
  CH: {
    name: "Championship",
    color: "#1252A0",
    colorLight: "#3B7DD8",
    colorDark: "#0A2F5E",
    pageBg: "#0E4488",
    pageBgLight: "#1A5CB8",
    total: 24,
  },
  L1: {
    name: "League One",
    color: "#CC1133",
    colorLight: "#E84460",
    colorDark: "#7A0A1F",
    pageBg: "#B50E2C",
    pageBgLight: "#D42040",
    total: 24,
  },
  L2: {
    name: "League Two",
    color: "#1A7A3A",
    colorLight: "#2DA85A",
    colorDark: "#0E4A22",
    pageBg: "#15682E",
    pageBgLight: "#1D9040",
    total: 24,
  },
};

export const LEAGUE_ORDER: League[] = ["PL", "CH", "L1", "L2"];

export const SLOTS_PER_SPREAD = 8;
export const SLOTS_PER_PAGE = 4;
