import { useParams } from "react-router-dom"
import { DocsContent } from "../components/organisms/DocsContent"
import { DocsTemplate } from "../components/templates/DocsTemplate"
import { getCategory, getGuide, getLangIndex } from "../lib/docs"
import { NotFoundPage } from "./NotFoundPage"

export function LearnPage() {
  const { lang = "en", category, slug } = useParams()

  const langIndex = getLangIndex(lang)
  if (!langIndex) {
    return <NotFoundPage />
  }

  if (!category) {
    return (
      <DocsTemplate lang={lang}>
        <DocsContent lang={lang} content={langIndex.content} />
      </DocsTemplate>
    )
  }

  const categoryData = getCategory(lang, category)
  if (!categoryData) {
    return <NotFoundPage />
  }

  if (!slug) {
    return (
      <DocsTemplate lang={lang} activeCategory={category}>
        <DocsContent
          lang={lang}
          category={category}
          eyebrow={categoryData.title}
          content={categoryData.readme.content}
        />
      </DocsTemplate>
    )
  }

  const guide = getGuide(lang, category, slug)
  if (!guide) {
    return <NotFoundPage />
  }

  return (
    <DocsTemplate lang={lang} activeCategory={category} activeSlug={slug}>
      <DocsContent lang={lang} category={category} eyebrow={categoryData.title} content={guide.content} />
    </DocsTemplate>
  )
}
