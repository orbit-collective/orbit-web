import { useLayoutEffect, useRef } from "react"
import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

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
}

/**
 * Shows a view of the Orbit app at its real size, scaled down to fit its
 * container. The views are laid out at `width` x `height` px so that their
 * proportions, line breaks and spacing are exactly the app's, and one CSS
 * transform fits them to whatever room the page gives them.
 *
 * The frame keeps the aspect ratio, so it reserves its height before the
 * scale is applied and nothing shifts. The scale is written straight to the
 * element, which keeps resizing off React's render path.
 */
export function ScaledFrame({
  width,
  height,
  label,
  children,
  className,
  initialScale = 0.5,
}: ScaledFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const view = viewRef.current
    if (!frame || !view) return

    const fit = () => {
      view.style.transform = `scale(${frame.clientWidth / width})`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={label}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        ref={viewRef}
        aria-hidden="true"
        className="orbit-app pointer-events-none absolute top-0 left-0 origin-top-left select-none"
        style={{ width, height, transform: `scale(${initialScale})` }}
      >
        {children}
      </div>
    </div>
  )
}
