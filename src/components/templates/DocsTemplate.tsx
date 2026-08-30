import type { ReactNode } from "react"
import { DocsNextLink } from "../molecules/DocsNextLink"
import { DocsPreviousLink } from "../molecules/DocsPreviousLink"
import { DocsSidebar } from "../organisms/DocsSidebar"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"
import { getAdjacentPages } from "../../lib/docs"

interface DocsTemplateProps {
  lang: string
  activeCategory?: string
  activeSlug?: string
  children: ReactNode
}

export function DocsTemplate({ lang, activeCategory, activeSlug, children }: DocsTemplateProps) {
  const currentHref = activeSlug
    ? `/learn/${lang}/${activeCategory}/${activeSlug}`
    : activeCategory
      ? `/learn/${lang}/${activeCategory}`
      : `/learn/${lang}`

  const { previous, next } = getAdjacentPages(lang, currentHref)

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-12">
        <DocsSidebar lang={lang} activeCategory={activeCategory} activeSlug={activeSlug} />
        <main className="min-w-0 flex-1 pb-16">
          {children}
          {previous || next ? (
            <div className="mt-16 flex items-start justify-between gap-4">
              <div>{previous ? <DocsPreviousLink title={previous.title} href={previous.href} /> : null}</div>
              <div>{next ? <DocsNextLink title={next.title} href={next.href} /> : null}</div>
            </div>
          ) : null}
        </main>
      </div>
      <Footer />
    </div>
  )
}
