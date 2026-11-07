import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Turns Orbit's CHANGELOG.md (written by release-please, fetched next to the
 * docs by scripts/fetch-docs.mjs) into src/generated/changelog.json, so the
 * /changelog page can show it without parsing markdown in the browser.
 *
 * The format it reads:
 *
 *   ## [0.13.0](https://github.com/o/r/compare/v0.12.0...v0.13.0) (2026-11-05)
 *   ### Features
 *   * **scope:** the change ([abc1234](https://github.com/o/r/commit/abc1234...))
 */
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(projectRoot, "src/content/CHANGELOG.md")
const outDir = join(projectRoot, "src/generated")

interface Commit {
  hash: string
  url: string
}

interface Change {
  scope?: string
  text: string
  commits: Commit[]
}

interface Section {
  title: string
  changes: Change[]
}

interface Release {
  version: string
  date: string
  compareUrl?: string
  sections: Section[]
}

const RELEASE_HEADING = /^##\s+\[?(\d+\.\d+\.\d+[^\]\s)]*)\]?(?:\(([^)]*)\))?\s*\((\d{4}-\d{2}-\d{2})\)\s*$/
// The trailing "([abc1234](url))" or "([a](u), [b](u))" that names the commit(s).
const COMMITS = /\s*\(((?:\[[0-9a-f]{7,40}\]\([^)]+\)(?:,\s*)?)+)\)\s*$/
const COMMIT = /\[([0-9a-f]{7,40})\]\(([^)]+)\)/g

function parseChange(line: string): Change {
  let text = line.replace(/^\*\s+/, "").trim()
  const commits: Commit[] = []

  const trailing = text.match(COMMITS)
  if (trailing) {
    for (const match of trailing[1].matchAll(COMMIT)) commits.push({ hash: match[1], url: match[2] })
    text = text.slice(0, trailing.index).trim()
  }

  const scoped = text.match(/^\*\*([^*]+?):\*\*\s*(.*)$/)
  return scoped ? { scope: scoped[1], text: scoped[2], commits } : { text, commits }
}

function parse(markdown: string): Release[] {
  const releases: Release[] = []
  let release: Release | undefined
  let section: Section | undefined

  for (const line of markdown.split("\n")) {
    const heading = line.match(RELEASE_HEADING)
    if (heading) {
      release = { version: heading[1], date: heading[3], compareUrl: heading[2] || undefined, sections: [] }
      releases.push(release)
      section = undefined
      continue
    }

    if (!release) continue

    const sectionHeading = line.match(/^###\s+(.+?)\s*$/)
    if (sectionHeading) {
      section = { title: sectionHeading[1], changes: [] }
      release.sections.push(section)
      continue
    }

    if (section && /^\*\s+/.test(line)) section.changes.push(parseChange(line))
  }

  // A release with nothing under it (release-please sometimes writes one) is not worth a card.
  return releases.filter((entry) => entry.sections.some((candidate) => candidate.changes.length > 0))
}

mkdirSync(outDir, { recursive: true })

if (existsSync(source)) {
  const releases = parse(readFileSync(source, "utf8"))
  writeFileSync(join(outDir, "changelog.json"), JSON.stringify(releases))
  const changes = releases.reduce((total, entry) => total + entry.sections.reduce((n, s) => n + s.changes.length, 0), 0)
  console.log(`changelog written: ${releases.length} releases, ${changes} changes`)
} else {
  writeFileSync(join(outDir, "changelog.json"), "[]")
  console.warn("src/content/CHANGELOG.md not found; /changelog will say there is nothing yet")
}
