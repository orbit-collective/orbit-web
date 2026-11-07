import { useEffect, useState } from "react"

/**
 * The slug of the heading currently being read. Pass `ready = false` while the
 * headings are known but not yet on the page (a docs article still downloading):
 * the observer attaches when it turns true, instead of looking for elements that
 * do not exist yet and never looking again.
 */
export function useActiveHeading(slugs: string[], ready = true): string | null {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const key = slugs.join(",")

  useEffect(() => {
    if (!key || !ready) return

    const elements = key
      .split(",")
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActiveSlug(topMost.target.id)
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key, ready])

  return activeSlug
}
