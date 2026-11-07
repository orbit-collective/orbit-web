import type { CSSProperties, ReactNode } from "react"
import { cn } from "../../lib/cn"
import { useMotionStage } from "../../hooks/useMotionStage"

interface MotionStageProps {
  children: ReactNode
  className?: string
  autoplay?: boolean
  active?: boolean
  /** Holds every animation back by this much, e.g. while the frame around the stage is still fading in. */
  delay?: string
}

/**
 * The root of a set of app mockup animations. Everything inside that carries
 * an .m-* class (and every CountUp) plays from here: when the stage scrolls
 * into view, and again whenever `active` turns back on. Stages do not nest.
 */
export function MotionStage({ children, className, autoplay, active, delay }: MotionStageProps) {
  const ref = useMotionStage<HTMLDivElement>({ autoplay, active })

  return (
    <div
      ref={ref}
      data-motion-root=""
      data-motion={autoplay ? "playing" : undefined}
      data-motion-autoplay={autoplay ? "" : undefined}
      className={cn(autoplay && "m-on", className)}
      style={delay ? ({ "--m-stage-delay": delay } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
