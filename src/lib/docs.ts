import GithubSlugger from "github-slugger"
import { buildGithubUrl } from "./docLinks"

export interface DocHeading {
  depth: 2 | 3
  text: string
  slug: string
}

export interface DocGuide {
  slug: string
  title: string
  description: string
  order: number
  content: string
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
  content: string
  githubUrl: string
  headings: DocHeading[]
  categories: DocCategory[]
}

const files = import.meta.glob("/src/content/docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

const MAX_DESCRIPTION_LENGTH = 155

function extractDescription(content: string): string {
  const withoutH1 = content.replace(/^#\s+.+$/m, "")
  const paragraphs = withoutH1
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0 && !paragraph.startsWith("#"))

  const plain = (paragraphs[0] ?? "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  return plain.length > MAX_DESCRIPTION_LENGTH
    ? `${plain.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}…`
    : plain
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim()
}

/** Mirrors rehype-slug (same github-slugger version) so these ids match the
 * ones actually rendered onto <h2>/<h3> elements, for the "On this page" nav. */
function extractHeadings(content: string): DocHeading[] {
  const slugger = new GithubSlugger()
  const headings: DocHeading[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const text = stripInlineMarkdown(match[2])
    headings.push({ depth: match[1].length as 2 | 3, text, slug: slugger.slug(text) })
  }

  return headings
}

function parseFilename(filename: string): { slug: string; order: number } {
  const withoutExt = filename.replace(/\.md$/, "")
  const numbered = withoutExt.match(/^(\d+)-(.+)$/)
  if (numbered) {
    return { slug: numbered[2], order: Number(numbered[1]) }
  }
  return { slug: withoutExt, order: 0 }
}

interface CategoryDraft {
  slug: string
  readme?: DocGuide
  guides: DocGuide[]
}

interface LangDraft {
  readmeContent: string
  categories: Map<string, CategoryDraft>
}

const langDrafts = new Map<string, LangDraft>()

for (const [path, content] of Object.entries(files)) {
  const relative = path.replace("/src/content/docs/", "")
  const segments = relative.split("/")

  if (segments.length === 2) {
    const [lang] = segments
    const draft = langDrafts.get(lang) ?? { readmeContent: "", categories: new Map() }
    draft.readmeContent = content
    langDrafts.set(lang, draft)
    continue
  }

  if (segments.length === 3) {
    const [lang, category, filename] = segments
    const draft = langDrafts.get(lang) ?? { readmeContent: "", categories: new Map() }
    const categoryDraft: CategoryDraft = draft.categories.get(category) ?? {
      slug: category,
      guides: [],
    }

    if (filename === "README.md") {
      categoryDraft.readme = {
        slug: "README",
        title: extractTitle(content, category),
        description: extractDescription(content),
        order: 0,
        content,
        category,
        lang,
        githubUrl: buildGithubUrl(lang, category, filename),
        headings: extractHeadings(content),
      }
    } else {
      const { slug, order } = parseFilename(filename)
      categoryDraft.guides.push({
        slug,
        title: extractTitle(content, slug),
        description: extractDescription(content),
        order,
        content,
        category,
        lang,
        headings: extractHeadings(content),
        githubUrl: buildGithubUrl(lang, category, filename),
      })
    }

    draft.categories.set(category, categoryDraft)
    langDrafts.set(lang, draft)
  }
}

const docsTree: DocLang[] = Array.from(langDrafts.entries())
  .map(([lang, draft]) => ({
    lang,
    title: extractTitle(draft.readmeContent, lang),
    description: extractDescription(draft.readmeContent),
    content: draft.readmeContent,
    githubUrl: buildGithubUrl(lang, undefined, "README.md"),
    headings: extractHeadings(draft.readmeContent),
    categories: Array.from(draft.categories.values())
      .filter((category): category is CategoryDraft & { readme: DocGuide } => category.readme !== undefined)
      .map((category) => ({
        slug: category.slug,
        title: category.readme.title,
        readme: category.readme,
        guides: [...category.guides].sort((a, b) => a.order - b.order),
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug)),
  }))
  .sort((a, b) => a.lang.localeCompare(b.lang))

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
