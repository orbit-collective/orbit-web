import { CountUp } from "./CountUp"
import { priorities } from "./data"
import { motionVars } from "./motionVars"

const CARD =
  "flex flex-col justify-between rounded-lg border border-solid border-[var(--border-color)] bg-[var(--surface-color)] p-5"

function CardHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <span className="block text-xs font-semibold tracking-wider text-[var(--text-gray-color)] uppercase">
        {title}
      </span>
      <p className="mt-1 text-xs text-[var(--text-muted-color)]">{subtitle}</p>
    </div>
  )
}

const columns = [
  { label: "To Do", value: 8, height: 66.6667, color: "bg-[var(--info-color)]" },
  { label: "In Progress", value: 5, height: 41.6667, color: "bg-[var(--accent-color)]" },
  { label: "Done", value: 12, height: 100, color: "bg-[var(--success-color)]" },
]

function CompletionRatioCard() {
  return (
    // Page sections rise 16 px, 60 ms apart (PageSection inside a PageStage).
    <div className={`m-rise ${CARD} flex-1`} style={motionVars({ i: 0, step: "60ms", base: "50ms", y: "16px" })}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <CardHeading title="Completion Ratio" subtitle="Resolution status of all logged tasks" />
          <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <span className="m-pop h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" style={motionVars({ base: "300ms" })} />
            <span className="text-xs font-medium text-[var(--text-gray-color)]">On track</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-5">
          <div className="flex flex-col">
            <span className="text-6xl leading-none font-bold tracking-tight text-[var(--text-color)] tabular-nums">
              <CountUp value={48} suffix="%" delay={200} />
            </span>
            <span className="mt-3 text-[10px] font-semibold tracking-widest text-[var(--text-muted-color)] uppercase">
              Resolved
            </span>
            <span className="mt-1 text-xs text-[var(--text-gray-color)]">
              <CountUp value={12} delay={300} /> of <CountUp value={25} delay={300} /> issues
            </span>
          </div>
          <div className="flex h-32 items-end gap-4 border-l border-solid border-[var(--border-color-strong)] pl-6">
            {columns.map((column, index) => (
              <div key={column.label} className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-[var(--text-color)] tabular-nums">
                  <CountUp value={column.value} delay={200 + index * 30} />
                </span>
                <div className="flex h-20 w-6 items-end overflow-hidden rounded-md bg-[var(--bg-light-color)]">
                  <div
                    // Fills up after the card has risen: 200 ms plus a step per bar.
                    className={`m-bar-h w-full rounded-md ${column.color}`}
                    style={{ ...motionVars({ i: index, base: "200ms", to: `${column.height}%` }), height: `${column.height}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium whitespace-nowrap text-[var(--text-muted-color)]">
                  {column.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const breakdown = [
  { priority: priorities.high, count: 6, percent: 24 },
  { priority: priorities.medium, count: 12, percent: 48 },
  { priority: priorities.low, count: 7, percent: 28 },
]

function PriorityBreakdownCard() {
  return (
    <div className={`m-rise ${CARD} w-[320px]`} style={motionVars({ i: 1, step: "60ms", base: "50ms", y: "16px" })}>
      <CardHeading title="Priority Breakdown" subtitle="Issues distribution by level of urgency" />
      <div className="flex flex-1 flex-col justify-center py-4">
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--bg-light-color)]">
          {breakdown.map(({ priority, percent }, index) => (
            <div
              key={priority.name}
              className="m-bar-w h-full"
              style={{
                ...motionVars({ i: index, base: "150ms", to: `${percent}%` }),
                width: `${percent}%`,
                backgroundColor: priority.color,
              }}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          {breakdown.map(({ priority, count, percent }, index) => (
            <div
              key={priority.name}
              className="m-rise flex items-center justify-between text-xs"
              style={motionVars({ i: index, base: "150ms" })}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: priority.color }}
                />
                <span className="truncate font-medium text-[var(--text-color)]">{priority.name}</span>
              </div>
              <span className="shrink-0 pl-2 font-semibold text-[var(--text-color)]">
                <CountUp value={count} delay={300 + index * 30} />{" "}
                <span className="font-medium text-[var(--text-muted-color)]">
                  (<CountUp value={percent} suffix="%" delay={300 + index * 30} />)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** The dashboard's completion ratio and priority breakdown cards. */
export function DashboardView() {
  return (
    <div className="flex h-full items-stretch gap-4 bg-[var(--bg-color)] p-5">
      <CompletionRatioCard />
      <PriorityBreakdownCard />
    </div>
  )
}
