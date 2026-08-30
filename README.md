<img width="1672" height="941" alt="Orbit Banner" src="public/defaultbanner.jpg" />

<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/github/last-commit/orbit-collective/orbit-web.svg?variant=secondary&amp;size=sm&amp;mode=dark"><img alt="Last commit" src="https://www.shieldcn.dev/github/last-commit/orbit-collective/orbit-web.svg?variant=secondary&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/github/commits/orbit-collective/orbit-web.svg?variant=secondary&amp;size=sm&amp;mode=dark"><img alt="Commits" src="https://www.shieldcn.dev/github/commits/orbit-collective/orbit-web.svg?variant=secondary&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/github/closed-prs/orbit-collective/orbit-web.svg?variant=ghost&amp;size=sm&amp;mode=dark"><img alt="Closed PRs" src="https://www.shieldcn.dev/github/closed-prs/orbit-collective/orbit-web.svg?variant=ghost&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/badge/Package_mgr-npm-CB3837.svg?logo=npm&amp;variant=branded&amp;size=sm&amp;mode=dark"><img alt="Package mgr · npm" src="https://www.shieldcn.dev/badge/Package_mgr-npm-CB3837.svg?logo=npm&amp;variant=branded&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&amp;variant=branded&amp;size=sm&amp;mode=dark"><img alt="Language · TypeScript" src="https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&amp;variant=branded&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/badge/Bundler-Vite-646CFF.svg?logo=vite&amp;variant=branded&amp;size=sm&amp;mode=dark"><img alt="Bundler · Vite" src="https://www.shieldcn.dev/badge/Bundler-Vite-646CFF.svg?logo=vite&amp;variant=branded&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/badge/CSS-Tailwind-06B6D4.svg?logo=tailwindcss&amp;variant=branded&amp;size=sm&amp;mode=dark"><img alt="CSS · Tailwind" src="https://www.shieldcn.dev/badge/CSS-Tailwind-06B6D4.svg?logo=tailwindcss&amp;variant=branded&amp;size=sm&amp;mode=light"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="https://www.shieldcn.dev/badge/Stack-React-61DAFB.svg?logo=react&amp;variant=ghost&amp;size=sm&amp;mode=dark&amp;theme=purple"><img alt="React" src="https://www.shieldcn.dev/badge/Stack-React-61DAFB.svg?logo=react&amp;variant=ghost&amp;size=sm&amp;mode=light&amp;theme=purple"></picture>
[![Netlify Status](https://api.netlify.com/api/v1/badges/3d5bf569-0c4f-4013-b992-85022b32944b/deploy-status)](https://app.netlify.com/projects/getorbitdev/deploys)

# Orbit Web

The marketing site and public developer docs for [Orbit](https://github.com/orbit-collective/orbit) — a self-hosted issue and project tracker. This is a separate static site, not the app itself: a landing page, `/about`, `/download`, and a `/learn` section that mirrors Orbit's own `documentation/` folder, kept in sync automatically.

## What's inside

- **Landing page** — hero, feature highlights, an interactive "how it works" walkthrough, and a scroll-driven deep dive into a few subsystems, all built from small atomic-design components (`src/components/{atoms,molecules,organisms,templates}`).
- **`/about`** and **`/download`** — static pages with the same component system, no separate CMS.
- **`/learn`** — a bilingual (EN/PL) documentation browser rendering Orbit's real `documentation/` folder as markdown (`react-markdown` + `remark-gfm`, syntax highlighting via `rehype-highlight`), with a sidebar, previous/next navigation, and a "View on GitHub" link back to the source file on every page.
- **SEO baked in** — per-page `<title>`/description/canonical/`hreflang`, Open Graph + Twitter cards, JSON-LD (`SoftwareApplication`, `BreadcrumbList`), a generated `sitemap.xml`, and full static prerendering of every route (see [How the docs stay in sync](#how-the-docs-stay-in-sync) and [Prerendering](#prerendering) below).

## Tech stack

| Layer      | Technology                                          |
|------------|------------------------------------------------------|
| Framework  | React 19, TypeScript, Vite                          |
| Routing    | React Router 7                                      |
| Styling    | Tailwind CSS 4, `@tailwindcss/typography`            |
| Content    | Markdown fetched from Orbit's `documentation/` folder |
| Hosting    | Netlify (static, with a full prerender step)         |

Components follow **atomic design** (atoms → molecules → organisms → templates → pages), same convention as the main Orbit app.

## Getting started

```bash
git clone https://github.com/orbit-collective/orbit-web.git
cd orbit-web
npm install
npm run dev
```

`npm run dev` fetches the latest `documentation/` from Orbit before starting the dev server (see below) — no separate setup step needed.

## Everyday commands

```bash
npm run dev         # fetches docs, then starts the Vite dev server
npm run build       # fetches docs, generates sitemap.xml, type-checks, builds, then prerenders every route
npm run lint        # ESLint
npm run preview     # preview a production build locally
npm run fetch-docs  # manually re-fetch documentation/ without starting anything
```

## How the docs stay in sync

`/learn` isn't hand-written here — `scripts/fetch-docs.mjs` does a shallow, sparse `git clone` of Orbit's `documentation/` folder into `src/content/docs/` before every dev run and build (it's gitignored in this repo). A GitHub Action in the main [Orbit repo](https://github.com/orbit-collective/orbit) calls a Netlify build hook whenever `documentation/` changes on `master`, so this site rebuilds and republishes automatically — no manual step, no drift.

## Prerendering

This is a client-rendered React SPA, but every known route (the static pages plus every `/learn` page in both languages) is rendered to real static HTML after each build — `scripts/prerender.mts`, run via `vite-node` as a `postbuild` step. That's what makes per-page titles, descriptions, and Open Graph tags actually visible to crawlers and link-preview bots that don't execute JavaScript, not just to browsers.

## Project structure

```
src/
  components/
    atoms/       Smallest building blocks (Button, Logo, Seo, ...)
    molecules/   Composed from atoms (NavLink, FeatureCard, DocsNextLink, ...)
    organisms/   Composed from molecules (Navbar, Hero, DocsContent, DocsSidebar, ...)
    templates/   Page-level layout (LandingTemplate, DocsTemplate, ...)
  pages/         Route components (HomePage, AboutPage, LearnPage, ...)
  lib/           docs.ts (parses the fetched markdown into a lang/category/guide tree), docLinks.ts, cn.ts
  hooks/         useScrollProgress, useParallax, useInView, ...
  content/docs/  Fetched from Orbit at build time — not committed

scripts/
  fetch-docs.mjs        Pulls documentation/ from the Orbit repo
  generate-sitemap.mts   Builds sitemap.xml from every known route
  prerender.mts           Renders every route to static HTML after build
```
