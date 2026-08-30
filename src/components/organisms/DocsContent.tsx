import bash from "highlight.js/lib/languages/bash"
import php from "highlight.js/lib/languages/php"
import typescript from "highlight.js/lib/languages/typescript"
import type { AnchorHTMLAttributes, ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import { isExternalDocLink, resolveDocLink } from "../../lib/docLinks"
import { ViewOnGithubLink } from "../molecules/ViewOnGithubLink"

const HIGHLIGHT_LANGUAGES = { bash, php, ts: typescript, tsx: typescript }

interface DocAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  lang: string
  category?: string
  children?: ReactNode
}

function DocAnchor({ href, lang, category, children }: DocAnchorProps) {
  if (!href || isExternalDocLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  const resolved = resolveDocLink({ href, lang, category, filename: "current.md" })

  if (resolved.startsWith("/learn")) {
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
    <article className="prose max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
      {eyebrow || githubUrl ? (
        <div className="mb-2 flex items-center justify-between gap-4 not-prose">
          {eyebrow ? <p className="text-sm font-medium text-ink-muted">{eyebrow}</p> : <span />}
          {githubUrl ? <ViewOnGithubLink href={githubUrl} /> : null}
        </div>
      ) : null}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { languages: HIGHLIGHT_LANGUAGES, ignoreMissing: true }]]}
        components={{
          a: (props) => <DocAnchor {...props} lang={lang} category={category} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
