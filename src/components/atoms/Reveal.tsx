import type { ReactNode } from "react"
import { useInView } from "../../hooks/useInView"
import { cn } from "../../lib/cn"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /**
   * For content that is on screen at load (heroes). It animates with a CSS
   * keyframe, so it plays on first paint from the prerendered HTML instead of
   * staying invisible until the JavaScript has loaded and hydrated.
   */
  eager?: boolean
}

function EagerReveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div className={cn("animate-reveal", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function ScrollReveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-reveal={isInView ? "shown" : "hidden"}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function Reveal({ eager, ...props }: RevealProps) {
  return eager ? <EagerReveal {...props} /> : <ScrollReveal {...props} />
}
