import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { POSTS } from '@/content/posts'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, resourcesItemListSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Moving Resources & Local Guides | Beach House Moving',
    description:
      'Expert moving guides from a locally owned 30A crew. Floor protection, gated community logistics, PCS moves near Eglin AFB, and more from the people who actually do the work.',
    path: '/resources',
  })
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ResourcesPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Resources', path: '/resources' },
    ],
    origin.origin,
  )
  const itemList = resourcesItemListSchema(POSTS, origin.origin)

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, itemList]} />

      <section className="bg-brand-navy px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-brand-teal">
            Local Moving Guides
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            Moving Resources &amp; Local Guides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            Practical advice from the crew that moves along 30A, across Okaloosa County, and down to
            Panama City Beach every week — not a content farm, not a national franchise blog.
          </p>
        </div>
      </section>

      <section className="bg-brand-sand py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-brand bg-white shadow-brand"
              >
                <Link href={`/resources/${post.slug}`} className="group block no-underline">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time
                      dateTime={post.datePublished}
                      className="font-body text-xs font-medium uppercase tracking-wide text-brand-teal"
                    >
                      {formatDate(post.datePublished)}
                    </time>
                    <h2 className="mt-2 font-heading text-xl font-bold leading-snug text-brand-navy group-hover:text-brand-teal">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 font-body text-sm font-semibold text-brand-teal">
                      Read guide →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
