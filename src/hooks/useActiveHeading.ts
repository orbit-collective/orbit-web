import { useEffect, useState } from "react"

export function useActiveHeading(slugs: string[]): string | null {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const key = slugs.join(",")

  useEffect(() => {
    if (!key) return

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
  }, [key])

  return activeSlug
}
