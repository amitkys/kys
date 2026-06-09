/**
 * @route /gallery
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW IMAGE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * STEP 1 — Drop the image file into:
 *   /public/gallery/
 *
 *   Naming convention (keep it consistent):
 *     <index>_<ddmmmyy>.jpg
 *   Example:
 *     2_15jun26.jpg
 *
 * STEP 2 — Add an entry in:
 *   /src/data/gallery.json
 *
 *   Minimal entry (image only, no music):
 *   {
 *     "path": "2_15jun26.jpg",    ← must match the filename in /public/gallery/
 *     "date": "2026-06-15",       ← ISO format YYYY-MM-DD
 *     "text": "optional caption"  ← shown below the image in the grid & lightbox
 *   }
 *
 *   Images are displayed in the order they appear in the JSON array.
 *   The most recent is usually placed first.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ATTACH A SPOTIFY TRACK TO AN IMAGE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * STEP 1 — Find the Spotify track URL.
 *   Open Spotify → right-click the song → Share → Copy Song Link
 *   URL looks like: https://open.spotify.com/track/2D4dV2KXDTszzJ3p3cFqhA
 *                                                        ^^^^^^^^^^^^^^^^^^^
 *                                                        this is the trackId
 *
 * STEP 2 — Pick a themeColor.
 *   Open the album on Spotify or Google Images and pick the dominant background
 *   color of the album art. Use any hex picker tool (e.g. imagecolorpicker.com).
 *   Choose a DARK shade for best readability — the whole lightbox is tinted with it.
 *
 * STEP 3 — Add the "spotify" field to your gallery.json entry:
 *   {
 *     "path": "2_15jun26.jpg",
 *     "date": "2026-06-15",
 *     "text": "vibing to Blinding Lights while editing",
 *     "spotify": {
 *       "trackId":   "0VjIjW4GlUZAMYd2vXMi3b",   ← from the Spotify URL
 *       "songName":  "Blinding Lights",            ← shown on the Play button
 *       "themeColor": "#1a0a1a"                    ← dark hex from album art
 *     }
 *   }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * BEHAVIOUR SUMMARY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  • Click image          → opens lightbox
 *  • After 2 seconds      → "Play <songName>" button fades in (bottom-right)
 *  • Click Play           → Spotify embed appears
 *                           Mobile : compact bar overlays bottom of image
 *                           Desktop: full player panel slides in on the right
 *  • Click ✕ on player   → hides player, image stays open
 *  • Click close / Esc   → closes entire lightbox
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FILE MAP (all files involved in the gallery feature)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  /public/gallery/            ← image files go here
 *  /src/data/gallery.json      ← data source: paths, dates, captions, spotify
 *  /src/app/gallery/page.tsx   ← this file (route, imports data)
 *  /src/components/gallery.tsx ← GalleryItem type + Gallery wrapper component
 *  /src/components/gallery-grid.tsx ← lightbox, play button, Spotify embed logic
 */

import { Gallery } from "@/components/gallery"
import galleryItems from "@/data/gallery.json"

export default function Page() {
  return (
    <div className="p-4">
      <Gallery items={galleryItems} />
    </div>
  )
}
