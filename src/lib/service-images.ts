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
}

// TODO: batch 2026-07 — staged, intentionally unwired (committed)
//   beach-house-moving-inlet-beach-living-room-pack-staging.jpg
//   beach-house-moving-inlet-beach-chaise-shrink-wrapped-upright.jpg
//   beach-house-moving-inlet-beach-antique-drum-table-blanket-staged.jpg
//   beach-house-moving-inlet-beach-antique-drum-table-pad-wrapped.jpg
//   beach-house-moving-new-construction-headboard-lift-paver-drive.jpg
//   beach-house-moving-new-construction-interior-delivery-front-door.jpg
// Reserved for the specialty-item-moving page (W4) and Field Notes.
// Batch 2026-08 — banked, still unwired (committed):
//   beach-house-moving-santa-rosa-beach-box-truck-driveway-load.jpg
// Still missing a purpose shot: military-pcs-moving SECONDARY (MISSING-KEY).
