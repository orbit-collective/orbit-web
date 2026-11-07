import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/cn"
import { TransitionLink } from "./TransitionLink"

type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md"

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-ink border border-transparent",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:bg-surface hover:border-line-strong",
  ghost:
    "bg-transparent text-ink-muted border border-transparent hover:text-ink hover:bg-surface",
}

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
}

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none"

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
  href?: string
  external?: boolean
  onClick?: () => void
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <TransitionLink to={href} className={classes} onClick={onClick}>
        {children}
      </TransitionLink>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
