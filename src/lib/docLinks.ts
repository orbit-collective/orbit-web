const DOCS_ORIGIN = "https://docs.local"
const GITHUB_DOCS_BASE = "https://github.com/orbit-collective/orbit/blob/master/documentation"

export function isExternalDocLink(href: string): boolean {
  return /^([a-z][a-z0-9+.-]*:)?\/\//i.test(href) || href.startsWith("mailto:")
}

interface ResolveDocLinkParams {
  href: string
  lang: string
  category?: string
  filename: string
}

/** Resolves a relative markdown link (e.g. "./01-guide.md", "../pl/README.md")
 * against the current doc's location into a `/learn/...` route, falling back
 * to the equivalent file on GitHub if it doesn't map to a known doc shape. */
export function resolveDocLink({ href, lang, category, filename }: ResolveDocLinkParams): string {
  const baseSegments = category ? [lang, category, filename] : [lang, filename]
  const base = `${DOCS_ORIGIN}/${baseSegments.join("/")}`

  let resolved: URL
  try {
    resolved = new URL(href, base)
  } catch {
    return href
  }

  if (resolved.origin !== DOCS_ORIGIN) {
    return href
  }

  const segments = resolved.pathname.split("/").filter(Boolean)

  if (segments.length === 2 && segments[1] === "README.md") {
    return `/learn/${segments[0]}`
  }

  if (segments.length === 3) {
    const [resolvedLang, resolvedCategory, resolvedFilename] = segments
    if (resolvedFilename === "README.md") {
      return `/learn/${resolvedLang}/${resolvedCategory}`
    }
    const match = resolvedFilename.match(/^\d+-(.+)\.md$/)
    if (match) {
      return `/learn/${resolvedLang}/${resolvedCategory}/${match[1]}`
    }
  }

  return `${GITHUB_DOCS_BASE}/${segments.join("/")}`
}
