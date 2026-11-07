import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/cn"
import { priorities } from "./data"
import type { Priority } from "./data"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/** A month that starts on a Sunday, so the first row is simply days 1 to 7. */
const TODAY = 7

interface Event {
  title: string
  priority: Priority
}

const fix = { title: "Fix login redirect after session timeout", priority: priorities.high }
const shortcuts = { title: "Add keyboard shortcuts to the issue board", priority: priorities.medium }
const dragHandle = { title: "Board column drag handle is not reachable by keyboard", priority: priorities.high }
const speedUp = { title: "Speed up the project list for workspaces with 10k issues", priority: priorities.low }
const checklist = { title: "Release 0.13 checklist", priority: priorities.medium }
const onboarding = { title: "Rework onboarding for new workspaces", priority: priorities.high }

const EVENTS: Record<number, Event[]> = {
  5: [fix],
  6: [shortcuts],
  7: [shortcuts, dragHandle],
  8: [dragHandle, speedUp],
  9: [dragHandle, checklist],
  10: [checklist, onboarding],
  11: [onboarding],
  12: [onboarding],
}

const WEEKS = 4

function EventChip({ event }: { event: Event }) {
  return (
    <div
      className="flex items-center rounded-r-md border-l-2 px-2 py-1 text-left"
      style={{
        borderLeftColor: event.priority.color,
        backgroundColor: `color-mix(in srgb, ${event.priority.color} 10%, transparent 90%)`,
      }}
    >
      <span className="truncate text-[11px] font-medium text-[var(--text-color)]">{event.title}</span>
    </div>
  )
}

function Day({ day, column }: { day: number; column: number }) {
  const events = EVENTS[day] ?? []

  return (
    <div
      className={cn(
        "relative flex min-h-[132px] flex-col gap-1.5 border-b border-[var(--border-color)] p-2.5",
        column < 6 && "border-r",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
            day === TODAY
              ? "bg-[var(--accent-color)] text-white shadow-[0_0_15px_rgba(136,68,218,0.3)]"
              : "text-[var(--text-muted-color)]",
          )}
        >
          {day}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {events.map((event) => (
          <EventChip key={event.title} event={event} />
        ))}
      </div>
    </div>
  )
}

/** The project's Calendar view, month mode, showing the first four weeks (the rest scrolls). */
export function CalendarView() {
  return (
    <div className="h-full bg-[var(--bg-color)] p-6">
      <div className="flex h-full flex-col p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-[var(--text-color)]">
              November <span className="font-medium text-[var(--text-muted-color)]">2026</span>
            </h2>
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-light-color)] p-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-gray-color)]">
                <ChevronLeft size={16} />
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-[var(--text-gray-color)]">Today</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-gray-color)]">
                <ChevronRight size={16} />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-[11px] font-medium text-[var(--text-muted-color)]">
              {[priorities.high, priorities.medium, priorities.low].map((priority) => (
                <span key={priority.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: priority.color }} />
                  {priority.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-light-color)] p-1">
              <span className="rounded-lg bg-[var(--accent-color)] px-3 py-1 text-xs font-semibold text-white capitalize">
                month
              </span>
              <span className="rounded-lg px-3 py-1 text-xs font-semibold text-[var(--text-gray-color)] capitalize">
                week
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)]">
          <div className="grid grid-cols-7 border-b border-[var(--border-color)] bg-[var(--bg-light-color)]">
            {WEEKDAYS.map((weekday) => (
              <div
                key={weekday}
                className="py-3 text-center text-[10px] font-bold tracking-widest text-[var(--text-muted-color)] uppercase"
              >
                {weekday}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: WEEKS * 7 }, (_, index) => (
              <Day key={index} day={index + 1} column={index % 7} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
