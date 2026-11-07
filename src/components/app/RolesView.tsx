import { Crown, Eye, Lock, Plus, ShieldCheck, Sparkles, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"

interface Role {
  name: string
  members: string
  percent: number
  icon: LucideIcon
  system: boolean
  selected?: boolean
  // The role colours as full class names, so Tailwind finds them.
  tile: string
  ring: string
}

const roles: Role[] = [
  { name: "Owner", members: "1 member", percent: 100, icon: Crown, system: true, tile: "bg-amber-400/10 text-amber-400", ring: "stroke-amber-400" },
  { name: "Admin", members: "2 members", percent: 75, icon: ShieldCheck, system: true, tile: "bg-emerald-400/10 text-emerald-400", ring: "stroke-emerald-400" },
  { name: "Member", members: "8 members", percent: 33, icon: User, system: true, selected: true, tile: "bg-violet-400/10 text-violet-400", ring: "stroke-violet-400" },
  { name: "Viewer", members: "3 members", percent: 17, icon: Eye, system: true, tile: "bg-sky-400/10 text-sky-400", ring: "stroke-sky-400" },
  { name: "QA Engineer", members: "1 member", percent: 25, icon: Sparkles, system: false, tile: "bg-slate-400/10 text-slate-400", ring: "stroke-slate-400" },
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
          {percent}
        </span>
      </div>
      <span className="text-[8px] font-semibold tracking-wide text-[var(--text-gray-color)] uppercase">
        % perms
      </span>
    </div>
  )
}

function RoleItem({ role }: { role: Role }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border p-3 text-left",
        role.selected
          ? "border-[var(--accent-color)] bg-[var(--accent-color-opacity)] shadow-[0_0_0_1px_var(--accent-color)]"
          : "border-[var(--border-color)] bg-[var(--bg-color)]",
      )}
    >
      {role.selected ? <span className="absolute inset-y-0 left-0 w-0.5 bg-[var(--accent-color)]" /> : null}
      <div className="flex items-center gap-2.5">
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", role.tile)}>
          <role.icon size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="min-w-0 truncate text-sm font-medium text-[var(--text-color)]">{role.name}</p>
            {role.system ? <Lock size={12} className="shrink-0 text-[var(--text-gray-color)]" /> : null}
          </div>
          <p className="truncate text-[11px] text-[var(--text-gray-color)]">{role.members}</p>
        </div>
        <PermissionRing percent={role.percent} colorClass={role.ring} />
      </div>
    </div>
  )
}

/** Settings > Roles: the system roles, a custom one, and how much of the permission set each grants. */
export function RolesView() {
  return (
    <div className="flex h-full items-start justify-center bg-[var(--bg-color)]">
      <div className="w-[300px] space-y-2 p-4">
        {roles.map((role) => (
          <RoleItem key={role.name} role={role} />
        ))}
        <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--bg-light-color)] px-3 py-2.5 text-xs font-semibold text-[var(--text-gray-color)]">
          <Plus size={13} />
          Create role
        </div>
      </div>
    </div>
  )
}
