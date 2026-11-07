import { Search } from "lucide-react"
import { useSyncExternalStore } from "react"
import { cn } from "../../lib/cn"

interface SearchButtonProps {
  onClick: () => void
  /** Called on hover/focus so the search code can be fetched before it is needed. */
  onWarm?: () => void
  className?: string
}

const subscribe = () => () => {}
const detectMac = () => /mac|iphone|ipad/i.test(navigator.platform)
const assumeNotMac = () => false

/** "Search docs  ⌘K" pill. The shortcut label depends on the platform, so it
 * is decided after mount and the prerendered HTML always says Ctrl. */
export function SearchButton({ onClick, onWarm, className }: SearchButtonProps) {
  // The server snapshot is what the prerendered HTML and hydration use.
  const isMac = useSyncExternalStore(subscribe, detectMac, assumeNotMac)

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onWarm}
      onFocus={onWarm}
      aria-label="Search the documentation"
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-ink-muted transition-colors duration-150 ease-in-out hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      <Search className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      <span>Search</span>
      <kbd className="ml-2 rounded border border-line-strong px-1.5 py-0.5 text-[10px] font-medium [@media(hover:none)]:hidden">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  )
}
