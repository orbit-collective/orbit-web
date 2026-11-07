import { useEffect, useRef, useState } from "react"

/**
 * For a tall section with a pinned (sticky) child: which of `count` equal
 * steps the reader has scrolled to. State only changes when the step does,
 * so scrolling does not re-render the section on every frame, and the
 * scroll listener only runs while the section is near the viewport.
 */
export function useScrollSteps<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0

    const update = () => {
      const rect = node.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      const progress = scrollableDistance > 0 ? -rect.top / scrollableDistance : 0
      const clamped = Math.min(1, Math.max(0, progress))
      setActiveIndex(Math.min(count - 1, Math.floor(clamped * count)))
    }

    const onChange = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    const listen = () => {
      update()
      window.addEventListener("scroll", onChange, { passive: true })
      window.addEventListener("resize", onChange)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onChange)
      window.removeEventListener("resize", onChange)
    }

    let listening = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true
          listen()
        } else if (!entry.isIntersecting && listening) {
          listening = false
          stop()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      stop()
    }
  }, [count])

  return { ref, activeIndex }
}
