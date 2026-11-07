import type { AnchorHTMLAttributes, ReactNode } from "react"
import type { ExtraProps } from "react-markdown"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { isExternalDocLink, resolveDocLink } from "../../lib/docLinks"
import { getPreviewForPath } from "../../lib/docs"
import { rehypePrism } from "../../lib/prism"
import { CodeBlock } from "../molecules/CodeBlock"
import { DocHeading } from "../molecules/DocHeading"
import { DocLinkPreviewCard } from "../molecules/DocLinkPreviewCard"
import { ViewOnGithubLink } from "../molecules/ViewOnGithubLink"

interface DocAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ExtraProps {
  lang: string
  category?: string
  children?: ReactNode
}

function DocAnchor({ href, lang, category, children, node }: DocAnchorProps) {
  // Derived from where the link sits in the markdown rather than useId(): the
  // docs chunk hydrates lazily, which gives useId a different tree path than
  // in the prerendered HTML and breaks aria-describedby.
  const tooltipId = `doc-link-${node?.position?.start.offset ?? href}`

  if (!href || isExternalDocLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  const resolved = resolveDocLink({ href, lang, category, filename: "current.md" })

  if (resolved.startsWith("/learn")) {
    const preview = getPreviewForPath(resolved)

    if (preview) {
      return (
        <span className="group relative inline-block">
          <Link to={resolved} aria-describedby={tooltipId}>
            {children}
          </Link>
          <DocLinkPreviewCard id={tooltipId} {...preview} />
        </span>
      )
    }

    return <Link to={resolved}>{children}</Link>
  }

  return (
    <a href={resolved} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

interface DocsContentProps {
  lang: string
  category?: string
  eyebrow?: string
  githubUrl?: string
  content: string
}

export function DocsContent({ lang, category, eyebrow, githubUrl, content }: DocsContentProps) {
  return (
    <article className="prose max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight">
      {eyebrow || githubUrl ? (
        <div className="mb-2 flex items-center justify-between gap-4 not-prose">
          {eyebrow ? <p className="text-sm font-medium text-ink-muted">{eyebrow}</p> : <span />}
          {githubUrl ? <ViewOnGithubLink href={githubUrl} /> : null}
        </div>
      ) : null}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypePrism, { ignoreMissing: true }]]}
        components={{
          a: (props) => <DocAnchor {...props} lang={lang} category={category} />,
          pre: (props) => <CodeBlock {...props} />,
          h2: (props) => <DocHeading level={2} {...props} />,
          h3: (props) => <DocHeading level={3} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
