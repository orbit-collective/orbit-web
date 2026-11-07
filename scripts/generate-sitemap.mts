import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { getAvailableLangs, getFlatPages } from "../src/lib/docs"

const SITE_URL = "https://orbit-dev.app"
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))

const staticPaths = ["/", "/about", "/download", "/changelog"]

const docPaths = getAvailableLangs().flatMap((lang) => getFlatPages(lang).map((page) => page.href))

const allPaths = [...staticPaths, ...docPaths]

const urls = allPaths
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

writeFileSync(join(projectRoot, "public/sitemap.xml"), xml)
console.log(`sitemap.xml written with ${allPaths.length} URLs`)
