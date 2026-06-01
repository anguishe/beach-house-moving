import Image from 'next/image'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  image?: { src: string; alt: string }
  dark?: boolean
  /** Set true when this hero image is the page LCP element. */
  priority?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  dark = false,
  priority = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 ${
        dark ? 'bg-brand-navy text-white' : 'bg-brand-sand'
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1">
          {eyebrow && (
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${
              dark ? 'text-white' : 'text-brand-navy'
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-4 max-w-xl font-body text-base leading-relaxed md:text-lg ${
                dark ? 'text-white/75' : 'text-ink-muted'
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {image && (
          <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-brand-lg bg-white shadow-brand-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              loading={priority ? undefined : 'lazy'}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-2"
            />
          </div>
        )}
      </div>
    </section>
  )
}
