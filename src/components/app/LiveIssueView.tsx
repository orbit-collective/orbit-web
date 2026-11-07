import { ArrowLeft, Bug, Link2, TriangleAlert } from "lucide-react"
import { people, types } from "./data"
import type { Person } from "./data"
import { motionVars } from "./motionVars"
import { Avatar } from "./parts"

/** Avatars of the other people looking at the same issue, as PresenceStack draws them. */
function PresenceStack({ users }: { users: Person[] }) {
  return (
    <div className="flex items-center -space-x-2">
      {users.map((user, index) => (
        // Teammates arrive one after another: each pops in with the app'"'"'s spring.
        <div
          key={user.id}
          style={motionVars({ i: index, step: "150ms", base: "350ms" })}
          className="m-pop rounded-full ring-2 ring-[var(--bg-color-hover)]"
        >
          <Avatar person={user} size="md" />
        </div>
      ))}
    </div>
  )
}

function joinNames(names: string[]): string {
  if (names.length < 2) return names.join("")
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
}

/** ConcurrentEditNotice: shown while someone else has the description open. */
function ConcurrentEditNotice({ names }: { names: string[] }) {
  return (
    // The warning appears once the second editor has arrived.
    <div
      style={motionVars({ base: "1000ms", y: "8px" })}
      className="m-rise flex items-start gap-2 rounded-lg border border-solid border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-[var(--text-color)]"
    >
      <TriangleAlert size={14} className="mt-0.5 shrink-0" />
      <p>
        <span className="font-medium">{joinNames(names)}</span> are editing this description too. Saving
        may overwrite their changes.
      </p>
    </div>
  )
}

const viewers = [people.priya, people.tom, people.jane]
const editors = [people.priya, people.tom]

/**
 * The top of an issue page while teammates are on it: who is looking, and the
 * warning that two people are editing the description at once.
 */
export function LiveIssueView() {
  const Icon = Bug

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-[var(--bg-color-hover)]">
      <header className="flex items-center justify-between gap-3 border-b border-solid border-[var(--border-color)] px-6 py-3">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="flex items-center justify-center rounded-full p-2">
            <ArrowLeft size={16} />
          </span>
          <span className="shrink-0 text-[var(--text-gray-color)]">Orbit</span>
          <span className="shrink-0 text-[var(--text-gray-color)]">/</span>
          <span className="flex min-w-0 items-center gap-1.5 text-[var(--text-color)]">
            <Icon size={16} color={types.bug.color} className="shrink-0" />
            <span className="truncate">#12 Fix login redirect after…</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <PresenceStack users={viewers} />
          <span className="flex items-center justify-center rounded-full p-2">
            <Link2 size={16} />
          </span>
        </div>
      </header>
      <div className="flex flex-col gap-4 px-6 py-6">
        <h1 className="m-rise text-2xl font-semibold text-[var(--text-color)]" style={motionVars({ base: "50ms" })}>
          Fix login redirect after session timeout
        </h1>
        <ConcurrentEditNotice names={editors.map((person) => person.name)} />
        <p className="m-rise text-sm leading-relaxed text-[var(--text-color)]" style={motionVars({ base: "150ms" })}>
          People who are sent to the login page after their session times out land on the dashboard
          instead of the page they were on. Keep the target across the redirect.
        </p>
      </div>
    </div>
  )
}
