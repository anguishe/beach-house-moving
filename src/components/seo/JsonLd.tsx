type JsonLdValue = Record<string, unknown> | Record<string, unknown>[]

type JsonLdProps = {
  data: JsonLdValue
}

/**
 * Renders schema.org JSON-LD without dangerouslySetInnerHTML.
 * Escapes `<` in serialized JSON to prevent script-breakout issues.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script type="application/ld+json">{json}</script>
}
