import type { LucideIcon } from "lucide-react"
import { IconBadge } from "../atoms/IconBadge"
import { cn } from "../../lib/cn"

interface OrbitItem {
  icon: LucideIcon
  angle: number
}

interface OrbitRingProps {
  sizeClassName: string
  items: OrbitItem[]
  spinClassName: string
  counterSpinClassName: string
}

export function OrbitRing({
  sizeClassName,
  items,
  spinClassName,
  counterSpinClassName,
}: OrbitRingProps) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line",
        sizeClassName,
      )}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0", spinClassName)}>
        {items.map(({ icon, angle }) => (
          <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
            <div
              className="absolute left-1/2 top-0"
              style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
            >
              <div className={counterSpinClassName}>
                <IconBadge icon={icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
