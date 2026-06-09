import { IMAGES } from '@/lib/content'

/** Maps each service slug to its hero/card image from content.ts. */
export const SERVICE_IMAGE_MAP: Record<
  string,
  { src: string; alt: string }
> = {
  'residential-moving': IMAGES.truckLoading,
  'local-moving': IMAGES.dolly,
  'long-distance-moving': IMAGES.fleet,
  'packing-unpacking': IMAGES.dresserPack,
  storage: IMAGES.moverStorageCorridor,
  delivery: IMAGES.crewGymEquipmentLiftgate,
  'junk-removal': IMAGES.truckLoading,
}
