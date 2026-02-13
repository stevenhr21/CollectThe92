# CollectThe92

A digital Panini-style sticker album for all 92 English league football grounds.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Sticker Images

Place stadium images in `public/stickers/`. Each image file should match the `stickerImage` path defined in `data/stadiums.json`.

**Supported formats:** `.webp` and `.png`

**Naming convention:** Use the stadium's `id` field from `stadiums.json`. For example:
- `public/stickers/arsenal.webp`
- `public/stickers/liverpool.png`

If no image file exists for a stadium, the slot will show a placeholder silhouette until an image is added.

### localStorage

All progress is saved to your browser's localStorage under the key `collect92_progress_v1`.

The stored data structure:

```json
{
  "version": 1,
  "visited": {
    "arsenal": true,
    "liverpool": true
  },
  "updatedAt": "2026-02-11T12:00:00.000Z"
}
```

- Progress persists across page reloads
- Clearing browser data will reset your collection
- No data is sent to any server

### Extending to All 92

The `data/stadiums.json` file contains all 92 clubs. To update:

1. Edit `data/stadiums.json`
2. Follow the schema:
   ```json
   {
     "id": "unique-slug",
     "club": "Club Name",
     "stadium": "Stadium Name",
     "league": "PL" | "CH" | "L1" | "L2",
     "city": "City",
     "capacity": 50000,
     "opened": 2000,
     "lat": 51.5,
     "lng": -0.1,
     "stickerImage": "/stickers/unique-slug.webp",
     "image": {
       "src": "/stadiums/unique-slug.webp",
       "alt": "Stadium exterior photo",
       "credit": {
         "title": "Image title or file name",
         "authorName": "Photographer name",
         "authorUrl": "https://commons.wikimedia.org/wiki/User:Example",
         "sourceName": "Wikimedia Commons",
         "sourceUrl": "https://commons.wikimedia.org/wiki/File:Example.jpg",
         "licenseName": "CC BY-SA 4.0",
         "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
         "modified": false,
         "notes": null
       }
     },
     "stickerType": "custom" | "photo",
     "notes": "Optional notes"
   }
   ```
3. Add a corresponding image to `public/stickers/`
4. The app will automatically pick up the changes

### Adding Image Credits Later

When you add a new stadium photo (PNG/WEBP), set `image.src` to the file path and then fill `image.credit`:

- `title`: image title (or file title)
- `authorName` + `authorUrl`: creator attribution
- `sourceName` + `sourceUrl`: source publication and page URL (defaults to Wikimedia Commons if blank)
- `licenseName` + `licenseUrl`: Creative Commons license
- `modified`: `true` if you cropped/edited the image
- `notes`: optional free text, e.g. `"Cropped from original"`

If you want to add a placeholder and fill details later, keep the `credit` object but set its text fields to `null`.

### Leagues

| Code | League         | Clubs |
|------|---------------|-------|
| PL   | Premier League | 20    |
| CH   | Championship   | 24    |
| L1   | League One     | 24    |
| L2   | League Two     | 24    |

## Project Structure

```
├── app/
│   ├── page.tsx                  # Home page
│   ├── album/[league]/page.tsx   # Album viewer
│   ├── about/page.tsx            # About page
│   ├── image-credits/page.tsx    # Attribution list page
│   ├── badges/page.tsx           # Badges (coming soon)
│   ├── layout.tsx                # Root layout with nav
│   └── globals.css               # Global styles + animations
├── components/
│   ├── AlbumSpread.tsx           # Double-page spread
│   ├── Page.tsx                  # Single page wrapper
│   ├── StickerSlot.tsx           # Individual slot (visited/empty)
│   ├── StickerCard.tsx           # Visited sticker visuals
│   ├── StadiumModal.tsx          # Stadium detail modal
│   ├── ProgressBar.tsx           # Progress bar
│   ├── LeagueTabs.tsx            # League navigation cards
│   └── SpreadNavigator.tsx       # Spread pagination
├── hooks/
│   └── useAlbumProgress.ts       # localStorage progress hook
├── lib/
│   ├── types.ts                  # TypeScript types + constants
│   ├── stadiums.ts               # Stadium data loader
│   └── sync.ts                   # Sync stubs (for future cloud)
├── data/
│   └── stadiums.json             # All 92 stadiums
└── public/
    └── stickers/                 # Stadium images (.webp / .png)
```

## Future Plans

- Cloud sync via Supabase (stubs in `lib/sync.ts`)
- Achievement badges
- Shareable collection cards
- Stadium photo uploads

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS

## Disclaimer

This is an independent fan project. It is not affiliated with, endorsed by, or connected to any football league, club, or sticker album brand.
