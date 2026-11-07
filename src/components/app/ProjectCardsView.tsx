import { ArrowRight, FolderGit2 } from "lucide-react"

interface Project {
  name: string
  slug: string
  description: string
  percent: number
  todo: number
  progress: number
  done: number
  total: number
  // Orbit builds these from a colour name, so each full class string is spelled out
  // for Tailwind to find: glow, icon tile, icon, ring.
  glow: string
  tile: string
  icon: string
  ring: string
}

const projects: Project[] = [
  {
    name: "Orbit",
    slug: "orbit",
    description: "The issue tracker itself.",
    percent: 42,
    todo: 4,
    progress: 3,
    done: 5,
    total: 12,
    glow: "bg-purple-500",
    tile: "bg-purple-500/10 text-purple-400",
    icon: "text-purple-400",
    ring: "stroke-purple-500",
  },
  {
    name: "Mobile App",
    slug: "mobile-app",
    description: "iOS and Android clients for Orbit.",
    percent: 64,
    todo: 3,
    progress: 2,
    done: 9,
    total: 14,
    glow: "bg-sky-500",
    tile: "bg-sky-500/10 text-sky-400",
    icon: "text-sky-400",
    ring: "stroke-sky-500",
  },
]

const RADIUS = 14
const CIRCUMFERENCE = RADIUS * 2 * Math.PI

/** Orbit's ProgressRing: a 44 px ring drawn with a dash offset. */
function Ring({ percent, colorClass }: { percent: number; colorClass: string }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <svg height="44" width="44" className="shrink-0 rotate-[-90deg]">
        <circle className="fill-transparent stroke-[var(--bg-light-color)]" strokeWidth="4" r={RADIUS} cx="22" cy="22" />
        <circle
          className={`fill-transparent ${colorClass}`}
          strokeWidth="4"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE}
          r={RADIUS}
          cx="22"
          cy="22"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--text-color)]">
        {percent}%
      </span>
    </div>
  )
}

function Count({ square, label, value }: { square: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-[var(--text-gray-color)]">
        <span className={`inline-block h-2 w-2 shrink-0 rounded-sm ${square}`} />
        {label}
      </span>
      <span className="font-semibold text-[var(--text-color)]">{value}</span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex w-[340px] flex-col gap-4 overflow-hidden rounded-xl border border-solid border-[var(--border-color)] bg-[var(--surface-color)] p-5">
      <span className={`absolute -top-10 -right-8 h-28 w-28 rounded-full opacity-[0.12] blur-2xl ${project.glow}`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${project.tile}`}>
            <FolderGit2 size={20} className={project.icon} />
          </span>
          <div className="min-w-0">
            <h4 className="truncate text-base font-semibold text-[var(--text-color)]">{project.name}</h4>
            <span className="block truncate text-[11px] font-medium text-[var(--text-muted-color)]">
              {project.slug}
            </span>
          </div>
        </div>
        <div className="shrink-0 rounded bg-[var(--bg-light-color)] p-1 opacity-0">
          <ArrowRight size={14} />
        </div>
      </div>
      <p className="relative line-clamp-2 min-h-[2rem] text-xs leading-relaxed break-all text-[var(--text-gray-color)]">
        {project.description}
      </p>
      <div className="relative mt-auto flex items-center gap-4 border-t border-solid border-[var(--border-color)] pt-3.5">
        <Ring percent={project.percent} colorClass={project.ring} />
        <div className="flex min-w-0 flex-1 flex-col gap-1 text-[11px]">
          <Count square="bg-[var(--info-color)]" label="To Do" value={project.todo} />
          <Count square="bg-[var(--accent-color)]" label="In Progress" value={project.progress} />
          <Count square="bg-[var(--pending-color)]" label="Done" value={project.done} />
          <div className="flex items-center justify-between gap-2 text-[var(--text-muted-color)]">
            <span>Total</span>
            <span className="font-semibold text-[var(--text-color)]">
              {project.done}/{project.total} Issues
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The Projects page: a card per project with its progress and issue counts. */
export function ProjectCardsView() {
  return (
    <div className="flex h-full items-center justify-center gap-5 bg-[var(--bg-color)] p-5">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
