import { useCallback, useEffect, useState } from "react"
import { getCachedDocContent, loadDocContent } from "../lib/docs"

export interface DocContent {
  /** The markdown body: the requested page's once it is ready, otherwise the previous page's (or nothing). */
  content: string | undefined
  /** Whether `content` belongs to the page that was asked for. */
  isReady: boolean
  /** Whether loading the requested page failed, so `content` must not stand in for it. */
  failed: boolean
  retry: () => void
}

/**
 * The markdown body for a doc page. While the next page loads, `content` keeps
 * the previous one so navigating inside the docs never flashes an empty
 * article, but `isReady` says it is not the requested page, and a failed load
 * is reported as `failed` instead of leaving the old page up as if it were the
 * new one.
 */
export function useDocContent(key: string | undefined): DocContent {
  const cached = key ? getCachedDocContent(key) : undefined
  const [loaded, setLoaded] = useState<{ key: string; content: string } | undefined>(
    key && cached !== undefined ? { key, content: cached } : undefined,
  )
  const [failedKey, setFailedKey] = useState<string | undefined>()
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!key || cached !== undefined) return

    let active = true
    loadDocContent(key)
      .then((content) => {
        if (active) setLoaded({ key, content })
      })
      .catch(() => {
        if (active) setFailedKey(key)
      })

    return () => {
      active = false
    }
  }, [key, cached, attempt])

  const retry = useCallback(() => {
    setFailedKey(undefined)
    setAttempt((current) => current + 1)
  }, [])

  const isReady = cached !== undefined || (key !== undefined && loaded?.key === key)

  return {
    content: cached ?? loaded?.content,
    isReady,
    failed: !isReady && failedKey === key,
    retry,
  }
}
