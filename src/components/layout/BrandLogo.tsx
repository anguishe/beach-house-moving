import Image, { type ImageProps } from 'next/image'

import { IMAGES } from '@/lib/content'
import { cn } from '@/lib/utils'

const SIZES = {
  nav: { width: 600, height: 389, className: 'h-11 w-auto' },
  drawer: { width: 600, height: 389, className: 'h-10 w-auto' },
  footer: { width: 64, height: 64, className: 'h-16 w-16' },
} as const

type BrandLogoProps = {
  size?: keyof typeof SIZES
  priority?: boolean
  className?: string
  alt?: string
} & Pick<ImageProps, 'aria-hidden' | 'loading'>

/** Brand mark — horizontal wordmark in navbar/drawer; circular mark in footer. */
export function BrandLogo({
  size = 'nav',
  priority = false,
  className,
  alt = IMAGES.logo.alt,
  ...imageProps
}: BrandLogoProps) {
  const dimensions = SIZES[size]
  const src = size === 'footer' ? IMAGES.logo.footer : IMAGES.logo.navbar

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={cn('block shrink-0 object-contain', dimensions.className, className)}
      {...imageProps}
    />
  )
}
