import { useEffect, useState } from "react"
import { getCachedDocContent, loadDocContent } from "../lib/docs"

/**
 * The markdown body for a doc page. While the next page is still loading it
 * keeps returning the previous one, so navigating inside the docs never
 * flashes an empty article.
 */
export function useDocContent(key: string | undefined): string | undefined {
  const cached = key ? getCachedDocContent(key) : undefined
  const [loaded, setLoaded] = useState<string | undefined>(cached)

  useEffect(() => {
    if (!key || cached !== undefined) return

    let active = true
    loadDocContent(key)
      .then((content) => {
        if (active) setLoaded(content)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [key, cached])

  return cached ?? loaded
}
