import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { POSTS } from '@/content/posts'
import { buildMetadata } from '@/lib/seo'
import { blogPostingSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${post.slug}`,
  })
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ResourcePostPage({ params }: PageProps) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const origin = await getSiteOrigin()
  const visibleBody = post.body.filter((block) => !block.isOwnerNote)
  const postFaqs = post.faq.map((item) => ({ q: item.question, a: item.answer }))

  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Resources', path: '/resources' },
      { name: post.title, path: `/resources/${post.slug}` },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, blogPostingSchema(post, origin.origin), faqSchema(postFaqs)]} />

      <article className="pb-16 md:pb-24">
        <div className="relative aspect-21/9 max-h-120 w-full overflow-hidden md:aspect-3/1">
          <Image
            src={post.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/40" aria-hidden />
        </div>

        <div className="mx-auto max-w-3xl px-4 pt-10 md:px-8 md:pt-14">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: post.title },
            ]}
          />

          <header className="mt-6">
            <time
              dateTime={post.datePublished}
              className="font-body text-sm font-medium text-brand-teal"
            >
              {formatDate(post.datePublished)}
            </time>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-muted">
              {post.description}
            </p>
          </header>

          <div className="prose-spacing mt-12 space-y-8">
            {visibleBody.map((block) => (
              <div key={`${block.heading ?? 'p'}-${block.paragraph.slice(0, 32)}`}>
                {block.heading ? (
                  <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
                    {block.heading}
                  </h2>
                ) : null}
                <p className="font-body text-base leading-relaxed text-ink-muted">
                  {block.paragraph}
                </p>
              </div>
            ))}
          </div>

          {post.faq.length > 0 ? (
            <section className="mt-16 border-t border-brand-navy/10 pt-12">
              <h2 className="mb-8 font-heading text-2xl font-bold text-brand-navy">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {post.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-heading text-lg font-semibold text-brand-navy">
                      {item.question}
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed text-ink-muted">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </PageShell>
  )
}
