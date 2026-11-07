import { CircleCheck, Command, CornerDownLeft, GitBranch, GitPullRequest, Search } from "lucide-react"
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

const viewers = ["A", "M", "K"]

const paletteResults = [
  { label: "Go to issue ORB-142", hint: "Issue", active: true },
  { label: "Change status\u2026", hint: "Action", active: false },
  { label: "Assign to\u2026", hint: "Action", active: false },
]

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
          <div className="flex flex-col gap-3 px-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {viewers.map((initial) => (
                  <span
                    key={initial}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-canvas-hover text-[10px] font-medium text-ink"
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-medium text-ink-muted">3 viewing</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Live
              </span>
            </div>
            <div className="rounded-md border border-line bg-canvas-hover p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-28 rounded-full bg-line-strong" />
                <span className="ml-auto rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-medium text-ink">
                  In review
                </span>
              </div>
              <div className="mt-2.5 h-2 w-full rounded-full bg-line" />
              <div className="mt-1.5 h-2 w-3/5 rounded-full bg-line" />
            </div>
            <p className="rounded-md border border-line-strong px-3 py-2 text-[11px] text-ink-muted">
              <span className="font-medium text-ink">Anna</span> is editing this issue
            </p>
          </div>
        </div>

        <div aria-hidden={activeIndex !== 1} className={mockPanelClass(activeIndex === 1)}>
          <div className="flex flex-col gap-3 px-6">
            <div className="flex items-center gap-2 rounded-md border border-line-strong bg-canvas-hover px-3 py-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[11px] text-ink-muted">Search or run a command</span>
              <span className="ml-auto inline-flex items-center gap-0.5 rounded border border-line-strong px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
                <Command className="h-2.5 w-2.5" aria-hidden="true" />K
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {paletteResults.map((result, index) => (
                <div
                  key={result.label}
                  className={
                    result.active
                      ? "flex items-center gap-2 rounded-md border border-line-strong bg-canvas-hover px-3 py-2"
                      : "flex items-center gap-2 rounded-md border border-transparent px-3 py-2"
                  }
                  style={{ transitionDelay: activeIndex === 1 ? `${index * 80}ms` : "0ms" }}
                >
                  <span className={result.active ? "text-[11px] font-medium text-ink" : "text-[11px] text-ink-muted"}>
                    {result.label}
                  </span>
                  <span className="ml-auto text-[10px] text-ink-muted">{result.hint}</span>
                  {result.active ? (
                    <CornerDownLeft className="h-3 w-3 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div aria-hidden={activeIndex !== 2} className={mockPanelClass(activeIndex === 2)}>
          <div className="flex flex-col gap-2.5 px-6">
            <div className="flex items-center gap-2 rounded-md border border-line bg-canvas-hover px-3 py-2.5">
              <GitBranch className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="truncate text-[11px] font-medium text-ink">orb-142-fix-login-redirect</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-line bg-canvas-hover px-3 py-2.5">
              <GitPullRequest className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[11px] font-medium text-ink">Fix login redirect</span>
              <span className="ml-auto rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                Open
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2.5 py-1 text-[10px] font-medium text-ink">
                <CircleCheck className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                CI passing
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2.5 py-1 text-[10px] font-medium text-ink">
                <CircleCheck className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                Approved
              </span>
            </div>
          </div>
        </div>

        <div aria-hidden={activeIndex !== 3} className={mockPanelClass(activeIndex === 3)}>
          <div className="flex flex-col gap-2.5 px-6">
            {roles.map((member, index) => (
              <div
                key={member.role}
                className="flex items-center gap-3 rounded-md border border-line bg-canvas-hover px-3 py-2.5"
                style={{ transitionDelay: activeIndex === 3 ? `${index * 100}ms` : "0ms" }}
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

        <div aria-hidden={activeIndex !== 4} className={mockPanelClass(activeIndex === 4)}>
          <div className="flex flex-col gap-4 px-6">
            {activityEntries.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
                style={{ transitionDelay: activeIndex === 4 ? `${index * 100}ms` : "0ms" }}
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

      </div>
    </MockupFrame>
  )
}
