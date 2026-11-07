import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

/** A bordered panel the app mockups sit in. It is Orbit's own surface, with no fake window chrome. */
export function AppFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line-strong bg-[#08090a] shadow-2xl shadow-black/40",
        className,
      )}
    >
      {children}
    </div>
  )
}
