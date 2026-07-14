import { IMAGES } from '@/lib/content'

type ServiceImage = { src: string; alt: string }

/** Maps each service slug to its hero/card image from content.ts. */
export const SERVICE_IMAGE_MAP: Record<string, ServiceImage> = {
  'residential-moving': IMAGES.luxuryHomeMove,
  'local-moving': IMAGES.loadedLiftgateCoastalHome,
  'long-distance-moving': IMAGES.moverCarryWrappedEstate,
  'packing-unpacking': IMAGES.denStaged,
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
  'packing-unpacking': IMAGES.rugCarryStairs,
  delivery: IMAGES.slotMachineSpecialtyMove,
  storage: IMAGES.applianceStagingWarehouse,
}
