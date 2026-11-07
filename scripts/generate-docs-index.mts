import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { buildGithubUrl } from "../src/lib/docLinks"
import {
  extractDescription,
  extractHeadings,
  extractTitle,
  parseFilename,
} from "../src/lib/docsParse"

/**
 * Reads the fetched documentation/ folder and writes two small JSON files, so
 * the site can show titles, sidebars and menus without bundling every page:
 *
 * - docs-index.json: the whole tree (no page bodies), used by /learn.
 * - docs-nav.json:   English categories only, used by the navbar menu and the
 *                    landing stats.
 *
 * Page bodies stay in src/content/docs and are loaded one at a time.
 */
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const docsRoot = join(projectRoot, "src/content/docs")
const outDir = join(projectRoot, "src/generated")

function read(path: string): string {
  return readFileSync(path, "utf8")
}

function dirs(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function guideMeta(lang: string, category: string, file: string, content: string) {
  const { slug, order } = parseFilename(file)
  return {
    slug: file === "README.md" ? "README" : slug,
    file,
    order: file === "README.md" ? 0 : order,
    title: extractTitle(content, slug),
    description: extractDescription(content),
    headings: extractHeadings(content),
    githubUrl: buildGithubUrl(lang, category, file),
  }
}

const tree = dirs(docsRoot).map((lang) => {
  const readme = read(join(docsRoot, lang, "README.md"))

  const categories = dirs(join(docsRoot, lang))
    .filter((category) => existsSync(join(docsRoot, lang, category, "README.md")))
    .map((category) => {
      const categoryDir = join(docsRoot, lang, category)
      const files = readdirSync(categoryDir).filter((file) => file.endsWith(".md")).sort()
      const categoryReadme = guideMeta(lang, category, "README.md", read(join(categoryDir, "README.md")))

      return {
        slug: category,
        title: categoryReadme.title,
        readme: categoryReadme,
        guides: files
          .filter((file) => file !== "README.md")
          .map((file) => guideMeta(lang, category, file, read(join(categoryDir, file))))
          .sort((a, b) => a.order - b.order),
      }
    })

  return {
    lang,
    title: extractTitle(readme, lang),
    description: extractDescription(readme),
    headings: extractHeadings(readme),
    githubUrl: buildGithubUrl(lang, undefined, "README.md"),
    categories,
  }
})

const nav = (tree.find((entry) => entry.lang === "en")?.categories ?? []).map((category) => ({
  slug: category.slug,
  title: category.title,
  description: category.readme.description,
  guideCount: category.guides.length,
}))

mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, "docs-index.json"), JSON.stringify(tree))
writeFileSync(join(outDir, "docs-nav.json"), JSON.stringify(nav))
console.log(`docs index written: ${tree.length} languages, ${nav.length} English categories`)
