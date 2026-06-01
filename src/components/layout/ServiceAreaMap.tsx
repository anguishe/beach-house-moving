import { MAP_EMBED } from '@/lib/content'

type ServiceAreaMapProps = {
  className?: string
}

export function ServiceAreaMap({ className }: ServiceAreaMapProps) {
  return (
    <div
      className={`overflow-hidden rounded-brand-lg border border-brand-navy/10 shadow-brand ${className ?? ''}`}
    >
      <iframe
        src={MAP_EMBED.src}
        title={MAP_EMBED.title}
        width="100%"
        height="400"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
      />
    </div>
  )
}
