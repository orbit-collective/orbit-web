import { Crown, Eye, Lock, Plus, ShieldCheck, Sparkles, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"
import { useStageState } from "../../hooks/useStageState"
import { CountUp } from "./CountUp"
import { motionVars } from "./motionVars"

interface Role {
  name: string
  members: number
  percent: number
  icon: LucideIcon
  system: boolean
  // The role colours as full class names, so Tailwind finds them.
  tile: string
  ring: string
}

const roles: Role[] = [
  { name: "Owner", members: 1, percent: 100, icon: Crown, system: true, tile: "bg-amber-400/10 text-amber-400", ring: "stroke-amber-400" },
  { name: "Admin", members: 2, percent: 75, icon: ShieldCheck, system: true, tile: "bg-emerald-400/10 text-emerald-400", ring: "stroke-emerald-400" },
  { name: "Member", members: 8, percent: 33, icon: User, system: true, tile: "bg-violet-400/10 text-violet-400", ring: "stroke-violet-400" },
  { name: "Viewer", members: 3, percent: 17, icon: Eye, system: true, tile: "bg-sky-400/10 text-sky-400", ring: "stroke-sky-400" },
  { name: "QA Engineer", members: 1, percent: 25, icon: Sparkles, system: false, tile: "bg-slate-400/10 text-slate-400", ring: "stroke-slate-400" },
]

const RADIUS = 12
const CIRCUMFERENCE = RADIUS * 2 * Math.PI

function PermissionRing({ percent, colorClass }: { percent: number; colorClass: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative">
        <svg height="36" width="36" className="shrink-0 rotate-[-90deg]">
          <circle className="fill-transparent stroke-[var(--bg-light-color)]" strokeWidth="3" r={RADIUS} cx="18" cy="18" />
          <circle
            className={`fill-transparent ${colorClass}`}
            strokeWidth="3"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE}
            r={RADIUS}
            cx="18"
            cy="18"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--text-color)]">
          <CountUp value={percent} delay={150} />
        </span>
      </div>
      <span className="text-[8px] font-semibold tracking-wide text-[var(--text-gray-color)] uppercase">
        % perms
      </span>
    </div>
  )
}

function RoleItem({ role, index }: { role: Role; index: number }) {
  return (
    <div
      style={motionVars({ i: index })}
      className="m-rise relative h-[78px] w-full overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] p-3 text-left"
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", role.tile)}>
          <role.icon size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="min-w-0 truncate text-sm font-medium text-[var(--text-color)]">{role.name}</p>
            {role.system ? <Lock size={12} className="shrink-0 text-[var(--text-gray-color)]" /> : null}
          </div>
          <p className="truncate text-[11px] text-[var(--text-gray-color)]">
            <CountUp value={role.members} delay={100} /> {role.members === 1 ? "member" : "members"}
          </p>
        </div>
        <PermissionRing percent={role.percent} colorClass={role.ring} />
      </div>
    </div>
  )
}

/** Where the highlight starts, and how often it moves to the next role. */
const FIRST_SELECTED = 2
const GLIDE_EVERY_MS = 2600
/** A card is 78 px tall and the list has an 8 px gap. */
const PITCH = 86

/**
 * Settings > Roles: the system roles, a custom one, and how much of the
 * permission set each grants. The accent highlight glides from role to role
 * (the app's shared-layout animation) while the screen is playing; otherwise
 * it rests on Member.
 */
export function RolesView() {
  const ref = useRef<HTMLDivElement>(null)
  const state = useStageState(ref)
  const [selected, setSelected] = useState(FIRST_SELECTED)

  useEffect(() => {
    if (state !== "playing") return
    // A short pause so the cards have risen before the highlight starts moving.
    const interval = window.setInterval(() => setSelected((current) => (current + 1) % roles.length), GLIDE_EVERY_MS)
    return () => window.clearInterval(interval)
  }, [state])

  useEffect(() => {
    // Armed again (the view was reopened): start from the first position.
    if (state !== "armed") return
    const frame = requestAnimationFrame(() => setSelected(FIRST_SELECTED))
    return () => cancelAnimationFrame(frame)
  }, [state])

  return (
    <div ref={ref} className="flex h-full items-start justify-center bg-[var(--bg-color)]">
      <div className="relative w-[300px] p-4">
        <div className="space-y-2">
          {roles.map((role, index) => (
            <RoleItem key={role.name} role={role} index={index} />
          ))}
          <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--bg-light-color)] px-3 py-2.5 text-xs font-semibold text-[var(--text-gray-color)]">
            <Plus size={13} />
            Create role
          </div>
        </div>
        {/* The wrapper fades in with the cards; the highlight inside it is what moves. */}
        <div
          aria-hidden="true"
          className="m-rise pointer-events-none absolute inset-0"
          style={motionVars({ i: FIRST_SELECTED, y: "0px" })}
        >
          <div
            className="absolute top-4 left-4 h-[78px] w-[268px] overflow-hidden rounded-xl border border-[var(--accent-color)] bg-[var(--accent-color-opacity)] shadow-[0_0_0_1px_var(--accent-color)] transition-transform duration-[450ms] [transition-timing-function:var(--m-spring)]"
            style={{ transform: `translateY(${selected * PITCH}px)` }}
          >
            <span className="absolute inset-y-0 left-0 w-0.5 bg-[var(--accent-color)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
