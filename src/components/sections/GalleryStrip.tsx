import Image from 'next/image'
import { IMAGES } from '@/lib/content'

const GALLERY_PHOTOS = [
  IMAGES.truckLoading,
  IMAGES.dolly,
  IMAGES.fridge,
  IMAGES.washerDryer,
  IMAGES.dresserPack,
  IMAGES.stairs,
  IMAGES.cleanEntry,
  IMAGES.boxTruck,
  IMAGES.fleet,
] as const

const galleryPhotos = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS]

export function GalleryStrip() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-12 md:py-16">
      <p
        className="mb-8 px-4 text-center font-body text-sm font-semibold uppercase tracking-widest text-brand-teal"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#2A9D8F',
          fontWeight: 600,
          letterSpacing: '0.2em',
          fontSize: '12px',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        Real Moves · Real People · Real Results
      </p>

      <div className="relative">
        <div className="marquee-track flex" style={{ width: 'max-content' }}>
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className="group relative mx-3 h-52 w-72 flex-shrink-0 overflow-hidden rounded-brand md:h-64 md:w-96"
            >
              <Image
                src={photo.src}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 288px, 384px"
                alt={photo.alt}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-navy/20 transition-colors duration-300 group-hover:bg-transparent" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-brand-navy to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-brand-navy to-transparent" />
      </div>
    </section>
  )
}
