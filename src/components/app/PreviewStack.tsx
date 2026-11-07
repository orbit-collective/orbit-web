import type { ReactNode } from "react"
import { cn } from "../../lib/cn"
import { AppFrame } from "./AppFrame"
import { ScaledFrame } from "./ScaledFrame"

export interface PreviewPanel {
  /** Describes the panel for assistive tech. */
  label: string
  /** The size the view is laid out at, in px. */
  width: number
  height: number
  view: ReactNode
}

interface PreviewStackProps {
  panels: PreviewPanel[]
  activeIndex: number
  /** Sets the height of the box every panel is centred in. */
  className?: string
  /**
   * Render only the active panel, in normal flow. For layouts that show one
   * panel per section: no stacked copies of the others and no fixed height.
   */
  single?: boolean
}

/**
 * Shows one of several app views at a time, crossfading between them in a box
 * of fixed height so a scroll-driven section never changes size. A panel never
 * grows beyond its real size, however much room it is given.
 */
export function PreviewStack({ panels, activeIndex, className, single }: PreviewStackProps) {
  if (single) {
    const panel = panels[activeIndex]

    return (
      <div className={cn("mx-auto w-full", className)} style={{ maxWidth: panel.width }}>
        <AppFrame>
          <ScaledFrame
            width={panel.width}
            height={panel.height}
            label={panel.label}
            initialScale={0.8}
            minScale={0.6}
          >
            {panel.view}
          </ScaledFrame>
        </AppFrame>
      </div>
    )
  }

  return (
    <div className={cn("relative mx-auto w-full", className)}>
      {panels.map((panel, index) => {
        const isActive = index === activeIndex

        return (
          <div
            key={panel.label}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-out",
              isActive ? "scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0",
            )}
          >
            <div className="w-full" style={{ maxWidth: panel.width }}>
              <AppFrame>
                <ScaledFrame
                  width={panel.width}
                  height={panel.height}
                  label={panel.label}
                  initialScale={0.8}
                  minScale={0.6}
                  active={isActive}
                >
                  {panel.view}
                </ScaledFrame>
              </AppFrame>
            </div>
          </div>
        )
      })}
    </div>
  )
}
