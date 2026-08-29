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
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Orbit issue tracker features orbiting the product logo"
    >
      <OrbitRing
        sizeClassName="w-full h-full"
        items={outerItems}
        spinClassName="animate-orbit-slow"
        counterSpinClassName="animate-orbit-slow-reverse"
      />
      <OrbitRing
        sizeClassName="w-[62%] h-[62%]"
        items={innerItems}
        spinClassName="animate-orbit-fast"
        counterSpinClassName="animate-orbit-fast-reverse"
      />

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.07] blur-2xl" />

      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-canvas-hover">
        <LogoMark className="h-9 w-9" />
      </div>
    </div>
  )
}
