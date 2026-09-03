import { useParams } from "react-router-dom"
import { Seo, SITE_URL } from "../components/atoms/Seo"
import { DocsContent } from "../components/organisms/DocsContent"
import { DocsTemplate } from "../components/templates/DocsTemplate"
import { getAlternatePaths, getCategory, getGuide, getLangIndex } from "../lib/docs"
import { NotFoundPage } from "./NotFoundPage"

interface BreadcrumbItem {
  name: string
  path: string
}

function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function LearnPage() {
  const { lang = "en", category, slug } = useParams()

  const langIndex = getLangIndex(lang)
  if (!langIndex) {
    return <NotFoundPage />
  }

  if (!category) {
    return (
      <>
        <Seo
          title={`${langIndex.title} · Orbit`}
          description={langIndex.description}
          path={`/learn/${lang}`}
          lang={lang}
          alternates={getAlternatePaths()}
          jsonLd={buildBreadcrumbJsonLd([
            { name: "Learn", path: `/learn/${lang}` },
          ])}
        />
        <DocsTemplate lang={lang} headings={langIndex.headings}>
          <DocsContent lang={lang} content={langIndex.content} githubUrl={langIndex.githubUrl} />
        </DocsTemplate>
      </>
    )
  }

  const categoryData = getCategory(lang, category)
  if (!categoryData) {
    return <NotFoundPage />
  }

  if (!slug) {
    return (
      <>
        <Seo
          title={`${categoryData.title} · Orbit`}
          description={categoryData.readme.description}
          path={`/learn/${lang}/${category}`}
          lang={lang}
          alternates={getAlternatePaths(category)}
          jsonLd={buildBreadcrumbJsonLd([
            { name: "Learn", path: `/learn/${lang}` },
            { name: categoryData.title, path: `/learn/${lang}/${category}` },
          ])}
        />
        <DocsTemplate lang={lang} activeCategory={category} headings={categoryData.readme.headings}>
          <DocsContent
            lang={lang}
            category={category}
            eyebrow={categoryData.title}
            content={categoryData.readme.content}
            githubUrl={categoryData.readme.githubUrl}
          />
        </DocsTemplate>
      </>
    )
  }

  const guide = getGuide(lang, category, slug)
  if (!guide) {
    return <NotFoundPage />
  }

  return (
    <>
      <Seo
        title={`${guide.title} · Orbit`}
        description={guide.description}
        path={`/learn/${lang}/${category}/${slug}`}
        lang={lang}
        alternates={getAlternatePaths(category, slug)}
        jsonLd={buildBreadcrumbJsonLd([
          { name: "Learn", path: `/learn/${lang}` },
          { name: categoryData.title, path: `/learn/${lang}/${category}` },
          { name: guide.title, path: `/learn/${lang}/${category}/${slug}` },
        ])}
      />
      <DocsTemplate lang={lang} activeCategory={category} activeSlug={slug} headings={guide.headings}>
        <DocsContent
          lang={lang}
          category={category}
          eyebrow={categoryData.title}
          content={guide.content}
          githubUrl={guide.githubUrl}
        />
      </DocsTemplate>
    </>
  )
}
