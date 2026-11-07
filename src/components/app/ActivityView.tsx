import { Pencil, Plus } from "lucide-react"
import type { ReactNode } from "react"
import { people } from "./data"
import type { Person } from "./data"
import { Avatar } from "./parts"

type Kind = "created" | "changed"

interface Entry {
  kind: Kind
  text: ReactNode
}

interface Group {
  ago: string
  person: Person
  entries: Entry[]
}

function IssueRef({ number }: { number: number }) {
  return (
    <span className="relative inline-flex items-center justify-center rounded-lg border border-transparent bg-[var(--bg-light-color)] px-2 py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--text-gray-color)]">
      #{number}
    </span>
  )
}

const groups: Group[] = [
  {
    ago: "3d ago",
    person: people.jane,
    entries: [
      {
        kind: "created",
        text: (
          <>
            Created issue <IssueRef number={12} /> &quot;Fix login redirect after session timeout&quot;
          </>
        ),
      },
    ],
  },
  {
    ago: "1d ago",
    person: people.marcus,
    entries: [{ kind: "changed", text: "Changed the status of #12 from Open to Fixing" }],
  },
  {
    ago: "23h ago",
    person: people.marcus,
    entries: [{ kind: "created", text: <>Added the label &quot;ux&quot; to #12</> }],
  },
  {
    ago: "2h ago",
    person: people.priya,
    entries: [
      { kind: "changed", text: "Changed the priority of #15 from Medium to Low" },
      { kind: "changed", text: "Moved #15 to In review" },
    ],
  },
]

/** The Activity view: every change, grouped by when it happened. */
export function ActivityView() {
  return (
    <div className="h-full bg-[var(--bg-color)] p-4">
      <div className="flex flex-col">
        {groups.map((group) => (
          <div key={group.ago}>
            <div className="mt-4 mb-3 flex items-center gap-2 first:mt-0">
              <span className="shrink-0 text-[10px] font-medium whitespace-nowrap text-[var(--text-muted-color)]">
                {group.ago}
              </span>
              <span className="h-px flex-1 bg-[var(--border-color)]" />
            </div>
            <div className="flex gap-3 pb-2">
              <Avatar person={group.person} size="lg" />
              <div className="min-w-0 flex-1 pt-0.5">
                <span className="truncate text-sm font-semibold text-[var(--text-color)]">
                  {group.person.name}
                </span>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {group.entries.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--text-gray-color)]"
                    >
                      {entry.kind === "created" ? (
                        <Plus size={14} className="mt-0.5 shrink-0 text-[var(--success-color)]" />
                      ) : (
                        <Pencil size={14} className="mt-0.5 shrink-0 text-[var(--info-color)]" />
                      )}
                      <span className="min-w-0 break-words">{entry.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
