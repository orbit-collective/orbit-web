import { Link2 } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"
import type { ExtraProps } from "react-markdown"

interface DocHeadingProps extends ComponentPropsWithoutRef<"h2">, ExtraProps {
  level: 2 | 3
}

/** An h2/h3 from the docs with a link to itself, shown on hover or keyboard focus. */
export function DocHeading({ level, id, children, node, ...props }: DocHeadingProps) {
  void node // react-markdown's syntax tree node: not a DOM attribute
  const Tag = level === 2 ? "h2" : "h3"

  return (
    <Tag id={id} className="group/heading" {...props}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 inline-flex translate-y-0.5 align-middle text-ink-muted no-underline opacity-0 transition-opacity duration-150 ease-in-out group-hover/heading:opacity-100 hover:text-ink focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <Link2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </a>
      ) : null}
    </Tag>
  )
}
