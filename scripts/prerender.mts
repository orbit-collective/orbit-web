import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { AppRoutes } from "../src/routes"
import { LearnPage } from "../src/pages/LearnPage"
import { getAvailableLangs, getFlatPages, preloadDocRoute } from "../src/lib/docs"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(projectRoot, "dist")
const templatePath = join(distDir, "index.html")

if (!existsSync(templatePath)) {
  console.error("dist/index.html not found — run `vite build` before prerendering.")
  process.exit(1)
}

const template = readFileSync(templatePath, "utf8")

const staticPaths = ["/", "/about", "/download"]
// Served by netlify.toml for any URL that has no file, with a real 404 status.
const NOT_FOUND_PATH = "/404"
const docPaths = getAvailableLangs().flatMap((lang) => getFlatPages(lang).map((page) => page.href))
const paths = [...staticPaths, ...docPaths, NOT_FOUND_PATH]

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree to the
// front of the renderToString() output — this pulls that leading run back out
// so it can be placed in <head>, with the rest going into <div id="root">.
const HEAD_TAG_RUN = /^(?:<title>.*?<\/title>|<meta[^>]*\/>|<link[^>]*\/>)+/s

function splitHoistedHead(appHtml: string): { head: string; body: string } {
  const match = appHtml.match(HEAD_TAG_RUN)
  if (!match) return { head: "", body: appHtml }
  return { head: match[0], body: appHtml.slice(match[0].length) }
}

function langFor(path: string): string {
  const match = path.match(/^\/learn\/([a-z]{2})(?:\/|$)/)
  return match ? match[1] : "en"
}

function outputPathFor(path: string): string {
  if (path === "/") return join(distDir, "index.html")
  if (path === NOT_FOUND_PATH) return join(distDir, "404.html")
  return join(distDir, path.replace(/^\//, ""), "index.html")
}

for (const path of paths) {
  const isLearnRoute = path.startsWith("/learn")

  // renderToString can't wait, so the page body must already be in the cache.
  if (isLearnRoute) await preloadDocRoute(path)

  const appHtml = renderToString(
    createElement(
      StaticRouter,
      { location: path },
      createElement(AppRoutes, {
        learnPageElement: isLearnRoute ? createElement(LearnPage) : undefined,
      }),
    ),
  )

  const { head, body } = splitHoistedHead(appHtml)

  const html = template
    .replace(/<html[^>]*>/, `<html lang="${langFor(path)}">`)
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta\s+name="description"[^>]*\/>/s, "")
    .replace("</head>", `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  const outputPath = outputPathFor(path)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html)
}

console.log(`Prerendered ${paths.length} routes.`)
