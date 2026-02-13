import type { League } from "@/lib/types";

export interface ThemeAssetsConfig {
  hero: {
    stadiumBackground: string;
    paperGrain: string;
    halftone: string;
  };
  textures: {
    paperGrain: string;
    halftone: string;
  };
  leagueIcons: Record<League, string>;
}

// TODO: Drop your custom images into /public/assets and update these paths.
export const THEME_ASSETS: ThemeAssetsConfig = {
  hero: {
    stadiumBackground: "/assets/hero/stadium-interior.webp",
    paperGrain: "/assets/textures/paper-grain.webp",
    halftone: "/assets/textures/halftone.webp",
  },
  textures: {
    paperGrain: "/assets/textures/paper-grain.webp",
    halftone: "/assets/textures/halftone.webp",
  },
  leagueIcons: {
    PL: "/assets/icons/pl.webp",
    CH: "/assets/icons/ch.webp",
    L1: "/assets/icons/l1.webp",
    L2: "/assets/icons/l2.webp",
  },
};
