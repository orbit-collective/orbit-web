import { useLayoutEffect, useRef } from "react"
import type { ReactNode } from "react"
import { cn } from "../../lib/cn"
import { MotionStage } from "./MotionStage"

interface ScaledFrameProps {
  /** The size the view is laid out at, in px: how big it is in the real app. */
  width: number
  height: number
  /** A description for assistive tech; the view itself is decorative. */
  label: string
  children: ReactNode
  className?: string
  /** The scale used in the prerendered HTML, before the real width is known. */
  initialScale?: number
  /**
   * The smallest scale to shrink to. A narrower container scrolls sideways
   * instead of making the text unreadable, which is what a phone gets.
   */
  minScale?: number
  /**
   * Play the view's animations when it appears. Turn off when the children
   * bring their own stages (a stack of views that each replay on their own).
   */
  stage?: boolean
  /** Replay the animations each time this turns back on. */
  active?: boolean
  /** Start playing on first paint, from the prerendered HTML. */
  autoplay?: boolean
  /** Hold the animations back by this much (a CSS time, e.g. "500ms"). */
  delay?: string
}

/**
 * Shows a view of the Orbit app at its real size, scaled down to fit its
 * container. The views are laid out at `width` x `height` px so that their
 * proportions, line breaks and spacing are exactly the app's, and one CSS
 * transform fits them to whatever room the page gives them.
 *
 * The frame keeps the aspect ratio, so it reserves its height before the
 * scale is applied and nothing shifts. The scale is written straight to the
 * elements, which keeps resizing off React's render path.
 */
export function ScaledFrame({
  width,
  height,
  label,
  children,
  className,
  initialScale = 0.5,
  minScale = 0,
  stage = true,
  active,
  autoplay,
  delay,
}: ScaledFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const sizerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const sizer = sizerRef.current
    const view = viewRef.current
    if (!frame || !sizer || !view) return

    const fit = () => {
      const fitted = Math.max(frame.clientWidth, width * minScale)
      sizer.style.width = `${fitted}px`
      view.style.transform = `scale(${fitted / width})`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [width, minScale])

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={label}
      className={cn("no-scrollbar relative w-full overflow-x-auto overflow-y-hidden", className)}
    >
      <div ref={sizerRef} className="relative" style={{ width: "100%", aspectRatio: `${width} / ${height}` }}>
        <div
          ref={viewRef}
          aria-hidden="true"
          className="orbit-app pointer-events-none absolute top-0 left-0 origin-top-left select-none"
          style={{ width, height, transform: `scale(${initialScale})` }}
        >
          {stage ? (
            <MotionStage className="h-full" active={active} autoplay={autoplay} delay={delay}>
              {children}
            </MotionStage>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
