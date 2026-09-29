# Incoming batch — 2026-09-28

Source: two emails from Travis (iPhone → anguisheh1 Gmail, 8:42 PM "BHM" + 8:43 PM no subject).

## Job (from the Messenger screenshot)
Move from **Regatta Bay, Destin FL** to **Grand Harbor, Destin FL**. Local Destin-to-Destin, gated-community to gated-community.
Owner's words, verbatim: "Move from Regatta Bay, Destin fl to Grand harbor, Destin fl".

---

## 🔴 Filenames do not match the pixels (checked at full size 2026-09-28)

Three of the five files are rotated. This is the same failure CLAUDE.md step 3 warns about.
The originals were **not renamed** so the email attachments stay traceable. Everything
downstream uses the corrected names in the right-hand column.

| File on disk | What the pixels actually show | Corrected output name (`beach-house-moving-…`) |
|---|---|---|
| `regatta-bay-01-truck-driveway.jpg` (1536×2048) | Box truck in a paver driveway under palms, flag at left. **Matches.** | `destin-regatta-bay-box-truck-paver-driveway` |
| `regatta-bay-02-front-door-carry.jpg` (1320×1660) | **The Messenger screenshot** (job text, sender avatar faces, "Thank you my friend"). EXIF says `ImageDescription: Screenshot`. | **NEVER PUBLISH.** No variants were built. |
| `regatta-bay-03-truck-loaded.jpg` (1536×2048) | **Front-door entry.** Crew member (back to camera) walks in through open double glass doors with a hand truck. Planters on each side. | `destin-regatta-bay-front-door-hand-truck-entry` |
| `regatta-bay-04-doorway-carry.jpg` (1206×1583) | Two crew carry a tufted armchair on an angle through an interior doorway. **Matches.** | `destin-regatta-bay-armchair-doorway-carry` |
| `SCREENSHOT-job-description.jpg` (1136×2020) | **The truck-loaded photo.** Inside the box truck: padded wood chest as the base, bins and boxes stacked on it, straps on the E-track, and a crew member in a teal branded shirt. | `destin-regatta-bay-box-truck-loaded-interior` (built from a redacted master, see below) |

**Travis to confirm before anything ships:**
1. The mapping above. The "never publish" rule now attaches to `regatta-bay-02-…`, not to `SCREENSHOT-…`.
2. Which house each photo is from. The names assume **Regatta Bay (origin)**, because the loaded truck, the
   packed boxes at the door and the carry-out all read as pickup-side. If any photo is from Grand Harbor, rename it
   `destin-grand-harbor-…` before it reaches `public/images/`.
3. The spelling is "Grand Harbor", not "Grand Harbour". The owner typed "Grand harbor". It isn't in `content.ts` yet.
   Regatta Bay is already in the Destin record (`landmarks` + `introExtended`).
4. The person in the truck-interior photo wears the teal BHM shirt (logo + phone). Confirm she is crew and OK to show.
   Her face is visible in profile. Name no one. No crew names are cleared for this job.

---

## PII gate — results

**Method:** each original was reviewed as zoomed full-resolution crops (every quadrant, plus 2–4× zooms on
text-like areas). No review used a thumbnail.
**OCR:** `which tesseract` is empty, so tesseract isn't installed and **`npm run audit:photo-pii` could not run**.
Travis runs `sudo apt install -y tesseract-ocr`, then
`npm run audit:photo-pii -- docs/blog/incoming-2026-09-28/optimized/web docs/blog/incoming-2026-09-28/optimized/gbp`
before anything goes to `public/` or GBP.

