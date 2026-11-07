import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls to the element named by the URL hash. Pass `ready` when the target
 * only exists after some content has rendered (it re-runs when that changes).
 */
export function useHashScroll(ready?: unknown) {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [hash, ready])
}
