import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  Compass,
  Filter,
  History,
  Kanban,
  Keyboard,
  KeyRound,
  Layers,
  MessagesSquare,
  Palette,
  Settings,
  ShieldCheck,
  SwatchBook,
  Tag,
  Type,
  UserPlus,
  Webhook,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getLangIndex } from "../../lib/docs"
import { Button } from "../atoms/Button"

const MAX_CATEGORIES = 6
const DEFAULT_LANG = "en"
const MAX_DESCRIPTION_LENGTH = 62

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "accent-colors": Palette,
  "theme-colors": SwatchBook,
  "activity-log": History,
  alerts: AlertTriangle,
  architecture: Layers,
  "content-moderation": ShieldCheck,
  integrations: Webhook,
  "issue-views": Kanban,
  "label-colors": Tag,
  notifications: Bell,
  permissions: KeyRound,
  "project-invitations": UserPlus,
  "project-onboarding": Compass,
  "rich-text-editor": Type,
  "saved-filters": Filter,
  "settings-tabs": Settings,
  shortcuts: Keyboard,
}

function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? BookOpen
}

export function LearnMegaMenu() {
  const allCategories = getLangIndex(DEFAULT_LANG)?.categories ?? []
  const categories = allCategories.slice(0, MAX_CATEGORIES)
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="group relative">
      <Link
        to="/learn"
        className="text-sm font-medium text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink"
      >
        Learn
      </Link>

      <div className="pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 -translate-y-1 pt-3 opacity-0 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-[62rem] max-w-[90vw] overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep shadow-2xl shadow-black/50">
          <div className="flex gap-6 p-6">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2 px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  Documentation
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {categories.map((category) => {
                  const Icon = getCategoryIcon(category.slug)
                  return (
                    <Link
                      key={category.slug}
                      to={`/learn/${DEFAULT_LANG}/${category.slug}`}
                      className="group/item flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-150 ease-in-out hover:bg-surface"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-150 ease-in-out group-hover/item:border-line-strong group-hover/item:text-ink">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-sm font-medium text-ink">{category.title}</span>
                        <span className="mt-0.5 line-clamp-1 block text-xs leading-relaxed text-ink-muted">
                          {truncate(category.readme.description, MAX_DESCRIPTION_LENGTH)}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="w-80 shrink-0 rounded-xl border border-line-strong bg-surface p-5">
              <div className="aspect-video overflow-hidden rounded-lg border border-line bg-canvas-hover">
                {imageFailed ? (
                  <div className="flex h-full items-center justify-center text-ink-muted">
                    <MessagesSquare className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                ) : (
                  <img
                    src="/mega-menu-promo.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>

              <p className="mt-4 text-sm font-semibold text-ink">Connect Orbit to your tools</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                Connect Orbit with GitHub now! Track your pull requests and issues, and see your community grow in one place.
              </p>

              <Button
                href="https://x.com/CodeAdiksuu"
                external
                size="md"
                className="mt-4 w-full"
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
