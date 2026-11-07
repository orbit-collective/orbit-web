import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/cn"

const RESET_AFTER_MS = 1800

interface CopyCommandProps {
  command: string
  className?: string
}

/** A shell command in a pill with a button that copies it. */
export function CopyCommand({ command, className }: CopyCommandProps) {
  const timeout = useRef<number | undefined>(undefined)
  const [copied, setCopied] = useState(false)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      return // Clipboard blocked: leave the button as it was.
    }
    setCopied(true)
    window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => setCopied(false), RESET_AFTER_MS)
  }

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-3 rounded-lg border border-line bg-surface py-2 pr-2 pl-4 font-mono text-[13px] text-ink-muted",
        className,
      )}
    >
      <code className="min-w-0 truncate">
        <span className="text-accent select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors duration-150 ease-in-out hover:bg-surface hover:text-ink"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </button>
    </div>
  )
}
