import type { ReactNode } from "react"
import { DocsNextLink } from "../molecules/DocsNextLink"
import { DocsPreviousLink } from "../molecules/DocsPreviousLink"
import { DocsSidebar } from "../organisms/DocsSidebar"
import { DocsToc } from "../organisms/DocsToc"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"
import { getAdjacentPages } from "../../lib/docs"
import type { DocHeading } from "../../lib/docs"

interface DocsTemplateProps {
  lang: string
  activeCategory?: string
  activeSlug?: string
  headings?: DocHeading[]
  /** False while the article body is still loading, so the contents list waits for it. */
  contentReady?: boolean
  children: ReactNode
}

export function DocsTemplate({
  lang,
  activeCategory,
  activeSlug,
  headings = [],
  contentReady = true,
  children,
}: DocsTemplateProps) {
  const currentHref = activeSlug
    ? `/learn/${lang}/${activeCategory}/${activeSlug}`
    : activeCategory
      ? `/learn/${lang}/${activeCategory}`
      : `/learn/${lang}`

  const { previous, next } = getAdjacentPages(lang, currentHref)

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-12">
        <DocsSidebar lang={lang} activeCategory={activeCategory} activeSlug={activeSlug} />
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 pb-16 outline-none">
          {children}
          {previous || next ? (
            // Two equal cells (stacked on a phone), so a long title wraps instead of pushing the page wider.
            <div className="mt-16 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {previous ? (
                <div className="min-w-0">
                  <DocsPreviousLink title={previous.title} href={previous.href} />
                </div>
              ) : null}
              {next ? (
                <div className="min-w-0 sm:col-start-2">
                  <DocsNextLink title={next.title} href={next.href} />
                </div>
              ) : null}
            </div>
          ) : null}
        </main>
        <DocsToc headings={headings} ready={contentReady} />
      </div>
      <Footer />
    </div>
  )
}
