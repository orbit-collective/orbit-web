import GithubSlugger from "github-slugger"

export interface DocHeading {
  depth: 2 | 3
  text: string
  slug: string
}

export function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

const MAX_DESCRIPTION_LENGTH = 155

export function extractDescription(content: string): string {
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
export function extractHeadings(content: string): DocHeading[] {
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

export function parseFilename(filename: string): { slug: string; order: number } {
  const withoutExt = filename.replace(/\.md$/, "")
  const numbered = withoutExt.match(/^(\d+)-(.+)$/)
  if (numbered) {
    return { slug: numbered[2], order: Number(numbered[1]) }
  }
  return { slug: withoutExt, order: 0 }
}
