import { IMAGES } from '@/lib/content'

type ServiceImage = { src: string; alt: string }

/** Maps each service slug to its hero/card image from content.ts. */
export const SERVICE_IMAGE_MAP: Record<string, ServiceImage> = {
  'residential-moving': IMAGES.luxuryHomeMove,
  'local-moving': IMAGES.loadedLiftgateCoastalHome,
  'long-distance-moving': IMAGES.moverCarryWrappedEstate,
  'packing-unpacking': IMAGES.kitchenPackCrew,
  storage: IMAGES.moverStorageCorridor,
  delivery: IMAGES.crewGymEquipmentLiftgate,
  'junk-removal': IMAGES.washerDryer,
  'military-pcs-moving': IMAGES.crewTeamFurnitureMove,
  'design-trade-installation': IMAGES.burntPineDiningRoomInstall,
  'mounting-installation': IMAGES.nicevilleEstateSaleArtHanging,
  'loading-unloading-help': IMAGES.ridgewalkUhaulUnload,
}

/** Optional secondary/gallery image per service — must not duplicate the primary src. */
export const SERVICE_SECONDARY_IMAGE_MAP: Partial<Record<string, ServiceImage>> = {
  'residential-moving': IMAGES.moverCarryEstate,
  'local-moving': IMAGES.brandedCrewPlacement,
  'long-distance-moving': IMAGES.greatRoomRug,
  'packing-unpacking': IMAGES.kitchenDishPack,
  delivery: IMAGES.slotMachineSpecialtyMove,
  storage: IMAGES.applianceStagingWarehouse,
  // Inert until the bespoke /services/junk-removal page reads this map — it only uses the primary.
  'junk-removal': IMAGES.pelicanFridgeHaulAway,
  'design-trade-installation': IMAGES.draperyHangingComplete,
  'mounting-installation': IMAGES.draperyHangingLadder,
  'loading-unloading-help': IMAGES.apartmentRampUnload,
}

// ---------------------------------------------------------------------------
// IMAGE SLOT TODOs
//
// `npm run audit:images` is the source of truth — it lists empty slots, duplicate
// fills, wrong-shape heroes, dead IMAGES keys, and unplaced photos. Run it on every
// incoming photo batch BEFORE wiring anything, and fill what the batch can fill.
// Do not maintain a hand-written list here; it goes stale. Only the items below
// are recorded, because no code change can fix them — they need a specific photo.
//
// NEEDS A PHOTO FROM THE OWNERS (as of 2026-09-08):
//   1. service:secondary `military-pcs-moving` — the only empty slot on the site.
//      Ask for a shot from an Eglin/Hurlburt base-area job.
//   2. Neighborhood heroes render 16:9, so they need LANDSCAPE. Two Bay/Walton
//      pages are also sharing one photo between them:
//        freeport + lynn-haven  → both on /images/truck-loaded.jpg
//        niceville + bluewater-bay → both on /images/move-niceville.jpg
//      Ask for one landscape shot each in Freeport, Lynn Haven, and Bluewater Bay.
//   3. `/services/mounting-installation` is borrowing the Niceville art-hanging and
//      drapery-ladder shots. Ask for a TV mount take-down-and-replace.
//
// OPEN DECISION (not a photo problem): 20 of 26 neighborhood heroes are portrait
// photos in the 16:9 box on the neighborhood template, so they render as centre-cropped
// strips. Re-shooting 20 communities is not realistic; changing the hero aspect ratio
// on that template fixes all of them at once. Needs a design call before anyone acts.
//
// UNPLACED, still unwired (committed, awaiting a slot):
//   beach-house-moving-santa-rosa-beach-box-truck-driveway-load.jpg
//   beach-house-moving-30a-gulf-front-crew.jpg
//   liftgate-blankets-coastal-home.jpg
// ---------------------------------------------------------------------------
