import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Renders internal-only Markdown links `[label](/path)` in body copy as <Link>.
 * Only `/`-rooted targets match — external URLs and malformed brackets fall
 * through as literal text (fail-safe). Pure string/regex, no dangerouslySetInnerHTML.
 */
export function renderBody(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const linkPattern = /\[([^\]]+)\]\((\/[^)]*)\)/g
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-brand-teal underline underline-offset-4 hover:text-brand-teal-dark"
      >
        {match[1]}
      </Link>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}