| Photo (corrected name) | House no. / plaque | Street sign | Plates | Mail / labels / paperwork | Faces | Screens / reflections | Verdict |
|---|---|---|---|---|---|---|---|
| box-truck-paver-driveway | none (neighbor house at right shows wall/roof only) | none | **no front plate** on the bumper | none | driver's silhouette in the cab, not identifiable | cab glass shows foliage only | **CLEAR.** Truck door reads `FL IM-412…` / `US DOT 4484266`, which is public carrier registration and OK. Cosmetic: a soda can sits on the driveway, lower left. It's in the web/fb/square crops and out of the 4:3 and landscape crops. |
| front-door-hand-truck-entry | none | none | none | Amazon box with printed slogan only. A small white label on a dark box in the far room is **illegible at full size** | crew, back to camera | door glass reflects our own truck and trees, no people or text | **CLEAR.** The shirt shows the company phone and logo (ours, fine). |
| armchair-doorway-carry | none | none | none | none | crew: one back-to-camera, one partly hidden behind the chair (forehead only) | none | **CLEAR.** The source is low-res and heavily compressed (88 KB), so it reads slightly soft at 1200×1600. |
| box-truck-loaded-interior | none | none | none | **handwritten box and bin labels** ("FRAGILE", "Laundry / Fragile", one smudged word on the Home Depot box, bin tags). No names or addresses were legible at full size, and no shipping labels face the camera | crew member in profile (see confirm #4) | none | **REDACTED as a precaution.** A feathered soft-focus blur covers the handwriting and bin tags (the pre-printed "Fragile / Kitchen…" checklist is left alone). Every variant is rebuilt from that redacted master, and the blur was confirmed in the outputs. |
| *(Messenger screenshot, `regatta-bay-02-…`)* | — | — | — | job text | **owner/sender avatar faces** | it is a screen | **NEVER PUBLISH.** |

## EXIF / GPS

- **Originals:** none of the five carries GPS. `exiftool -gps:all` returns nothing. `regatta-bay-02-…` (the
  screenshot) has IFD0/EXIF/IPTC "Screenshot" tags, a 2026-09-28 20:42 timestamp and a Display P3 ICC profile. `-04` has
  an XMP block. The rest are bare JFIF.
- **Outputs:** all 21 files were built with `-strip`, sRGB, progressive JPEG, q86. A re-check with `exiftool -a -G1` shows only
  JFIF/file fields, with no EXIF, GPS, XMP, IPTC or ICC.

---

## Variants built (`optimized/`, nothing copied to `public/` yet)

The live site stores **JPG only** in `public/images`. `next.config` sets `images.formats: [webp, avif]`, so
`next/image` makes the WebP/AVIF at request time. That's why no `.webp`/`.avif` files are committed or built here,
which mirrors the existing convention. The recipe is ASSET-TEMPLATES §2 plus fixed crops chosen to keep each subject in frame.

`web/` (repo convention: web 1200×1600, `-square` 1200×1200, `fb-` 1080×1350):

| Photo | web 1200×1600 | `-square` 1200×1200 | `fb-` 1080×1350 | extra |
|---|---|---|---|---|
| box-truck-paver-driveway | ✓ 630 KB | ✓ | ✓ | `-landscape` **1600×900** (16:9, for the Destin neighborhood hero) |
| front-door-hand-truck-entry | ✓ 353 KB | ✓ | ✓ | — |
| box-truck-loaded-interior | ✓ 311 KB (redacted) | ✓ | ✓ | — |
| armchair-doorway-carry | ✓ 164 KB | ✓ | ✓ | — |

`gbp/` (every file is well under 5 MB, the largest is 397 KB): `<name>-gbp-4x3.jpg` (1200×900, used by GBP posts 11–14) and
`<name>-gbp-1080.jpg` (1080×1080, for the profile Photos tab). All names carry the
`beach-house-moving-destin-regatta-bay-` prefix.

Notes: the interior source is 9:16 (1136 px wide), so its 3:4 web crop is upscaled about 5%. The armchair source is
1206×1583, so its web crop is upscaled about 1%. Both look fine at their render sizes.

## Resolved 2026-09-28 (Travis)
- Mapping confirmed; all four photos are from the Regatta Bay (origin) house. "Grand Harbor" = the Destin harborfront condo tower.
- The crew member's face in the truck-interior photo is **blurred** (heavy pixelate + blur over the whole head, feathered),
  along with the handwriting/bin tags. Master: `optimized/masters/…-box-truck-loaded-interior-REDACTED-master.jpg`. All five
  variants (web, `-square`, `fb-`, `gbp-1080`, `gbp-4x3`) were rebuilt from it and checked with zoomed face crops.

## Still to do
- [x] Travis confirms items 1–4 above
- [x] `npm run audit:photo-pii` over `optimized/web` + `optimized/gbp`: 21 images, no customer-identifying text
- [x] Copy the approved web variants to `public/images/` and wire slots 1–5 per `IMAGE-SLOT-AUDIT.md`
- [x] Append a Destin `confirmedWork` sentence (Regatta Bay → Grand Harbor move) and bump Destin `updatedAt` (CLAUDE.md step 4)
- [ ] `public/llms.txt`, `npm run audit:images` re-run, GBP posts 11–14 approval, and the `gbp:kit` repoint (see GBP file)
