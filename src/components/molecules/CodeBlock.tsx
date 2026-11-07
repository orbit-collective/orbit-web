import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ComponentPropsWithoutRef } from "react"
import type { ExtraProps } from "react-markdown"
import { cn } from "../../lib/cn"

const RESET_AFTER_MS = 1800

/** A <pre> from the docs with a copy button that appears on hover or keyboard focus. */
export function CodeBlock({
  children,
  className,
  node,
  ...props
}: ComponentPropsWithoutRef<"pre"> & ExtraProps) {
  void node // react-markdown's syntax tree node: not a DOM attribute, so it must not reach <pre>

  const preRef = useRef<HTMLPreElement>(null)
  const timeout = useRef<number | undefined>(undefined)
  const [copied, setCopied] = useState(false)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const copy = async () => {
    const text = preRef.current?.innerText ?? ""
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // Clipboard blocked (insecure origin, denied): leave the button as it was.
    }
    setCopied(true)
    window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => setCopied(false), RESET_AFTER_MS)
  }

  return (
    <div className="group/code relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute top-2 right-2 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-line-strong bg-canvas-hover px-2 text-xs font-medium text-ink-muted transition-[opacity,color] duration-150 ease-in-out hover:text-ink focus-visible:opacity-100",
          copied ? "text-ink opacity-100" : "opacity-0 group-hover/code:opacity-100 [@media(hover:none)]:opacity-100",
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  )
}
