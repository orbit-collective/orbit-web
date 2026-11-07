import type { ComponentPropsWithoutRef, MouseEvent } from "react"
import { flushSync } from "react-dom"
import { Link, useNavigate } from "react-router-dom"

type TransitionLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & { to: string }

/**
 * A router link whose page change cross-fades through the View Transitions
 * API. BrowserRouter does not do that itself (only data routers do), so this
 * wraps the navigation in document.startViewTransition and commits it
 * synchronously, which is what the browser needs to snapshot the new page.
 *
 * It steps aside, and the link behaves as a normal one, for modified clicks,
 * browsers without the API, reduced motion, the current page, and the docs and
 * the changelog: their code loads lazily, so the new page would not be ready
 * to snapshot.
 */
export function TransitionLink({ to, onClick, ...props }: TransitionLinkProps) {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    const canTransition =
      typeof document.startViewTransition === "function" &&
      !event.defaultPrevented &&
      event.button === 0 &&
      !modified &&
      !to.startsWith("/learn") &&
      to !== "/changelog" &&
      to !== window.location.pathname &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!canTransition) return

    event.preventDefault()
    document.startViewTransition(() => {
      flushSync(() => navigate(to))
    })
  }

  return <Link to={to} onClick={handleClick} {...props} />
}
