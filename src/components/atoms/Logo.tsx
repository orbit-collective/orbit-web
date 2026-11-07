import { cn } from "../../lib/cn"

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={24}
      height={22}
      decoding="async"
      className={cn("h-6 w-6 object-contain brightness-0 invert", className)}
    />
  )
}

interface LogoProps {
  className?: string
  markClassName?: string
}

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <LogoMark className={markClassName} />
      <span className="text-lg font-semibold tracking-tight">Orbit</span>
    </span>
  )
}
