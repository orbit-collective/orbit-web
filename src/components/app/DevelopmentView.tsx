import type { ReactNode } from "react"
import { cn } from "../../lib/cn"
import { people, statuses } from "./data"
import { motionVars } from "./motionVars"
import { Avatar, StatusBadge } from "./parts"

/** GitHub's mark, as the app draws it next to a pull request. */
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

type Tone = "neutral" | "accent"

const tone: Record<Tone, string> = {
  neutral: "border-[var(--border-color)] text-[var(--text-color)]",
  accent: "border-[var(--accent-color)] text-[var(--accent-color)]",
}

function Pill({ tone: variant = "neutral", children }: { tone?: Tone; children: string }) {
  return (
    <span className={cn("shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium", tone[variant])}>
      {children}
    </span>
  )
}

interface PullRequest {
  title: string
  state: string
  stateTone: Tone
  number: number
  branch: string
  badges: { label: string; tone: Tone }[]
}

const pullRequests: PullRequest[] = [
  {
    title: "Keep the redirect target across session timeouts",
    state: "Open",
    stateTone: "neutral",
    number: 241,
    branch: "fix/login-redirect",
    badges: [
      { label: "CI passed", tone: "accent" },
      { label: "Approved", tone: "accent" },
    ],
  },
  {
    title: "Show a banner when a session expires",
    state: "Merged",
    stateTone: "accent",
    number: 238,
    branch: "feat/session-banner",
    badges: [{ label: "CI passed", tone: "accent" }],
  },
]

function PullRequestCard({ pullRequest, index }: { pullRequest: PullRequest; index: number }) {
  return (
    <div
      style={motionVars({ i: index, base: "300ms" })}
      className="m-rise flex flex-col gap-1 rounded-lg border border-[var(--border-color)] px-2 py-1.5 text-[var(--text-color)]">
      <div className="flex items-center gap-1.5">
        <GithubMark />
        <span className="min-w-0 flex-1 truncate text-xs font-medium">{pullRequest.title}</span>
        <Pill tone={pullRequest.stateTone}>{pullRequest.state}</Pill>
      </div>
      <span className="truncate text-[11px] text-[var(--text-gray-color)]">
        orbit-collective/orbit #{pullRequest.number}
      </span>
      <span className="truncate text-[11px] text-[var(--text-gray-color)]">
        {pullRequest.branch} → master
      </span>
      <div className="flex items-center gap-1.5">
        {pullRequest.badges.map((badge) => (
          <Pill key={badge.label} tone={badge.tone}>
            {badge.label}
          </Pill>
        ))}
      </div>
    </div>
  )
}

function Field({ label, index, children }: { label: string; index: number; children: ReactNode }) {
  return (
    <div className="m-rise flex flex-col items-start gap-1" style={motionVars({ i: index })}>
      <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted-color)] uppercase">
        {label}
      </span>
      {children}
    </div>
  )
}

/** The issue page's sidebar, with the Development field Orbit adds for a connected repository. */
export function DevelopmentView() {
  return (
    <div className="flex h-full flex-col gap-3 bg-[var(--bg-color-hover)] p-4">
      <Field label="Status" index={0}>
        <StatusBadge status={statuses.review} />
      </Field>
      <Field label="Assignee" index={1}>
        <span className="flex items-center gap-1.5 text-sm text-[var(--text-color)]">
          <Avatar person={people.marcus} size="sm" />
          {people.marcus.name}
        </span>
      </Field>
      <Field label="Development" index={2}>
        <div className="flex w-full flex-col gap-2">
          {pullRequests.map((pullRequest, index) => (
            <PullRequestCard key={pullRequest.number} pullRequest={pullRequest} index={index} />
          ))}
        </div>
      </Field>
    </div>
  )
}
