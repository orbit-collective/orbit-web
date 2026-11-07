import { getLangIndex } from "./docs"

export interface DocSearchResult {
  /** Unique within one language. */
  id: string
  kind: "page" | "section"
  title: string
  /** Where it lives, e.g. "Permissions" or "Permissions › Add a new permission". */
  context: string
  /** A /learn route, with a #hash for a section. */
  href: string
}

interface Entry extends DocSearchResult {
  titleKey: string
  contextKey: string
  descriptionKey: string
}

const MAX_RESULTS = 8

/** Lowercase and strip accents, so "zalaczniki" finds "Załączniki". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .toLowerCase()
}

const entriesByLang = new Map<string, Entry[]>()

function buildEntries(lang: string): Entry[] {
  const langIndex = getLangIndex(lang)
  if (!langIndex) return []

  const entries: Entry[] = []
  const add = (
    kind: Entry["kind"],
    title: string,
    context: string,
    href: string,
    description = "",
  ) => {
    entries.push({
      id: href,
      kind,
      title,
      context,
      href,
      titleKey: normalize(title),
      contextKey: normalize(context),
      descriptionKey: normalize(description),
    })
  }

  for (const category of langIndex.categories) {
    const categoryHref = `/learn/${lang}/${category.slug}`
    add("page", category.title, "", categoryHref, category.readme.description)
    for (const heading of category.readme.headings) {
      add("section", heading.text, category.title, `${categoryHref}#${heading.slug}`)
    }

    for (const guide of category.guides) {
      const guideHref = `${categoryHref}/${guide.slug}`
      add("page", guide.title, category.title, guideHref, guide.description)
      for (const heading of guide.headings) {
        add("section", heading.text, `${category.title} › ${guide.title}`, `${guideHref}#${heading.slug}`)
      }
    }
  }

  return entries
}

function entriesFor(lang: string): Entry[] {
  let entries = entriesByLang.get(lang)
  if (!entries) {
    entries = buildEntries(lang)
    entriesByLang.set(lang, entries)
  }
  return entries
}

function scoreEntry(entry: Entry, query: string, tokens: string[]): number {
  let score = 0

  for (const token of tokens) {
    const inTitle = entry.titleKey.indexOf(token)
    if (inTitle === 0) score += 6
    else if (inTitle > 0 && entry.titleKey[inTitle - 1] === " ") score += 4
    else if (inTitle > 0) score += 3
    else if (entry.contextKey.includes(token)) score += 2
    else if (entry.descriptionKey.includes(token)) score += 1
    else return 0 // every word of the query has to match something
  }

  if (entry.titleKey.includes(query)) score += 5
  if (entry.kind === "page") score += 4
  return score
}

/**
 * Ranks pages and sections of one language against a query. With an empty
 * query it suggests the top-level topics, so the dialog is never blank.
 */
export function searchDocs(lang: string, rawQuery: string): DocSearchResult[] {
  const entries = entriesFor(lang)
  const query = normalize(rawQuery).trim().replace(/\s+/g, " ")

  if (!query) {
    return entries.filter((entry) => entry.kind === "page" && !entry.context).slice(0, MAX_RESULTS)
  }

  const tokens = query.split(" ")

  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length)
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry)
}
