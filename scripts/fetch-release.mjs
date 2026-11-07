import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Writes src/generated/release.json with the latest published Orbit release,
 * so the site can show the current version without a request at runtime.
 *
 * It never fails the build: when GitHub is unreachable or rate limited, a
 * previously generated file is kept, and otherwise an empty object is
 * written, which makes the site simply leave the version out.
 */
const API_URL = "https://api.github.com/repos/orbit-collective/orbit/releases/latest"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outDir = join(projectRoot, "src/generated")
const outFile = join(outDir, "release.json")

mkdirSync(outDir, { recursive: true })

try {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "orbit-web-build" }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const response = await fetch(API_URL, { headers, signal: AbortSignal.timeout(10_000) })
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`)

  const release = await response.json()
  const info = {
    version: String(release.tag_name),
    url: String(release.html_url),
    publishedAt: String(release.published_at),
  }
  writeFileSync(outFile, JSON.stringify(info))
  console.log(`latest release: ${info.version}`)
} catch (error) {
  if (existsSync(outFile)) {
    console.warn(`release lookup failed (${error.message}); keeping the previous release.json`)
  } else {
    writeFileSync(outFile, "{}")
    console.warn(`release lookup failed (${error.message}); the site will omit the version`)
  }
}
