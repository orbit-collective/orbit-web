import {
  Activity,
  Bell,
  Calendar,
  FolderGit2,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Users,
} from "lucide-react"
import { LogoMark } from "../atoms/Logo"
import { OrbitRing } from "../molecules/OrbitRing"

const outerItems = [
  { icon: ListChecks, angle: 0 },
  { icon: LayoutDashboard, angle: 72 },
  { icon: Bell, angle: 144 },
  { icon: GitBranch, angle: 216 },
  { icon: Activity, angle: 288 },
]

const innerItems = [
  { icon: Calendar, angle: 40 },
  { icon: Users, angle: 160 },
  { icon: FolderGit2, angle: 280 },
]

export function OrbitGraphic() {
  return (
    <div
      // The rings spin square boxes, whose corners briefly stick out of the graphic and
      // widen the page on a phone. Everything visible fits inside, so clip it.
      className="relative mx-auto aspect-square w-full max-w-[260px] overflow-clip sm:max-w-[340px] md:max-w-[420px]"
      role="img"
      aria-label="Orbit issue tracker features orbiting the product logo"
    >
      <OrbitRing
        sizeClassName="w-[84%] h-[84%]"
        items={outerItems}
        spinClassName="animate-orbit-slow"
        counterSpinClassName="animate-orbit-slow-reverse"
      />
      <OrbitRing
        sizeClassName="w-[54%] h-[54%]"
        items={innerItems}
        spinClassName="animate-orbit-fast"
        counterSpinClassName="animate-orbit-fast-reverse"
      />

      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.07] blur-2xl sm:h-24 sm:w-24" />

      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-canvas-hover sm:h-20 sm:w-20">
        <LogoMark className="h-3 w-3 sm:h-[1.1rem] sm:w-[1.1rem]" />
      </div>
    </div>
  )
}
