import type { ReactNode } from "react"
import { DocsSidebar } from "../organisms/DocsSidebar"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"

interface DocsTemplateProps {
  lang: string
  activeCategory?: string
  activeSlug?: string
  children: ReactNode
}

export function DocsTemplate({ lang, activeCategory, activeSlug, children }: DocsTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-12">
        <DocsSidebar lang={lang} activeCategory={activeCategory} activeSlug={activeSlug} />
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
