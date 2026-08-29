import { Check, Filter, MessagesSquare } from "lucide-react"
import { mockPanelClass } from "../../lib/mockPanel"
import { MockupFrame } from "../atoms/MockupFrame"

interface DeepDivePreviewProps {
  activeIndex: number
}

const roles = [
  { role: "Owner", width: "60%" },
  { role: "Admin", width: "45%" },
  { role: "Member", width: "50%" },
]

const activeFilters = ["Assignee: me", "Status: Active", "Label: Bug"]

const activityEntries = [
  { titleWidth: "70%", metaWidth: "35%" },
  { titleWidth: "55%", metaWidth: "40%" },
  { titleWidth: "62%", metaWidth: "30%" },
]

export function DeepDivePreview({ activeIndex }: DeepDivePreviewProps) {
  return (
    <MockupFrame className="mx-auto w-full max-w-xs sm:max-w-sm">
      <div className="relative h-64 sm:h-72">
        <div aria-hidden={activeIndex !== 0} className={mockPanelClass(activeIndex === 0)}>
          <div className="flex flex-col gap-2.5 px-6">
            {roles.map((member, index) => (
              <div
                key={member.role}
                className="flex items-center gap-3 rounded-md border border-line bg-canvas-hover px-3 py-2.5"
                style={{ transitionDelay: activeIndex === 0 ? `${index * 100}ms` : "0ms" }}
              >
                <span className="h-6 w-6 shrink-0 rounded-full border border-line-strong" />
                <span className="h-2 rounded-full bg-line-strong" style={{ width: member.width }} />
                <span className="ml-auto rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden={activeIndex !== 1} className={mockPanelClass(activeIndex === 1)}>
          <div className="flex flex-col gap-4 px-6">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-line-strong bg-canvas-hover px-3 py-1 text-[11px] font-medium text-ink"
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
              <Filter className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="h-2 w-24 rounded-full bg-line" />
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[10px] font-medium text-accent-ink">
                <Check className="h-2.5 w-2.5" aria-hidden="true" />
                Saved
              </span>
            </div>
          </div>
        </div>

        <div aria-hidden={activeIndex !== 2} className={mockPanelClass(activeIndex === 2)}>
          <div className="flex flex-col gap-4 px-6">
            {activityEntries.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
                style={{ transitionDelay: activeIndex === 2 ? `${index * 100}ms` : "0ms" }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-line-strong" style={{ width: entry.titleWidth }} />
                  <div className="mt-1.5 h-1.5 rounded-full bg-line" style={{ width: entry.metaWidth }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden={activeIndex !== 3} className={mockPanelClass(activeIndex === 3)}>
          <div className="flex flex-col items-center gap-4 px-6">
            <div className="w-full max-w-[15rem] rounded-md border border-line-strong bg-canvas-hover p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong">
                  <MessagesSquare className="h-3 w-3 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="h-2 w-20 rounded-full bg-line-strong" />
                <span className="ml-auto h-2 w-2 rounded-full bg-accent" />
              </div>
              <div className="mt-2.5 h-2 w-full rounded-full bg-line" />
              <div className="mt-1.5 h-2 w-2/3 rounded-full bg-line" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-[11px] font-medium text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Connected to Discord
            </span>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
