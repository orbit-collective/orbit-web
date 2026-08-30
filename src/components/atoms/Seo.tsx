import { useEffect } from "react"

export const SITE_URL = "https://orbit-dev.app"
const SITE_NAME = "Orbit"
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

interface Alternate {
  lang: string
  path: string
}

interface SeoProps {
  title: string
  description: string
  path: string
  lang?: string
  noindex?: boolean
  alternates?: Alternate[]
  jsonLd?: Record<string, unknown>
}

/** Renders <title>/<meta>/<link> anywhere in the tree — React 19 hoists these
 * into <head> automatically, both on the client and during renderToString
 * (see scripts/prerender.mts), so no portal/provider is needed. */
export function Seo({
  title,
  description,
  path,
  lang = "en",
  noindex,
  alternates,
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {alternates?.map((alternate) => (
        <link
          key={alternate.lang}
          rel="alternate"
          hrefLang={alternate.lang}
          href={`${SITE_URL}${alternate.path}`}
        />
      ))}

      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </>
  )
}
