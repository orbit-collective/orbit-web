import index from "../generated/docs-index.json"
import type { DocHeading } from "./docsParse"

export type { DocHeading }

export interface DocGuide {
  slug: string
  /** Markdown file name inside the category folder, e.g. "01-add-a-thing.md". */
  file: string
  title: string
  description: string
  order: number
  category: string
  lang: string
  githubUrl: string
  headings: DocHeading[]
}

export interface DocCategory {
  slug: string
  title: string
  readme: DocGuide
  guides: DocGuide[]
}

export interface DocLang {
  lang: string
  title: string
  description: string
  githubUrl: string
  headings: DocHeading[]
  categories: DocCategory[]
}

type IndexedGuide = Omit<DocGuide, "category" | "lang">
interface IndexedLang extends Omit<DocLang, "categories"> {
  categories: {
    slug: string
    title: string
    readme: IndexedGuide
    guides: IndexedGuide[]
  }[]
}

const docsTree: DocLang[] = (index as IndexedLang[]).map((entry) => ({
  ...entry,
  categories: entry.categories.map((category) => ({
    ...category,
    readme: { ...category.readme, category: category.slug, lang: entry.lang },
    guides: category.guides.map((guide) => ({ ...guide, category: category.slug, lang: entry.lang })),
  })),
}))

// Page bodies are not bundled: each .md becomes its own tiny chunk that is
// fetched when the page is opened (or hovered, see prefetchDocContent).
const contentLoaders = import.meta.glob("/src/content/docs/**/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>

const contentCache = new Map<string, string>()
const pendingContent = new Map<string, Promise<string>>()

/** Key of a page body: "en/README.md", "en/alerts/README.md", "en/alerts/01-x.md". */
export function docContentKey(lang: string, category: string | undefined, file: string): string {
  return category ? `${lang}/${category}/${file}` : `${lang}/${file}`
}

/** Finds the content key for a /learn route, or undefined if there is no such page. */
export function resolveContentKey(lang: string, category?: string, slug?: string): string | undefined {
  const langIndex = getLangIndex(lang)
  if (!langIndex) return undefined
  if (!category) return docContentKey(lang, undefined, "README.md")

  const categoryData = getCategory(lang, category)
  if (!categoryData) return undefined
  if (!slug) return docContentKey(lang, category, categoryData.readme.file)

  const guide = getGuide(lang, category, slug)
  return guide ? docContentKey(lang, category, guide.file) : undefined
}

export function getCachedDocContent(key: string): string | undefined {
  return contentCache.get(key)
}

export function loadDocContent(key: string): Promise<string> {
  const cached = contentCache.get(key)
  if (cached !== undefined) return Promise.resolve(cached)

  const pending = pendingContent.get(key)
  if (pending) return pending

  const loader = contentLoaders[`/src/content/docs/${key}`]
  if (!loader) return Promise.reject(new Error(`Unknown doc page: ${key}`))

  const request = loader()
    .then((content) => {
      contentCache.set(key, content)
      return content
    })
    .finally(() => pendingContent.delete(key))

  pendingContent.set(key, request)
  return request
}

/** Warms the cache for a page the reader is likely to open next. Never throws. */
export function prefetchDocContent(key: string | undefined): void {
  if (!key || contentCache.has(key)) return
  loadDocContent(key).catch(() => {})
}

/** Loads the body of a "/learn/..." route (used before the first render). */
export function preloadDocRoute(pathname: string): Promise<unknown> {
  const match = pathname.match(/^\/learn\/([a-z]{2})(?:\/([^/]+)(?:\/([^/]+))?)?\/?$/)
  if (!match) return Promise.resolve()
  const key = resolveContentKey(match[1], match[2], match[3])
  return key ? loadDocContent(key).catch(() => {}) : Promise.resolve()
}

export function getDocsTree(): DocLang[] {
  return docsTree
}

export function getLangIndex(lang: string): DocLang | undefined {
  return docsTree.find((entry) => entry.lang === lang)
}

export function getCategory(lang: string, categorySlug: string): DocCategory | undefined {
  return getLangIndex(lang)?.categories.find((category) => category.slug === categorySlug)
}

export interface DocPreview {
  eyebrow?: string
  title: string
  description: string
}

/** Given a resolved "/learn/..." route, looks up that page's title/description
 * for the hover preview card on internal doc links. */
export function getPreviewForPath(path: string): DocPreview | undefined {
  const match = path.match(/^\/learn\/([a-z]{2})(?:\/([^/]+)(?:\/([^/]+))?)?$/)
  if (!match) return undefined
  const [, lang, category, slug] = match

  if (!category) {
    const langIndex = getLangIndex(lang)
    return langIndex ? { title: langIndex.title, description: langIndex.description } : undefined
  }

  const categoryData = getCategory(lang, category)
  if (!categoryData) return undefined

  if (!slug) {
    return { title: categoryData.title, description: categoryData.readme.description }
  }

  const guide = getGuide(lang, category, slug)
  return guide ? { eyebrow: categoryData.title, title: guide.title, description: guide.description } : undefined
}

export function getGuide(lang: string, categorySlug: string, slug: string): DocGuide | undefined {
  return getCategory(lang, categorySlug)?.guides.find((guide) => guide.slug === slug)
}

export function getAvailableLangs(): string[] {
  return docsTree.map((entry) => entry.lang)
}

export interface DocAlternatePath {
  lang: string
  path: string
}

export function getAlternatePaths(category?: string, slug?: string): DocAlternatePath[] {
  return getAvailableLangs()
    .filter((lang) => {
      if (!category) return true
      const categoryData = getCategory(lang, category)
      if (!categoryData) return false
      if (!slug) return true
      return categoryData.guides.some((guide) => guide.slug === slug)
    })
    .map((lang) => ({
      lang,
      path: slug
        ? `/learn/${lang}/${category}/${slug}`
        : category
          ? `/learn/${lang}/${category}`
          : `/learn/${lang}`,
    }))
}

export interface DocPageRef {
  title: string
  href: string
}

export function getFlatPages(lang: string): DocPageRef[] {
  const langIndex = getLangIndex(lang)
  if (!langIndex) return []

  const pages: DocPageRef[] = [{ title: langIndex.title, href: `/learn/${lang}` }]

  for (const category of langIndex.categories) {
    pages.push({ title: category.title, href: `/learn/${lang}/${category.slug}` })
    for (const guide of category.guides) {
      pages.push({ title: guide.title, href: `/learn/${lang}/${category.slug}/${guide.slug}` })
    }
  }

  return pages
}

export interface DocAdjacentPages {
  previous?: DocPageRef
  next?: DocPageRef
}

export function getAdjacentPages(lang: string, currentHref: string): DocAdjacentPages {
  const pages = getFlatPages(lang)
  const index = pages.findIndex((page) => page.href === currentHref)
  if (index === -1) return {}
  return { previous: pages[index - 1], next: pages[index + 1] }
}
