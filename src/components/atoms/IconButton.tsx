import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/cn"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
  className?: string
}

export function IconButton({ label, children, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-in-out hover:bg-surface",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
